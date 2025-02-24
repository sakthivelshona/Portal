import React from 'react';
import './Style.css'; // Extracted CSS for the sidebar
import Sidebar from './Sidebar';
import { FaCalendarAlt } from 'react-icons/fa'; // For Calendar icons
import { Line } from 'react-chartjs-2'; // Importing line chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registering the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HomepageStaff = () => {
  // Data for Line Chart
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Total Students',
        data: [100, 120, 140, 160, 180],
        borderColor: '#42a5f5', // Blue
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
      },
      {
        label: 'Students Hired',
        data: [30, 40, 50, 60, 70],
        borderColor: '#66bb6a', // Green
        backgroundColor: 'rgba(102, 187, 106, 0.2)',
        fill: true,
      },
      {
        label: 'No of Recruiters',
        data: [5, 6, 7, 8, 9],
        borderColor: '#ff7043', // Red
        backgroundColor: 'rgba(255, 112, 67, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="main-content">
        <h1 className="centered-text">Welcome to the Job Portal</h1>

        {/* Analytics Section */}
        <div className="analytics-box">
          <div className="circle-box">
            <div className="circle circle1">
              <h2>New Job Post</h2>
              <p>10</p>
            </div>
            <div className="circle circle2">
              <h2>Ongoing Recruitment</h2>
              <p>5</p>
            </div>
            <div className="circle circle3">
              <h2>Students Applied</h2>
              <p>20</p>
            </div>
          </div>
        </div>

        {/* Two Boxes Section */}
        <div className="two-boxes">
          {/* Box 1 - Upcoming Events */}
          <div className="upcoming-events">
            <h3>Upcoming Drives</h3>
            <h4>Placement Upcoming:</h4>
            <div className="event">
              <FaCalendarAlt className="calendar-icon" />
              <div className="event-details">
                <span>Solution - Online</span>
              </div>
            </div>
            <div className="event">
              <FaCalendarAlt className="calendar-icon" />
              <div className="event-details">
                <span>Zoho - Offline</span>
              </div>
            </div>
            <div className="event">
              <FaCalendarAlt className="calendar-icon" />
              <div className="event-details">
                <span>TVS - Online</span>
              </div>
            </div>
          </div>

          {/* Box 2 - Line Chart */}
          <div className="analysis-box">
            <h3>Student Analysis</h3>
            <div className="chart-placeholder">
              <Line data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageStaff;
