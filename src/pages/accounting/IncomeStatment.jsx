import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import CustomSelect from '../../components/shared/CustomSelect';
import Table from '../../components/shared/Table';
import { FaFileExcel, FaPrint } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const IncomeStatement = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accountOptions = [
    { value: 'all', label: '1' },
    { value: 'revenues', label: '2' },
    { value: 'expenses', label: '3' },
  ];

  // الأعمدة الجديدة
  const columns = [
    { key: 'accountNumber', label: 'رقم الحساب' },
    { key: 'accountName', label: 'اسم الحساب' },
    { key: 'balance', label: 'الرصيد' },
  ];

  // البيانات الجديدة
  const data = [
    { accountNumber: '4001', accountName: 'الإيرادات', balance: '73.50' },
    { accountNumber: '5001', accountName: 'المصروفات', balance: '-26.00' },
  ];

  // بيانات البند والمبالغ
  const summaryColumns = [
    { key: 'item', label: 'البند' },
    { key: 'amount', label: 'المبلغ' },
  ];

  const summaryData = [
    { item: 'إجمالي الإيرادات', amount: '73.50' },
    { item: 'إجمالي المصروفات', amount: '0.00' },
    { item: 'صافي الربح', amount: '73.50' },
  ];

  // دالة الطباعة
  const handlePrint = () => {
    window.print();
  };

  // دالة تصدير إلى Excel
  const handleExportExcel = () => {
    const worksheet1 = XLSX.utils.json_to_sheet(data);
    const worksheet2 = XLSX.utils.json_to_sheet(summaryData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, 'التفاصيل');
    XLSX.utils.book_append_sheet(workbook, worksheet2, 'الملخص');

    XLSX.writeFile(workbook, 'قائمة-الدخل.xlsx');
  };

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold mb-6">قائمة الدخل</h2>
            <div className="flex items-center gap-3">
              {/* زر الطباعة */}
              <button
                onClick={handlePrint}
                className="flex items-center justify-center p-2 gap-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition"
              >
                <FaPrint className="text-lg" />
                <span>طباعة</span>
              </button>

              {/* زر تصدير Excel */}
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
            {/* المستوي */}
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

            {/* من */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">من</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>

            {/* إلى */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">إلى</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              />
            </div>
          </div>

          {/* الجدول الأول */}
          <Table columns={columns} data={data} />

          {/* الجدول الثاني */}
          <div className="mt-10">
            <Table columns={summaryColumns} data={summaryData} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default IncomeStatement;
