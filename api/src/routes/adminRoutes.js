// System
const express = require("express");
// Controllers
const AdminController = require("../controllers/adminController");
// Middleware
const isAuthorized = require("../middlewares/authorization");
const isAdminOrOwner = require("../middlewares/isAdmin");
// Validators
const { query } = require("express-validator");

const adminRoutes = () => {
  const router = express.Router();

  router.put(
    "/post/:postId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const updatedPost = await AdminController.updatePostStatus(
          req.params.postId,
          parseInt(req.body.status),
          req.body.message
        );

        res.status(200).json({
          updatedPost,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    "/post/:postId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        await AdminController.deletePost(req.params.postId, req.body.message);

        return res.status(200).json({
          message: "Postarea a fost stearsa cu succes",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/ban/:userId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const ban = await AdminController.banUser(
          req.user._id,
          req.params.userId,
          req.body.startTime,
          req.body.endTime,
          req.body.reason
        );

        res.status(200).json({
          message: "User-ul a fost blocat cu succes",
          ban,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/unban/:userId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const ban = await AdminController.unbanUser(req.params.userId);

        res.status(200).json({
          ban,
          message: "User-ul a fost deblocat",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/user/history/:userId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const banHistory = await AdminController.getUserBanHistory(
          req.params.userId
        );

        return res.status(200).json({
          banHistory,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    "/user/posts/:userId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const userPosts = await AdminController.getUserPosts(req.params.userId);

        return res.status(200).json({
          userPosts,
        });
      } catch (err) {
        next(err);
      }
    }
  )

  router.get(
    "/user/:userId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const user = await AdminController.getUserById(req.params.userId);

        return res.json({ user }).status(200);
      } catch (err) {
        return res
          .json({
            error: err.message,
          })
          .status(err.status || 500);
      }
    }
  );

  router.get(
    "/users",
    isAuthorized,
    isAdminOrOwner,
    query("page").escape(),
    query("search").escape(),
    async (req, res, next) => {
      try {
        const userId = req.user._id;
        const page = parseInt(req.query.page);
        const searchTerm = req.query.searchTerm;
        const role = req.query.role;
        const limit = 10;
        const results = await AdminController.getUsers(
          userId,
          page,
          limit,
          searchTerm,
          role
        );

        res.status(200).json(results);
      } catch (err) {
        res.sendStatus(400);
      }
    }
  );

  router.post(
    "/categories",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const newCategory = await AdminController.createCategory(req.body);

        res.status(200).json({
          message: "Categoria a fost creata cu succes",
          newCategory,
        });
      } catch (err) {
        return res.sendStatus(400);
      }
    }
  );

  router.put(
    "/categories/:categoryId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const updatedCategory = await AdminController.editCategory(
          req.params.categoryId,
          req.body
        );

        return res.status(200).json({
          message: "Categoria a fost actualizata cu success",
          updatedCategory,
        });
      } catch (err) {
        return res.sendStatus(400);
      }
    }
  );

  router.delete(
    "/categories/:categoryId",
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        await AdminController.deleteCategory(req.params.categoryId);

        res.status(200).json({
          message: "Categoria a fost stearsa cu succes",
          categoryId: req.params.categoryId,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};

module.exports = adminRoutes();
