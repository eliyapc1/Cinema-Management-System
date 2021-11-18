const User = require("./userModel");
const axios = require("axios");
const host = "http://localhost:8001";
const subsAPI = "http://localhost:8000/subscriptions"

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err, allUsers) => {
      if (err) reject(err);
      resolve(allUsers);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

const addUser = (user) => {
  return new Promise((resolve, reject) => {
    const newUser = new User(user);
    newUser.save(async (err, user) => {
      const id = user._id.toString();
      if (err)
        if (err.code === 11000) reject("Username is already exist.");
        else reject(err);
      try {
        await axios.post(`${host}/users-info`, { id });
        await axios.post(`${host}/users-perms`, { id });
        resolve({ message: "User has been added.", id });
      } catch (err) {
        console.log(err);
        reject("Succeed to add user to DB, but not his ID to data/perms Json.");
      }
    });
  });
};

const updateUser = (id, updatedUser) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, updatedUser, (err) => {
      if (err) reject(err);
      resolve({ message: "User has been updated.", id });
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, async (err) => {
      if (err) reject(err);
      try {
        await axios.delete(`${host}/users-info/${id}`);
        await axios.delete(`${host}/users-perms/${id}`);
        resolve("User has been deleted.");
      } catch (err) {
        reject(
          "Succeed to remove user from DB, but not his data/perms from Json."
        );
      }
    });
  });
};

const validateUser = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username, password }, (err, user) => {
      if (err) reject(err);
      resolve(user);
    });
  });
};

const validateNewUser = (username) => {
  // errors codes object;
  const errCode = { notfound: 1, passExist: 2 };
  return new Promise((resolve, reject) => {
    User.findOne(username, (err, user) => {
      if (err) reject(err);
      if (!user) resolve(errCode.notfound);
      else {
        if (user.password) resolve(errCode.passExist);
        resolve(user._id);
      }
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  validateUser,
  validateNewUser,
};
