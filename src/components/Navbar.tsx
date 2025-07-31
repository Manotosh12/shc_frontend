import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import AuthButtons from "./AuthButtons";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (menuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [menuOpen]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <header className="bg-blue-900 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3" tabIndex={0}>
            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold tracking-wide">
              {t("navbar.title")}
            </span>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-full h-0.5 bg-white"></span>
            <span className="block w-full h-0.5 bg-white"></span>
            <span className="block w-full h-0.5 bg-white"></span>
          </button>

          {/* Nav Links */}
          <nav
            className={`flex-col md:flex-row md:flex gap-6 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-green-700 md:bg-transparent px-6 md:px-0 py-4 md:py-0 transition-all duration-300 ${menuOpen ? "flex" : "hidden md:flex"}`}
          >
            <a href="/" className="hover:text-gray-300" ref={firstLinkRef}>
              {t("navbar.links.home")}
            </a>
            <a href="/about" className="hover:text-gray-300">
              {t("navbar.links.about")}
            </a>
            <a href="/services" className="hover:text-gray-300">
              {t("navbar.links.services")}
            </a>
            <a href="/contact" className="hover:text-gray-300">
              {t("navbar.links.contact")}
            </a>

            <AuthButtons />

            <select
              onChange={handleLanguageChange}
              className="bg-white text-black border border-dark rounded px-2 py-1"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="kn">Kannada</option>
            </select>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
