import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteData } from "../common/utils";
import { fetchSubsWatched } from "./utils";
import Context from "../Context";

const Movie = ({ movie, renderParent, history, setKeyword, hideSearch }) => {
	// prettier-ignore
	const { _id, name, genres, premiered, image } = movie;
	const [subsWatched, setSubsWatched] = useState([{ name: "", data: "" }]);
	const [deleted, setDeleted] = useState(false);
	const { hasPermToDelete } = useContext(Context);

	const deleteMovie = () => {
		if (!hasPermToDelete.movies) return history.push("/no-permission");
		deleteData("api/movies", _id, renderParent);
		setDeleted(true);
		setKeyword("");
	};

	useEffect(() => fetchSubsWatched(_id, setSubsWatched), []); //eslint-disable-line

	let subsRe = subsWatched.map(({ memberId, name, date }, i) => {
		return (
			<li className="list-group-item" key={i}>
				<NavLink to={`/subscriptions/${memberId}`}>{name}</NavLink>, {date}
			</li>
		);
	});
	if (!subsRe.length) subsRe = <h4>None</h4>;

	return (
		<div className="movie">
			<div className="card mb-3" style={{ maxWidth: "660px" }}>
				<div className="row g-0">
					<div className="col-md-4">
						<img
							src={`${image}`}
							alt={`${name}`}
							className="img-fluid"
							style={{ width: "100%" }}
						/>
					</div>
					<div className="col-md-8">
						<div className="card-header">
							<h3 className="card-title">
								<strong>{`${name} `}</strong>,{premiered.split("-")[0]}
							</h3>
							<p className="card-text">
								<span style={{ color: "gray" }}>{`${genres}`}</span>
							</p>
						</div>
						<div className="card-body" style={{ textAlign: "center" }}>
							<div className="card-text ">
								<h5>Subscribers Watched:</h5>
								<ul
									className="list-group list-group-flush"
									style={{
										textAlign: "center",
										width: "100%",
										marginLeft: 0,
										overflowY: "scroll",
										height: 100,
									}}>
									{!deleted ? subsRe : null}
								</ul>
							</div>
							<br />
							<div
								className="btn-group"
								style={{ width: 200, maxWidth: "80%" }}>
								<NavLink
									className="btn btn-primary"
									style={{ width: "50%" }}
									to={{ pathname: "/movies/edit", state: movie }}
									onClick={() => hideSearch(false)}>
									Edit
								</NavLink>
								<button
									style={{ width: "50%" }}
									className="btn btn-outline-danger"
									onClick={deleteMovie}>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<br />
		</div>
	);
};

export default Movie;
