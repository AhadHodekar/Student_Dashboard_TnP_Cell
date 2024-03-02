import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { useAdminContext } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

function AdminLoginForm() {
  const { adminLogin, isAuthenticated, role, userData } = useAuth();

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const [inputs, setInputs] = useState({
    adminName: "",
    password: "",
  });

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setErr(null);
  }, [inputs]);

  // useEffect(() => {
  //   console.log(userData);
  // }, [role, userData]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.adminName === "" || inputs.password === "") {
      setErr("Field is empty!");
    } else {
      try {
        await adminLogin(inputs);
        if (isAuthenticated) navigate("/"); // Redirect to "/" if authenticated

        // console.log("admin auth status:", isAuthenticated);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error &&
          error.response.data.error.message
        ) {
          setErr(error.response.data.error.message);
        } else {
          setErr("An error occurred. Please try again later.");
        }
        console.log(error.response.data.error.message);
      }
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) navigate("/");
  // }, [isAuthenticated]);

  return (
    <form
      className="admin flex flex-col justify-center w-64 h-auto rounded-md gap-4"
      onSubmit={handleLogin}
    >
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>
      <div className="">
        <label htmlFor="adminName" className="text">
          Admin ID:
        </label>
        <input
          type="text"
          className="input outline outline-1 p-2 w-full mt-2"
          placeholder="ADMIN-00-0000"
          name="adminName"
          id="adminName"
          onChange={handleInputs}
        />
      </div>
      <div className="">
        <label htmlFor="password" className="text">
          Password:
        </label>
        <input
          placeholder="******"
          type="password"
          className="input outline outline-1 p-2 w-full mt-2"
          name="password"
          id="password"
          onChange={handleInputs}
        />
      </div>
      {err && <p style={{ color: "red", textAlign: "center" }}>{err}</p>}
      <button className="btn p-4 mt-3  bg-[#45aeee]">Login</button>
    </form>
  );
}

export default AdminLoginForm;
