import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './Style.css';
import Placementcount from '../Attendance/Placementcount';
import AttendanceChart from '../Attendance/AttendanceChart';

const Student = () => {
  const [studentData, setStudentData] = useState(null);
  const [recruiterFeedbacks, setRecruiterFeedbacks] = useState([]);
  const [staffFeedbacks, setStaffFeedbacks] = useState([]);

  // Fetch feedbacks from API (either recruiter or staff)
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/feedback.json'); // Replace with your API endpoint
        const data = await response.json();
        
        // Separate feedbacks into recruiter and staff feedbacks
        const recruiterFeedbacks = data.filter(feedback => feedback.companyname && feedback.jobtitle);
        const staffFeedbacks = data.filter(feedback => !feedback.companyname && !feedback.jobtitle);

        setRecruiterFeedbacks(recruiterFeedbacks);
        setStaffFeedbacks(staffFeedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      }
    };

    fetchFeedbacks();
  }, []);


  // Fetch student data
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setStudentData(data.students[0])) // Use first student data for demo
      .catch((error) => console.error('Error fetching student data:', error));
  }, []);

  if (!studentData) return <div>Loading...</div>;

  return (
    <div className='containers'>
      <Sidebar />
      <div className="student-board">
        <h1>Welcome back 👋🏻</h1>
        <div className="container">
          <div className="subcontainer">
            <h2>Profile</h2>
            <div className="student-info">
              <div>
                <img src={studentData.pic} alt="Student Pic" className="student-pic" />
              </div>
              <div className="student-details-personal">
                <h4>{studentData.name}</h4>
                <p>{studentData.rollno}</p>
                <p>{studentData.email}</p>
              </div>
            </div>

            <div className="additional-details">
              <div className="batch">
                <h4>Batch</h4>
                <p>{studentData.batch}</p>
              </div>
              <div className="year">
                <h4>Year</h4>
                <p>{studentData.year}</p>
              </div>
              <div className="depart">
                <h4>Department</h4>
                <p>{studentData.department}</p>
              </div>
            </div>
          </div>

          <div className="subcontainer">
            <AttendanceChart studentData={studentData} />
          </div>

          <div className="subcontainer">
            <Placementcount studentData={studentData} />
          </div>
        </div>

        <div className="second-container">
          <div className="box">
            <h4>CGPA</h4>
            <p>{studentData.cgpa}</p>
          </div>
          <div className="box">
            <h4>Arrear</h4>
            <p>{studentData.arrear}</p>
          </div>
          <div className="box">
            <h4>Placement FA %</h4>
            <p>{studentData.placement[0].fa}</p>
          </div>
          <div className="box">
            <h4>Full Stack Point</h4>
            <p>{studentData.placement[0].fullstackpoint} (Rank {studentData.placement[0].rank})</p>
          </div>
        </div>

        <div className="third-container">
          <h3>Feedbacks Received</h3>
          
          <div className="feedback-section">
            <h4>Overall Feedback</h4>
            <div className="feedback-list">
              {recruiterFeedbacks.length === 0 ? (
                <p>No recruiter feedback available</p>
              ) : (
                recruiterFeedbacks.map((feedback, index) => (
                  <div key={index} className="feedback-item">
                    <p> {feedback.feedback} </p>
                    <p><span>{feedback.companyname} - {feedback.jobtitle}</span></p> 
                  </div>
                ))
              )}
              {staffFeedbacks.length === 0 ? (
                <p>No staff feedback available</p>
              ) : (
                staffFeedbacks.map((feedback, index) => (
                  <div key={index} className="feedback-item">
                    <p>{feedback.feedback}</p>
                    <p><span>Placement Faculty</span></p>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Student;
