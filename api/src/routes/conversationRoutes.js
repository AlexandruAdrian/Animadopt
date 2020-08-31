const express = require("express");
const ConversationController = require("../controllers/conversationController");
const isAuthorized = require("../middlewares/authorization");

const conversationRoutes = () => {
  const router = express.Router();

  router.get("/", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.user._id;
      const conversations = await ConversationController.findUserConversations(
        userId
      );

      res.status(200).json(conversations);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:conversationId", isAuthorized, async (req, res, next) => {
    try {
      const conversationId = req.params.conversationId;
      const conversation = await ConversationController.findConversationById(
        conversationId
      );

      res.status(200).json(conversation);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.user._id;
      const receiverId = req.body.receiverId;
      const newConversation = await ConversationController.createConversation(
        userId,
        receiverId
      );

      res.status(201).json(newConversation);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:conversationId", isAuthorized, async (req, res, next) => {
    try {
      const conversationId = req.params.conversationId;
      const userId = req.user._id;

      await ConversationController.deleteConversation(conversationId, userId);
      res.status(200).json({
        message: "Conversatia a fost stearsa cu succes",
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = conversationRoutes();
