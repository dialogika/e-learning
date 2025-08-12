import React from 'react';

const mentors = [
  { name: 'Mentor', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Mentor', img: 'https://randomuser.me/api/portraits/women/45.jpg' },
  { name: 'Mentor', img: 'https://randomuser.me/api/portraits/women/46.jpg' },
  { name: 'Mentor', img: 'https://randomuser.me/api/portraits/women/47.jpg' },
  { name: 'Mentor', img: 'https://randomuser.me/api/portraits/women/48.jpg' },
  { name: 'Mentor', img: 'https://randomuser.me/api/portraits/women/49.jpg' },
];

const MentorSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Mentor</h2>
      <p className="text-gray-600 mb-8">Find yourself a perfect friend from a wide variety of choices.</p>
      <div className="flex flex-wrap justify-center gap-8">
        {mentors.map((mentor, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src={mentor.img} alt={mentor.name} className="w-20 h-20 rounded-full object-cover border-2 border-blue-200 mb-2" />
            <span className="font-medium text-gray-700">{mentor.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MentorSection; 