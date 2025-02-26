import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Placementcount = ({ studentData }) => {
  const jobApplicationAnalytics = studentData.jobApplicationAnalytics;

  // Data preparation for chart
  const labels = ['Applied Jobs', 'Results Awaiting', 'Attended Jobs'];
  const values = [
    jobApplicationAnalytics.appliedJobs,
    jobApplicationAnalytics.resultsAwaiting,
    jobApplicationAnalytics.attendedJobs,
  ];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Job Application Analytics',
        data: values,
        backgroundColor: '#66bb6a', // Green color for bars
        borderColor: '#388e3c', // Darker green for borders
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
    color: '#333',
    marginBottom: '20px',
  },
};

export default Placementcount;
