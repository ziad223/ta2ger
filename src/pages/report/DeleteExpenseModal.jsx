import React from "react";

const DeleteExpenseModal = ({ isOpen, onClose, onConfirm, hallName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[400px] rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-lg font-bold mb-3 text-gray-800">تأكيد الحذف</h2>
        <p className="text-gray-600 mb-6">
          هل أنت متأكد من حذف بيانات{" "}
          <span className="font-semibold text-red-500">{hallName}</span>؟
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            إلغاء
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;
