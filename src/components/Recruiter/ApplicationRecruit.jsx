import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function ApplicationRecruit() {
  const [studentAppliedJobs, setStudentAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [feedback, setFeedback] = useState(''); // Declare feedback state

  // Fetch student applications from the server
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

  // Handle Approve action
  const handleApprove = (jobId) => {
    fetch('http://localhost:3000/updateJobStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId, status: 'Approved' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentAppliedJobs(prevJobs =>
          prevJobs.map(job =>
            job.id === jobId ? { ...job, status: 'Approved' } : job
          )
        );
        setFilteredJobs(prevJobs =>
          prevJobs.map(job =>
            job.id === jobId ? { ...job, status: 'Approved' } : job
          )
        );
        setSelectedJob(null); // Close the popup
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
  };

  // Handle Decline action
  const handleDecline = (jobId) => {
    fetch('http://localhost:3000/updateJobStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jobId, status: 'Declined' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentAppliedJobs(prevJobs =>
          prevJobs.map(job =>
            job.id === jobId ? { ...job, status: 'Declined' } : job
          )
        );
        setFilteredJobs(prevJobs =>
          prevJobs.map(job =>
            job.id === jobId ? { ...job, status: 'Declined' } : job
          )
        );
        setSelectedJob(null); // Close the popup
      })
      .catch((error) => {
        console.error('Error updating status:', error);
      });
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
                    {job.status ? (
                      <span className={job.status === 'Approved' ? 'approved' : 'declined'}>
                        {job.status}
                      </span>
                    ) : (
                      <button className="view-button" onClick={() => setSelectedJob(job)}>
                        View
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
                <p><strong>Linkedin:</strong> <a href={selectedJob.studentlinkedin}>View Profile</a></p>
                <p><strong>Github:</strong> <a href={selectedJob.studentgithub}>View Profile</a></p>

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

                <label>Feedback:</label>
                <input
                  type="text"
                  placeholder="Enter feedback"
                  value={feedback} // Bind the feedback input to state
                  onChange={(e) => setFeedback(e.target.value)} // Update feedback state
                  required
                />

                <div className="popup-buttons">
                  <button className="decline-button" onClick={() => handleDecline(selectedJob.id)}>
                    Decline
                  </button>
                  <button className="approve-button" onClick={() => handleApprove(selectedJob.id)}>
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationRecruit;
