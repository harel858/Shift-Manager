const express = require("express");
const router = express.Router();
const hashPassword = require("../../middleware/hashPassword.js");
const userHandlers = require("../handlers/userHandlers.js");
const authenticateUser = require("../../middleware/auth.js");

router.route("/").get(userHandlers.getAllUsers);
router.post("/registar", hashPassword, userHandlers.registarHandler);
router.put("/update", authenticateUser, userHandlers.updateUserHandler);
router.delete("/delete", authenticateUser, userHandlers.deleteUserHandler);
router.route("/login").post(userHandlers.signIn);

module.exports = router;
