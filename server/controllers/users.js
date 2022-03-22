const { User } = require("../models");
const { http } = require("../constants");

const users = {
  getAllUsers: async (req, res) => {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      raw: true,
    });
    const response = users.map((user) => ({ ...user, location: "Portsmouth" }));
    res.json(response);
  },
  getUserInfo: async (req, res) => {
    try {
      const { id } = req.user;
      let response = {};
      const user = await User.findOne({
        where: { id },
        attributes: ["first_name", "last_name", "email", "id"],
        raw: true,
      });
      response = { ...user };
      res.status(http.Success.code).json(response);
    } catch (error) {
      return res
        .status(http.InternalServerError.code)
        .json(http.InternalServerError);
    }
  },
};

module.exports = users;
