const Member = require("../models/memberModel");
const axios = require("axios");
const subsURL = "http://localhost:8000/subscriptions";

const getAllMembers = () => {
  return new Promise((resolve, reject) => {
    Member.find({}, (err, allMembers) => {
      if (err) reject(err);
      else resolve(allMembers);
    });
  });
};

const getMemberById = (_id) => {
  return new Promise((resolve, reject) => {
    Member.findOne({_id}, (err, member) => {
      if (err) reject(err);
      else resolve(member);
    });
  });
};

const addMember = (member) => {
  return new Promise((resolve, reject) => {
    const newMember = new Member(member);
    newMember.save(async (err, member) => {
      if (err) reject(err);
      else {
        await axios.post(subsURL, { memberId: member._id });
        resolve("Member has been added.");
      }
    });
  });
};

const updateMember = (id, updatedMember) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndUpdate(id, updatedMember, (err) => {
      if (err) reject(err);
      else resolve("Member has been updated.");
    });
  });
};

const deleteMember = (id) => {
  return new Promise((resolve, reject) => {
    Member.findByIdAndDelete(id, async (err) => {
      if (err) reject(err);
      else {
        await axios.delete(`${subsURL}/${id}`);
        resolve("Member has been deleted.")
      };
    });
  });
};

module.exports = {
  getAllMembers,
  getMemberById,
  addMember,
  updateMember,
  deleteMember,
};
