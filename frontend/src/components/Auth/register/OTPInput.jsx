import React, { useRef } from 'react';

const OTPInput = ({ length = 6, otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      const newOtp = otp.split('');
      newOtp[index] = value;
      setOtp(newOtp.join(''));

      // Move focus to the next input
      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    } else if (value === '') {
      // Allow clearing the field
      const newOtp = otp.split('');
      newOtp[index] = '';
      setOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      // Move focus to the previous input on backspace
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={otp[index] || ''}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
          className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      ))}
    </div>
  );
};

export default OTPInput;
