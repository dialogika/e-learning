import React from "react";
import { assets } from "../../assets/assets";

const HeroProfileSection = () => (
  <section className="bg-blue-50 py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-8">
      {/* Left: Photo & Name */}
      <div className="flex-1 flex flex-col items-center">
        <div className="relative flex flex-col items-center">
          <div className="w-64 h-64 rounded-full bg-gradient-to-b from-blue-300 to-blue-100 flex items-center justify-center shadow-lg">
            <img
              src={assets.profile}
              alt="Ron Ashrovy"
              className="w-56 h-56 object-cover rounded-full border-4 border-white"
            />
          </div>
          <div className="flex items-center justify-between w-64 mt-4">
            <button className="text-2xl text-gray-400 hover:text-blue-600">
              &#8592;
            </button>
            <span className="font-semibold text-gray-700">Ron Ashrovy</span>
            <button className="text-2xl text-gray-400 hover:text-blue-600">
              &#8594;
            </button>
          </div>
        </div>
      </div>
      {/* Right: Title & Desc */}
      <div className="flex-1 flex flex-col justify-center items-start mt-8 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Everybody Needs
          <br />A Friend In Life.
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          The Corgi is intelligent, quick and curious. It is a kind, adventurous
          breed which shows a large measure of independence. They are good with
          children and normally kind with strangers.
        </p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroProfileSection;
