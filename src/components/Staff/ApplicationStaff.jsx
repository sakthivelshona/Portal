import React from 'react';
import Sidebar from './Sidebar';
import './Style.css'; // Import CSS for custom styles

function ApplicationStaff() {
  // Retrieve all student applied jobs from localStorage
  const studentAppliedJobs = JSON.parse(localStorage.getItem('studentAppliedJobs')) || [];

  // Function to delete a specific job
  const handleDelete = (index) => {
    let studentAppliedJobs = JSON.parse(localStorage.getItem('studentAppliedJobs')) || [];
    studentAppliedJobs.splice(index, 1);  // Remove the job at the specified index
    localStorage.setItem('studentAppliedJobs', JSON.stringify(studentAppliedJobs));  // Update localStorage
    window.location.reload();  // Reload the page to reflect the changes
  };

  // Function to delete all jobs
  const handleDeleteAll = () => {
    localStorage.removeItem('studentAppliedJobs');  // Clear all applied jobs from localStorage
    window.location.reload();  // Reload the page to reflect the changes
  };

  return (
    <>      
      <Sidebar />
      <div className="application-staff-container">
        <h3>Student Applied Jobs</h3>

        {studentAppliedJobs.length > 0 ? (
          studentAppliedJobs.map((job, index) => (
            <div key={index} className="job-container">
              <p><strong>Name:</strong> {job.studentName}</p>
              <p><strong>Email:</strong> {job.studentEmail}</p>
              <p><strong>Skills:</strong> {job.studentskills}</p>
              <p><strong>Company:</strong> {job.jobName}</p>
              <p><strong>Role:</strong> {job.jobTitle}</p>

              <button 
                className="delete-button-student-appli" 
                onClick={() => handleDelete(index)}
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
