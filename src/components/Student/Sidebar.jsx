// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
//import './Sidebar.css'; // Extracted CSS for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="sections-side">
        <p><Link to="/student">Dashboard</Link></p>
        <p><Link to="/applyjobs">Apply Jobs</Link></p>
        <p>Resume</p>
        <p>FAQ's</p>
      </div>
    </div>
  );
};

export default Sidebar;