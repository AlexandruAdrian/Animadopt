const { body } = require("express-validator");

const validatePassChange = () => {
  return [
    body("newPassword")
      .escape()
      .trim()
      .isLength({
        min: 6,
        max: 100,
      })
      .withMessage("Parola trebuie sa contina cel putin 6 caractere"),
    body("oldPassword")
      .escape()
      .trim()
      .custom((value, { req }) => {
        if (value === req.body.newPassword) {
          throw new Error(
            "Parola noua trebuie sa fie diferita de parola veche"
          );
        }

        return true;
      }),
    body("passwordConfirmation")
      .escape()
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error(
            "Parola si confirmarea parolei trebuie sa fie identice"
          );
        }

        return true;
      }),
  ];
};

module.exports = validatePassChange;
