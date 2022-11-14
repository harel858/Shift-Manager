const { boolean } = require("joi");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  workPlace: String,
  start: { type: String, require: true },
  date: String,
  startSeconds: { type: Number, require: true },
  pausedSeconds: { type: Number },
  startAgain: { type: Number },
  play: { type: Boolean },
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});
const currentShift = mongoose.model("currentShift", schema);

module.exports = currentShift;
