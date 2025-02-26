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

      <div className="container">
        {/* Student Info Section */}
        <div className="subcontainer">
          <div className="student-info">
            <div className="student-pic-container">
              <img src={studentData.pic} alt="Student Pic" className="student-pic" />
            </div>
            <div className="student-details">
              <h2>{studentData.name}</h2>
              <p>{studentData.rollno}</p>
              <p>{studentData.email}</p>
              <p>{studentData.batch}</p>

            </div>

          </div>

          <div className="additional-details">
            <p>{studentData.department}</p>
            <p><b>Mentor: </b>{studentData.mentor}</p>
            <p><b>Special Lab: </b>{studentData.speciallab}</p>
            <p><b>Boarding: </b>{studentData.boarding}</p>

          </div>
        </div>


        {/* Attendance Chart Section */}

        < div className="subcontainer" >
          <AttendanceChart studentData={studentData} />
        </div >

        {/* Daily Scores Chart Section */}
        < div className="subcontainer" >
          <DailyScoresChart studentData={studentData} />
        </div >
      </div>



      <div className="second-container">
        {/* Placement Count Section */}
        <div className="subcontainer-second-p">
          <Placementcount studentData={studentData} />
        </div>
        <div className="subcontainer-second">

          <div className="details-student">
            <h2>GRADE</h2>
            <h4>Cumulative Grade Point Average (CGPA)</h4>
            <p>8.73</p>
            <h4>Placement FA %</h4>
            <p>70.6</p>
            <h4>Full Stack Rank</h4>
            <p>24</p>
            <h4>Full Stack Point</h4>
            <p>1342</p>
          </div>
        </div>
      </div>
    </>
  );
};

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <h1>Top Navbar</h1>
    </div>
  );
};

export default Student;
