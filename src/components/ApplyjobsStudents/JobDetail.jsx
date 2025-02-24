import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import Sidebar from '../Student/Sidebar';
import './Style.css';  
import studentData from './profileData.json';  // Import the JSON data

const JobDetail = () => {
  const { id } = useParams();  // Get the job ID from the URL
  const navigate = useNavigate(); // For redirection

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);  // State to store the uploaded file

  useEffect(() => {
    setLoading(true);  // Set loading state to true while fetching

    fetch('http://localhost:3000/getjobs')
      .then(response => response.json()) // Fetch the JSON data
      .then(data => {
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




// Handle drop event
const handleDrop = (e) => {
  e.preventDefault();
  const droppedFile = e.dataTransfer.files[0]; // Get the file from the drop event
  if (droppedFile) {
    // Check if the dropped file is a PDF
    if (droppedFile.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.');
      return;
    }
    setFile(droppedFile);  // Set the file to state
  }
}


  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault(); // Necessary to allow dropping
    e.stopPropagation();
  };




  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    if (selectedFile) {
      // Check if the file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        alert('Please upload a valid PDF file.');
        return;
      }
      setFile(selectedFile); // Set the file to state
    }
  };



// Submit job application
const handleApply = () => {
  if (!file) {
    alert('Please upload your resume before applying!');
    return;
  }

  const formData = new FormData();
  formData.append('jobTitle', job.jobTitle);
  formData.append('jobName', job.company);
  formData.append('resume', file);
  formData.append('studentName', studentData.name);
  formData.append('studentEmail', studentData.email);
  formData.append('studentskills', studentData.skills);

  // Create student applied job object
  const newAppliedJob = {
    studentName: studentData.name,
    studentEmail: studentData.email,
    studentskills: studentData.skills,
    jobTitle: job.jobTitle,
    jobName: job.company,

  };

  // Retrieve existing applied jobs from localStorage and ensure it's an array
  let existingAppliedJobs = JSON.parse(localStorage.getItem('studentAppliedJobs'));

  // Check if existingAppliedJobs is not an array or is null
  if (!Array.isArray(existingAppliedJobs)) {
    existingAppliedJobs = [];  // Initialize it as an empty array if not valid
  }

  // Add new applied job to the list
  existingAppliedJobs.push(newAppliedJob);

  // Store the updated list back in localStorage
  localStorage.setItem('studentAppliedJobs', JSON.stringify(existingAppliedJobs));

  // Send the application to the backend
  fetch('http://localhost:3000/applyJob', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Application submitted:', data);
      navigate('/application-success'); // Redirect to success page
    })
    .catch((error) => {
      console.error('Error applying for job:', error);
      alert(`Error: ${error.message}`);
    });
};






  if (loading) {
    return <div className="loading-indicator">Loading...</div>;  // Loading indicator
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');  // Day: Add leading zero if single digit
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Month: Add leading zero if single digit
    const year = date.getFullYear();  // Year (4 digits)
    
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Sidebar />
      <div className="job-detail-page">
        <h1>Apply </h1>
        <div className="job-info">
          <h3>{job.company} - {job.jobTitle}</h3>
          <p><strong>Description:</strong> {job.jobDescription}</p>
          <p><strong>Requirements:</strong> {job.jobRequirement}</p>

          <p><strong>Company Website :</strong> {job.website}</p>

          <p><strong>Skills:</strong> {job.skills}</p>
          <p><strong>CTC:</strong> {job.ctc}</p>
          <p><strong> Responsibilities :</strong> {job.jobResponsibility}</p>

          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Deadline:</strong> {formatDate(job.deadline)}</p>      
        </div>

        {/* Drag and Drop File Upload */}
        <h4>Upload your Resume</h4>
        <div 
          className="file-upload" 
          onDrop={handleDrop} 
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-input').click()}  // Trigger file input when clicked
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
          {/* align side to each other */}
          <button>ATS checker</button>
          <input type="text" />
        </div>
        
        <div className="job-apply-student">
          <button onClick={handleApply}>Apply</button>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
