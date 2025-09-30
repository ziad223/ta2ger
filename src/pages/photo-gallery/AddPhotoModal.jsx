import React, { useState } from "react";

const AddPhotoModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    image: "",
    status: "مفعل",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({ image: "", status: "مفعل" });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">إضافة صورة جديدة</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="رابط الصورة"
            value={formData.image}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.value }))
            }
            className="border p-2 rounded w-full outline-none"
            required
          />

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
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhotoModal;
