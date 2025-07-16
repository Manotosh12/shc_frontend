
import { render, screen } from '@testing-library/react';
import Services from './Services';

// Mock i18n translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // return the key itself for easy testing
  }),
}));

describe('Services Component', () => {
  it('renders the page title and description', () => {
    render(<Services />);
    
    expect(screen.getByText('services.title')).toBeInTheDocument();
    expect(screen.getByText('services.description')).toBeInTheDocument();
  });

  it('renders all 6 service cards', () => {
    render(<Services />);

    const serviceTitles = [
      'services.soilTesting.title',
      'services.soilReports.title',
      'services.digitalAccess.title',
      'services.farmerTraining.title',
      'services.fertilizerAdvice.title',
      'services.schemeSupport.title',
    ];

    serviceTitles.forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });

  it('renders all service descriptions', () => {
    render(<Services />);

    const descKeys = [
      'services.soilTesting.desc',
      'services.soilReports.desc',
      'services.digitalAccess.desc',
      'services.farmerTraining.desc',
      'services.fertilizerAdvice.desc',
      'services.schemeSupport.desc',
    ];

    descKeys.forEach((key) => {
      expect(screen.getByText(key)).toBeInTheDocument();
    });
  });
});
