import React from 'react';

const gridImages = Array(9).fill('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80');

const VideoClassGridSection = () => (
  <section className="py-12 bg-white">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
      {/* Left: Title, Desc, Button */}
      <div className="flex-1 mb-8 md:mb-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Vidio class</h2>
        <p className="text-gray-600 mb-6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of</p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg">See All Vidio Class</button>
      </div>
      {/* Right: Grid */}
      <div className="flex-1 grid grid-cols-3 gap-4">
        {gridImages.map((img, idx) => (
          <img key={idx} src={img} alt="Vidio class" className="w-full h-28 object-cover rounded-lg" />
        ))}
      </div>
    </div>
  </section>
);

export default VideoClassGridSection; 