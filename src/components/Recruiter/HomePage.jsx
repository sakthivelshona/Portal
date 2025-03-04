import React from 'react';
import Sidebar from './Sidebar';
import './Style.css';  // Make sure to import the new CSS file
import { useNavigate } from 'react-router-dom';



function HomePage() {
  const navigate = useNavigate();

  function postbtn() {
    navigate('/jobpost')
  }
  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />

      <div className="centered-text">
        <h1>Welcome to the Job Portal</h1>
        <div className="page-recruiter">
          <div className='para-new-recruiter'>
            <p>Welcome to our job portal! Here, we connect job seekers with the best opportunities available in various industries. Whether you're looking for a full-time position, a part-time gig, or a remote opportunity, we offer a variety of listings that can match your skills and interests. Browse through our platform, find your ideal job, and start your journey toward career success today!
            </p>
            <button onClick={postbtn}>Post Job</button>
          </div>
          <img src="front.jpg" alt="" />
        </div>

      </div>
    </div>
  );
}

export default HomePage;
