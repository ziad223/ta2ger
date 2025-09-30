import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// تسجيل العناصر المطلوبة
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart3 = () => {
  // الأشهر
  const labels = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'];

  // البيانات
  const data = {
    labels,
    datasets: [
      {
        label: 'تطور الإيرادات 💰',
        data: [12000, 15000, 18000, 14000, 20000, 23000, 25000],
        borderColor: 'rgba(75, 192, 192, 1)', // لون الخط
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // تظليل تحت الخط
        tension: 0.4, // انسيابية الخط
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        pointRadius: 5,
        fill: true, // تعبئة تحت الخط
      }
    ]
  };

  // الإعدادات
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Cairo, sans-serif',
            size: 14
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
        beginAtZero: false,
        ticks: {
          callback: (value) => `${value.toLocaleString()} ج.م`, // تنسيق الأرقام
          font: {
            family: 'Cairo, sans-serif',
          }
        }
      },
      x: {
        ticks: {
          font: {
            family: 'Cairo, sans-serif',
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-6xl h-[325px] mx-auto">
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart3;
