// AddClientModal.js
import React, { useState } from 'react';

const AddClientModal = ({ isOpen, onClose }) => {
  const [clientData, setClientData] = useState({
    name: '',
    idNumber: '',
    mobile: '',
    otherPhone: '',
    taxNumber: '',
    hallName: '',
    address: ''
  });

  const handleChange = (field, value) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client Data:', clientData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full placeholder:text-sm max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-[#09adce] text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-xl font-bold">إضافة عميل جديد</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* الاسم */}
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">الاسم *</label>
              <input
                type="text"
                required
                className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                value={clientData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="أدخل اسم العميل"
              />
            </div>

            {/* رقم الهوية */}
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">رقم الهوية *</label>
              <input
                type="text"
                required
                className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                value={clientData.idNumber}
                onChange={(e) => handleChange('idNumber', e.target.value)}
                placeholder="أدخل رقم الهوية"
              />
            </div>

            {/* الجوال */}
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">الجوال *</label>
              <input
                type="text"
                required
                className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                value={clientData.mobile}
                onChange={(e) => handleChange('mobile', e.target.value)}
                placeholder="أدخل رقم الجوال"
              />
            </div>

            {/* رقم هاتف آخر */}
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">رقم هاتف آخر</label>
              <input
                type="text"
                className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                value={clientData.otherPhone}
                onChange={(e) => handleChange('otherPhone', e.target.value)}
                placeholder="أدخل رقم هاتف إضافي"
              />
            </div>

            {/* الرقم الضريبي */}
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">الرقم الضريبي</label>
              <input
                type="text"
                className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                value={clientData.taxNumber}
                onChange={(e) => handleChange('taxNumber', e.target.value)}
                placeholder="أدخل الرقم الضريبي"
              />
            </div>

            {/* اسم القاعة */}
            <div>
              <label className="block mb-2 font-medium text-sm text-gray-700">اسم القاعة</label>
              <input
                type="text"
                className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                value={clientData.hallName}
                onChange={(e) => handleChange('hallName', e.target.value)}
                placeholder="أدخل اسم القاعة"
              />
            </div>
          </div>

          {/* العنوان */}
          <div>
            <label className="block mb-2 font-medium text-sm text-gray-700">العنوان</label>
            <textarea
              className="w-full placeholder:text-sm border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent resize-vertical min-h-[80px]"
              value={clientData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="أدخل العنوان الكامل"
            />
          </div>

          {/* أزرار */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#09adce] text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              حفظ العميل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;