require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { http } = require("../constants");
const { ACCESS_TOKEN_SECRET = "SUPERSECRET" } = process.env; // Pull access token from env, if none is present use "SUPERSECRET"

const createAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const auth = {
  signup: async (req, res) => {
    try {
      // Code for registering a user
      // Extract user details from req.body && Validate fields - status 400 if not
      const { email, password, first_name, last_name } = req.body;

      if (!email || !password || !first_name || !last_name) {
        return res.status(http.BadRequest.code).json(http.BadRequest);
      }

      // Search db to see if user exists - if user exists return account created (security)
      let user = await User.findOne({ where: { email } });
      if (user) {
        return res
          .status(http.Success.code)
          .json({ message: "Account successfully created." });
      }

      // Create the user in the DB
      user = await User.create(
        {
          email,
          password,
          first_name,
          last_name,
        },
        { returning: true }
      );

      const token = createAccessToken({ id: user.id });
      return res.status(http.Success.code).json({ token });
    } catch (error) {
      console.error(error);
      return res
        .status(http.InternalServerError.code)
        .json(http.InternalServerError);
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(http.BadRequest.code).json(http.BadRequest);
      }

      const user = await User.findOne({
        where: { email },
      });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!user || !isMatch) {
        return res.status(http.Unauthorized.code).json({
          ...http.Unauthorized,
          message: "Invalid login credentials.",
        });
      }

      const token = createAccessToken({ id: user.id });

      res
        .status(http.Success.code)
        .json({ ...http.Success, message: "Login success!", token });
    } catch (error) {
      console.error(error);
      return res
        .status(http.InternalServerError.code)
        .json(http.InternalServerError);
    }
  },
};

module.exports = auth;
