import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "../../context/StudentContext";
import { useAuth } from "../../context/AuthContext";

function StudentLoginForm() {
  const { studentLogin, isAuthenticated, role, userData } = useAuth();
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const [inputs, setInputs] = useState({
    enrollmentNo: "",
    password: "",
  });

  const handleInputs = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setErr(null);
  }, [inputs]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputs.enrollmentNo === "" || inputs.password === "") {
      setErr("Field is Empty!");
    } else {
      try {
        await studentLogin(inputs);
        if (isAuthenticated) navigate("/");
        // console.log("student auth status:", isAuthenticated);
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
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, []);
  return (
    <form
      className="student flex flex-col justify-center w-64 h-auto rounded-md gap-4"
      onSubmit={handleLogin}
    >
      <h1 className="text-2xl font-bold text-center">Student Login</h1>
      <div className="">
        <label htmlFor="enrollmentNo">Enrollment No:</label>
        <input
          type="text"
          className="input outline outline-1 p-2 w-full mt-2"
          placeholder="XX-00-0000"
          name="enrollmentNo"
          id="enrollmentNo"
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
      {err && <span style={{ color: "red", textAlign: "center" }}>{err}</span>}
      <button className="btn p-4 mt-3  bg-[#45aeee]">Login</button>
    </form>
  );
}

export default StudentLoginForm;
