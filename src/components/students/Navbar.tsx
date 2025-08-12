import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");
  return (
    <div
      className={`flex items-center justify-between p-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <button>Become Educator</button>
        <Link to="/my-enrollments">My Enrollments</Link>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Account
      </button>
    </div>
  );
};

export default Navbar;
