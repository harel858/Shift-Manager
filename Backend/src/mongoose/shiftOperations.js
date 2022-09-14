const shiftModel = require("./shiftModel.js");

//get all user shifts
async function getAllUserShifts(userId) {
  try {
    return await shiftModel.find({ userId: userId });
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
    return await shiftModel(shiftDetails).save();
  } catch (err) {
    console.log(err);
    return null;
  }
}

//update shift
async function updateShift(id, filter, option) {
  try {
    return await shiftModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          [filter]: option,
        },
      }
    );
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
