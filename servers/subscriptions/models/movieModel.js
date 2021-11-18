const mongoose = require("mongoose");

const Movie = new mongoose.Schema({
  name: { type: String, required: true },
  genres: { type: [String], required: true },
  image: {type: String, required: true },
  premiered: { type: Date, required: true },
});

module.exports = mongoose.model("movie", Movie);
