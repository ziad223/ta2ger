import React, { useState, useEffect } from 'react';
import CustomSelect from '../../components/shared/CustomSelect';

const EditModal = ({ isOpen, onClose, invoice, onSave }) => {
  const [formData, setFormData] = useState({
    id: '',
    client: '',
    date: '',
    amount: '',
    tax: '',
    total: '',
    remaining: '',
    status: '',
    paymentMethod: '',
  });

  useEffect(() => {
    if (invoice) {
      setFormData({
        id: invoice.id || '',
        client: invoice.client || '',
        date: invoice.date || '',
        amount: invoice.amount || '',
        tax: invoice.tax || '',
        total: invoice.total || '',
        remaining: invoice.remaining || '',
        status: invoice.status || '',
        paymentMethod: invoice.paymentMethod || '',
      });
    }
  }, [invoice]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selected) => {
    setFormData(prev => ({
      ...prev,
      [name]: selected ? selected.value : ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...invoice, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-bold mb-4">تعديل الفاتورة</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* رقم الفاتورة */}
          <div>
            <label className="block mb-1 text-sm font-medium">رقم الفاتورة</label>
            <input
              name="id"
              value={formData.id}
              readOnly
              className="border p-2 rounded w-full outline-none bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* العميل */}
          <div>
            <label className="block mb-1 text-sm font-medium">اسم العميل</label>
            <input
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="العميل"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* تاريخ الفاتورة */}
          <div>
            <label className="block mb-1 text-sm font-medium">تاريخ الفاتورة</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* مبلغ الفاتورة */}
          <div>
            <label className="block mb-1 text-sm font-medium">مبلغ الفاتورة</label>
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="مبلغ الفاتورة"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* الضريبة */}
          <div>
            <label className="block mb-1 text-sm font-medium">الضريبة</label>
            <input
              name="tax"
              value={formData.tax}
              onChange={handleChange}
              placeholder="الضريبة"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* الإجمالي */}
          <div>
            <label className="block mb-1 text-sm font-medium">المبلغ الإجمالي</label>
            <input
              name="total"
              value={formData.total}
              onChange={handleChange}
              placeholder="المبلغ الإجمالي"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* المتبقي */}
          <div>
            <label className="block mb-1 text-sm font-medium">المتبقي</label>
            <input
              name="remaining"
              value={formData.remaining}
              onChange={handleChange}
              placeholder="المتبقي"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          {/* حالة الفاتورة */}
          <div>
            <label className="block mb-1 text-sm font-medium">حالة الفاتورة</label>
            <CustomSelect
              value={formData.status ? { label: formData.status, value: formData.status } : null}
              onChange={(selected) => handleSelectChange('status', selected)}
              options={[
                { value: '', label: 'اختر الحالة' },
                { value: 'مدفوعة', label: 'مدفوعة' },
                { value: 'مدفوعة جزئيا', label: 'مدفوعة جزئيا' },
                { value: 'غير مدفوعة', label: 'غير مدفوعة' },
              ]}
              className="text-sm w-full"
            />
          </div>

          {/* طريقة الدفع */}
          <div>
            <label className="block mb-1 text-sm font-medium">طريقة الدفع</label>
            <CustomSelect
              value={formData.paymentMethod ? { label: formData.paymentMethod, value: formData.paymentMethod } : null}
              onChange={(selected) => handleSelectChange('paymentMethod', selected)}
              options={[
                { value: '', label: 'اختر طريقة الدفع' },
                { value: 'كاش', label: 'كاش' },
                { value: 'شبكة', label: 'شبكة' },
                { value: 'تحويل', label: 'تحويل' },
              ]}
              className="text-sm w-full"
            />
          </div>

          {/* الأزرار */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
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

export default EditModal;
