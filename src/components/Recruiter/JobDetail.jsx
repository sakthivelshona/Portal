import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing

const JobDetail = () => {
  const { id } = useParams();  // Get the job ID from the URL
  const navigate = useNavigate();  // For programmatic navigation

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job details from Google Sheets (CSV format)
  useEffect(() => {
    setLoading(true);  // Set loading state to true while fetching

    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTxG7FQSEKwscYBm-2MFM70bi3qrMPg63cxjLyzQGer665mn3nHtkkym60Cx6oeRPrVaFSuHtrSZ-0R/pub?output=csv')
      .then(response => response.text())  // Fetch the raw CSV data
      .then(text => {
        // Use PapaParse to convert CSV to JSON
        Papa.parse(text, {
          header: true,  // Treat first row as header
          skipEmptyLines: true,  // Skip empty lines
          complete: (result) => {
            console.log('Parsed data:', result.data);
            // Find the job with the matching ID
            const jobDetails = result.data.find(job => job.id === id);
            if (jobDetails) {
              setJob(jobDetails);  // Set the found job to state
            } else {
              setError('Job not found');
            }
            setLoading(false);  // Set loading to false after fetching
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
            setError('Error fetching job details');
            setLoading(false);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching job details');
        setLoading(false);
      });
  }, [id]);  // Re-run the effect if the id in the URL changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="job-detail-page">
      <button onClick={() => navigate('/applications')}>Back</button>
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
