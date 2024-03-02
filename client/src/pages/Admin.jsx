import React from "react";
import { useAdminContext } from "../context/AdminContext";
const Admin = () => {
  const { role } = useAdminContext();
  return <div>{role}</div>;
};

export default Admin;
