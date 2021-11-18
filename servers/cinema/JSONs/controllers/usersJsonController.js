const express = require("express");
const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../services/usersJsonService");

const router = express.Router();

router.route("/").get(async (req, res) => {
  getAllUsers()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.route("/:id").get(async (req, res) => {
  getUserById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

router.route("/").post(async (req, res) => {
  addUser(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.route("/:id").put(async (req, res) => {
  updateUser(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.route("/:id").delete(async (req, res) => {
  deleteUser(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
