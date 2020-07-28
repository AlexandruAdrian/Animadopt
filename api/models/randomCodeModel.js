const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RandomCodeSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  isValid: { type: Boolean, default: true },
});

const RandomCode = new mongoose.model("RandomCode", RandomCodeSchema);

module.exports = RandomCode;
