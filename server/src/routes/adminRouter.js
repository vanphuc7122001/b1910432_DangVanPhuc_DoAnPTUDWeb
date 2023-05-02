const adminRouter = require("express").Router();
const adminController = require("../controllers/adminController");

adminRouter.post("/login", adminController.login);

module.exports = adminRouter;
