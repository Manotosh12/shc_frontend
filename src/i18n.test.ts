import i18n from './i18n';

beforeAll(async () => {
  // Re-initialize i18n and wait for it to complete before running tests
  await i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: {
          hero: {
            ariaLabel: 'Hero section showing soil health insights',
            title: 'Empowering Farmers with Soil Intelligence',
            description: 'Get accurate soil health data, insights, and crop-specific fertilizer recommendations.',
            buttons: {
              nutrientDashboard: 'Nutrient Dashboard',
              fertilizerRecommendation: 'Fertilizer Recommendation',
            },
          },
        },
      },
    },
  });
});

describe('i18n configuration', () => {
  it('should initialize with English as default language', () => {
    expect(i18n.language).toBe('en');
  });

  it('should fallback to English if no language is detected', () => {
    expect(i18n.options.fallbackLng).toContain('en');
  });

  it('should have translation resources for English', () => {
    expect(i18n.hasResourceBundle('en', 'translation')).toBe(true);
  });

  it('should have hero.title translation', () => {
    const title = i18n.t('hero.title');
    expect(title).toBe('Empowering Farmers with Soil Intelligence');
  });

  it('should return correct translation for button text', () => {
    const buttonText = i18n.t('hero.buttons.nutrientDashboard');
    expect(buttonText).toBe('Nutrient Dashboard');
  });
});
export default i18n;
