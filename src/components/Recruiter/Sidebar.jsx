// Sidebar.jsx
import React from 'react';
import { Link,NavLink } from 'react-router-dom';
import '../Student/Style.css'; // Extracted CSS for the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="sections-side">
        <p><NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink></p> 
        <p><NavLink to="/jobpost" className={({ isActive }) => (isActive ? 'active-link' : '')}>Post Jobs</NavLink></p> 
        <p><NavLink to="/applications" className={({ isActive }) => (isActive ? 'active-link' : '')}>Applications</NavLink></p> 

        <p>About</p>
      </div>
    </div>
  );
};

export default Sidebar;