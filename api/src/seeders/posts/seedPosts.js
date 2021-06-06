const Post = require("../../models/post/postModel");
const User = require("../../models/user/userModel");
const Category = require("../../models/animalCategories/animalCategoriesModel");
const County = require("../../models/counties/countiesModel");
const {
  STATUS_APPROVED,
  STATUS_REJECTED,
  STATUS_PENDING,
  POST_PLACEHOLDER,
} = require("../../models/post/constants");

async function seedPosts() {
  console.log("** Creating Posts");

  const users = await User.find({});
  const categories = await Category.find({});
  const counties = await County.find({});
  const posts = [];
  if ((await Post.countDocuments({})) <= 0) {
    users.forEach((user) => {
      for (let i = 0; i < 2; i++) {
        const randomCategory = Math.floor(Math.random() * 5);
        const randomCounty = Math.floor(Math.random() * 42);
        posts.push({
          pictures: [POST_PLACEHOLDER],
          postedBy: user,
          title: `Test post ${i}`,
          description:
            "Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet Lorem ipsum dolor amet ",
          breed: `Test breed ${i}`,
          category: categories[randomCategory].category,
          location: counties[randomCounty].county,
          status:
            i <= 15
              ? STATUS_APPROVED
              : i > 15 && i < 30
              ? STATUS_PENDING
              : STATUS_REJECTED,
        });
      }
    });
    try {
      await Post.insertMany(posts);
    } catch (err) {
      console.log(`Failed to seed posts: ${err}`);
    }
  }
  console.log("** Created Posts");
}

module.exports = seedPosts;
