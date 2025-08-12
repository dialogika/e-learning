import React from 'react';
import { assets } from '../../assets/assets';

const FooterEdemy = () => (
  <footer className="bg-slate-900 text-white pt-12 pb-6 mt-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Logo & Desc */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <img src={assets.logo} alt="Logo" className="h-12 w-auto" />
        </div>
        <p className="text-sm mb-4 text-gray-300">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
      </div>
      {/* Menu */}
      <div className="flex flex-col gap-2">
        <span className="font-semibold mb-2">Company</span>
        <a href="#" className="text-gray-300 hover:text-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white">About us</a>
        <a href="#" className="text-gray-300 hover:text-white">Contact us</a>
        <a href="#" className="text-gray-300 hover:text-white">Privacy policy</a>
      </div>
      {/* Newsletter */}
      <div>
        <span className="font-semibold mb-2 block">Subscribe to our newsletter</span>
        <p className="text-gray-300 text-sm mb-2">The latest news, articles, and resources, sent to your inbox weekly.</p>
        <form className="flex gap-2 mt-2">
          <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded-l bg-white text-gray-800 focus:outline-none" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r font-semibold">Subscribe</button>
        </form>
      </div>
    </div>
    <div className="text-center text-gray-400 text-xs mt-8 border-t border-slate-800 pt-4">Copyright 2024 © GreatStack. All Right Reserved.</div>
  </footer>
);

export default FooterEdemy; 