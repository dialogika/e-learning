import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const NavbarEdemy = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  return (
    <nav className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 gap-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={assets.logo} alt="Logo" className="h-12 w-auto" />
          {/* <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm tracking-wide">
            Learning
          </span> */}
        </Link>
        <div className="flex gap-3 mt-2 md:mt-0">
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-full font-semibold transition-colors"
          >
            Login
          </Link>
          <button
            onClick={handleLogout}
            className="border border-red-600 text-red-600 hover:bg-red-50 px-5 py-2 rounded-full font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarEdemy;
