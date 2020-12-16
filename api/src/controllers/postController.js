// System
const fs = require("fs");
// Models
const Post = require("../models/post/postModel");
// Constants
const { POST_PICTURES_PATH, STATUS_PENDING, STATUS_APPROVED } = require("../models/post/constants");
// Utilities
const { difference } = require('lodash');
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
      status: STATUS_PENDING,
    });

    newPost.pictures = this.computePicturesPath(pictures, newPost._id);
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
    const diff = difference(foundPost.pictures, picturesPath);

    diff.forEach(picture => {
      const filename = picture.split('posts\\')[1];

      fs.unlink(`${POST_PICTURES_PATH}/${filename}`, err => {
        if (err) {
          throw new ErrorsFactory('notfound', 'NotFound', 'File not found.');
        }
      });
    });

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
    const post = await Post.findOne({ _id: postId});

    await post.remove();
  }

  async getPosts(page, limit, category, location) {
    if (page < 1) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Numarul paginii trebuie sa aiba o valoare pozitiva"
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    const query = {
      isAdopted: false,
      status: STATUS_APPROVED,
    };
    if (category) {
      query.category = { $in: category };
    }

    if (location) {
      query.location = { $in: location };
    }

    if (endIndex < (await Post.countDocuments(query))) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
      };
    }

    results.results = await Post.find(query).limit(limit).skip(startIndex);

    return results;
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

  async fetchUserPosts(userId) {
    return await Post.find({ postedBy: userId, isAdopted: false });
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
      const relativePath = splitPath[0].split('Animadopt\\')[1];
      const newPath = `${relativePath}${postId}-${splitFileName[1]}`;

      picturesPath.push(newPath);
    });

    return picturesPath;
  }
}

module.exports = new PostController();
