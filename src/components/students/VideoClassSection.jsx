import React from 'react';

const videos = [
  { title: 'Are you having trouble finding the right dog?', img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&q=80' },
  { title: 'Is your dog aggressive towards your kids?', img: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&q=80' },
  { title: 'Looking for someone to train your dog?', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&q=80' },
  { title: 'Choose the most stylist and durable products for your dog.', img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=400&q=80' },
];

const VideoClassSection = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Vidio Class</h2>
      <p className="text-gray-600 mb-8">Top vidio public speaking</p>
      <div className="flex flex-wrap justify-center gap-8">
        {videos.map((video, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md w-60 p-4 flex flex-col items-center">
            <img src={video.img} alt={video.title} className="w-full h-36 object-cover rounded-lg mb-3" />
            <span className="text-sm text-gray-700 font-medium">{video.title}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default VideoClassSection; 