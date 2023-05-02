const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var caterogySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

//Export the model
const Caterogy = mongoose.model("caterogy", caterogySchema);
module.exports = Caterogy;
