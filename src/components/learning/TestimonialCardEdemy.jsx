import React from 'react';

const TestimonialCardEdemy = ({ avatar, name, role, rating, review }) => (
  <div className="bg-white rounded-xl shadow-md p-6 w-80 flex flex-col items-start border hover:shadow-lg transition">
    <div className="flex items-center gap-3 mb-2">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-xs text-gray-500">{role}</div>
      </div>
    </div>
    <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
      {'★'.repeat(Math.round(rating))}
      <span className="text-gray-400 ml-1">{rating}</span>
    </div>
    <div className="text-gray-700 text-sm mb-2">{review}</div>
    <a href="#" className="text-blue-600 text-xs font-semibold mt-auto">Read more</a>
  </div>
);

export default TestimonialCardEdemy; 