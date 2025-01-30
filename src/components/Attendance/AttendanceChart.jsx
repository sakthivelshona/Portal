import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AttendanceChart = ({ studentData }) => {
  const attendanceData = studentData.attendace[0];
  const presentPercentage = (attendanceData.presentDays / attendanceData.totalDays) * 100;
  const absentPercentage = 100 - presentPercentage;

  const data = {
    datasets: [
      {
        data: [presentPercentage, absentPercentage],
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: ['#4caf50', '#f44336'],
        borderWidth: 1,
      },
    ],
    labels: ['Present', 'Absent'],
  };

  return (
    <>
        <div style={styles.container}>
      <h3 style={styles.title}>{studentData.name}'s Attendance</h3>
      <div style={styles.stats}>
        <p style={styles.statText}>Total Placements Registered: <span style={styles.statValue}>{attendanceData.totalDays}</span></p>
        <p style={styles.statText}>Placements Attended: <span style={styles.statValue}>{attendanceData.presentDays}</span></p>
        <p style={styles.statText}>Placements Missed: <span style={styles.statValue}>{attendanceData.absentDays}</span></p>
      </div>

      <div style={styles.chartContainer}>
        <Pie data={data} options={chartOptions} />
      </div>

      {/* Displaying the label */}
      <div style={styles.labelContainer}>
        <div style={styles.label}>
          <span style={styles.labelColor('#4caf50')} /> Present: {presentPercentage.toFixed(2)}%
        </div>
        <div style={styles.label}>
          <span style={styles.labelColor('#f44336')} /> Absent: {absentPercentage.toFixed(2)}%
        </div>
      </div>
    </div>
    </>

  );
};

// Chart options for better customization
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Hides the legend in the chart to avoid redundancy
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          let percentage = context.raw;
          return `${context.label}: ${percentage.toFixed(2)}%`;
        },
      },
    },
  },
  maintainAspectRatio: false,
  layout: {
    padding: 20,
  },
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  stats: {
    marginBottom: '20px',
  },
  statText: {
    fontSize: '16px',
    color: '#555',
    margin: '5px 0',
  },
  statValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    position: 'relative',
    height: '250px', // Adjust the height as per your need
    marginBottom: '20px',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  label: {
    marginRight: '20px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
  },
  labelColor: (color) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '8px',
  }),
};

export default AttendanceChart;
