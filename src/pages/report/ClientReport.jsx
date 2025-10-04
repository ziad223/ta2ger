import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";

const ClientReport = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accountOptions = [
    { value: "client1", label: "العميل 1" },
    { value: "client2", label: "العميل 2" },
    { value: "client3", label: "العميل 3" },
  ];

  // 🔹 بيانات الجدول
  const data = [
    {
      contractNumber: "RSV-000010",
      contractDate: "2025-09-18",
      contractAmount: "9,200",
      paid: "2,000",
      remaining: "7,200",
      delay: "18 أيام",
    },
    {
      contractNumber: "RSV-000001",
      contractDate: "2025-09-17",
      contractAmount: "18,400",
      paid: "2,100",
      remaining: "16,300",
      delay: "19 أيام",
    },
    {
      contractNumber: "RSV-000006",
      contractDate: "2025-09-17",
      contractAmount: "17,250",
      paid: "500",
      remaining: "16,750",
      delay: "19 أيام",
    },
    {
      contractNumber: "RSV-000005",
      contractDate: "2025-09-18",
      contractAmount: "5,750",
      paid: "400",
      remaining: "5,350",
      delay: "18 أيام",
    },
    {
      contractNumber: "RSV-000004",
      contractDate: "2025-09-24",
      contractAmount: "8,280",
      paid: "2,050",
      remaining: "6,230",
      delay: "12 أيام",
    },
    {
      contractNumber: "RSV-000003",
      contractDate: "2025-09-20",
      contractAmount: "5,750",
      paid: "2,500",
      remaining: "3,250",
      delay: "16 أيام",
    },
    {
      contractNumber: "RSV-000002",
      contractDate: "2025-09-19",
      contractAmount: "12,198.05",
      paid: "5,000",
      remaining: "7,198.05",
      delay: "17 أيام",
    },
    {
      contractNumber: "RSV-000001",
      contractDate: "2025-09-16",
      contractAmount: "1,380",
      paid: "0",
      remaining: "1,380",
      delay: "20 أيام",
    },
  ];

  // 🔹 الأعمدة
  const columns = [
    { key: "contractNumber", label: "رقم العقد" },
    { key: "contractDate", label: "تاريخ العقد" },
    { key: "contractAmount", label: "مبلغ العقد" },
    { key: "paid", label: "المدفوع" },
    { key: "remaining", label: "المتبقي" },
    { key: "delay", label: "التأخير" },
  ];

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          {/* ====== العنوان ====== */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              to="/report/client-report"
              className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer"
            >
              <FaChevronRight />
            </Link>
            <h2 className="text-xl font-bold mt-1">تقرير العميل</h2>
          </div>

          {/* ====== الحقول ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
            {/* العميل */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                العميل
              </label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="اختر العميل"
              />
            </div>

            {/* من */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                من
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>

            {/* إلى */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                إلى
              </label>
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

export default ClientReport;
