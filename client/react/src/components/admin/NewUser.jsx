import axios from "axios";
import React, { useState } from "react";
import Input from "../common/Input";
import { handleInput } from "../common/utils";
import Joi from "joi-browser";

const NewUser = ({ history }) => {
  const [newUser, setNewUser] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({username: "", password: ""});
  const [valid, setValid] = useState({
    usernameExist: true,
    passwordExist: false,
  });

  const userSchema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const joiValid = () => {
    const result = Joi.validate(newUser, userSchema, { abortEarly: false });
    
    if (!result.error) return null;
    const joiErrors = {};
    for (const error of result.error.details) {
      joiErrors[error.path[0]] = error.message;
    }
    return joiErrors;
  };
  
  const validAndCreate = async (e) => {
    e.preventDefault();
    const joiErrors = joiValid();
    if (joiErrors) return setErrors(joiErrors);

    const { username, password } = newUser;
    const URL = "http://localhost:8001/users-login";
    // returns 1 of 3 options:
    // 1. error code 1 = username not exist
    // 2. error code 2 = username exit but already has a password.
    // 3. user id = username exist and has not password.
    const { data: result } = await axios.post(`${URL}/new/validate`, {
      username,
    });

    if (result === 1)
      return setValid({ passwordExist: false, usernameExist: false });
    if (result === 2)
      return setValid({ usernameExist: true, passwordExist: true });

    const id = result;
    try {
      await axios.put(`${URL}/${id}`, { password });
      history.replace("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="login">
      {!valid.usernameExist ? (
        <div className="alert alert-danger">
          Username was not found. <br /> Please request username from admin.
        </div>
      ) : null}
      {valid.passwordExist ? (
        <div className="alert alert-danger">User already has a password.</div>
      ) : null}
      <br />
      <form onSubmit={validAndCreate}>
        <Input
          name="username"
          label="Username "
          onChange={(e) => {handleInput(e, newUser, setNewUser); setErrors({...errors, username: ""})}}
          error={errors.username}
        />
        <br />
        <Input
          type="password"
          name="password"
          label="Password "
          onChange={(e) => {handleInput(e, newUser, setNewUser); setErrors({...errors, password: ""})}}
          error={errors.password}
        />
        <button
          className="btn btn-primary"
          style={{ marginTop: 20 }}
          type="submit"
        >
          Create
        </button>
      </form>
      <br />
    </div>
  );
};

export default NewUser;
