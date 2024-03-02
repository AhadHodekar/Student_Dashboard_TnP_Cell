import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Create context for student
const StudentContext = createContext();

// Custom hook to use student context
export const useStudentContext = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null);
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add state for isAuthenticated

  useEffect(() => {
    // Check for stored token and update state
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setStudentData(decodedToken);
        setRole(decodedToken.role);
        setIsAuthenticated(true); // Set isAuthenticated to true if token exists
        console.log(isAuthenticated);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []); // Only run this effect once, on component mount

  // const studentLogin = async (inputs) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:3939/api/auth/student/login",
  //       inputs,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Response from login API:", res.data); // Log the entire response

  //     if (res.data.status === "SUCCESS") {
  //       setStudentData(res.data.other);
  //       setRole(res.data.role);
  //       // Save student data and role to localStorage
  //       localStorage.setItem("studentData", JSON.stringify(res.data.other));
  //       localStorage.setItem("role", res.data.role);
  //       console.log("Student data after update:", res.data.other); // Log updated studentData
  //     } else {
  //       throw new Error("Invalid Credentials"); // Throw an error for invalid credentials
  //     }
  //   } catch (err) {
  //     throw err;
  //     console.log("Error:", err);
  //   }
  // };

  const studentLogin = async (inputs) => {
    try {
      const result = await axios.post(
        `http://localhost:3939/api/auth/student/login`,
        inputs,
        {
          withCredentials: true,
        }
      );
      const tokenData = jwtDecode(result.data.accessToken);
      setAccessToken(result.data.accessToken);
      setStudentData(result.data.studentData);
      setRole(tokenData.role); // Directly set role from token data
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", result.data.accessToken);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  const studentLogout = async () => {
    // ... your admin logout logic (e.g., call API endpoint)
    localStorage.removeItem("accessToken");
    setStudentData(null);
    setIsAuthenticated(false);
    setRole("");
  };

  return (
    <StudentContext.Provider
      value={{
        studentData,
        studentLogin,
        studentLogout,
        role,
        isAuthenticated,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

const ahad = {
  id: 338,
  enrollment_no: "T-20-0299",
  gender: "",
  student_name: "HODEKAR ABDUL AHAD PARWEZ",
  course_name: "INFORMATION TECHNOLOGY",
  course_year: "BE",
  birth_date: "2003/04/17",
  student_mobile_no: 9930365498,
  parent_mobile_no: 9869700129,
  emergency_mobile_no: "9869700129.0",
  student_email: "ahadparwezhodekar@gmail.com",
  adhar_card_no: "935000000000.0",
  blood_group: "0",
  religion: "MUSLIM",
  student_whatsapp_no: "",
  student_address: "97 RAJIWADA RATNAGIRI 415612",
  ssc_board: "",
  ssc_percentage: "",
  diploma: "",
  diploma_percentage: "",
  hsc_board: "",
  hsc_percentage: "",
  cet_percentage: "",
  student_profile:
    "https://hypercritic.org/wp-content/uploads/2022/04/berserk-e1594835159209.jpg",
};
