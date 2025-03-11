import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaClipboardList, FaBullhorn, FaInfoCircle } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="sections-side">
        <p>
          <NavLink to="/recruiter" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaHome /> Home
          </NavLink>
        </p>
        <p>
          <NavLink to="/jobpost" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaBullhorn /> Post Jobs
          </NavLink>
        </p>
        <p>
          <NavLink to="/recruiterApplication" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaClipboardList /> Applications
          </NavLink>
        </p>
        <p>
          <NavLink to="https://www.bitsathy.ac.in/#" className={({ isActive }) => (isActive ? 'active-link' : '')}>
            <FaInfoCircle /> About
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
