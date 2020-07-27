const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  joinedDate: { type: Date, default: Date.now },
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
