import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// Default STO 5min
let warnTime = 300000;
let logoutTime = 300000;
const STO = ({ history }) => {
  let warnTimeout;
  let logoutTimeout;
  const [stateTO, setStateTO] = useState({
    warnAlert: "You are about to be logged-out because of no activity.",
    logoutAlert: "Login out...",
    events: ["load", "mousemove", "mousedown", "click", "scroll", "keypress"],
  });

  const setSTO = () => {
    warnTimeout = setTimeout(() => console.log(stateTO.warnAlert), warnTime);
    logoutTimeout = setTimeout(() => {
      alert(stateTO.logoutAlert);
      sessionStorage.clear();
      history.replace("/");
      window.location.reload();
    }, logoutTime);
  };

  const resetTimeout = () => {
    clearTimeout(warnTimeout);
    clearTimeout(logoutTimeout);
    setSTO();
  };

  const fetchUserSTO = async () => {
    if (sessionStorage.id) {
      const { id } = sessionStorage;
      const infoAPI = "http://localhost:8001/users-info";
      try {
        const {
          data: { STO: userSTO },
        } = await axios.get(`${infoAPI}/${id}`);
        warnTime = 1000 * 60 * (userSTO * 0.95);
        logoutTime = 1000 * 60 * userSTO;
        // just for render;
        setStateTO(stateTO);
        console.log(`User Session-Time-Out:\n ${logoutTime / 1000 / 60} Minutes`);
        console.log(`Alert user within:\n ${warnTime / 1000 / 60} Minutes`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchUserSTO();
    for (const event of stateTO.events)
      window.addEventListener(event, resetTimeout);
    setSTO();   // eslint-disable-next-line
  }, []);


  return <div></div>;
};

export default withRouter(STO);
