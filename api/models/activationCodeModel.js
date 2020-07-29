const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivationCodeSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  isValid: { type: Boolean, default: true },
  issuedAt: { type: Date, default: Date.now },
});

const ActivationCode = new mongoose.model(
  "ActivationCode",
  ActivationCodeSchema
);

module.exports = ActivationCode;
