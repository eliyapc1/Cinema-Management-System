const express = require("express");
const services = require("../services/membersService");

const router = express.Router();

// GET
router.route("/").get(async (req, res) => {
  try {
    const allMembers = await services.getAllMembers();
    return res.json(allMembers);
  } catch (error) {
    return res.json(error.message);
  }
});
// GET BY ID
router.route("/:id").get(async ({ params: { id } }, res) => {
  try {
    const member = await services.getMemberById(id);
    return res.json(member);
  } catch (error) {
    return res.json(error.message);
  }
});
// POST
router.route("/").post(async ({ body: member }, res) => {
  try {
    const result = await services.addMember(member);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});
// PUT
router.route("/:id").put(async ({ body: member, params: { id } }, res) => {
  try {
    const result = await services.updateMember(id, member);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});
// DELETE
router.route("/:id").delete(async ({ params: { id } }, res) => {
  try {
    const result = await services.deleteMember(id);
    return res.json(result);
  } catch (error) {
    return res.json(error.message);
  }
});

module.exports = router;
