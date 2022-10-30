const shiftModel = require("./shiftModel.js");

//get all user shifts
async function getAllUserShifts(userId, workPlace) {
  try {
    return await shiftModel
      .find({ userId: userId })
      .where("workPlace")
      .equals(workPlace);
  } catch (err) {
    console.log(err);
    return null;
  }
}

//get shifts by id and date
async function getShiftById(id, userId) {
  try {
    const shifts = await shiftModel.find({ userId: userId, _id: id });
    return shifts;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//create shift
async function createShift(shiftDetails) {
  try {
    const shift = new shiftModel(shiftDetails);
    await shift.save();
    return shift;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//update shift
async function updateShift(
  _id,
  workPlace,
  start,
  end,
  date,
  timeSpend,
  basicPayment,
  firstOverTime,
  overTime,
  totalProfit,
  seconds
) {
  try {
    let update = await shiftModel.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          workPlace: workPlace,
          start: start,
          end: end,
          date: date,
          timeSpend: timeSpend,
          basicPayment: basicPayment,
          firstOverTime: firstOverTime,
          overTime: overTime,
          totalProfit: totalProfit,
          seconds: seconds,
        },
      }
    );

    return update;
  } catch (err) {
    console.log(err);
    return null;
  }
}

//delete shift
async function deleteShift(id) {
  try {
    return await shiftModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  getAllUserShifts,
  createShift,
  updateShift,
  deleteShift,
  getShiftById,
};
