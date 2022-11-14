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
  try {
    return await new currentShift(details).save();
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updatePaused(id, date) {
  console.log(date);
  try {
    const newPaused = await currentShift.findOneAndUpdate(
      { userId: id },
      { $set: { pausedSeconds: date } }
    );

    return newPaused;
  } catch (err) {
    console.log(err);
  }
}

async function updateStartAgain(userId, date) {
  try {
    const startAgain = await currentShift.findOneAndUpdate(
      { userId: userId },
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
