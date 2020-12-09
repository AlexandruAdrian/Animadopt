const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { difference } = require('lodash');
const { customAlphabet } = require("nanoid");
const { User, AVATAR_PICTURES_PATH } = require("../models/userModel");
const ConfirmationCode = require("../models/confirmationCodeModel");
const PassResetCode = require("../models/passResetCodeModel");
const Mailer = require("../mailer/index");
const ErrorsFactory = require("../factories/errorsFactory");
require("dotenv").config();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const API_V = process.env.API_V;
const SECRET = process.env.SECRET;

const nanoid = customAlphabet("0123456789", 6);

class UserController {
  async userRegister(userData) {
    const { email, firstName, lastName, password, gender } = userData;
    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new ErrorsFactory(
        "conflict",
        "ConflictError",
        "Un utilizator cu acest email exista deja"
      );
    }
    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user and save it
    let newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      gender: gender.toUpperCase(),
    });
    await newUser.save();
    newUser = newUser.toJSON();
    delete newUser.password;

    await this.requestConfirmationCode(newUser._id);

    return newUser;
  }

  async userLogin(userData) {
    const { email, password } = userData;
    // Check if the user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Email-ul sau parola sunt incorecte"
      );
    }
    // Check if the account is confirmed
    if (!foundUser.isActive) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Pentru autentificare este necesara confirmarea contului"
      );
    }
    // Check password
    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatches) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Email-ul sau parola sunt incorecte"
      );
    }
    // Sign token
    const token = this.signToken(foundUser._id);

    return token;
  }

  async requestConfirmationCode(userId) {
    // Check user data
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Pentru a putea solicita un cod de confirmare asigurati-va ca sunteti inregistrat"
      );
    }
    // Check if the account has already been activated
    if (foundUser.isActive) {
      throw new ErrorsFactory(
        "conflict",
        "ConflictError",
        "Contul este confirmat"
      );
    }
    // Create an activation code and save it
    const confirmationCode = new ConfirmationCode({
      forUserId: foundUser._id,
      code: nanoid(),
    });
    await confirmationCode.save();
    // Send email for account activation with the generated code
    const confirmationLink = `https://${HOSTNAME}:${PORT}/users/confirm`;
    const subject = `${confirmationCode.code} este codul de confirmare Animadopt`;
    const text = `
    Salutare ${foundUser.firstName},

    Te-ai inscris recent pe Animadopt. Pentru a termina inregistrarea, te rugam sa efectuezi confirmarea contului.
    Confirma-ti contul aici: ${confirmationLink}
    Este posibil sa ti se ceara sa introduci acest cod de confirmare ${confirmationCode.code}.
    `;
    await Mailer.send(foundUser.email, subject, text);
  }

  async confirmAccount(userId, code) {
    if (!code) {
      throw new ErrorsFactory("invalid", "InvalidError", "Codul este invalid");
    }
    // Check if the code exists and if it is valid
    const foundCode = await ConfirmationCode.findOne({
      forUserId: userId,
      code: code.trim(),
    });
    if (!foundCode || !foundCode.isValid) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Codul este invalid"
      );
    }
    // Check if the code expired
    const now = new Date().getTime();
    const expTime = 60 * 1440 * 1000; // 1 DAY
    if (now - foundCode.issuedAt > expTime) {
      foundCode.isValid = false;
      await foundCode.save();
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Codul de confirmare a expirat, va rugam sa solicitati alt cod"
      );
    }
    // Check for user data
    const foundUser = await User.findOne({ _id: foundCode.forUserId });
    if (!foundUser) {
      foundCode.isValid = false;
      await foundCode.save();
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Confirmarea a esuat, va rugam sa solicitati alt cod de confirmare sau sa va asigurati ca sunteti inregistrat"
      );
    }
    // Check if the account has already been activated
    if (foundUser.isActive) {
      throw new ErrorsFactory(
        "conflict",
        "ConflictError",
        "Contul este confirmat"
      );
    }
    // Activate user account and invalidate the code
    foundUser.isActive = true;
    await foundUser.save();
    foundCode.isValid = false;
    await foundCode.save();
  }

  async requestPassResetCode(email) {
    // Check for user data
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Emailul este incorect"
      );
    }
    // Create a password reset code and save it
    const passResetCode = new PassResetCode({
      forUserId: foundUser.id,
    });
    await passResetCode.save();
    // Send email for password reset with the generated code
    const passResetLink = `https://${HOSTNAME}:${PORT}/api/${API_V}/users/reset?code=${passResetCode._id}`;
    const subject = "Resetare parola";
    const text = `Apasati pe urmatorul link pentru a reseta parola ${passResetLink}`;
    await Mailer.send(foundUser.email, subject, text);
  }

  async resetPassword(newPassword, resetCodeId) {
    // Check the code
    const foundCode = await PassResetCode.findOne({ _id: resetCodeId });
    if (!foundCode) {
      throw new ErrorsFactory(
        "authorization",
        "AuthorizationError",
        "Nu sunteti autorizat pentru aceasta actiune"
      );
    }
    if (!foundCode.isValid) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Codul nu mai este valid, va rugam incercati din nou"
      );
    }
    // Check user data
    const foundUser = await User.findOne({ _id: foundCode.forUserId });
    if (!foundUser) {
      throw new ErrorsFactory("notfound", "NotFoundError", "Email invalid");
    }
    // Hash new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    foundUser.password = hashedPassword;
    await foundUser.save();
  }

  async changePassword(userId, oldPassword, newPassword) {
    // Check for user data
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Emailul este invalid"
      );
    }
    // Check old password
    const passwordMatches = await bcrypt.compare(
      oldPassword,
      foundUser.password
    );
    if (!passwordMatches) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Parola veche este incorecta"
      );
    }
    // Hash new password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    foundUser.password = hashedPassword;
    await foundUser.save();
  }

  async updateAvatar(userId, file) {
    if (!file) {
      throw new ErrorsFactory("notfound", "NotFound", "File not found");
    }

    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Ooops! Se pare ca nu am reusit sa gasim contul asociat acestui email"
      );
    }

    const filePath = file.path.split('Animadopt\\')[1];

    if (!foundUser.avatar.includes('placeholder')) {
      const filename = foundUser.avatar.split('avatars\\')[1];
      fs.unlink(`${AVATAR_PICTURES_PATH}/${filename}`, err => {
        if (err) {
          throw new ErrorsFactory('notfound', 'NotFound', 'File not found.');
        }
      });
    }

    foundUser.avatar = filePath;
    await foundUser.save();
  }

  async getUserById(userId) {
    // Check for user data
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Utilizatorul nu a fost gasit"
      );
    }

    const user = foundUser.toJSON();
    delete user.password;

    return user;
  }

  signToken(userId) {
    const token = jwt.sign({ _id: userId }, SECRET, {
      expiresIn: "28d",
    });

    return token;
  }

  async deleteUser(userId) {
    const user = await User.findOne({_id : userId});
    if (!user) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "User-ul nu a fost gasit"
      );
    }

    await user.delete();
  }
}

module.exports = new UserController();
