import React, { useState } from "react";

const AddEventModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ title: "", content: "", image: null });
  const [preview, setPreview] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ title: "", content: "", image: null });
    setPreview(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[450px]">
        <h2 className="text-lg font-bold mb-4">إضافة مناسبة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label className="block mb-1 font-medium">العنوان</label>
            <input
              type="text"
              name="title"
              placeholder="أدخل العنوان"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">المحتوى</label>
            <textarea
              name="content"
              placeholder="أدخل المحتوى"
              value={form.content}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">الصورة</label>
            <div
              className=" h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => document.getElementById("imageInput").click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400">اضغط لإضافة صورة</span>
              )}
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">
              إلغاء
            </button>
            <button type="submit" className="px-3 py-1 bg-green-600 text-white rounded">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
