import React, { useEffect, useState } from "react";
import {
  handleSubs,
  handleMovies,
  handleInput,
  sendData,
  userSchema,
} from "./utils";
import { joiValid } from "../common/utils";
import EditForm from "./EditForm";

const EditUser = ({ location: { state: user } }) => {
  const { username, info, perms } = user;
  const movies = [];
  const subs = [];
  // divide between subs and movies permission as in the userDataStructure
  // for better data management.
  perms.map((perm) =>
    perm.includes("Subs") ? subs.push(perm) : movies.push(perm)
  );

  const userDataStructure = {
    login: { username: "" },
    info: { fname: "", lname: "", STO: 0, date: "" },
    perms: { movies: [], subs: [] },
  };

  const [userData, setUserData] = useState(userDataStructure);
  const [errors, setErrors] = useState({});
  const [, setIsViewMov] = useState(false);
  const [, setIsViewSub] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setUserData({ login: { username }, info, perms: { movies, subs } });
    return () => setUserData(userDataStructure); // eslint-disable-next-line
  }, []);

  const handleCheck = (e) => {
    if (e.target.name.includes("Movies"))
      handleMovies(e, userData, setIsViewMov, setUserData);
    else handleSubs(e, userData, setIsViewSub, setUserData);
  };
  return (
    <div style={{ textAlign: "left" }}>
      {sent && (
        <div
        className="alert alert-success"
        style={{
          textAlign: "center",
          margin: "0 auto",
          width: 350,
          maxWidth: "100%",
          marginBottom: 20,
        }}
      >
        User data has been successfully updated.
      </div>
      )}
      <EditForm
        handleInput={(e) => {
          handleInput(e, userData, setUserData);
          setErrors({});
        }}
        handleCheck={handleCheck}
        sendData={(e) => {
          e.preventDefault();
          const { fname, lname } = userData.info;
          const { username } = userData.login;
          const joiErrors = joiValid({ fname, lname, username }, userSchema);
          if (joiErrors) return setErrors(joiErrors);
          sendData(e, userData, setSent);
        }}
        userData={userData}
        errors={errors}
      />
      <br />
    </div>
  );
};

export default EditUser;
