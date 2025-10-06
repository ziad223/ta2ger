import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast , ToastContainer } from "react-toastify";
import apiServiceCall from "../../../utils/apiServiceCall";

const DeleteHallModal = ({ isOpen, onClose, hallId, hallName, refetch }) => {
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: `halls/${hallId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("تم حذف القاعة بنجاح");

      if (refetch) {
        refetch();
      } else {
        setTimeout(() => {
          window.location.reload();
        },  2000);
      }

        setTimeout(() => {
    onClose();
  }, 1500); 
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "فشل في حذف القاعة");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <ToastContainer/>
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg text-center font-din">
        <h2 className="text-lg font-bold mb-4 text-red-600">حذف القاعة</h2>
        <p className="mb-6">
          هل أنت متأكد من حذف{" "}
          <span className="font-semibold text-black">{hallName}</span>؟
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={deleteMutation.isLoading}
          >
            إلغاء
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHallModal;
