import React from 'react';
import { assets } from '../../assets/assets.js';

const OurClients = () => {
  const clients = [
    {
      id: 1,
      name: 'Universitas Gajah Mada',
      logo: assets.ugm_logo,
      alt: 'UGM Logo',
      description: 'Educational and research institutions'
    },
    {
      id: 2,
      name: 'Amikom Yogyakarta',
      logo: assets.amikom_logo,
      alt: 'Amikom Logo',
      description: 'Educational and research institutions'
    },
    {
      id: 3,
      name: 'Universitas Islam Indonesia',
      logo: assets.uii_logo,
      alt: 'UII Logo',
      description: 'Educational and research institutions'
    },
    {
      id: 4,
      name: 'UIN SUKA',
      logo: assets.uin_logo,
      alt: 'UIN SUKA Logo',
      description: 'Educational and research institutions'
    },
    {
      id: 5,
      name: 'UAD',
      logo: assets.uad_logo,
      alt: 'UAD Logo',
      description: 'Educational and research institutions'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Join thousands of companies worldwide that trust our platform for their learning and development needs. 
            We're proud to serve industry leaders across technology, retail, consulting, and creative sectors.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center mb-12">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className="group flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="relative">
                <img
                  src={client.logo}
                  alt={client.alt}
                  className="h-16 w-auto max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  title={client.name}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {client.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {client.description}
                </p>
              </div>
            </div>
          ))}
        </div>

    

        
      </div>
    </section>
  );
};

export default OurClients; 