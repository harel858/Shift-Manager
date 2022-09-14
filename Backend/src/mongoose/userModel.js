const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: { type: String, require: true },
  isManager: Boolean,
});
const userModel = mongoose.model("user", schema);

module.exports = userModel;
