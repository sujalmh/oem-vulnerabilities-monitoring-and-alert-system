import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axiosInstance from '../../axios'; // Import your axios instance
import EmailInputWithOTP from './register/EmailInputWithOTP';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigate hook

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axiosInstance.post('/auth/register', { username, email, password });
      console.log(response.data);
      // Navigate to home page
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Registration failed. Please try again.');
      console.error('Registration error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 shadow-md rounded-md w-[450px]">
        <h2 className="my-3 text-4xl font-bold text-center">Register</h2>
        <p className="text-center text-sm dark:text-gray-600 mb-6">Create an account to continue</p>

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <EmailInputWithOTP
          email={email}
          setEmail={setEmail}
          isOtpVerified={isOtpVerified}
          setIsOtpVerified={setIsOtpVerified}
        />

        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {errorMessage && (
          <p className="mb-4 text-red-500 text-sm">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={!username || !email || !password || !isOtpVerified || isLoading}
          className={`w-full py-2 rounded-md text-white ${
            username && email && password && isOtpVerified && !isLoading
              ? 'bg-navColor hover:bg-darkNavColor'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
