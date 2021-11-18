import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import NotFound from "../NotFound";
import { useState } from "react";

const MoviesNavBar = ({ match: { url } }) => {
  const [userInput, setUserInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="page">
      <div className="btn-group" style={{ marginBottom: 30 }}>
        <NavLink className="btn btn-outline-primary" to={`${url}/all`} onClick={()=> setShowSearchBar(true)}>
          All Movies
        </NavLink>
        <NavLink className="btn btn-outline-primary" to={`${url}/add`} onClick={()=> setShowSearchBar(false)}>
          Add Movie
        </NavLink>
      </div>
      <br />

      {showSearchBar ? <div className="btn-group" style={{marginBottom: 20}}>
        <input
          style={{
            width: 200,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          className="form-control me-2"
          // type="search"
          placeholder="Search Movie"
          aria-label="Search"
          id="search"
          type="text"
          value={userInput}
          onChange={({ target: { value } }) => setUserInput(value)}
        />
        <button
          className="btn btn-outline-primary"
          onClick={() => setKeyword(userInput.toLowerCase())}
        >
          Search
        </button>
      </div> : null}

      <Switch>
        <Route
          exact
          path={`${url}/all`}
          render={() => <AllMovies keyword={keyword} setKeyword={setKeyword} hideSearch={setShowSearchBar} />}
        />
        <Route exact path={`${url}/add`} component={AddMovie} />
        <Route exact path={`${url}/edit`} component={EditMovie} />
        <Route path={`/404`} component={NotFound} />
        <Route exact path={`${url}`} />
        <Redirect to={`/404`} />
      </Switch>
    </div>
  );
};

export default MoviesNavBar;
