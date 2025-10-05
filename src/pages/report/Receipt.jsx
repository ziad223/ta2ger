import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";
import { FaFileContract } from "react-icons/fa";

const Receipt = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const accountOptions = [
    { value: "account1", label: "حساب 1" },
    { value: "account2", label: "حساب 2" },
    { value: "account3", label: "حساب 3" },
  ];

  // 🔹 بيانات الجدول الجديدة
  const data = [
    { id: 1, fromAccount: "حساب المورد محمد نست", toAccount: "النقدية", date: "2025-09-16", taxNumber: "", type: "قبض", amount: 1500, tax: 225, total: 1725, description: "" },
    { id: 2, fromAccount: "حساب المورد محمد نست", toAccount: "النقدية", date: "2025-09-16", taxNumber: "", type: "صرف", amount: 10, tax: 0, total: 10, description: "" },
    { id: 3, fromAccount: "", toAccount: "", date: "", taxNumber: "", type: "الإجمالي", amount: 1510, tax: 225, total: 1735, description: "" },
  ];

  // 🔹 الأعمدة الجديدة
  const columns = [
    { key: "bondNumber", label: "رقم السند", render: (row, index) => index + 1 },
    { key: "fromAccount", label: "من حساب" },
    { key: "toAccount", label: "الى حساب" },
    { key: "date", label: "التاريخ" },
    { key: "taxNumber", label: "الرقم الضريبى" },
    { key: "type", label: "النوع" },
    { key: "amount", label: "المبلغ" },
    { key: "tax", label: "الضريبة" },
    { key: "total", label: "الإجمالي",
      render: (row) => (
        <span className={row.type === "الإجمالي" ? "font-bold text-[#09adce]" : ""}>
          {row.total.toLocaleString("ar-EG", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    { key: "description", label: "الوصف" },
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-8">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">النوع</label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="النوع"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">الضريبة</label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="الضريبة"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 mb-6">
            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">1,735.00</h2>
                <h3 className="text-lg font-semibold">اجمالى السندات</h3>
              </div>
            </div>

            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">1,725.00</h2>
                <h3 className="text-lg font-semibold">اجمالى سندات القبض</h3>
              </div>
            </div>

            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">10.00</h2>
                <h3 className="text-lg font-semibold">اجمالى سندات الصرف</h3>
              </div>
            </div>

            <div className="bg-[#5394cd] relative text-white rounded-sm flex items-center p-5 h-[130px]">
              <div className="flex-shrink-0 h-full w-[50px] flex items-center justify-center">
                <FaFileContract className="h-full w-auto opacity-50" />
              </div>
              <div className="flex flex-col gap-1 mr-4">
                <h2 className="text-3xl font-bold">225.00</h2>
                <h3 className="text-lg font-semibold">اجمالى ضريبة السندات</h3>
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

export default Receipt;
