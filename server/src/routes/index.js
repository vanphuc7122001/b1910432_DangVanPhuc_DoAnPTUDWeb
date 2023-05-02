const adminRouter = require("./adminRouter");
const caterogyRouter = require("./categoryRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const orderRouter = require("./orderRouter");

const initRoutes = (app) => {
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/caterogy", caterogyRouter);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/order", orderRouter);
};

module.exports = { initRoutes };
