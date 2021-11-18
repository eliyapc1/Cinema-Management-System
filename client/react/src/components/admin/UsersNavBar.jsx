import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import AllUsers from "./AllUsers";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import NotFound from "../NotFound";

const UsersNavBar = ({ match: { url } }) => {
  return (
    <div className="page" >
      <div className="btn-group" style={{marginBottom: 10}}>
        <NavLink className="btn btn-outline-primary" to={`${url}/all`}>All Users</NavLink>
        <NavLink className="btn btn-outline-primary" to={`${url}/add`}>Add User</NavLink>
      </div>

      <Switch>
        <Route exact path={`${url}/all`} component={AllUsers} />
        <Route exact path={`${url}/add`} component={AddUser} />
        <Route exact path={`${url}/edit`} component={EditUser} />
        <Route exact path={`${url}`} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default UsersNavBar;
