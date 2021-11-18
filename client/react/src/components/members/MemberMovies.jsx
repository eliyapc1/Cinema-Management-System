import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AddSubMovie from "./AddSubMovie";
import { fetchMemberMovies } from "./utils";
import Context from "../Context";

const MemberMovies = ({ memberId, history }) => {
  const { hasPermToEdit } = useContext(Context);
  const [memberMovies, setMemberMovies] = useState([]);
  const [render, setRender] = useState(0);
  let renderParent = [render, setRender];
  const [addMovieWindow, setAddMovieWindow] = useState(false);

  // eslint-disable-next-line
  useEffect(() => fetchMemberMovies(memberId, setMemberMovies), [render]);

  const movRe = memberMovies.map((movie, i) => {
    return (
      <li
        key={i}
        className="list-group-item list-group-item-action"
        style={{ width: "70%", margin: "0 auto" }}
      >
        <NavLink to={{ pathname: "/movies/all", state: movie.name }}>
          {movie.name}
        </NavLink>
        , {movie.date}
      </li>
    );
  });

  return (
    <div >
      <h3>Watched Movies: </h3>
      {movRe.length ? (
        <ol
          className="list-group list-group-numbered"
          style={{ marginBottom: 20 }}
        >
          {movRe}
        </ol>
      ) : (
        <h5 style={{paddingBottom: 20, paddingTop: 20}}>None</h5>
      )}
      <button
        className="btn btn-primary"
        onClick={() => {
          setAddMovieWindow(!addMovieWindow);
          !hasPermToEdit.subs && history.push("/no-permission");
        }}
      >
        Subscribe New Movie
      </button>
      <br />
      <br />
      {addMovieWindow && hasPermToEdit.subs ? (
        <AddSubMovie memberId={memberId} renderParent={renderParent} />
      ) : null}
      <br />
    </div>
  );
};

export default MemberMovies;
