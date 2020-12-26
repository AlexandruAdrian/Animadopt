// Models
const AnimalCategories = require("../models/animalCategories/animalCategoriesModel");

class CategoriesController {
  async getCategories() {
    return await AnimalCategories.find({});
  }
}

module.exports = new CategoriesController();
