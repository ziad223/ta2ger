import React, { useState, useEffect } from "react";
import CustomSelect from "../../components/shared/CustomSelect";

const AddReservationModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    client: "",
    phone: "",
    hall: "",
    departments: [],
    occasion: "",
    price: "",
    startDate: "",
    days: 1,
    endDate: "",
    hijriStartDate: "",
    hijriEndDate: "",
    services: [],
    selectedService: "",
    cashAmount: 0,
    networkAmount: 0,
    bookingAmount: 0,
    discount: 0,
    afterDiscount: 0,
    tax: 0,
    total: 0,
    paymentStatus: "غير مدفوع",
    contractCreated: { date: "09/24/2025", status: "تم" },
    contractSigned: { date: "09/24/2025", status: "تم" },
    deposit: { date: "09/24/2025", status: "تم" },
    bookingCompleted: { date: "09/24/2025", status: "تم" },
    notes: "",
  });

  // Options
  const clientOptions = [
    { value: "client1", label: "عميل ١" },
    { value: "client2", label: "عميل ٢" },
    { value: "client3", label: "عميل ٣" },
  ];

  const hallOptions = [
    { value: "hall1", label: "قاعة الأفراح" },
    { value: "hall2", label: "قاعة المؤتمرات" },
    { value: "hall3", label: "قاعة المناسبات" },
  ];

  const departmentOptions = [
    { value: "men", label: "قسم الرجال" },
    { value: "women", label: "قسم النساء" },
  ];

  const occasionOptions = [
    { value: "wedding", label: "زفاف" },
    { value: "birthday", label: "عيد ميلاد" },
    { value: "conference", label: "مؤتمر" },
    { value: "party", label: "حفلة" },
  ];

  const serviceOptions = [
    { value: "catering", label: "خدمات الطعام" },
    { value: "decoration", label: "الديكور" },
    { value: "photography", label: "التصوير" },
    { value: "music", label: "الموسيقى" },
    { value: "lighting", label: "الإضاءة" },
  ];

  const statusOptions = [
    { value: "مؤكد", label: "مؤكد" },
    { value: "معلق", label: "معلق" },
    { value: "ملغي", label: "ملغي" },
  ];

  const paymentOptions = [
    { value: "مدفوع", label: "مدفوع" },
    { value: "جزئي", label: "جزئي" },
    { value: "غير مدفوع", label: "غير مدفوع" },
  ];

  const ownerOptions = [
    { value: "owner1", label: "مالك ١" },
    { value: "owner2", label: "مالك ٢" },
  ];

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, option) => {
    setFormData((prev) => ({ ...prev, [name]: option?.value || "" }));
  };

  const handleMultiSelectChange = (name, options) => {
    setFormData((prev) => ({
      ...prev,
      [name]: options ? options.map((o) => o.value) : [],
    }));
  };

  const addService = () => {
    if (
      formData.selectedService &&
      !formData.services.includes(formData.selectedService)
    ) {
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, formData.selectedService],
        selectedService: "",
      }));
    }
  };

  const removeService = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== service),
    }));
  };

  // حساب التواريخ والمبالغ
  useEffect(() => {
    // تاريخ النهاية
    if (formData.startDate && formData.days) {
      const start = new Date(formData.startDate);
      const end = new Date(start);
      end.setDate(start.getDate() + parseInt(formData.days));
      setFormData((prev) => ({
        ...prev,
        endDate: end.toISOString().split("T")[0],
      }));
    }

    // المبالغ المالية
    const bookingAmount = parseFloat(formData.price) || 0;
    const servicesAmount = formData.services.length * 100;
    const totalBeforeDiscount = bookingAmount + servicesAmount;
    const afterDiscount = totalBeforeDiscount - (parseFloat(formData.discount) || 0);
    const taxAmount = afterDiscount * 0.15;
    const totalAmount = afterDiscount + taxAmount;
    const paidAmount = (parseFloat(formData.cashAmount) || 0) + (parseFloat(formData.networkAmount) || 0);

    setFormData((prev) => ({
      ...prev,
      bookingAmount: totalBeforeDiscount,
      afterDiscount,
      tax: taxAmount,
      total: totalAmount,
      paymentStatus: totalAmount - paidAmount <= 0 ? "مدفوع" : "غير مدفوع",
    }));
  }, [
    formData.price,
    formData.days,
    formData.startDate,
    formData.services,
    formData.discount,
    formData.cashAmount,
    formData.networkAmount,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-6xl p-6 rounded-lg shadow-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4 text-right">إضافة حجز جديد</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* العميل */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">العميل</label>
            <CustomSelect
              options={clientOptions}
              value={clientOptions.find((opt) => opt.value === formData.client)}
              onChange={(opt) => handleSelectChange("client", opt)}
              placeholder="اختر العميل"
            />
          </div>

          {/* الهاتف */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">رقم الجوال</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          {/* القاعة */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">القاعة</label>
            <CustomSelect
              options={hallOptions}
              value={hallOptions.find((opt) => opt.value === formData.hall)}
              onChange={(opt) => handleSelectChange("hall", opt)}
              placeholder="اختر القاعة"
            />
          </div>
          {/* الأقسام */}
          <div className="sm:col-span-1">
            <label className="block mb-1 text-sm font-medium text-right">الأقسام</label>
            <CustomSelect
              options={departmentOptions}
              value={departmentOptions.filter((opt) => formData.departments.includes(opt.value))}
              onChange={(opts) => handleMultiSelectChange("departments", opts)}
              isMulti
              placeholder="اختر الأقسام"
            />
          </div>

          {/* المناسبة */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">المناسبة</label>
            <CustomSelect
              options={occasionOptions}
              value={occasionOptions.find((opt) => opt.value === formData.occasion)}
              onChange={(opt) => handleSelectChange("occasion", opt)}
              placeholder="اختر المناسبة"
            />
          </div>

          {/* السعر */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">السعر</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          {/* عدد الأيام */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">عدد الأيام</label>
            <input
              type="number"
              name="days"
              value={formData.days}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          {/* تاريخ البداية */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">تاريخ البداية</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          {/* تاريخ النهاية */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">تاريخ النهاية</label>
            <input
              type="date"
              value={formData.endDate}
              readOnly
              className="border px-3 h-10 rounded w-full bg-gray-100 text-gray-600 text-right"
            />
          </div>

          {/* Hijri dates */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">تاريخ البداية الهجري</label>
            <input
              type="text"
              name="hijriStartDate"
              value={formData.hijriStartDate}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-right">تاريخ النهاية الهجري</label>
            <input
              type="text"
              name="hijriEndDate"
              value={formData.hijriEndDate}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          {/* الخدمات */}
          <div className="sm:col-span-2">
            <label className="block mb-1 text-sm font-medium text-right">الخدمات</label>
            <div className="flex gap-2">
              <CustomSelect
                options={serviceOptions}
                value={serviceOptions.find((opt) => opt.value === formData.selectedService)}
                onChange={(opt) => handleSelectChange("selectedService", opt)}
                placeholder="اختر خدمة"
              />
              <button
                type="button"
                onClick={addService}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                إضافة
              </button>
            </div>
            <div className="mt-2 space-y-1">
              {formData.services.map((s) => (
                <div key={s} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <span>{serviceOptions.find((opt) => opt.value === s)?.label}</span>
                  <button type="button" onClick={() => removeService(s)} className="text-red-600">
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* المبالغ */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">المبلغ</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-right">الخصم</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-right">الضريبة</label>
            <input
              type="number"
              name="tax"
              value={formData.tax}
              readOnly
              className="border px-3 h-10 rounded w-full bg-gray-100 text-gray-600 text-right"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-right">نقدا</label>
            <input
              type="number"
              name="cashAmount"
              value={formData.cashAmount}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-right">شبكة</label>
            <input
              type="number"
              name="networkAmount"
              value={formData.networkAmount}
              onChange={handleChange}
              className="border px-3 h-10 rounded w-full outline-none text-right"
            />
          </div>

          {/* حالة الحجز */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">حالة الحجز</label>
            <CustomSelect
              options={statusOptions}
              value={statusOptions.find((opt) => opt.value === formData.reservationStatus)}
              onChange={(opt) => handleSelectChange("reservationStatus", opt)}
              placeholder="اختر الحالة"
            />
          </div>

          {/* حالة الدفع */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">حالة الدفع</label>
            <CustomSelect
              options={paymentOptions}
              value={paymentOptions.find((opt) => opt.value === formData.paymentStatus)}
              onChange={(opt) => handleSelectChange("paymentStatus", opt)}
              placeholder="اختر الحالة"
            />
          </div>

          {/* الملاحظات */}
          <div className="sm:col-span-3">
            <label className="block mb-1 text-sm font-medium text-right">ملاحظات</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full outline-none text-right"
              rows={3}
            ></textarea>
          </div>

          {/* أزرار */}
          <div className="sm:col-span-3 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              إضافة الحجز
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReservationModal;
