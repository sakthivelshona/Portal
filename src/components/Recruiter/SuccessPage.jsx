import React, { useEffect, useState } from 'react';
import './Style.css';

function SuccessPage() {
  const [allJobs, setAllJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/getjobs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched jobs:', data);
        setAllJobs(data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  // Sorting jobs so that the most recent jobs appear first
  const sortedJobs = allJobs.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  return (
    <div className="success-container">
      <h1 className="success-title">Job Posted Successfully!</h1>

      <div className="posted-jobs-container">
        <h2>All Posted Jobs:</h2>
        {sortedJobs.length === 0 ? (
          <p className="empty-state">No jobs posted yet.</p>
        ) : (
          sortedJobs.map((job, index) => (
            <div key={index} className="job-item">
              <p><strong>Job Title:</strong> {job.jobTitle}</p>
              <p><strong>Company:</strong> {job.company}</p>        
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Job Type:</strong> {job.jobtype}</p>
              <p><strong>CTC:</strong> {job.ctc}</p>
              <p><strong>Job Responsibility:</strong> {job.jobResponsibility}</p>
              <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
              <p><strong>Deadline:</strong>{job.deadline}</p>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SuccessPage;
