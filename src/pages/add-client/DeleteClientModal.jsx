import React from 'react';

const DeleteClientModal = ({ isOpen, onClose, onDelete, clientName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
        <h3 className="text-lg font-bold mb-4">تأكيد حذف العميل</h3>
        <p className="mb-6">هل أنت متأكد من حذف العميل <span className="font-semibold">{clientName}</span>؟</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">إلغاء</button>
          <button onClick={onDelete} className="px-4 py-2 rounded bg-red-600 text-white">حذف</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
