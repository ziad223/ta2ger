"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast ,ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

export default function CreateSectionModel({ onClose, onSave }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await apiServiceCall({
          url: "categories",
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        setParentCategories(response.data || []);
      } catch (error) {
        console.error(error);
        toast.error("حدث خطأ أثناء جلب الأقسام");
      }
    };
    fetchParents();
  }, []);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: "categories",
        method: "POST",
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
   onSuccess: (data) => {

  onSave(data);
  toast.success("تم إضافة القسم بنجاح");

  reset();

  setTimeout(() => {
    onClose();
  }, 1000);

  setTimeout(() => {
    window.location.reload();
  }, 1000);
},

    onError: (error) => {
      toast.error(error?.message || "حدث خطأ أثناء الإضافة");
    },
  });

  const onSubmit = (formData) => {
    // تحويل parent_id لرقم أو null
    const payload = {
      name: formData.name.trim(),
      parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer/>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="font-bold mb-4 text-lg">إضافة قسم جديد</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("name", { required: true })}
              placeholder="اسم القسم"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <span className="text-red-500 text-sm">اسم القسم مطلوب</span>}
          </div>
          <div>
            <select
              {...register("parent_id")}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="">قسم رئيسي</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
