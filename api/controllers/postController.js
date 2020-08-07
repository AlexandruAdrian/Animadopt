const Post = require("../models/postModel");

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
}

module.exports = new PostController();
