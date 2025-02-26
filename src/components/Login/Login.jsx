import React, { useState } from 'react';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom';
import data from './data.json'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    const validPassword = '12'; 

    // Check if email and password are provided
    if (email === '' || password === '') {
      setError('Please enter both email and password.');
      return;
    }

    // Clean the email input (trim and remove extra spaces)
    const cleanedEmail = email.trim();

    // Ensure data arrays exist before using them
    const students = Array.isArray(data.students) ? data.students : [];
    const recruiters = Array.isArray(data.recruiters) ? data.recruiters : [];
    const staff = Array.isArray(data.staff) ? data.staff : [];

    // Debugging: Log the entered email and recruiter data
    console.log('Entered Email:', cleanedEmail);
    console.log('Recruiters Data:', recruiters);

    // Check if the email belongs to a student, recruiter, or staff
    const student = students.find(student => student.email.trim() === cleanedEmail);
    const recruiter = recruiters.find(recruiter => recruiter.email.trim() === cleanedEmail);
    const staffMember = staff.find(staff => staff.email.trim() === cleanedEmail);

    // Debugging: Log the results of each search
    console.log('Found Student:', student);
    console.log('Found Recruiter:', recruiter);
    console.log('Found Staff:', staffMember);

    // Check if user exists
    if (student || recruiter || staffMember) {
      // Password check
      if (password === validPassword) {
        if (staffMember) {
          navigate('/staff');
        } else if (recruiter) {
          navigate('/recruiter');
        } else if (student) {
          navigate('/student');
        }
      } else {
        setError('Invalid password');
      }
    } else {
      setError('Email not found');
    }
};



  

  return (
    <div className="page-container">
      <div className="login-container">
        <div className="login-box">
          <h1>Login to Your Account</h1>
          <p>Enter your credentials</p>
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

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
