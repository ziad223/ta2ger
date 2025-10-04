import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaUser, FaBuilding, FaFileAlt, FaChartLine, FaMoneyBill, FaFileSignature, FaCalendar } from 'react-icons/fa';
import { IoMdHome, IoMdNotifications } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import ToolBar from './ToolBar';
import Container from '../shared/Container';
import { FaBarsProgress } from 'react-icons/fa6';
import { VscReport } from "react-icons/vsc";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const hideNavbarPaths = ['/login', '/family-login', '/ar'];
  const shouldHideNavbar = hideNavbarPaths.some(path => pathname.startsWith(path));

  if (shouldHideNavbar) return null;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false); // لغلق القائمة عند التنقل

  return (
    <>
      <ToolBar />
      <div className="bg-white">
        <Container>
          <div className="lg:w-full mx-auto py-2">
            <div className="flex justify-between items-center lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-2xl text-black focus:outline-none"
                aria-label="Toggle menu"
              >
                <FiMenu />
              </button>
            </div>

            {/* القائمة */}
            <ul
              className={`
                flex flex-col lg:flex-row gap-1 mt-3 lg:mt-0 
                ${menuOpen ? 'block' : 'hidden'} 
                lg:flex justify-center items-center 
                bg-white lg:bg-transparent p-4 lg:p-0 
                rounded-lg shadow-md lg:shadow-none transition-all duration-300
              `}
            >
              {[
                { to: '/', label: 'الرئيسية', icon: <IoMdHome size={20} /> },
                { to: '/clients', label: 'العملاء', icon: <FaUser size={18} /> },
                { to: '/halls', label: 'القاعات', icon: <FaBuilding size={18} /> },
                { to: '/reservations', label: 'الحجوزات', icon: <FaFileAlt size={18} /> },
                { to: '/invoices', label: 'الفواتير', icon: <FaChartLine size={18} /> },
                { to: '/new-invoices', label: 'الفواتير المبسطة', icon: <FaMoneyBill size={18} /> },
                { to: '/reports', label: 'التقارير', icon: <VscReport   size={18} /> },
                { to: '/accounting', label: ' المحاسبة', icon: <FaBarsProgress size={18} /> },
                { to: '/photo-gallery', label: 'المعرض', icon: <FaFileSignature size={18} /> },
                { to: '/alerts', label: 'التنبيهات', icon: <IoMdNotifications size={20} /> },
              ].map((item, index) => (
                <li key={index} className="w-full lg:w-auto">
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className="flex justify-between lg:justify-start items-center gap-1 text-black hover:text-[#09adce] transition duration-300 text-sm px-2 py-2 rounded-md hover:bg-gray-100 lg:hover:bg-transparent"
                  >
                    <span>{item.label}</span>
                    <span className="text-gray-500">{item.icon}</span>
                  </Link>
                </li>
              ))}

              {/* زر حجوزات الزوار */}
              <li className="w-full lg:w-auto">
                <Link
                  to="/reservations"
                  onClick={closeMenu}
                  className="text-white flex items-center justify-center lg:justify-start gap-1 bg-[#09adce] h-[38px] px-3 text-sm rounded-lg relative hover:bg-[#0cb4d9] transition"
                >
                  <div className="relative">
                    <IoMdNotifications size={20} />
                    <span className="absolute -top-1.5 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full shadow">
                      3
                    </span>
                  </div>
                  <span>حجوزات الزوار</span>
                </Link>
              </li>

              {/* زر جدول الحجوزات */}
              <li className="w-full lg:w-auto">
                <Link
                  to="/reservations-schedule"
                  onClick={closeMenu}
                  className="text-white flex items-center justify-center lg:justify-start gap-1 bg-[#09adce] h-[38px] px-3 text-sm rounded-lg hover:bg-[#0cb4d9] transition"
                >
                  <FaCalendar />
                  <span>جدول الحجوزات</span>
                </Link>
              </li>
            </ul>
          </div>
        </Container>

        {/* الخط السفلي */}
        <div className="w-full h-2 bg-[#09adce]"></div>
      </div>
    </>
  );
};

export default Navbar;
