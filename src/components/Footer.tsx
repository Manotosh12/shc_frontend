import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
   <footer className="bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] text-white">
  <div className="h-0.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400"></div>
   <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Soil Health Card Logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-xl font-bold tracking-wide">{t('footer.title')}</h2>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-green-300">{t('footer.quickLinks.title')}</h3>
            <ul className="space-y-1.5 text-sm">
              <li><Link to="/" className="hover:text-green-400 transition-colors">{t('footer.quickLinks.home')}</Link></li>
              <li><Link to="/about" className="hover:text-green-400 transition-colors">{t('footer.quickLinks.about')}</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition-colors">{t('footer.quickLinks.services')}</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors">{t('footer.quickLinks.contact')}</Link></li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-green-300">{t('footer.importantLinks.title')}</h3>
            <ul className="space-y-1.5 text-sm text-gray-300">
              <li>{t('footer.importantLinks.calculator')}</li>
              <li>{t('footer.importantLinks.weather')}</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-green-300">{t('footer.contact.title')}</h3>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-start gap-1.5">
                <svg className="w-4 h-4 mt-0.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                </svg>
                <span>{t('footer.contact.address')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                <span>{t('footer.contact.phone')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span>{t('footer.contact.email')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-3">
        </div>
      </div>
    </footer>
  );
};

export default Footer;
