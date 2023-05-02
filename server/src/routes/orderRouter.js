const orderRouter = require("express").Router();
const orderController = require("../controllers/orderController");

orderRouter.get("/:id", orderController.show);
orderRouter.put("/:id", orderController.update);
orderRouter.delete("/:id", orderController.destroy);
orderRouter.post("/", orderController.create);
orderRouter.get("/", orderController.index);

module.exports = orderRouter;
