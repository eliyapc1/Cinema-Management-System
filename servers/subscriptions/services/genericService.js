const getAllObj = (Model) => {
  return new Promise((resolve, reject) => {
    Model.find({}, (err, allObj) => {
      if (err) reject(err);
      else resolve(allObj);
    });
  });
};

const getObjById = (Model, id) => {
  return new Promise((resolve, reject) => {
    Model.findById(id, (err, obj) => {
      if (err) reject(err);
      else resolve(obj);
    });
  });
};

const addObj = (Model, obj, docName) => {
  return new Promise((resolve, reject) => {
    const newObj = new Model(obj);
    newObj.save((err) => {
      if (err) reject(err);
      else resolve(`${docName} has been added.`);
    });
  });
};

const updateObj = (Model, id, updatedObj, docName) => {
  return new Promise((resolve, reject) => {
    Model.findByIdAndUpdate(id, updatedObj, (err) => {
      if (err) reject(err);
      else resolve(`${docName} has been updated.`);
    });
  });
};

const deleteObj = (Model, id, docName) => {
  return new Promise((resolve, reject) => {
    Model.findByIdAndDelete(id, (err) => {
      if (err) reject(err);
      else resolve(`${docName} has been deleted.`);
    });
  });
};

module.exports = { getAllObj, getObjById, addObj, updateObj, deleteObj };
