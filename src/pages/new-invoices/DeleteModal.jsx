import React from 'react';

const DeleteModal = ({ isOpen, onClose, reservation, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد من حذف الحجز رقم {reservation?.id} للعميل {reservation?.client}؟</p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              onDelete(reservation.id);
              onClose();
            }}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
