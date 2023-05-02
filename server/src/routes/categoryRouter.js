const caterogyRouter = require("express").Router();
const categoryController = require("../controllers/caterogyController");

caterogyRouter.get("/:id", categoryController.show);
caterogyRouter.delete("/:id", categoryController.destroy);
caterogyRouter.put("/:id", categoryController.update);
caterogyRouter.get("/", categoryController.index);
caterogyRouter.post("/", categoryController.create);

module.exports = caterogyRouter;
