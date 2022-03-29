const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index");
});

router.use("/api", require("./api"));

module.exports = router;
