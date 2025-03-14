import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function ApplicationStaff() {
  const [studentAppliedJobs, setStudentAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); // For pop-up
  const [feedbackStaff, setFeedbackStaff] = useState(''); // Declare feedback state
  const [jobStatus, setJobStatus] = useState({}); // Store status for jobs

  // Load job status from localStorage when the component is mounted
  useEffect(() => {
    const savedJobStatus = JSON.parse(localStorage.getItem('jobStatus')) || {};
    setJobStatus(savedJobStatus);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/getStudentApplications')
      .then((response) => response.json())
      .then((data) => {
        setStudentAppliedJobs(data.applications || []);
        setFilteredJobs(data.applications || []);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = studentAppliedJobs.filter((job) => {
      const matchesSkills = skillsFilter ? job.studentskills.toLowerCase().includes(skillsFilter.toLowerCase()) : true;
      const matchesRole = roleFilter ? job.jobTitle.toLowerCase().includes(roleFilter.toLowerCase()) : true;
      return matchesSkills && matchesRole;
    });
    setFilteredJobs(filtered);
  }, [skillsFilter, roleFilter, studentAppliedJobs]);

  // Handle Decline action
  const handleDecline = (job_id) => {
    if (feedbackStaff === '') {
      alert('Fill the Feedback form');
    } else {
      // Sending feedback to backend
      fetch('http://localhost:3000/feedbackSubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackStaff: feedbackStaff,
          job_id: job_id,
          studentEmail: selectedJob.studentEmail,
          status: 'declined',
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Feedback submitted successfully!');
            // Update job status in state
            const updatedStatus = { ...jobStatus, [job_id]: 'declined' };
            setJobStatus(updatedStatus);

            // Save updated status to localStorage
            localStorage.setItem('jobStatus', JSON.stringify(updatedStatus));

            setSelectedJob(null); // Close the popup
          } else {
            alert('Error submitting feedback');
          }
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
        });
    }
  };

  return (
    <div className='containers'>
      <Sidebar />
      <div className="application-staff-container">
        <h1>Student Applied Jobs</h1>
        {/* Filter options */}
        <div className="filters">
          <div>
            <input
              id="skillsFilter"
              type="text"
              value={skillsFilter}
              onChange={(e) => setSkillsFilter(e.target.value)}
              placeholder=" 🔍 Search Skills"
            />
          </div>
          <div>
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
          <table className="jobs-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Company</th>
                <th>Role</th>
                <th>Resume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={index}>
                  <td>{index + 1}</td> {/* Serial Number */}
                  <td>{job.studentName}</td>
                  <td>{job.studentEmail}</td>
                  <td>{job.studentskills}</td>
                  <td>{job.jobName}</td>
                  <td>{job.jobTitle}</td>

                  <td>
                    <a
                      href={job.resume.startsWith("http") ? job.resume : `http://localhost:3000/uploads/${job.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>

                  <td>
                    {/* Status displayed here */}
                    {jobStatus[job.job_id] === 'declined' ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>
                    ) : (
                      <button className="view-button" onClick={() => setSelectedJob(job)}>
                        Incomplete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No student data available.</p>
        )}

        {/* Pop-up for viewing full details */}
        {selectedJob && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-content">
                <h4></h4>
                <button className="close-button" onClick={() => setSelectedJob(null)}>✕</button>
                <p><strong>Name:</strong> {selectedJob.studentName}</p>
                <p><strong>Email:</strong> {selectedJob.studentEmail}</p>
                <p><strong>Skills:</strong> {selectedJob.studentskills}</p>
                <p>
                  <strong>Resume: </strong>
                  <a
                    href={selectedJob.resume.startsWith("http") ? selectedJob.resume : `http://localhost:3000/uploads/${selectedJob.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Resume
                  </a>
                </p>
                <p><strong>Status:</strong> 
                  {jobStatus[selectedJob.job_id] === 'declined' ? (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>
                  ) : (
                    'Incomplete'
                  )}
                </p>

                <label>Feedback:</label>
                <input type="text" placeholder="Enter feedback" 
                value={feedbackStaff} 
                onChange={(e) => setFeedbackStaff(e.target.value)} // Update feedback state
                required />

                <div className="popup-buttons">
                  <button className="decline-button" onClick={() => handleDecline(selectedJob.job_id)} >Decline</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationStaff;
