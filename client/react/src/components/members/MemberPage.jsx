import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteData, fetchData } from "../common/utils";
import MemberMovies from "./MemberMovies";
import Context from "../Context";

// prettier-ignore
const Member = ({ history, match: { params: {id} } }) => {
  const [member, setMember] = useState({ name: "", email: "", city: "" });
  const { name, email, city } = member;
  const {hasPermToDelete, hasPermToEdit} = useContext(Context);

  useEffect(() => fetchData("members", setMember, id), []);//eslint-disable-line

  const deleteMember = () => {
    if(!hasPermToDelete.sub) return history.push("/no-permission");
    deleteData("api/members", id);
    history.goBack();
    }

  return (
    <div style={{ textAlign: "center", width: "50%", margin: "0 auto", marginBottom: 30 }}>
    <div class="card">
      <h3 class="card-header">{name}</h3>
      <div class="card-body">

        <div className="card">
          <div className="card-body">
            <h5 class="card-title">
              <strong>Email:</strong> {email}
            </h5>
            <h5 class="card-title">
              <strong>City:</strong> {city}
            </h5>
            
          <div className="btn-group" style={{marginTop: 10, marginBottom: 10}}>
            <NavLink
              className="btn btn-primary"
              to={{ pathname: "/subscriptions/edit", state: member }}
            >
              Edit
            </NavLink>
            <button className="btn btn-outline-danger" onClick={deleteMember}>
              Delete
            </button>
          </div>
        </div>
        </div>
        <br />
        <MemberMovies
          memberId={id}
          history={history}
          hasPermToEdit={hasPermToEdit}
        />
      </div>
    </div>
  </div>
  );
};

export default Member;
