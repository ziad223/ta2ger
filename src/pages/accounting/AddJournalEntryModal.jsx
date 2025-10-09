'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import apiServiceCall from '../../utils/apiServiceCall';
import CustomSelect from '../../components/shared/CustomSelect';
import { IoClose } from 'react-icons/io5';

const AddJournalEntryModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    entry_date: '',
    reference: '',
    description: '',
    is_posted: false,
    lines: [
      { account_id: '', debit: 0, credit: 0, note: '' }
    ],
  });

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);

  // جلب الحسابات عند فتح المودال
  useEffect(() => {
    if (!isOpen) return;

    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await apiServiceCall({
          url: 'select/accounts',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res?.status) {
          const options = res.data.map(acc => ({
            value: acc.id,
            label: acc.name,
          }));
          setAccounts(options);
        } else {
          toast.error('فشل في تحميل الحسابات');
        }
      } catch (err) {
        console.error(err);
        toast.error('حدث خطأ أثناء تحميل الحسابات');
      }
    };

    fetchAccounts();
  }, [isOpen]);

  const handleLineChange = (index, field, value) => {
    const newLines = [...form.lines];
    newLines[index][field] = value;
    setForm({ ...form, lines: newLines });
  };

  const addLine = () => {
    setForm({ ...form, lines: [...form.lines, { account_id: '', debit: 0, credit: 0, note: '' }] });
  };

  const removeLine = (index) => {
    const newLines = [...form.lines];
    newLines.splice(index, 1);
    setForm({ ...form, lines: newLines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await apiServiceCall({
        url: 'journal-entries',
        method: 'POST',
        body: form,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.status) {
        toast.success(res?.message || 'تمت إضافة القيد بنجاح ✅');
        setForm({
          entry_date: '',
          reference: '',
          description: '',
          is_posted: false,
          lines: [{ account_id: '', debit: 0, credit: 0, note: '' }],
        });
        setTimeout(() => onClose(), 1000);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(res?.message || 'حدث خطأ أثناء إضافة القيد');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-red-500">
          <IoClose size={22} />
        </button>

        <h3 className="text-lg font-bold mb-4">إضافة قيد يومية</h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-1 font-medium">تاريخ القيد</label>
              <input
                type="date"
                value={form.entry_date}
                onChange={(e) => setForm({ ...form, entry_date: e.target.value })}
                className="w-full border rounded px-3 py-2 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المرجع</label>
              <input
                type="text"
                value={form.reference}
                onChange={(e) => setForm({ ...form, reference: e.target.value })}
                className="w-full border rounded px-3 py-2 outline-none"
                placeholder="INV-2025-001"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">الوصف</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded px-3 py-2 outline-none"
              placeholder="أدخل وصف القيد"
            />
          </div>

          <h4 className="font-semibold text-md mt-4 mb-2">تفاصيل القيد</h4>

          {form.lines.map((line, index) => (
            <div key={index} className="border p-3 rounded mb-3 relative bg-gray-50">
              <button
                type="button"
                onClick={() => removeLine(index)}
                className="absolute top-2 left-2 text-red-500"
              >
                حذف
              </button>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block mb-1">الحساب</label>
                  <CustomSelect
                    options={accounts}
                    value={accounts.find((a) => a.value === line.account_id) || null}
                    onChange={(selected) => handleLineChange(index, 'account_id', selected ? selected.value : '')}
                    placeholder="اختر الحساب"
                  />
                </div>

                <div>
                  <label className="block mb-1">ملاحظة</label>
                  <input
                    type="text"
                    value={line.note}
                    onChange={(e) => handleLineChange(index, 'note', e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none"
                    placeholder="ملاحظة"
                  />
                </div>

                <div>
                  <label className="block mb-1">دائن</label>
                  <input
                    type="number"
                    step="0.01"
                    value={line.credit}
                    onChange={(e) => handleLineChange(index, 'credit', e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block mb-1">مدين</label>
                  <input
                    type="number"
                    step="0.01"
                    value={line.debit}
                    onChange={(e) => handleLineChange(index, 'debit', e.target.value)}
                    className="w-full border rounded px-3 py-2 outline-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addLine} className="text-blue-600 font-medium mt-2">
            + إضافة سطر جديد
          </button>

          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border rounded"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 text-white rounded"
              disabled={loading}
            >
              {loading ? 'جارٍ الإضافة...' : 'إضافة القيد'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJournalEntryModal;
