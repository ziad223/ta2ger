import React from "react";

const DeleteClientModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] text-center">
        <h2 className="text-lg font-bold mb-4">هل أنت متأكد من الحذف؟</h2>
        <div className="flex justify-center gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClientModal;
