'use client';
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast , ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const DeletePayWayModal = ({ payWay, onClose, refetch }) => {
  // ✅ Mutation للحذف
  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      return apiServiceCall({
        url: `payment-methods/${payWay.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest",
        },
      });
    },
    onSuccess: (res) => {
      toast.success(res?.message || "تم حذف طريقة الدفع بنجاح ✅");
      
    setTimeout(() => {
      onClose();
    }, 1000);

    setTimeout(() => {
     window.location.reload()
    }, 1500);
  
    },
    onError: (err) => {
      console.error("❌ خطأ في الحذف:", err);
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء الحذف ❌");
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <ToastContainer/>
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p>
          هل أنت متأكد أنك تريد حذف طريقة الدفع{" "}
          <span className="font-semibold text-red-500">{payWay?.name}</span>؟
        </p>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>

          <button
            onClick={handleDelete}
            disabled={mutation.isLoading}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            {mutation.isLoading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePayWayModal;
