import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

// Job Application Component
const JobApplication = ({ job }) => {
  // Split skills by comma and join them to make a comma-separated string
  const skillsList = Array.isArray(job.skills) ? job.skills : job.skills.split(',');

  return (
    <div className="job-application-card">
      <div className="job-details-card">
        <h3>{job.company}</h3>
        <h4>{job.role}</h4>
        <p><strong>CTC:</strong> {job.ctc}</p>
        <p><strong>Deadline:</strong> {job.deadline}</p>
        <p><strong>Skills:</strong> {skillsList.join(', ')}</p>
        <p><strong>Description:</strong> {job.description}</p>
        {/* Pass the job id to the link */}
        <Link to={`/job/${job.id}`}><button>View</button></Link>
      </div>
    </div>
  );
};

// Job Application List Component
const Applications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job applications data from companyData.json
  useEffect(() => {
    const url = '/companyData.json'; // JSON file in the public folder
    fetch(url)
      .then(response => response.json()) // Fetch the JSON data
      .then(data => {
        setJobApplications(data); // Update state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if fetch fails
      });
  }, []);

  return (
    <div className="job-applications-list">
      <Sidebar />
      {loading ? (
        <div className="loading-indicator">Loading...</div>  // Loading indicator
      ) : (
        jobApplications.map((job) => (
          <JobApplication key={job.id} job={job} />
        ))
      )}
    </div>
  );
};

export default Applications;
