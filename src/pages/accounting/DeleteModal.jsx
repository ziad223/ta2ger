"use client";

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const DeleteModal = ({ isOpen, onClose, itemId, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await apiServiceCall({
        url: `journal-entries/${itemId}`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.status) {
        toast.success(res?.message || "تم الحذف بنجاح ✅");
        onDeleted();
        onClose();
      } else {
        toast.error(res?.message || "فشل الحذف ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("حدث خطأ أثناء الحذف ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <IoClose size={20} />
        </button>

        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p className="mb-4">هل أنت متأكد أنك تريد حذف هذا القيد؟</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-2 border rounded"
            disabled={loading}
          >
            إلغاء
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "جارٍ الحذف..." : "حذف"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
