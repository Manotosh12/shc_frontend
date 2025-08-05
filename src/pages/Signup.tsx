import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

export default function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData);
      alert(t('signup.successMessage'));
      navigate('/login', { state: { signupSuccess: true } });
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      if (axiosErr.response?.data?.message) {
        setError(axiosErr.response.data.message);
      } else {
        setError(t('signup.errorMessage'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSignup();
        }}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">{t('signup.heading')}</h2>

        <input
          name="email"
          type="email"
          placeholder={t('signup.email')}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder={t('signup.password')}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="name"
          placeholder={t('signup.name')}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="phone"
          placeholder={t('signup.phone')}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? t('signup.loading') : t('signup.submit')}
        </button>
      </form>
    </div>
  );
}
