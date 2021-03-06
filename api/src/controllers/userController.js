// System
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Models
const User = require("../models/user/userModel");
const Code = require("../models/code/code");
const Role = require("../models/role/roleModel");
const Ban = require("../models/ban/banModel");
// Services
const Mailer = require("../mailer/index");
// Constants
const { AVATAR_PICTURES_PATH } = require("../models/user/constants");
const {
  CONFIRMATION_CODE,
  PASSWORD_RESET_CODE,
} = require("../models/code/constants");
const { USER_ROLE_USER } = require("../models/role/constants");
// Utilities
const ErrorsFactory = require("../factories/errorsFactory");
const { renamePicture } = require("../utilities/deletePictures");
const formatPhoneNumber = require("../utilities/formatPhoneNumber");
const hash = require("../utilities/hash");

const HOSTNAME = process.env.HOSTNAME;
const FRONT_PORT = process.env.FRONT_PORT;
const SECRET = process.env.SECRET;
const SALT_ROUNDS = process.env.SALT_ROUNDS;

class UserController {
  async userRegister(userData, avatar) {
    const { email, firstName, lastName, password, gender, phone } = userData;
    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new ErrorsFactory(
        "conflict",
        "ConflictError",
        "Un utilizator cu acest email exista deja, te rugam sa incerci din nou"
      );
    }

    const formattedPhone = formatPhoneNumber(phone);
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const role = await Role.findOne({ type: USER_ROLE_USER });
    // Create a new user and save it
    let newUser = new User({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phone: formattedPhone,
      gender: gender.toUpperCase(),
      role_id: role._id,
    });

    if (avatar) {
      // Rename the avatar since the user has and id now to preserve the naming convention
      const newAvatarFileName = `${AVATAR_PICTURES_PATH}\\${
        newUser._id
      }-${Date.now()}${path.extname(avatar.originalname)}`;
      renamePicture(avatar.path, newAvatarFileName);
      const splitName = newAvatarFileName.split("public\\")[1];
      const newAvatarName = splitName.replace(/\\/g, "/");
      newUser.avatar = newAvatarName;
    }

    await newUser.save();
    newUser = newUser.toJSON();

    delete newUser.password;

    await this.requestConfirmationCode(newUser.email);

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

    // Check if the user is banned
    const ban = await Ban.findOne({ forUserId: foundUser._id });

    if (ban && ban.isValid) {
      if (new Date() < new Date(ban.endTime)) {
        return {
          isBanned: true,
          reason: ban.reason,
          endTime: ban.endTime,
        };
      }
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

    return {
      token: this.signToken(foundUser._id),
    };
  }

