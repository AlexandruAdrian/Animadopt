// Model
const Ban = require("../models/ban/banModel");

const isBanned = async (req, res, next) => {
  const ban = await Ban.findOne({ forUserId: req.user._id });

  if (ban && ban.isValid) {
    return res.status(401).json({
      error: "Nu sunteti autorizat pentru aceasta actiune"
    });
  }

  next();
}

module.exports = isBanned;
