const currentShiftModel = require("./currentShiftModel.js");

/* get all user shifts */
async function getUserCurrentShift(userId) {
  try {
    return await currentShiftModel.find({ userId: userId });
  } catch (err) {
    console.log(err);
    return null;
  }
}

//create shift
async function createShift(shiftDetails) {
  try {
    const shift = new currentShiftModel(shiftDetails);
    await shift.save();
    return shift;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//update shift PausedSeconds
async function updatePausedSeconds(
  _id,
  pausedSeconds,
  timeSpend,
  seconds,
  totalProfit,
  basicPayment,
  firstOverTimePay,
  overTimePay
) {
  try {
    let update = await currentShiftModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          pausedSeconds: pausedSeconds,
          timeSpend: timeSpend,
          seconds: seconds,
          totalProfit: totalProfit,
          basicPayment: basicPayment,
          firstOverTimePay: firstOverTimePay,
          overTimePay: overTimePay,
          isRunning: false,
        },
      }
    );

    return update;
  } catch (err) {
    console.log(err);
    return null;
  }
}
//update shift startSeconds
async function updateStartSeconds(_id, startAgain) {
  console.log(typeof startAgain);

  try {
    let update = await currentShiftModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          startAgain: startAgain,
          isRunning: true,
        },
      }
    );

    return update;
  } catch (err) {
    console.error(err);
    return null;
  }
}

//delete shift
async function deleteShift(id) {
  try {
    return await currentShiftModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getUserCurrentShift,
  createShift,
  updatePausedSeconds,
  updateStartSeconds,
  deleteShift,
};
