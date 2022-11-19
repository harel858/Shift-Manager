const operations = require("../../mongoose/currentShiftOperations.js");

//get shift
async function getUserShift(req, res) {
  const { userId } = req;
  const userShift = await operations.getUserCurrentShift(userId);

  if (!userShift) {
    return res.status(500).send(`No Shift Found`);
  }

  if (userShift.length <= 0) {
    return res.status(400).send(`No Shift Found`);
  }

  return res.json(userShift);
}

//create shift
async function createShift(req, res) {
  const { userId } = req;
  const {
    start,
    date,
    startSeconds,
    pausedSeconds,
    startAgain,
    timeSpend,
    totalProfit,
    seconds,
    basicPayment,
    firstOverTimePay,
    overTimePay,
  } = req.body;
  const newShift = await operations.createShift({
    start,
    date,
    startSeconds,
    pausedSeconds,
    startAgain,
    timeSpend,
    totalProfit,
    seconds,
    basicPayment,
    firstOverTimePay,
    overTimePay,
    isRunning: true,
    userId,
  });

  if (!start || !date || !startSeconds || !userId)
    return res.status(400).json(`missing part`);
  if (!newShift) {
    return res.status(500).json(`something went wrong`);
  }
  console.log(newShift);
  res.status(201).json(newShift);
}

//update shift PausedSeconds
async function updatePausedSeconds(req, res) {
  const { userId } = req;
  const {
    pausedSeconds,
    timeSpend,
    seconds,
    totalProfit,
    basicPayment,
    firstOverTimePay,
    overTimePay,
  } = req.body;
  const [userShift] = await operations.getUserCurrentShift(userId);

  if (!userShift || userShift.length <= 0)
    return res.status(500).send(`shift has not found`);
  console.log(userShift);
  const { _id } = userShift;
  let updatedShift = await operations.updatePausedSeconds(
    _id,
    pausedSeconds,
    timeSpend,
    seconds,
    totalProfit,
    basicPayment,
    firstOverTimePay,
    overTimePay
  );

  console.log(updatedShift);
  if (!updatedShift || updatedShift.acknowledged == false) {
    return res.status(500).json(`someThing went wrong`);
  }
  updatedShift = await operations.getUserCurrentShift(userId);
  return res.json(updatedShift);
}

//update shift StartSeconds
async function updateStartSeconds(req, res) {
  const { userId } = req;
  const { startAgain } = req.body;
  const [userShift] = await operations.getUserCurrentShift(userId);
  console.log(startAgain);
  if (!userShift || userShift.length <= 0)
    return res.status(500).send(`shift has not found`);

  console.log(`userShift:${userShift}`);
  const { _id } = userShift;
  console.log(`_id:${_id}`);
  let updatedShift = await operations.updateStartSeconds(_id, startAgain);
  console.log(`updatedShift:${updatedShift}`);
  if (!updatedShift || updatedShift.acknowledged == false) {
    return res.status(500).json(`someThing went wrong`);
  }
  updatedShift = await operations.getUserCurrentShift(userId);
  return res.json(updatedShift);
}

//delete shift
async function deleteShift(req, res) {
  const { userId } = req;

  const [userShift] = await operations.getUserCurrentShift(userId);
  if (!userShift || userShift.length <= 0)
    return res.status(500).send(`shift has not found`);

  const { _id } = userShift;
  let deletedShift = await operations.deleteShift(_id);

  if (!deletedShift) return res.status(500).json("not deleted");

  return res.status(201).json(deletedShift);
}

module.exports = {
  getUserShift,
  createShift,
  updatePausedSeconds,
  updateStartSeconds,
  deleteShift,
};
