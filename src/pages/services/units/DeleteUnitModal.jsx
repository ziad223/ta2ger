"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiServiceCall from "../../../utils/apiServiceCall";

const DeleteUnitModal = ({ unit, onClose, onConfirm }) => {
  const mutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: `units/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      toast.success("تم حذف الوحدة بنجاح");
      onConfirm(unit.id); 
      onClose();

      setTimeout(() => {
        window.location.reload();
      }, 500);
    },
    onError: (err) => {
      console.error(err);
      toast.error("حدث خطأ أثناء حذف الوحدة");
    },
  });

  const handleDelete = () => {
    mutation.mutate(unit.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p className="mb-4">هل أنت متأكد من حذف الوحدة "{unit.name}"؟</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            إلغاء
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "جاري الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUnitModal;
