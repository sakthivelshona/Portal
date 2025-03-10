import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaCalendarAlt } from 'react-icons/fa'; // Calendar icon
import { IoLocationSharp } from "react-icons/io5";
import './Style.css';

// Job Application Component
const ReceivedJobs = ({ job, deleteJob }) => {
  const skillsList = Array.isArray(job.skills) ? job.skills : job.skills.split(',');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="job-details-card">
      <div className="job-card">
        <h2>{job.company} - {job.jobTitle}</h2>
        <p className='rupee'> <strong>₹ {job.ctc}</strong></p>
        <p> <IoLocationSharp /> {job.location}</p>

        <div className="skills-deadline">
          <div className="skills">
            {skillsList.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
          <div className="deadline">
            <FaCalendarAlt className="calendar-icon-new" />
            <p>Deadline: </p>
            <span>{formatDate(job.deadline)}</span>
          </div>
        </div>
        <p><strong>Description:</strong> {job.jobDescription}</p>
        <button onClick={() => deleteJob(job.id)} className="delete-btn">
          Delete Job
        </button>
      </div>
    </div>
  );
};

// Job Application List Component
const Applications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ jobTitle: '', skill: '', location: '' });

  useEffect(() => {
    fetch('http://localhost:3000/getjobs')
      .then(response => response.json())
      .then(data => {
        setJobApplications(data);
        setFilteredJobs(data); // Initialize filteredJobs with all job data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [name]: value };
      applyFilters(updatedFilters); // Apply filters when any filter changes
      return updatedFilters;
    });
  };

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

    setFilteredJobs(filtered); // Set the filtered jobs
  };

  // Function to handle delete job (only removes from frontend and stores in deleted jobs list)
  const deleteJob = (jobId) => {
    if (jobId) {
      alert('Do you want to delete the posted job?');
      const jobIdStr = String(jobId);  // Ensure jobId is a string for comparison with the backend

      console.log('Deleting job with ID:', jobIdStr);

      // Send the job data to a 'deleted jobs' database (simulating here with a POST request)
      const jobToDelete = jobApplications.find((job) => String(job.id) === jobIdStr);

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
        setJobApplications(jobApplications.filter((job) => String(job.id) !== jobIdStr));
        console.log('Job removed from frontend');
      }
    } else {
      console.error('Job ID is undefined');
    }
  };

  return (
    <div className="containers">
      <Sidebar />
      <div className="whole-job-des">
        <h1>Jobs</h1>
        <div className="content-wrapper">
          {/* Job Application Cards */}
          <div className="job-cards">
            {loading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              filteredJobs.length === 0 ? (
                <h4>No jobs available</h4>
              ) : (
                filteredJobs.map((job) => (
                  <ReceivedJobs key={job.id} job={job} deleteJob={deleteJob} />
                ))
              )
            )}
          </div>

          {/* Filters Section */}
          <div className="filters-app">
            <h2>Filters</h2>

            <h4>Positions</h4>
            <input
              type="text"
              name="jobTitle"
              placeholder="Filter by Role"
              value={filters.jobTitle}
              onChange={handleFilterChange}
            />

            <h4>Skills</h4>
            <input
              type="text"
              name="skill"
              placeholder="Filter by Skill"
              value={filters.skill}
              onChange={handleFilterChange}
            />

            <h4>Location</h4>
            <input
              type="text"
              name="location"
              placeholder="Filter by Location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
