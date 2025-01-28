import React from 'react';

const PasswordInput = ({ password, setPassword }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h3>Enter your password</h3>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{
          width: '250px',
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '30px'
        }}
      />
    </div>
  );
};

export default PasswordInput;
