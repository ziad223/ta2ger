"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import CustomSelect from "../../../components/shared/CustomSelect";
import apiServiceCall from "../../../utils/apiServiceCall";

const AddHallModal = ({ isOpen, onClose, refetch }) => {
  const { register, handleSubmit, control, reset } = useForm();
  const [logoFile, setLogoFile] = useState(null);

  const statusOptions = [
    { value: "متاحة", label: "متاحة" },
    { value: "مغلقة", label: "مغلقة" },
  ];

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("tax_number", data.tax_number);
      formData.append("phone", data.phone);
      formData.append("alert_message", data.alert_message || "");
      formData.append("about_hall", data.about_hall || "");
      formData.append("rent_from_time", data.rent_from_time || "");
      formData.append("rent_to_time", data.rent_to_time || "");
      formData.append("taqnyat_sender", data.taqnyat_sender || "");
      formData.append("status", data.status === "متاحة" ? "1" : "0");

      formData.append("features[]", 1);
      formData.append("occasions[0][occasion_id]", 1);
      formData.append("occasions[0][normal_day_price]", 100);
      formData.append("occasions[0][friday_price]", 150);
      formData.append("occasions[0][saturday_price]", 150);

      if (logoFile) {
        formData.append("logo", logoFile);
        formData.append("attachments[]", logoFile); // نفس الصورة كمرفق
      } else {
        throw new Error("يرجى اختيار شعار القاعة (صورة)");
      }

      return await apiServiceCall({
        url: `halls`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    },

    onSuccess: (res) => {
        toast.success("تمت إضافة القاعة بنجاح ");
        refetch?.();
        reset();
        setLogoFile(null);
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
      toast.error(err?.message || "فشل في إضافة القاعة");
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto font-din">
      <ToastContainer/>
        <h2 className="text-xl font-bold mb-4 text-center">إضافة قاعة جديدة</h2>

        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* الاسم */}
          <div>
            <label className="block mb-1 text-sm font-medium">اسم القاعة</label>
            <input
              {...register("name", { required: true })}
              className="border p-2 w-full rounded"
              placeholder="أدخل اسم القاعة"
            />
          </div>

          {/* العنوان */}
          <div>
            <label className="block mb-1 text-sm font-medium">العنوان</label>
            <input
              {...register("address", { required: true })}
              className="border p-2 w-full rounded"
              placeholder="أدخل العنوان"
            />
          </div>

          {/* الرقم الضريبي */}
          <div>
            <label className="block mb-1 text-sm font-medium">الرقم الضريبي</label>
            <input
              {...register("tax_number", { required: true })}
              className="border p-2 w-full rounded"
              placeholder="أدخل الرقم الضريبي"
            />
          </div>

          {/* الجوال */}
          <div>
            <label className="block mb-1 text-sm font-medium">رقم الجوال</label>
            <input
              {...register("phone", { required: true })}
              className="border p-2 w-full rounded"
              placeholder="05xxxxxxxx"
            />
          </div>

          {/* الرسالة التنبيهية */}
          <div>
            <label className="block mb-1 text-sm font-medium">الرسالة التنبيهية</label>
            <input
              {...register("alert_message")}
              className="border p-2 w-full rounded"
              placeholder="اكتب رسالة تنبيهية إن وجدت"
            />
          </div>

          {/* من وقت */}
          <div>
            <label className="block mb-1 text-sm font-medium">من وقت</label>
            <input
              type="time"
              {...register("rent_from_time")}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* إلى وقت */}
          <div>
            <label className="block mb-1 text-sm font-medium">إلى وقت</label>
            <input
              type="time"
              {...register("rent_to_time")}
              className="border p-2 w-full rounded"
            />
          </div>

          {/* عن القاعة */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">عن القاعة</label>
            <textarea
              {...register("about_hall")}
              className="border p-2 w-full rounded"
              rows={3}
              placeholder="نبذة عن القاعة..."
            ></textarea>
          </div>

          {/* الحالة */}
          <div>
            <label className="block mb-1 text-sm font-medium">الحالة</label>
            <Controller
              name="status"
              control={control}
              defaultValue="متاحة"
              render={({ field }) => (
                <CustomSelect
                  options={statusOptions}
                  value={statusOptions.find((opt) => opt.value === field.value)}
                  onChange={(opt) => field.onChange(opt?.value)}
                />
              )}
            />
          </div>

          {/* المرسل في تقنيات */}
          <div>
            <label className="block mb-1 text-sm font-medium">المرسل في تقنيات</label>
            <input
              {...register("taqnyat_sender")}
              className="border p-2 w-full rounded"
              placeholder="اكتب اسم المرسل إن وجد"
            />
          </div>

          {/* شعار القاعة */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium">شعار القاعة</label>
            <div
              className="border-dashed border-2 border-gray-400 p-4 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("logo-upload").click()}
            >
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
              <p className="text-gray-500 mb-2">
                {logoFile ? logoFile.name : "اضغط هنا لاختيار صورة"}
              </p>
              {logoFile && (
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="شعار القاعة"
                  className="w-20 h-20 object-cover rounded border"
                />
              )}
            </div>
          </div>

          {/* الأزرار */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
              disabled={mutation.isLoading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "جارٍ الإضافة..." : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHallModal;
