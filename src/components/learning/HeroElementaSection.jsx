import React from 'react';

const stats = [
  { icon: '🟠', label: 'Live Class' },
  { icon: '🔴', label: '203+ Learning Resources' },
  { icon: '🟡', label: '98 Online Student' },
];

const HeroElementaSection = () => (
  <section className="relative bg-gray-50 py-12 md:py-20 overflow-hidden">
    {/* Decorative circles */}
    <div className="absolute -top-16 -left-16 w-56 h-56 bg-white rounded-full opacity-80 z-0" />
    <div className="absolute -top-24 right-0 w-64 h-64 bg-white rounded-full opacity-80 z-0" />
    <div className="absolute bottom-0 -left-24 w-64 h-64 bg-white rounded-full opacity-80 z-0" />
    <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10 px-6">
      {/* Left: Text */}
      <div className="flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4 leading-tight">
          Master Public Speaking<br />Easily & Fun!
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          Our academy offers a wide variety of public speaking classes and learning materials designed for all levels, from beginner to advanced.
        </p>
        <div className="flex gap-4 mb-8">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow">Start Learning</button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-3 rounded-lg font-bold text-xl">▶</button>
        </div>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟠</span>
            <span className="font-semibold text-gray-700">Live Class</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔴</span>
            <span className="font-semibold text-gray-700">203+ Learning Resources</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🟡</span>
            <span className="font-semibold text-gray-700">98 Online Student</span>
          </div>
        </div>
      </div>
      {/* Right: Image & Avatars */}
      <div className="flex-1 flex flex-col items-center relative">
        <div className="relative w-72 h-72 rounded-full bg-gradient-to-tr from-yellow-300 via-indigo-200 to-white flex items-center justify-center shadow-lg">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Student"
            className="w-56 h-56 object-cover rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="flex items-center gap-2 mt-6 bg-white rounded-xl px-4 py-2 shadow">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
          <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
          <img src="https://randomuser.me/api/portraits/women/46.jpg" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-yellow-400" />
          <span className="ml-2 text-gray-700 font-semibold">+95 more</span>
        </div>
      </div>
    </div>
  </section>
);

export default HeroElementaSection; 