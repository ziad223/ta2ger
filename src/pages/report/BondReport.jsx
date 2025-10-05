import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";
import { FaFileContract } from "react-icons/fa";

const BondReport = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const accountOptions = [
    { value: "hall1", label: "قاعة 1" },
    { value: "hall2", label: "قاعة 2" },
    { value: "hall3", label: "قاعة 3" },
  ];

  // 🔹 بيانات الجدول الجديدة
  const data = [
    { id: 7, bondNumber: 3, invoiceNumber: 3, employee: "ادارة القاعات/ الأستاذ نبيل", client: "شيخ1", date: "2025-09-16", status: "دائن", amount: 500, paymentMethod: "" },
    { id: 8, bondNumber: 4, invoiceNumber: 4, employee: "ادارة القاعات/ الأستاذ نبيل", client: "شيخ1", date: "2025-09-16", status: "دائن", amount: 50, paymentMethod: "" },
    { id: 9, bondNumber: 5, invoiceNumber: 5, employee: "ادارة القاعات/ الأستاذ نبيل", client: "شيخ1", date: "2025-09-17", status: "دائن", amount: 100, paymentMethod: "" },
    { id: 10, bondNumber: 5, invoiceNumber: 5, employee: "ادارة القاعات/ الأستاذ نبيل", client: "شيخ1", date: "2025-09-17", status: "دائن", amount: 100, paymentMethod: "" },
    { id: 11, bondNumber: 7, invoiceNumber: 7, employee: "عبدالله / قاعة ريفال", client: "شيخ1", date: "2025-09-17", status: "دائن", amount: 100, paymentMethod: "" },
    { id: 12, bondNumber: "", invoiceNumber: "", employee: "الإجمالي", client: "", date: "", status: "", amount: 850.0, paymentMethod: "" },
  ];

  // 🔹 الأعمدة الجديدة
  const columns = [
    { key: "bondNumber", label: "رقم السند" },
    { key: "invoiceNumber", label: "رقم الفاتورة" },
    { key: "employee", label: "الموظف" },
    { key: "client", label: "العميل" },
    { key: "date", label: "التاريخ" },
    { key: "status", label: "الحاله" },
    { 
      key: "amount", 
      label: "المبلغ",
      render: (row) => (
        <span className={row.employee === "الإجمالي" ? "font-bold text-[#09adce]" : ""}>
          {row.amount.toLocaleString("ar-EG", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    { key: "paymentMethod", label: "طريقة الدفع" },
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
            <h2 className="text-xl font-bold mt-1">تقرير السندات</h2>
          </div>

          {/* ====== الفلاتر ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
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
            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">850.00</h2>
                <h3 className="text-2xl font-semibold">الكل</h3>
              </div>
            </div>

            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">800.00</h2>
                <h3 className="text-2xl font-semibold">نقدا</h3>
              </div>
            </div>

            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">0.00</h2>
                <h3 className="text-2xl font-semibold">شبكة</h3>
              </div>
            </div>
          </div>

          {/* ====== الجدول ====== */}
          <Table columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default BondReport;
