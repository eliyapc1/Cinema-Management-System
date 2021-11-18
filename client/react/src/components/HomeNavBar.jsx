import React from "react";
import { NavLink } from "react-router-dom";

const HomeNavBar = ({ history }) => {
  const isAdmin = sessionStorage.isAdmin === "true" ? true : false;
  const logOut = () => {
    sessionStorage.clear();
    history.replace("/");
    window.location.reload();
  };
  return (
    <div className="home-nav" style={{padding: 20}}>
      <div className="btn-group btn-group-lg">
        <NavLink className="btn btn-outline-primary" to="/movies">
          Movies
        </NavLink>
        <NavLink className="btn btn-outline-primary" to="/subscriptions">
          Subscriptions
        </NavLink>
        {isAdmin && <NavLink className="btn btn-outline-primary" to="/users">
          Users Management
        </NavLink>}
        <button type="button" className="btn btn-outline-danger" onClick={logOut}>
          Log-Out
        </button>
      </div>
    </div>
  );
};

export default HomeNavBar;
