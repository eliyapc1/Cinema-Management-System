const usersLoginController = require("./database/usersController");
const usersJsonController = require("./JSONs/controllers/usersJsonController");
const permsJsonController = require("./JSONs/controllers/permsController");

const moviesApiController = require("./APIs/moviesController");
const membersApiController = require("./APIs/membersController");
const subsApiController = require("./APIs/subsController");

module.exports = {
  usersLogin: usersLoginController,
  usersInfo: usersJsonController,
  usersPerms: permsJsonController,
  moviesAPI: moviesApiController,
  membersAPI: membersApiController,
  subsAPI: subsApiController,
};
