import React from 'react';

const stats = [
  { value: '7', label: 'Years Experience' },
  { value: '25k+', label: 'Happy customers' },
  { value: '95', label: 'Gym Trainers' },
];

const StatsSection = () => (
  <div className="flex justify-center gap-16 py-8 bg-white">
    {stats.map((stat, idx) => (
      <div key={idx} className="text-center">
        <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
        <div className="text-gray-500 text-sm">{stat.label}</div>
      </div>
    ))}
  </div>
);

export default StatsSection; 