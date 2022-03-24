const express = require("express");
const router = express.Router();
const { users } = require("../controllers");
const { auth } = require("../middleware");

/**
 * @desc Returns all users
 */
router.get("/", users.getAllUsers);
router.get("/me", auth, users.getUserInfo);

module.exports = router;
