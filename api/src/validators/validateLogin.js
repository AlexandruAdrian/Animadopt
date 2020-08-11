const { body } = require("express-validator");

const validateLogin = () => {
  return [body("email").escape().trim(), body("password").trim().escape()];
};

module.exports = validateLogin;
