const productRouter = require("express").Router();
const productController = require("../controllers/productController");
// const { uploadImages } = require("../middlewares/upload/uploadImages");

productRouter.get("/:id", productController.show);
productRouter.delete("/:id", productController.destroy);
productRouter.put(
  "/:id",
  //   uploadImages("imageProduct"),
  productController.update
);
// productRouter.post("/", uploadImages("imageProduct"), productController.create);
productRouter.post("/", productController.create);
productRouter.get("/", productController.index);

module.exports = productRouter;
