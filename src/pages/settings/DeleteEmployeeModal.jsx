import React from "react";

const DeleteEmployeeModal = ({ onClose, onConfirm, employee }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <h3 className="font-bold mb-4 text-lg">هل أنت متأكد من الحذف </h3>
        <p className="text-red-600 font-semibold">{employee?.name}</p>
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeModal;
