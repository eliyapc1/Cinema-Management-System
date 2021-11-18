import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { deleteData } from "../common/utils";
import Context from "../Context";
import MemberMovies from "./MemberMovies";
const Member = ({ member, renderParent, history }) => {
  const { hasPermToDelete, hasPermToEdit } = useContext(Context);
  const { _id, name, email, city } = member;

  const deleteMember = () => {
    if (!hasPermToDelete.subs) return history.push("/no-permission");
    deleteData("api/members", _id, renderParent);
  };

  return (
    <div
      style={{
        textAlign: "center",
        width: "500px",
        margin: "0 auto",
        marginBottom: 30,
      }}
    >
      <div className="card">
        <h3 className="card-header">{name}</h3>
        <div className="card-body">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <strong>Email:</strong> {email}
              </h5>
              <h5 className="card-title">
                <strong>City:</strong> {city}
              </h5>

              <div
                className="btn-group"
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <NavLink
                  className="btn btn-primary"
                  to={{ pathname: "/subscriptions/edit", state: member }}
                >
                  Edit
                </NavLink>
                <button
                  className="btn btn-outline-danger"
                  onClick={deleteMember}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <br />
          <MemberMovies
            memberId={_id}
            history={history}
            hasPermToEdit={hasPermToEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Member;
