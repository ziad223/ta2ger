import React, { useState } from "react";

const AddSliderModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">إضافة سلايدر جديد</h2>
        <input
          type="text"
          name="title"
          placeholder="العنوان"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 border p-2 rounded"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="العنوان الفرعي"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full mb-3 border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          placeholder="رابط الصورة"
          value={form.image}
          onChange={handleChange}
          className="w-full mb-3 border p-2 rounded"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={() => onSubmit(form)}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSliderModal;
