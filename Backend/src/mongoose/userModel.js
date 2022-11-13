const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: { type: String, unique: true },
  currency: Object,
  payment: String,
  overTime: Boolean,
  phone: String,
  workPlaces: [{ type: String }],
  password: { type: String, require: true },
  isRunningShift: Boolean,
});
const userModel = mongoose.model("users", schema);

module.exports = userModel;
