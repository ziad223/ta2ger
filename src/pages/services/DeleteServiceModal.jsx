import React from "react";

const DeleteServiceModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-bold mb-4">تأكيد الحذف</h2>
        <p className="mb-4">هل أنت متأكد من حذف هذه الخدمة؟</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded">حذف</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteServiceModal;
