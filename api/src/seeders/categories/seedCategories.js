const AnimalCategories = require("../../models/animalCategories/animalCategoriesModel");
const categories = require("./data");

function seedAnimalCategories() {
    console.log('** Creating Animal categories');
     AnimalCategories.countDocuments({}, (err, count) => {
        try {
            if (count <= 0) {
                AnimalCategories.insertMany(categories);
            }
        } catch (err) {
            console.log('Failed to seed categories: ', err);
        }
    });
    console.log('** Created Animal categories')
}

module.exports = seedAnimalCategories;
