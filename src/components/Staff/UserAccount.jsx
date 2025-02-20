import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function UserAccount() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    designation: "", // Add designation to state
  });

  // Handle input change for email, password, and designation
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Function to generate a random strong password (16 characters)
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 16; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    setFormData({ ...formData, password });  // Update password state
  };

  // Function to handle account creation (POST request to backend)
  const createAccount = async () => {
    const { email,designation, password  } = formData;

    if (email && password && designation) {
      const data =  { email,designation, password  }; // Include designation

      try {
        // Send a POST request to the backend
        const response = await fetch('http://localhost:3000/createAccount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
          alert('Account created successfully!');
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Error creating account:', error);
        alert('An error occurred while creating the account.');
      }
    } else {
      alert('Please fill in all fields (email, password, and designation).');
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="addnewusers">
        <div className="column-add-acc">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="column-add-acc">
          <label htmlFor="designation">Designation: </label>
          <select
            name="designation"
            id="designation"
            value={formData.designation}
            onChange={handleChange}
          >
            <option value="">Select Designation</option>
            <option value="Student">Student</option>
            <option value="Staff">Staff</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>
        <div className="column-add-acc">
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="generate-password-admin"
            onClick={generatePassword} // Generate password when clicked
          >
            Generate password
          </span>
        </div>

        <button className="new-account-create" onClick={createAccount}>
          Create Account
        </button>
      </div>
    </div>
  );
}

export default UserAccount;
