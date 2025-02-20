import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Student/Sidebar';

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
        <p><strong>Location:</strong> {job.location}</p>
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
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    role: '',
    skill: '',
    location: ''
  });

  // Fetch job applications data from companyData.json
  useEffect(() => {
    const url = '/companyData.json'; // JSON file in the public folder
    fetch(url)
      .then(response => response.json()) // Fetch the JSON data
      .then(data => {
        setJobApplications(data); // Update state with the fetched data
        setFilteredJobs(data); // Initially, show all jobs
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if fetch fails
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [name]: value };
      applyFilters(updatedFilters);
      return updatedFilters;
    });
  };

  // Apply filters to job applications
const applyFilters = (filters) => {
  let filtered = jobApplications;

  if (filters.role) {
    filtered = filtered.filter(job => job.role.toLowerCase().includes(filters.role.toLowerCase()));
  }

  if (filters.skill) {
    filtered = filtered.filter(job => {
      // Ensure job.skills is treated as a string (join array if necessary)
      const skills = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills;
      return skills.toLowerCase().includes(filters.skill.toLowerCase());
    });
  }

  if (filters.location) {
    filtered = filtered.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
  }

  setFilteredJobs(filtered);
};


  return (
    <div className="job-applications-list">
      <Sidebar />
      
      {/* Filters Section */}
      <div className="filters">
        <label htmlFor="">Search by filter</label>
        <input
          type="text"
          name="role"
          placeholder="Filter by Role"
          value={filters.role}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="skill"
          placeholder="Filter by Skill"
          value={filters.skill}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
      </div>

      {loading ? (
        <div className="loading-indicator">Loading...</div>  // Loading indicator
      ) : (
        filteredJobs.map((job) => (
          <JobApplication key={job.id} job={job} />
        ))
      )}
    </div>
  );
};

export default Applications;
