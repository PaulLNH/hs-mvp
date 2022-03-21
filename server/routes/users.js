const express = require("express");
const router = express.Router();
const { users } = require("../controllers");

/**
 * @desc Returns all users
 */
router.get("/", users.getAllUsers);

module.exports = router;
