const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  seen: { type: Boolean, default: false },
  itemId: { type: mongoose.Types.ObjectId },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Notification = new mongoose.model('Notification', NotificationSchema);

module.exports = Notification;