const path = require("path");

const POST_PICTURES_PATH = path.join(__dirname, "../../../resources/uploads/posts");

const STATUS_APPROVED = 1;
const STATUS_REJECTED = 2;
const STATUS_PENDING = 3;

module.exports = {
  POST_PICTURES_PATH,
  STATUS_APPROVED,
  STATUS_REJECTED,
  STATUS_PENDING,
};
