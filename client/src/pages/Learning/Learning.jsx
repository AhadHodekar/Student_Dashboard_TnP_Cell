import React from "react";
import Books from "./components/Books";
import Videos from "./components/Videos";
import TestPapers from "./components/TestPapers";
import { Link } from "react-router-dom";
const Learning = () => {
  return (
    <div className="w-full h-full p-10 flex flex-col overflow-x-hidden gap-10 md:flex-row">
      <Link to="/learning/books">
        <div className="card card-compact min-h-72 w-80 h-80 bg-primary text-white shadow-xl">
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title">Books</h2>
          </div>
        </div>
      </Link>
      <Link to="/learning/videos">
        <div className="card card-compact w-80 h-80 bg-primary text-white shadow-xl">
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title">Videos</h2>
          </div>
        </div>
      </Link>
      <Link to="/learning/papers">
        <div className="card card-compact w-80 h-80 bg-primary text-white shadow-xl">
          <div className="card-body flex items-center justify-center">
            <h2 className="card-title">Papers </h2>
          </div>
        </div>
      </Link>
      {/* <Books />
      <Videos />
      <TestPapers /> */}
    </div>
  );
};

export default Learning;
