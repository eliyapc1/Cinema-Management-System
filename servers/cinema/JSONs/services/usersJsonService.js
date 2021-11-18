const jf = require("jsonfile");
const path = require("path");
// const usersPath = path.resolve("users.json")

const usersPath = "./JSONs/users.json";
// const usersPath = '../users.json';

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    jf.readFile(usersPath, (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });
};

const getUserById = async (id) => {
  try {
    const users = await getAllUsers();
    return users.find((user) => user.id === id);
  } catch (err) {
    return err;
  }
};

const addUser = async (user) => {
  try {
    const users = await getAllUsers();
    users.push(user);

    jf.writeFile(usersPath, users, (err) => {
      if (err) return err;
    });
    return "User has been added.";
  } catch (err) {
    return err;
  }
};

const updateUser = async (id, {fname, lname, STO, date}) => {
  try {
    let users = await getAllUsers();
    users = users.map((user) => user.id === id ? {id, fname, lname, STO, date} : user);
    // console.log(users);
    jf.writeFile(usersPath, users, (err) => {
      if (err) return err;
    });
    return "User has been updated.";
  } catch (err) {}
};

const deleteUser = async (id) => {
  try {
    let users = await getAllUsers();
    users = users.filter((user) => user.id !== id);
    jf.writeFile(usersPath, users, (err) => {
      if (err) return err;
    });
    return "User has been deleted.";
  } catch (err) {
    return err;
  }
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
