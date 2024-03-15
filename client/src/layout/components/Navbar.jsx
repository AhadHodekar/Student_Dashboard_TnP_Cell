import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ThemeController from "../../pages/Learning/components/ThemeController";
import dummyImg from "../../../../assets/student_profile/imgs/dummy.jpg";
import { useAuth } from "../../context/AuthContext";
function Navbar() {
  const navigate = useNavigate();
  const { role } = useAuth();
  return (
    <div className="navbar bg-base-100 absolute top-0 z-10  border-b-gray-400 border-opacity-10">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          {/* <button className="btn btn-square btn-ghost"> */}
          {/* // do svg swap here */}

          {/* // */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          TnP
        </Link>
        <div className="form-control">
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          /> */}
        </div>
      </div>

      <div className="flex-none gap-4">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <ThemeController />

        <div className="dropdown dropdown-end ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar border border-gray-300"
          >
            <div className="w-10 rounded-full">
              <img
                // width={100}
                // height={100}
                alt="Tailwind CSS Navbar component"
                // src={AhadWork ? AhadWork : dummyImg}
                src={dummyImg}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            {role === "student" ? (
              <li>
                <a
                  className="justify-between"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
            ) : null}
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                className="justify-between"
                onClick={() =>
                  document.getElementById("my_modal_5").showModal()
                }
              >
                Logout
                {/* <span className="badge">New</span> */}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
