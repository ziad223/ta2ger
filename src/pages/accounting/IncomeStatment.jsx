"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/shared/Container";
import CustomSelect from "../../components/shared/CustomSelect";
import Table from "../../components/shared/Table";
import { FaChevronRight, FaFileExcel, FaPrint } from "react-icons/fa";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import apiServiceCall from "../../utils/apiServiceCall";
import { toast } from "react-toastify";

const IncomeStatement = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [data, setData] = useState([]); // جدول الحسابات
  const [summaryData, setSummaryData] = useState([]); // جدول الملخص
  const [loading, setLoading] = useState(false);

  const accountOptions = [
    { value: "all", label: "1" },
    { value: "revenues", label: "2" },
    { value: "expenses", label: "3" },
  ];

  // أعمدة الجدول
  const columns = [
    { key: "accountNumber", label: "رقم الحساب" },
    { key: "accountName", label: "اسم الحساب" },
    { key: "balance", label: "الرصيد" },
  ];

  // أعمدة الملخص
  const summaryColumns = [
    { key: "item", label: "البند" },
    { key: "amount", label: "المبلغ" },
  ];

  // 🔹 جلب البيانات من API
  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await apiServiceCall({
        url: "accounting/income-statement",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.status && response?.data) {
        const { accounts, total_revuene, total_expenses, net } = response.data;
        const formattedAccounts = accounts.map((acc) => ({
          accountNumber: acc.code,
          accountName: acc.text,
          balance: "—", 
        }));

        setData(formattedAccounts);

        // تجهيز بيانات الجدول الثاني (الملخص)
        setSummaryData([
          { item: "إجمالي الإيرادات", amount: total_revuene?.toFixed(2) || "0.00" },
          { item: "إجمالي المصروفات", amount: total_expenses?.toFixed(2) || "0.00" },
          { item: "صافي الربح", amount: net?.toFixed(2) || "0.00" },
        ]);
      } else {
        toast.error(response?.message || "فشل في تحميل البيانات ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء جلب البيانات ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 الطباعة
  const handlePrint = () => {
    window.print();
  };

  // 🔹 تصدير Excel
  const handleExportExcel = () => {
    const worksheet1 = XLSX.utils.json_to_sheet(data);
    const worksheet2 = XLSX.utils.json_to_sheet(summaryData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "التفاصيل");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "الملخص");

    XLSX.writeFile(workbook, "قائمة-الدخل.xlsx");
  };

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <Link
                to="/accounting"
                className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer"
              >
                <FaChevronRight />
              </Link>
              <h2 className="text-xl font-bold">قائمة الدخل</h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center p-2 gap-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition"
              >
                <FaPrint className="text-lg" />
                <span>طباعة</span>
              </button>

              <button
                onClick={handleExportExcel}
                className="flex items-center justify-center p-2 gap-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
              >
                <FaFileExcel className="text-lg" />
                <span>تصدير اكسيل</span>
              </button>
            </div>
          </div>

          {/* الحقول */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                المستوي
              </label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="اختر الحساب"
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

          {/* الجدول الأول */}
          {loading ? (
            null
          ) : (
            <Table columns={columns} data={data} />
          )}

          {/* الجدول الثاني */}
          {!loading && summaryData.length > 0 && (
            <div className="mt-10">
              <Table columns={summaryColumns} data={summaryData} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default IncomeStatement;
