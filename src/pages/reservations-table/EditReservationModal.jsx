import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const EditReservationModal = ({ isOpen, onClose, onSave, reservation }) => {
  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    eventType: "",
    startDate: "",
    endDate: "",
    hall: "",
    notes: "",
  });

  useEffect(() => {
    if (reservation) {
      setFormData({
        client: reservation.client || "",
        phone: reservation.phone || "",
        eventType: reservation.eventType || "",
        startDate: reservation.startDate || "",
        endDate: reservation.endDate || "",
        hall: reservation.hall || "",
        notes: reservation.notes || "",
      });
    }
  }, [reservation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (selected, { name }) => {
    setFormData((prev) => ({ ...prev, [name]: selected ? selected.value : "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...reservation, ...formData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl">
        <h3 className="text-lg font-semibold mb-4">تعديل الحجز</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="اسم العميل"
            className="w-full border rounded px-3 h-10 outline-none"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="رقم الجوال"
            className="w-full border rounded px-3 h-10 outline-none"
          />

          <CustomSelect
            name="eventType"
            value={
              formData.eventType
                ? { value: formData.eventType, label: formData.eventType }
                : null
            }
            onChange={handleSelectChange}
            options={[
              { value: "زفاف", label: "زفاف" },
              { value: "تخرج", label: "تخرج" },
              { value: "اجتماع", label: "اجتماع" },
            ]}
            placeholder="اختر نوع المناسبة"
          />

          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border rounded px-3 h-10 outline-none"
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border rounded px-3 h-10 outline-none"
          />
          <input
            type="text"
            name="hall"
            value={formData.hall}
            onChange={handleChange}
            placeholder="اسم القاعة"
            className="w-full border rounded px-3 h-10 outline-none"
          />

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="ملاحظات"
            className="col-span-2 w-full border rounded px-3 py-2 outline-none"
          />

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 outline-none border rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 outline-none bg-blue-500 text-white rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReservationModal;
