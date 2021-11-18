const express = require("express");
const cors = require("cors");
const connectDB = require("./database/userDbConfig");
const routers = require('./routers');
const createAdmin = require('./utils');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB
app.use("/users-login", routers.usersLogin);
// JSONs
app.use("/users-info", routers.usersInfo);
app.use("/users-perms", routers.usersPerms);
// APIs
app.use("/api/movies", routers.moviesAPI);
app.use("/api/members", routers.membersAPI);
app.use("/api/subscriptions", routers.subsAPI);

createAdmin();

const port = 8001;

app.listen(port, () => {
  console.log(`Cinema server listening on port ${port}`);
});

require('dotenv').config();

console.log(process.env.NODE_PATH);