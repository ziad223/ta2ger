import React, { useState, useEffect } from "react";
import CustomSelect from "../../../components/shared/CustomSelect";

const EditOfferModal = ({ isOpen, onClose, onUpdate, offer }) => {
  const [form, setForm] = useState(offer || {});

  useEffect(() => {
    if (offer) setForm(offer);
  }, [offer]);

  if (!isOpen || !offer) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selected, name) => {
    setForm({ ...form, [name]: selected.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">تعديل العرض</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="اسم المنتج"
            className="border p-2 w-full rounded"
            value={form.name || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="start"
            className="border p-2 w-full rounded"
            value={form.start || ""}
            onChange={handleChange}
          />
          <input
            type="date"
            name="end"
            className="border p-2 w-full rounded"
            value={form.end || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="discount"
            placeholder="النسبة"
            className="border p-2 w-full rounded"
            value={form.discount || ""}
            onChange={handleChange}
          />

          {/* CustomSelect بدل select */}
          <CustomSelect
            name="showDiscount"
            value={
              form.showDiscount
                ? { value: form.showDiscount, label: form.showDiscount }
                : null
            }
            onChange={(selected) =>
              handleSelectChange(selected, "showDiscount")
            }
            options={[
              { value: "نعم", label: "نعم" },
              { value: "لا", label: "لا" },
            ]}
            placeholder="عرض الخصم"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOfferModal;
