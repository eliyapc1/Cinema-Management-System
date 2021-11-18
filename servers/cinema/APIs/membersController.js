const express = require("express");
const axios = require("axios");

const router = express.Router();

const API = "http://localhost:8000/members";

router.route("/").get(async (req, res) => {
  try {
    const { data: allMembers } = await axios.get(API);
    return res.json(allMembers);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/:id").get(async ({ params: { id } }, res) => {
  try {
    const { data: member } = await axios.get(`${API}/${id}`);
    return res.json(member);
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

router.route("/:id").put(async ({ body: updatedMember, params: { id } }, res) => {
  try {
    const { data: message } = await axios.put(`${API}/${id}`, updatedMember);
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
