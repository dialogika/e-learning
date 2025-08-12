import React from 'react';

const WebinarFormSection = () => (
  <section className="bg-white py-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6">
      {/* Left: Contact & Image */}
      <div className="flex-1 flex flex-col gap-6 justify-center">
        <div className="flex gap-4">
          <div className="flex-1 bg-blue-50 p-4 rounded-lg flex items-center gap-3">
            <span className="material-icons text-blue-600">call</span>
            <div>
              <div className="text-xs text-gray-500">Call Us</div>
              <div className="font-semibold text-gray-800">+62-851-6291-2597</div>
            </div>
          </div>
          <div className="flex-1 bg-blue-50 p-4 rounded-lg flex items-center gap-3">
            <span className="material-icons text-blue-600">email</span>
            <div>
              <div className="text-xs text-gray-500">Email Us</div>
              <div className="font-semibold text-gray-800">hello@dialogika.co</div>
            </div>
          </div>
        </div>
        <img src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=500&q=80" alt="Webinar" className="rounded-xl shadow-lg w-full max-w-md object-cover mt-4" />
      </div>
      {/* Right: Form */}
      <div className="flex-1 bg-blue-50 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register for <span className="text-blue-600">Event Webinar</span> Now</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input type="text" placeholder="Nama Lengkap *" className="flex-1 px-4 py-2 border rounded" />
            <input type="text" placeholder="Nomor Whatsapp *" className="flex-1 px-4 py-2 border rounded" />
          </div>
          <input type="text" placeholder="Domisili saat ini *" className="w-full px-4 py-2 border rounded" />
          <input type="text" placeholder="Profesi *" className="w-full px-4 py-2 border rounded" />
          <input type="text" placeholder="Apakah kamu pernah mengikuti kelas atau program dari dialogika?" className="w-full px-4 py-2 border rounded" />
          <input type="text" placeholder="WAJIB Oncam saat Acara..." className="w-full px-4 py-2 border rounded" />
          <textarea placeholder="Mendapatkan informasi webinar ini dari mana?" className="w-full px-4 py-2 border rounded" />
          <button type="submit" className="w-full bg-yellow-400 text-white font-bold py-3 rounded-lg mt-2">Daftar & Gabung group Whatsapp</button>
        </form>
      </div>
    </div>
  </section>
);

export default WebinarFormSection; 