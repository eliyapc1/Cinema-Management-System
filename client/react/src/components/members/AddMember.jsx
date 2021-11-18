import React, { useState } from "react";
import AddForm from "./AddForm";
import { handleInput, sendData, joiValid } from "../common/utils";
import { memberSchema } from "./utils";

const AddSub = () => {
  const [member, setMember] = useState({ name: "", email: "", city: "" });
  const [errors, setErrors] = useState({ name: "", email: "", city: "" });
  const [sent, setSent] = useState(false);
  const { name, email, city } = member;

  return (
    <div style={{ textAlign: "left" }}>
      {sent && (
        <div
          className="alert alert-success"
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: 350,
            marginBottom: 20,
          }}
        >
          Member has been successfully added.
        </div>
      )}
      <AddForm
        handleInput={(e) => {
          handleInput(e, member, setMember);
          setErrors({});
        }}
        sendData={(e) => {
          e.preventDefault();
          const joiErrors = joiValid({ name, email, city }, memberSchema);
          if (joiErrors) return setErrors(joiErrors);
          sendData(e, "members", "post", member, setSent);
        }}
        errors={errors}
      />
    </div>
  );
};

export default AddSub;
