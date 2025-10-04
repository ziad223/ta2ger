import React, { useState } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const AddServiceModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    purchasePrice: "",
    salePrice: "",
    enableQty: { value: "نعم", label: "نعم" },
    quantity: "",
    barcode: "",
    unit: "",
    isDefault: { value: "لا", label: "لا" },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selected, { name }) => {
    setForm({ ...form, [name]: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...form,
      enableQty: form.enableQty?.value,
      isDefault: form.isDefault?.value,
    };
    onAdd(formattedData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-3 sm:p-5">
      <div className="bg-white w-full max-w-3xl p-4 sm:p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center sm:text-right">
          إضافة خدمة جديدة
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          <input
            type="text"
            name="image"
            placeholder="رابط صورة الخدمة"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="اسم الخدمة"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="القسم"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.category}
            onChange={handleChange}
          />
          <input
            type="number"
            name="purchasePrice"
            placeholder="سعر الشراء"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.purchasePrice}
            onChange={handleChange}
          />
          <input
            type="number"
            name="salePrice"
            placeholder="سعر البيع"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.salePrice}
            onChange={handleChange}
          />

          <CustomSelect
            name="enableQty"
            options={[
              { value: "نعم", label: "نعم" },
              { value: "لا", label: "لا" },
            ]}
            value={form.enableQty}
            onChange={handleSelectChange}
            placeholder="تفعيل الكمية؟"
          />

          <input
            type="number"
            name="quantity"
            placeholder="الكمية"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.quantity}
            onChange={handleChange}
          />
          <input
            type="text"
            name="barcode"
            placeholder="الباركود"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.barcode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="unit"
            placeholder="الوحدة"
            className="border p-2 w-full rounded outline-none text-sm sm:text-base"
            value={form.unit}
            onChange={handleChange}
          />

          <CustomSelect
            name="isDefault"
            options={[
              { value: "نعم", label: "نعم" },
              { value: "لا", label: "لا" },
            ]}
            value={form.isDefault}
            onChange={handleSelectChange}
            placeholder="افتراضي؟"
          />

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded outline-none text-sm sm:text-base w-full sm:w-auto"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded outline-none text-sm sm:text-base w-full sm:w-auto"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
