import React from "react";
import { useState } from "react";
import AdminLoginForm from "../login/AdminLoginForm";
import StudentLoginForm from "../login/StudentLoginForm";
function TLogin() {
  const [formType, setFormType] = useState("admin");

  const handleRadioChange = (event) => {
    setFormType(event.target.value);
  };

  return (
    <div
      data-theme="dark"
      className="w-full h-screen flex items-center justify-center bg-gray-400"
    >
      <div
        className="flex flex-row  w-[800px] h-[500px] bg-white shadow-xl rounded-2xl overflow-hidden"
        data-theme="cmyk"
      >
        <card className="left flex flex-col items-center justify-center gap-10 w-1/2 h-full text-4xl text-white font-bold bg-[#45aeee] ">
          {/* <img src="" alt="" /> */}
          <h1 className="">Training & Placement</h1>
          <h1 className="">Cell</h1>
        </card>

        <card
          className="right flex flex-col  items-center justify-start p-10 gap-8 w-1/2"
          data-theme="cmyk"
        >
          <div className="join text-white" data-theme="cmyk">
            <input
              className="join-item btn  "
              type="radio"
              name="options"
              aria-label="Admin"
              value="student"
              onChange={handleRadioChange}
            />
            <input
              className="join-item btn  "
              type="radio"
              name="options"
              aria-label="Student"
              value="admin"
              onChange={handleRadioChange}
            />
          </div>
          {formType === "admin" ? <StudentLoginForm /> : <AdminLoginForm />}
        </card>
      </div>
    </div>
  );
}

export default TLogin;
