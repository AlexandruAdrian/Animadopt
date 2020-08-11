const { body } = require("express-validator");

const validatePassResetRequest = () => {
  return [
    body("email").escape().trim().isEmail().withMessage("E-mail invalid"),
  ];
};

module.exports = validatePassResetRequest;
