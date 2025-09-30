import React from "react";

const DeleteReservationModal = ({ isOpen, onClose, onDelete, reservation }) => {
  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md text-center">
        <h3 className="text-lg font-semibold mb-4">تأكيد الحذف</h3>
        <p className="mb-6">هل أنت متأكد أنك تريد حذف الحجز رقم <strong>{reservation.id}</strong> للعميل <strong>{reservation.client}</strong>؟</p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">إلغاء</button>
          <button onClick={() => {
            onDelete(reservation.id);
            onClose();
          }} className="px-4 py-2 bg-red-600 text-white rounded">نعم، حذف</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReservationModal;
