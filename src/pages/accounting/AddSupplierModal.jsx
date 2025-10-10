"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const AddSupplierModal = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    tax_number: "",
    phone: "",
    street: "",
    company: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ دالة الإرسال
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await apiServiceCall({
        url: "suppliers",
        method: "POST",
        body: {
          name: form.name,
          tax_number: form.tax_number,
          phone: form.phone,
          street: form.street,
          company: form.company,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.status) {
        toast.success(res?.message || "✅ تم إضافة المورد بنجاح");

        setForm({
          name: "",
          tax_number: "",
          phone: "",
          street: "",
          company: "",
        });

        setTimeout(() => onClose(), 1000);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(res?.message || "❌ فشل في إضافة المورد");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء إضافة المورد:", error);
      const serverMessage =
        error?.response?.data?.message ||
        error?.message ||
        "حدث خطأ غير متوقع";
      toast.error(serverMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">إضافة مورد جديد</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
          <div>
            <label className="block mb-1 text-sm font-medium">اسم المورد</label>
            <input
              name="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              الرقم الضريبي
            </label>
            <input
              name="tax_number"
              value={form.tax_number}
              onChange={(e) => setForm({ ...form, tax_number: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الهاتف</label>
            <input
              name="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">العنوان</label>
            <input
              name="street"
              value={form.street}
              onChange={(e) => setForm({ ...form, street: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">الشركة</label>
            <input
              name="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="border rounded px-3 py-2 outline-none w-full"
            />
          </div>

          <div className="flex justify-end gap-2 mt-3">
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
              className="px-3 py-2 outline-none bg-[#09adce] text-white rounded"
            >
              {loading ? "جارٍ الإضافة..." : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierModal;
