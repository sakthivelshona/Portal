import React, { useEffect, useState } from 'react';
import './Style.css';
import { IoLocationSharp } from 'react-icons/io5'; // Location icon
import { FaCalendarAlt } from 'react-icons/fa'; // Calendar icon
import { Link } from 'react-router-dom';


function HomeApplications() {
  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  // Function to format the date (you can customize this format as needed)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter jobs based on search term
  const filteredJobs = sortedJobs.filter((job) => {
    return job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (

    <div className="success-container">
      <h3 style={{ textAlign: 'left' }}>Active Posted Jobs</h3>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Job Title"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredJobs.length === 0 ? (
        <p className="empty-state">No jobs posted yet.</p>
      ) : (
        filteredJobs.map((job, index) => (
          <div key={index} className="job-details-card">
            <div className="job-card">
              <h2>{job.company} - {job.jobTitle}</h2>
              <p className="rupee"><strong>₹ {job.ctc}</strong></p>
              <p><IoLocationSharp />{job.location}</p>

              <div className="skills-deadline">
                <div className="skills">
                  {job.skills && job.skills.map((skill, index) => (
                    <span key={index} className="skill-item">{skill}</span>
                  ))}
                </div>
                <div className="deadline">
                  <FaCalendarAlt className="calendar-icon-new" />
                  <p>Deadline:</p>
                  <span>{formatDate(job.deadline)}</span>
                </div>
              </div>

              <p><strong>Description:</strong> {job.jobDescription}</p>
              <div className="other-jobs-btns">
                {/* Passing job details to the Edit Job page */}
                <Link to="/edit-job" state={{ job: job }}><button> Edit</button> </Link>
                
                {/* Delete button */}
                <button className='job-dele'onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HomeApplications;
