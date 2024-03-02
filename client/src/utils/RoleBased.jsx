import { useStudentContext } from "../context/StudentContext";
import { useAdminContext } from "../context/AdminContext";

export const logoutBasedOnRole = (role, studentLogout, adminLogout) => {
  if (role === "student") {
    studentLogout();
  } else if (role === "admin") {
    adminLogout();
  }
};
