import React, { useEffect, useRef } from 'react';
import './_line.scss';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const DrawLine = ({ dates, earned_value, spent }) => {

  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  const ratio = screenWidth < 768 ? 1 : 2;

  const lightColor = 'hsl(0, 0%, 100%)';
  const tertiaryColor = 'hsl(236, 44%, 12%)';

  const labels = dates;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Spent',
        data: spent,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'earned value',
        data: earned_value,
        borderColor: 'rgba(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Progress`,
        color: lightColor,
        position: 'bottom',
      },
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          color: lightColor,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: lightColor,
        },
        ticks: {
          color: lightColor,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: lightColor,
        },
        ticks: {
          color: lightColor,
        },
      },
    },
    layout: {
      padding: 20,
    },
    aspectRatio: ratio,
  };

  return (
    <div className="line">
      <Line options={options} data={data} />
    </div>
  );
};

export default DrawLine;
