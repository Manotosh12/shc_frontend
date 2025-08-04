import i18n from './i18nTestConfig';

describe('i18n English Translations', () => {
  it('should translate navbar title correctly', () => {
    expect(i18n.t('navbar.title')).toBe('SoilXpert');
  });

  it('should translate navbar login button', () => {
    expect(i18n.t('navbar.login.button')).toBe('Login');
  });

  it('should translate hero title and description', () => {
    expect(i18n.t('hero.title')).toBe('Empowering Farmers with Soil Intelligence');
    expect(i18n.t('hero.description')).toBe('Precision farming starts with healthy soil.');
  });

  it('should translate hero buttons correctly', () => {
    expect(i18n.t('hero.buttons.nutrientDashboard')).toBe('View Nutrient Dashboard');
    expect(i18n.t('hero.buttons.fertilizerRecommendation')).toBe('Get Fertilizer Recommendations');
  });

  it('should translate about tagline and heading', () => {
    expect(i18n.t('about.tagline')).toBe('Soil Insight, Smarter Farming');
    expect(i18n.t('about.heading')).toBe('About Us');
  });

  it('should translate services title', () => {
    expect(i18n.t('services.title')).toBe('Our Services');
  });

  it('should translate contact heading and tabs', () => {
    expect(i18n.t('contact.heading')).toBe('Contact Us');
    expect(i18n.t('contact.tabs.DACFW')).toBe('Department of Agriculture (DACFW)');
  });

  it('should translate fertilizer form labels and result title', () => {
    expect(i18n.t('fertilizer.title')).toBe('Fertilizer Recommendation');
    expect(i18n.t('fertilizer.resultTitle')).toBe('Fertilizer Recommendation Results');
    expect(i18n.t('fertilizer.nitrogen')).toBe('Nitrogen');
    expect(i18n.t('fertilizer.ph')).toBe('pH');
  });

  it('should translate signup form texts', () => {
    expect(i18n.t('signup.heading')).toBe('Sign Up');
    expect(i18n.t('signup.successMessage')).toBe('Signup successful! Redirecting to login...');
  });

  it('should translate chart loading message', () => {
    expect(i18n.t('charts.loading')).toBe('Loading soil nutrient data...');
  });

  it('should translate Nutrient Dashboard labels', () => {
    expect(i18n.t('Nutrient Dashboard.title')).toBe('Nutrient Dashboard');
    expect(i18n.t('Nutrient Dashboard.table.name')).toBe('Name');
  });

  it('should translate footer quick links', () => {
    expect(i18n.t('footer.quickLinks.about')).toBe('About');
    expect(i18n.t('footer.importantLinks.calculator')).toBe('Fertilizer Calculator');
  });
});
