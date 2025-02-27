import React, { useEffect } from 'react';
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
        backgroundColor: ['#16D5A8', '#B44E94'],
        borderColor: ['#16D5A8', '#B44E94'],
        borderWidth: 1,
      },
    ],
    labels: ['Present', 'Absent'],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    cutout: '70%', // Adjust the donut hole size (make hole smaller)
  };


  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Attendance %</h3>
      <div style={styles.chartContainer}>
        <Pie data={data} options={chartOptions} />
      </div>
      <p style={styles.attendancePercentageText}>{presentPercentage.toFixed(2)}%</p>
      <div style={styles.labelContainer}>
        <div style={styles.label}>
          <span style={styles.labelColor('#16D5A8')} /> Present
        </div>
        <div style={styles.label}>
          <span style={styles.labelColor('#B44E94')} /> Absent
        </div>
      </div>


    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    padding: '10px',
    backgroundColor: '#ffff',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#3674B5', 
    textDecoration: 'none', 
  },
  chartContainer: {
    position: 'relative',
    height: '150px',
    marginBottom: '15px',
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
    fontSize: '12px',
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
  attendancePercentageText: {
    fontSize: '16px',
    color: '#333',
    textAlign: 'center',
    marginBottom : '10px'
  },
  presentPercentage: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default AttendanceChart;
