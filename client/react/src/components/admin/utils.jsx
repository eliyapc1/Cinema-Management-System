import axios from "axios";
import Joi from "joi-browser";

const fetchUsers = async (setAllUsers) => {
  try {
    const usersJsonURL = "http://localhost:8001/users-info";
    const { data: users } = await axios.get(usersJsonURL);
    setAllUsers(users.filter((user) => !!user.fname));
  } catch (err) {
    console.log(err);
  }
};

const fetchUsernameAndPerms = async (id, user, setUser) => {
  const host = "http://localhost:8001";
  // prettier-ignore
  try {
    const {data: { username }} = await axios(`${host}/users-login/${id}`);
    const {data: { perms }} = await axios(`${host}/users-perms/${id}`);
    setUser({ ...user, username, perms });
  } catch (error) {
    console.log(error);
  }
};

const handleSubs = (e, userData, setIsViewSub, setUserData) => {
  const { name, checked } = e.target;
  let { subs } = userData.perms;

  if (name !== "View Subscriptions ") {
    if (checked) {
      if (!subs.includes(name)) subs.push(name);
      if (!subs.includes("View Subscriptions ")) {
        subs.push("View Subscriptions ");
        setIsViewSub(true);
      }
    } else subs = subs.filter((sub) => sub !== name);
  } else {
    if (checked) {
      if (!subs.includes(name)) {
        subs.push(name);
        setIsViewSub(true);
      }
    } else {
      if (subs.length === 1) {
        subs = subs.filter((sub) => sub !== name);
        setIsViewSub(false);
      }
    }
  }
  setUserData({ ...userData, perms: { ...userData.perms, subs } });
};

const handleMovies = (e, userData, setIsViewMov, setUserData) => {
  const { name, checked } = e.target;
  let { movies } = userData.perms;

  if (name !== "View Movies ") {
    if (checked) {
      if (!movies.includes(name)) movies.push(name);
      if (!movies.includes("View Movies ")) {
        movies.push("View Movies ");
        setIsViewMov(true);
      }
    } else movies = movies.filter((sub) => sub !== name);
  } else {
    if (checked) {
      if (!movies.includes(name)) {
        movies.push(name);
        setIsViewMov(true);
      }
    } else {
      if (movies.length === 1) {
        movies = movies.filter((sub) => sub !== name);
        setIsViewMov(false);
      }
    }
  }
  setUserData({ ...userData, perms: { ...userData.perms, movies } });
};

const handleInput = (e, userData, setUserData) => {
  const {
    target: { name, value },
  } = e;
  if (name !== "username")
    setUserData({ ...userData, info: { ...userData.info, [name]: value } });
  else setUserData({ ...userData, login: { [name]: value } });
};

const sendData = async (e, userData, setSent) => {
  e.preventDefault();
  const host = "http://localhost:8001";
  let { login, info, perms } = userData;
  perms = { perms: perms.subs.concat(perms.movies) };
  const curDate = new Date();
  info.date = curDate.toISOString().split("T")[0];
  // prettier-ignore
  try {
    const { data: {id} } = await axios.put(`${host}/users-login/${info.id}`, login);
    await axios.put(`${host}/users-info/${id}`, info);
    await axios.put(`${host}/users-perms/${id}`, perms);
    setSent(true)
  } catch (error) {
    console.log(error);
  }
};

const allPerms = [
  "View Subscriptions ",
  "Create Subscriptions ",
  "Update Subscriptions ",
  "Delete Subscriptions ",
  "View Movies ",
  "Create Movies ",
  "Update Movies ",
  "Delete Movies ",
];

const userSchema = {
  fname: Joi.string().required().label("First Name"),
  lname: Joi.string().required().label("Last Name"),
  username: Joi.string().required().label("Username"),
};

export {
  fetchUsers,
  fetchUsernameAndPerms,
  handleSubs,
  handleMovies,
  handleInput,
  sendData,
  allPerms,
  userSchema,
};
