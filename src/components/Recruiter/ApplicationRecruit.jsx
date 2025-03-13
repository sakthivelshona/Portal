import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';
import { useNavigate } from 'react-router-dom';

function ApplicationRecruit() {
  const [studentAppliedJobs, setStudentAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [skillsFilter, setSkillsFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [jobStatus, setJobStatus] = useState({});
  
  // New state for the approval popup
  const [isApprovalPopupVisible, setIsApprovalPopupVisible] = useState(false);
  const [approvalFeedback, setApprovalFeedback] = useState('');
  const [approvedJobId, setApprovedJobId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/getStudentApplications')
      .then((response) => response.json())
      .then((data) => {
        const applications = data.applications || [];
        setStudentAppliedJobs(applications);
        setFilteredJobs(applications);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  }, []);

  useEffect(() => {
    const savedJobStatus = JSON.parse(localStorage.getItem('jobStatus'));
    if (savedJobStatus) {
      setJobStatus(savedJobStatus);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(jobStatus).length > 0) {
      localStorage.setItem('jobStatus', JSON.stringify(jobStatus));
    }
  }, [jobStatus]);

  const handleDecline = (job_id) => {
    if (feedback === '') {
      alert('Fill the Feedback form');
    } else {
      fetch('http://localhost:3000/feedbackSubmit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback,
          job_id: job_id,
          studentEmail: selectedJob.studentEmail,
          jobTitle: selectedJob.jobTitle,
          company: selectedJob.jobName,
          status: 'declined', // Send status for the decline
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert('Feedback submitted successfully!');
            setJobStatus((prevStatus) => ({
              ...prevStatus,
              [job_id]: 'declined',
            }));
            setSelectedJob(null);
          } else {
            alert('Error submitting feedback');
          }
        })
        .catch((error) => {
          console.error('Error submitting feedback:', error);
        });
    }
  };

  const handleApprove = (job_id) => {
    setApprovedJobId(job_id);
    setIsApprovalPopupVisible(true); // Show the approval popup after clicking "Approve"
  };
  
  const handleSendApprovalFeedback = () => {
    if (!selectedJob) {
      alert('No job selected. Please select a job to send approval feedback.');
      return;
    }
  
    if (approvalFeedback.trim() === '') {
      alert('Please provide feedback before submitting.');
      return;
    }
  
    fetch('http://localhost:3000/approveApplication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job_id: approvedJobId,
        instruction: approvalFeedback,
        studentEmail: selectedJob.studentEmail,
        jobTitle: selectedJob.jobTitle,
        company: selectedJob.jobName,
        status: 'approved',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Approval feedback sent successfully!');
  
          // Update jobStatus and filteredJobs to reflect the approved status
          setJobStatus((prevStatus) => ({
            ...prevStatus,
            [approvedJobId]: 'approved',
          }));
  
          // Update filteredJobs to reflect the status change
          setFilteredJobs((prevJobs) => prevJobs.map((job) => 
            job.job_id === approvedJobId ? { ...job, status: 'approved' } : job
          ));
  
          // Clear the selected job and hide the approval popup
          setSelectedJob(null);
          setIsApprovalPopupVisible(false);
          setApprovalFeedback('');
        } else {
          alert('Error sending approval feedback');
        }
      })
      .catch((error) => {
        console.error('Error sending approval feedback:', error);
      });
  };

  useEffect(() => {
    const filtered = studentAppliedJobs.filter((job) => {
      const matchesSkills = job.studentskills.toLowerCase().includes(skillsFilter.toLowerCase());
      const matchesRole = job.jobTitle.toLowerCase().includes(roleFilter.toLowerCase());
      return matchesSkills && matchesRole;
    });
    setFilteredJobs(filtered);
  }, [skillsFilter, roleFilter, studentAppliedJobs]);

  return (
    <div className="containers">
      <Sidebar />
      <div className="application-staff-container">
        <h1>Student Applied Jobs</h1>
        
        {/* Filter options */}
        <div className="filters">
          <input
            id="skillsFilter"
            type="text"
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
            placeholder=" 🔍 Search Skills"
          />
          <input
            id="roleFilter"
            type="text"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            placeholder="Search Role"
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
                <th>Role</th>
                <th>Resume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{job.studentName}</td>
                  <td>{job.studentEmail}</td>
                  <td>{job.studentskills}</td>
                  <td>{job.jobTitle}</td>
                  <td>
                    <a
                      href={
                        job.resume.startsWith('http')
                          ? job.resume
                          : `http://localhost:3000/uploads/${job.resume}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  </td>
                  <td>
                    {jobStatus[job.job_id] === 'approved' ? (
                      <span style={{ color: 'green', fontWeight: 'bold' }}>Accepted</span>
                    ) : jobStatus[job.job_id] === 'declined' ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>Rejected</span>
                    ) : (
                      <button
                        className="view-button"
                        onClick={() => setSelectedJob(job)}
                      >
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

        {/* Initial Pop-up for viewing job details */}
        {selectedJob && (
          <div className="popup-overlay">
            <div className="popup">
              <div className="popup-content">
                <button className="close-button" onClick={() => setSelectedJob(null)}>
                  ✕
                </button>
                <h1></h1>
                <p><strong>Name:</strong> {selectedJob.studentName}</p>
                <p><strong>Email:</strong> {selectedJob.studentEmail}</p>
                <p><strong>Skills:</strong> {selectedJob.studentskills}</p>
                <p><strong>Linkedin:</strong> <a href={selectedJob.studentlinkedin}>View Profile</a></p>
                <p><strong>Github:</strong> <a href={selectedJob.studentgithub}>View Profile</a></p>
                <p>
                  <strong>Resume: </strong>
                  <a
                    href={
                      selectedJob.resume.startsWith('http')
                        ? selectedJob.resume
                        : `http://localhost:3000/uploads/${selectedJob.resume}`
                    }
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
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                />

                <div className="popup-buttons">
                  <button className="decline-button" onClick={() => handleDecline(selectedJob.job_id)}>
                    Decline
                  </button>
                  <button className="approve-button" onClick={() => handleApprove(selectedJob.job_id)}>
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Approval Feedback Pop-up */}
        {isApprovalPopupVisible && (
          <div className="approval-popup-overlay">
            <div className="approval-popup">
              <button className="close-button" onClick={() => setIsApprovalPopupVisible(false)}>
                ✕
              </button>
              <div className="popup-content">
                <h4 style={{ marginTop: 0, marginBottom: '30px' }}>Approval Form</h4>
                <label>Add Instructions</label>
                <input
                  type="text"
                  placeholder="Next step"
                  value={approvalFeedback}
                  onChange={(e) => setApprovalFeedback(e.target.value)}
                />
                <div className="popup-buttons">
                  <button className="send-button" onClick={handleSendApprovalFeedback}>
                    Send
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
