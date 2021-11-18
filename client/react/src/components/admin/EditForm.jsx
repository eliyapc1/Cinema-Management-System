import Input from "../common/Input";
import Checkbox from "../common/PermsCheckbox";
import { NavLink } from "react-router-dom";
import { allPerms } from "./utils";

const UserForm = ({ handleInput, handleCheck, sendData, userData, errors }) => {
  // prettier-ignore
  const { login: { username }, info: { fname, lname, STO, date }, perms } = userData;
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
        <h3>Edit User</h3>
        <h2>{`${fname} ${lname}`}</h2>
        <Input
          name="fname"
          label="First Name: "
          onChange={handleInput}
          value={fname}
          error={errors.fname}
        />
        <Input
          name="lname"
          label="Last Name: "
          onChange={handleInput}
          value={lname}
          error={errors.lname}
        />
        <Input
          name="username"
          label="Username: "
          onChange={handleInput}
          value={username}
          error={errors.username}
        />
        <Input
          type="number"
          name="STO"
          label="Session Time Out: "
          onChange={handleInput}
          value={STO}
          min="1"
          max="90"
        />
        Created Date: {date}
        <h3>Permissions:</h3>
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
