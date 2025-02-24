// Sidebar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="sections-side">
        <p><NavLink to="/student" className={({ isActive }) => (isActive ? 'active-link' : '')}>Dashboard</NavLink></p>
        <p><NavLink to="/applyjobs" className={({ isActive }) => (isActive ? 'active-link' : '')}>Apply Jobs</NavLink></p>
        <p><NavLink to="/resume" className={({ isActive }) => (isActive ? 'active-link' : '')}>Resume</NavLink></p>
        <p><NavLink to="/staff" className={({ isActive }) => (isActive ? 'active-link' : '')}>Staff</NavLink></p>
        <p><NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'active-link' : '')}>Recruiter</NavLink></p>
        <p><NavLink to="/faq" className={({ isActive }) => (isActive ? 'active-link' : '')}>FAQ</NavLink></p>
        <p><NavLink to="/studentaccount" className={({ isActive }) => (isActive ? 'active-link' : '')}>Account</NavLink></p>
      </div>
    </div>
  );
};

export default Sidebar;
