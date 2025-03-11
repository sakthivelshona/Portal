import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Style.css';

const JobView = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      </div>
    </>
  );
};

export default JobView;
