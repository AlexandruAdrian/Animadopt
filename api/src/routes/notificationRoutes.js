// System
const express = require("express");
// Controllers
const NotificationController = require("../controllers/notificationController");
// Middlewares
const isAuthorized = require("../middlewares/authorization");
const isBanned = require("../middlewares/isBanned");

const notificationRoutes = () => {
  const router = express.Router();

  router.get(
    "/",
    isAuthorized,
    isBanned,
    async (req, res, next) => {
      try {
        const notifications = await NotificationController.getNotifications(req.user._id);

        res.status(200).json({ notifications });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/seen/:notificationId",
    isAuthorized,
    isBanned,
    async (req, res, next) => {
      try {
        const notification = await NotificationController.markAsSeen(req.params.notificationId, req.user._id);
        res.status(200).json({ notification });
      } catch(err) {
        next(err);
      }
    }
  );

  return router;
};

module.exports = notificationRoutes();
