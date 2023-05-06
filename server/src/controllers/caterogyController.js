const Caterogy = require("../models/category");
const ApiError = require("../utils/ApiError");

class caterogyController {
  async index(req, res, next) {
    const listCategory = await Caterogy.find({});
    res.status(200).json(listCategory);
  }

  async show(req, res, next) {
    const { id } = req.params;
    const category = await Caterogy.findOne({ _id: id });
    if (category) {
      return res.status(200).send(category);
    } else {
      return next(new ApiError(404, "Not Found!!"));
    }
  }

  async create(req, res, next) {
    const { name } = req.body;
    if (!name) {
      return next(new ApiError(400, "Name cannot be empty!!"));
    }

    const caterogy = new Caterogy(req.body);
    const response = await caterogy.save();
    if (response) {
      res.status(201).json({
        data: response,
        success: true,
      });
    } else {
      return next(new ApiError(500, "Internal Server Error!!"));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;

    try {
      const updated = await Caterogy.findOneAndUpdate({ _id: id }, req.body);
      if (updated) {
        res.status(200).send({
          success: true,
        });
      } else {
        return next(new ApiError(404, "Not Found!!"));
      }
    } catch (error) {
      return next(new ApiError(500, "Internal Server Error!!"));
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    const category = await Caterogy.findByIdAndDelete({ _id: id });
    if (category) {
      res.status(200).json({
        message: "Delete category successfully",
      });
    }
    return next(new ApiError(404, "Not Found!!"));
  }
}

module.exports = new caterogyController();
