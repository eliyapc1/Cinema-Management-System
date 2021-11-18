const express = require("express");
const {
  getAllObj,
  getObjById,
  addObj,
  updateObj,
  deleteObj,
} = require("../services/genericService");

const memberModel = require('../models/memberModel');
const movieModel = require('../models/movieModel');

const router = express.Router();

// GET
router.route("/").get(async (req, res) => {
  try {
    const allObj = await getAllObj();
    return res.json(allObj);
  } catch (error) {
    return res.json(error.message);
  }
});
// GET BY ID
router.route("/:id").get(async (req, res) => {
  try {
    const obj = await getObjById(req.params.id);
    return res.json(obj);
  } catch (error) {
    return res.json(error.message);
  }
});
// POST
router.route("/").post(async (req, res) => {
  try {
    const result = await addObj(req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});
// PUT
router.route("/:id").put(async (req, res) => {
  try {
    const result = await updateObj(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});
// DELETE
router.route("/:id").delete(async (req, res) => {
  try {
    const result = await deleteObj(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

module.exports = router;
