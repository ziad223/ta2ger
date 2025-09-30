import React, { useState } from "react";
import CustomSelect from "../../components/shared/CustomSelect";
const AddEventModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({ title: "", status: "", bookings: "" });

  if (!isOpen) return null;

  const statusOptions = [
    { value: "مفتوح", label: "مفتوح" },
    { value: "مغلق", label: "مغلق" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected) => {
    setForm((prev) => ({ ...prev, status: selected ? selected.value : "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">إضافة مناسبة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="اسم المناسبة"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* CustomSelect بدل select
          <CustomSelect
            options={statusOptions}
            value={
              form.status
                ? statusOptions.find((opt) => opt.value === form.status)
                : null
            }
            onChange={handleSelectChange}
            placeholder="اختر الحالة"
            name="status"
            className="w-full"
          /> */}
{/* 
          <input
            type="number"
            name="bookings"
            placeholder="عدد الحجوزات"
            value={form.bookings}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          /> */}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-green-600 text-white rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
