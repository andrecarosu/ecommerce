import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)




const Graphic = () => {

  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', "Junio", "Julio", "Agosto", "Septirmbre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [
      {
        label: 'Ventas',
        data: [1200, 1500, 1000, 1800, 2000, 1850, 1800, 2100, 2050, 2010, 2200, 2250],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
  
      x: {
        type: 'category',
      },

      yAxes: [
        {
          type: "linear",
          beginAtZero: true,
        },
      ]
    },
  };

  

  return (
    <div>
      <h2>Ventas Mensuales del año 2023</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Graphic;
