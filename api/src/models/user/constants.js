const path = require("path");

const AVATAR_MALE_PLACEHOLDER = "resources/uploads/placeholders/male-placeholder.jpg"
const AVATAR_FEMALE_PLACEHOLDER = "resources/uploads/placeholders/female-placeholder.jpg"
const AVATAR_PICTURES_PATH = path.join(__dirname, "../../../resources/uploads/avatars");

module.exports = {
  AVATAR_MALE_PLACEHOLDER,
  AVATAR_FEMALE_PLACEHOLDER,
  AVATAR_PICTURES_PATH,
};