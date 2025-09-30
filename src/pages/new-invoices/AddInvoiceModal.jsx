import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const AddInvoiceModal = ({ isOpen, onClose, onSave, clients = [] }) => {
  const [form, setForm] = useState({
    id: "",
    client: "",
    date: "",
    amount: "",
    tax: "",
    total: "",
    remaining: "",
    status: "",
    paymentMethod: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({
        id: "",
        client: "",
        date: "",
        amount: "",
        tax: "",
        total: "",
        remaining: "",
        status: "",
        paymentMethod: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, selected) => {
    setForm(prev => ({ ...prev, [name]: selected ? selected.value : "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceData = {
      ...form,
      id: parseInt(form.id),
      amount: parseFloat(form.amount),
      tax: parseFloat(form.tax),
      total: parseFloat(form.total),
      remaining: parseFloat(form.remaining),
    };
    onSave(invoiceData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold mb-4">إضافة فاتورة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 font-medium">رقم الفاتورة</label>
              <input
                type="number"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="أدخل رقم الفاتورة"
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">العميل</label>
              <CustomSelect
                value={form.client ? { value: form.client, label: form.client } : null}
                onChange={(selected) => handleSelectChange("client", selected)}
                options={clients.map(c => ({ value: c, label: c }))}
                placeholder="اختر العميل"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">تاريخ الفاتورة</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">مبلغ الفاتورة</label>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="أدخل المبلغ"
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
                placeholder="أدخل الضريبة"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">المبلغ الإجمالي</label>
              <input
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                placeholder="المجموع"
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
                placeholder="المتبقي"
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">حالة الفاتورة</label>
              <CustomSelect
                value={form.status ? { value: form.status, label: form.status } : null}
                onChange={(selected) => handleSelectChange("status", selected)}
                options={[
                  { value: "مدفوعة", label: "مدفوعة" },
                  { value: "مدفوعة جزئيا", label: "مدفوعة جزئيا" },
                  { value: "غير مدفوعة", label: "غير مدفوعة" },
                ]}
                placeholder="اختر الحالة"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">طريقة الدفع</label>
              <CustomSelect
                value={form.paymentMethod ? { value: form.paymentMethod, label: form.paymentMethod } : null}
                onChange={(selected) => handleSelectChange("paymentMethod", selected)}
                options={[
                  { value: "كاش", label: "كاش" },
                  { value: "شبكة", label: "شبكة" },
                  { value: "تحويل", label: "تحويل" },
                ]}
                placeholder="اختر طريقة الدفع"
              />
            </div>

          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              إضافة
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddInvoiceModal;
