"use client";

import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiServiceCall from "../../../utils/apiServiceCall";

const EditUnitModal = ({ unit, onClose, onSave }) => {
  const [name, setName] = useState(unit?.name || "");

  useEffect(() => {
    setName(unit?.name || "");
  }, [unit]);

  const mutation = useMutation({
    mutationFn: async (updatedUnit) => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: `units/${unit.id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { name: updatedUnit.name },
      });
    },
    onSuccess: (data) => {
      toast.success("تم تعديل الوحدة بنجاح");
      onSave(data); // تحديث الواجهة
      onClose();

      // إعادة تحميل البيانات بعد ثانية
      setTimeout(() => {
        window.location.reload(); // أو refetch لو عندك
      }, 500);
    },
    onError: (err) => {
      console.error(err);
      toast.error("حدث خطأ أثناء تعديل الوحدة");
    },
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutation.mutate({ name });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">تعديل الوحدة</h3>
        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
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
              className="px-4 py-2 bg-blue-600 text-white rounded"
              disabled={mutation.isLoading || !name.trim()}
            >
              {mutation.isLoading ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUnitModal;
