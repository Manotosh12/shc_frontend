import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (menuOpen && firstLinkRef.current) {
      firstLinkRef.current.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && loginOpen) setLoginOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [loginOpen]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langMap: Record<string, string> = {
      English: "en",
      Hindi: "hi",
      Kannada: "kn",
      Tamil: "ta",
      Telugu: "te"
    };
    i18n.changeLanguage(langMap[e.target.value]);
  };

  return (
    <>
      <header className="bg-green-700 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3" tabIndex={0}>
            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold tracking-wide">{t('navbar.title')}</span>
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
              {t('navbar.links.home')}
            </a>
            <a href="/about" className="hover:text-gray-300">
              {t('navbar.links.about')}
            </a>
            <a href="/services" className="hover:text-gray-300">
              {t('navbar.links.services')}
            </a>
            <a href="/contact" className="hover:text-gray-300">
              {t('navbar.links.contact')}
            </a>

            <button
              onClick={() => {
                setLoginOpen(true);
                setMenuOpen(false);
              }}
              className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-xl font-semibold transition duration-200 shadow-md"
            >
              {t('navbar.login.button')}
            </button>

            <select
              onChange={handleLanguageChange}
              className="bg-white text-black border border-dark rounded px-2 py-1"
              defaultValue="English"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
            </select>
          </nav>
        </div>
      </header>

      {/* Login Modal */}
      {loginOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
          onClick={() => setLoginOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="login-title" className="text-lg font-bold mb-3">
              {t('navbar.login.title')}
            </h2>
            <p className="text-sm mb-4 text-gray-600">{t('navbar.login.subtitle')}</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Logging in with username: ${username}`);
              setLoginOpen(false);
              setUsername("");
              setPassword("");
            }} className="space-y-3">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  {t('navbar.login.username')}
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t('navbar.login.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setLoginOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  {t('navbar.login.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {t('navbar.login.submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
