const { body } = require("express-validator");

const validateRegister = () => {
  return [
    body("email")
      .escape()
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("E-mail invalid"),
    body("firstName")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("Campul prenume este obligatoriu"),
    body("lastName")
      .escape()
      .trim()
      .notEmpty()
      .withMessage("Campul nume este obligatoriu"),
    body("password")
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
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error(
            "Parola si confirmarea parolei trebuie sa fie identice"
          );
        }

        return true;
      }),
  ];
};

module.exports = validateRegister;
