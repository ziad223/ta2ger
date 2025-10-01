import React, { useState } from "react";

const AddSliderModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">
          إضافة سلايدر جديد
        </h2>

        {/* العنوان */}
        <input
          type="text"
          name="title"
          placeholder="العنوان"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* العنوان الفرعي */}
        <input
          type="text"
          name="subtitle"
          placeholder="العنوان الفرعي"
          value={form.subtitle}
          onChange={handleChange}
          className="w-full mb-3 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* رفع صورة */}
        <div className="mb-3">
          <label className="block mb-2 font-medium text-gray-700">الصورة</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition">
            <span className="text-gray-500">اضغط لاختيار صورة</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* اسم الملف */}
          {form.image && (
            <p className="mt-2 text-sm text-gray-600">
              {form.image.name}
            </p>
          )}

          {/* معاينة الصورة */}
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg shadow"
              />
            </div>
          )}
        </div>

        {/* الأزرار */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg"
          >
            إضافة
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSliderModal;
