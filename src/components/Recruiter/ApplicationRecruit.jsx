import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';

function ApplicationRecruit() {
  const [studentAppliedJobs, setStudentAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

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
    const filtered = studentAppliedJobs.filter((job) =>
      job.studentskills.toLowerCase().includes(skillsFilter.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [skillsFilter, studentAppliedJobs]);

  const handleDelete = (job_id) => {
    if (!job_id) {
      console.error('No job_id provided');
      return;
    }
    const updatedJobs = filteredJobs.filter(job => job.job_id !== job_id);
    setFilteredJobs(updatedJobs);
    alert(`Job with id ${job_id} is deleted`);
    fetch(`http://localhost:3000/deleteApplication/${job_id}`, { method: 'DELETE' })
      .catch(error => console.error('Error deleting application:', error));
  };

  return (
    <>
      <Sidebar />
      <div className="recruiter-application-container">
        <h3>Student Applied Jobs</h3>
        <div className="skills-filter">
          <label htmlFor="skillsFilter">Filter by Skills:</label>
          <input
            type="text"
            id="skillsFilter"
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
            placeholder="Search by Skills"
          />
        </div>
        {filteredJobs.length > 0 ? (
          <table className="jobs-table">
            <thead>
              <tr>
              <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Resume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={index}>
                    <td>{index + 1}</td> {/* Serial Number */}
                  <td>{job.studentName}</td>
                  <td>{job.studentEmail}</td>
                  <td>{job.studentskills}</td>
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
                    <button className="view-button" onClick={() => setSelectedJob(job)}> Status </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="data-available">
            <p>No student data available</p>
          </div>
        )}

        {selectedJob && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-content">
                <h4></h4>
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
                <label>Feedback:</label>
                <input type="text" placeholder="Enter feedback" required/>
                <div className="popup-buttons">
                  <button className="decline-button">Decline</button>
                  <button className="approve-button">Approve</button>
                  <button className="close-button" onClick={() => setSelectedJob(null)}>✕</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ApplicationRecruit;