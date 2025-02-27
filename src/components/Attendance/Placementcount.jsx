import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Placementcount = ({ studentData }) => {
  const jobApplicationAnalytics = studentData.jobApplicationAnalytics;

  // Data preparation for chart
  const labels = ['Applied Jobs', 'Attended Jobs'];
  const values = [
    jobApplicationAnalytics.appliedJobs,
    jobApplicationAnalytics.attendedJobs,
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Job Application Analytics',
        data: values,
        backgroundColor: ['#3674B5', '#16D5A8'], // Different colors for each item
        borderWidth: 1,
      },
    ],
  };

  // Chart options for customizing the graph appearance
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
    scales: {
      x: {
        ticks: {
          display: true, // Show x-axis labels
        },
        // Decrease the width of bars
        barThickness: 20, // Adjust this value to change the bar width
      },
      y: {
        ticks: {
          // Force Y-axis to show integer values only
          stepSize: 1, // Optional: defines the step size between ticks
          callback: function(value) {
            return Number.isInteger(value) ? value : ''; // Show only integer values
          },
        },
      },
    },
  };

  return (
    <div>
      <h3 style={styles.title}>Job Application Analytics</h3>

      <Bar data={data} options={options} />
    </div>
  );
};

// Inline styles for the title
const styles = {
  title: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#3674B5', 
    marginBottom: '20px',
    textDecoration: 'none', 
  },
};

export default Placementcount;
