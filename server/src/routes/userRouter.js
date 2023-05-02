const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post("/login", userController.login);
userRouter.post("/register", userController.register);
userRouter.patch("/logout", userController.logout);

module.exports = userRouter;
