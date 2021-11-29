import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUsernameAndPerms } from "./utils";
import { deleteData } from "../common/utils";

const User = ({ renderParent, user: info }) => {
	const [user, setUser] = useState({ username: "", info, perms: [] });
	const { id } = user.info;
	// eslint-disable-next-line
	useEffect(() => fetchUsernameAndPerms(id, user, setUser), []);

	const deleteUser = () => deleteData("users-login", id, renderParent);

	const userPerms = user.perms.map((perm) => {
		return (
			<li key={perm} className="list-group-item">
				{perm.trim()}
			</li>
		);
	});

	const { fname, lname, date, STO } = user.info;
	return (
		<div
			style={{
				width: 400,
				maxWidth: "100%",
				margin: "0 auto",
				marginBottom: "50px",
			}}>
			<div className="card">
				<h3 className="card-header">{`${fname} ${lname}`}</h3>
				<div className="card-body">
					<div className="card-body">
						<h5 className="card-title">
							<strong>Username:</strong> {user.username}
						</h5>
						<h5 className="card-title">
							<strong>Session-Time-Out:</strong> {STO}
						</h5>
						<h5 className="card-title">
							<strong>Created Date:</strong> {date}
						</h5>
						<br />
						<h5 className="card-title">
							<strong>Permissions:</strong>
							<ul className="list-group list-group-flush">{userPerms}</ul>
						</h5>
						<div
							className="btn-group"
							style={{
								width: 200,
								maxWidth: "100%",
								marginTop: 10,
								marginBottom: 10,
							}}>
							<NavLink
								style={{ width: "50%" }}
								className="btn btn-primary"
								to={{ pathname: "/users/edit", state: user }}>
								Edit
							</NavLink>
							<button
								className="btn btn-outline-danger"
								style={{ width: "50%" }}
								onClick={deleteUser}>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
