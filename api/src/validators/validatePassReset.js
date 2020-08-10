const { body } = require("express-validator");

const validatePassReset = () => {
  return [
    body("newPassword")
      .escape()
      .trim()
      .isLength({
        min: 6,
        max: 100,
      })
      .withMessage("Parola trebuie sa contina cel putin 6 caractere"),
    body("passwordConfirmation")
      .escape()
      .trim()
      .custom((value, { req }) => value === req.body.newPassword)
      .withMessage("Parola si confirmarea parolei nu sunt identice"),
  ];
};

module.exports = validatePassReset;
