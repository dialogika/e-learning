import React from 'react';
import { assets } from '../../assets/assets';

const HeroSection = () => (
  <section className="bg-blue-50 py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-8">
      {/* Left */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Join Virtual Public<br />Speaking Class</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of...</p>
        <div className="flex gap-4 mb-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow">Join Now</button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold bg-white shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" fill="currentColor"/></svg>
            Watch video
          </button>
        </div>
        <div className="flex gap-10 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-gray-500 text-sm">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">25k+</div>
            <div className="text-gray-500 text-sm">Happy customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">95</div>
            <div className="text-gray-500 text-sm">Gym Trainers</div>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex-1 flex justify-center">
        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=500&q=80" alt="Public Speaking" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
      </div>
    </div>
  </section>
);

export default HeroSection; 