const Conversation = require("../models/conversationModel");
const ErrorsFactory = require("../factories/errorsFactory");

class ConversationController {
  async findUserConversations(userId) {
    const conversations = await Conversation.find({
      $and: [
        {
          participants: {
            $in: userId,
          },
        },
        {
          showFor: {
            $in: userId,
          },
        },
      ],
    });

    return conversations;
  }

  async findConversationById(conversationId) {
    const conversation = await Conversation.findOne({
      _id: conversationId,
    });

    if (!conversation) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Conversatia nu a fost gasita"
      );
    }

    return conversation;
  }

  async createConversation(userId, receiverId) {
    const foundConversation = await Conversation.findOne({
      $or: [
        { participants: [userId, receiverId] },
        { participants: [receiverId, userId] },
      ],
    });

    if (foundConversation) {
      foundConversation.showFor = [userId, receiverId];
      await foundConversation.save();
      return foundConversation;
    }

    const newConversation = new Conversation({
      participants: [userId, receiverId],
      showFor: [userId, receiverId],
    });

    await newConversation.save();
    return newConversation;
  }

  async deleteConversation(conversationId, userId) {
    const foundConversation = await this.findConversationById(conversationId);
    foundConversation.showFor = foundConversation.showFor.filter(
      (id) => id.toString() !== userId.toString()
    );

    if (foundConversation.showFor.length < 1) {
      await Conversation.deleteOne({ _id: conversationId });
    } else {
      await foundConversation.save();
    }
  }

  async addMessageToConv(messageId, conversationId) {
    const foundConversation = await this.findConversationById(conversationId);
    foundConversation.messages.push(messageId);
    await foundConversation.save();
  }

  async removeMessageFromConv(messageId, conversationId) {
    const foundConversation = await this.findConversationById(conversationId);
    foundConversation.messages = foundConversation.messages.filter(
      (id) => id.toString() !== messageId.toString()
    );
    await foundConversation.save();
  }
}

module.exports = new ConversationController();
