const fs = require("fs");
const Post = require("../models/postModel");
const ErrorsFactory = require("../factories/errorsFactory");

class PostController {
  async createPost(pictures, postData, userId) {
    const newPost = new Post({
      postedBy: userId,
      title: postData.title,
      description: postData.description,
      category: postData.category,
      location: postData.location,
    });

    const picturesPath = [];

    pictures.forEach((picture) => {
      const splitFileName = picture.filename.split("-");
      fs.rename(
        `${picture.destination}/${picture.filename}`,
        `${picture.destination}/${newPost._id}-${splitFileName[1]}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );

      const splitPath = picture.path.split("post-");
      const newPath = `${splitPath[0]}${newPost._id}-${splitFileName[1]}`;
      picturesPath.push(newPath);
    });

    newPost.pictures = picturesPath;
    await newPost.save();

    return newPost;
  }

  async getPostById(postId) {
    const foundPost = await Post.findOne({ _id: postId });

    if (!foundPost) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Postarea nu a fost gasita"
      );
    }

    return foundPost;
  }

  async deletePost(postId) {
    await Post.deleteOne({ _id: postId });
  }
}

module.exports = new PostController();
