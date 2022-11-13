const currentShift = require("./currentShift.js");

async function getCurrentShift(userId) {
  try {
    return await currentShift.find({ userId: userId });
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addCurrentShift(details) {
  return await new currentShift(details).save();
}

async function updatePaused(id, date) {
  try {
    const newPaused = await currentShift.findOneAndUpdate(
      { _id: id },
      { $set: { pausedSeconds: date } }
    );

    return newPaused;
  } catch (err) {
    console.log(err);
  }
}

async function updateStartAgain(id, date) {
  try {
    const startAgain = await currentShift.findOneAndUpdate(
      { _id: id },
      { $set: { startAgain: date } }
    );

    return startAgain;
  } catch (err) {
    console.log(err);
  }
}
async function deleteShift(userId) {
  try {
    return await currentShift.findByIdAndDelete({ userId: userId });
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getCurrentShift,
  addCurrentShift,
  updatePaused,
  updateStartAgain,
  deleteShift,
};
