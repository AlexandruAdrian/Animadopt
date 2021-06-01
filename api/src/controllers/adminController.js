// Models
const Post = require("../models/post/postModel");
const User = require("../models/user/userModel");
const Role = require("../models/role/roleModel");
const Ban = require("../models/ban/banModel");
const AnimalCategories = require("../models/animalCategories/animalCategoriesModel");
const Notification = require("../models/notification/notificationModel");
// Constants
const {
  STATUS_APPROVED,
  STATUS_PENDING,
  STATUS_REJECTED,
} = require("../models/post/constants");
// Utilities
const ErrorsFactory = require("../factories/errorsFactory");
const asyncForEach = require("../utilities/asyncForEach");
const mongoose = require("mongoose");
const {
  USER_ROLE_ADMIN,
  USER_ROLE_OWNER,
} = require("../models/role/constants");

class AdminController {
  async updatePostStatus(postId, status) {
    const foundPost = await Post.findOne({ _id: postId });

    if (!foundPost) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Anuntul nu a fost gasit"
      );
    }

    const isValidStatus =
      status === STATUS_APPROVED ||
      status === STATUS_REJECTED ||
      status === STATUS_PENDING;
    if (!isValidStatus) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Statusul este invalid"
      );
    }

    let notification;
    if (status === STATUS_APPROVED) {
      notification = new Notification({
        forUserId: foundPost.postedBy._id,
        item: {
          _id: foundPost._id,
          title: foundPost.title,
          status: STATUS_APPROVED,
        }
      });
      await notification.save();
    } else if (status === STATUS_REJECTED) {
      notification = new Notification({
        forUserId: foundPost.postedBy._id,
        item: {
          _id: foundPost._id,
          title: foundPost.title,
          status: STATUS_REJECTED,
        }
      });
      await notification.save();
    }

    foundPost.status = status;
    await foundPost.save();

    return foundPost;
  }

  async deletePost(postId) {
    const post = await Post.findOne({ _id: postId });
    const notification = new Notification({
      forUserId: post.postedBy._id,
      item: {
        _id: foundPost._id,
        title: foundPost.title,
        status: foundPost.status,
      }
    });
    await notification.save();
    await post.remove();
  }

  async isAllowed(byUser, targetUser) {
    const foundByUserRole = await Role.findOne({ _id: byUser.role_id });
    const foundTargetUserRole = await Role.findOne({
      _id: targetUser.role_id,
    });

    if (
      foundByUserRole.type === USER_ROLE_ADMIN &&
      (foundTargetUserRole.type === USER_ROLE_OWNER ||
        foundTargetUserRole.type === USER_ROLE_ADMIN)
    ) {
      throw new ErrorsFactory(
        "authorization",
        "Authorization",
        "Actiunea nu este permisa"
      );
    }

    if (
      foundByUserRole.type === USER_ROLE_OWNER &&
      foundTargetUserRole.type === USER_ROLE_OWNER
    ) {
      throw new ErrorsFactory(
        "authorization",
        "Authorization",
        "Actiunea nu este permisa"
      );
    }
  }

  async banUser(byUserId, targetUserId, startTime, endTime, reason) {
    const foundByUser = await User.findOne({ _id: byUserId });
    const foundUser = await User.findOne({ _id: targetUserId });

    if (!foundUser || !foundByUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "User-ul nu a fost gasit"
      );
    }

    await this.isAllowed(foundByUser, foundUser);

    const ban = new Ban({
      forUserId: foundUser._id,
      startTime: startTime,
      endTime: endTime,
      reason: reason,
    });

    await ban.save();

    return ban;
  }

  async unbanUser(userId) {
    const foundUser = await User.findOne({ _id: userId });
    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "User-ul nu a fost gasit"
      );
    }

    const ban = await Ban.findOne({ forUserId: foundUser._id }).sort({ _id: -1}).limit(1);
    ban.isValid = false;
    ban.save();

    return ban;
  }

  async getUserBanHistory(userId) {
    return await Ban.find({ forUserId: userId }).sort({ endTime: -1});
  }

  async getUsers(userId, page, limit, searchTerm, role) {
    const userRole = await Role.findOne({ type: role });
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
      role_id: userRole._id,
      _id: {
        $nin: [mongoose.Types.ObjectId(userId)],
      },
    };

    if (searchTerm) {
      const pattern = new RegExp(searchTerm, 'i');
      query = {
        ...query,
        $or: [
          { firstName: pattern },
          { lastName: pattern },
          { email: pattern },
        ],
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

    const tempResults = await User.find(query).skip(startIndex).limit(limit);

    if (tempResults) {
      await asyncForEach(tempResults, async (user) => {
        const foundBan = await Ban.findOne({ forUserId: user._id }).sort({ _id: -1}).limit(1);
        const role = await Role.findOne({ _id: user.role_id });

        user = user.toJSON();
        delete user.password;
        user.ban = foundBan;
        user.role = role;

        results.results.push(user);
      });
    }

    return results;
  }

  async getUserPosts(userId) {
    return await Post.find({ 'postedBy._id': mongoose.Types.ObjectId(userId) });
  }

  async getUserById(userId) {
    let foundUser = await User.findOne({ _id: userId });

    if (!foundUser) {
      throw new ErrorsFactory(
        "notfound",
        "NotFound",
        "Utilizatorul nu a fost gasit"
      );
    }

    const foundRole = await Role.findOne({ _id: foundUser.role_id });
    const foundBan = await Ban.findOne({ forUserId: foundUser._id });

    foundUser = foundUser.toJSON();
    foundUser.ban = foundBan;
    foundUser.role = foundRole;

    delete foundUser.password;

    return foundUser;
  }

  async getCategories() {
    return await AnimalCategories.find({});
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
      );
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
      );
    }

    if (foundCategory.isDefault) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Categoriile implicite nu se pot sterge"
      );
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
      );
    }

    if (foundCategory.isDefault) {
      throw new ErrorsFactory(
        "invalid",
        "InvalidError",
        "Categoriile implicite nu se pot modifica"
      );
    }

    const posts = await Post.find({ category: foundCategory.category });

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
