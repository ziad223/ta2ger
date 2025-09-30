import React from 'react';

const DeleteClientModal = ({ isOpen, onClose, onDelete, client }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف العميل <span className="font-semibold">{client?.name}</span>؟</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-3 py-2 border rounded">إلغاء</button>
          <button onClick={onDelete} className="px-3 py-2 bg-red-500 text-white rounded">حذف</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
