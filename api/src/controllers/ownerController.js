// Models
const User = require("../models/user/userModel");
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

    switch (userRole.type) {
      case USER_ROLE_USER:
        const adminRole = await Role.find({ type: USER_ROLE_ADMIN });
        foundUser.role_id = adminRole._id;
        break;
      case USER_ROLE_ADMIN:
        const ownerRole = await Role.find({ type: USER_ROLE_OWNER });
        foundUser.role_id = ownerRole._id;
        break;
      case USER_ROLE_OWNER:
      default:
        break;
    }

    foundUser.save();
    return foundUser;
  }

  async demoteUser() {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Userul nu a fost gasit'
      );
    }

    const userRole = await Role.findOne({ _id: foundUser.role_id });
    if (!foundRole) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Role not found'
      );
    }

    switch (userRole.type) {
      case USER_ROLE_OWNER:
        const adminRole = await Role.find({ type: USER_ROLE_ADMIN });
        foundUser.role_id = adminRole._id;
        break;
      case USER_ROLE_ADMIN:
        const userRole = await Role.find({ type: USER_ROLE_USER });
        foundUser.role_id = userRole._id;
        break;
      case USER_ROLE_USER:
      default:
        break;
    }

    foundUser.save();
    return foundUser;
  }
}

module.exports = new OwnerController();
