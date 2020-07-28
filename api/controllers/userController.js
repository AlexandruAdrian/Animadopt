const User = require("../models/userModel");
const RandomCode = require("../models/randomCodeModel");
const Mailer = require("../mailer/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ConflictError, NotFoundError } = require("../errors/index");
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
    const activationLink = `https://${HOSTNAME}:${PORT}/api/${API_V}/users/activate?code=${activationCode._id}`;
    const subject = "Activare cont";
    const text = `Apăsați pe următorul link pentru a activa contul ${activationLink}`;
    await Mailer.send(newUser.email, subject, text);

    return newUser;
  }

  async userLogin(userData) {
    const { email, password } = userData;
    // Check if the user exists
    const foundUser = User.findOne({ email });
    if (!foundUser) {
      throw new NotFoundError("Email-ul sau parola sunt incorecte");
    }
    // Check password
    const passwordMatches = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatches) {
      throw new NotFoundError("Email-ul sau parola sunt incorecte");
    }
    // Sign token
    const token = generateToken(foundUser._id);

    return token;
  }

  generateToken(userId) {
    const token = jwt.sign({ _id: userId }, SECRET, {
      expiresIn: "28d",
    });

    return token;
  }
}

module.exports = new UserController();
