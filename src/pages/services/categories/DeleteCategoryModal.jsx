import React from "react";

const DeleteCategoryModal = ({ category, onClose, onDelete }) => {
  if (!category) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-md w-full max-w-md text-center">
        <h2 className="text-lg font-bold mb-4">حذف القسم</h2>
        <p className="mb-6">
          هل أنت متأكد من حذف القسم{" "}
          <span className="font-bold text-red-600">{category.name}</span>؟
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            إلغاء
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
