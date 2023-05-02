const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name_reciever: {
    type: String,
    required: true,
    index: true,
  },
  phone_reciever: {
    type: String,
    required: true,
  },
  address_reciever: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: "0",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
});

//Export the model
const Order = mongoose.model("order", userSchema);
module.exports = Order;
