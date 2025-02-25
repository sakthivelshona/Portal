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

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:3000/getjobs')
      .then(response => response.json())
      .then(data => {
        const jobDetails = data.find(job => job.job_id === Number(job_id));
        if (jobDetails) {
          setJob(jobDetails);
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
    formData.append('studentskills', studentData.skills);

    fetch('http://localhost:3000/applyJob', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Application submitted:', data);

        setResumeUrl(data.data.resume); // Set the resume URL state

        navigate('/application-success');
      })
      .catch((error) => {
        console.error('Error applying for job:', error);
        alert(`Error: ${error.message}`);
      });
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
        <h1>Apply</h1>
        <div className="job-info">
          <h3>{job.company} - {job.jobTitle}</h3>
          <p><strong>Description:</strong> {job.jobDescription}</p>
          <p><strong>Requirements:</strong> {job.jobRequirement}</p>
          <p><strong>Company Website:</strong> {job.website}</p>
          <p><strong>Skills:</strong> {job.skills}</p>
          <p><strong>CTC:</strong> {job.ctc}</p>
          <p><strong>Responsibilities:</strong> {job.jobResponsibility}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Deadline:</strong> {formatDate(job.deadline)}</p>
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

        <div className="file-ats">
          <button>ATS checker</button>
          <input type="text" />
        </div>

        {/* New "Download Report" Button */}
        <div className="download-report">
          <button className="download-report-button" >
            Download Report
          </button>
        </div>

        <div className="job-apply-student">
          <button onClick={handleApply}>Apply</button>
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