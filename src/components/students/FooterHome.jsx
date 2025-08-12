import React from 'react';
import { assets } from '../../assets/assets';

const FooterHome = () => (
  <footer className="bg-blue-900 text-white pt-12 pb-6 mt-12">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Logo & Desc */}
      <div>
        <img src={assets.logo} alt="logo" className="w-32 mb-4" />
        <p className="text-sm mb-4">Wadah pengembangan diri membangun aura positif sekaligus meningkatkan kualitas skill, karir hingga level kehidupan Anda.</p>
        <div className="flex gap-3 mb-2">
          <a href="#" className="bg-yellow-400 p-2 rounded-full"><i className="fab fa-facebook-f text-blue-900"></i></a>
          <a href="#" className="bg-yellow-400 p-2 rounded-full"><i className="fab fa-instagram text-blue-900"></i></a>
          <a href="#" className="bg-yellow-400 p-2 rounded-full"><i className="fab fa-linkedin-in text-blue-900"></i></a>
        </div>
      </div>
      {/* Menu */}
      <div>
        <h4 className="font-bold mb-3">Online Program</h4>
        <ul className="space-y-1 text-sm">
          <li>Basic Plus <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded text-xs ml-1">Best Selling</span></li>
          <li>Kids Plus</li>
          <li>Basic Private</li>
          <li>Kids Private</li>
        </ul>
        <h4 className="font-bold mt-6 mb-3">Offline Program</h4>
        <ul className="space-y-1 text-sm">
          <li>Yogyakarta <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded text-xs ml-1">Best Selling</span></li>
          <li>Corporate</li>
          <li>Bintaro <span className="bg-yellow-400 text-blue-900 px-2 py-0.5 rounded text-xs ml-1">Private Only</span></li>
          <li>Surabaya</li>
        </ul>
      </div>
      {/* Contact & Useful */}
      <div>
        <h4 className="font-bold mb-3">Contact Us</h4>
        <p className="text-sm mb-2">Phone: +62-857-8000-7799</p>
        <p className="text-sm mb-2">Email: hello@dialogika.co</p>
        <h4 className="font-bold mt-6 mb-3">Useful Link</h4>
        <ul className="space-y-1 text-sm">
          <li>Blog Dialogika</li>
          <li>Mentor Dialogika</li>
        </ul>
      </div>
      {/* Payment & Copyright */}
      <div>
        <h4 className="font-bold mb-3">Payment Method</h4>
        <div className="flex gap-2 mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/BCA_logo.png" alt="BCA" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_OVO.png" alt="OVO" className="h-6" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Logo_gopay.png" alt="Gopay" className="h-6" />
        </div>
        <div className="text-xs text-gray-300 mt-8">&copy; Copyright Dialogika | PT. Dialogika Persona Indonesia</div>
      </div>
    </div>
  </footer>
);

export default FooterHome; 