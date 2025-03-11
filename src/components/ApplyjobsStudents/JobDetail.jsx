import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Student/Sidebar';
import './Style.css';
import studentData from './profileData.json';

const JobDetail = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState(null); // New state variable for resume URL
  const [atsChecked, setAtsChecked] = useState(false); // State for ATS button click
  const [isApplied, setIsApplied] = useState(false); // State to track if the job has been applied for

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/getjobs')
      .then(response => response.json())
      .then(data => {
        const jobDetails = data.find(job => job.job_id === Number(job_id));
        if (jobDetails) {
          setJob(jobDetails);
          // Check if this job is already applied (You can check this condition based on your application's logic)
          // For now, we assume it's saved in localStorage as an example.
          const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
          if (appliedJobs.includes(job_id)) {
            setIsApplied(true);
          }
        } else {
          setError('Job not found');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching job details');
        setLoading(false);
      });
  }, [job_id]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleApply = () => {
    if (!file) {
      alert('Please upload your resume before applying!');
      return;
    }

    const formData = new FormData();
    formData.append('jobTitle', job.jobTitle);
    formData.append('jobName', job.company);
    formData.append('job_id', job.job_id);
    formData.append('resume', file);
    formData.append('studentName', studentData.name);
    formData.append('studentEmail', studentData.email);
    formData.append('studentlinkedin', studentData.linkedin);
    formData.append('studentgithub', studentData.github);
    formData.append('studentskills', studentData.skills);

    fetch('http://localhost:3000/applyJob', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Application submitted:', data);
        
        setResumeUrl(data.data.resume); // Set the resume URL state
        
        // Mark the job as applied
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
        appliedJobs.push(job_id);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));

        setIsApplied(true); // Update state to reflect that the job has been applied for
        navigate('/application-success');
      })
      .catch((error) => {
        console.error('Error applying for job:', error);
        alert(`Error: ${error.message}`);
      });
  };

  const handleAtsCheck = () => {
    setAtsChecked(!atsChecked); // Toggle ATS check
  };

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Sidebar />
      <div className="job-detail-page">
        {/* Back Arrow Button */}
        <button className="back-arrow-button" onClick={() => navigate(-1)}>   ᐸ <span>Back to Jobs</span></button>

        <h2>{job.company} - {job.jobTitle}</h2>

        <p className="ctc"> ₹{job.ctc}</p>
        <p className="company-website">
          <i>
            <a href={job.website} target="_blank" rel="noopener noreferrer">
              {job.website}
            </a>
          </i>
        </p>

        <div className="skills">
          {Array.isArray(job.skills)
            ? job.skills.map((skill, index) => (
              <span key={index} className="skill">{skill}</span>
            ))
            : job.skills
              .split(',')
              .map((skill, index) => (
                <span key={index} className="skill">{skill.trim()}</span>
              ))}
        </div>

        <div className="job-details">
          <h4><strong>Job Description</strong></h4>
          <p>{job.jobDescription}</p>
          <h4><strong>Job Type:</strong><span className='new-detail'>{job.jobtype}</span></h4>

          <h4><strong>Job Requirements</strong> </h4>
          <ul>
            {job.jobRequirement.split('.').map((sentence, index) =>
              sentence.trim() ? (
                <li key={index}>{sentence.trim()}.</li>
              ) : null
            )}
          </ul>
          <h4><strong>Job Responsibilities</strong> </h4>
          <p>{job.jobResponsibility}</p>
          <h4><strong>Location:</strong><span className='new-detail'>{job.location}</span></h4>
          <h4><strong>Deadline:</strong><span className='new-detail'> {formatDate(job.deadline)}</span></h4>
        </div>

        <h4>Upload your Resume</h4>
        <div
          className="file-upload"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-input').click()}
        >
          <p>{file ? `File Selected: ${file.name}` : 'Drag and drop your file here or click to select'}</p>
        </div>
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          className="file-input"
        />

        <div className="ats-section">
          <button className="ats-button" onClick={handleAtsCheck}>Check ATS Score</button>
        </div>

        {/* Display only if ATS Score is checked */}
        {atsChecked && (
          <>
            <textarea className="ats-textarea" placeholder="ATS Score here"></textarea>
            <button className="generate-report-button">Generate Report</button>
          </>
        )}

        <div className="job-apply-student">
          {/* Apply button or "Applied" message */}
          {isApplied ? (
            <span className="applied-message">You have already applied for this job.</span>
          ) : (
            <button onClick={handleApply}>Apply</button>
          )}
        </div>

        {/* Conditionally render the resume URL */}
        {resumeUrl && (
          <div className="resume-url">
            <p>Resume URL: <a href={resumeUrl} target="_blank" rel="noopener noreferrer">{resumeUrl}</a></p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobDetail;
