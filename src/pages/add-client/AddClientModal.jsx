// AddClientModal.jsx
import React, { useState } from "react";

const AddClientModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    nationalId: "",
    phone: "",
    altPhone: "",
    hall: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      return alert("من فضلك أدخل الاسم ورقم الجوال");
    }
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-lg font-bold mb-4">إضافة عميل</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
              الاسم
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md w-full"
              placeholder="اسم العميل"
            />
          </div>

          <div>
            <label htmlFor="nationalId" className="text-sm font-semibold text-gray-700">
              رقم الهوية
            </label>
            <input
              id="nationalId"
              name="nationalId"
              value={form.nationalId}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md w-full"
              placeholder="رقم هوية العميل"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              الجوال
            </label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md w-full"
              placeholder="الجوال"
            />
          </div>

          <div>
            <label htmlFor="altPhone" className="text-sm font-semibold text-gray-700">
              رقم جوال آخر
            </label>
            <input
              id="altPhone"
              name="altPhone"
              value={form.altPhone}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md w-full"
              placeholder="رقم جوال آخر"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="hall" className="text-sm font-semibold text-gray-700">
              القاعة
            </label>
            <input
              id="hall"
              name="hall"
              value={form.hall}
              onChange={handleChange}
              className="border px-3 py-2 rounded-md w-full"
              placeholder="اسم القاعة"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
