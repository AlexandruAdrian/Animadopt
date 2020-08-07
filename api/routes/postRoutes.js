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
        const picturesPath = [];
        const userId = req.user._id;
        const postData = req.body;

        req.files.forEach((picture) => {
          picturesPath.push(picture.path);
        });

        const newPost = await PostController.createPost(
          picturesPath,
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

  return router;
};

module.exports = postRoutes();
