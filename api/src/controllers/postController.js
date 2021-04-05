// System
const fs = require("fs");
const mongoose = require("mongoose");
// Models
const Post = require("../models/post/postModel");
const AnimalCategories = require("../models/animalCategories/animalCategoriesModel");
const Counties = require("../models/counties/countiesModel");
const User = require("../models/user/userModel");
// Constants
const {
  POST_PICTURES_PATH,
  STATUS_PENDING,
  STATUS_REJECTED,
} = require("../models/post/constants");
// Utilities
const { difference, pick } = require("lodash");
const ErrorsFactory = require("../factories/errorsFactory");

class PostController {
  async createPost(pictures, postData, userId) {
    let user = await User.findOne({ _id: userId });
    user = user.toJSON();
    user = pick(user, [
      "avatar",
      "firstName",
      "lastName",
      "phone",
      "email",
      "_id",
    ]);

    const newPost = new Post({
      postedBy: user,
      title: postData.title,
      description: postData.description,
      breed: postData.breed,
      category: postData.category,
      location: postData.location,
      status: STATUS_PENDING,
    });

    newPost.pictures = this.computePicturesPath(pictures, newPost._id);
    await newPost.save();
    const category = await AnimalCategories.findOne({
      category: newPost.category,
    });
    category.numberOfPosts += 1;
    await category.save();
    return newPost;
  }

  async updatePost(pictures, postData, postId, userId) {
    const foundPost = await Post.findOne({ _id: postId });

    if (!foundPost) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Aceasta postare nu exista"
      );
    }

    // Prevent update of posts that belong to other users
    if (foundPost.postedBy._id.toString() !== userId.toString()) {
      throw new ErrorsFactory("invalid", "InvalidError", "Actiune invalida");
    }

    let picturesPath;
    if (postData.pictures) {
      if (Array.isArray(postData.pictures)) {
        picturesPath = postData.pictures;
      } else {
        picturesPath = [postData.pictures];
      }
    } else {
      picturesPath = this.computePicturesPath(pictures, foundPost._id);
    }

    const diff = difference(foundPost.pictures, picturesPath);
    diff.forEach((picture) => {
      let filename = picture.split("posts/")[1];
      if (!filename) {
        filename = picture.split("posts\\")[1];
      }

      if (filename) {
        fs.unlink(`${POST_PICTURES_PATH}/${filename}`, (err) => {
          if (err) {
            throw new ErrorsFactory("notfound", "NotFound", "File not found.");
          }
        });
      }
    });

    const { title, description, breed, category, location } = postData;
    foundPost.title = title;
    foundPost.description = description;
    foundPost.breed = breed;
    foundPost.category = category;
    foundPost.location = location;
    foundPost.pictures = picturesPath;

    if (foundPost.status === STATUS_REJECTED) {
      foundPost.status = STATUS_PENDING;
    }

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

  async deletePost(postId, userId) {
    const post = await Post.findOne({ _id: postId });
    // Prevent deletion of posts that belong to other users

    if (post.postedBy._id.toString() !== userId.toString()) {
      throw new ErrorsFactory("invalid", "InvalidError", "Actiune invalida");
    }

    const category = await AnimalCategories.findOne({
      category: post.category,
    });
    category.numberOfPosts -= 1;
    await category.save();
    await post.remove();
  }

  async getPosts(page, limit, category, location, status, adopted, searchTerm) {
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

    let query = {
      isAdopted: adopted,
      status: status,
    };

    if (category) {
      query.category = { $in: category };
    }

    if (location) {
      query.location = { $in: location };
    }

    if (searchTerm) {
      query = {
        ...query,
        $or: [
          { title: new RegExp(searchTerm) },
          { breed: new RegExp(searchTerm) },
        ],
      };
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

  async markAsAdopted(postId, userId) {
    const foundPost = await Post.findOne({ _id: postId });

    if (foundPost.postedBy._id.toString() !== userId.toString()) {
      throw new ErrorsFactory("invalid", "InvalidError", "Actiune invalida");
    }

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

  async getTotalPostsLength() {
    return await Post.countDocuments({});
  }

  async fetchUserPosts(
    userId,
    page,
    limit,
    adopted,
    status,
    category,
    location,
    searchTerm
  ) {
    if (page < 1) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Numarul paginii trebuie sa aiba o valoare pozitiva"
      );
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {
      results: [],
    };

    let query = {
      "postedBy._id": mongoose.Types.ObjectId(userId),
      isAdopted: adopted,
      status: status,
    };

    if (category) {
      query.category = { $in: category };
    }

    if (location) {
      query.location = { $in: location };
    }

    if (searchTerm) {
      query = {
        ...query,
        $or: [
          { title: new RegExp(searchTerm) },
          { breed: new RegExp(searchTerm) },
        ],
      };
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

  async getCounties() {
    return await Counties.find({});
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
      const relativePath = splitPath[0].split("public\\")[1];
      const newPath = `${relativePath}${postId}-${splitFileName[1]}`.replace(
        /\\/g,
        "/"
      );

      picturesPath.push(newPath);
    });

    return picturesPath;
  }
}

module.exports = new PostController();
