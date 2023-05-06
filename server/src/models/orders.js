const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name_reciever: {
    type: String,
    index: true,
  },
  phone_reciever: {
    type: String,
  },
  address_reciever: {
    type: String,
  },
  status: {
    type: Number,
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
  },
});

//Export the model
const Order = mongoose.model("order", userSchema);
module.exports = Order;
