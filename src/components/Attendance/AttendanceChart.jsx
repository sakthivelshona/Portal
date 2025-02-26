import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const AttendanceChart = ({ studentData }) => {
  const attendanceData = studentData.attendance[0];
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
    <div style={styles.container}>
      <h3 style={styles.title}>Attendance Data</h3>
      <div style={styles.stats}>
        <p style={styles.statText}>Total Placements Conducted: <span style={styles.statValue}>{attendanceData.totalDays}</span></p>
        <p style={styles.statText}>No of days Present: <span style={styles.statValue}>{attendanceData.presentDays}</span></p>
        <p style={styles.statText}> No of days Absent: <span style={styles.statValue}>{attendanceData.absentDays}</span></p>
      </div>

      <div style={styles.chartContainer}>
        <Pie data={data} options={chartOptions} />
      </div>

      <div style={styles.labelContainer}>
        <div style={styles.label}>
          <span style={styles.labelColor('#4caf50')} /> Present: {presentPercentage.toFixed(2)}%
        </div>
        <div style={styles.label}>
          <span style={styles.labelColor('#f44336')} /> Absent: {absentPercentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

// Chart options for better customization (Donut chart)
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
  maintainAspectRatio: true, // Ensures aspect ratio is maintained within container
  layout: {
    padding: 20,
  },
  // Add this property to turn the Pie chart into a Donut chart
  cutout: '70%', // This creates the hole in the center (adjust as needed)
};

const styles = {
  container: {
    width: '100%',
    height: '100%', // Make sure it fills the box height
    padding: '10px', // Reduced padding to fit better
    backgroundColor: '#ffff',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px', // Adjusted font size for title
    marginBottom: '10px',
    color: '#333',
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden', // To ensure long titles don't overflow
  },
  stats: {
    marginBottom: '-15px', // Adjust margin for better fit
    fontSize: '14px',
    lineHeight: '1.5',
    padding: '10px', // Reduced padding to fit better
  },
  statText: {
    fontSize: '14px',
    color: '#555',
    margin: '5px 0',
  },
  statValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    position: 'relative',
    height: '150px', // Adjusted height of the chart container to fit within the box
    marginBottom: '15px', // Adjust margin to fit more content
    display: 'flex',
    justifyContent: 'center',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '5px',
  },
  label: {
    marginRight: '15px',
    fontSize: '12px', // Smaller font for labels to fit better
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
  },
  labelColor: (color) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '8px',
  }),
};

export default AttendanceChart;
