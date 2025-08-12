import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const NavbarHome = () => (
  <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
    <img src={assets.logo} alt="logo" className="w-36 h-auto" />
    <div className="flex items-center gap-8">
      <Link to="/" className="text-gray-700 font-medium">Home</Link>
      <Link to="/community" className="text-gray-700 font-medium">Community</Link>
      <Link to="/news" className="text-gray-700 font-medium">News</Link>
      <Link to="/order" className="bg-blue-600 text-white px-5 py-2 rounded font-semibold ml-4">Order</Link>
      <Link to="/signin" className="border border-blue-600 text-blue-600 px-5 py-2 rounded font-semibold ml-2">Sign In</Link>
    </div>
  </nav>
);

export default NavbarHome; 