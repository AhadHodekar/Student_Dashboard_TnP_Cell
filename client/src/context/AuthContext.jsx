import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [role, setRole] = useState("");
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  useEffect(() => {
    // Check for stored token and update state
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        setUserData(decodedToken);
        setRole(decodedToken.role);
        setIsAuthenticated(true); // Set isAuthenticated to true if token exists
        console.log(isAuthenticated);
        const theme = "cmyk";
        localStorage.setItem("theme", theme);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const adminLogin = async (inputs) => {
    try {
      const result = await axios.post(
        `http://localhost:3939/api/auth/admin/login`,
        inputs,
        {
          withCredentials: true,
        }
      );
      const tokenData = jwtDecode(result.data.accessToken);
      setAccessToken(result.data.accessToken);
      setAdminData(result.data.adminData);
      setRole(tokenData.role); // Directly set role from token data
      setIsAuthenticated(true);
      localStorage.setItem("accessToken", result.data.accessToken);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

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

  const userLogout = () => {
    // do axios logout request for student
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUserData(null);
    setRole(null);
  };
  // const studentLogout = () => {
  //   // do axios logout request for student
  //   localStorage.removeItem("accessToken");
  //   setIsAuthenticated(false);
  //   setUserData(null);
  // };
  // const adminLogout = () => {
  //   // do axios logout request for admin
  //   localStorage.removeItem("accessToken");
  //   setIsAuthenticated(false);
  //   setUserData(null);
  // };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        adminLogin,
        studentLogin,
        userLogout,
        userData,
        role,
        accessToken,
        studentData,
        adminData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
