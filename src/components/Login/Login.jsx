import React, { useState } from 'react';
import './Login.css'; // Use shared styles
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import data from './data.json'; // Importing the data from the json file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Simple password validation (hardcoded for demonstration)
    const validPassword = '12'; // This can be replaced with an API call to check password

    // Check if email matches any student email and if password is correct
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return;
    }

    // Find student by email
    const student = data.students.find(student => student.email === email);

    if (student) {
      // Password check
      if (password === validPassword) {
        // Redirect to student dashboard or home page
        navigate('/student');
        //navigate(`/student/${student.rollno}`);

      } else {
        setError('Invalid password');
      }
    } 
    
    else {
      setError('Email not found');
    }

  };

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-box">
          <h1>Login to Your Account</h1>
          <p>Welcome back!</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="options">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
            <button type="submit" className="login-button">Login</button>

            <div className="divider"> -----------or----------</div>

            {/* Google sign-in */}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credentialResponseDetail = jwtDecode(credentialResponse.credential);
                console.log(credentialResponseDetail);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              className="google-login-button"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
