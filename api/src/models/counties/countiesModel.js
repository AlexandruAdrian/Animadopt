const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CountiesSchema = new Schema({
    key: { type: String, required: true},
    county: { type: String, required: true},
});

const Counties = new mongoose.model("Counties", CountiesSchema);

module.exports = Counties;
