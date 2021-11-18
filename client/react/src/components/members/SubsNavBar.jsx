import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import AllMembers from "./AllMembers";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import MemberPage from "./MemberPage";
import NotFound from "../NotFound";

const SubsNavBar = ({ match: { url } }) => {
  return (
    <div className="page">
      <div className="btn-group" style={{ marginBottom: 10 }}>
        <NavLink className="btn btn-outline-primary" to={`${url}/all`}>All Members</NavLink>
        <NavLink className="btn btn-outline-primary" to={`${url}/add`}>Add Member</NavLink>{" "}
      </div>
      <Switch>
        <Route exact path={`${url}/all`} component={AllMembers} />
        <Route exact path={`${url}/add`} component={AddMember} />
        <Route exact path={`${url}/edit`} component={EditMember} />
        <Route exact path={`${url}/:id`} component={MemberPage} />
        <Route exact path={`${url}`} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </div>
  );
};

export default SubsNavBar;
