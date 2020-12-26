// System
const express = require('express');
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
    '/post/:postId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const updatedPost = await AdminController.updatePostStatus(req.params.postId, parseInt(req.body.status));

        res.status(200).json({
          updatedPost,
        });
      } catch (err) {
        next(err);
      }
    }
  )

  router.delete(
    '/post/:postId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        await AdminController.deletePost(req.params.postId);

        return res.status(200).json({
          message: 'Postarea a fost stearsa cu succes',
        })
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/ban/:userId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const ban = await AdminController.banUser(
          req.params.userId,
          req.body.startTime,
          req.body.endTime,
          req.body.reason
        );

        res.status(200).json({
          message: 'User-ul a fost blocat',
          ban,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/unban/:userId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        await AdminController.unbanUser(req.params.userId);

        res.status(200).json({
          message: 'User-ul a fost deblocat',
        })
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/user/history/:userId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const banHistory = await AdminController.getUserBanHistory(req.params.userId);

        return res.status(200).json({
          banHistory,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/users',
    isAuthorized,
    isAdminOrOwner,
    query("page").escape(),
    query("search").escape(),
    async (req, res, next) => {
      try {
        const page = parseInt(req.query.page);
        const searchTerm = req.query.search;
        const limit = 10;
        const results = await AdminController.getUsers(page, limit, searchTerm);

        res.status(200).json(results);
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/categories',
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
        next(err);
      }
    }
  );

  router.put(
    '/categories/:categoryId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        const updatedCategory = await AdminController.editCategory(req.params.categoryId, req.body);

        res.status(200).json({
          message: "Categoria a fost actualizata cu success",
          updatedCategory,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/categories/:categoryId',
    isAuthorized,
    isAdminOrOwner,
    async (req, res, next) => {
      try {
        await AdminController.deleteCategory(req.params.categoryId);

        res.status(200).json({ message: "Categoria a fost eliminata cu succes" });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}

module.exports = adminRoutes();
