import { render, screen } from '@testing-library/react';
import About from './About';

// Mock i18next translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('About Component', () => {
  test('renders the About heading and tagline', () => {
    render(<About />);
    expect(screen.getByText('about.heading')).toBeInTheDocument();
    expect(screen.getByText('about.tagline')).toBeInTheDocument();
  });

  test('renders intro paragraphs', () => {
    render(<About />);
    expect(screen.getByText('about.intro.p1')).toBeInTheDocument();
    expect(screen.getByText('about.intro.p2')).toBeInTheDocument();
  });

  test('renders feature titles and descriptions', () => {
    render(<About />);
    expect(screen.getByText('about.features.title')).toBeInTheDocument();
    expect(screen.getByText('about.features.reportTitle')).toBeInTheDocument();
    expect(screen.getByText('about.features.reportDescription')).toBeInTheDocument();
    expect(screen.getByText('about.features.updateTitle')).toBeInTheDocument();
    expect(screen.getByText('about.features.updateDescription')).toBeInTheDocument();
  });

  test('renders benefit points', () => {
    render(<About />);
    expect(screen.getByText('about.benefits.title')).toBeInTheDocument();
    expect(screen.getByText('about.benefits.point1')).toBeInTheDocument();
    expect(screen.getByText('about.benefits.point2')).toBeInTheDocument();
  });

  test('renders banner image with alt text', () => {
    render(<About />);
    const image = screen.getByAltText('about.bannerAlt') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('/About.jpg');
  });
});
