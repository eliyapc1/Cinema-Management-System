import axios from "axios";
import { Redirect } from "react-router";
import { allPerms } from "./admin/utils";
import { Login } from "./comps";
import { Switch, Route } from "react-router-dom";

const validateErrorsOnSubmit = (login, setLogin) => {
  login.errors = {};
  const errors = {};
  if (!login.username.trim()) errors.username = "Username is required.";
  if (!login.password.trim()) errors.password = "Password is required.";
  setLogin({ ...login, errors });
  return errors;
};

const validateErrorsOnChange = (e, objToSet, setObj) => {
  const {
    target: { name, value },
  } = e;
  if (!value.trim()) {
    if (name === "username") objToSet.errors[name] = "Username is required.";
    else objToSet.errors.password = "Password is required";
  } else delete objToSet.errors[name];
  setObj(objToSet);
};

// prettier-ignore
const handleInput = (e, objToSet, setObj) => {
  validateErrorsOnChange(e, objToSet, setObj);
  const {target: { name, value } } = e;
  setObj({ ...objToSet, [name]: value });
};

const validateLogin = async (e, login, setLogin, setInvalidMsg, history) => {
  e.preventDefault();
  const errors = validateErrorsOnSubmit(login, setLogin);
  // if there is error, abort server validation
  if (Object.keys(errors).length) return;

  const host = "http://localhost:8001";
  const { data: user } = await axios.post(
    `${host}/users-login/validate`,
    login
  );

  if (user) {
    sessionStorage.loggedIn = true;
    if (user.username === "admin") {
      sessionStorage.isAdmin = true;
      history.replace("/");
    } else {
      const {
        data: { fname, lname },
      } = await axios.get(`${host}/users-info/${user._id}`);
      sessionStorage.fullName = `${fname} ${lname}`;
      sessionStorage.id = `${user._id}`;
      history.replace("/");
    }
  } else setInvalidMsg("Invalid username or password.");
};

const LoginRedirect = (loggedIn) => {
  if (loggedIn) return <Redirect from="/login" to="/" />;
  else {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect exact from="/" to="/login" />
      </Switch>
    );
  }
};

const managePerms = (
  userPerms,
  setDeleteNoPerms,
  setHasPermToEdit,
  setNoPermRedirects,
  isAdmin
) => {
  if (isAdmin) return setNoPermRedirects([]);
  let deletePerms = { movies: true, subs: true };
  let editPerms = { subs: true };
  if (Array.isArray(userPerms)) {
    const noPerms = allPerms.filter((perm) => !userPerms.includes(perm));
    const redirects = [];
    if (noPerms.length) {
      for (const noPerm of noPerms) {
        switch (noPerm) {
          case "View Subscriptions ":
            redirects.push({ from: "/subscriptions", to: "/no-permission" });
            break;
          case "Create Subscriptions ":
            redirects.push({
              from: "/subscriptions/add",
              to: "/no-permission",
            });
            break;
          case "Update Subscriptions ":
            redirects.push({
              from: "/subscriptions/edit",
              to: "/no-permission",
            });
            editPerms.subs = false;
            setHasPermToEdit(editPerms);
            break;
          case "Delete Subscriptions ":
            deletePerms.subs = false;
            setDeleteNoPerms(deletePerms);
            break;
          case "View Movies ":
            redirects.push({ from: "/movies", to: "/no-permission" });
            break;
          case "Create Movies ":
            redirects.push({ from: "/movies/add", to: "/no-permission" });
            break;
          case "Update Movies ":
            redirects.push({ from: "/movies/edit", to: "/no-permission" });
            break;
          case "Delete Movies ":
            deletePerms.movies = false;
            setDeleteNoPerms(deletePerms);
            break;
          default:
            break;
        }
      }
      setNoPermRedirects(redirects);
    }
  }
};

const fetchUserPerms = async (
  setDeleteNoPerms,
  setHasPermToEdit,
  setNoPermRedirects,
  isAdmin
) => {
  const { id } = sessionStorage;
  const permsURL = "http://localhost:8001/users-perms";
  try {
    let {
      data: { perms: userPerms },
    } = await axios.get(`${permsURL}/${id}`);
    // in case no perms were found, initialize to empty array.
    if (userPerms === undefined) userPerms = [];
    managePerms(
      userPerms,
      setDeleteNoPerms,
      setHasPermToEdit,
      setNoPermRedirects,
      isAdmin
    );
  } catch (err) {
    console.log(err.message);
  }
};

export {
  validateLogin,
  LoginRedirect,
  fetchUserPerms,
  managePerms,
  handleInput,
};
