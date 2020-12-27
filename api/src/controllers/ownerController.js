// Models
const User = require("../models/user/userModel");
const Role = require("../models/role/roleModel");
const Notification = require("../models/notification/notificationModel");
// Constants
const { USER_ROLE_USER, USER_ROLE_ADMIN, USER_ROLE_OWNER } = require("../models/role/constants");
// Utilities
const ErrorsFactory = require("../factories/errorsFactory");

class OwnerController {
  async promoteUser(userId) {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Userul nu a fost gasit'
      );
    }

    const userRole = await Role.findOne({ _id: foundUser.role_id });
    if (!userRole) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Role not found'
      );
    }

    let notification;
    switch (userRole.type) {
      case USER_ROLE_USER:
        const adminRole = await Role.findOne({ type: USER_ROLE_ADMIN });
        notification = new Notification({
          forUserId: foundUser._id,
          message: "Ati fost promovat la rolul de Admin, va rugam sa va relogati"
        });
        foundUser.role_id = adminRole._id;
        break;
      case USER_ROLE_ADMIN:
        const ownerRole = await Role.findOne({ type: USER_ROLE_OWNER });
        foundUser.role_id = ownerRole._id;
        notification = new Notification({
          forUserId: foundUser._id,
          message: "Ati fost promovat la rolul de Owner, va rugam sa va relogati"
        });
        break;
      case USER_ROLE_OWNER:
      default:
        break;
    }

    await foundUser.save();
    await notification.save();
    return foundUser;
  }

  async demoteUser(userId) {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Userul nu a fost gasit'
      );
    }

    const userRole = await Role.findOne({ _id: foundUser.role_id });
    if (!userRole) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Role not found'
      );
    }

    let notification;
    switch (userRole.type) {
      case USER_ROLE_OWNER:
        const adminRole = await Role.findOne({ type: USER_ROLE_ADMIN });
        foundUser.role_id = adminRole._id;
        notification = new Notification({
          forUserId: foundUser._id,
          message: "Ati fost retrogradat la rolul de admin, va rugam sa va relogati"
        });
        break;
      case USER_ROLE_ADMIN:
        const userRole = await Role.findOne({ type: USER_ROLE_USER });
        foundUser.role_id = userRole._id;
        notification = new Notification({
          forUserId: foundUser._id,
          message: "Ati fost retrogradat la rolul de user, va rugam sa va relogati"
        });
        break;
      case USER_ROLE_USER:
      default:
        break;
    }

    await foundUser.save();
    await notification.save();
    return foundUser;
  }
}

module.exports = new OwnerController();
