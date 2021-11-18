const express = require("express");
const services = require("../services/subsService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const allSubs = await services.getAllSubs();
    return res.json(allSubs);
  } catch (error) {
    return res.json(error.message);
  }
});

router.route("/:id").get(async ({ params: { id } }, res) => {
  try {
    const sub = await services.getSubById(id);
    return res.json(sub);
  } catch (error) {
    return res.json(error.message);
  }
});

router.route("/").post(async ({ body: sub }, res) => {
  try {
    const result = await services.addSub(sub);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

// router.route("/:id").put(async ({ body: sub, params: { id } }, res) => {
//   try {
//     const result = await services.updateSub(id, sub);
//     return res.json(result);
//   } catch (error) {
//     return res.json(error.message);
//   }
// });

router.route("/:id").delete(async ({ params: { id } }, res) => {
  try {
    const result = await services.deleteSub(id);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});


router.route("/del/:memberId/:movieId").delete(async (req, res) => {
  const { params: { memberId, movieId } } = req;
  try {
    const result = await services.deleteSubMovie(memberId, movieId);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.route("/:memberId").put(async (req, res) => {
  const {body: movie, params: {memberId}} = req;
  try {
    const result = await services.addSubMovie(memberId, movie);
    return res.json(result);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

router.route("/del-all/:movieId").delete(async ({params: {movieId}}, res) => {
  try {
    const result = await services.deleteMovieFromAllSubs(movieId);
    return res.json(result)
  } catch (err) {
    return res.json(err.message)
  }
})

router.route("/get-by-movie/:movieId").get(async ({params: {movieId}, res}) => {
  try {
    const allSubsByMovie = await services.getAllSubsByMovie(movieId);
    return res.json(allSubsByMovie);
  } catch (err) {
    return res.json(err);
  }
})

module.exports = router;
