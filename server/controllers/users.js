const { User } = require("../models");
const { http } = require("../constants");

const users = {
  getAllUsers: (req, res) => {
    res.json({ firstName: "Paul", lastName: "Laird", location: "Portsmouth" });
  },
  getUserInfo: async (req, res) => {
    try {
      const { id } = req.user;
      console.log("id: ", id);
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
