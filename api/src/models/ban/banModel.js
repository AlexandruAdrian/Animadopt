const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BanSchema = new Schema({
  forUserId: { type: mongoose.Types.ObjectId, required: true },
  isValid: { type: Boolean, default: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  reason: { type: String },
});

const Ban = new mongoose.model('Ban', BanSchema);

module.exports = Ban;