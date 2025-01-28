import React, { useState } from 'react';
import axiosInstance from '../../../axios';
import { useNavigate } from 'react-router-dom';
  ``
const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(''); // State to hold the backend message

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', formData);
      console.log('Login successful:', response.data);
      // Save token in localStorage
      localStorage.setItem('access_token', response.data.access_token);
      setMessage('Login successful!'); // Set success message
      navigate('/'); // Navigate to home page
    } catch (error) {
      console.error('Login error!', error);
      setMessage(error.response?.data?.error || 'An error occurred. Please try again.'); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {message && (
          <div
            className={`text-sm p-4 mb-6 rounded-md ${
              message.includes('successful') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}
          >
            {message}
          </div>
        )}
        <h2 className="text-2xl font-bold mb-1 text-center text-gray-800">Register</h2>        
        <p className="text-sm dark:text-gray-600 mb-6 text-center">Create an account to continue</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}a
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-navColor text-white py-2 px-4 rounded-md shadow-md hover:bg-darkNavColor focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
