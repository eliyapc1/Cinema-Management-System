import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./common/Input";
import { validateLogin, handleInput } from "./loginUtils";

const Login = ({ history }) => {
  const [invalidMessage, setInvalidMsg] = useState(null);
  const [login, setLogin] = useState({
    username: "",
    password: "",
    errors: { username: "", password: "" },
  });
  return (
    <div className="login" style={{width: 500, maxWidth: "80%"}}>
      <h1>Login</h1> <br />
      {invalidMessage ? (
        <div className="alert alert-danger">{invalidMessage}</div>
      ) : null}
      {/* prettier-ignore */}

      <form className="col-sm" onSubmit={(e) => validateLogin(e, login, setLogin,setInvalidMsg, history)}>
        <Input
          name="username"
          label="Username "
          onChange={(e) => {handleInput(e, login, setLogin)}}
          autoFocus={true}
          error={login.errors.username}
        />
        <br />
        <Input
          type="password"
          name="password"
          label="Password "
          onChange={(e) => {handleInput(e, login, setLogin)}}
          error={login.errors.password}
        />
        <div className="login-footer">
        <button className="btn btn-primary">Login</button> <br />
        New User? <Link to="/new-user">Create Password</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
