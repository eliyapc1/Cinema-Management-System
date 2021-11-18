const express = require("express");
const services = require("./usersService");

const router = express.Router();

// GET
router.route("/").get(async (req, res) => {
  try {
    const allUsers = await services.getAllUsers();
    return res.json(allUsers);
  } catch (err) {
    return res.json(err.message);
  }
});
// GET BY ID
router.route("/:id").get(async (req, res) => {
  try {
    const user = await services.getUserById(req.params.id);
    return res.json(user);
  } catch (err) {
    return res.json(err.message);
  }
});
// POST
router.route("/").post(async (req, res) => {
  try {
    const result = await services.addUser(req.body);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});
// PUT
router.route("/:id").put(async (req, res) => {
  try {
    const result = await services.updateUser(req.params.id, req.body);
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
});
// DELETE
router.route("/:id").delete(async (req, res) => {
  try {
    const result = await services.deleteUser(req.params.id);
    return res.json(result);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/validate").post(async ({ body }, res) => {
  try {
    const user = await services.validateUser(body);
    return res.json(user);
  } catch (err) {
    return res.json(err.message);
  }
});

router.route("/new/validate").post(async ({ body }, res) => {
  try {
    const result = await services.validateNewUser(body);
    return res.json(result);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
