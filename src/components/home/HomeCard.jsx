import React from 'react';
import { FaBookOpen, FaFileInvoice, FaFileInvoiceDollar, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HomeCard = () => {
  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5 lg:gap-3 gap-5">
          <Link to='/add-client' className="bg-white shadow-md flex hover:scale-105 transition duration-300 cursor-pointer flex-col gap-2 sm:gap-3 rounded-lg h-[100px] lg:h-[120px] items-center justify-center">
            <div className="bg-[#eafbf8] w-[35px] h-[40px] sm:w-[40px] sm:h-[40px] rounded-lg flex items-center justify-center">
              <FaUserPlus size={25} className="text-[#28a745]" />
            </div>
            <span className="font-semibold text-sm sm:text-base">أضافة عميل</span>
          </Link>

          <Link to='/new-booking' className="bg-white shadow-md flex flex-col gap-2 hover:scale-105 transition duration-300 cursor-pointer sm:gap-3 rounded-lg h-[100px] lg:h-[120px] items-center justify-center">
            <div className="bg-[#f4f9ff] w-[35px] h-[40px] sm:w-[40px] sm:h-[40px] rounded-lg flex items-center justify-center">
              <FaBookOpen size={25} className="text-[#91c2f9]" />
            </div>
            <span className="font-semibold text-sm sm:text-base">حجز جديد</span>
          </Link>

          <Link  to = '/reservations' className="bg-white shadow-md flex flex-col gap-2 sm:gap-3 hover:scale-105 transition duration-300 cursor-pointer rounded-lg h-[100px] lg:h-[120px] items-center justify-center">
            <div className="bg-[#eff6e6] w-[35px] h-[40px] sm:w-[40px] sm:h-[40px] rounded-lg flex items-center justify-center">
              <FaFileInvoice size={25} className="text-[#28a745]" />
            </div>
            <span className="font-semibold text-sm sm:text-base">الحجوزات</span>
          </Link>

          <Link to='/invoices' className="bg-white shadow-md flex flex-col gap-2 sm:gap-3 hover:scale-105 transition duration-300 cursor-pointer rounded-lg h-[100px] lg:h-[120px] items-center justify-center">
            <div className="bg-[#e7f8f6] w-[35px] h-[40px] sm:w-[40px] sm:h-[40px] rounded-lg flex items-center justify-center">
              <FaFileInvoiceDollar size={25} className="text-[#14b8a6]" />
            </div>
            <span className="font-semibold text-sm sm:text-base">الفواتير</span>
          </Link>
        </div>
  );
}

export default HomeCard;
