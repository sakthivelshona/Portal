import React from 'react';
import Sidebar from './Sidebar';
import './Style.css'; // Ensure the CSS is correctly linked
import { useNavigate } from 'react-router-dom';
import SuccessPage from './SuccessPage'


function HomePage() {
  const navigate = useNavigate();

  function postbtn() {
    navigate('/jobpost');
  }

  return (
    <>
    <div className="containers">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="centered-text">
        <h1>Welcome to the Job Portal</h1>

        <div className="recruiter-section">
          <div className="recruit-box" style={{ backgroundColor: '#68AD5D' }}>
            <h3>Job Posted</h3>
            <p>10</p>
          </div>

          <div className="recruit-box" style={{ backgroundColor: '#4FB6CA' }}>
            <h3>Active Job Posts</h3>
            <p>6</p>
          </div>

          <div className="recruit-box" style={{ backgroundColor: '#E69F50' }}>
            <h3>Application Received</h3>
            <p>3</p>
          </div>

          <div className="recruit-box" style={{ backgroundColor: '#8748B1' }}>
            <h3>Pending Approvals</h3>
            <p>9</p>
          </div>
        </div>
      </div>
      </div>

      {/* Job Posted Details */}
      <div className="job-posted-details">
        <SuccessPage />
      </div>
    </>
  );
}

export default HomePage;
