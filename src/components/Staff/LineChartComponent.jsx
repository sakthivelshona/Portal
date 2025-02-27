import React from 'react';
import { Line } from 'react-chartjs-2'; // Importing Line chart from chart.js
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Filler } from 'chart.js';

// Registering chart elements
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Filler);

const LineChartComponent = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Updated for 12 months
    datasets: [
      // {
      //   label: 'Total Students',
      //   data: [100, 115, 130, 125, 140, 155, 160, 165, 170, 180, 190, 200], // Data for 12 months
      //   borderColor: '#42a5f5', // Blue
      //   backgroundColor: 'rgba(66, 165, 245, 0.2)'
      // },
      {
        label: 'Students Hired',
        data: [30, 40, 35, 45, 50, 60, 65, 55, 45, 80, 85, 60], // Data for 12 months
        borderColor: '#66bb6a', // Green
        backgroundColor: 'rgba(102, 187, 106, 0.2)'
      },
      {
        label: 'No of Recruiters',
        data: [9, 4, 7, 8, 8, 3, 7, 7, 2, 15, 6, 5], // Data for 12 months
        borderColor: '#ff7043', // Red
        backgroundColor: 'rgba(255, 112, 67, 0.2)'
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#ddd',
        },
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 14,
          },
        },
        ticks: {
          autoSkip: true, // Automatically skips labels if they overlap
          maxRotation: 0, // Keep labels horizontal
          minRotation: 0, // Ensure labels stay horizontal
          padding: 10, // Add padding between the chart and the labels
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: '#ddd',
        },
        title: {
          display: true,
          text: 'Counts',
          font: {
            size: 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom', 
        labels: {
          font: {
            size: 12,
          },
          padding: 10,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="two-boxes">
      {/* Line Chart */}
      <div className="analysis-box">
        <h3>Student Analysis</h3>
        <div className="chart-placeholder">
          <Line data={data} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
