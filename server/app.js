const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { http } = require("./constants");

const routes = require("./routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use("/", routes);

/**
 * @desc  Catch 404 errors
 */
app.get("*", (req, res, next) => {
  res.status(http.NotFound.code).json(http.NotFound);
});

module.exports = app;
