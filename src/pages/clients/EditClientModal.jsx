import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import apiServiceCall from "../../utils/apiServiceCall";
import CustomSelect from "../../components/shared/CustomSelect";

const EditClientModal = ({ isOpen, onClose, client }) => {
  const [formData, setFormData] = useState({
    name: "",
    nationalId: "",
    phone: "",
    altPhone: "",
    address: "",
    hall: "",
    tax_no: "",
  });

  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hallsLoading, setHallsLoading] = useState(false);

  // 🟢 تعبئة البيانات عند فتح المودال
  useEffect(() => {
    if (isOpen && client) {
      fetchHalls();
      populateFormData(client);
    }
  }, [isOpen, client]);

  // 🟢 عند تحميل القاعات، تأكد من تحديث القاعة المحددة
  useEffect(() => {
    if (halls.length > 0 && formData.hall) {
      const selected = halls.find(h => h.value === formData.hall);
      if (!selected) {
        // لو القاعة الحالية مش موجودة ضمن القائمة
        setFormData(prev => ({ ...prev, hall: "" }));
      }
    }
  }, [halls]);

  // 🟢 تعبئة بيانات العميل في النموذج
  const populateFormData = (clientData) => {
    setFormData({
      name: clientData.name || "",
      nationalId: clientData.id_number || clientData.nationalId || "",
      phone: clientData.phone || "",
      altPhone: clientData.alt_phone || clientData.altPhone || "",
      address: clientData.address || "",
      hall: clientData.hall_id || clientData.hall || "",
      tax_no: clientData.tax_no || "",
    });
  };

  // 🟢 جلب القاعات
  const fetchHalls = async () => {
    setHallsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await apiServiceCall({
        url: "halls",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.status && response.data) {
        const hallsOptions = response.data.map((hall) => ({
          value: hall.id,
          label: hall.name,
        }));
        setHalls(hallsOptions);
      }
    } catch (error) {
      console.error("Error fetching halls:", error);
      toast.error("فشل في تحميل القاعات");
    } finally {
      setHallsLoading(false);
    }
  };

  // 🟢 تغيير النصوص العادية
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 تغيير القاعة المختارة
  const handleHallChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      hall: selectedOption ? selectedOption.value : "",
    }));
  };

  // 🟢 إرسال البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!client?.id) {
      toast.error("لا يوجد عميل محدد");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await apiServiceCall({
        url: `clients/${client.id}`,
        method: "PUT",
        body: {
          name: formData.name,
          id_number: formData.nationalId,
          phone: formData.phone,
          alt_phone: formData.altPhone,
          address: formData.address,
          hall_id: formData.hall,
          tax_no: formData.tax_no,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res?.status) {
        toast.success(res?.message || "تم تحديث بيانات العميل بنجاح");
        setTimeout(() => onClose(), 1000);
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.error(res?.message || "حدث خطأ أثناء التحديث");
      }
    } catch (error) {
      console.error("Update client error:", error);
      toast.error(error?.response?.data?.message || error.message || "حدث خطأ أثناء التحديث");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // 🟢 القاعة الحالية
  const selectedHall = halls.find((h) => h.value === formData.hall) || null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg w-full overflow-auto max-h-[90%] lg:h-[90%] max-w-2xl mx-4">
        <h3 className="text-lg font-bold mb-4 text-right">تعديل بيانات العميل</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* الاسم */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">الاسم</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none text-right"
              required
              placeholder="أدخل اسم العميل"
            />
          </div>

          {/* رقم الجوال */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">رقم الجوال</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none text-right"
              required
              placeholder="أدخل رقم الجوال"
            />
          </div>

          {/* رقم جوال آخر */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">رقم جوال آخر</label>
            <input
              name="altPhone"
              value={formData.altPhone}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none text-right"
              placeholder="أدخل رقم جوال إضافي"
            />
          </div>

          {/* الرقم الضريبي */}
          <div>
            <label className="block mb-1 text-sm font-medium text-right">الرقم الضريبي</label>
            <input
              name="tax_no"
              value={formData.tax_no}
              onChange={handleChange}
              className="border p-2 rounded w-full outline-none text-right"
              placeholder="أدخل الرقم الضريبي"
            />
          </div>

          {/* القاعة */}
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-right">القاعة</label>
            <CustomSelect
              options={halls}
              value={selectedHall}
              onChange={handleHallChange}
              placeholder={"اختر القاعة"}
              isSearchable
            />
          </div>

          <div className="flex justify-end gap-3 mt-auto md:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientModal;
