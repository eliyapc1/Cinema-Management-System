import { NavLink } from "react-router-dom";
import Input from "../common/Input";

const EditForm = ({ memberData, handleInput, handleCheck, sendData, errors }) => {
  const { name, email, city } = memberData;

  return (
    <div>
      <form
        onSubmit={sendData}
        style={{
          width: 400,
          maxWidth: "100%",
          margin: "0 auto",
          padding: 20,
          backgroundColor: "white",
          border: "1px solid #094CB0",
          borderRadius: 5,
        }}
      >
        <h3>Edit Member:</h3>
        <h2>{name}</h2>
        <Input
          name="name"
          label="Name "
          value={name}
          onChange={handleInput}
          autoFocus={true}
          error={errors.name ? "Name is required." : null}
        />
        <Input
          name="email"
          label="Email "
          value={email}
          onChange={handleInput}
          error={errors.email ? "Email is required." : null}
        />
        <Input
          type="text"
          name="city"
          label="City "
          value={city}
          onChange={handleInput}
          error={errors.city ? "City is required." : null}
        />
        <div className="btn-group" style={{ width: "100%" }}>
          <button className="btn btn-primary" type="submit">
            Update
          </button>
          <NavLink className="btn btn-outline-danger" to="/subscriptions/all">
            Cancel
          </NavLink>
        </div>
        <br />
      </form>
    </div>
  );
};

export default EditForm;
