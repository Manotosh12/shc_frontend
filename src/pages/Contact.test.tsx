import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom';

import { api } from '../services/api';
import type { Contact } from '../types';
import ContactUs from './Contact';

// ✅ Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// ✅ Mock the API service
jest.mock('../services/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    designation: 'Agriculture Officer',
    phone: '1234567890',
    email: 'john@example.com',
    category: 'DACFW',
  },
];

describe('ContactUs Component', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockContacts });
  });

  it('renders banner image and heading', async () => {
    await act(async () => {
      render(<ContactUs />);
    });

    expect(screen.getByRole('img')).toHaveAttribute('src', '/Contact.jpg');
    expect(screen.getByText('contact.heading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('displays table headers', async () => {
    await act(async () => {
      render(<ContactUs />);
    });

    expect(screen.getByText('contact.table.name')).toBeInTheDocument();
    expect(screen.getByText('contact.table.designation')).toBeInTheDocument();
    expect(screen.getByText('contact.table.phone')).toBeInTheDocument();
    expect(screen.getByText('contact.table.email')).toBeInTheDocument();
  });

  it('switches tabs and reloads contacts', async () => {
    await act(async () => {
      render(<ContactUs />);
    });

    const nicTab = screen.getByText('contact.tabs.NIC');
    fireEvent.click(nicTab);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/contacts?category=NIC');
    });
  });

  it('shows no contacts message when list is empty', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    await act(async () => {
      render(<ContactUs />);
    });

    await waitFor(() => {
      const message = screen.getByText((content) =>
        content.includes('contact.noContacts')
      );
      expect(message).toBeInTheDocument();
    });
  });
});
