import React from 'react';

export default function CreateBondModel({ isOpen, onClose, }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="border-b border-gray-200 flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold">إضافة سند</h3>
          <button className="text-2xl text-gray-500 hover:text-gray-700" onClick={onClose}>&times;</button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">رقم الفاتورة</label>
            <input 
              type="text" 
              value="62"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">العميل</label>
            <input 
              type="text" 
              value="سمير صلاح"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">المتبقي</label>
            <input 
              type="text" 
              value="150"
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">المبلغ</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option>دائن (تحصيل من العميل)</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">طريقة الدفع</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
              <option value="">اختر طريقة الدفع</option>
              <option value="cash">نقداً</option>
              <option value="credit_card">بطاقة ائتمان</option>
              <option value="bank_transfer">تحويل بنكي</option>
            </select>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end gap-2">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={onClose}
          >
            رجوع
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
}