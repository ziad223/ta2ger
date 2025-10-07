"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

export default function EditSectionModel({ section, onClose, onSave }) {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    const fetchParents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await apiServiceCall({
          url: "/categories",
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

  // prefill الفورم عند فتح المودال
  useEffect(() => {
    if (section) {
      setValue("name", section.name || "");
      setValue("parent_id", section.parent_id || "");
    }
  }, [section, setValue]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      return await apiServiceCall({
        url: `categories/${section.id}`,
        method: "PUT",
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (data) => {
      toast.success("تم تعديل القسم بنجاح");

      // تحديث الـ state في الـ parent
      onSave(data);

      // إعادة تعيين الفورم
      reset();

      // إغلاق المودال بعد 1.5 ثانية
      setTimeout(() => {
        onClose();
      }, 1500);

      // إعادة تحميل الصفحة بعد ثانيتين
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.message || "حدث خطأ أثناء التعديل");
    },
  });

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name.trim(),
      parent_id: formData.parent_id ? parseInt(formData.parent_id) : null,
    };
    mutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="font-bold mb-4 text-lg">تعديل القسم</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <input
              {...register("name", { required: true })}
              placeholder="اسم القسم"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              تحديث
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
