const mongoose = require("mongoose");

// Reference priorities to another schemas.
// Here memberId values is referenced to the ObjectId of the "member" schema.

// const Subs = new mongoose.Schema({
//   memberId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "member",
//     required: true,
//   },
//   movies: [
//     {
//       movieId: { type: mongoose.Schema.Types.ObjectId, ref: "movie" },
//       date: { type: Date, required: true },
//     },
//   ],
// });

// const Subs = new mongoose.Schema({
//   memberId: mongoose.Schema.Types.ObjectId,

//   movies: [
//     {
//       movieId: {type: mongoose.Schema.Types.ObjectId},
//       date: Date,
//     },
//   ],
// });

const Subs = new mongoose.Schema({
  memberId: mongoose.Schema.Types.ObjectId,

  movies: [
    {
      movieId: {type: mongoose.Schema.Types.ObjectId},
      date: Date,
    },
  ],
});

module.exports = mongoose.model("subscription", Subs);
