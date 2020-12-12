const { body } = require("express-validator");

const validateRegister = () => {
  return [
    body("email").escape().trim().isEmail().withMessage("E-mail invalid"),
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
    body("phone")
      .escape()
      .trim()
      .custom(value => {
        const regexp = new RegExp(/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|)?([0-9]{3}(\s|)){2}$/igm);
        const isValid = regexp.test(value);
        if (!isValid) {
          throw new Error(
            "Numarul de telefon este invalid"
          );
        }

        return true;
      })
  ];
};

module.exports = validateRegister;
