require("dotenv").config();
const jwt = require("jsonwebtoken");
const { http } = require("../constants");
const { ACCESS_TOKEN_SECRET = "SUPERSECRET" } = process.env; // Pull access token from env, if none is present use "SUPERSECRET"

const auth = (req, res, next) => {
  try {
    const bearer = req.header("Authorization");
    if (!bearer) {
      return res.status(http.Unauthorized.code).json({
        ...http.Unauthorized,
        message: "Missing Authorization header.",
      });
    }
    const token =
      bearer.indexOf("Bearer") !== -1 ? bearer.split(" ")[1] : bearer;

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.error(err);
        return res.status(http.Unauthorized.code).json({
          ...http.Unauthorized,
          message: "Invalid Authentication, please login.",
        });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error(error);
    return res
      .status(http.InternalServerError.code)
      .json(http.InternalServerError);
  }
};

module.exports = auth;
