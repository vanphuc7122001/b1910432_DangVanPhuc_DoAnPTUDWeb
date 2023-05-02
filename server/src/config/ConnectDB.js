require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect.connection.readyState == 1) {
      // check connect in mongoose
      console.log("Connetion successfully established");
    } else {
      console.log("Connecting have problems");
    }
  } catch (error) {
    console.log("Connection error");
    throw new Error(error);
  }
};

//count connections
const countConnect = () => {
  const numberConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numberConnections}`);
};

module.exports = {
  dbConnect,
  countConnect,
};
