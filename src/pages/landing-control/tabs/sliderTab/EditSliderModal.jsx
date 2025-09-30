import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

const EditSliderModal = ({ onClose, onSubmit, slider }) => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (slider) {
      setForm({ title: slider.title, subtitle: slider.subtitle, image: null });
      setPreview(slider.image); // الصورة القديمة
    }
  }, [slider]);

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

    const imagePreview = form.image ? URL.createObjectURL(form.image) : preview;

    onSubmit({
      ...slider,
      title: form.title,
      subtitle: form.subtitle,
      image: imagePreview,
    });

    setForm({ title: "", subtitle: "", image: null });
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">تعديل السلايدر</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* العنوان */}
          <div>
            <label className="block mb-1 font-medium">العنوان</label>
            <input
              type="text"
              name="title"
              placeholder="العنوان"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* العنوان الفرعي */}
          <div>
            <label className="block mb-1 font-medium">العنوان الفرعي</label>
            <input
              type="text"
              name="subtitle"
              placeholder="العنوان الفرعي"
              value={form.subtitle}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* رفع الصورة */}
          <div>
            <label className="block mb-1 font-medium">الصورة</label>
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
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSliderModal;
