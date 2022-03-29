const express = require("express");
const router = express.Router();
const { users } = require("../../controllers");
const { auth } = require("../../middleware");

router.get("/", users.getAllUsers);
router.post("/", users.createUser);
router.get("/me", auth, users.getUserInfo);

module.exports = router;
