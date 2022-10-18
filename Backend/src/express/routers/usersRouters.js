const express = require("express");
const router = express.Router();
const hashPassword = require("../../middleware/hashPassword.js");
const userHandlers = require("../handlers/userHandlers.js");
const authenticateUser = require("../../middleware/auth.js");

router.get("/", authenticateUser, userHandlers.getUserDetails);
router.post("/register", hashPassword, userHandlers.registerHandler);
router.put("/update", authenticateUser, userHandlers.updateUserHandler);
router.put("/update-payment", authenticateUser, userHandlers.updateUserPayment);
router.put(
  "/update-currency",
  authenticateUser,
  userHandlers.updateCurrencyHandler
);
router.put(
  "/update-overtime",
  authenticateUser,
  userHandlers.overtimeUpdateHandler
);

router.delete("/delete", authenticateUser, userHandlers.deleteUserHandler);
router.route("/login").post(userHandlers.signIn);

module.exports = router;
