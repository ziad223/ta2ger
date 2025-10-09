'use client';
import React, { useState, useEffect } from 'react';
import { toast , ToastContainer } from 'react-toastify';
import apiServiceCall from '../../utils/apiServiceCall';
import CustomSelect from '../../components/shared/CustomSelect';

const AddClientModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    id_number: '',
    phone: '',
    alt_phone: '',
    tax_no: '',
    address: '',
    hall_id: '',
  });

  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return; 
    const fetchHalls = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await apiServiceCall({
          url: 'halls',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res?.status) {
          const options = res.data.map((hall) => ({
            value: hall.id,
            label: hall.name,
          }));
          setHalls(options);
        } else {
          toast.error('فشل في تحميل القاعات');
        }
      } catch (error) {
        console.error('❌ خطأ أثناء تحميل القاعات:', error);
        toast.error('حدث خطأ أثناء تحميل القاعات');
      }
    };

    fetchHalls();
  }, [isOpen]);

  // ✅ إرسال البيانات إلى API
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const token = localStorage.getItem('token');

    const res = await apiServiceCall({
      url: 'clients',
      method: 'POST',
      body: {
        name: form.name,
        id_number: form.id_number,
        phone: form.phone,
        alt_phone: form.alt_phone,
        tax_no: form.tax_no,
        address: form.address,
        hall_id: form.hall_id,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ لو الـ API راجع status true
    if (res?.status) {
      toast.success(res?.message || 'تمت العملية بنجاح ✅');

      setForm({
        name: '',
        id_number: '',
        phone: '',
        alt_phone: '',
        tax_no: '',
        address: '',
        hall_id: '',
      });

      setTimeout(() => onClose(), 1000);
      setTimeout(() => window.location.reload(), 1500);

    } else {
      // ❌ في حالة status false
      toast.error(res?.message || 'حدث خطأ أثناء تنفيذ العملية');
    }

  } catch (error) {
    console.error('❌ خطأ أثناء إضافة العميل:', error);

    // ✅ لو الخطأ راجع من السيرفر (API response)
    const serverMessage =
      error?.response?.data?.message ||
      error?.message ||
      'حدث خطأ غير متوقع';
    toast.error(serverMessage);
  } finally {
    setLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">إضافة عميل</h3>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">الاسم</label>
            <input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الهوية</label>
            <input
              name="id_number"
              value={form.id_number}
              onChange={(e) => setForm({ ...form, id_number: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الجوال</label>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم جوال آخر</label>
            <input
              name="alt_phone"
              value={form.alt_phone}
              onChange={(e) => setForm({ ...form, alt_phone: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الرقم الضريبي</label>
            <input
              name="tax_no"
              value={form.tax_no}
              onChange={(e) => setForm({ ...form, tax_no: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">العنوان</label>
            <input
              name="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div className='col-span-2'>
            <label className="block mb-1 text-sm font-medium">القاعة</label>
            <CustomSelect
              options={halls}
              value={halls.find((h) => h.value === form.hall_id) || null}
              onChange={(selected) =>
                setForm({ ...form, hall_id: selected ? selected.value : '' })
              }
              placeholder="اختر القاعة"
            />
          </div>

          <div className="flex  justify-end gap-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 outline-none border rounded"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-2 outline-none bg-[#2ba670] text-white rounded"
            >
              {loading ? 'جارٍ الإضافة...' : 'إضافة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
