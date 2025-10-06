"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { toast , ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const DeleteEventModal = ({ isOpen, onClose, eventId, eventName, refetch }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: `occasions/${eventId}`,
        method: "DELETE",
        body: {}, // مهم حتى لو فاضي
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("تم حذف المناسبة بنجاح");
         setTimeout(() => {
          window.location.reload();
        },  2000);

        setTimeout(() => {
    onClose();
  }, 1500); 
    },
    onError: (err) => {
      toast.error(err?.message || "فشل حذف المناسبة");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-lg font-bold mb-4">حذف المناسبة</h2>
        <p className="mb-6">
          هل أنت متأكد أنك تريد حذف المناسبة{" "}
          <span className="font-bold">{eventName}</span>؟
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 bg-gray-300 rounded"
            disabled={mutation.isLoading}
          >
            إلغاء
          </button>
          <button
            onClick={() => mutation.mutate()}
            className="px-3 py-2 bg-red-600 text-white rounded"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventModal;
