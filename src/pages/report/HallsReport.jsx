import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";
import { FaCheckCircle, FaClock, FaFileContract, FaHourglass } from "react-icons/fa";

const HallsReport = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const accountOptions = [
    { value: "hall1", label: "قاعة 1" },
    { value: "hall2", label: "قاعة 2" },
    { value: "hall3", label: "قاعة 3" },
  ];

  // 🔹 بيانات الجدول الجديدة
  const data = [
    { id: 1, hall: "قاعة المعالي الكبرئ", employee: "ادارة القاعات/ الأستاذ نبيل", bookings: 10, client: "شيخ1", bookingDate: "2025-09-18", totalAmount: 9200, advance: 2000, overdue: 7200, status: "مدفوعة جزئيا" },
    { id: 2, hall: "قاعة المعالي ياسر", employee: "نبيل محمد سالم جعفر", bookings: 9, client: "شيخ1", bookingDate: "2025-10-14", totalAmount: 24725, advance: 2000, overdue: 22725, status: "مدفوعة جزئيا" },
    { id: 3, hall: "عبدالله / قاعة ريفال", employee: "شيخ1", bookings: 7, client: "شيخ1", bookingDate: "2025-09-17", totalAmount: 18400, advance: 2000, overdue: 16300, status: "مدفوعة جزئيا" },
    { id: 4, hall: "ادارة القاعات/ الأستاذ نبيل", employee: "شيخ1", bookings: 6, client: "شيخ1", bookingDate: "2025-09-17", totalAmount: 17250, advance: 500, overdue: 16750, status: "مدفوعة جزئيا" },
    { id: 5, hall: "ادارة القاعات/ الأستاذ نبيل", employee: "شيخ1", bookings: 5, client: "شيخ1", bookingDate: "2025-09-18", totalAmount: 5750, advance: 100, overdue: 5350, status: "مدفوعة جزئيا" },
    { id: 6, hall: "ادارة القاعات/ الأستاذ نبيل", employee: "شيخ1", bookings: 4, client: "شيخ1", bookingDate: "2025-09-24", totalAmount: 8280, advance: 1500, overdue: 6230, status: "مدفوعة جزئيا" },
    { id: 7, hall: "ادارة القاعات/ الأستاذ نبيل", employee: "شيخ1", bookings: 3, client: "شيخ1", bookingDate: "2025-09-20", totalAmount: 5750, advance: 2000, overdue: 3250, status: "مدفوعة جزئيا" },
    { id: 8, hall: "ادارة القاعات/ الأستاذ نبيل", employee: "شيخ1", bookings: 2, client: "شيخ1", bookingDate: "2025-09-19", totalAmount: 12198.05, advance: 200, overdue: 7198.05, status: "مدفوعة جزئيا" },
    { id: 9, hall: "", employee: "الإجمالي", bookings: "", client: "", bookingDate: "", totalAmount: 101553.05, advance: 10300, overdue: 85003.05, status: "" },
  ];

  // 🔹 الأعمدة الجديدة
  const columns = [
    { key: "hall", label: "القاعة" },
    { key: "employee", label: "الموظف" },
    { key: "bookings", label: "الحجز" },
    { key: "client", label: "العميل" },
    { key: "bookingDate", label: "تاريخ الحجز" },
    { key: "totalAmount", label: "المبلغ الاجمالي",
      render: (row) => (
        <span className={row.employee === "الإجمالي" ? "font-bold text-[#09adce]" : ""}>
          {row.totalAmount.toLocaleString("ar-EG", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    { key: "advance", label: "المقدم" },
    { key: "overdue", label: "المتاخر" },
    { key: "status", label: "حاله الحجز" },
  ];

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          {/* ====== العنوان ====== */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/report"
              className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer"
            >
              <FaChevronRight />
            </Link>
            <h2 className="text-xl font-bold mt-1">تقرير القاعات</h2>
          </div>

          {/* ====== كروت الإحصائيات ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">101,553.05</h2>
                <h3 className="text-2xl font-semibold">كل المبالغ</h3>
              </div>
            </div>

            <div className="bg-[#48c7be] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaHourglass className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold ">10,300.00</h2>
                <h3 className="text-2xl font-semibold">رصيد العربون</h3>
              </div>
            </div>

            <div className="bg-[#9478b1] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaCheckCircle className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">16,550.00</h2>
                <h3 className="text-xl font-semibold">رصيد كل المدفوع</h3>
              </div>
            </div>

            <div className="bg-[#e0544b] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaClock className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">85,003.05</h2>
                <h3 className="text-xl font-semibold">رصيد كامل المتاخر </h3>
              </div>
            </div>
          </div>

          {/* ====== الفلاتر ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">الموظف</label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="الموظف "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">القاعة</label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="الموظف "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">من</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">إلى</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>
          </div>

          {/* ====== الجدول ====== */}
          <Table columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default HallsReport;
