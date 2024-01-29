import React from 'react'
import "./_doughnut.scss";
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';
// Import statements

const DrawDoughnut = ({ title, align, position, titpos, titalgn, values, label }) => {

  const labels = label;
  const dataValues = values;

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['rgba(255, 99, 132)', 'rgba(54, 162, 235)', 'rgba(255, 206, 86)', 'rgba(75, 192, 192)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
        cutout: '75%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: position,
        align: align,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: title,
        color: 'white',
        position: titpos,
        align: titalgn,
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className='doughnut'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DrawDoughnut;
