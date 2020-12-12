const Message = require("../models/message/messageModel");
const ErrorsFactory = require("../factories/errorsFactory");

class MessageController {
  async createMessage(sender, receiver, message, showFor) {
    const newMessage = new Message({
      sender,
      receiver,
      message,
      showFor,
    });

    await newMessage.save();
    return newMessage;
  }

  async getConversationMessages(messagesId, userId) {
    const messages = Message.find({
      $and: [
        {
          _id: {
            $in: messagesId,
          },
        },
        {
          showFor: {
            $in: userId,
          },
        },
      ],
    });

    return messages;
  }

  async deleteMessageForOne(messageId) {
    const foundMessage = await this.findMessageById(messageId);

    foundMessage.showFor = foundMessage.showFor.filter(
      (id) => id.toString() !== foundMessage.sender.toString()
    );
    await foundMessage.save();
  }

  async deleteMessageForAll(messageId) {
    await Message.deleteOne({ _id: messageId });
  }

  async findMessageById(messageId) {
    const foundMessage = await Message.findOne({ _id: messageId });

    if (!foundMessage) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Mesajul nu a fost gasit"
      );
    }

    return foundMessage;
  }

  async markAsSeen(receiverId) {
    const filter = {
      $and: [
        {
          receiver: receiverId,
        },
        {
          seen: false,
        },
      ],
    };

    const update = {
      seen: true,
    };
    await Message.updateMany(filter, update);
  }
}

module.exports = new MessageController();
