const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  code: { type: String, required: true },
  isValid: { type: Boolean, default: true },
  type: { type: Number, required: true},
  issuedAt: { type: Date, default: Date.now },
});

const Code = new mongoose.model(
  "Code",
  CodeSchema
);

module.exports = Code;
