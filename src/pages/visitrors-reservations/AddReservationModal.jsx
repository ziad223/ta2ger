import React, { useState } from "react";
import CustomSelect from "../../components/shared/CustomSelect"; // ✅ استدعاء الكومبوننت

const AddReservationModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
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
    owner: "",
    notes: "",
  });

  const eventOptions = [
    { value: "زفاف", label: "زفاف" },
    { value: "تخرج", label: "تخرج" },
    { value: "اجتماع", label: "اجتماع" },
  ];

  const ownerOptions = [
    { value: "نبيل 1", label: "نبيل 1" },
    { value: "نبيل 2", label: "نبيل 2" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, option) => {
    setFormData((prev) => ({ ...prev, [name]: option?.value || "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total =
      Number(formData.amount || 0) -
      Number(formData.discount || 0) +
      Number(formData.tax || 0);
    const remaining = total - Number(formData.paid || 0);

    const newReservation = {
      ...formData,
      id: Date.now(),
      total,
      paidTotal: formData.paid,
      cash: formData.paid,
      network: 0,
      remaining,
      reservationStatus: "مؤكد",
      paymentStatus: remaining === 0 ? "مدفوع" : "جزئي",
    };
    onAdd(newReservation);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">إضافة حجز جديد</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            name="client"
            placeholder="اسم العميل"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />
          <input
            name="phone"
            placeholder="رقم الجوال"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />

          {/* ✅ نوع المناسبة */}
          <CustomSelect
            options={eventOptions}
            value={eventOptions.find((opt) => opt.value === formData.eventType)}
            onChange={(option) => handleSelectChange("eventType", option)}
            placeholder="نوع المناسبة"
          />

          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />
          <input
            name="hall"
            placeholder="القاعة"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />
          <input
            name="sections"
            placeholder="الأقسام"
            onChange={handleChange}
            className="border px-3 h-10 rounded"
          />
          <input
            name="amount"
            type="number"
            placeholder="المبلغ"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />
          <input
            name="discount"
            type="number"
            placeholder="الخصم"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
          />
          <input
            name="paid"
            type="number"
            placeholder="المقدم"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
            required
          />
          <input
            name="tax"
            type="number"
            placeholder="الضريبة"
            onChange={handleChange}
            className="border px-3 h-10 rounded outline-none"
          />

          {/* ✅ المالك */}
          <CustomSelect
            options={ownerOptions}
            value={ownerOptions.find((opt) => opt.value === formData.owner)}
            onChange={(option) => handleSelectChange("owner", option)}
            placeholder="اختر المالك"
          />

        <div className="col-span-2">
           <textarea
  name="notes"
  placeholder="ملاحظات"
  onChange={handleChange}
  className="border px-3 py-2 rounded outline-none w-full min-h-[120px] resize-y"
/>
        </div>


          <div className="col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-[#2ba670] text-white px-4 py-2 rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReservationModal;
