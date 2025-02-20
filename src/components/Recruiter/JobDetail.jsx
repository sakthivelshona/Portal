import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Style.css';  // Ensure the CSS is imported

const JobDetail = () => {
  const { id } = useParams();  // Get the job ID from the URL

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details from companyData.json
  useEffect(() => {
    setLoading(true);  // Set loading state to true while fetching

    const url = '/companyData.json'; // JSON file in the public folder
    fetch(url)
      .then(response => response.json()) // Fetch the JSON data
      .then(data => {
        // Ensure type consistency between URL id and data id
        const jobDetails = data.find(job => job.id === Number(id));  // Convert id to number for comparison
        if (jobDetails) {
          setJob(jobDetails);  // Set the found job to state
        } else {
          setError('Job not found');
        }
        setLoading(false);  // Set loading to false after fetching
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching job details');
        setLoading(false);
      });
  }, [id]);  // Re-run the effect if the id in the URL changes

  if (loading) {
    return <div className="loading-indicator">Loading...</div>;  // Loading indicator
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="job-detail-page">
      <h3>{job.company} - {job.role}</h3>
      <p><strong>CTC:</strong> {job.ctc}</p>
      <p><strong>Deadline:</strong> {job.deadline}</p>
      <p><strong>Skills:</strong> {job.skills}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong> {job.requirements}</p>
      <p><strong>Benefits:</strong> {job.benefits}</p>
      <p><strong>About:</strong> {job.about}</p>
    </div>
  );
};

export default JobDetail;
