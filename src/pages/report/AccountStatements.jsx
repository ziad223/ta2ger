import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa6';
import CustomSelect from '../../components/shared/CustomSelect';
import Table from '../../components/shared/Table';

const AccountStatements = () => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const accountOptions = [
    { value: 'hall1', label: 'قاعة 1' },
    { value: 'hall2', label: 'قاعة 2' },
    { value: 'hall3', label: 'قاعة 3' },
  ];

  // 🔹 بيانات الجدول
  const data = [
    { id: 1, section: 'إجمالي الفواتير - نقدا', quantity: 26755 },
    { id: 2, section: 'إجمالي الفواتير - شبكة', quantity: 14550 },
    { id: 3, section: 'اجمالي الفواتير المسددة', quantity: 0 },
    { id: 4, section: 'اجمالي الفواتير الغير مسددة', quantity: 1380 },
    { id: 5, section: 'اجمالي الضريبة', quantity: 13426.05 },
    { id: 6, section: 'ضريبة القيمة المضافة المحصلة (مخرجات)', quantity: 13426.05 },
    { id: 7, section: 'ضريبة القيمة المضافة المحصلة (مدخلات)', quantity: 0 },
    { id: 8, section: 'ضريبة القيمة المضافة على المشتريات', quantity: 0 },
    { id: 9, section: 'اجمالي المصروفات', quantity: 0 },
    { id: 10, section: 'اجمالي المشتريات', quantity: 0 },
    { id: 11, section: 'ارباح الخدمات', quantity: -3 },
  ];

  const total = 56108.05;

  // 🔹 الأعمدة
  const columns = [
    {
      key: 'checkbox',
      label: '',
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRows([...selectedRows, row.id]);
            } else {
              setSelectedRows(selectedRows.filter((id) => id !== row.id));
            }
          }}
          className="w-4 h-4 cursor-pointer"
        />
      ),
    },
    { key: 'section', label: 'القسم' },
    { key: 'quantity', label: 'الكمية' },
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
            <h2 className="text-xl font-bold mt-1">كشف حساب عام</h2>
          </div>

          {/* ====== الحقول ====== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-8">
            {/* اسم القاعة */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                اسم القاعة
              </label>
              <CustomSelect
                options={accountOptions}
                value={selectedAccount}
                onChange={setSelectedAccount}
                placeholder="اسم القاعة"
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

          {/* ====== الجدول ====== */}
          <Table columns={columns} data={data} />

        </div>
      </Container>
    </div>
  );
};

export default AccountStatements;
