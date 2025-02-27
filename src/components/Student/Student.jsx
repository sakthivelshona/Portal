import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import './Style.css';

import Placementcount from '../Attendance/Placementcount';
import AttendanceChart from '../Attendance/AttendanceChart';
import DailyScoresChart from '../Attendance/DailyScoresChart';

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
    <>
      <Sidebar />
      <div className="student-board">
        <h1>Welcome back !</h1>

        <div className="container">
          {/* Student Info Section */}
          <div className="subcontainer">
            <h2>PROFILE</h2>
            <div className="student-info">
              <div className="student-pic-container">
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


          {/* Attendance Chart Section */}

          < div className="subcontainer" >
            <AttendanceChart studentData={studentData} />
          </div >

          {/* Daily Scores Chart Section */}
          < div className="subcontainer" >
            <Placementcount studentData={studentData} />
          </div >
        </div>



        <div className="second-container">
          {/* Placement Count Section */}
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
      </div>
    </>
  );
};


export default Student;
