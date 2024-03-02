import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Create context for admin
const AdminContext = createContext();

// Custom hook to use admin context
export const useAdminContext = () => useContext(AdminContext);

// Admin Provider component
export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
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
        setAdminData(decodedToken);
        setRole(decodedToken.role);
        setIsAuthenticated(true); // Set isAuthenticated to true if token exists
        console.log(isAuthenticated);
      } catch (error) {
        console.error("Error decoding token:", error);
        console.log(process.env.PORT);
      }
    }
  }, []);
  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

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

  const adminLogout = async () => {
    // ... your admin logout logic (e.g., call API endpoint)
    localStorage.removeItem("accessToken");
    setAdminData(null);
    setIsAuthenticated(false);
    setRole("");
  };

  return (
    <AdminContext.Provider
      value={{ adminData, adminLogin, adminLogout, role, isAuthenticated }}
    >
      {children}
    </AdminContext.Provider>
  );
};
