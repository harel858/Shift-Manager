const express = require("express");
const router = express.Router();
const authenticateUser = require("../../middleware/auth.js");
const shiftsHandlers = require("../handlers/shiftsHandlers.js");
router.get("/", authenticateUser, shiftsHandlers.getUserShifts);
router.post("/create", authenticateUser, shiftsHandlers.createShift);
router.put("/update", authenticateUser, shiftsHandlers.updateShift);
router.delete("/delete", authenticateUser, shiftsHandlers.deleteShift);

module.exports = router;
