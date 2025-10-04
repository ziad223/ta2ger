import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";

const FinancialAdvance = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accountOptions = [
    { value: "hall1", label: "قاعة 1" },
    { value: "hall2", label: "قاعة 2" },
    { value: "hall3", label: "قاعة 3" },
  ];

  // ===== بيانات الجدول الأول =====
  const data1 = [
    {
      client: "شيخ1",
      bookingNumber: "RSV-000010",
      hall: "قاعة المعالي الكبرئ",
      date: "2025-09-18",
      contractAmount: "9,200.00",
      advance: "2,000.00",
      paid: "2,000.00",
      remaining: "7,200.00",
      percentage: "22%",
    },
    {
      client: "نبيل محمد سالم جعفر",
      bookingNumber: "RSV-000009",
      hall: "—",
      date: "2025-09-17",
      contractAmount: "24,725.00",
      advance: "2,000.00",
      paid: "2,000.00",
      remaining: "22,725.00",
      percentage: "8%",
    },
    {
      client: "شيخ1",
      bookingNumber: "RSV-000001",
      hall: "—",
      date: "2025-09-17",
      contractAmount: "18,400.00",
      advance: "2,000.00",
      paid: "2,100.00",
      remaining: "16,300.00",
      percentage: "11%",
    },
    {
      client: "شيخ1",
      bookingNumber: "RSV-000006",
      hall: "—",
      date: "2025-09-17",
      contractAmount: "17,250.00",
      advance: "500.00",
      paid: "500.00",
      remaining: "16,750.00",
      percentage: "3%",
    },
    {
      client: "شيخ1",
      bookingNumber: "RSV-000005",
      hall: "—",
      date: "2025-09-17",
      contractAmount: "5,750.00",
      advance: "100.00",
      paid: "400.00",
      remaining: "5,350.00",
      percentage: "7%",
    },
    {
      client: "شيخ1",
      bookingNumber: "RSV-000004",
      hall: "—",
      date: "2025-09-16",
      contractAmount: "8,280.00",
      advance: "1,500.00",
      paid: "2,050.00",
      remaining: "6,230.00",
      percentage: "25%",
    },
    {
      client: "شيخ1",
      bookingNumber: "RSV-000003",
      hall: "—",
      date: "2025-09-16",
      contractAmount: "5,750.00",
      advance: "2,000.00",
      paid: "2,500.00",
      remaining: "3,250.00",
      percentage: "43%",
    },
    {
      client: "شيخ1",
      bookingNumber: "RSV-000002",
      hall: "—",
      date: "2025-09-16",
      contractAmount: "12,198.05",
      advance: "200.00",
      paid: "5,000.00",
      remaining: "7,198.05",
      percentage: "41%",
    },
  ];

  const columns1 = [
    { key: "client", label: "اسم العميل" },
    { key: "bookingNumber", label: "رقم الحجز" },
    { key: "hall", label: "القاعة" },
    { key: "date", label: "تاريخ الحجز" },
    { key: "contractAmount", label: "مبلغ العقد" },
    { key: "advance", label: "المبلغ المقدم" },
    { key: "paid", label: "إجمالي المدفوع" },
    { key: "remaining", label: "المتبقي" },
    { key: "percentage", label: "نسبة السداد" },
  ];

  // ===== بيانات الجدول الثاني =====
  const data2 = [
    {
      hall: "—",
      count: "7",
      contracts: "92,353.05",
      advance: "8,300.00",
      paid: "14,550.00",
      remaining: "77,803.05",
    },
    {
      hall: "قاعة المعالي الكبرئ",
      count: "1",
      contracts: "9,200.00",
      advance: "2,000.00",
      paid: "2,000.00",
      remaining: "7,200.00",
    },
  ];

  const columns2 = [
    { key: "hall", label: "القاعة" },
    { key: "count", label: "عدد الحجوزات" },
    { key: "contracts", label: "إجمالي العقود" },
    { key: "advance", label: "إجمالي المقدم" },
    { key: "paid", label: "صافي المدفوع" },
    { key: "remaining", label: "المتبقي" },
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
            <h2 className="text-xl font-bold mt-1">تقرير المقدم المالى</h2>
          </div>

          {/* ====== الفلاتر ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">الموظف</label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="القاعة "
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">صفوف/صفحة</label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="صفوف/صفحة "
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

          {/* ====== الكروت ====== */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px] text-center">
              <h2 className="text-base font-medium">إجمالي العقود</h2>
              <h3 className="text-2xl font-extrabold">101,553.05</h3>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px] text-center">
              <h2 className="text-base font-medium">إجمالي المقدم</h2>
              <h3 className="text-2xl font-extrabold">10,300.00</h3>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px] text-center">
              <h2 className="text-base font-medium"> إجمالي المدفوع (صافي)</h2>
              <h3 className="text-2xl font-extrabold">16,550.00</h3>
            </div>
            <div className="bg-[#f8f9fa] rounded-lg flex flex-col gap-1 p-5 h-[100px] text-center">
              <h2 className="text-base font-medium">المتبقي</h2>
              <h3 className="text-2xl font-extrabold">85,003.05</h3>
            </div>
          </div>

          <div className="h-[60px] rounded-lg px-5 bg-[#f8f9fa] flex items-center justify-between w-full mb-6">
            <h2>صافي المدفوع خلال الفترة (حسب تاريخ عملية الدفع):</h2>
            <h3 className="font-extrabold">16,550.00</h3>
          </div>

          {/* ====== الجدول الأول ====== */}
          <Table columns={columns1} data={data1} />

          {/* ====== صف الإجماليات (منسق تحت بعض) ====== */}
         

          {/* ====== الجدول الثاني ====== */}
          <div className="mt-10">
            <h3 className="text-lg font-bold mb-3 text-gray-800 text-center">
              ملخص حسب القاعة
            </h3>
            <Table columns={columns2} data={data2} />
          </div>
           <div className="mt-6 border border-gray-300 rounded-lg overflow-hiddenmx-auto bg-gray-50">
            <table className="min-w-full text-center text-sm font-bold text-gray-700">
              <tbody>
                <tr>
                  <td className="border px-4 py-2">إجمالي العقود</td>
                  <td className="border px-4 py-2">101,553.05</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">إجمالي المقدم</td>
                  <td className="border px-4 py-2">10,300.00</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">إجمالي المدفوع (صافي)</td>
                  <td className="border px-4 py-2">16,550.00</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">المتبقي</td>
                  <td className="border px-4 py-2">85,003.05</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">المدفوع خلال الفترة</td>
                  <td className="border px-4 py-2">16,550.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FinancialAdvance;
