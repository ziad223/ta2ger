import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";

const AddServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: "", image: null });
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setForm({ ...form, image: file });
      if (file) setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagePreview = form.image ? URL.createObjectURL(form.image) : null;

    onSubmit({ ...form, image: imagePreview });
    setForm({ name: "", image: null });
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">إضافة خدمة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* اسم الخدمة */}
          <input
            type="text"
            name="name"
            placeholder="اسم الخدمة"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* رفع صورة */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">الصورة</label>
            <label className="cursor-pointer w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:bg-gray-50">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <FaCamera size={24} />
                  <span>اختر صورة</span>
                </div>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* الأزرار */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
