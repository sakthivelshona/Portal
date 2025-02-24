import React, { useEffect, useState } from 'react';
import './Style.css';
import Sidebar from './Sidebar';


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

        // Filter out jobs that are already deleted (based on localStorage)
        const deletedJobIds = JSON.parse(localStorage.getItem('deletedJobs')) || [];
        const filteredJobs = data.filter((job) => !deletedJobIds.includes(String(job.id)));

        setAllJobs(filteredJobs);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  // Sorting jobs so that the most recent jobs appear first
  const sortedJobs = allJobs.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  // Function to handle delete job (only removes from frontend and stores in deleted jobs list)
  const deleteJob = (jobId) => {
    if (jobId) {
      alert('Do you want to delete the posted job ?');
      const jobIdStr = String(jobId);  // Ensure jobId is a string for comparison with the backend

      console.log('Deleting job with ID:', jobIdStr);  // Log the ID to ensure correct value

      // Send the job data to a 'deleted jobs' database (simulating here with a POST request)
      const jobToDelete = allJobs.find((job) => String(job.id) === jobIdStr);

      if (jobToDelete) {
        fetch('http://localhost:3000/deletedjobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobToDelete),  // Send the job details to the deleted jobs DB
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to store job in deleted jobs DB');
            }
            console.log('Job details moved to deleted jobs DB');
          })
          .catch((error) => {
            console.error('Error storing job in deleted jobs DB:', error);
          });

        // Store deleted job ID in localStorage to persist deletion across page reloads
        const deletedJobIds = JSON.parse(localStorage.getItem('deletedJobs')) || [];
        if (!deletedJobIds.includes(jobIdStr)) {
          deletedJobIds.push(jobIdStr);
          localStorage.setItem('deletedJobs', JSON.stringify(deletedJobIds));
        }

        // Remove the job from the frontend
        setAllJobs(allJobs.filter((job) => String(job.id) !== jobIdStr));
        console.log('Job removed from frontend');
      }
    } else {
      console.error('Job ID is undefined');
    }
  };

  return (
    <>      <Sidebar />

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
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>CTC:</strong> {job.ctc}</p>
                <p><strong>Job Responsibility:</strong> {job.jobResponsibility}</p>
                <p><strong>Job Description:</strong> {job.jobDescription}</p>
                <p><strong>Skills:</strong> {job.skills.join(', ')}</p>
                <p><strong>Deadline:</strong> {job.deadline}</p>

                <button onClick={() => deleteJob(job.id)} className="delete-btn">
                  Delete Job
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ReceivedJobs;
