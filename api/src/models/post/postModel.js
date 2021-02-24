const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { deletePictures } = require("../../utilities/deletePictures");
const { POST_PICTURES_PATH } = require("./constants");

const PostSchema = new Schema({
  postedBy: {
    type: {
      _id: mongoose.Types.ObjectId,
      firstName: String,
      lastName: String,
      email: String,
    }, required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  breed: { type: String, default: "Necunoscut" },
  postedAt: { type: Date, default: Date.now },
  category: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: Number, required: true },
  isAdopted: { type: Boolean, default: false },
  pictures: { type: [String], default: [] },
});

PostSchema.pre("remove", function (next) {
  deletePictures(this._id, POST_PICTURES_PATH);
  next();
});

const Post = new mongoose.model("Post", PostSchema);

module.exports = Post;
