import React from "react";
import { useAdminContext } from "../../context/AdminContext";
import { useStudentContext } from "../../context/StudentContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function LogoutModal() {
  const { userLogout } = useAuth();
  const { adminLogout } = useAdminContext();
  const { studentLogout, role } = useStudentContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    // if (role === "admin") {
    //   await adminLogout();
    //   navigate("/login");
    // } else {
    //   await studentLogout();
    //   navigate("/login");
    // }
    userLogout();
    navigate("/login");
  };
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Log Out Confirmation</h3>
        <p className="py-4 text-center">
          ⚠️ All the unsaved changes will be lost!
        </p>
        <div className="modal-action flex flex-row justify-around items-center">
          <form method="dialog" className="flex gap-10">
            <button className="btn">Cancel</button>

            <button className="btn btn-error" onClick={handleLogout}>
              Confirm
            </button>
            {/* <button className="btn btn-error" onClick={handleStudentLogout}>
          Confirm
        </button> */}
            {/* </div> */}
            {/* if there is a button in form, it will close the modal */}
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default LogoutModal;
