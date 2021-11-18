import { NavLink } from "react-router-dom";
import Input from "../common/Input";

const AddForm = ({ handleInput, handleCheck, sendData, errors }) => {
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
        <h2>Add New Member</h2>
        <Input
          name="name"
          label="Name: "
          onChange={handleInput}
          autoFocus={true}
          error={errors.name ? "Name is required": null}
        />
        <Input
          name="email"
          label="Email: "
          onChange={handleInput}
          autoFocus={true}
          error={errors.email ? "Email is required": null}
        />
        <Input
          name="city"
          label="City: "
          onChange={handleInput}
          autoFocus={true}
          error={errors.city ? "City is required": null}
        />
        <br />
        <div className="btn-group" style={{marginLeft: 110}}>
          <button className="btn btn-primary" type="submit">Add</button>
          <NavLink className="btn btn-outline-danger" to="/subscriptions/all">Cancel</NavLink>
        </div>
        <br />
      </form>
    </div>
  );
};

export default AddForm;
