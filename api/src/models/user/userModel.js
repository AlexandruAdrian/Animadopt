const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Post } = require("../post/postModel");
const { deletePictures } = require("../../utilities/deletePictures");
const asyncForEach = require("../../utilities/asyncForEach");
const {
  AVATAR_MALE_PLACEHOLDER,
  AVATAR_FEMALE_PLACEHOLDER,
  AVATAR_PICTURES_PATH,
} = require("./constants");

const Genders = Object.freeze({
  male: "M",
  female: "F",
});

const UserSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  gender: { type: String, enum: Object.values(Genders), required: true },
  ban_id: { type: mongoose.Types.ObjectId, default: null },
  role_id: { type: mongoose.Types.ObjectId, required: true },
  isActive: { type: Boolean, default: false },
  joinedDate: { type: Date, default: Date.now },
  avatar: {
    type: String,
    default: function () {
      if (this.gender === Genders.male) {
        return AVATAR_MALE_PLACEHOLDER;
      } else {
        return AVATAR_FEMALE_PLACEHOLDER;
      }
    },
  },
});

Object.assign(UserSchema.statics, { Genders });

UserSchema.pre("remove", async function (next) {
  const userPosts = await Post.find({ postedBy: this._id });
  await asyncForEach(userPosts, async (post) => {
    await post.delete();
  });
  deletePictures(this._id, AVATAR_PICTURES_PATH);
  next();
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
