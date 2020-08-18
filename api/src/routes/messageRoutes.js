const express = require("express");
const ConversationController = require("../controllers/conversationController");
const MessageController = require("../controllers/messageController");
const isAuthorized = require("../middlewares/authorization");

const messageRoutes = () => {
  const router = express.Router();

  router.post("/", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.user._id;
      const receiverId = req.body.receiver;
      const message = req.body.message;
      const messageId = await MessageController.storeMessage(userId, message);
      const conversation = await ConversationController.sendMessage(
        userId,
        receiverId,
        messageId
      );
      res.status(201).json(conversation);
    } catch (err) {
      next(err);
    }
  });

  router.put("/seen/:messageId", isAuthorized, async (req, res, next) => {
    try {
      const messageId = req.params.messageId;
      await MessageController.markAsSeen(messageId);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/delete/:messageId", isAuthorized, async (req, res, next) => {
    try {
      const conversationId = req.body.conversation;
      const messageId = req.params.messageId;
      await ConversationController.removeMessage(conversationId, messageId);
      await MessageController.deleteMessage(messageId);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = messageRoutes();
