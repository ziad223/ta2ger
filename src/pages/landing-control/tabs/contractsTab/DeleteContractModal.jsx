import React from "react";

const DeleteContractModal = ({ onClose, onConfirm, contract }) => {
  if (!contract) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-center">
        <h2 className="text-xl font-bold mb-4">حذف العقد</h2>
        <p className="mb-6">
          هل أنت متأكد من أنك تريد حذف العقد الخاص بالعميل{" "}
          <span className="font-bold">{contract.clientName}</span>؟
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
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

export default DeleteContractModal;
