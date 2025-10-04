import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";

const EmployeeReport = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const accountOptions = [
    { value: "hall1", label: "قاعة 1" },
    { value: "hall2", label: "قاعة 2" },
    { value: "hall3", label: "قاعة 3" },
  ];

  // 🔹 بيانات الجدول
  const data = [
    { id: 1, employee: "ادارة القاعات/ الأستاذ نبيل", halls: 1, bookings: 7, total: 59808.05 },
    { id: 2, employee: "الاستاذ / أحمد", halls: 1, bookings: 0, total: 0.0 },
    { id: 3, employee: "الاستاذ حيدر محاسب القاعات", halls: 0, bookings: 0, total: 0.0 },
    { id: 4, employee: "عبدالله / قاعة ريفال", halls: 0, bookings: 1, total: 18400.0 },
    { id: 5, employee: "قاعة المعالي ياسر", halls: 0, bookings: 1, total: 24725.0 },
    // 🔹 صف الإجمالي داخل الجدول
    { id: 6, employee: "الإجمالي", halls: 2, bookings: 9, total: 102933.05 },
  ];

  // 🔹 الأعمدة
  const columns = [
    { key: "employee", label: "الموظف" },
    { key: "halls", label: "عدد القاعات" },
    { key: "bookings", label: "عدد الحجوزات" },
    {
      key: "total",
      label: "إجمالي الحجوزات",
      render: (row) => (
        <span className={row.employee === "الإجمالي" ? "font-bold text-[#09adce]" : ""}>
          {row.total.toLocaleString("ar-EG", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
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
            <h2 className="text-xl font-bold mt-1">تقرير الموظفين</h2>
          </div>

          {/* ====== الفلاتر ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
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

          {/* ====== كروت الإحصائيات ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px]">
              <h2 className="text-xl">إجمالي القاعات</h2>
              <h3 className="text-2xl font-semibold">2</h3>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px]">
              <h2 className="text-xl">إجمالي الحجوزات</h2>
              <h3 className="text-2xl font-semibold">9</h3>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px]">
              <h2 className="text-xl">إجمالي مبالغ الحجوزات</h2>
              <h3 className="text-2xl font-semibold">102,933.05</h3>
            </div>
          </div>

          {/* ====== الجدول ====== */}
          <Table columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default EmployeeReport;
