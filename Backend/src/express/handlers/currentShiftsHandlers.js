const currentShiftOperations = require("../../mongoose/currentShiftOperations.js");

async function getUserShifts(req, res) {
  const { userId } = req;
  const userShift = await currentShiftOperations.getCurrentShift(userId);

  if (!userShift) {
    return res.status(500).send(`Something went wrong`);
  }

  if (userShift.length <= 0) {
    return res.status(400).send(`no Shift running`);
  }

  return res.json(userShift);
}

async function createShift(req, res) {
  const { userId } = req;
  const { workPlace, start, date, startSeconds, pausedSeconds, startAgain } =
    req.body;
  const newShift = await currentShiftOperations.addCurrentShift({
    workPlace,
    start,
    date,
    startSeconds,
    pausedSeconds,
    startAgain,
    userId,
  });
  if (!workPlace || !start || !startSeconds || !date || !userId)
    return res.status(400).json(`missing part`);
  if (!newShift) {
    return res.status(500).json(`something went wrong`);
  }
  res.status(201).json(newShift);
}

async function updateStartAgain(req, res) {
  try {
    const { currentStartAgain } = req.body;
    const { userId } = req;
    const oldShift = await currentShiftOperations.getCurrentShift(userId);
    const { startAgain } = oldShift;
    const response = await currentShiftOperations.updateStartAgain(
      userId,
      +startAgain + currentStartAgain
    );
    if (!response || response.acknowledged == false) {
      return res.status(500).json(`someThing went wrong`);
    }
    const updatedShift = await currentShiftOperations.getCurrentShift(userId);
    return res.status(204).json(updatedShift);
  } catch (err) {
    console.log(err);
  }
}
async function updatePaused(req, res) {
  try {
    const { userId } = req;
    const { currentPaused } = req.body;
    const userShift = await currentShiftOperations.getCurrentShift(userId);

    if (!userShift) return res.status(500).json("no shift found");
    const { pausedSeconds } = userShift;

    const response = await currentShiftOperations.updatePaused(
      userId,
      +pausedSeconds + currentPaused
    );
    if (!response || response.acknowledged == false) {
      return res.status(500).json(`someThing went wrong`);
    }
    const updatedShift = await currentShiftOperations.getCurrentShift(userId);
    return res.status(204).json(updatedShift);
  } catch (err) {
    console.log(err);
  }
}

async function deleteShift(req, res) {
  const { userId } = req;

  const shift = await currentShiftOperations.getCurrentShift(userId);
  if (!shift || shift.length <= 0) {
    return res.status(500).json(`shift has not found`);
  }
  const deletedShift = await currentShiftOperations.deleteShift(userId);
  return res.status(201).json(`${deletedShift.date} shift has been deleted `);
}

module.exports = {
  getUserShifts,
  createShift,
  updateStartAgain,
  updatePaused,
  deleteShift,
};
