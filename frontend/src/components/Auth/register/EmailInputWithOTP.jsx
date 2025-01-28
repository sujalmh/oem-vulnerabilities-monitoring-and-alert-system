import React, { useState } from 'react';
import axiosInstance from '../../../axios'; // Import your axios instance
import OTPInput from './OTPInput';

const EmailInputWithOTP = ({ email, setEmail, isOtpVerified, setIsOtpVerified }) => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [localOtp, setLocalOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/get_otp', { email });
      console.log(response.data.message); // For debugging or user feedback
      setShowOtpModal(true);
    } catch (error) {
      console.error('Error sending OTP:', error.response?.data || error.message);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/auth/verify_otp', {
        email,
        otp: localOtp,
      });
      console.log(response.data.message); // For debugging or user feedback
      setIsOtpVerified(true);
      setShowOtpModal(false);
    } catch (error) {
      console.error('Error verifying OTP:', error.response?.data || error.message);
      alert(error.response?.data?.error || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-600 mb-2">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          if (!isOtpVerified) {
            setEmail(e.target.value);
          }
        }}
        placeholder="Enter email"
        disabled={isOtpVerified}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
          isOtpVerified ? 'bg-gray-100 cursor-not-allowed' : 'focus:ring-blue-200'
        }`}
      />
      {!isOtpVerified && email && (
        <button
          onClick={handleSendOtp}
          disabled={isLoading}
          className={`mt-2 px-4 py-2 ${
            isLoading ? 'bg-gray-400' : 'bg-navColor hover:bg-darkNavColor'
          } text-white rounded-md`}
        >
          {isLoading ? 'Sending...' : 'Send OTP'}
        </button>
      )}
      {isOtpVerified && (
        <p className="mt-2 text-green-500 font-bold">Email Verified</p>
      )}

      {showOtpModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
            <OTPInput length={6} otp={localOtp} setOtp={setLocalOtp} />
            <div className="mt-4">
              <button
                onClick={handleOtpVerification}
                disabled={isLoading}
                className={`px-4 py-2 ${
                  isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                } text-white rounded-md`}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailInputWithOTP;
