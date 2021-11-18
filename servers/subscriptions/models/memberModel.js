const mongoose = require("mongoose");

const Member = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model("member", Member);
