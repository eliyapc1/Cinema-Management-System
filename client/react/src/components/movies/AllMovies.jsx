import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { fetchData } from "../common/utils";
import Movie from "./Movie";

const AllMovies = ({ keyword, setKeyword,hideSearch, history, location: { state } }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    fetchData("movies", setAllMovies, "");
    if (state) {
      setKeyword(state.toLowerCase());
      history.replace();
    }
    return () => setAllMovies([]);
  }, [render]); //eslint-disable-line

  const movieRe = allMovies.map((movie, index) =>
    movie.name.toLowerCase().includes(keyword) ? (
      <Movie
        key={index}
        movie={movie}
        renderParent={[render, setRender]}
        history={history}
        setKeyword={setKeyword}
        hideSearch={hideSearch}
      />
    ) : null
  );

  return <div className="all-movies">{allMovies && movieRe}</div>;
};

export default withRouter(AllMovies);
