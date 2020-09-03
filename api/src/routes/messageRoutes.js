const express = require("express");
const isAuthorized = require("../middlewares/authorization");
const MessageController = require("../controllers/messageController");
const ConversationController = require("../controllers/conversationController");

const messageRoutes = () => {
  const router = express.Router();

  router.post("/:conversationId", isAuthorized, async (req, res, next) => {
    try {
      const conversationId = req.params.conversationId;
      const userId = req.user._id;
      const receiverId = req.body.receiverId;
      const message = req.body.message;
      const newMessage = await MessageController.createMessage(
        userId,
        receiverId,
        message,
        [userId, receiverId]
      );
      await ConversationController.addMessageToConv(
        newMessage._id,
        conversationId
      );

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:conversationId", isAuthorized, async (req, res, next) => {
    try {
      const conversationId = req.params.conversationId;
      const userId = req.user._id;
      const conversation = await ConversationController.findConversationById(
        conversationId
      );
      const messagesId = conversation.messages;
      const messages = await MessageController.getConversationMessages(
        messagesId,
        userId
      );

      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    "/:conversationId/:messageId",
    isAuthorized,
    async (req, res, next) => {
      try {
        const conversationId = req.params.conversationId;
        const messageId = req.params.messageId;
        const option = req.body.option;

        if (option.forAll) {
          await MessageController.deleteMessageForAll(messageId);
          await ConversationController.removeMessageFromConv(
            messageId,
            conversationId
          );
        } else {
          await MessageController.deleteMessageForOne(messageId);
        }

        res.status(200).json({
          message: "Mesajul a fost sters cu succes",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put("/seen", isAuthorized, async (req, res, next) => {
    try {
      const userId = req.user._id;
      await MessageController.markAsSeen(userId);
      console.log(userId);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });

  return router;
};

module.exports = messageRoutes();
