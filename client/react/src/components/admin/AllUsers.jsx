import { useEffect, useState } from "react";
import User from "./User";
import {fetchUsers} from './utils';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    fetchUsers(setAllUsers);
    return () => setAllUsers([]);
  }, [render]);

  const userRe = allUsers.map((user, index) => (
    <User key={index} user={user} renderParent={[render, setRender]} />
  ));
  return (
    <div style={{height: "90vh", overflowY: "scroll"}}>
      {allUsers && userRe}
    </div>
  );
};

export default AllUsers;
