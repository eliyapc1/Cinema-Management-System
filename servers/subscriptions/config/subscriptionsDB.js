const mongoose = require("mongoose");

const connectDB = () => {
  const URL = "mongodb://localhost:27017/subscriptionsDB";
  const options = {};
  mongoose.connect(URL, options);
};

module.exports = connectDB;
