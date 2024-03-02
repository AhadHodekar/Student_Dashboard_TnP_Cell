import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";
// import StudentProfile from "./Profile/StudentProfile";
import Logout from "../../pages/Logout";
import Login from "../../pages/Login";
function Pages() {
  return (
    <div className="w-full h-screen bg-base-200 pt-[68px] text-canter">
      <Outlet />
    </div>
  );
}

export default Pages;

{
  /* <Routes>
  <Route path="/" element={<Dashboard />}></Route>
  <Route path="/login" element={<Login />}></Route>
  <Route path="/profile" element={<StudentProfile />}></Route>
  <Route path="/logout" element={<Logout />}></Route>
  <Route path="*" element={<h1>404 NOT FOUND</h1>}></Route>
</Routes>; */
}
