import { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import * as Comps from "./components/comps";
import Context from "./components/Context";
import { fetchUserPerms, LoginRedirect } from "./components/loginUtils";
import "./App.css";

// prettier-ignore
function App() {
  const [noPermRedirects, setNoPermRedirects] = useState([]);
  const [hasPermToDelete, setHasPermToDelete] = useState({ movies: true,subs: true });
  const [hasPermToEdit, setHasPermToEdit] = useState({subs: true});
  const { loggedIn } = sessionStorage;
  const isAdmin = sessionStorage.isAdmin === "true" ? true : false;

  useEffect(() => {
    fetchUserPerms(setHasPermToDelete, setHasPermToEdit, setNoPermRedirects, isAdmin);
    // clean-up state (initialized) after user logs out to prevent perms issues.
    return () => {
      setNoPermRedirects([]);
      setHasPermToDelete({ movies: true,subs: true });
      setHasPermToEdit({subs: true})
    }
  }, [loggedIn, isAdmin]); //eslint-disable-line

  const noPermRedirectsRe = noPermRedirects.map(({ from, to }, i) => {
    return <Redirect key={i} from={from} to={to} />;
  });

  return (
    <div className="container">
      <Context.Provider value={{hasPermToDelete, hasPermToEdit}}>
        {loggedIn && <Route path="/" component={Comps.Header} />}
        <Switch>
          {noPermRedirectsRe}
          {!loggedIn && (<Route exact path="/new-user" component={Comps.NewUser} />)}
          {LoginRedirect(loggedIn)}
          {isAdmin && <Route path="/users" component={Comps.UsersNavBar} />}
          <Route path="/movies" component={Comps.MoviesNavBar} />
          <Route path="/subscriptions" component={Comps.SubsNavBar} />
          <Route path="/no-permission" component={Comps.NoPerms} />
          <Route path="/404" component={Comps.NotFound} />
          <Route exact path="/" />
          <Redirect to="/404" />
        </Switch>
      </Context.Provider>
    </div>
  );
}

export default App;
