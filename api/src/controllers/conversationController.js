const Conversation = require("../models/conversationModel");
const ErrorsFactory = require("../factories/errorsFactory");

class ConversationController {
  async findConversation(userId, receiverId) {
    const foundConversation = await Conversation.findOne({
      $or: [
        { participants: [userId, receiverId] },
        { participants: [receiverId, userId] },
      ],
    });

    if (foundConversation) {
      return foundConversation;
    }

    return null;
  }

  async findConversationById(conversationId) {
    const foundConversation = await Conversation.findOne({
      _id: conversationId,
    });

    if (!foundConversation) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Conversatia nu a fost gasita"
      );
    }

    return foundConversation;
  }

  async createConversation(userId, receiverId) {
    const foundConversation = await this.findConversation(userId, receiverId);

    if (foundConversation) {
      return foundConversation;
    }

    const newConversation = new Conversation({
      participants: [userId, receiverId],
    });

    return newConversation;
  }

  async sendMessage(userId, receiverId, messageId) {
    const conversation = await this.createConversation(userId, receiverId);

    conversation.messages.push(messageId);
    await conversation.save();
    return conversation;
  }

  async removeMessage(conversationId, messageId) {
    const conversation = await this.findConversationById(conversationId);
    const indexOfMessage = conversation.messages.indexOf(messageId);

    conversation.messages.splice(indexOfMessage, 1);
    await conversation.save();
  }
}

module.exports = new ConversationController();
