const path = require("path");

const AVATAR_MALE_PLACEHOLDER = "placeholders/male-placeholder.png";
const AVATAR_FEMALE_PLACEHOLDER = "placeholders/female-placeholder.png";
const AVATAR_PICTURES_PATH = path.join(
  __dirname,
  "../../public/uploads/avatars"
);

module.exports = {
  AVATAR_MALE_PLACEHOLDER,
  AVATAR_FEMALE_PLACEHOLDER,
  AVATAR_PICTURES_PATH,
};
