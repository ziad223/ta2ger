import React from "react";

const DeleteContactModal = ({ message, onClose, onDelete }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-center text-red-600">
          هل أنت متأكد من حذف هذه الرسالة؟
        </h2>
        <p className="mb-4 text-center">({message.name} - {message.phone})</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteContactModal;
