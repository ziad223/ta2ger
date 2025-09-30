import React, { useState, useEffect } from "react";

const EditPhotoModal = ({ isOpen, onClose, photo, onUpdate }) => {
  const [formData, setFormData] = useState({
    image: "",
    status: "مفعل",
  });

  useEffect(() => {
    if (photo) {
      setFormData({ image: photo.image, status: photo.status });
    }
  }, [photo]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // نعرض الصورة المختارة مؤقتًا (preview)
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...photo, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">تعديل الصورة</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* عرض الصورة الحالية */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={formData.image}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border"
            />
            <label className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
              تغيير الصورة
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* حالة الصورة */}
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value }))
            }
            className="border p-2 rounded w-full outline-none"
          >
            <option value="مفعل">مفعل</option>
            <option value="غير مفعل">غير مفعل</option>
          </select>

          {/* الأزرار */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhotoModal;
