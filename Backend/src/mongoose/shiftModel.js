const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  workPlace: String,
  start: String,
  end: String,
  date: String,
  timeSpend: String,
  basicPayment: String,
  firstOverTime: String,
  overTime: String,
  totalProfit: String,
  seconds: String,
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
});
const shiftModel = mongoose.model("shift", schema);

module.exports = shiftModel;
