import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";
const EditPayWayModal = ({ payWay, onClose, onSave }) => {
  const [form, setForm] = useState({
    ...payWay,
    status: payWay?.status ? { value: payWay.status, label: payWay.status } : null,
    cash: payWay?.cash ? { value: payWay.cash, label: payWay.cash } : null,
    defaultPayment: payWay?.defaultPayment
      ? { value: payWay.defaultPayment, label: payWay.defaultPayment }
      : null,
  });

  useEffect(() => {
    if (payWay) {
      setForm({
        ...payWay,
        status: payWay.status ? { value: payWay.status, label: payWay.status } : null,
        cash: payWay.cash ? { value: payWay.cash, label: payWay.cash } : null,
        defaultPayment: payWay.defaultPayment
          ? { value: payWay.defaultPayment, label: payWay.defaultPayment }
          : null,
      });
    }
  }, [payWay]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selected, { name }) => {
    setForm({ ...form, [name]: selected });
  };

  const handleSubmit = () => {
    const formatted = {
      ...form,
      status: form.status?.value || "",
      cash: form.cash?.value || "",
      defaultPayment: form.defaultPayment?.value || "",
    };
    onSave(formatted);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">تعديل طريقة الدفع</h3>

        <div className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="الاسم"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="accountNumber"
            placeholder="رقم الحساب"
            value={form.accountNumber}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* status */}
          <CustomSelect
            name="status"
            options={[
              { value: "نشط", label: "نشط" },
              { value: "موقوف", label: "موقوف" },
            ]}
            value={form.status}
            onChange={handleSelectChange}
            placeholder="اختر الحالة"
          />

          {/* cash */}
          <CustomSelect
            name="cash"
            options={[
              { value: "نعم", label: "نعم" },
              { value: "لا", label: "لا" },
            ]}
            value={form.cash}
            onChange={handleSelectChange}
            placeholder="كاش؟"
          />

          {/* defaultPayment */}
          <CustomSelect
            name="defaultPayment"
            options={[
              { value: "نعم", label: "نعم" },
              { value: "لا", label: "لا" },
            ]}
            value={form.defaultPayment}
            onChange={handleSelectChange}
            placeholder="افتراضي؟"
          />

          <input
            name="employees"
            placeholder="الموظفين"
            value={form.employees}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#0dcaf0] text-white rounded"
          >
            تحديث
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPayWayModal;
