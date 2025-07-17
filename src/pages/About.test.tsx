
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from './About';


// ✅ Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return translation key for testing
  }),
}));

describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('renders banner image with alt text', () => {
    const bannerImg = screen.getByRole('img');
    expect(bannerImg).toHaveAttribute('src', '/About us banner.jpg');
    expect(bannerImg).toHaveAttribute('alt', 'about.bannerAlt');
  });

  it('renders section heading and tagline', () => {
    expect(screen.getByText('about.heading')).toBeInTheDocument();
    expect(screen.getByText('about.tagline')).toBeInTheDocument();
  });

  it('renders intro paragraphs', () => {
    expect(screen.getByText('about.intro.p1')).toBeInTheDocument();
    expect(screen.getByText('about.intro.p2')).toBeInTheDocument();
  });

  it('renders key features section', () => {
    expect(screen.getByText('about.features.title')).toBeInTheDocument();
    expect(screen.getByText('about.features.reportTitle')).toBeInTheDocument();
    expect(screen.getByText('about.features.reportDescription')).toBeInTheDocument();
    expect(screen.getByText('about.features.updateTitle')).toBeInTheDocument();
    expect(screen.getByText('about.features.updateDescription')).toBeInTheDocument();
  });

  it('renders benefits section', () => {
    expect(screen.getByText('about.benefits.title')).toBeInTheDocument();
    expect(screen.getByText('about.benefits.point1')).toBeInTheDocument();
    expect(screen.getByText('about.benefits.point2')).toBeInTheDocument();
  });
});
