// System
const express = require("express");
// Controllers
const PostController = require("../controllers/postController");
// Middlewares
const isAuthorized = require("../middlewares/authorization");
const isBanned = require("../middlewares/isBanned");
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
    isBanned,
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
          success: true,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:postId",
    isAuthorized,
    isBanned,
    upload.array("pictures", 5),
    validate(validatePost()),
    async (req, res, next) => {
      try {
        const pictures = req.files;
        const postData = req.body;
        const postId = req.params.postId;
        const userId = req.user._id;
        const updatedPost = await PostController.updatePost(
          pictures,
          postData,
          postId,
          userId
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

  router.get("/:postId", isAuthorized, isBanned, async (req, res, next) => {
    try {
      const post = await PostController.getPostById(req.params.postId);

      res.status(200).json(post);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:postId", isAuthorized, isBanned, async (req, res, next) => {
    try {
      await PostController.deletePost(req.params.postId, req.user._id);

      res.status(200).json({ message: "Postarea a fost stearsa cu succes" });
    } catch (err) {
      next(err);
    }
  });

  router.put(
    "/adopted/:postId",
    isAuthorized,
    isBanned,
    async (req, res, next) => {
      try {
        await PostController.markAsAdopted(req.params.postId, req.user._id);

        res.status(200).json({
          message: "Postarea a fost actualizata cu succes",
        });
      } catch (err) {
        next(err);
      }
    }
  );


  router.get("/p/counties", isAuthorized, async (req, res, next) => {
    try {
      const counties = await PostController.getCounties();

      res.json(counties).status(200);
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/p/user",
    isAuthorized,
    isBanned,
    query("page").escape(),
    query("category").escape(),
    query("location").escape(),
    query("status").escape(),
    query("adopted").escape(),
    query("search").escape(),
    async (req, res, next) => {
      try {
        const userId = req.user._id;
        const page = parseInt(req.query.page);
        const searchTerm = req.query.search;
        let category;
        let location;
        let status;
        let adopted = false;

        if (req.query.status) {
          status = req.query.status;
        }

        if (req.query.adopted) {
          adopted = req.query.adopted;
        }

        if (req.query.category) {
          category = req.query.category.split(",");
        }

        if (req.query.location) {
          location = req.query.location.split(",");
        }

        const limit = 10;
        const results = await PostController.fetchUserPosts(
          userId,
          page,
          limit,
          adopted,
          status,
          category,
          location,
          searchTerm
        );

        res.status(200).json(results);
      } catch (err) {
        next(err);
      }
    });

  router.get(
    "/",
    isAuthorized,
    isBanned,
    query("page").escape(),
    query("title").escape(),
    query("category").escape(),
    query("location").escape(),
    query("status").escape(),
    query("adopted").escape(),
    async (req, res, next) => {
      try {
        const page = parseInt(req.query.page);
        let category;
        let location;
        let status;
        let title;
        let adopted = false;

        if (req.query.title) {
          title = req.query.title;
        }

        if (req.query.category) {
          category = req.query.category.split(",");
        }

        if (req.query.location) {
          location = req.query.location.split(",");
        }

        if (req.query.status) {
          status = req.query.status;
        }

        if (req.query.adopted) {
          adopted = req.query.adopted;
        }

        const limit = 10;
        const results = await PostController.getPosts(
          page,
          limit,
          category,
          location,
          status,
          adopted,
          title
        );

        res.status(200).json(results);
      } catch (err) {
        next(err);
      }
    }
  );

  router.get("/poststotal", isAuthorized, isBanned, async (req, res, next) => {
    try {
      const totalPosts = await PostController.getTotalPostsLength();

      res.status(200).json({
        totalPosts,
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = postRoutes();
