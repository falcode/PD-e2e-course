import React, { useState } from 'react';
import '../index.css'

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus('idle');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = form;

    if (email === 'user@example.com' && password === '123456') {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"
            aria-label="form-login"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>

          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>

          {status === 'success' && (
              <p className="mt-4 text-center text-green-600 font-medium">
                Login successful!
              </p>
          )}
          {status === 'error' && (
              <p className="mt-4 text-center text-red-600 font-medium">
                Incorrect credentials.
              </p>
          )}
        </form>
      </div>
  );
};

export default Login;