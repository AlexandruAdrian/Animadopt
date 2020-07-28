const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfirmationCodeSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
});

const ConfirmationCode = new mongoose.model(
  "ConfirmationCode",
  ConfirmationCodeSchema
);

module.exports = ConfirmationCode;
