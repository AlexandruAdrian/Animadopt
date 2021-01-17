// System
const express = require("express");
// Controllers
const UserController = require("../controllers/userController");
// Middlewares
const isAuthorized = require("../middlewares/authorization");
const upload = require("../middlewares/multer");
// Validators
const validate = require("../validators/index");
const validateRegister = require("../validators/validateRegister");
const validateLogin = require("../validators/validateLogin");
const validatePassResetRequest = require("../validators/validatePassResetRequest");
const validatePassChange = require("../validators/validatePassChange");
const validatePassChangeReset = require("../validators/validatePassChangeReset");

const userRoutes = () => {
  const router = express.Router();

  router.post(
    "/register",
    upload.single("avatar"),
    validate(validateRegister()),
    async (req, res, next) => {
      try {
        const user = await UserController.userRegister(req.body, req.file);

        return res.status(201).json({
          user,
          message:
            "Contul a fost creat cu succes, un email cu detalii privind confirmarea contului a fost trimis pe adresa dumneavoastra",
          success: true,
        });
      } catch (err) {
        res
          .json({
            message: err.message,
            success: false,
          })
          .status(err.status);
      }
    }
  );

  router.put(
    "/avatar",
    isAuthorized,
    upload.single("avatar"),
    async (req, res, next) => {
      try {
        const userId = req.user._id;
        await UserController.updateAvatar(userId, req.file);

        res.status(200).json({
          message: "Imaginea a fost incarcata cu succes",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post("/login", validate(validateLogin()), async (req, res, next) => {
    try {
      const response = await UserController.userLogin(req.body);

      if (response.isBanned) {
        return res
          .json({
            isBanned: response.isBanned,
            reason: response.reason,
            endTime: response.endTime,
          })
          .status(403);
      } else {
        res.status(200).json({
          isBanned: false,
          token: response.token,
        });
      }
    } catch (err) {
      return res.json({ message: err.message }).status(401);
    }
  });

  router.put("/confirm/:codeId", async (req, res, next) => {
    try {
      const confirmationCodeId = req.params.codeId;
      const message = await UserController.confirmAccount(confirmationCodeId);

      res.status(200).json({
        message,
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/request-confirmation", async (req, res, next) => {
    try {
      const userEmail = req.body.email;
      await UserController.requestConfirmationCode(userEmail);

      res.status(200).json({
        message:
          "Un email cu detalii privind confirmarea contului a fost trimis pe adresa dumneavoastra",
      });
    } catch (err) {
      return res.json({ err: err.message }).status(400);
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
        return res.json({ err: err.message }).status(400);
      }
    }
  );

  router.post(
    "/password-reset/:codeId",
    validate(validatePassChangeReset()),
    async (req, res, next) => {
      try {
        const { newPassword } = req.body;
        const codeId = req.params.codeId;
        await UserController.resetPassword(newPassword, codeId);

        res.status(200).json({
          message: "Parola a fost actualizata cu succes",
        });
      } catch (err) {
        res
          .json({
            err: err.message,
          })
          .status(400);
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

  router.get("/:id", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await UserController.getUserById(userId);

      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", isAuthorized, async (req, res, next) => {
    try {
      await UserController.deleteUser(req.params.id);

      res.status(200).json({ message: "User-ul a fost sters cu succes" });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = userRoutes();
