const express = require("express");
const axios = require("axios");

const router = express.Router();

const API = "http://localhost:8000/movies";

router.route("/").get(async (req, res) => {
  try {
    const { data: allMovies } = await axios.get(API);
    return res.json(allMovies);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/:id").get(async ({ params: { id } }, res) => {
  try {
    const { data: movie } = await axios.get(`${API}/${id}`);
    return res.json(movie);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const { data: message } = await axios.post(API, req.body);
    return res.json(message);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/:id").put(async ({ body: updatedMovie, params: { id } }, res) => {
  try {
    const { data: message } = await axios.put(`${API}/${id}`, updatedMovie);
    return res.json(message);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/:id").delete(async ({ params: { id } }, res) => {
  try {
    const { data: message } = await axios.delete(`${API}/${id}`);
    return res.json(message);
  } catch (err) {
    return res.json(err.message);
  }
});

module.exports = router;
