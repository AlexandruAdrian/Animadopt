// Models
const User = require("../models/user/userModel");
const Role = require("../models/role/roleModel");
const Ban = require("../models/ban/banModel");
const Notification = require("../models/notification/notificationModel");
// Constants
const {
  USER_ROLE_USER,
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
} = require("../models/role/constants");
// Constants
const {
  STATUS_APPROVED,
  STATUS_REJECTED,
} = require("../models/post/constants");
// Utilities
const ErrorsFactory = require("../factories/errorsFactory");

class OwnerController {
  async promoteUser(byUserId, targetUserId) {
    let foundByUser = await User.findOne({ _id: byUserId });
    let foundUser = await User.findOne({ _id: targetUserId });
    if (!foundUser || !foundByUser) {
      throw new ErrorsFactory("notfound", "NotFound", "Userul nu a fost gasit");
    }

    await this.isAllowed(foundByUser, foundUser);

    const userRole = await Role.findOne({ _id: foundUser.role_id });
    if (!userRole) {
      throw new ErrorsFactory("notfound", "NotFound", "Role not found");
    }

    let notification;
    switch (userRole.type) {
      case USER_ROLE_USER:
        const adminRole = await Role.findOne({ type: USER_ROLE_ADMIN });
        notification = new Notification({
          forUserId: foundUser._id,
          message:
            "Ati fost promovat la rolul de Admin",
          status: STATUS_APPROVED,
        });
        foundUser.role_id = adminRole._id;
        break;
      case USER_ROLE_ADMIN:
        const ownerRole = await Role.findOne({ type: USER_ROLE_OWNER });
        foundUser.role_id = ownerRole._id;
        notification = new Notification({
          forUserId: foundUser._id,
          message:
            "Ati fost promovat la rolul de Super Admin",
          status: STATUS_APPROVED,
        });
        break;
      case USER_ROLE_OWNER:
      default:
        break;
    }

    const foundBan = await Ban.findOne({ forUserId: foundUser._id });
    const role = await Role.findOne({ _id: foundUser.role_id });

    await foundUser.save();
    if (notification) {
      await notification.save();
    }

    foundUser = foundUser.toJSON();
    delete foundUser.password;
    foundUser.ban = foundBan;
    foundUser.role = role;

    return foundUser;
  }

  async demoteUser(byUserId, targetUserId) {
    let foundByUser = await User.findOne({ _id: byUserId });
    let foundUser = await User.findOne({ _id: targetUserId });
    if (!foundUser) {
      throw new ErrorsFactory("notfound", "NotFound", "Userul nu a fost gasit");
    }

    await this.isAllowed(foundByUser, foundUser);
    const userRole = await Role.findOne({ _id: foundUser.role_id });
    if (!userRole) {
      throw new ErrorsFactory("notfound", "NotFound", "Role not found");
    }

    let notification;
    switch (userRole.type) {
      case USER_ROLE_OWNER:
        const adminRole = await Role.findOne({ type: USER_ROLE_ADMIN });
        foundUser.role_id = adminRole._id;
        notification = new Notification({
          forUserId: foundUser._id,
          message:
            "Ati fost retrogradat la rolul de Admin",
          status: STATUS_REJECTED,
        });
        break;
      case USER_ROLE_ADMIN:
        const userRole = await Role.findOne({ type: USER_ROLE_USER });
        foundUser.role_id = userRole._id;
        notification = new Notification({
          forUserId: foundUser._id,
          message:
            "Ati fost retrogradat la rolul de User",
          status: STATUS_REJECTED,
        });
        break;
      case USER_ROLE_USER:
      default:
        break;
    }

    const foundBan = await Ban.findOne({ forUserId: foundUser._id });
    const role = await Role.findOne({ _id: foundUser.role_id });

    await foundUser.save();
    if (notification) {
      await notification.save();
    }

    foundUser = foundUser.toJSON();
    delete foundUser.password;
    foundUser.ban = foundBan;
    foundUser.role = role;

    return foundUser;
  }

  async isAllowed(byUser, targetUser) {
    const foundByUserRole = await Role.findOne({ _id: byUser.role_id });
    const foundTargetUserRole = await Role.findOne({
      _id: targetUser.role_id,
    });

    if (
      foundByUserRole.type === USER_ROLE_OWNER &&
      foundTargetUserRole.type === USER_ROLE_OWNER
    ) {
      throw new ErrorsFactory(
        "authorization",
        "Authorization",
        "Actiunea nu este permisa"
      );
    }
  }
}

module.exports = new OwnerController();
