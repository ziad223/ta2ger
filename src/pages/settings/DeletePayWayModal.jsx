import React from "react";

const DeletePayWayModal = ({ payWay, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>هل أنت متأكد أنك تريد حذف طريقة الدفع <span className="font-semibold">{payWay.name}</span>؟</p>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">إلغاء</button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded">حذف</button>
        </div>
      </div>
    </div>
  );
};

export default DeletePayWayModal;
