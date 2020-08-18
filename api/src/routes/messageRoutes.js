const express = require("express");
const ConversationController = require("../controllers/conversationController");
const MessageController = require("../controllers/messageController");
const isAuthorized = require("../middlewares/authorization");

const messageRoutes = () => {
  const router = express.Router();

  router.post("/", isAuthorized, async (req, res, next) => {
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
  });

  return router;
};

module.exports = messageRoutes();
