const { body } = require("express-validator");

const validateLogin = () => {
  return [
    body("email").escape().trim().normalizeEmail(),
    body("password").trim().escape(),
  ];
};

module.exports = validateLogin;
