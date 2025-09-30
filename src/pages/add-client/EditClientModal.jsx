import React, { useState, useEffect } from "react";

const EditClientModal = ({ isOpen, onClose, clientData, onUpdate }) => {
  const [formData, setFormData] = useState(clientData || {});

  useEffect(() => {
    setFormData(clientData || {});
  }, [clientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h3 className="text-lg font-bold mb-4">تعديل بيانات العميل</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الاسم */}
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
              الاسم
            </label>
            <input
              id="name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
              required
            />
          </div>

          {/* رقم الهوية */}
          <div>
            <label htmlFor="nationalId" className="text-sm font-semibold text-gray-700">
              رقم الهوية
            </label>
            <input
              id="nationalId"
              name="nationalId"
              value={formData.nationalId || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
              required
            />
          </div>

          {/* الجوال */}
          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-gray-700">
              الجوال
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
              required
            />
          </div>

          {/* رقم جوال آخر */}
          <div>
            <label htmlFor="altPhone" className="text-sm font-semibold text-gray-700">
              رقم جوال آخر
            </label>
            <input
              id="altPhone"
              name="altPhone"
              value={formData.altPhone || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* تاريخ الإضافة */}
          <div>
            <label htmlFor="createdAt" className="text-sm font-semibold text-gray-700">
              تاريخ الإضافة
            </label>
            <input
              id="createdAt"
              type="date"
              name="createdAt"
              value={formData.createdAt || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
              required
            />
          </div>

          {/* القاعة */}
          <div>
            <label htmlFor="hall" className="text-sm font-semibold text-gray-700">
              القاعة
            </label>
            <input
              id="hall"
              name="hall"
              value={formData.hall || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
              required
            />
          </div>

          {/* الأزرار */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
