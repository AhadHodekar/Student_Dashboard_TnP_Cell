import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAdminContext } from "../context/AdminContext";
import {
  getRoleFromLocalStorage,
  getUserDetails,
  getRole,
} from "../utils/authUtils/authUtils";
import { useNavigate } from "react-router-dom";
// import { withRouter } from "react-router-dom";

const Test = () => {
  const { role } = useAdminContext();
  const navigate = useNavigate();
  const BRUH = getRole();
  // const [role, setRole] = useState(null);
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   setRole(getRoleFromLocalStorage());
  //   setUser(getUserDetails());
  // }, []);
  return (
    <div>
      {/* {role === "admin" ? <p>HI {role}</p> : null}
      {role === "admin" ? <p>FUck Off</p> : null}
      {user && <p>{user.admin_id}</p>} */}
      {/* {BRUH && BRUH} */}
      {role === "admin" ? (
        <button onClick={() => navigate("/admin")}>ADMIN DASHBOARD</button>
      ) : role === "student" ? (
        <button onClick={() => navigate("/student")}>STUDENT DASHBOARD</button>
      ) : null}
    </div>
  );
};

// export default withRouter(Test);
export default Test;
