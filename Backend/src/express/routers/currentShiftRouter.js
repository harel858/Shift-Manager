const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/auth.js");
const currentShiftHandlers = require("../handlers/currentShiftHandlers.js");

router.get("/", authenticateUser, currentShiftHandlers.getUserShift);

router.post("/create", authenticateUser, currentShiftHandlers.createShift);

router.put(
  "/update-paused",
  authenticateUser,
  currentShiftHandlers.updatePausedSeconds
);

router.put(
  "/update-start",
  authenticateUser,
  currentShiftHandlers.updateStartSeconds
);

router.delete("/delete", authenticateUser, currentShiftHandlers.deleteShift);

module.exports = router;
