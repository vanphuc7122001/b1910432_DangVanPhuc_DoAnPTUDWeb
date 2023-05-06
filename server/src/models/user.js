const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
  },
  address: {
    type: String,
  },
  token: {
    type: String,
  },
});

//Export the model
const User = mongoose.model("user", userSchema);
module.exports = User;
