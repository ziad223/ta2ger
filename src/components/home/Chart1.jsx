import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart1 = () => {
  const data = {
    labels: ['قاعة تدريب', 'قاعة مؤتمرات', 'قاعة اجتماعات'],
    datasets: [
      {
        label: 'عدد الحجوزات',
        data: [12, 5, 8], 
        backgroundColor: [
          '#28a745', // أخضر
          '#dc3545', // أحمر
          '#ffc107', // أصفر
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14,
            family: 'Cairo, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto h-[325px]">
      
      <Pie data={data} options={options} />
     
    </div>
  );
};

export default Chart1;
