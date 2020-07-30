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
    ]),
    async (req, res, next) => {
      try {
        const user = await UserController.userRegister(req.body);

        return res.status(201).json({
          user,
          message:
            "Contul a fost creat cu succes, un email cu detalii privind activarea contului a fost trimis pe adresa dumneavoastra",
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

      res.status(307).redirect("/users/activate");
    } catch (err) {
      next(err);
    }
  });

  router.get("/request-activation", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.user._id;
      await UserController.requestActivationCode(userId);

      res.status(200).json({
        message:
          "Un email cu detalii privind activarea contului a fost trimis pe adresa dumneavoastra",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/request-password-reset",
    validate([
      body("email")
        .escape()
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage("E-mail invalid"),
    ]),
    async (req, res, next) => {
      try {
        const email = req.body.email;
        await UserController.requestPassResetCode(email);

        res.status(200).json({
          message:
            "Un email cu detalii privind resetarea parolei a fost trimis pe adresa dumneavoastra",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get("/reset", query("code").escape(), async (req, res, next) => {
    try {
      const code = req.query.code;
      res.status(307).redirect(`/users/reset?code=${code}`);
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/reset",
    query("code").escape(),
    validate([
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
    ]),
    async (req, res, next) => {
      try {
        const code = req.query.code;
        const newPassword = req.body.newPassword;
        await UserController.resetPassword(newPassword, code);

        res.status(200).json({
          message: "Parola a fost actualizata cu succes",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/change-password",
    isAuthorized,
    validate([
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
    ]),
    async (req, res, next) => {
      try {
        const { newPassword, oldPassword } = req.body;
        const userId = req.user._id;
        await UserController.changePassword(userId, oldPassword, newPassword);

        res.status(200).json({
          message: "Parola a fost actualizata cu succes",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};

module.exports = userRoutes();
