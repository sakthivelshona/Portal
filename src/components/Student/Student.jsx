import React, { useEffect, useState } from 'react';
import './Style.css'; // Importing the CSS file for styling
import { Link } from 'react-router-dom';
import AttendanceChart from "../Attendance/AttendanceChart";
import DailyScoresChart from '../Attendance/DailyScoresChart';
import Sidebar from './Sidebar';
const Student = () => {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Fetch the student data from a JSON file
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setStudentData(data.students[0])) // Use first student data for demo
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);

  // If student data is not loaded yet, show a loading message
  if (!studentData) return <div>Loading...</div>;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="dashboard">
          <h1>Welcome Back !!</h1>

          {/* Welcome & Flowcharts */}
          <div className="dashboard-content">
            <div className="flowchart">
              <h2>{studentData.name}</h2>
              <p> <b>Roll No: </b>{studentData.rollno}</p>
              <p> <b>Department:</b> {studentData.department}</p>
              <p> <b>Batch: </b>{studentData.batch}</p>

              <AttendanceChart studentData={studentData} />
            </div>

            <div className="flowchart">
              <DailyScoresChart studentData={studentData} />
              {/* Calendar (Google Calendar Embed) */}
              <div className="calendar">
                <iframe title="Calendar" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FKolkata&showNav=0&showCalendars=0&showTabs=0&src=c2hvbmEuYWQyMUBiaXRzYXRoeS5hYy5pbg&src=Y19jbGFzc3Jvb21mNmU3Y2VkNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21kY2RhYmJmM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uaW5kaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=bXNlaWQ1YWhldmYxbTBtbmc0aHFqOGk2aG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%23007b83&color=%2333B679&color=%230047a8&color=%230B8043&color=%23616161"
                  width="800"
                  height="600"
                  frameborder="0" scrolling="no">

                </iframe>

                <p>erfse4e4</p>
              </div>
            </div>
          </div>

          <div className='divides'>

            <div className="job-opportunities">
              <h3>Job/Internship Opportunities</h3>
              {studentData.jobOpportunities.length > 0 ? (
                <ul>
                  {studentData.jobOpportunities.map((job, index) => (
                    <li key={index}>
                      <p><b>{job.title}</b> at {job.company}</p>
                      <p>Location: {job.location}</p>
                      <a href={job.applyLink} target="_blank" rel="noopener noreferrer">Apply Now</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No job/internship opportunities available</p>
              )}
            </div>
            <div className="certifications">
              <h3>Skill Development & Certifications</h3>
              {studentData.skillDevelopment.length > 0 ? (
                <ul>
                  {studentData.skillDevelopment.map((cert, index) => (
                    <li key={index}>
                      <p><b>{cert.title}</b></p>
                      <a href={cert.certificationLink} target="_blank" rel="noopener noreferrer">View Certification</a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No certifications available</p>
              )}
            </div>


            <div className="job-analytics">
              <h3>Job Application Analytics</h3>
              {studentData.jobApplicationAnalytics ? (
                <ul>
                  <li><b>Applied Jobs:</b> {studentData.jobApplicationAnalytics.appliedJobs}</li>
                  <li><b>Results Awaiting:</b> {studentData.jobApplicationAnalytics.resultsAwaiting}</li>
                  <li><b>Attended Jobs:</b> {studentData.jobApplicationAnalytics.attendedJobs}</li>
                </ul>
              ) : (
                <p>No analytics available</p>
              )}
            </div>
            </div>




        </div>


      </div>
    </div>
  );
};

export default Student;