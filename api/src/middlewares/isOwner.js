// Models
const User = require("../models/user/userModel");
const Role = require("../models/role/roleModel");
// Constants
const { USER_ROLE_OWNER } = require("../models/role/constants");

const isOwner = async (req, res, next) => {
  const foundUser = await User.findOne({ _id: req.user._id });
  if (!foundUser) {
    return res.status(401).json({
      error: "Nu sunteti autorizat pentru aceasta actiune",
    });
  }

  const foundRole = await Role.findOne({ _id: foundUser.role_id });
  if (!foundRole) {
    return res.status(401).json({
      error: "Nu sunteti autorizat pentru aceasta actiune",
    });
  }

  if (foundRole.type !== USER_ROLE_OWNER) {
    return res.status(401).json({
      error: "Nu sunteti autorizat pentru aceasta actiune",
    });
  }

  next();
};

module.exports = isOwner;