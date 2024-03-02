import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center text-black font-extrabold w-full h-full text-6xl">
      <h1>WORK IN PROGRESS.... 👷‍♂️⚒️</h1>
      <button className="btn btn-lg flex items-center justify-center btn-primary text-3xl">
        <Link to={"/"}>GO BACK</Link>
      </button>
    </div>
  );
}

export default NotFound;
