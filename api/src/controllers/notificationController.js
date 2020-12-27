// Models
const Notification = require("../models/notification/notificationModel");
// Utilities
const ErrorsFactory = require("../factories/errorsFactory");

class NotificationController {
  async getNotifications(userId) {
    return await Notification.find({ forUserId: userId }).sort({ createdAt: -1 });
  }

  async markAsSeen(notificationId, userId) {
    const notification = await Notification.findOne({ _id: notificationId, forUserId: userId });

    if (!notification) {
      throw new ErrorsFactory('notfound', 'NotFound', 'Notificarea nu a fost gasita');
    }

    notification.seen = true;
    await notification.save();

    return notification;
  }
}

module.exports = new NotificationController();