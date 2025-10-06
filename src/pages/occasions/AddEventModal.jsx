import React, { useState, useEffect } from "react";
import { toast , ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";
import CustomSelect from "../../components/shared/CustomSelect";

const AddEventModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({ title: "", status: "" });
  const [loading, setLoading] = useState(false);

  // 🧹 إعادة تعيين الحقول عند فتح المودال
  useEffect(() => {
    if (isOpen) {
      setForm({ title: "", status: "" });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const statusOptions = [
    { value: "مفتوح", label: "مفتوح" },
    { value: "مغلق", label: "مغلق" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected) => {
    setForm((prev) => ({ ...prev, status: selected ? selected.value : "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const statusBoolean = form.status === "مفتوح" ? true : false;

      const response = await apiServiceCall({
        url: "occasions",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { name: form.title, status: statusBoolean },
      });

      toast.success("تم إضافة المناسبة بنجاح!");
      onAdd(response.data);

      setTimeout(() => onClose(), 1500);
    } catch (err) {
      console.error("Error adding occasion:", err);
      toast.error("❌ فشل إضافة المناسبة، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 md:w-full max-w-md w-[90%]">
        <h2 className="text-lg font-bold mb-4">إضافة مناسبة جديدة</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            placeholder="اسم المناسبة"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />

          <CustomSelect
            options={statusOptions}
            value={form.status ? statusOptions.find((opt) => opt.value === form.status) : null}
            onChange={handleSelectChange}
            placeholder="اختر الحالة"
            name="status"
            className="w-full"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-gray-300 rounded"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className={`px-3 py-2 bg-green-600 text-white rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "جاري الحفظ..." : "حفظ"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
