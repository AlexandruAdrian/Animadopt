const express = require("express");
const UserController = require("../controllers/userController");
const { body } = require("express-validator");
const validate = require("../validators/index");

const userRoutes = () => {
  const router = express.Router();

  router.post(
    "/register",
    validate([
      body("email").normalizeEmail().isEmail().withMessage("E-mail invalid"),
      body("firstName")
        .trim()
        .notEmpty()
        .withMessage("Câmpul prenume este obligatoriu"),
      body("lastName")
        .trim()
        .notEmpty()
        .withMessage("Câmpul nume este obligatoriu"),
      body("password")
        .trim()
        .isLength({
          min: 6,
          max: 100,
        })
        .withMessage("Parola trebuie să conțină cel puțin 6 caractere"),
      body("passwordConfirmation")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Parola și confirmarea parolei nu sunt identice"),
    ]),
    async (req, res, next) => {
      try {
        const user = await UserController.userRegister(req.body);

        return res.status(200).json({
          user,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};

module.exports = userRoutes();
