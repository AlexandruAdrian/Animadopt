const AnimalCategories = require("../models/animalCategories/animalCategoriesModel");
const { animals } = require("./data");

function seedAnimalCategories() {
    console.log('Seeding Animal categories');
    AnimalCategories.countDocuments({}, (err, count) => {
        try {
            if (count <= 0) {
                AnimalCategories.insertMany(animals);
            }
        } catch (err) {
            console.log('Failed to seed categories: ', err);
        }
    });
}

module.exports = seedAnimalCategories;
