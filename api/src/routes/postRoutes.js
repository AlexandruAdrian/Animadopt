const express = require("express");
const PostController = require("../controllers/postController");
const upload = require("../middlewares/multer");
const isAuthorized = require("../middlewares/authorization");

const postRoutes = () => {
  const router = express.Router();

  router.post(
    "/",
    isAuthorized,
    upload.array("pictures", 5),
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

  router.get("/:postId", isAuthorized, async (req, res, next) => {
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

  router.get("/user/:userId", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const userPosts = await PostController.fetchUserPosts(userId);

      res.status(200).json({ posts: userPosts });
    } catch (err) {
      next(err);
    }
  });

  router.get("/", isAuthorized, async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 3;
      const results = await PostController.getPosts(page, limit);

      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = postRoutes();
