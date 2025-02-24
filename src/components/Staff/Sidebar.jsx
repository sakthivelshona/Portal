// Sidebar.jsx
import React from 'react';
import { Link,NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="sections-side">
        <p><NavLink to="/staff" className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink></p> 
        <p><NavLink to="/receivedjobs" className={({ isActive }) => (isActive ? 'active-link' : '')}>All Jobs</NavLink></p> 
        <p><NavLink to="/studentApplicationStaff" className={({ isActive }) => (isActive ? 'active-link' : '')}>Applications</NavLink></p> 
        <p><NavLink to="/useraccount" className={({ isActive }) => (isActive ? 'active-link' : '')}>Account</NavLink></p> 
      </div>
    </div>
  );
};

export default Sidebar;