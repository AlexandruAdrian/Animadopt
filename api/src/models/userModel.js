const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = require("./postModel");
const { deleteUserPictures } = require("../utilities/deletePictures");
const asyncForEach = require("../utilities/asyncForEach");

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
        return "../../uploads/male-placeholder.png";
      } else {
        return "../../uploads/female-placeholder.png";
      }
    },
  },
});

Object.assign(UserSchema.statics, { Genders });

UserSchema.pre('remove', async function(next) {
  const userPosts = await Post.find({ postedBy: this._id });
  await asyncForEach(userPosts, async (post) => {
    await post.delete();
  });
  deleteUserPictures(this._id);
  next();
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;
