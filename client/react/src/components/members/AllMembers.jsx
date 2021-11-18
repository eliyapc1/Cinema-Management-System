import React, { useState, useEffect } from "react";
import Member from "./Member";
import { fetchData } from "../common/utils";

const AllMembers = ({ history }) => {
  const [members, setMembers] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    fetchData("members", setMembers, "");
    return () => setMembers([]);
  }, [render]);

  console.log(members);
  
  const membersRe = members.map((member, i) => (
    <Member
      key={i}
      member={member}
      renderParent={[render, setRender]}
      history={history}
    />
  ));

  return (
    <div style={{height: "90vh", overflowY: "scroll", paddingBottom: "80"}}>
      {members && membersRe}
    </div>
  );
};

export default AllMembers;
