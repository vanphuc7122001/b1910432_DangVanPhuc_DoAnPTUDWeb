require("dotenv").config();
const Admin = require("../models/admin");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");

class adminController {
  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      if (!(username && password)) {
        return next(
          new ApiError(400, "Username or password cannot be empty!!")
        );
      }
      const user = await Admin.findOne({
        username: username,
        password: password,
      }).exec();
      if (user) {
        const token = jwt.sign(
          { username: user.username, type: "admin" },
          process.env.TOKEN_KEY
        );
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json({ message: "Logged in successfully 😊 👌", token });
      }
    } catch (error) {
      new ApiError(500, "Internal Server Error!!");
    }
  }
}

module.exports = new adminController();
