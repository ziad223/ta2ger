import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/shared/CustomSelect";

const EditHallModal = ({ isOpen, onClose, hallData, onUpdate }) => {
  const [form, setForm] = useState(hallData || {});
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (hallData) {
      setForm(hallData);
      setLogoFile(null);
    }
  }, [hallData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selected) => {
    setForm({ ...form, status: selected ? selected.value : "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setForm({ ...form, logo: file });
    }
  };

  const statusOptions = [
    { value: "متاحة", label: "متاحة" },
    { value: "مغلقة", label: "مغلقة" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...form, logo: logoFile || form.logo };
    onUpdate(updatedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">تعديل بيانات القاعة</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <div>
            <label className="block mb-1 text-sm font-medium">اسم القاعة</label>
            <input
              type="text"
              name="name"
              className="border p-2 w-full rounded"
              value={form.name || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">العنوان</label>
            <input
              type="text"
              name="address"
              className="border p-2 w-full rounded"
              value={form.address || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الرقم الضريبي</label>
            <input
              type="text"
              name="taxNumber"
              className="border p-2 w-full rounded"
              value={form.taxNumber || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الجوال</label>
            <input
              type="text"
              name="phone"
              className="border p-2 w-full rounded"
              value={form.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الحالة</label>
            <CustomSelect
              options={statusOptions}
              value={statusOptions.find((opt) => opt.value === form.status)}
              onChange={handleSelectChange}
              placeholder="اختر الحالة"
              name="status"
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الأسعار</label>
            <input
              type="text"
              name="prices"
              className="border p-2 w-full rounded"
              value={form.prices || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">عدد الحجوزات</label>
            <input
              type="number"
              name="bookings"
              className="border p-2 w-full rounded"
              value={form.bookings || ""}
              onChange={handleChange}
            />
          </div>

          {/* شعار القاعة - دائمًا عمود كامل */}
          <div className="">
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
                onChange={handleFileChange}
              />
              <p className="text-gray-500 mb-2 text-center">
                {logoFile ? logoFile.name : "اضغط هنا لاختيار صورة"}
              </p>
              {(form.logo || logoFile) && (
                <img
                  src={logoFile ? URL.createObjectURL(logoFile) : form.logo}
                  alt="شعار القاعة"
                  className="w-20 h-20 object-cover rounded border"
                />
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              حفظ
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditHallModal;
