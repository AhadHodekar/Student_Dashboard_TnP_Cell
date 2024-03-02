import { jwtDecode } from "jwt-decode";
import { useAdminContext } from "../../context/AdminContext";
import { useStudentContext } from "../../context/StudentContext";
export const getRoleFromLocalStorage = () => {
  return localStorage.getItem("role");
};

export const getUserDetails = () => {
  const token = localStorage.getItem("accessToken")
  const decodedToken = jwtDecode(token)
  return decodedToken
}

export const getRole = () => {
  const token = localStorage.getItem("accessToken")
  const decodedToken = jwtDecode(token)
  return decodedToken.role
}

export const getContextRole = () => {
  const adminRole = useAdminContext().role;
  const studentRole = useStudentContext().role;

  // Prioritize admin role if both roles exist:
  const role = adminRole || studentRole;

  return { role };
}