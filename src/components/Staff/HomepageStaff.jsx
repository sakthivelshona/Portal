import React, { useState } from 'react';
import './Style.css'; // Extracted CSS for the sidebar
import Sidebar from './Sidebar';
import { FaCalendarAlt } from 'react-icons/fa'; // For Calendar icons
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import LineChartComponent from './LineChartComponent';

// Registering the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomepageStaff = () => {


  // State for filtering by skill
  const [filterSkill, setFilterSkill] = useState('');

  // Example list of students for demonstration
  const students = [
    { name: 'Shona', rollno: '7376212AD197', skills: 'React, MongoDB', department: 'Artificial Intelligence and Data Science', email : 'shona.sd21@bitsathy.ac.in', batch :'2025'},
    { name: 'Shitharthan', rollno: '7376212AD195', skills: 'SQL, Machine Learning', department: 'Artificial Intelligence and Data Science', email : 'shitharthan.sd21@bitsathy.ac.in', batch :'2025'},
    { name: 'Sheela', rollno: '7376212AD194', skills: 'Python, Django, Data Science',  department: 'Artificial Intelligence and Data Science', email : 'sheela.sd21@bitsathy.ac.in', batch :'2025' },
    { name: 'Dharnesh', rollno: '7376212AD191', skills: 'Java, SpringBoot',  department: 'Artificial Intelligence and Machine Learning', email : 'dharnesh.sd21@bitsathy.ac.in', batch :'2027' },
    { name: 'Shanmati', rollno: '7376212IT147', skills: 'Problem Solving, DSA',  department: 'Information Technology', email : 'shanmati.sit21@bitsathy.ac.in', batch :'2024' },
  ];

  // Filtering students based on skills
  const filteredStudents = students.filter((student) => {
    return student.skills.toLowerCase().includes(filterSkill.toLowerCase());
  });

  return (
    <>
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Job Portal</h1>

        {/* Analytics Section */}
        <div className="analytics-box">
          <div className="circle-box">
            <div className="circle-container">
              <div className="circle circle1">
                <p>10</p>
              </div>
              <h2>New Job Post</h2>
            </div>

            <div className="circle-container">
              <div className="circle circle2">
                <p>5</p>
              </div>
              <h2>Ongoing Recruitment</h2>
            </div>

            <div className="circle-container">
              <div className="circle circle3">
                <p>20</p>
              </div>
              <h2>Students Applied</h2>
            </div>
          </div>

          <div className="calendar-box">
            <h2>Upcoming Placement Drive</h2>
            <div className="event">
              <FaCalendarAlt className="calendar-icon" />
              <div className="event-detail">
                <h4>Solution</h4>
                <p>Offline</p>
              </div>
            </div>

            <div className="event">
              <FaCalendarAlt className="calendar-icon" />
              <div className="event-detail">
                <h4>Zoho</h4>
                <p>Online</p>
              </div>
            </div>

            <div className="event">
              <FaCalendarAlt className="calendar-icon" />
              <div className="event-detail">
                <h4>HyperVerge</h4>
                <p>Online</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Drives & Line Chart Section */}
        <LineChartComponent /> {/* Display the Line Chart */}

        {/* Filter and Student Details Section */}
        <div className="filter-and-student-section">
          <h1>Student Detail</h1>
          <div className="filter-container">
            <label htmlFor="skills-filter">Filter by Skills: </label>
            <input
              type="text"
              id="skills-filter"
              value={filterSkill}
              onChange={(e) => setFilterSkill(e.target.value)}
              placeholder="Enter skill to filter"
            />
          </div>

          {/* Student Details Table */}
          <div className="student-details-container">
            <table className="student-details-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Skills</th>
                  <th>Department</th>
                  <th>Batch</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.rollno}>
                      <td>{student.rollno}</td>
                      <td>{student.name}</td>
                      <td>{student.skills}</td>
                      <td>{student.department}</td>
                      <td>{student.batch}</td>
                      <td>{student.email}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No students found with the selected skill.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomepageStaff;
