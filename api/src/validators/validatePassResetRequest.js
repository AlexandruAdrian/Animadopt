const { body } = require("express-validator");

const validatePassResetRequest = () => {
  return [
    body("email")
      .escape()
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("E-mail invalid"),
  ];
};

module.exports = validatePassResetRequest;
