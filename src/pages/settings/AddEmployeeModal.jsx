import React, { useState } from "react";

const AddEmployeeModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    group: "",
    halls: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="font-bold mb-4 text-lg">إضافة موظف</h3>
        <div className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="اسم الموظف"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="رقم الجوال"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="البريد الإلكتروني"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="group"
            value={form.group}
            onChange={handleChange}
            placeholder="المجموعة"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="halls"
            value={form.halls}
            onChange={handleChange}
            placeholder="القاعات"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
