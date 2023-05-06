const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
var compression = require("compression");
const { dbConnect, countConnect } = require("./config/ConnectDB");
const ApiError = require("./utils/ApiError");
const { initRoutes } = require("./routes");
const path = require("path");
const app = express();

// init middleware
app.use(morgan("dev")); // contains http logger for development
app.use(helmet()); // avoid hacker probing
app.use(compression()); // reduce memory make app faster
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const pathPublic = path.join(__dirname, "./public");
console.log(pathPublic);
app.use("/public", express.static(pathPublic));

// init db
dbConnect();
countConnect();

// init routes
initRoutes(app);

//handling errors
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode,
    message: err.message || "internal sever error",
  });
});

module.exports = app;
