import React, { useState } from "react";
import StudentLoginForm from "../auth/login/StudentLoginForm";
import AdminLoginForm from "../auth/login/AdminLoginForm";

function Login() {
  const [formType, setFormType] = useState("admin");

  const handleRadioChange = (event) => {
    setFormType(event.target.value);
  };

  return (
    <div
      // data-theme=""
      className="w-full h-screen flex items-center justify-center "
    >
      <div
        className="flex flex-row  w-[800px] h-[500px] bg-white shadow-xl rounded-2xl overflow-hidden"
        data-theme="cmyk"
      >
        <div className="left flex flex-col items-center justify-center gap-10 w-1/2 h-full text-4xl text-white font-bold bg-[#45aeee] ">
          {/* <img src="" alt="" /> */}
          <h1 className="">Training & Placement</h1>
          <h1 className="">Cell</h1>
        </div>

        <div
          className="right flex flex-col  items-center justify-start py-10 gap-8 w-1/2"
          data-theme="cmyk"
        >
          <div className="join text-white" data-theme="cmyk">
            <input
              checked={formType === "student"}
              className="join-item btn  "
              type="radio"
              name="options"
              aria-label="Admin"
              value="student"
              onChange={handleRadioChange}
            />
            <input
              checked={formType === "admin"}
              className="join-item btn  "
              type="radio"
              name="options"
              aria-label="Student"
              value="admin"
              onChange={handleRadioChange}
            />
          </div>
          {formType === "admin" ? <StudentLoginForm /> : <AdminLoginForm />}
        </div>
      </div>
    </div>
  );
}

export default Login;
