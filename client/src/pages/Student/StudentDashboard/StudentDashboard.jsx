import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useStudentContext } from "../../../context/StudentContext";
import dummy from "../../../../../assets/student_profile/imgs/dummy.jpg";
import AhadWork from "../../../../../assets/student_profile/imgs/AhadWork.jpg";
import { useAuth } from "../../../context/AuthContext";
// import { getContextRole } from "../../../utils/authUtils/authUtils";
// const {role} = getContextRole
function StudentDashboard() {
  const { userData, role, studentData } = useAuth();
  // const [student, setStudent] = useState(null);
  // useEffect(() => {
  //   setStudent(studentData);
  //   console.log(student, role);
  // }, [studentData]);

  // const studentData = userData;
  return (
    <div className="w-full flex flex-col items-center justify-center h-full ">
      {/* <h1>Dashboard</h1> */}
      <div className="w-full h-full p-10">
        <h1>STUDENT</h1>
        <div className="w-1/2 card lg:card-side bg-base-100 shadow-xl flex flex-col items-center justify-center overflow-hidden">
          <div className="flex items-center justify-center overflow-hidden ">
            <img
              // src={studentData ? studentData.student_image : dummyProfile}
              src={AhadWork || dummy}
              // alt={studentData.enrollment_no}
              width={300}
              height={300}
            />
          </div>
          <div className="card-body flex flex-col gap-10">
            <h2 className="card-title">Welcome Back</h2>
            <div>
              {studentData ? (
                <>
                  <p>Name: {studentData.student_name}</p>
                  <p>
                    Branch: {studentData.course_year} -{" "}
                    {studentData.course_name}
                  </p>
                  <p>Birth Date: {studentData.birth_date}</p>
                  <p>Academic Year : 2023-2024</p>
                </>
              ) : (
                <p>"BRUH NO DATA FOUND"</p>
              )}
              <div className="card-actions justify-end">
                <button className="btn btn-primary">
                  <Link to={"/profile"}>Profile</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;

{
  /* <ul>
  {Object.keys(studentData).map((key, index) => (
    <li key={index}>
      {key}: {studentData[key]}
    </li>
  ))}
</ul>; */
}
