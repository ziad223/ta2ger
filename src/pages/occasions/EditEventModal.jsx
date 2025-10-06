"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast , ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";
import CustomSelect from "../../components/shared/CustomSelect";

const statusOptions = [
  { value: true, label: "مفتوح" },
  { value: false, label: "مغلق" },
];

const EditEventModal = ({ isOpen, onClose, eventData, refetch }) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      title: "",
      status: true, // القيمة الافتراضية
      ...eventData,
    },
  });

  const [selectedStatus, setSelectedStatus] = useState(
    eventData
      ? statusOptions.find(opt => opt.value === (eventData.status === "مفتوح" || eventData.status === true))
      : statusOptions[0]
  );

  useEffect(() => {
    if (eventData) {
      reset({ title: eventData.name || eventData.title, status: eventData.status });
      setSelectedStatus(
        statusOptions.find(
          opt => opt.value === (eventData.status === "مفتوح" || eventData.status === true)
        )
      );
    }
  }, [eventData, reset]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", data.title);
      formData.append("status", selectedStatus?.value);

      return await apiServiceCall({
        url: `occasions/${eventData.id}`,
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("تم تحديث المناسبة بنجاح");
        setTimeout(() => {
          window.location.reload();
        },  2000);

        setTimeout(() => {
    onClose();
  }, 1500); 
    },
    onError: (err) => {
      toast.error(err?.message || "فشل تحديث المناسبة");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">تعديل المناسبة</h2>
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="space-y-3"
        >
          <input
            type="text"
            placeholder="اسم المناسبة"
            {...register("title", { required: true })}
            className="w-full border rounded px-3 py-2"
          />

          <Controller
            name="status"
            control={control}
            render={() => (
              <CustomSelect
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="اختر الحالة"
              />
            )}
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-300 rounded"
              disabled={mutation.isLoading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "جارٍ التحديث..." : "تحديث"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
