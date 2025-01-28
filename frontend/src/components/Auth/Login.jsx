import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axiosInstance from '../../axios'; // Import your axios instance
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // React Router's navigate hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { access_token, user } = response.data;

      // Save the token in localStorage
      localStorage.setItem('access_token', access_token);

      // Navigate to the home page
      navigate('/');
      console.log(`Welcome ${user.username}!`); // Optional: Debug or log the user data
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Login failed. Please try again.');
      console.error('Login error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-white-900">
      <div className="flex flex-col w-full max-w-md shadow-lg p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Login</h1>
          <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className={`w-full px-8 py-3 font-semibold rounded-md text-white ${
                isLoading || !email || !password
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-navColor hover:bg-darkNavColor'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            <p className="px-6 text-sm text-center dark:text-gray-600">
              Don't have an account yet?{' '}
              <Link
                rel="noopener noreferrer"
                to={"/register"}
                className="hover:underline dark:text-violet-600"
              >
                Sign up
              </Link>
              .
            </p>
          </div>
        </form>
    </div>
    </div>
  );
};

export default Login;
