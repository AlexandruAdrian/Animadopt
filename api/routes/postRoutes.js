const express = require("express");
const PostController = require("../controllers/postController");
const isAuthorized = require("../middlewares/authorization");

const postRoutes = () => {
  const router = express.Router();

  router.post("/create", isAuthorized, async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = postRoutes();
