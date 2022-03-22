const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://postgres:root@localhost:5432/hsmvp"
);

module.exports = sequelize;
