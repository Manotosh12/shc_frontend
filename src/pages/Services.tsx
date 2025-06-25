import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-2 mt-2 px-6 md:px-16 bg-white text-gray-800">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">{t('services.title')}</h1>
        <p className="text-lg text-gray-600">
          {t('services.description')}
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">{t('services.soilTesting.title')}</h2>
          <p className="text-gray-700 text-sm">{t('services.soilTesting.desc')}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">{t('services.soilReports.title')}</h2>
          <p className="text-gray-700 text-sm">{t('services.soilReports.desc')}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">{t('services.digitalAccess.title')}</h2>
          <p className="text-gray-700 text-sm">{t('services.digitalAccess.desc')}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">{t('services.farmerTraining.title')}</h2>
          <p className="text-gray-700 text-sm">{t('services.farmerTraining.desc')}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">{t('services.fertilizerAdvice.title')}</h2>
          <p className="text-gray-700 text-sm">{t('services.fertilizerAdvice.desc')}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-green-800 mb-2">{t('services.schemeSupport.title')}</h2>
          <p className="text-gray-700 text-sm">{t('services.schemeSupport.desc')}</p>
        </div>
      </section>
    </main>
  );
};

export default Services;
