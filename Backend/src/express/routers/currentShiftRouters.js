const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/auth.js");
const currentShiftsHandlers = require("../handlers/currentShiftsHandlers.js");

router.get("/", authenticateUser, currentShiftsHandlers.getUserShifts);
router.post("/create", authenticateUser, currentShiftsHandlers.createShift);
router.put(
  "/update-pause",
  authenticateUser,
  currentShiftsHandlers.updatePaused
);
router.put(
  "/update-startAgain",
  authenticateUser,
  currentShiftsHandlers.updateStartAgain
);
router.delete(
  "/deleteCurrent",
  authenticateUser,
  currentShiftsHandlers.deleteShift
);

module.exports = router;
