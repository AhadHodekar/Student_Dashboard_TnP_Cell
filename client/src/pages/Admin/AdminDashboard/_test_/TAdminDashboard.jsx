import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../../context/AdminContext";
function TAdminDashboard() {
  const { adminData, role } = useAdminContext();
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(role);
    setAdmin(adminData);
    console.log(admin.adminData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner loading-lg "></span>
      </div>
    );
  }
  // const studentCol = [students];
  if (!isLoading) {
    return (
      <div className="w-full h-screen ">
        <h1>AdminDashboard</h1>
        {user === "admin" ? <p>HELLO {admin}</p> : null}
      </div>
    );
  }
}

export default TAdminDashboard;

{
  /* <div className="overflow-x-auto">
  <table className="table">
     head 
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Course</th>
        <th>Year</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
       row 1 
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{students.enrollment_no}</div>
              <div className="text-sm opacity-50">2023-2024</div>
            </div>
            <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div> 
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">
            Desktop Support Technician
          </span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    </tbody>
   foot 
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
  </table>
</div>; */
}
