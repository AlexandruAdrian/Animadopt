const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  seen: { type: Boolean, default: false },
  item: {
    type: {
      _id: mongoose.Types.ObjectId,
      title: String,
      status: Number,
    },
  },
  message: { type: String },
  status: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Notification = new mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
