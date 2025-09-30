import React from 'react';
import { FaPeopleRoof } from 'react-icons/fa6';
import { FaArrowLeft, FaUserShield } from 'react-icons/fa'; // سهم
import { Link } from 'react-router-dom';

const HomeStatistics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 lg:gap-3 gap-5">
      <Link to = '/reservations' className="bg-[#28a745]  rounded-md text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between w-full p-5">
            <span className="text-[30px]">9</span>
            <FaPeopleRoof className="text-xl" />
          </div>
          <h2 className="text-xl mt-2 px-5">حجوزات مؤكدة</h2>
        </div>

        <div className="mt-4 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-md flex items-center justify-between text-sm cursor-pointer hover:bg-white/20 transition-all">
          <span>المزيد من المعلومات</span>
          <FaArrowLeft className="text-xs" />
        </div>
      </Link>
      <Link to = '/reservations' className="bg-[#dc3545]  rounded-md text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between w-full p-5">
            <span className="text-[30px]">5</span>
            <FaUserShield className="text-xl" />
          </div>
          <h2 className="text-xl mt-2 px-5">حجوزات ملغية</h2>
        </div>

        <div className="mt-4 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-md flex items-center justify-between text-sm cursor-pointer hover:bg-white/20 transition-all">
          <span>المزيد من المعلومات</span>
          <FaArrowLeft className="text-xs" />
        </div>
      </Link>
      <Link to = '/reservations' className="bg-[#ffc107]  rounded-md text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between w-full p-5">
            <span className="text-[30px]">5</span>
            <FaUserShield className="text-xl" />
          </div>
          <h2 className="text-xl mt-2 px-5">حجوزات انتظار</h2>
        </div>

        <div className="mt-4 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-md flex items-center justify-between text-sm cursor-pointer hover:bg-white/20 transition-all">
          <span>المزيد من المعلومات</span>
          <FaArrowLeft className="text-xs" />
        </div>
      </Link>
      <Link to = '/reservations' className="bg-[#17a2b8]  rounded-md text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between w-full p-5">
            <span className="text-[30px]">103.05 ر.س</span>
            <FaUserShield className="text-xl" />
          </div>
          <h2 className="text-xl mt-2 px-5">اجمالي مبالغ الحجوزات</h2>
        </div>

        <div className="mt-4 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-md flex items-center justify-between text-sm cursor-pointer hover:bg-white/20 transition-all">
          <span>المزيد من المعلومات</span>
          <FaArrowLeft className="text-xs" />
        </div>
      </Link>    
    </div>
  );
};

export default HomeStatistics;
