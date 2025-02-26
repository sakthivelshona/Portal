import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DailyScoresChart = ({ studentData }) => {
  const dailyScores = studentData.dailyScores;
  const labels = dailyScores.map(score => score.day);
  const scores = dailyScores.map(score => score.score);

  const data = {
    labels: labels,
    datasets: [
      {
        label: ` Daily Scores`,
        data: scores,
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3 style={styles.title}>Daily Scores</h3>
      <Bar data={data} />
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

export default DailyScoresChart;
