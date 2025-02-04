import React, { useState, useEffect } from 'react';
import '../Student/Style.css'; // Importing the CSS file for styling
import Sidebar from '../Student/Sidebar'; // Import Sidebar component

function AppliedJobs() {


  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="new-job-updates">
          <h1>Applied Jobs</h1>
          <div className="appliedjobs-container">
            
              <p>No applied jobs available.</p>
        
                    </div>
                  </div>
        
      </div>
    </div>
  );
}

export default AppliedJobs;
