import React from 'react';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import Chart3 from './Chart3';

const HomeChart = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 my-5'>
       <div className='bg-white  rounded-[30px] p-5'>
        <h2 className='text-center'>🥧 توزيع الحجوزات حسب نوع القاعة</h2>
        <Chart1/>
         <hr />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-5'> 
          <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>11.11 %</h2>
          <h4>قاعة المعالي الكبرئ</h4>
          </div>
          <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>0 %</h2>
          <h4>قاعة ريفال</h4>
          </div>
      </div>
       </div>
        <div className='bg-white rounded-[30px] p-5'>
        <h2 className='text-center'>📊 الحجوزات السنوية</h2>
        <Chart2/>
         <hr />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-5'> 
           <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>0 حجز</h2>
          <h4> السبت</h4>
          </div>
          <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>0 حجز</h2>
          <h4> السبت</h4>
          </div>
           <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>0 حجز</h2>
          <h4> السبت</h4>
          </div>
      </div>
       </div>
        <div className='bg-white rounded-[30px] p-5'>
        <h2 className='text-center'>💰 تطور الإيرادات</h2>
        <Chart3/>
         <hr />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-5'> 
           <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>102,933.05</h2>
          <h4> ريال سعودي </h4>
          </div>
          <div className='bg-[#edf4ff] rounded-xl flex flex-col gap-1 py-4 items-center justify-center '>
          <h2 className='text-xl font-bold text-[#17a2b8]'>+0%</h2>
          <h4> زيادة شهرية</h4>
          </div>
          
      </div>
       </div>
    </div>
  );
}

export default HomeChart;
