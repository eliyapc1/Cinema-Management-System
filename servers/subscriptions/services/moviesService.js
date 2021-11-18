const Movie = require("../models/movieModel");
const axios = require("axios");
const subsAPI = "http://localhost:8000/subscriptions";

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    Movie.find({}, (err, allMovies) => {
      if (err) reject(err);
      else resolve(allMovies);
    });
  });
};

const getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findById(id, (err, movie) => {
      if (err) reject(err);
      else resolve(movie);
    });
  });
};

const addMovie = (movie) => {
  return new Promise((resolve, reject) => {
    const newMovie = new Movie(movie);
    newMovie.save((err) => {
      if (err) reject(err);
      else resolve("Movie has been added.");
    });
  });
};

const updateMovie = (id, updatedMovie) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndUpdate(id, updatedMovie, (err) => {
      if (err) reject(err);
      else resolve("Movie has been updated.");
    });
  });
};

const deleteMovie = (id) => {
  return new Promise((resolve, reject) => {
    Movie.findByIdAndDelete(id, async (err) => {
      if (err) reject(err);
      else {
        try {
          const { data: message } = await axios.delete(`${subsAPI}/del-all/${id}`);
          console.log(message);
        } catch (err) {
          reject(err);
        }
        resolve("Movie has been deleted.");
      }
    });
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
