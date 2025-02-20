import React, { useEffect, useState } from 'react';
import './Style.css';

function ReceivedJobs() {
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

  // Function to handle delete job
  const deleteJob = (jobId) => {
    // Ensure jobId is not undefined before calling the delete request
    if (jobId) {
      fetch(`http://localhost:3000/deletejob/${jobId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete job');
          }
          // Remove the job from the state after deletion
          setAllJobs(allJobs.filter((job) => job.id !== jobId));
          console.log('Job deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting job:', error);
        });
    } else {
      console.error('Job ID is undefined');
    }
  };

  return (
    <div className="success-container">
      <div className="posted-jobs-container">
        <h2>All Posted Jobs:</h2>
        {sortedJobs.length === 0 ? (
          <p className="empty-state">No jobs posted yet.</p>
        ) : (
          sortedJobs.map((job) => (
            <div key={job.id} className="job-item">
              <p><strong>Job Title:</strong> {job.jobTitle}</p>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.workplaceType}</p>
              <p><strong>Job Type:</strong> {job.jobType}</p>
              <p><strong>CTC:</strong> {job.ctc}</p>
              <p><strong>Job Responsibility:</strong> {job.jobResponsibility}</p>
              <p><strong>Job Benefit:</strong> {job.jobBenefit}</p>
              <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
              <button onClick={() => deleteJob(job.id)} className="delete-btn">
                Delete Job
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReceivedJobs;
