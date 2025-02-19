import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse

// Job Application Component
const JobApplication = ({ job }) => {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="job-application">
      {showDetails ? (
        <div className="job-details">
          <h3>{job.company}</h3>
          <h4>{job.role}</h4>
          <p><strong>CTC:</strong> {job.ctc}</p>
          <p><strong>Deadline:</strong> {job.deadline}</p>
          <p><strong>Skills:</strong> {job.skills}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <Link to={`/job/${job.id}`}><button>View More Details</button></Link>
        </div>
      ) : (
        <div className="job-summary">
          hi
        </div>
      )}
    </div>
  );
};

// Job Application List Component
const Applications = () => {
  const [jobApplications, setJobApplications] = useState([]);

  // Fetch job applications data from Google Sheets via Sheety API (CSV format)
  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vTxG7FQSEKwscYBm-2MFM70bi3qrMPg63cxjLyzQGer665mn3nHtkkym60Cx6oeRPrVaFSuHtrSZ-0R/pub?output=csv')
      .then(response => response.text())  // Fetch the raw CSV data
      .then(text => {
        console.log('Raw CSV data: ', text);
        // Use PapaParse to convert CSV to JSON
        Papa.parse(text, {
          header: true, // Treat first row as header
          skipEmptyLines: true, // Skip empty lines
          complete: (result) => {
            console.log('Parsed data:', result.data);
            setJobApplications(result.data); // Update state with parsed JSON data
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="job-applications-list">
      {jobApplications.map((job) => (
        <JobApplication key={job.id} job={job} />
      ))}
    </div>
  );
};

export default Applications;
