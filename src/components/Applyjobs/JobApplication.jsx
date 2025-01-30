import React, { useState } from 'react';
import '../Student/Style.css'; // Importing the CSS file for styling
import Sidebar from '../Student/Sidebar'; // Import Sidebar component
import { Link } from 'react-router-dom'; // Import Link for routing

function JobApplication() {

  const jobs = [
    {
      company: 'XYZ Corp',
      location: 'New York',
      role: 'Software Engineer',
      ctc: '$120,000',
      skills: ['JavaScript', 'React', 'Node.js'],
      description: 'We are looking for a software engineer with a strong foundation in JavaScript and React.',
      deadline: '31st Dec 2025',
      applyLink: 'https://example.com',
    },
    {
      company: 'ABC Tech',
      location: 'San Francisco',
      role: 'Data Scientist',
      ctc: '$130,000',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      description: 'Join our team to work on cutting-edge AI models and machine learning algorithms.',
      deadline: '15th Jan 2025',
      applyLink: 'https://example.com',
    },
    {
      company: 'XYZ Corp',
      location: 'New York',
      role: 'Software Engineer',
      ctc: '$120,000',
      skills: ['JavaScript', 'React', 'Node.js'],
      description: 'We are looking for a software engineer with a strong foundation in JavaScript and React.',
      deadline: '31st Dec 2025',
      applyLink: 'https://example.com',
    },
    {
      company: 'Innovate Solutions',
      location: 'Chicago',
      role: 'UI/UX Designer',
      ctc: '$100,000',
      skills: ['Figma', 'UI Design', 'User Research'],
      description: 'We need a creative UI/UX designer who can create intuitive and beautiful user interfaces.',
      deadline: '28th Feb 2025',
      applyLink: 'https://example.com',
    },
    {
      company: 'ABC Tech',
      location: 'San Francisco',
      role: 'Data Scientist',
      ctc: '$130,000',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      description: 'Join our team to work on cutting-edge AI models and machine learning algorithms.',
      deadline: '15th Jan 2025',
      applyLink: 'https://example.com',
    },
  ];

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [roleSearch, setRoleSearch] = useState('');
  const [skillsSearch, setSkillsSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // Function to handle Apply button click
  const handleApplyClick = (job) => {
    console.log(`Applied for ${job.role} at ${job.company}`);
    window.open(job.applyLink, '_blank');
  };

  // Function to handle Reject button click
  // const handleRejectClick = (job) => {
  //   console.log(`Rejected the ${job.role} role at ${job.company}`);
  // };

  // Search logic
  const handleSearch = () => {
    setFilteredJobs(
      jobs.filter(
        (job) =>
          job.role.toLowerCase().includes(roleSearch.toLowerCase()) &&
          job.skills.some((skill) =>
            skill.toLowerCase().includes(skillsSearch.toLowerCase())
          ) &&
          job.location.toLowerCase().includes(locationSearch.toLowerCase())
      )
    );
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="new-job-updates">
          <h1>Jobs</h1>
          <div className="applyjobs-container">
            <div className="job-box-container">
              <div className="links-container">
                <p><Link to="/applyjobs">All</Link></p>
                <p><Link to="/appliedjobs">Applied</Link></p>
                <p><Link to="/rejectedjobs">Rejected</Link></p>
              </div>
              {filteredJobs.map((job, index) => (
                <div className="job-box" key={index}>
                  <div className="job-header">
                    <h3>{job.company} - {job.role}</h3>
                    <p>{job.location}</p>
                  </div>
                  <div className="job-details">
                    <p className="ctc">CTC: {job.ctc}</p>
                    <div className="skills-container">
                      {job.skills.map((skill, idx) => (
                        <span key={idx} className="skill">{skill}</span>
                      ))}
                    </div>
                    <p className="description">{job.description}</p>
                    <p className="deadline">Deadline: {job.deadline}</p>
                    <div className="job-actions">
                      <button className="btn apply-btn"onClick={() => handleApplyClick(job)}>View job brochure</button>
                      {/* <button className="btn apply-btn"onClick={() => handleRejectClick(job)}>Apply</button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="filter-box">
              <h1>Filters</h1>
              <div className="filter-section">
                <h3>Role</h3>
                <input
                  type="text"
                  placeholder="Search by Role"
                  value={roleSearch}
                  onChange={(e) => setRoleSearch(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
              <div className="filter-section">
                <h3>Skills</h3>
                <input
                  type="text"
                  placeholder="Search by Skills"
                  value={skillsSearch}
                  onChange={(e) => setSkillsSearch(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
              <div className="filter-section">
                <h3>Location</h3>
                <input
                  type="text"
                  placeholder="Search by Location"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  onKeyUp={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobApplication;
