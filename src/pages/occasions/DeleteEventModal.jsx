import React from "react";

const DeleteEventModal = ({ isOpen, onClose, onDelete, eventName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-lg font-bold mb-4">حذف المناسبة</h2>
        <p className="mb-6">
          هل أنت متأكد أنك تريد حذف المناسبة{" "}
          <span className="font-bold">{eventName}</span>؟
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 bg-red-600 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
