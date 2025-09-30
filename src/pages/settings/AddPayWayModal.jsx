import React, { useState } from "react";
import CustomSelect from "../../components/shared/CustomSelect";
import { GoX } from "react-icons/go";
const AddPayWayModal = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    account: null,
    paymentType: "", // Will store one of: "نقدي", "الافتراضي للدفع", "مفغل"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSelectChange = (selected, { name }) => {
    setForm({ ...form, [name]: selected });
  };

  const handleSubmit = () => {
    const formatted = {
      ...form,
      account: form.account?.value || "",
    };
    onSave(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4 flex justify-between">
          إضافة طريقة دفع{" "}
          <span className="text-3xl weight-thin cursor-pointer" onClick={onClose}>
            <GoX />
          </span>
        </h3>
        <hr />
        <div className="flex flex-col gap-3 mt-6">
          <input
            name="name"
            placeholder="الاسم"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <CustomSelect
            name="account"
            options={[
              { value: "حساب1", label: "حساب1" },
              { value: "حساب2", label: "حساب2" },
              { value: "حساب3", label: "حساب3" },
            ]}
            value={form.account}
            onChange={handleSelectChange}
            placeholder="اختر الحساب"
          />

          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="نقدي"
                checked={form.paymentType === "نقدي"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>نقدي</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="الافتراضي للدفع"
                checked={form.paymentType === "الافتراضي للدفع"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>الافتراضي للدفع</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentType"
                value="مفغل"
                checked={form.paymentType === "مفغل"}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span>مفغل</span>
            </label>
          </div>
          <hr />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#0d6efd] text-white rounded"
          >
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPayWayModal;
