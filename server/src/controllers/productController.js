const Product = require("../models/product");
const ApiError = require("../utils/ApiError");

class productController {
  async index(req, res, next) {
    try {
      const respone = await Product.find({}).populate("caterogy_id");
      if (respone) {
        res.status(200).send({
          data: respone,
          success: 1,
        });
      } else {
        return next(new ApiError(400, "List product empty"));
      }
    } catch (e) {
      return next(new ApiError(500, e.message));
    }
  }

  async show(req, res, next) {
    const { id } = req.params;
    try {
      const respone = await Product.findOne({
        _id: id,
      }).populate("caterogy_id");
      if (respone) {
        return res.send({
          data: respone,
          success: 1,
        });
      } else {
        return next(new ApiError(404, "Not Found!!"));
      }
    } catch (error) {
      return next(new ApiError(500, "Internal Error Server!!"));
    }
  }

  async create(req, res, next) {
    // const { path } = req.file;
    // const imgUrl = path.slice(4, path.length);
    // const image = `http://localhost:9000/${imgUrl}`;
    // try {
    //   const product = new Product(req.body);
    //   const response = await product.save();
    //   if (response) {
    //     return res.status(201).send({
    //       data: response,
    //       success: 1,
    //     });
    //   } else {
    //     return res.status(400).send({
    //       data: response,
    //       success: 0,
    //     });
    //   }
    // } catch (error) {
    //   return next(new ApiError(500, "Internal Server Error!!"));
    // }

    try {
      const product = new Product(req.body);
      const response = await product.save();
      if (response) {
        res.status(201).json({
          data: response,
          success: true,
        });
      } else {
        return next(new ApiError(500, "Internal Server Error!!"));
      }
    } catch (error) {
      return next(new ApiError(500, error.message));
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    // const { path } = req.file;
    // const imgUrl = path.slice(4, path.length);
    // const image = `http://localhost:9000/${imgUrl}`;
    try {
      const payload = {
        ...req.body,
        // image,
      };
      const response = await Product.findByIdAndUpdate(
        {
          _id: id,
        },
        payload
      );
      if (response) {
        return res.status(201).send({
          data: response,
          success: 1,
        });
      } else {
        return res.status(400).send({
          data: response,
          success: 0,
        });
      }
    } catch (error) {
      return next(new ApiError(500, "Internal Server Error!!"));
    }
  }

  async destroy(req, res, next) {
    const { id } = req.params;
    try {
      const response = await Product.findByIdAndDelete({
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

module.exports = new productController();
