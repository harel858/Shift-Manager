const shiftsOperations = require("../../mongoose/shiftOperations.js");

//get all shifts
async function getUserShifts(req, res) {
  const { userId } = req;
  const userShifts = await shiftsOperations.getAllUserShifts(userId);
  console.log(userShifts);

  if (!userShifts) {
    return res.status(500).send(`Somthing went wrong`);
  }

  if (userShifts.length <= 0) {
    return res.status(400).send(`You have no shifts yet, START WORKING!`);
  }

  return res.json(userShifts);
}

//create shifts
async function createShift(req, res) {
  const { userId } = req;
  const { start, end, date } = req.body;
  const newShift = await shiftsOperations.createShift({
    start: start,
    end: end,
    date: date,
    userId: userId,
  });
  if (!newShift) {
    return res.status(500).send(`something went wrong`);
  }
  res.status(201).json(newShift);
}

//update shift
async function updateShift(req, res) {
  const { userId } = req;
  const { id, filter, option } = req.query;
  let shift = await shiftsOperations.getShiftById(id, userId);
  if (!shift || shift.length <= 0) {
    return res.status(500).send(`shift has not found`);
  }
  console.log(shift);

  let updatedShift = await shiftsOperations.updateShift(id, filter, option);
  console.log(updatedShift);
  if (!updatedShift || updatedShift.acknowledged == false) {
    return res.status(400).send(`someThing went wrong`);
  }
  updatedShift = await shiftsOperations.getShiftById(id, userId);
  return res.json(updatedShift);
}

//delete shifts
async function deleteShift(req, res) {
  const { userId } = req;
  const { id } = req.query;
  if (!id) {
    return res.status(400).send(`shift id is required`);
  }
  const shift = await shiftsOperations.getShiftById(id, userId);
  if (!shift || shift.length <= 0) {
    return res.status(500).send(`shift has not found`);
  }
  const deletedShift = await shiftsOperations.deleteShift(id);
  return res.status(201).send(`${deletedShift.date} shift has been deleted `);
}

module.exports = { getUserShifts, createShift, updateShift, deleteShift };
