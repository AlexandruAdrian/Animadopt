const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");

const Genders = Object.freeze({
  male: "M",
  female: "F",
});

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: Object.values(Genders), required: true },
  isActive: { type: Boolean, default: false },
  joinedDate: { type: Date, default: Date.now },
  avatar: {
    type: String,
    default: function () {
      if (this.gender === Genders.male) {
        return path.join(__dirname, "../placeholders/male-placeholder.png");
      } else {
        return path.join(__dirname, "../placeholders/female-placeholder.png");
      }
    },
  },
});

Object.assign(UserSchema.statics, { Genders });

const User = new mongoose.model("User", UserSchema);

module.exports = User;
