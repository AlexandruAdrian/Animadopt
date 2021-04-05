const AnimalCategories = require("../../models/animalCategories/animalCategoriesModel");
const categories = require("./data");

async function seedAnimalCategories() {
  console.log("** Creating Animal categories");
  await AnimalCategories.countDocuments({}, async (err, count) => {
    try {
      if (count <= 0) {
        await AnimalCategories.insertMany(categories);
      }
    } catch (err) {
      console.log("Failed to seed categories: ", err);
    }
  });
  console.log("** Created Animal categories");
}

module.exports = seedAnimalCategories;
