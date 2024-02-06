import React from 'react'
import "./_doughnut.scss";
import 'chart.js/auto'
import { Doughnut } from 'react-chartjs-2';
// Import statements

const DrawDoughnut = ({ title, align, position, titpos, titalgn, values, label }) => {

  const labels = label;
  const dataValues = values;
  const lightColor = 'hsl(0, 0%, 100%)';
  const red = 'rgba(255, 99, 132)';
  const blue = 'rgba(54, 162, 235)';
  const yellow = 'rgba(255, 206, 86)';
  const green = 'rgba(75, 192, 192)';

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [red, blue, yellow, green],
        borderColor: [red, blue, yellow, green],
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
          color: lightColor,
        },
      },
      title: {
        display: true,
        text: title,
        color: lightColor,
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
