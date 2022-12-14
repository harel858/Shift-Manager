const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true },
  currency: Object,
  payment: String,
  overTime: Boolean,
  phone: String,
  password: { type: String, require: true },
  isManager: Boolean,
});
const userModel = mongoose.model("users", schema);

module.exports = userModel;
