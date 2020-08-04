const express = require("express");
const UserController = require("../controllers/userController");
const isAuthorized = require("../middlewares/authorization");
const { query } = require("express-validator");
const validate = require("../validators/index");
const validateRegister = require("../validators/validateRegister");
const validateLogin = require("../validators/validateLogin");
const validatePassResetRequest = require("../validators/validatePassResetRequest");
const validatePassReset = require("../validators/validatePassReset");
const validatePassChange = require("../validators/validatePassChange");

const userRoutes = () => {
  const router = express.Router();

  router.post(
    "/register",
    validate(validateRegister()),
    async (req, res, next) => {
      try {
        const user = await UserController.userRegister(req.body);

        return res.status(201).json({
          user,
          message:
            "Contul a fost creat cu succes, un email cu detalii privind confirmarea contului a fost trimis pe adresa dumneavoastra",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post("/login", validate(validateLogin()), async (req, res, next) => {
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
  });

  router.put("/confirm/:id", async (req, res, next) => {
    try {
      const userId = req.params.id;
      const confirmationCode = req.body.code.trim();
      await UserController.confirmAccount(userId, confirmationCode);

      res.status(200).json({
        message: "Contul a fost confirmat cu succes",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/request-confirmation/:id", async (req, res, next) => {
    try {
      const userId = req.params.id;
      await UserController.requestConfirmationCode(userId);

      res.status(200).json({
        message:
          "Un email cu detalii privind confirmarea contului a fost trimis pe adresa dumneavoastra",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/request-password-reset",
    validate(validatePassResetRequest()),
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
    validate(validatePassReset()),
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
    validate(validatePassChange()),
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
