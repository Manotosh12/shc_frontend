const HeroBanner = () => {
  return (
    <section
      className="relative bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat h-[calc(100vh-4rem)] w-full flex flex-col items-center justify-center overflow-hidden mt-16"
      role="banner"
      aria-label="Soil Health Hero Section"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_100%)] animate-pulse"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12 max-w-5xl mx-auto">
        <div className="space-y-6 animate-fadeIn">
          <h1
            tabIndex={0}
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 drop-shadow-lg tracking-tight"
          >
            Empower Your Soil Health
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-sm">
            Monitor soil nutrients, get personalized recommendations, and grow sustainably with
            real-time insights.
          </p>
        </div>
      </div>

      {/* Enhanced Buttons */}
      <div className="relative z-10 flex flex-col md:flex-row gap-6 mt-16 px-4">
        <button 
          className="group bg-white/90 hover:bg-white backdrop-blur-sm text-green-800 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[280px] flex items-center justify-center"
          onClick={() => window.location.href = '/nutrient-dashboard'}
        >
          <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">📊</span>
          <span className="relative">
            Nutrient Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </button>
        <button 
          className="group bg-white/90 hover:bg-white backdrop-blur-sm text-green-800 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[280px] flex items-center justify-center"
          onClick={() => window.location.href = '/fertilizer-recommendation'}
        >
          <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">🌱</span>
          <span className="relative">
            Fertilizer Recommendation
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </button>
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

// Add this to your global CSS file (e.g., globals.css)
/*
@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(20px);
    opacity: 0;
  }
}

.animate-scroll {
  animation: scroll 2s ease-in-out infinite;
}
*/

export default HeroBanner;
