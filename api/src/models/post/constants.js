const path = require("path");

const POST_PICTURES_PATH = path.join(__dirname, "../../public/uploads/posts");
const POST_PLACEHOLDER = "placeholders/post-placeholder.jpg";

const STATUS_APPROVED = 1;
const STATUS_REJECTED = 2;
const STATUS_PENDING = 3;

module.exports = {
  POST_PICTURES_PATH,
  POST_PLACEHOLDER,
  STATUS_APPROVED,
  STATUS_REJECTED,
  STATUS_PENDING,
};
