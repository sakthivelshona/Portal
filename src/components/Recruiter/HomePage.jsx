import React from 'react';
import Sidebar from './Sidebar';
import './Style.css';  // Make sure to import the new CSS file

function HomePage() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />

      <div className="main-content">
        <h1 className="centered-text">Welcome to the Job Portal</h1>
      </div>
    </div>
  );
}

export default HomePage;
