const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  type: { type: String, required: true },
});

const Role = new mongoose.model('Role', RoleSchema);

module.exports = Role;
