import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {   FaUser, FaBuilding, FaFileAlt, FaChartLine, FaMoneyBill, FaFileSignature, FaCalendar } from 'react-icons/fa';
import {  IoMdHome, IoMdNotifications } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FiMenu } from "react-icons/fi";
import ToolBar from './ToolBar';
import Container from '../shared/Container';
import { FaBarsProgress } from 'react-icons/fa6';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const hideNavbarPaths = ['/login', '/family-login', '/ar'];
  const shouldHideNavbar = hideNavbarPaths.some(path => pathname.startsWith(path));

  if (shouldHideNavbar) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <ToolBar />
      
         <div className='bg-white '>
        <div className='lg:w-full mx-auto px- py-2'>
          <div className='flex justify-between items-center lg:hidden'>
            <button onClick={toggleMenu} className='text-2xl text-black'>
              <FiMenu />
            </button>
          </div>
          <ul className={`flex flex-col lg:flex-row gap-5 mt-4 lg:mt-0 ${menuOpen ? 'block' : 'hidden'} lg:flex justify-center items-center`}>
            <li>
              <Link to="/" className='text-black hover:text-[#09adce] transition duration-300 flex items-center gap-1 text-sm '>
                 الرئيسية <IoMdHome className='text-gray-500' size={20} />
              </Link>
            </li>
            <li>
              <Link to="/clients" className='text-black hover:text-[#09adce] transition duration-300  flex items-center gap-1 text-sm'>
                 العملاء <FaUser  className='text-gray-500' size={18} />
              </Link>
            </li>
            <li>
              <Link to="/halls" className='text-black flex hover:text-[#09adce] transition duration-300  items-center gap-1 text-sm'>
                 القاعات <FaBuilding   className='text-gray-500' size={18} />
              </Link>
            </li>
            <li>
              <Link to="/reservations" className='text-black flex hover:text-[#09adce] transition duration-300  items-center gap-1 text-sm'>
                الحجوزات <FaFileAlt className='text-gray-500'  size={18} />
              </Link>
            </li>
            <li>
              <Link to="/invoices" className='text-black hover:text-[#09adce] transition duration-300  flex items-center gap-1 text-sm'>
                الفواتير <FaChartLine  className='text-gray-500' size={18}  />
              </Link>
            </li>
            <li>
              <Link to="/new-invoices" className='text-black hover:text-[#09adce] transition duration-300  flex items-center gap-1 text-sm'>
                الفواتير المبسطة <FaMoneyBill  className='text-gray-500' size={18}  />
              </Link>
            </li>
            
            <li>
              <Link to="/reports" className='text-black hover:text-[#09adce] transition duration-300  flex items-center gap-1 text-sm'>
                 التقارير والمحاسبة <FaBarsProgress  className='text-gray-500' size={18}  />
              </Link>
            </li>
            <li>
              <Link to="/photo-gallery" className='text-black hover:text-[#09adce] transition duration-300  flex items-center gap-1 text-sm'>
                المعرض <FaFileSignature  className='text-gray-500' size={18}  />
              </Link>
            </li>
           
            <li>
              <Link to="/alerts" className='text-black hover:text-[#09adce] transition duration-300  flex items-center gap-1 text-sm'>
                 التنبيهات <IoMdNotifications  className='text-gray-500' size={20} />
              </Link>
            </li>
              <li>
              <Link to ='/reservations' className='text-white flex items-center gap-1 bg-[#09adce] h-[38px] px-3 text-sm rounded-lg relative'>
  <div className="relative">
    <IoMdNotifications size={20} />
    {/* Badge */}
    <span className="absolute -top-1.5 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full shadow">
      3
    </span>
  </div>
  <span>حجوزات الزوار</span>
</Link>


              
            </li>
             <li>
              <Link to ='/reservations-schedule' className='text-white  flex items-center gap-1 bg-[#09adce] h-[38px] px-3 text-sm rounded-lg'>
                 <FaCalendar/>
                 <span>جدول الحجوزات</span>
              </Link>
              
            </li>
          </ul>
        </div>
        <div className='w-full h-2 bg-[#09adce]'></div>

      </div>
    </>
  );
};

export default Navbar;
