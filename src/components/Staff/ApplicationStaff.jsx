import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function ApplicationStaff() {
  const [studentAppliedJobs, setStudentAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/getStudentApplications')
      .then((response) => response.json())
      .then((data) => {
        setStudentAppliedJobs(data.applications || []);
        setFilteredJobs(data.applications || []); // Initialize filteredJobs
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  useEffect(() => {
    // Filter jobs based on skillsFilter and roleFilter
    const filtered = studentAppliedJobs.filter((job) => {
      const matchesSkills = skillsFilter ? job.studentskills.toLowerCase().includes(skillsFilter.toLowerCase()) : true;
      const matchesRole = roleFilter ? job.jobTitle.toLowerCase().includes(roleFilter.toLowerCase()) : true;
      return matchesSkills && matchesRole;
    });
    setFilteredJobs(filtered);
  }, [skillsFilter, roleFilter, studentAppliedJobs]);

  const handleDelete = (job_id) => {
    console.log('Job ID to delete:', job_id); // Debugging line
    if (!job_id) {
      console.error('No job_id provided');
      return;
    }

    // Optimistically remove the job from the UI
    const updatedJobs = filteredJobs.filter(job => job.job_id !== job_id);
    setFilteredJobs(updatedJobs);

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
        // For example, you might call a function to re-fetch data here: 
        // fetchApplications();
      });
  };

  return (
    <>
      <Sidebar />
      <div className="application-staff-container">
        <h3>Student Applied Jobs</h3>

        {/* Filter options */}
        <div className="filters">
          <div>
            <label htmlFor="skillsFilter">Filter by Skills:</label>
            <input
              id="skillsFilter"
              type="text"
              value={skillsFilter}
              onChange={(e) => setSkillsFilter(e.target.value)}
              placeholder="Search Skills"
            />
          </div>
          <div>
            <label htmlFor="roleFilter">Filter by Role:</label>
            <input
              id="roleFilter"
              type="text"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              placeholder="Search Role"
            />
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => (
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
              <div className="feedback">
              <p><strong>Feedback : </strong> </p>

                <input type="text" />
                <button className="recruiter-application-delete" onClick={() => handleDelete(job.job_id)}>
                  Delete
                </button>
              </div>
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
