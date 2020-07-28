const User = require("../models/userModel");
const RandomCode = require("../models/randomCodeModel");
const Mailer = require("../mailer/index");
const bcrypt = require("bcrypt");
const { ConflictError } = require("../errors/index");
require("dotenv").config();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const API_V = process.env.API_V;

class UserController {
  async userRegister(userData) {
    const { email, firstName, lastName, password } = userData;

    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      throw new ConflictError("Un utilizator cu acest e-mail există deja");
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

    // Create a random code and save it
    const activationCode = new RandomCode({
      forUserId: newUser._id,
    });
    activationCode.save();

    // Send email for account activation with the generated code
    const activationLink = `https://${HOSTNAME}:${PORT}/api/${API_V}/users?confirmation=${activationCode._id}`;
    const subject = "Activare cont";
    const text = `Apăsați pe următorul link pentru a activa contul ${activationLink}`;
    const url = await Mailer.send(newUser.email, subject, text);

    return newUser;
  }
}

module.exports = new UserController();
