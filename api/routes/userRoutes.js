const express = require("express");
const UserController = require("../controllers/userController");
const isAuthorized = require("../middlewares/authorization");
const { body, query } = require("express-validator");
const validate = require("../validators/index");

const userRoutes = () => {
  const router = express.Router();

  router.post(
    "/register",
    validate([
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
        .withMessage("Câmpul prenume este obligatoriu"),
      body("lastName")
        .escape()
        .trim()
        .notEmpty()
        .withMessage("Câmpul nume este obligatoriu"),
      body("password")
        .escape()
        .trim()
        .isLength({
          min: 6,
          max: 100,
        })
        .withMessage("Parola trebuie să conțină cel puțin 6 caractere"),
      body("passwordConfirmation")
        .escape()
        .trim()
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Parola și confirmarea parolei nu sunt identice"),
    ]),
    async (req, res, next) => {
      try {
        const user = await UserController.userRegister(req.body);

        return res.status(201).json({
          user,
          message:
            "Contul a fost creat cu succes, un email cu detalii privind activarea contului a fost trimis pe adresa dumneavoastră",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/login",
    validate([
      body("email").escape().trim().normalizeEmail(),
      body("password").trim().escape(),
    ]),
    async (req, res, next) => {
      try {
        const token = await UserController.userLogin(req.body);

        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .sendStatus(200);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get("/activate", query("code").escape(), async (req, res, next) => {
    try {
      const activationCode = req.query.code;
      await UserController.activateAccount(activationCode);

      res.status(200).json({
        response: `Contul dumneavoastră a fost activat cu succes`,
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/request-code", isAuthorized, async (req, res, next) => {
    try {
      res.end();
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = userRoutes();
