// System
const express = require("express");
// Controllers
const CategoriesController = require("../controllers/categoriesController");
// Middleware
const isAuthorized = require("../middlewares/authorization");
const isBanned = require("../middlewares/isBanned");

const categoryRoutes = () => {
  const router = express.Router();

  router.get(
    "/",
    isAuthorized,
    isBanned,
    async (req, res, next) => {
    try {
      const categories = await CategoriesController.getCategories();

      res.status(200).json({ categories });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = categoryRoutes();