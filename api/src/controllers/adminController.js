// Models
const Post = require("../models/post/postModel");
const User = require("../models/user/userModel");
const Role = require("../models/role/roleModel");
const Ban = require("../models/ban/banModel");
const AnimalCategories = require("../models/animalCategories/animalCategoriesModel");
const Notification = require("../models/notification/notificationModel");
// Constants
const { USER_ROLE_USER } = require("../models/role/constants");
const { STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED } = require("../models/post/constants");
// Utilities
const ErrorsFactory = require("../factories/errorsFactory");
const asyncForEach = require("../utilities/asyncForEach");

class AdminController {
  async updatePostStatus(postId, status, message) {
    const foundPost = await Post.findOne({ _id: postId });

    if (!foundPost) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Anuntul nu a fost gasit'
      );
    }

    const isValidStatus = status === STATUS_APPROVED || status === STATUS_REJECTED || status === STATUS_PENDING;
    if (!isValidStatus) {
      throw new ErrorsFactory(
        'invalid',
        'InvalidError',
        'Statusul este invalid'
      );
    }

    let notification;
    if (status === STATUS_APPROVED) {
      notification = new Notification({
        forUserId: foundPost.postedBy,
        itemId: foundPost._id,
        message: "Postarea a fost aprobata",
      });
     await notification.save();
    } else if (status === STATUS_REJECTED) {
      notification = new Notification({
        forUserId: foundPost.postedBy,
        itemId: foundPost._id,
        message,
      });
      await notification.save();
    }

    foundPost.status = status;
    await foundPost.save();

    return foundPost;
  }

  async deletePost(postId, message) {
    const post = await Post.findOne({ _id: postId });
    const notification = new Notification({
      forUserId: post.postedBy,
      itemId: post._id,
      message,
    });
    await notification.save();
    await post.remove();
  }

  async banUser(userId, startTime, endTime, reason) {
    const foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'User-ul nu a fost gasit'
      );
    }

    const ban = new Ban({
      forUserId: foundUser._id,
      startTime: startTime,
      endTime: endTime,
      reason: reason,
    });

    ban.save();

    return ban;
  }

  async unbanUser(userId) {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'User-ul nu a fost gasit'
      );
    }

    const foundBan = await Ban.findOne({ forUserId: foundUser._id });
    if (!foundBan) {
      throw new ErrorsFactory(
        'notfound',
        'NotFound',
        'Ban-ul nu a fost gasit'
      );
    }

    foundBan.isValid = false;
    foundBan.save();
  }

  async getUserBanHistory(userId) {
    return await Ban.find({ forUserId: userId });
  }

  async getUsers(page, limit, searchTerm) {
    const userRole = await Role.findOne({ type: USER_ROLE_USER });
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
      role_id: userRole._id,
    };

    if (searchTerm) {
      query = {
        ...query,
        $or: [
          { firstName: searchTerm },
          { lastName: searchTerm },
          { email: searchTerm },
        ]
      };
    }

    if (endIndex < (await User.countDocuments(query))) {
      results.next = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
      };
    }

    results.results = await User.find(query).limit(limit).skip(startIndex);

    return results;
  }

  async createCategory(data) {
    const { key, category } = data;

    // Check if category has already been created
    const foundCategory = await AnimalCategories.findOne({ key, category });

    if (foundCategory) {
      throw new ErrorsFactory(
        "conflict",
        "ConflictError",
        "Categoria exista deja"
      )
    }

    const newCategory = new AnimalCategories({ key, category });
    await newCategory.save();

    return newCategory;
  }

  async deleteCategory(categoryId) {
    // Check if category has already been created
    const foundCategory = await AnimalCategories.findOne({ _id: categoryId });
    if (!foundCategory) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Categoria a fost deja eliminata"
      )
    }

    if (foundCategory.isDefault) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Categoriile implicite nu se pot sterge"
      )
    }

    if (foundCategory.numberOfPosts > 0) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Pentru a putea sterge o categorie aceasta nu trebuie sa contina nici un anunt"
      );
    } else {
      await foundCategory.remove();
    }

  }

  async editCategory(categoryId, data) {
    const foundCategory = await AnimalCategories.findOne({ _id: categoryId });
    if (!foundCategory) {
      throw new ErrorsFactory(
        "notfound",
        "NotFoundError",
        "Aceasta categorie nu exista"
      )
    }

    if (foundCategory.isDefault) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Categoriile implicite nu se pot modifica"
      );
    }

    const posts = await Post.find({ category: foundCategory.category});

    const { key, category } = data;
    foundCategory.key = key;
    foundCategory.category = category;
    await foundCategory.save();

    await asyncForEach(posts, async (post) => {
      post.category = foundCategory.category;
      await post.save();
    });

    return foundCategory;
  }
}

module.exports = new AdminController();
