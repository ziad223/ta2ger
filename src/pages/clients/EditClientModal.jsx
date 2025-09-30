import React, { useState, useEffect } from 'react';

const EditClientModal = ({ isOpen, onClose, client, onUpdate }) => {
  const [formData, setFormData] = useState(client || {});

  useEffect(() => {
    setFormData(client || {});
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h3 className="text-lg font-bold mb-4">تعديل بيانات العميل</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">الاسم</label>
            <input name="name" value={formData.name || ''} onChange={handleChange} className="border p-2 rounded w-full outline-none" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم هوية العميل</label>
            <input name="nationalId" value={formData.nationalId || ''} onChange={handleChange} className="border p-2 rounded w-full outline-none" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الجوال</label>
            <input name="phone" value={formData.phone || ''} onChange={handleChange} className="border p-2 rounded w-full outline-none" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم جوال آخر</label>
            <input name="altPhone" value={formData.altPhone || ''} onChange={handleChange} className="border p-2 rounded w-full outline-none" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">تاريخ الإضافة</label>
            <input name="createdAt" type="date" value={formData.createdAt || ''} onChange={handleChange} className="border p-2 rounded w-full outline-none" required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">القاعة</label>
            <input name="hall" value={formData.hall || ''} onChange={handleChange} className="border p-2 rounded w-full outline-none" required />
          </div>

          <div className="flex justify-end gap-3 mt-4 md:col-span-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">إلغاء</button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">حفظ التغييرات</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
