import React, { useState, useEffect } from "react";

const EditAlertModal = ({ isOpen, onClose, alert, onSave }) => {
  const [formData, setFormData] = useState({
    client: "",
    hall: "",
    reservationId: "",
    date: "",
    deposit: "",
    dueAmount: "",
    alert: "",
    whatsapp: "",
  });

  useEffect(() => {
    if (alert) {
      setFormData(alert);
    }
  }, [alert]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...alert, ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h3 className="text-lg font-bold mb-4">تعديل التنبيه</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:
        3grid-cols-2 gap-4">

          <div>
            <label className="block mb-1 text-sm font-medium">العميل</label>
            <input
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="العميل"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">القاعة</label>
            <input
              name="hall"
              value={formData.hall}
              onChange={handleChange}
              placeholder="القاعة"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">رقم الحجز</label>
            <input
              name="reservationId"
              value={formData.reservationId}
              onChange={handleChange}
              placeholder="رقم الحجز"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">التاريخ</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">المقدم</label>
            <input
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              placeholder="المقدم"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">المبلغ المتأخر</label>
            <input
              name="dueAmount"
              value={formData.dueAmount}
              onChange={handleChange}
              placeholder="المبلغ المتأخر"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium">التنبيه</label>
            <input
              name="alert"
              value={formData.alert}
              onChange={handleChange}
              placeholder="التنبيه"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium">واتساب</label>
            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="واتساب"
              className="border p-2 rounded w-full outline-none"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              حفظ
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditAlertModal;
