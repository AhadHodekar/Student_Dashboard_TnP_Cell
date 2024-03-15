import React, { useEffect, useState } from "react";
// import { useAdminContext } from "../../context/AdminContext";
// import { useStudentContext } from "../../context/StudentContext";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import StudentDashboard from "../Student/StudentDashboard/StudentDashboard";
import { Navigate } from "react-router-dom";
import { getContextRole, getRole } from "../../utils/authUtils/authUtils";
import NotFound from "../NotFound";

const Dashboard = () => {
  // const { role: adminRole } = useAdminContext();
  // const { role: studentRole } = useStudentContext();
  // const { role } = getContextRole();
  const role = getRole();

  return (
    <>
      {role === "admin" ? (
        <NotFound />
      ) : role === "student" ? (
        <StudentDashboard />
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default Dashboard;
