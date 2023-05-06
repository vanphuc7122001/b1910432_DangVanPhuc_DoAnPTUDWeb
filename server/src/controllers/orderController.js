const Order = require("../models/orders");
const ApiError = require("../utils/ApiError");

class orderController {
  async index(req, res, next) {
    try {
      const response = await Order.find({})
        .populate("owner")
        .populate("products");
      if (response) {
        return res.status(200).send({
          success: 1,
          data: response,
        });
      } else {
        return next(new ApiError(404, "Not having elements!!"));
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }

  async show(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Order.findOne({ _id: id })
        .populate("owner")
        .populate("products");
      if (response) {
        return res.status(200).send({
          success: 1,
          data: response,
        });
      } else {
        return next(new ApiError(404, "Not Found!!"));
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }

  async create(req, res, next) {
    try {
      const order = new Order(req.body);
      const response = await order.save();
      if (response) {
        res.status(201).json({
          success: true,
          data: response,
        });
      } else {
        return res.status(201).json({
          success: false,
        });
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const updated = await Order.findOneAndUpdate(
        { _id: id },
        {
          status,
        }
      );
      if (updated) {
        res.status(200).send(updated);
      } else {
        return next(new ApiError(404, "Not Found!!"));
      }
    } catch (error) {
      return next(new ApiError(500, "Internal Server Error!!"));
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Order.findByIdAndDelete({
        _id: id,
      });
      if (response) {
        return res.status(200).send({
          message: "Delete successfully",
          success: 1,
        });
      } else {
        return next(new ApiError(404, "Not Found!!"));
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }
}

module.exports = new orderController();
