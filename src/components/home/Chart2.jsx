import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// تسجيل العناصر المطلوبة من Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chart2 = () => {
  const labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'الإحصائيات الشهرية',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(201, 203, 207, 0.5)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1,
        barThickness: 30, // 👈 عَرض العمود (عريض)
        maxBarThickness: 80 // 👈 أقصى عرض ممكن
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 👈 ضروري لملء المساحة العمودية
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Cairo, sans-serif',
            size: 14,
          }
        }
      },
      title: {
        display: true,
        font: {
          size: 20,
          family: 'Cairo, sans-serif'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // 👈 للتحكم بطول الأعمدة
        ticks: {
          stepSize: 20,
          font: {
            family: 'Cairo, sans-serif',
          }
        },
      },
      x: {
        ticks: {
          font: {
            family: 'Cairo, sans-serif',
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl h-[325px] mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart2;
