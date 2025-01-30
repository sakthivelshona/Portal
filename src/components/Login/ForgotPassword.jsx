import React, { useState } from 'react';
import './Login.css'; // Use shared styles

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log('Forgot Password Email:', email);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Forgot Password?</h1>
        <p>Please enter your registered email</p>
        <form onSubmit={handleForgotPassword}>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-button">Confirm Email</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
