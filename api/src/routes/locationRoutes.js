// System
const express = require("express");
// Controllers
const LocationController = require("../controllers/locationController");
// Middleware
const isAuthorized = require("../middlewares/authorization");
const isBanned = require("../middlewares/isBanned");

const locationRoutes = () => {
  const router = express.Router();

  router.get(
    "/",
    isAuthorized,
    isBanned,
    async (req, res, next) => {
      try {
        const locations = await LocationController.getLocations();

        res.status(200).json({ locations });
      } catch (err) {
        next(err);
      }
  });

  return router;
}

module.exports = locationRoutes();