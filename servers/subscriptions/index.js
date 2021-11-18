const express = require("express");
const cors = require("cors");
const fetchFromAPI = require("./utils/fetchUtils");
const connectDB = require("./config/subscriptionsDB");

const membersController = require("./controllers/membersController");
const moviesController = require("./controllers/moviesController");
const subsController = require("./controllers/subsController");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/members", membersController);
app.use("/movies", moviesController);
app.use("/subscriptions", subsController);

const port = 8000;

const membersURL = "https://jsonplaceholder.typicode.com/users";
const moviesURL = "https://api.tvmaze.com/shows";

fetchFromAPI(membersURL, "members");
fetchFromAPI(moviesURL, "movies");

app.listen(port, () => {
  console.log(`Subscription server is listening on port ${port}`);
});
