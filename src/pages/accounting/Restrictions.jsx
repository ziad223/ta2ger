import React, { useState } from 'react';
import Container from '../../components/shared/Container';
import { Link } from 'react-router-dom';
import { FaArrowLeftLong, FaPlus, FaPrint } from 'react-icons/fa6';
import { FaEye, FaEdit, FaTrash, FaRegTrashAlt } from 'react-icons/fa';
import Table from '../../components/shared/Table';
import ViewModal from './ViewModal';
import EditModal from './EditModal';

const Restrictions = () => {
  // البيانات التجريبية
  const [data, setData] = useState([
    { id: 1, name: 'قيد رقم 1', debit: 2000, credit: 2000, date: '2025-09-01' },
    { id: 2, name: 'قيد رقم 2', debit: 1500, credit: 1500, date: '2025-09-15' },
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  // الأعمدة
  const columns = [
    { key: 'id', label: '#' },
    { key: 'name', label: 'الاسم' },
    { key: 'debit', label: 'مدين' },
    { key: 'credit', label: 'دائن' },
    { key: 'date', label: 'التاريخ' },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          {/* معاينة */}
          <button
            onClick={() => {
              setSelectedRow(row);
              setViewOpen(true);
            }}
            className="p-2 bg-[#8e44ad] text-white rounded-md"
          >
            <FaEye className='text-lg' />
          </button>

          {/* تعديل */}
          <button
            onClick={() => {
              setSelectedRow(row);
              setEditOpen(true);
            }}
            className="p-2 bg-[#0dcaf0] text-white rounded-md"
          >
            <FaEdit className='text-lg' />
          </button>

          {/* حذف */}
          <button
            onClick={() => {
              if (window.confirm('هل أنت متأكد من حذف هذا القيد؟')) {
                setData(data.filter((d) => d.id !== row.id));
              }
            }}
            className="p-2 bg-[#dc3545] text-white rounded-md"
          >
            <FaRegTrashAlt className='text-lg' />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="my-20 min-h-screen">
      <Container>
        {/* العنوان + الأزرار */}
        <div className="bg-white shadow-lg rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">القيود اليومية</h2>

            <div className="flex items-center gap-3">
              {/* العودة */}
              <Link
                to="/accounting"
                className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-gray-500 font-bold hover:bg-gray-600 transition"
              >
                <FaArrowLeftLong className="text-lg" />
                <span>العودة</span>
              </Link>

              {/* إضافة قيد */}
              <button className="flex items-center gap-2 px-4 py-2 rounded-md text-white bg-[#09adce] font-bold hover:bg-[#0b9cb9] transition">
                <FaPlus className="text-lg" />
                <span>إضافة قيد</span>
              </button>

              {/* طباعة */}
              <button className="flex items-center justify-center w-[42px] h-[42px] rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition">
                <FaPrint className="text-lg" />
              </button>
            </div>
          </div>

          {/* الجدول */}
          <Table columns={columns} data={data} />
        </div>
      </Container>

      {/* مودال المعاينة */}
      {viewOpen && (
        <ViewModal row={selectedRow} onClose={() => setViewOpen(false)} />
      )}

      {/* مودال التعديل */}
      {editOpen && (
        <EditModal
          row={selectedRow}
          onClose={() => setEditOpen(false)}
          onSave={(updated) => {
            setData(
              data.map((d) => (d.id === updated.id ? { ...updated } : d))
            );
            setEditOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Restrictions;
