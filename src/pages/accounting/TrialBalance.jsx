import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import CustomSelect from '../../components/shared/CustomSelect';
import Table from '../../components/shared/Table';
import { FaFileExcel, FaPrint } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const TrialBalance = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const accountOptions = [
    { value: 'all', label: 'الكل' },
    { value: 'assets', label: 'الأصول' },
    { value: 'liabilities', label: 'الخصوم' },
  ];

  const yearOptions = [
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    { value: '2023', label: '2023' },
  ];

  // الأعمدة الجديدة
  const columns = [
    { key: 'accountNumber', label: 'رقم الحساب' },
    { key: 'accountName', label: 'اسم الحساب' },
    { key: 'openingDebit', label: 'الرصيد الافتتاحي - مدين' },
    { key: 'openingCredit', label: 'الرصيد الافتتاحي - دائن' },
    { key: 'annualDebit', label: 'الحركة السنوية - مدين' },
    { key: 'annualCredit', label: 'الحركة السنوية - دائن' },
    { key: 'balance', label: 'الرصيد' },
  ];

  // البيانات الجديدة
  const data = [
    {
      accountNumber: '1',
      accountName: 'الأصول',
      openingDebit: '0',
      openingCredit: '0',
      annualDebit: '456.40',
      annualCredit: '338.35',
      balance: '118.05',
    },
    {
      accountNumber: '1001',
      accountName: 'الأصول المتداولة',
      openingDebit: '0',
      openingCredit: '0',
      annualDebit: '456.40',
      annualCredit: '338.35',
      balance: '118.05',
    },
  ];

  // دالة الطباعة
  const handlePrint = () => {
    window.print();
  };

  // دالة تصدير إلى Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ميزان المراجعة');
    XLSX.writeFile(workbook, 'ميزان-المراجعة.xlsx');
  };

  return (
    <div className="my-20 min-h-screen">
      <Container>
        <div className="bg-white shadow-lg rounded-lg p-5">
          <h2 className="text-xl font-bold mb-6">ميزان مراجعة الحسابات</h2>

          {/* الحقول + الأزرار */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-10">
            {/* بحث بالحساب */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                بحث بالحساب
              </label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="اختر الحساب"
              />
            </div>

            {/* السنة */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                السنة
              </label>
              <CustomSelect
                options={yearOptions}
                value={selectedYear}
                onChange={setSelectedYear}
                placeholder="اختر السنة"
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

            {/* الأزرار */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center justify-center px-3 py-2 gap-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition w-full"
              >
                <FaPrint className="text-lg" />
                <span>طباعة</span>
              </button>
              <button
                onClick={handleExportExcel}
                className="flex items-center justify-center px-3 py-2 gap-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition w-full"
              >
                <FaFileExcel className="text-lg" />
                <span>اكسيل</span>
              </button>
            </div>
          </div>

          {/* الجدول */}
          <Table columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default TrialBalance;
