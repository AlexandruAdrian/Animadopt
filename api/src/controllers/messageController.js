const Message = require("../models/messageModel");
const ErrorsFactory = require("../factories/errorsFactory");

class MessageController {
  async storeMessage(sender, message) {
    const newMessage = new Message({ sender, message });
    await newMessage.save();
    return newMessage._id;
  }
}

module.exports = new MessageController();
