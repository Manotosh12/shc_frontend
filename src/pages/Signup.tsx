// src/pages/Signup.tsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.post('http://localhost:3000/auth/signup', formData);
      alert('Signup successful! Redirecting to login...');
      navigate('/login', { state: { signupSuccess: true } }); // ✅ Redirect to login page
    } catch (err: any) {
        if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Show backend error message
        } else {
        setError('Signup failed. Please try again.');
        }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={e => { e.preventDefault(); handleSignup(); }}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}
