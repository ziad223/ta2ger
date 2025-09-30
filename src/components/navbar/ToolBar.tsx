'use client';
import React, { useState, useEffect } from 'react';
import { IoNotifications } from "react-icons/io5";
import { FaChevronDown, FaCircleUser, FaMessage } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { FaPager } from 'react-icons/fa';
import Container from '../shared/Container';
import { useNavigate } from "react-router-dom";

const ToolBar = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
const [showMessagesDropdown, setShowMessagesDropdown] = useState(false);
const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: true });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login"); 
  };

  return (
    <div className='bg-[#09adce] relative  z-50'>
      <Container>
        <div className="flex items-center justify-between mx-auto px- p-1 lg:w-full">

          <button onClick={toggleMenu} className="text-white text-2xl lg:hidden">
            <FiMenu />
          </button>

          <div className="flex items-center justify-end lg:justify-between w-full">

            {/* Nav - Only on Large Screens */}
            <ul className="hidden lg:flex flex-wrap items-center gap-5">
              <li
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <a href="#" className='text-sm whitespace-nowrap text-white flex items-center gap-1'>
                  الإدارة <FaChevronDown size={10} />
                </a>
                {showDropdown && (
                  <ul className="absolute top-full right-0 bg-white shadow-md rounded w-52 py-2 z-50">
                    <li><Link to="/settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">الأعدادات</Link></li>
                    <li><Link to="/landing-control" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">التحكم بالواجهة</Link></li>
                    <li><Link to="/occasions" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">أنواع المناسبات</Link></li>
                    <li><Link to="/services" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">الخدمات</Link></li>
                    <li><Link to="contact-messages" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">رسائل تواصل معنا</Link></li>
                  </ul>
                )}
              </li>
            <li
  className="relative"
  onMouseEnter={() => setShowMessagesDropdown(true)}
  onMouseLeave={() => setShowMessagesDropdown(false)}
>
  <a href="#" className='text-sm whitespace-nowrap text-white flex items-center gap-1'>
    اعدادات الرسائل <FaMessage className='mt-1' />
    <FaChevronDown size={10} />
  </a>
  {showMessagesDropdown && (
    <ul className="absolute top-full right-0 bg-white shadow-md rounded w-52 py-2 z-50">
      <li><Link to="/messages-settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">أعدادات الرسائل</Link></li>
      <li><Link to="/sending-marketing-messages" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">أرسال رسائل تسويقية</Link></li>
      <li><Link to="/whatsapp-settings" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">أعدادات الواتساب</Link></li>
    </ul>
  )}
</li>

              <li>
                <Link to="/messages-settings" className='text-sm whitespace-nowrap text-white'>إعدادات SMS</Link>
              </li>
            </ul>

            <div className='hidden lg:block'>
              <h2 className='text-lg text-white font-bold'>مؤسسة حليمة محمد سالم جعفر التجارية</h2>
              <div className='flex items-center justify-between text-white text-sm'>
                <span className='border-l px-12 md:block hidden'>{formattedDate}</span>
                <span className=" border-white px-3">{formattedTime}</span>
              </div>
            </div>

            <ul className="flex items-center gap-4">

              {/* Small Screen: Left Icons Only */}
              <li className="lg:hidden">
                <a href="#" className="text-sm text-white relative">
    <IoNotifications className="text-xl" />
    <span className="absolute -top-3 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
      3
    </span>
  </a>
              </li>
              <li className="lg:hidden bg-[#0dcaf0] w-7 h-7 rounded-sm flex items-center justify-center">
                <a href="https://ta2geer-3.const-tech.in/ar" target='_blank' className='text-white'><FaPager className='text-xl' /></a>
              </li>
              <li className="lg:hidden flex items-center gap-2 text-sm whitespace-nowrap">
                <FaCircleUser className='w-7 h-7 text-white' />
              </li>
              

              <li className="hidden lg:block">
                <Link to="/program-additions" className='text-sm text-white font-semibold'>دليل المستخدم</Link>
              </li>
             <li className="hidden lg:block relative">
  <Link to = '/notifications' className="text-sm text-white relative">
    <IoNotifications className="text-xl" />
    <span className="absolute -top-3 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
      3
    </span>
  </Link>
</li>

              
              <li className="hidden  bg-[#0dcaf0] w-7 h-7 rounded-sm lg:flex items-center justify-center">
                <a href="https://ta2geer-3.const-tech.in/ar" target='_blank' className='text-sm text-white'><FaPager className='text-xl' /></a>
              </li>
            <li 
  className="hidden lg:flex items-center gap-2 text-sm whitespace-nowrap relative"
  onMouseEnter={() => setShowUserDropdown(true)}
  onMouseLeave={() => setShowUserDropdown(false)}
>
  <FaCircleUser className='w-7 h-7 text-white' />
  <span className='text-white'>ادارة القاعات/ الأستاذ نبيل</span>
  <FaChevronDown className='text-white' />

  {showUserDropdown && (
    <ul className="absolute top-full right-0 bg-white shadow-md rounded w-52 py-2 z-50">
      {/* <li>
        <Link to="/profile" className="block px-4 py-2 text-sm text-black hover:bg-gray-100">الملف الشخصي</Link>
      </li> */}
      <li>
 <button
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
    >
      تسجيل الخروج
    </button>      </li>
    </ul>
  )}
</li>

            </ul>
          </div>
        </div>
      </Container>

     {/* Mobile Side Menu */}
<div
  className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${showMenu ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
>
  {/* Close Button */}
  <div className="flex justify-end p-4 border-b border-gray-200">
    <button
      onClick={toggleMenu}
      className="text-black text-3xl font-bold hover:text-gray-600 transition-colors"
    >
      &times;
    </button>
  </div>

  {/* Menu Links */}
  <ul className="flex flex-col gap-2 px-5 py-6 text-black text-sm">
    <li>
      <Link
        to="/settings"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        الإعدادات
      </Link>
    </li>
    <li>
      <Link
        to="/ar/administration/transferred-patients"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        التحكم بالواجهة
      </Link>
    </li>
    <li>
      <Link
        to="/ar/administration/treatment-plans"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        أنواع المناسبات
      </Link>
    </li>
    <li>
      <Link
        to="/ar/administration/patient_groups"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        الخدمات
      </Link>
    </li>
    <li>
      <Link
        to="/ar/administration/offers"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        رسائل تواصل معنا
      </Link>
    </li>
    <li>
      <Link
        to="/ar/accounting"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        التقارير المحاسبية
      </Link>
    </li>
    <li>
      <Link
        to="/ar/appointments-transferred"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        المرضى المحولين
      </Link>
    </li>
    <li>
      <Link
        to="/ar/consultations"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        الاستشارات
      </Link>
    </li>
    <li>
      <Link
        to="/ar/guides"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        الدليل الإرشادي
      </Link>
    </li>
    <li>
      <Link
        to="/ar/program-additions"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        إضافات البرنامج
      </Link>
    </li>
    <li>
      <Link
        to="/ar/services"
        className="block px-4 py-2 rounded hover:bg-gray-100 transition-colors"
      >
        الخدمات
      </Link>
    </li>
  </ul>
</div>


      {/* Backdrop when menu is open */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default ToolBar;