  async requestConfirmationCode(email) {
    // Check user data
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Nu exista nici un cont inregistrat pe acest e-mail"
      );
    }
    // Check if the account has already been activated
    if (foundUser.isActive) {
      throw new ErrorsFactory(
        "conflict",
        "ConflictError",
        "Contul este deja confirmat"
      );
    }
    // Create an activation code and save it
    const confirmationCode = new Code({
      forUserId: foundUser._id,
      type: CONFIRMATION_CODE,
    });
    await confirmationCode.save();
    // Send email for account activation with the generated code
    const subject = `Confirmare cont Animadopt`;
    const confirmationLink = `http://${HOSTNAME}:${FRONT_PORT}/users/activate/${confirmationCode._id}`;
    const text = `
    Salutare ${foundUser.firstName},

    Te-ai inscris recent pe Animadopt. Pentru a finaliza inregistrarea, te rugam sa efectuezi confirmarea contului.
    Acceseaza link-ul urmator pentru a confirma contul ${confirmationLink}
    `;
    await Mailer.send(foundUser.email, subject, text);
  }

  async confirmAccount(codeId) {
    if (!codeId) {
      throw new ErrorsFactory("invalid", "InvalidError", "Codul este invalid");
    }
    // Check if the code exists and if it is valid
    let foundCode;
    try {
      foundCode = await this.checkCode(codeId, CONFIRMATION_CODE);
    } catch (err) {
      return "Codul nu mai este valid sau contul este deja confirmat";
    }

    // Check if the code expired
    const now = new Date().getTime();
    const expTime = 60 * 1440 * 1000; // 1 DAY
    if (now - foundCode.issuedAt > expTime) {
      foundCode.isValid = false;
      await foundCode.save();
      return "Codul de confirmare a expirat, va rugam sa solicitati alt cod";
    }
    // Check for user data
    const foundUser = await User.findOne({ _id: foundCode.forUserId });
    if (!foundUser) {
      foundCode.isValid = false;
      await foundCode.save();
      return "Confirmarea a esuat, va rugam sa solicitati alt cod de confirmare sau sa va asigurati ca sunteti inregistrat";
    }
    // Check if the account has already been activated
    if (foundUser.isActive) {
      return "Contul este confirmat";
    }
    // Activate user account and invalidate the code
    foundUser.isActive = true;
    await foundUser.save();
    foundCode.isValid = false;
    await foundCode.save();

    return "Contul a fost confirmat cu succes";
  }

  async requestPassResetCode(email) {
    // Check for user data
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Nu exista nici un cont inregistrat pe acest e-mail"
      );
    }
    // Create a password reset code and save it
    const passResetCode = new Code({
      forUserId: foundUser.id,
      type: PASSWORD_RESET_CODE,
    });

    await passResetCode.save();
    // Send email for password reset with the generated code
    const passResetLink = `http://${HOSTNAME}:${FRONT_PORT}/users/password-reset/${passResetCode._id}`;
    const subject = "Resetare parola";
    const text = `
    Salutare ${foundUser.firstName},
    
    Cineva a solicitat resetarea parolei, daca nu ai fost tu cel care a initiat aceasta operatiune, te rugam sa ne contactezi la adresa de e-mail roanimadopt@gmail.com.
    Pentru a reseta parola te rugam sa accesezi urmatorul link ${passResetLink}`;

    await Mailer.send(foundUser.email, subject, text);
  }

  async checkCode(codeId, type) {
    // Check the code
    const foundCode = await Code.findOne({
      _id: codeId,
      type,
    });

    if (!foundCode || !foundCode.isValid) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Codul nu mai este valid, va rugam incercati din nou"
      );
    }

    return foundCode;
  }

  async resetPassword(newPassword, codeId) {
    const foundCode = await this.checkCode(codeId, PASSWORD_RESET_CODE);
    foundCode.isValid = false;
    foundCode.save();

    // Check for user data
    const foundUser = await User.findOne({ _id: foundCode.forUserId });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Emailul este invalid"
      );
    }

    foundUser.password = await hash(newPassword, SALT_ROUNDS);
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

    foundUser.password = await hash(newPassword, SALT_ROUNDS);
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

    const filePath = file.path.split("public\\")[1];

    if (!foundUser.avatar.includes("placeholders")) {
      let filename = foundUser.avatar.split("avatars\\")[1];
      if (!filename) {
        filename = foundUser.avatar.split("avatars/")[1];
      }

      fs.unlink(`${AVATAR_PICTURES_PATH}/${filename}`, (err) => {
        if (err) {
          throw new ErrorsFactory("notfound", "NotFound", "File not found.");
        }
      });
    }

    foundUser.avatar = filePath;
    await foundUser.save();
    return foundUser.avatar;
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

    const role = await Role.findOne({ _id: foundUser.role_id });

    const user = foundUser.toJSON();
    user.role = role;
    delete user.password;

    return user;
  }

  async getUser(id) {
    return await this.getUserById(id);
  }

  signToken(userId) {
    return jwt.sign({ _id: userId }, SECRET, {
      expiresIn: "28d",
    });
  }

  async deleteUser(userId) {
    const user = await User.findOne({ _id: userId });
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
