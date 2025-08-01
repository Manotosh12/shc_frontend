import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t('about.features.reportTitle'),
      description: t('about.features.reportDescription'),
    },
    {
      title: t('about.features.updateTitle'),
      description: t('about.features.updateDescription'),
    },
  ];

  const benefits = [
    t('about.benefits.point1'),
    t('about.benefits.point2'),
  ];

  return (
    <div className="pb-16 bg-white text-gray-800">
      {/* Full Width Banner Image */}
      <div className="w-full mb-12">
        <img
          src="/About.jpg"
          alt={t('about.bannerAlt')}
          className="w-full h-48 sm:h-48 md:h-100 object-cover rounded-none"
        />
      </div>

      {/* Main Content Wrapper */}
      <div className="px-6 md:px-20 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-left mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-700">
            {t('about.heading')}
          </h1>
          <p className="text-lg md:text-xl text-green-600 font-semibold mt-2">
            {t('about.tagline')}
          </p>
        </div>

        {/* Intro Paragraph */}
        <div className="text-justify mb-12 leading-relaxed space-y-4">
          <p>{t('about.intro.p1')}</p>
          <p>{t('about.intro.p2')}</p>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            {t('about.features.title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2 text-green-700">
                  {feature.title}
                </h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            {t('about.benefits.title')}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-black-700 font-medium">
            {benefits.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
