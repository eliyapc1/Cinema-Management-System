import axios from "axios";
import { useState } from "react";
import { handleSubs, handleMovies, userSchema } from "./utils";
import {joiValid} from '../common/utils';
import AddForm from "./AddForm";

const AddUser = () => {
  const [userData, setUserData] = useState({
    login: { username: "" },
    info: { fname: "", lname: "", date: "", STO: 0 },
    perms: { movies: [], subs: [] },
  });
  const [errors, setErrors] = useState({});
  const [, setIsViewMov] = useState(false);
  const [, setIsViewSub] = useState(false);
  const [hasSent, setHasSent] = useState(false);

  const handleInput = ({ target: { name, value } }) => {
    setErrors({})
    if (name !== "username")
      setUserData({ ...userData, info: { ...userData.info, [name]: value } });
    else setUserData({ ...userData, login: { [name]: value } });
  };

  const handleCheck = (e) => {
    if (e.target.name.includes("Movies"))
      handleMovies(e, userData, setIsViewMov, setUserData);
    else handleSubs(e, userData, setIsViewSub, setUserData);
  };

  const sendData = async (e) => {
    e.preventDefault();
    let { login, info, perms } = userData;
    perms = { perms: perms.subs.concat(perms.movies) };
    const {fname, lname} = info;
    const {username} = login;
    const joiErrors = joiValid({fname, lname, username}, userSchema);
    if (joiErrors) return setErrors(joiErrors);

    const curDate = new Date();
    info.date = curDate.toISOString().split("T")[0]
    const host = "http://localhost:8001";
    // prettier-ignore
    try {
      const { data: {id} } = await axios.post(`${host}/users-login`, login);
      await axios.put(`${host}/users-info/${id}`, info);
      await axios.put(`${host}/users-perms/${id}`, perms);
      setHasSent(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{textAlign: "left"}}>
      {hasSent && <div
          className="alert alert-success"
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: 350,
            marginBottom: 20,
          }}
        >
          User has been successfully added.
        </div>}
      <AddForm
        handleInput={handleInput}
        handleCheck={handleCheck}
        sendData={sendData}
        userData={userData}
        errors={errors}
      />
    </div>
  );
};

export default AddUser;
