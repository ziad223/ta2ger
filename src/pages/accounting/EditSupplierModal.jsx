"use client";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";

const EditSupplierModal = ({ supplier, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    tax_number: "",
    phone: "",
    street: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  // ✅ تحميل بيانات المورد عند فتح المودال
  useEffect(() => {
    if (supplier) {
      setForm({
        name: supplier.name || "",
        tax_number: supplier.tax_number || "",
        phone: supplier.phone || "",
        street: supplier.street || "",
        company: supplier.company || "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ تحديث بيانات المورد
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supplier?.id) {
      toast.error("لم يتم العثور على المورد المحدد");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await apiServiceCall({
        url: `suppliers/${supplier.id}`,
        method: "PUT",
        body: {
          name: form.name,
          phone: form.phone,
          street: form.street,
          company: form.company,
          tax_number: form.tax_number,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.status) {
        toast.success(res?.message || "تم تحديث المورد بنجاح ✅");
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1000);
      } else {
        toast.error(res?.message || "فشل تحديث المورد ❌");
      }
    } catch (error) {
      console.error("❌ خطأ أثناء التحديث:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "حدث خطأ أثناء التحديث"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!supplier) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
        <h3 className="text-lg font-bold mb-4">تعديل المورد</h3>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {["name", "tax_number", "phone", "street", "company"].map((key) => (
            <input
              key={key}
              name={key}
              value={form[key] || ""}
              onChange={handleChange}
              placeholder={
                key === "name"
                  ? "اسم المورد"
                  : key === "tax_number"
                  ? "الرقم الضريبي"
                  : key === "phone"
                  ? "رقم الهاتف"
                  : key === "street"
                  ? "العنوان"
                  : "الشركة"
              }
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce]"
              required={key === "name" || key === "phone"}
            />
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#09adce] text-white rounded-md hover:bg-[#0b9cb9]"
            >
              {loading ? "جارٍ الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSupplierModal;
