const User = require("../models/userModel");
const ActivationCode = require("../models/activationCodeModel");
const Mailer = require("../mailer/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  ConflictError,
  NotFoundError,
  InvalidError,
} = require("../errors/index");
require("dotenv").config();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const API_V = process.env.API_V;
const SECRET = process.env.SECRET;

class UserController {
  async userRegister(userData) {
    const { email, firstName, lastName, password } = userData;
    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new ConflictError("Un utilizator cu acest email există deja");
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
    });
    await newUser.save();
    newUser = newUser.toJSON();
    delete newUser.password;

    await this.requestActivationCode(newUser._id);

    return newUser;
  }

  async userLogin(userData) {
    const { email, password } = userData;
    // Check if the user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new NotFoundError("Email-ul sau parola sunt incorecte");
    }
    // Check password
    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatches) {
      throw new NotFoundError("Email-ul sau parola sunt incorecte");
    }
    // Sign token
    const token = this.signToken(foundUser._id);

    return token;
  }

  async activateAccount(codeId) {
    // Check if the code exists and if it is valid
    const foundCode = await ActivationCode.findOne({ _id: codeId });
    if (!foundCode || !foundCode.isValid) {
      throw new NotFoundError("Codul este invalid");
    }
    // Check if the code expired
    const now = new Date().getTime();
    const expTime = 60 * 10 * 1000;
    if (now - foundCode.issuedAt > expTime) {
      foundCode.isValid = false;
      await foundCode.save();
      throw new InvalidError(
        "Codul de activare a expirat, va rugăm să solicitați alt cod"
      );
    }
    // Check for user data
    const foundUser = await User.findOne({ _id: foundCode.forUserId });
    if (!foundUser) {
      foundCode.isValid = false;
      await foundCode.save();
      throw new InvalidError(
        "Pentru a putea solicita un cod de activare este nevoie de un cont"
      );
    }
    // Activate user account and invalidate the code
    foundUser.isActive = true;
    await foundUser.save();
    foundCode.isValid = false;
    await foundCode.save();
  }

  async requestActivationCode(userId) {
    // Check user data
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new InvalidError(
        "Pentru a putea solicita un cod de activare este nevoie de un cont"
      );
    }
    // Check if the account has already been activated
    if (foundUser.isActive) {
      throw new ConflictError("Contul este activ");
    }
    // Create an activation code and save it
    const activationCode = new ActivationCode({
      forUserId: foundUser._id,
    });
    await activationCode.save();
    // Send email for account activation with the generated code
    const activationLink = `https://${HOSTNAME}:${PORT}/api/${API_V}/users/activate?code=${activationCode._id}`;
    const subject = "Activare cont";
    const text = `Apăsați pe următorul link pentru a activa contul ${activationLink}`;
    await Mailer.send(foundUser.email, subject, text);
  }

  signToken(userId) {
    const token = jwt.sign({ _id: userId }, SECRET, {
      expiresIn: "28d",
    });

    return token;
  }
}

module.exports = new UserController();
