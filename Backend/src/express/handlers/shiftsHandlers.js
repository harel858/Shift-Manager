const shiftsOperations = require("../../mongoose/shiftOperations.js");

//get all shifts
async function getUserShifts(req, res) {
  const { userId } = req;
  const userShifts = await shiftsOperations.getAllUserShifts(userId);

  if (!userShifts) {
    return res.status(500).send(`Something went wrong`);
  }

  if (userShifts.length <= 0) {
    return res.status(400).send(`You have no shifts yet, START WORKING!`);
  }

  return res.json(userShifts);
}

//create shifts
async function createShift(req, res) {
  const { userId } = req;
  const {
    start,
    end,
    date,
    timeSpend,
    totalProfit,
    seconds,
    basicPayment,
    firstOverTime,
    overTime,
  } = req.body;
  const newShift = await shiftsOperations.createShift({
    start,
    end,
    date,
    userId,
    timeSpend,
    totalProfit,
    seconds,
    basicPayment,
    firstOverTime,
    overTime,
  });

  if (
    !start ||
    !end ||
    !date ||
    !timeSpend ||
    !totalProfit ||
    !seconds ||
    !basicPayment
  )
    return res.status(400).json(`missing part`);
  if (!newShift) {
    return res.status(500).json(`something went wrong`);
  }
  res.status(201).json(newShift);
}

//update shift
async function updateShift(req, res) {
  const { userId } = req;
  const {
    _id,
    start,
    end,
    date,
    timeSpend,
    basicPayment,
    firstOverTime,
    overTime,
    totalProfit,
    seconds,
  } = req.body;
  let shift = await shiftsOperations.getShiftById(_id, userId);
  if (!shift || shift.length <= 0) {
    return res.status(500).send(`shift has not found`);
  }

  let updatedShift = await shiftsOperations.updateShift(
    _id,
    start,
    end,
    date,
    timeSpend,
    basicPayment,
    firstOverTime,
    overTime,
    totalProfit,
    seconds
  );

  if (!updatedShift || updatedShift.acknowledged == false) {
    return res.status(500).json(`someThing went wrong`);
  }
  updatedShift = await shiftsOperations.getShiftById(_id, userId);
  return res.json(updatedShift);
}

//delete shifts
async function deleteShift(req, res) {
  const { userId } = req;
  const { id } = req.body;
  if (!id) {
    return res.status(400).json(`shift id is required`);
  }
  const shift = await shiftsOperations.getShiftById(id, userId);
  if (!shift || shift.length <= 0) {
    return res.status(500).json(`shift has not found`);
  }
  const deletedShift = await shiftsOperations.deleteShift(id);
  return res.status(201).json(`${deletedShift.date} shift has been deleted `);
}

module.exports = { getUserShifts, createShift, updateShift, deleteShift };
