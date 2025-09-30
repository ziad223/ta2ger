import React, { useState } from "react";
import CustomSelect from "../../../components/shared/CustomSelect";

const AddHallModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    taxNumber: "",
    phone: "",
    status: "متاحة",
    prices: "",
    bookings: "0",
  });

  const [logoFile, setLogoFile] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selected) => {
    setForm({ ...form, status: selected ? selected.value : "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogoFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, logo: logoFile });
    onClose();
  };

  const statusOptions = [
    { value: "متاحة", label: "متاحة" },
    { value: "مغلقة", label: "مغلقة" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">إضافة قاعة جديدة</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="block mb-1 text-sm font-medium">اسم القاعة</label>
            <input
              type="text"
              name="name"
              className="border p-2 w-full rounded"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">العنوان</label>
            <input
              type="text"
              name="address"
              className="border p-2 w-full rounded"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الرقم الضريبي</label>
            <input
              type="text"
              name="taxNumber"
              className="border p-2 w-full rounded"
              value={form.taxNumber}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الجوال</label>
            <input
              type="text"
              name="phone"
              className="border p-2 w-full rounded"
              value={form.phone}
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
              value={form.prices}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">عدد الحجوزات</label>
            <input
              type="number"
              name="bookings"
              className="border p-2 w-full rounded"
              value={form.bookings}
              onChange={handleChange}
            />
          </div>

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

          <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              إضافة
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddHallModal;
