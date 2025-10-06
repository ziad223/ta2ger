import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import CustomSelect from "../../../components/shared/CustomSelect";
import apiServiceCall from "../../../utils/apiServiceCall";

const EditHallModal = ({ isOpen, onClose, hallData, onUpdate }) => {
  const { register, handleSubmit, control, reset, setValue, watch } = useForm();
  const [logoFile, setLogoFile] = useState(null);

  const selectedOccasions = watch("occasions") || [];

  const statusOptions = [
    { value: true, label: "متاحة" },
    { value: false, label: "مغلقة" },
  ];

  const occasionOptions = [
    { value: 1, label: "زفاف" },
    { value: 2, label: "مؤتمر" },
    { value: 3, label: "حفل تخرج" },
    { value: 4, label: "عزاء" },
    { value: 5, label: "أخرى" },
  ];

  useEffect(() => {
    if (hallData) {
      const existingOccasions =
        Array.isArray(hallData.occasions) && hallData.occasions.length > 0
          ? hallData.occasions.map((o) => ({
              value: o.id || o.occasion_id,
              label: o.name || `مناسبة ${o.id}`,
              normal_day_price: o.normal_day_price || "",
              friday_price: o.friday_price || "",
              saturday_price: o.saturday_price || "",
            }))
          : [];

      reset({
        ...hallData,
        status:
          hallData.status === true
            ? { value: true, label: "متاحة" }
            : { value: false, label: "مغلقة" },
        occasions: existingOccasions,
      });

      setLogoFile(null);
    }
  }, [hallData, reset]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const hallId = hallData?.id;
      return await apiServiceCall({
        url: `halls/${hallId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
    },
    onSuccess: (res) => {
      toast.success(" تم تحديث بيانات القاعة بنجاح");
      onUpdate(res.data);
      setTimeout(() => {
    onClose();
  }, 1500); 
    },
    onError: (err) => {
      console.error("❌ Error updating hall:", err);
      toast.error(err?.message || "حدث خطأ أثناء التحديث");
    },
  });

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setValue("logo", file);
    }
  };

  const handleOccasionPriceChange = (index, field, value) => {
    const updated = [...selectedOccasions];
    updated[index][field] = value;
    setValue("occasions", updated);
  };

  const formatTime = (time) => (time ? time.slice(0, 5) : "");

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", data.name || "");
      formData.append("address", data.address || "");
      formData.append("alert_message", data.alert_message || "");
      formData.append("status", data.status?.value === true);
      formData.append("rent_from_time", formatTime(data.rent_from_time) || "08:00");
      formData.append("rent_to_time", formatTime(data.rent_to_time) || "23:00");
      formData.append("about_hall", data.about_hall || "");
      formData.append("tax_number", data.tax_number || "");
      formData.append("phone", data.phone || "");

      if (Array.isArray(data.occasions) && data.occasions.length > 0) {
        data.occasions.forEach((occ, idx) => {
          formData.append(`occasions[${idx}][occasion_id]`, occ.value);
          formData.append(`occasions[${idx}][normal_day_price]`, occ.normal_day_price || 0);
          formData.append(`occasions[${idx}][friday_price]`, occ.friday_price || 0);
          formData.append(`occasions[${idx}][saturday_price]`, occ.saturday_price || 0);
        });
      }

      if (logoFile) formData.append("logo", logoFile);

      mutation.mutate(formData);
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء إرسال البيانات");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <ToastContainer />
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">تعديل بيانات القاعة</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* اسم القاعة */}
          <div>
            <label className="block mb-1 text-sm font-medium">اسم القاعة</label>
            <input type="text" {...register("name")} className="border p-2 w-full rounded" />
          </div>

          {/* العنوان */}
          <div>
            <label className="block mb-1 text-sm font-medium">العنوان</label>
            <input type="text" {...register("address")} className="border p-2 w-full rounded" />
          </div>

          {/* الرقم الضريبي */}
          <div>
            <label className="block mb-1 text-sm font-medium">الرقم الضريبي</label>
            <input type="text" {...register("tax_number")} className="border p-2 w-full rounded" />
          </div>

          {/* رقم الجوال */}
          <div>
            <label className="block mb-1 text-sm font-medium">رقم الجوال</label>
            <input type="text" {...register("phone")} className="border p-2 w-full rounded" />
          </div>

          {/* الحالة */}
          <div>
            <label className="block mb-1 text-sm font-medium">الحالة</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => <CustomSelect options={statusOptions} value={field.value} onChange={field.onChange} />}
            />
          </div>

          {/* المناسبات */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block mb-1 text-sm font-medium">المناسبات</label>
            <Controller
              name="occasions"
              control={control}
              render={({ field }) => <CustomSelect options={occasionOptions} isMulti value={field.value} onChange={field.onChange} />}
            />
          </div>

          {/* أسعار المناسبات */}
          {selectedOccasions.map((occ, index) => (
            <div key={occ.value} className="col-span-1 md:col-span-2 lg:col-span-3 border rounded p-3 bg-gray-50">
              <h3 className="font-semibold mb-2">{occ.label}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["normal_day_price", "friday_price", "saturday_price"].map((field, idx) => (
                  <div key={idx}>
                    <label className="block mb-1 text-sm">
                      {field === "normal_day_price" ? "السعر في الأيام العادية" : field === "friday_price" ? "سعر الجمعة" : "سعر السبت"}
                    </label>
                    <input
                      type="number"
                      value={selectedOccasions[index]?.[field] || ""}
                      onChange={(e) => handleOccasionPriceChange(index, field, e.target.value)}
                      className="border p-2 w-full rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* من وقت الإيجار */}
          <div>
            <label className="block mb-1 text-sm font-medium">من وقت الإيجار</label>
            <input type="time" {...register("rent_from_time")} className="border p-2 w-full rounded" />
          </div>

          {/* إلى وقت الإيجار */}
          <div>
            <label className="block mb-1 text-sm font-medium">إلى وقت الإيجار</label>
            <input type="time" {...register("rent_to_time")} className="border p-2 w-full rounded" />
          </div>

          {/* عن القاعة */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <label className="block mb-1 text-sm font-medium">عن القاعة</label>
            <textarea {...register("about_hall")} className="border p-2 w-full rounded resize-none" rows={3}></textarea>
          </div>

          {/* شعار القاعة */}
          <div>
            <label className="block mb-1 text-sm font-medium">شعار القاعة</label>
            <div
              className="border-dashed border-2 border-gray-400 p-4 rounded flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("logo-upload").click()}
            >
              <input type="file" id="logo-upload" accept="image/*" className="hidden" onChange={handleFileChange} />
              <p className="text-gray-500 mb-2 text-center">{logoFile ? logoFile.name : "اضغط لاختيار صورة"}</p>
              {(hallData?.logo || logoFile) && (
                <img
                  src={logoFile ? URL.createObjectURL(logoFile) : hallData?.logo}
                  alt="شعار القاعة"
                  className="w-20 h-20 object-cover rounded border"
                />
              )}
            </div>
          </div>

          {/* أزرار */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              إلغاء
            </button>
            <button type="submit" disabled={mutation.isLoading} className="px-4 py-2 bg-blue-600 text-white rounded">
              {mutation.isLoading ? "جارٍ الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHallModal;
