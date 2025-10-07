"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiServiceCall from "../../../utils/apiServiceCall";

const AddUnitModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: async (newUnit) => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: "units",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newUnit,
      });
    },
    onSuccess: (data) => {
      toast.success("تم إضافة الوحدة بنجاح");
      onSave(data); // تحديث الواجهة
      setName("");
      onClose();

      // عمل ريفريش للبيانات بعد ثانية
      setTimeout(() => {
        window.location.reload(); // لو تحب تعمل إعادة تحميل الصفحة
      }, 1000);
    },
    onError: (err) => {
      console.error(err);
      toast.error("حدث خطأ أثناء إضافة الوحدة");
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate({ name });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">إضافة وحدة جديدة</h3>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="اسم الوحدة"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={mutation.isLoading || !name.trim()}
            >
              {mutation.isLoading ? "جاري الإضافة..." : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUnitModal;
