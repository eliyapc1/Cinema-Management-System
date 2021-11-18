const express = require("express");
const services = require("../services/moviesService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const allMovies = await services.getAllMovies();
    return res.json(allMovies);
  } catch (error) {
    return res.json(error.message);
  }
});

router.route("/:id").get(async ({ params: { id } }, res) => {
  try {
    const movie = await services.getMovieById(id);
    return res.json(movie);
  } catch (error) {
    return res.json(error.message);
  }
});

router.route("/").post(async ({ body: movie }, res) => {
  try {
    const result = await services.addMovie(movie);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

router.route("/:id").put(async ({ body: movie, params: { id } }, res) => {
  try {
    const result = await services.updateMovie(id, movie);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

router.route("/:id").delete(async ({ params: { id } }, res) => {
  try {
    const result = await services.deleteMovie(id);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

module.exports = router;
