import { useTranslation } from 'react-i18next';

const HeroBanner = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden"
        aria-label={t('hero.ariaLabel')}
      >
        <div className="relative z-10 text-center text-white px-6 md:px-12 max-w-5xl mx-auto">
          <div className="space-y-6 animate-fadeIn">
            <h1
              tabIndex={0}
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-green-900 drop-shadow-lg tracking-tight"
            >
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-6 max-w-3xl mx-auto leading-relaxed font-bold drop-shadow-sm">
              {t('hero.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Buttons Below the Banner */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-5 mb-5 px-4">
        <button 
          className="group bg-white hover:bg-white text-green-800 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[280px] flex items-center justify-center"
          onClick={() => window.location.href = '/nutrient-dashboard'}
        >
          <span className="mr-3 text-2xl">📊</span>
          <span className="relative">
            {t('hero.buttons.nutrientDashboard')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </button>
        <button 
          className="group bg-green hover:bg-white text-green-800 px-10 py-5 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-w-[280px] flex items-center justify-center"
          onClick={() => window.location.href = '/fertilizer-recommendation'}
        >
          <span className="mr-3 text-2xl">🌱</span>
          <span className="relative">
            {t('hero.buttons.fertilizerRecommendation')}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </span>
        </button>
      </div>
    </>
  );
};

export default HeroBanner;
