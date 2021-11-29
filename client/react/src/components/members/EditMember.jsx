import React, { useState } from "react";
import EditForm from "./EditForm";
import { handleInput, sendData, joiValid } from "../common/utils";
import { memberSchema } from "./utils";

const EditMember = ({ location: { state: originalMember } }) => {
  const { _id, name, email, city } = originalMember;
  const [member, setMember] = useState({ name, email, city });
  const [errors, setErrors] = useState({ name: "", email: "", city: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ textAlign: "left" }}>
      {sent && <div
          className="alert alert-success"
          style={{
            textAlign: "center",
            margin: "0 auto",
            width: 350,
            maxWidth: "100%",
            marginBottom: 20,
          }}
        >
          Member has been successfully updated.
        </div>}
      <EditForm
        memberData={member}
        handleInput={(e) => {handleInput(e, member, setMember); setErrors({})}}
        sendData={(e) => {
          e.preventDefault();
          const joiErrors = joiValid(
            { name: member.name, email: member.email, city: member.city },
            memberSchema
          );
          if (joiErrors) return setErrors(joiErrors);
          sendData(e, "members", "put", member, setSent, _id);
        }}
        errors={errors}
      />
    </div>
  );
};

export default EditMember;
