import React from "react";

const DeleteSliderModal = ({ onClose, onConfirm, slider }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm text-center">
        <h2 className="text-lg font-bold mb-4 text-red-600">
          حذف السلايدر
        </h2>
        <p className="mb-6">
          هل أنت متأكد أنك تريد حذف{" "}
          <span className="font-semibold">{slider.title}</span>؟
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

export default DeleteSliderModal;
