// System
const express = require("express");
// Controllers
const PostController = require("../controllers/postController");
// Middleware
const isAuthorized = require("../middlewares/authorization");
const upload = require("../middlewares/multer");
// Validators
const { query } = require("express-validator");
const validate = require("../validators/index");
const validatePost = require("../validators/validatePost");

const postRoutes = () => {
  const router = express.Router();

  router.post(
    "/",
    isAuthorized,
    upload.array("pictures", 5),
    validate(validatePost()),
    async (req, res, next) => {
      try {
        const pictures = req.files;
        const userId = req.user._id;
        const postData = req.body;

        const newPost = await PostController.createPost(
          pictures,
          postData,
          userId
        );

        res.status(201).json({
          message: "Postarea a fost creata cu succes",
          post: newPost,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:postId",
    isAuthorized,
    upload.array("pictures", 5),
    validate(validatePost()),
    async (req, res, next) => {
      try {
        const pictures = req.files;
        const postData = req.body;
        const postId = req.params.postId;
        const updatedPost = await PostController.updatePost(
          pictures,
          postData,
          postId
        );

        res.status(200).json({
          message: "Postarea a fost actualizata cu succes",
          post: updatedPost,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/:postId",
    isAuthorized,
    async (req, res, next) => {
    try {
      const post = await PostController.getPostById(req.params.postId);

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:postId", isAuthorized, async (req, res, next) => {
    try {
      await PostController.deletePost(req.params.postId);

      res.status(200).json({ message: "Postarea a fost stearsa cu succes" });
    } catch (err) {
      next(err);
    }
  });

  router.put("/adopted/:postId", isAuthorized, async (req, res, next) => {
    try {
      const postId = req.params.postId;
      await PostController.markAsAdopted(postId);

      res.status(200).json({
        message: "Postarea a fost actualizata cu succes",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/p/user", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.user._id;
      const userPosts = await PostController.fetchUserPosts(userId);

      res.status(200).json({ posts: userPosts });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/",
    isAuthorized,
    query("page").escape(),
    query("category").escape(),
    query("location").escape(),
    async (req, res, next) => {
      try {
        const page = parseInt(req.query.page);
        let category;
        let location;
        if (req.query.category) {
          category = req.query.category.split(",");
        }
        if (req.query.location) {
          location = req.query.location.split(",");
        }
        const limit = 10;
        const results = await PostController.getPosts(
          page,
          limit,
          category,
          location
        );

        res.status(200).json(results);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/poststotal",
    isAuthorized,
    async (req, res, next) => {
      try {
        const totalPosts = await PostController.getTotalPostsLength();

        res.status(200).json({
          totalPosts,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};

module.exports = postRoutes();
