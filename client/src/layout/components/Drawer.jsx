import React from "react";
import { Link } from "react-router-dom";
import Pages from "./Pages";
import { useAuth } from "../../context/AuthContext";
function Drawer() {
  const { role } = useAuth();
  const studentRouteLinks = [
    {
      to: "/",
      name: "Dashboard",
    },
    {
      to: "/learning",
      name: "Learning",
    },
    {
      to: "/training",
      name: "Training",
    },
    {
      to: "/blog",
      name: "Blog",
    },
    {
      to: "/resume",
      name: "Resume",
    },
  ];
  const adminRouteLinks = [
    {
      to: "/",
      name: "Dashboard",
    },
    {
      to: "/students",
      name: "Students",
    },
    {
      to: "/learning",
      name: "Learning",
    },
    {
      to: "/training",
      name: "Training",
    },
    {
      to: "/blog",
      name: "Blog",
    },
  ];
  return (
    <div className="drawer lg:drawer-open w-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full h-full">
        {/* Page content here */}
        <Pages />
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu px-4 pt-20 w-64 flex flex-col gap-2  min-h-full  text-base-content bg-base-100 border-r-gray-400 border-opacity-50 shadow-md">
          {/* Sidebar content here */}
          {role === "admin" &&
            adminRouteLinks.map((link, index) => (
              <li className="" key={index}>
                <Link className="p-4" to={link.to}>
                  {link.name}
                </Link>
              </li>
            ))}
          {role === "student" &&
            studentRouteLinks.map((link, index) => (
              <li className="" key={index}>
                <Link className="p-4" to={link.to}>
                  {link.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Drawer;

// import React from "react";
// import { Link } from "react-router-dom";
// import Pages from "./Pages";
// import { useAuth } from "../../context/AuthContext";
// import { getAllowedRoutes } from "../../utils/routeUtils";

// function Drawer() {
//   const { role } = useAuth(); // Get user's role from context

//   const allowedLinks = getAllowedRoutes(role);

//   return (
//     <div className="drawer lg:drawer-open w-full">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content w-full h-full">
//         {/* Page content here */}
//         <Pages />
//       </div>
//       <div className="drawer-side ">
//         <label
//           htmlFor="my-drawer-2"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label>
//         <ul className="menu px-4 pt-20 w-64 flex flex-col gap-2 min-h-full text-base-content bg-base-100 border-r-gray-400 border-opacity-50 shadow-md">
//           {/* Sidebar content here */}
//           {allowedLinks.map((link, index) => (
//             <li className="" key={index}>
//               <Link className="p-4" to={link.to}>
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Drawer;
