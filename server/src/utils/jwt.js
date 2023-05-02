const jwt = require("jsonwebtoken");
require("dotenv").config();

const genneralToken = (payload) => {
  return (token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  }));
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = {
  genneralToken,
  verifyToken,
};
