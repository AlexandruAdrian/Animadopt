const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PassResetCodeSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  isValid: { type: Boolean, default: true },
  issuedAt: { type: Date, default: Date.now },
});

const PassResetCode = new mongoose.model("PassResetCode", PassResetCodeSchema);

module.exports = PassResetCode;
