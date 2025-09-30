import React from "react";

const DeleteOfferModal = ({ isOpen, onClose, onDelete, offer }) => {
  if (!isOpen || !offer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">حذف العرض</h2>
        <p>هل أنت متأكد أنك تريد حذف العرض <span className="font-bold">{offer.name}</span>؟</p>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={() => onDelete(offer.id)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteOfferModal;
