const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { genneralToken, verifyToken } = require("../utils/jwt");
const ls = require("local-storage");

class userController {
  async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        email,
      });
      if (user) {
        const payload = {
          id: user._id,
        };
        const token = genneralToken(payload);
        const isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
          user.token = token;
          user.save();
          ls.set("token", token);
          res.status(200).send({ success: 1, token });
        } else {
          return next(new ApiError(400, "wrong account or password"));
        }
      } else {
        return next(new ApiError(404, "Email not found!!"));
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }

  async register(req, res, next) {
    const { name, email, password, phone_number, address } = req.body;
    try {
      // tạo ra 1 chuổi ngẩu nhiên
      const salt = bcrypt.genSaltSync(10);
      // hash password = password + salt
      var hashPassword = bcrypt.hashSync(password, salt);

      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone_number,
        address,
      });
      if (newUser) {
        return res.status(201).send({
          success: 1,
          data: newUser,
        });
      } else {
        return next(new ApiError(500, error.message));
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }

  async logout(req, res, next) {
    const token = ls.get("token");
    const { id } = verifyToken(token);
    try {
      const resopne = await User.findOneAndUpdate(
        { _id: id },
        {
          token: "",
        }
      );
      if (resopne) {
        ls.remove("token");
        return res.status(200).send({
          success: 1,
        });
      } else {
        return res.status(200).send({
          success: 0,
        });
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
}

module.exports = new userController();
