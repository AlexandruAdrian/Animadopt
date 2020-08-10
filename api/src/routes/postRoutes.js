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

  return router;
};

module.exports = postRoutes();
