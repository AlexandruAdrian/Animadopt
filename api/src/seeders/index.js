const seedAnimalCategories = require("./categories/seedCategories");
const seedCounties = require("./counties/seedCounties");
const seedUsersAndRoles = require("./users/seedUsers");
const seedPosts = require("./posts/seedPosts");

async function initSeeding() {
  console.log("* Initializing seeders");
  await seedAnimalCategories();
  await seedCounties();
  await seedUsersAndRoles();
  await seedPosts();
  console.log("* Seeding initialized \n");
}

module.exports = initSeeding;
