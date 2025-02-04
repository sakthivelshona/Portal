// DailyScoresChart.js
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
        label: `${studentData.name} - Daily Scores`,
        data: scores,
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>{studentData.name} - Daily Scores</h3>
      <Bar data={data} />
    </div>
  );
};

export default DailyScoresChart;
