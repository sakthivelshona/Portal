import React, { useState, useEffect } from 'react';
import '../Student/new.css'; // Importing the CSS file for styling
import Sidebar from '../Student/Sidebar'; // Import Sidebar component

function RejectedJobs() {
    return (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <div className="new-job-updates">
              <h1>Rejected Jobs</h1>
              <div className="appliedjobs-container">
                
                  <p>No Rejected jobs available.</p>
            
                        </div>
                      </div>
            
          </div>
        </div>
      );
    }

export default RejectedJobs
