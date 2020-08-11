const fs = require("fs");
const Post = require("../models/postModel");
const ErrorsFactory = require("../factories/errorsFactory");

class PostController {
  async createPost(pictures, postData, userId) {
    const newPost = new Post({
      postedBy: userId,
      title: postData.title,
      description: postData.description,
      breed: postData.breed,
      category: postData.category,
      location: postData.location,
    });

    const picturesPath = this.computePicturesPath(pictures, newPost._id);

    newPost.pictures = picturesPath;
    await newPost.save();

    return newPost;
  }

  async updatePost(pictures, postData, postId) {
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Aceasta postare nu exista"
      );
    }

    const picturesPath = this.computePicturesPath(pictures, foundPost._id);

    const { title, description, breed, category, location } = postData;
    foundPost.title = title;
    foundPost.description = description;
    foundPost.breed = breed;
    foundPost.category = category;
    foundPost.location = location;
    foundPost.pictures = picturesPath;
    await foundPost.save();

    return foundPost;
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

  async markAsAdopted(postId) {
    const foundPost = await Post.findOne({ _id: postId });
    if (!foundPost) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Aceasta postare nu exista"
      );
    }

    foundPost.isAdopted = true;
    await foundPost.save();
  }

  computePicturesPath(pictures, postId) {
    const picturesPath = [];

    pictures.forEach((picture) => {
      const splitFileName = picture.filename.split("-");
      fs.rename(
        `${picture.destination}/${picture.filename}`,
        `${picture.destination}/${postId}-${splitFileName[1]}`,
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );

      const splitPath = picture.path.split("post-");
      const newPath = `${splitPath[0]}${postId}-${splitFileName[1]}`;
      picturesPath.push(newPath);
    });

    return picturesPath;
  }
}

module.exports = new PostController();
