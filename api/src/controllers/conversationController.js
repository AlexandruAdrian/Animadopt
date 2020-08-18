const Conversation = require("../models/conversationModel");

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
}

module.exports = new ConversationController();
