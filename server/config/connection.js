const Sequelize = require("sequelize");
const dbconfig = require("./dbconfig");
require("dotenv").config();
const { DATABASE_URL } = process.env;
const { LOCALDATABASE_URL } = dbconfig;

if (!DATABASE_URL || !LOCALDATABASE_URL) {
  throw new Error(
    "Error reading database connection string in the environment variables."
  );
}

const options = DATABASE_URL.includes("localhost")
  ? dbconfig.OPTIONS["localhost"]
  : dbconfig.OPTIONS["production"];

if (!options) {
  throw new Error("Error parsing database connection string.");
}

const sequelize = new Sequelize(DATABASE_URL || LOCALDATABASE_URL);

module.exports = sequelize;
