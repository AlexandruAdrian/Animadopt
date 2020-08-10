const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfirmationCodeSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  code: { type: String, required: true },
  isValid: { type: Boolean, default: true },
  issuedAt: { type: Date, default: Date.now },
});

const ConfirmationCode = new mongoose.model(
  "ConfirmationCode",
  ConfirmationCodeSchema
);

module.exports = ConfirmationCode;
