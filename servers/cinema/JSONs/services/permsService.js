const jf = require("jsonfile");
const path = require("path");

const permsPath = "JSONs/permissions.json";

const getAllPerms = () => {
  return new Promise((resolve, reject) => {
    jf.readFile(permsPath, (err, perms) => {
      if (err) reject(err);
      resolve(perms);
    });
  });
};

const getPermsById = async (id) => {
  try {
    const perms = await getAllPerms();
    return perms.find((perm) => perm.id === id);
  } catch (err) {
    return err;
  }
};

const addPerms = async (perm) => {
  try {
    const perms = await getAllPerms();
    perms.push(perm);
    jf.writeFile(permsPath, perms, (err) => {
      if (err) return err;
    });
    return "User's permissions have been added.";
  } catch (err) {
    return err;
  }
};

const updatePerms = async (id, updatedPerm) => {
  try {
    const oldPerms = await getAllPerms();
    const newPerms = oldPerms.map((perm) =>
      perm.id === id ? { id, perms: updatedPerm.perms } : perm
    );
    jf.writeFile(permsPath, newPerms, (err) => {
      if (err) return err;
    });
    return "User's permissions have been updated.";
  } catch (err) {
    return err;
  }
};

const deletePerms = async (id) => {
  try {
    let perms = await getAllPerms();
    perms = perms.filter((perm) => perm.id !== id);
    jf.writeFile(permsPath, perms, (err) => {
      if (err) return err;
    });
    return "User's permissions have been deleted.";
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllPerms,
  getPermsById,
  addPerms,
  updatePerms,
  deletePerms,
};
