const axios = require("axios");
const dbURL = "http://localhost:8001/users-login";
// const {getAllUsers} = require('./database/usersService');

const createAdmin = async () => {
  try {
    const { data: allUsers } = await axios.get(dbURL);
    if (!allUsers.length) {
      await axios.post(dbURL, { username: "admin", password: "123" });
      console.log(
        "No users on DB. Admin user has been created.\nUsername: admin \nPassword: 123"
      );
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAdmin;
