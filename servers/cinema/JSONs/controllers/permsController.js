const express = require("express");
const {
  getAllPerms,
  getPermsById,
  addPerms,
  updatePerms,
  deletePerms,
} = require("../services/permsService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const allUsersPerms = await getAllPerms();
    return res.json(allUsersPerms);
  } catch (err) {
    return res.json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  try {
    const userPerms = await getPermsById(req.params.id);
    return res.json(userPerms);
  } catch (err) {
    res.json(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const result = await addPerms(req.body);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

router.route("/:id").put(async (req, res) => {
  try {
    const result = await updatePerms(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  try {
    const result = await deletePerms(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
