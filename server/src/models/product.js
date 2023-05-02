const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  caterogy_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "caterogy",
  },
});

//Export the model
const Product = mongoose.model("product", productSchema);
module.exports = Product;
