const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  start: { type: String, require: true },
  date: { type: String, require: true },
  startSeconds: { type: Number, require: true },
  pausedSeconds: { type: Number },
  startAgain: { type: Number },
  timeSpend: { type: String },
  totalProfit: { type: Number, require: true },
  seconds: { type: Number, require: true },
  basicPayment: { type: Number, require: true },
  firstOverTimePay: { type: Number },
  overTimePay: { type: Number },
  isRunning: { type: Boolean },
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});
const currentShiftModel = mongoose.model("currentShift", schema);

module.exports = currentShiftModel;
