import React from 'react';

const ViewModal = ({ row, onClose }) => {
  if (!row) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="text-lg font-bold mb-4">عرض بيانات القيد</h3>
        <p><strong>#:</strong> {row.id}</p>
        <p><strong>الاسم:</strong> {row.name}</p>
        <p><strong>مدين:</strong> {row.debit}</p>
        <p><strong>دائن:</strong> {row.credit}</p>
        <p><strong>التاريخ:</strong> {row.date}</p>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
