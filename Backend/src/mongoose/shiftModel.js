const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  start: String,
  end: String,
  date: String,
  timeSpending: String,
  totalProfit: String,
  userId: { type: mongoose.Types.ObjectId, ref: "user" },
});
const shiftModel = mongoose.model("shift", schema);

module.exports = shiftModel;
