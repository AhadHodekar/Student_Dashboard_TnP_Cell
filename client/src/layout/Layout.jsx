import React from "react";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import LogoutModal from "./components/LogoutModal";
// import { useAdminContext } from "../context/AdminContext";
// import { useStudentContext } from "../context/StudentContext";
import { useAuth } from "../context/AuthContext";

function Layout() {
  // const { isAuthenticated: isAdmin } = useAdminContext();
  // const { isAuthenticated: isStudent } = useStudentContext();
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <>
          <LogoutModal />
          <Navbar />
          <Drawer />
        </>
      ) : (
        <p>You are not authenticated</p>
      )}
    </>
  );
}
export default Layout;
