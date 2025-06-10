const HeroBanner = () => {
  return (
    <section
      className="relative bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat h-screen w-full flex items-center justify-center"
      role="banner"
      aria-label="Soil Health Hero Section"
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 md:px-12 animate-fadeIn">
        <h1
          tabIndex={0}
          className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
        >
          Empower Your Soil Health
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-sm">
          Monitor soil nutrients, get personalized recommendations, and grow sustainably with
          real-time insights.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-black px-8 py-3 rounded-lg text-lg font-semibold transition duration-300 shadow-md">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroBanner;
