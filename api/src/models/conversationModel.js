const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
  participants: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    ],
  },
  messages: {
    type: [
      {
        typ: mongoose.Types.ObjectId,
        required: true,
      },
    ],
  },
});

const Conversation = new mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
