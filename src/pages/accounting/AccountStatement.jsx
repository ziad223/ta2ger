import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import { Link } from 'react-router-dom';
import { FaPrint, FaChevronRight } from 'react-icons/fa6';
import CustomSelect from '../../components/shared/CustomSelect';
import Table from '../../components/shared/Table';

const AccountStatement = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);

  const accountOptions = [
    { value: 'cash', label: 'النقدية' },
    { value: 'bank', label: 'البنك' },
    { value: 'clients', label: 'العملاء' },
  ];

  const columns = [
    { key: 'date', label: 'التاريخ' },
    { key: 'desc', label: 'البيان' },
    { key: 'number', label: 'رقم القيد' },
    { key: 'debit', label: 'مدين' },
    { key: 'credit', label: 'دائن' },
    { key: 'balance', label: 'الرصيد' },
    { key: 'costCenter', label: 'مركز التكلفة' },
  ];

  const data = [
    {
      date: '2025-09-01',
      desc: 'قيد افتتاحي',
      number: '1001',
      debit: '5000',
      credit: '0',
      balance: '5000',
      costCenter: 'الإدارة',
    },
    {
      date: '2025-09-05',
      desc: 'تحصيل نقدي',
      number: '1002',
      debit: '0',
      credit: '2000',
      balance: '3000',
      costCenter: 'المبيعات',
    },
  ];

  return (
    <div className="my-20 min-h-screen">
      <Container>
        {/* العنوان + الأزرار */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/accounting"
                className="bg-gray-500 rounded-lg p-2 text-white font-semibold cursor-pointer"
              >
                <FaChevronRight />
              </Link>
              <h2 className="text-xl font-bold mt-1">كشف حساب عام</h2>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/restrictions"
                className="flex items-center gap-2 px-4 py-1.5 rounded-md text-white bg-green-700 font-bold hover:bg-gray-600 transition"
              >
                القيود اليومية
              </Link>

              <Link
                to="/account-tree"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-[#09adce] font-bold hover:bg-[#0b9cb9] transition"
              >
                شجرة الحسابات
              </Link>

              {/* طباعة */}
              <button className="flex items-center justify-center w-[42px] h-[42px] rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition">
                <FaPrint className="text-lg" />
              </button>
            </div>
          </div>

          {/* الحقول */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {/* الحساب */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                الحساب
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

          {/* الجدول */}
          <Table columns={columns} data={data} />
        </div>
      </Container>
    </div>
  );
};

export default AccountStatement;
