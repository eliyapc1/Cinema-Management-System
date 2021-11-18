import React from "react";
import Input from "../common/Input";
import Checkbox from "../common/PermsCheckbox";
import { NavLink } from "react-router-dom";
import { allPerms } from "./utils";

const UserForm = ({ handleInput, handleCheck, sendData, userData, errors }) => {
  const { perms } = userData;
  const userPerms = perms.subs.concat(perms.movies);

  const checkboxRe = allPerms.map((perm) => {
    let checked = userPerms.includes(perm) ? true : false;
    return (
      <Checkbox
        key={`${perm}`}
        name={`${perm}`}
        label={`${perm}`}
        onChange={handleCheck}
        checked={checked}
      />
    );
  });

  return (
    <div>
      <form
        onSubmit={sendData}
        style={{
          width: 400,
          margin: "0 auto",
          padding: 20,
          backgroundColor: "white",
          border: "1px solid #094CB0",
          borderRadius: 5,
        }}
      >
        <h2>Add User</h2>
        <Input name="fname" label="First Name: " onChange={handleInput} error={errors.fname}/>
        <Input name="lname" label="Last Name: " onChange={handleInput} error={errors.lname}/>
        <Input name="username" label="Username: " onChange={handleInput} error={errors.username}/>
        <Input
          type="number"
          name="STO"
          label="Session Time Out: "
          onChange={handleInput}
          min="1"
          max="90"
        />
        <h4>Permissions:</h4>
        <div>{checkboxRe}</div>
        <div className="btn-group" style={{ marginLeft: 110, marginTop: 20 }}>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <NavLink className="btn btn-outline-danger" to="/users/all">
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
