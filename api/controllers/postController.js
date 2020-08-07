const Post = require("../models/postModel");
const ErrorsFactory = require("../factories/errorsFactory");

class PostController {
  async createPost(pictures, postData, userId) {
    const newPost = new Post({
      postedBy: userId,
      title: postData.title,
      description: postData.description,
      type: postData.type,
      location: postData.location,
      pictures: pictures,
    });

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
}

module.exports = new PostController();
