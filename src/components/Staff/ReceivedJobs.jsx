import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function ReceivedJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [filters, setFilters] = useState({ jobTitle: '', skill: '', location: '' });
  const [filteredJobs, setFilteredJobs] = useState([]);
  
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
        setFilteredJobs(filteredJobs); // Initialize filteredJobs with all job data
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
      });
  }, []);

  // Function to handle filters
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, [name]: value };
      applyFilters(updatedFilters); // Apply filters when any filter changes
      return updatedFilters;
    });
  };

  // Apply filters to the jobs list
  const applyFilters = (filters) => {
    let filtered = allJobs;

    if (filters.jobTitle) {
      filtered = filtered.filter((job) =>
        job.jobTitle?.toLowerCase().includes(filters.jobTitle.toLowerCase())
      );
    }

    if (filters.skill) {
      filtered = filtered.filter((job) => {
        const skills = Array.isArray(job.skills) ? job.skills.join(', ') : job.skills || '';
        return skills.toLowerCase().includes(filters.skill.toLowerCase());
      });
    }

    if (filters.location) {
      filtered = filtered.filter((job) =>
        job.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredJobs(filtered); // Set the filtered jobs
  };

  // Sorting jobs so that the most recent jobs appear first
  const sortedJobs = filteredJobs.sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

  // Function to handle delete job (only removes from frontend and stores in deleted jobs list)
  const deleteJob = (jobId) => {
    if (jobId) {
      alert('Do you want to delete the posted job ?');
      const jobIdStr = String(jobId); // Ensure jobId is a string for comparison with the backend

      console.log('Deleting job with ID:', jobIdStr); // Log the ID to ensure correct value

      // Send the job data to a 'deleted jobs' database (simulating here with a POST request)
      const jobToDelete = allJobs.find((job) => String(job.id) === jobIdStr);

      if (jobToDelete) {
        fetch('http://localhost:3000/deletedjobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jobToDelete), // Send the job details to the deleted jobs DB
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

  // Date Format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Day: Add leading zero if single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month: Add leading zero if single digit
    const year = date.getFullYear(); // Year (4 digits)

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="containers">
      <Sidebar />
      <div className="job-container">
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
                <p><strong>Deadline:</strong> {formatDate(job.deadline)}</p>

                <button onClick={() => deleteJob(job.id)} className="delete-btn">
                  Delete Job
                </button>
              </div>
            ))
          )}
        </div>

        {/* Filters Section */}
        <div className="filters-container">
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
}

export default ReceivedJobs;
