"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const DeleteEmployeeModal = ({ onClose, client, onDelete }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: `categories/${client.id}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("تم حذف القسم بنجاح");

      // تحديث الـ parent state مباشرة
      onDelete(client.id);

      // إغلاق المودال بعد 1.5 ثانية
      setTimeout(() => {
        onClose();
      }, 1500);

      // عمل Reload بعد ثانيتين
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.message || "حدث خطأ أثناء الحذف");
    },
  });

  const handleConfirm = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
        <h3 className="font-bold mb-4 text-lg">هل أنت متأكد من الحذف</h3>
        <p className="text-red-600 font-semibold">{client?.name}</p>
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
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
