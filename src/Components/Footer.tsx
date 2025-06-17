import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1a4d2e] to-[#0f2d1a] text-white">
      {/* Top Border */}
      <div className="h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Soil Health Card Logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-xl font-bold tracking-wide">Soil Health Card</h2>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-green-300">Quick Links</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-green-300">Important Links</h3>
            <ul className="space-y-1.5 text-sm">
              <li className="text-gray-300">Soil Health Card</li>
              <li className="text-gray-300">Fertilizer Calculator</li>
              <li className="text-gray-300">Crop Calendar</li>
              <li className="text-gray-300">Weather Updates</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-green-300">Contact Us</h3>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-1.5">
                <svg className="w-4 h-4 mt-0.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>123 Agriculture Street, Farming District, India</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>+91 123XXXXXX</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>info@soilhealthcard.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-300">
            <p>© 2024 Soil Health Card Portal. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-3 mt-2 md:mt-0">
              <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-green-400 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-green-400 transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 