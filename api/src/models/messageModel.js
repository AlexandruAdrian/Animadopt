const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  seen: { type: Boolean, default: false },
});

const MessageModel = new mongoose.Model("Message", MessageSchema);

module.exports = MessageModel;
