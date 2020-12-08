const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalCategoriesSchema = new Schema({
    key: { type: String, required: true},
    category: { type: String, required: true},
});

const AnimalCategories = new mongoose.model("AnimalCateogries", AnimalCategoriesSchema);

module.exports = AnimalCategories;
