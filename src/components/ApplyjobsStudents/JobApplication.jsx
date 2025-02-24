import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Student/Sidebar';

// Job Application Component
const JobApplication = ({ job }) => {
  // Split skills by comma and join them to make a comma-separated string
  const skillsList = Array.isArray(job.skills) ? job.skills : job.skills.split(',');
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');  // Day: Add leading zero if single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Month: Add leading zero if single digit
    const year = date.getFullYear();  // Year (4 digits)
    
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="job-application-card">
      <div className="job-details-card">
        <h3>{job.company}</h3>
        <h4>{job.jobTitle}</h4>
        <p><strong>Description:</strong> {job.jobDescription}</p>
        <p><strong>Location:</strong> {job.jobType}</p>
        <p><strong>CTC:</strong> {job.ctc}</p>
        <p><strong>Skills:</strong> {skillsList.join(', ')}</p>
        <p><strong>Deadline:</strong> {formatDate(job.deadline)}</p>      


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
    jobTitle: '',
    skill: '',
    location: ''
  });

  // Fetch job applications data from companyData.json
  useEffect(() => {
    //const url = '/companyData.json'; // JSON file in the public folder
    fetch('http://localhost:3000/getjobs')
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

  // Add logic to re-fetch job data after a job has been posted
const refetchJobs = () => {
  fetch('http://localhost:3000/getjobs')
    .then(response => response.json())
    .then(data => {
      setJobApplications(data);
      setFilteredJobs(data);
    })
    .catch(error => console.error('Error refetching jobs:', error));
};



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
  
    if (filters.jobTitle) {
      filtered = filtered.filter(job => 
        job.jobTitle?.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }
  
    if (filters.skill) {
      filtered = filtered.filter(job => {
        const skills = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '';
        return skills.toLowerCase().includes(filters.skill.toLowerCase());
      });
    }
  
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
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
          name="jobTitle"
          placeholder="Filter by Role"
          value={filters.jobTitle}
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
