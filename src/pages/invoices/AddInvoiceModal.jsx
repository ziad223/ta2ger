import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const AddInvoiceModal = ({ isOpen, onClose, onSave, clients = [], halls = [] }) => {
  const [form, setForm] = useState({
    client: "",
    phone: "",
    eventType: "",
    startDate: "",
    endDate: "",
    hall: "",
    sections: "",
    amount: "",
    discount: "",
    paid: "",
    tax: "",
    total: "",
    paidTotal: "",
    cash: "",
    network: "",
    remaining: "",
    reservationStatus: "",
    paymentStatus: "",
    notes: "",
    owner: ""
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({
        client: "",
        phone: "",
        eventType: "",
        startDate: "",
        endDate: "",
        hall: "",
        sections: "",
        amount: "",
        discount: "",
        paid: "",
        tax: "",
        total: "",
        paidTotal: "",
        cash: "",
        network: "",
        remaining: "",
        reservationStatus: "",
        paymentStatus: "",
        notes: "",
        owner: ""
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">إضافة فاتورة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div>
              <label className="block mb-1 font-medium">العميل</label>
               <CustomSelect
  name="client"
  value={form.client ? { label: form.client, value: form.client } : null}
  onChange={(selected) => setForm(prev => ({ ...prev, client: selected ? selected.value : "" }))}
  options={clients.map(c => ({ value: c, label: c }))}
  placeholder="اختر العميل"
/>

            </div>

            <div>
              <label className="block mb-1 font-medium">رقم الهاتف</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="رقم الهاتف"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">نوع المناسبة</label>
              <input
                type="text"
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                placeholder="نوع المناسبة"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">القاعة</label>
            <CustomSelect
  name="hall"
  value={form.hall ? { label: form.hall, value: form.hall } : null}
  onChange={(selected) => setForm(prev => ({ ...prev, hall: selected ? selected.value : "" }))}
  options={halls.map(h => ({ value: h, label: h }))}
  placeholder="اختر القاعة"
/>
            </div>

            <div>
              <label className="block mb-1 font-medium">تاريخ الحجز</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">تاريخ المناسبة</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">الأقسام</label>
              <input
                type="text"
                name="sections"
                value={form.sections}
                onChange={handleChange}
                placeholder="الرجال, النساء"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المبلغ</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">الخصم</label>
              <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المدفوع</label>
              <input
                type="number"
                name="paid"
                value={form.paid}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">الضريبة</label>
              <input
                type="number"
                name="tax"
                value={form.tax}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">الإجمالي</label>
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المدفوع بالكامل</label>
              <input
                type="number"
                name="paidTotal"
                value={form.paidTotal}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">نقدي</label>
              <input
                type="number"
                name="cash"
                value={form.cash}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">شبكة</label>
              <input
                type="number"
                name="network"
                value={form.network}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المتبقي</label>
              <input
                type="number"
                name="remaining"
                value={form.remaining}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">حالة الحجز</label>
             <CustomSelect
  name="reservationStatus"
  value={form.reservationStatus ? { label: form.reservationStatus, value: form.reservationStatus } : null}
  onChange={(selected) => setForm(prev => ({ ...prev, reservationStatus: selected ? selected.value : "" }))}
  options={[
    { value: "مؤكد", label: "مؤكد" },
    { value: "ملغي", label: "ملغي" },
    { value: "قيد الانتظار", label: "قيد الانتظار" },
  ]}
  placeholder="حالة الحجز"
/>
            </div>

            <div>
              <label className="block mb-1 font-medium">حالة الدفع</label>
             <CustomSelect
  name="paymentStatus"
  value={form.paymentStatus ? { label: form.paymentStatus, value: form.paymentStatus } : null}
  onChange={(selected) => setForm(prev => ({ ...prev, paymentStatus: selected ? selected.value : "" }))}
  options={[
    { value: "مدفوع", label: "مدفوع" },
    { value: "جزئي", label: "جزئي" },
    { value: "غير مدفوع", label: "غير مدفوع" },
  ]}
  placeholder="حالة الدفع"
/>
            </div>

            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">ملاحظات</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="ملاحظات إضافية"
                className="w-full border p-2 rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المالك</label>
              <input
                type="text"
                name="owner"
                value={form.owner}
                onChange={handleChange}
                placeholder="اسم المالك"
                className="w-full border p-2 rounded"
              />
            </div>

          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
