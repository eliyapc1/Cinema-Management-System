const express = require("express");
const axios = require("axios");

const router = express.Router();

const API = "http://localhost:8000/subscriptions";

router.route("/").get(async (req, res) => {
  try {
    const { data: allSubs } = await axios.get(API);
    return res.json(allSubs);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/:id").get(async ({ params: { id } }, res) => {
  try {
    const { data: sub } = await axios.get(`${API}/${id}`);
    return res.json(sub);
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

// router.route("/:id").put(async ({ body: updatedSub, params: { id } }, res) => {
//   try {
//     const { data: message } = await axios.put(`${API}/${id}`, updatedSub);
//     return res.json(message);
//   } catch (err) {
//     return res.json(err.message);
//   }
// });

router.route("/:id").delete(async ({ params: { id } }, res) => {
  try {
    const { data: message } = await axios.delete(`${API}/${id}`);
    return res.json(message);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/:memberId").put(async (req, res) => {
  // prettier-ignore
  const {body: movie, params: {memberId}} = req;
  try {
    const { data: message } = await axios.put(`${API}/${memberId}`, movie);
    console.log(message);
    return res.json(message);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/del/:memberId/:movieId").delete(async (req, res) => {
  const {
    params: { memberId, movieId },
  } = req;
  try {
    const { data: message } = await axios.delete(
      `${API}/del/${memberId}/${movieId}`
    );
    console.log(message);
    return res.json(message);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router
  .route("/del-all/:movieId")
  .delete(async ({ params: { movieId } }, res) => {
    try {
      const { data: message } = await axios.delete(`${API}/del-all/${movieId}`);
      console.log(message);
      return res.json(message);
    } catch (err) {
      return res.json(err.message);
    }
  });

router
  .route("/get-by-movie/:movieId")
  .get(async ({ params: { movieId } }, res) => {
    try {
      const { data: allSubsByMovie } = await axios.get(
        `${API}/get-by-movie/${movieId}`
      );
      return res.json(allSubsByMovie);
    } catch (err) {
      return res.json(err);
    }
  });

module.exports = router;
