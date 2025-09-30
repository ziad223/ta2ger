import React, { useState } from 'react';

const EditModal = ({ row, onClose, onSave }) => {
  const [form, setForm] = useState(row || {});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(form);
  };

  if (!row) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="text-lg font-bold mb-4">تعديل القيد</h3>

        <div className="flex flex-col gap-3">
          {/* اسم القيد */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              اسم القيد
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="اسم القيد"
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          {/* مدين */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              مدين
            </label>
            <input
              type="number"
              name="debit"
              value={form.debit}
              onChange={handleChange}
              placeholder="مدين"
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          {/* دائن */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              دائن
            </label>
            <input
              type="number"
              name="credit"
              value={form.credit}
              onChange={handleChange}
              placeholder="دائن"
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          {/* التاريخ */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              التاريخ
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#09adce] text-white rounded-md hover:bg-[#0b9cb9]"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
