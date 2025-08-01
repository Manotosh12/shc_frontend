// i18nTestConfig.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Test i18n instance with only minimal required translations
void i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: {
        hero: {
          ariaLabel: 'Hero Section',
          title: 'Empowering Farmers with Soil Intelligence',
          description: 'Precision farming starts with healthy soil.',
          buttons: {
            nutrientDashboard: 'Nutrient Dashboard',
            fertilizerRecommendation: 'Fertilizer Recommendation'
          }
        },
        fertilizer: {
          title: 'Fertilizer Recommendation Form',
          nitrogen: 'Nitrogen (N)',
          phosphorus: 'Phosphorus (P)',
          potassium: 'Potassium (K)',
          organicCarbon: 'Organic Carbon (OC)',
          ph: 'Soil pH',
          submit: 'Get Recommendation',
          resultTitle: 'Fertilizer Recommendation Results'
        }
      }
    }
  },
  interpolation: {
    escapeValue: false, // Not needed for React
  },
});

export default i18n;
