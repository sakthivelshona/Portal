import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function ApplicationStaff() {
  const [studentAppliedJobs, setStudentAppliedJobs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/getStudentApplications')
      .then((response) => response.json())
      .then((data) => {
        setStudentAppliedJobs(data.applications || []);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);


  const handleDelete = (job_id) => {
    console.log('Job ID to delete:', job_id); // Debugging line
  
    if (!job_id) {
      console.error('No job_id provided');
      return;
    }
  
    // Optimistically remove the job from the UI
    const updatedJobs = studentAppliedJobs.filter(job => job.job_id !== job_id);
    setStudentAppliedJobs(updatedJobs);
  
    // Show alert immediately, after optimistic update
    alert(`Job with id ${job_id} is deleted`);
  
    // Send the delete request to the server
    fetch(`http://localhost:3000/deleteApplication/${job_id}`, { method: 'DELETE' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error deleting application on server');
        }
        return response.json();
      })
      .then(data => {
        console.log('Successfully deleted on server:', data);
        // Optionally handle success data here if needed
      })
      .catch(error => {
        console.error('Error deleting application:', error);
        // Revert the optimistic UI update in case of an error
        // You can re-fetch the data or restore the deleted job in UI
        // For example, you might call a function to re-fetch data here:
        // fetchApplications(); 
      });
  };
  

  return (
    <>
      <Sidebar />
      <div className="recruiter-application-container">
        <h3>Student Applied Jobs</h3>
        {studentAppliedJobs.length > 0 ? (
          studentAppliedJobs.map((job, index) => (
            <div key={index} className="job-container">
              <p><strong>Name:</strong> {job.studentName}</p>
              <p><strong>Email:</strong> {job.studentEmail}</p>
              <p><strong>Skills:</strong> {job.studentskills}</p>
              <p><strong>Company:</strong> {job.jobName}</p>
              <p><strong>Role:</strong> {job.jobTitle}</p>
              <p><strong>Timestamp:</strong> {job.timestamp}</p>
              <p><strong>Job Id:</strong> {job.job_id}</p>

              <p><strong>Resume URL:</strong>
                <a href={job.resume.startsWith('http') ? job.resume : `http://localhost:3000/uploads/${job.resume}`}
                  target="_blank"
                  rel="noopener noreferrer">
                  {job.resume}
                </a>
              </p>
              <button
                className="recruiter-application-delete"
                onClick={() => handleDelete(job.job_id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No student data available.</p>
        )}
      </div>
    </>
  );
}

export default ApplicationStaff;
