// System
const express = require('express');
// Controllers
const OwnerController = require("../controllers/ownerController");
// Middleware
const isAuthorized = require("../middlewares/authorization");
const isOwner = require("../middlewares/isOwner");

const ownerRoutes = () => {
  const router = express.Router();

  router.put(
    '/promote/:userId',
    isAuthorized,
    isOwner,
    async (req, res, next) => {
      try {
        const promotedUser = await OwnerController.promoteUser(req.params.userId);

        res.status(200).json({
          message: 'Utilizatorul a fost promovat',
          promotedUser,
        })
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/demote/:userId',
    isAuthorized,
    isOwner,
    async (req, res, next) => {
      try {
        const demotedUser = await OwnerController.demoteUser(req.params.userId);

        res.status(200).json({
          message: 'Utilizatorul a fost retrogradat',
          demotedUser,
        })
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};

module.exports = ownerRoutes();