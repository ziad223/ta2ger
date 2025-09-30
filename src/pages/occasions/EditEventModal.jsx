import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";
const EditEventModal = ({ isOpen, onClose, onUpdate, eventData }) => {
  const [form, setForm] = useState(eventData || {});

  useEffect(() => {
    if (eventData) setForm(eventData);
  }, [eventData]);

  if (!isOpen || !eventData) return null;

  // options للحالة
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
    onUpdate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">تعديل المناسبة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="اسم المناسبة"
            value={form.title || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          {/* <CustomSelect
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
          />

          <input
            type="number"
            name="bookings"
            placeholder="عدد الحجوزات"
            value={form.bookings || ""}
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
              className="px-3 py-2 bg-blue-600 text-white rounded"
            >
              تحديث
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
