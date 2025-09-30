import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import { FaArrowLeft } from 'react-icons/fa';
import CustomSelect from '../../components/shared/CustomSelect';
import { Link } from 'react-router-dom';

// جدول
const Table = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto w-full mt-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`text-xs text-center font-bold text-gray-700 px-4 py-3 whitespace-nowrap ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border border-gray-200 hover:bg-gray-50"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-3 py-3 text-xs border border-gray-200 text-center text-gray-800 whitespace-nowrap font-bold ${col.className || ''}`}
                  >
                    {col.render ? col.render(row, rowIndex) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-5 text-gray-500 font-bold"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const AccountSettings = () => {
  // خيارات الحسابات (أي حاجة)
  const accountOptions = [
    { value: 'acc1', label: 'حساب 1' },
    { value: 'acc2', label: 'حساب 2' },
    { value: 'acc3', label: 'حساب 3' },
    { value: 'acc4', label: 'حساب 4' },
  ];

  // بيانات الخدمات مع القيم الافتراضية للحسابات
  const [rows, setRows] = useState([
    { id: 1, service: 'المبيعات', account: { value: 'acc1', label: 'إيرادات المبيعات' } },
    { id: 2, service: 'ضريبة المبيعات', account: { value: 'acc2', label: 'ضريبة القيمة المضافة على المبيعات' } },
    { id: 3, service: 'المشتريات', account: { value: 'acc3', label: 'مشتريات بضائع' } },
    { id: 4, service: 'ضريبة المشتريات', account: { value: 'acc4', label: 'ضريبة القيمة المضافة على المشتريات' } },
    { id: 5, service: 'العملاء', account: { value: 'acc1', label: 'العملاء' } },
    { id: 6, service: 'المصروفات', account: { value: null, label: 'اختر' } },
    { id: 7, service: 'ضريبة المصروفات', account: { value: 'acc2', label: 'ضريبة القيمة المضافة على المشتريات' } },
    { id: 8, service: 'الموظفين', account: { value: 'acc3', label: 'مصاريف مستحقة' } },
    { id: 9, service: 'الموردين', account: { value: 'acc4', label: 'الموردون' } },
    { id: 10, service: 'مردودات المبيعات', account: { value: 'acc1', label: 'مردودات المبيعات' } },
    { id: 11, service: 'مردودات المشتريات', account: { value: 'acc2', label: 'مردودات المشتريات' } },
    { id: 12, service: 'خصم مسموح به', account: { value: null, label: 'اختر' } },
    { id: 13, service: 'خصم مكتسب', account: { value: null, label: 'اختر' } },
    { id: 14, service: 'نقدا', account: { value: 'acc3', label: 'الصندوق الرئيسي' } },
    { id: 15, service: 'تحويل بنكي', account: { value: 'acc4', label: 'حسابات بنكية' } },
    { id: 16, service: 'شبكة', account: { value: 'acc1', label: 'حسابات بنكية' } },
    { id: 17, service: 'الحساب الرئيسي لطرق دفع (محافظ إلكترونية)', account: { value: 'acc2', label: 'حسابات بنكية' } },
    { id: 18, service: 'الحساب الرئيسي لطرق دفع (شيك)', account: { value: 'acc3', label: 'أوراق قبض' } },
    { id: 19, service: 'Gift Card', account: { value: 'acc4', label: 'الخصوم المتداولة' } },
    { id: 20, service: 'Money Order', account: { value: 'acc1', label: 'حسابات بنكية' } },
  ]);

  // الأعمدة
  const columns = [
    { key: 'id', label: '#', className: 'w-[10%]' },
    { key: 'service', label: 'الخدمة', className: 'w-[40%]' },
    {
      key: 'account',
      label: 'الحساب',
      className: 'w-[50%]',
      render: (row, rowIndex) => (
        <CustomSelect
          options={accountOptions}
          value={row.account}
          onChange={(selected) => {
            const updated = [...rows];
            updated[rowIndex].account = selected;
            setRows(updated);
          }}
          placeholder="اختر الحساب"
          className="text-sm text-start"
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen my-20">
      <Container>
        <div>
          <h2 className="text-xl font-bold">ادارة المحاسبة</h2>
          <div className="mt-8 flex items-center w-full justify-between">
            <Link to = '/accounting' className="bg-slate-900 font-bold rounded-lg text-white p-4 h-[40px] cursor-pointer flex items-center justify-center gap-2">
              <FaArrowLeft />
              <span>العودة</span>
            </Link>
            <button
              className="bg-green-700 font-bold rounded-lg text-white p-4 h-[40px] cursor-pointer flex items-center justify-center gap-2"
              onClick={() => console.log('Saved Data:', rows)}
            >
              حفظ
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-5 mt-8">
            <h3 className="bg-[#cff4fc] p-5 text-blue-900 text-base rounded-lg">
              يمكنك تحديد الحسابات وربطها بالفواتير
            </h3>
            <div className="mt-5">
              <Table columns={columns} data={rows} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountSettings;
