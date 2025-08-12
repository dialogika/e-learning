import React from 'react';
import PartnerLogoRow from './PartnerLogoRow';
import SearchBarEdemy from './SearchBarEdemy';

const HeroEdemy = () => (
  <section className="bg-gradient-to-b from-blue-100 to-white py-16">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Empower your future with the courses designed to <span className="text-blue-600 underline decoration-blue-300">fit your choice.</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.</p>
      <SearchBarEdemy />
      <div className="mt-10">
        <PartnerLogoRow />
      </div>
    </div>
  </section>
);

export default HeroEdemy; 