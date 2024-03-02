import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { getContextRole } from "../../../utils/authUtils/authUtils";
import { useAuth } from "../../../context/AuthContext";
function AdminDashboard() {
  const { role } = useAuth();
  const { adminData, students } = useAdminContext();
  const [studentsData, setStudentsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState([]);
  return <div>{role} Dashboard</div>;
  // useEffect(() => {
  //   if (students && Array.isArray(students)) {
  //     setStudentsData(students);
  //     setIsLoading(false);
  //   }
  //   setAdmin(adminData);
  // }, [students, adminData]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full h-full flex items-center justify-center">
  //       <span className="loading loading-spinner loading-lg "></span>
  //     </div>
  //   );
  // }
  // console.log("STUDENTS DATA:", studentsData);
  // console.log("ADMIN DATA:", admin);
  // // const studentCol = [students];
  // if (!isLoading) {
  //   return (
  //     <div data-theme="dark" className="w-full h-full overflow-y-scroll ">
  //       <h1>AdminDashboard</h1>
  //       <div>
  //         <h2>Student List</h2>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Enrollment No</th>
  //               <th>Student Name</th>
  //               <th>Course Name</th>
  //               <th>Course Year</th>
  //               <th>Birth Date</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {studentsData.map((student) => (
  //               <tr key={student.id}>
  //                 <td>{student.enrollment_no}</td>
  //                 <td>{student.student_name}</td>
  //                 <td>{student.course_name}</td>
  //                 <td>{student.course_year}</td>
  //                 <td>{student.birth_date}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   );
  // }
}

export default AdminDashboard;

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
