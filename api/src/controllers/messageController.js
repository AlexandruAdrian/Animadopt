const Message = require("../models/messageModel");
const ErrorsFactory = require("../factories/errorsFactory");

class MessageController {
  async storeMessage(sender, message) {
    const newMessage = new Message({ sender, message });
    await newMessage.save();

    return newMessage._id;
  }

  async markAsSeen(messageId) {
    const message = await this.findMessageById(messageId);
    message.seen = true;
    await message.save();
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

  async deleteMessage(messageId) {
    await Message.deleteOne({ _id: messageId });
  }
}

module.exports = new MessageController();
