import React, { useState } from 'react';
import { FaBoxOpen, FaCalendarAlt, FaMoneyBillWave, FaTasks, FaUser } from 'react-icons/fa';
import Container from '../../components/shared/Container';
import CustomSelect from '../../components/shared/CustomSelect';
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdOutlinePayment } from 'react-icons/md';
import { CiStickyNote } from "react-icons/ci";
import AddClientModal from './AddClientModal';
const AddBookingForm = () => {
  const [selectedService, setSelectedService] = useState(null);
  const handleSelectChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };
  const serviceOptions = [
    { value: "cleaning", label: "تنظيف" },
    { value: "maintenance", label: "صيانة" },
    { value: "consulting", label: "استشارة" },
  ];
  const [formDataa, setFormDataa] = useState({
  client: null,
  hall: null,
  departments: [],
  occasion: null,
  price: '',
  startDate: '',
  days: 1,
  endDate: '',
  startHijri: '',
  endHijri: '',
  stages: [
    { id: 1, name: 'إنشاء العقد', date: '', done: false },
    { id: 2, name: 'توقيع العقد', date: '', done: false },
    { id: 3, name: 'العربون', date: '', done: false },
    { id: 4, name: 'تم الحجز', date: '', done: false },
  ],
});

  const [formData, setFormData] = useState({
    client: null,
    hall: null,
    departments: [],
    occasion: null,
    price: '',
    startDate: '',
    days: 1,
    endDate: '',
    startHijri: '',
    endHijri: '',
    bookingAmount: 0,
    discount: 0,
    afterDiscount: 0,
    tax: 0,
    total: 0,
    paymentStatus: ''
  });

  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const clientOptions = [
    { value: 'client1', label: 'عميل 1' },
    { value: 'client2', label: 'عميل 2' },
  ];

  const hallOptions = [
    { value: 'hall1', label: 'القاعة 1' },
    { value: 'hall2', label: 'القاعة 2' },
  ];

  const departmentOptions = [
    { value: 'men', label: 'قسم الرجال' },
    { value: 'women', label: 'قسم النساء' },
  ];

  const occasionOptions = [
    { value: 'wedding', label: 'زواج' },
    { value: 'birthday', label: 'عيد ميلاد' },
    { value: 'conference', label: 'مؤتمر' },
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  const updateStage = (index, patch) => {
    setFormDataa(prev => {
      const stages = prev.stages.map((s, i) => (i === index ? { ...s, ...patch } : s));
      return { ...prev, stages };
    });
  };

  const deleteStage = (index) => {
    setFormDataa(prev => {
      const stages = prev.stages.filter((_, i) => i !== index);
      return { ...prev, stages };
    });
  };

  return (
    <Container>
      <div className="my-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-right">
          إضافة حجز جديد
        </h1>

        {/* الصف الأول - معلومات العميل وتفاصيل الحجز */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* معلومات العميل */}
          <div className="w-full lg:w-[60%] rounded-lg bg-white shadow-lg">
            <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaUser />
                <span>معلومات العميل</span>
              </div>
              <button 
                className="bg-white rounded-[20px] px-5 py-3 text-black font-semibold text-sm hover:bg-gray-100 transition-colors"
                onClick={() => setShowAddClientModal(true)}
              >
                إضافة عميل +
              </button>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* العميل */}
                <div>
                  <label className="block mb-2 font-medium text-sm">العميل *</label>
                  <CustomSelect
                    options={clientOptions}
                    value={formData.client}
                    onChange={(val) => handleChange('client', val)}
                    placeholder="اختر العميل"
                  />
                </div>

                {/* القاعة */}
                <div>
                  <label className="block mb-2 font-medium text-sm">القاعة *</label>
                  <CustomSelect
                    options={hallOptions}
                    value={formData.hall}
                    onChange={(val) => handleChange('hall', val)}
                    placeholder="اختر القاعة"
                  />
                </div>

                {/* الأقسام */}
                <div>
                  <label className="block mb-2 font-medium text-sm">الأقسام</label>
                  <CustomSelect
                    options={departmentOptions}
                    value={formData.departments}
                    onChange={(val) => handleChange('departments', val)}
                    placeholder="اختر الأقسام"
                    isMulti
                  />
                </div>

                {/* المناسبة */}
                <div>
                  <label className="block mb-2 font-medium text-sm">المناسبة *</label>
                  <CustomSelect
                    options={occasionOptions}
                    value={formData.occasion}
                    onChange={(val) => handleChange('occasion', val)}
                    placeholder="اختر المناسبة"
                  />
                </div>

                {/* السعر */}
                <div className='col-span-2'>
                  <label className="block mb-2 font-medium text-sm">
                    السعر * <span className='text-red-500 text-xs'>( يمكنك هنا تعديل سعر القاعة فقط)</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    placeholder="يمكنك هنا تعديل سعر القاعة"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* تفاصيل الحجز */}
          <div className="w-full lg:w-[40%] rounded-lg bg-white shadow-lg">
            <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>تفاصيل الحجز</span>
              </div>
              <BsFillInfoCircleFill className='text-2xl' />
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium text-sm">تاريخ بداية الحجز *</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                  />
                </div>

                {/* عدد الأيام */}
                <div>
                  <label className="block mb-2 font-medium text-sm">عدد الأيام *</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    value={formData.days}
                    onChange={(e) => handleChange('days', e.target.value)}
                  />
                </div>

                {/* تاريخ نهاية الحجز */}
                <div>
                  <label className="block mb-2 font-medium text-sm">تاريخ نهاية الحجز *</label>
                  <input
                    type="date"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                  />
                </div>

                {/* بداية الحجز الهجري */}
                <div>
                  <label className="block mb-2 font-medium text-sm">تاريخ بداية الحجز الهجري *</label>
                  <input
                    type="text"
                    placeholder="اختر التاريخ"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    value={formData.startHijri}
                    onChange={(e) => handleChange('startHijri', e.target.value)}
                  />
                </div>

                {/* نهاية الحجز الهجري */}
                <div className="md:col-span-2">
                  <label className="block mb-2 font-medium text-sm">تاريخ نهاية الحجز الهجري *</label>
                  <input
                    type="text"
                    placeholder="اختر التاريخ"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    value={formData.endHijri}
                    onChange={(e) => handleChange('endHijri', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* قسم الخدمات */}
        <div className='bg-white shadow-lg rounded-lg mt-5'>
          <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUser />
              <span>الخدمات</span>
            </div>
           <CustomSelect
  options={serviceOptions}
  value={selectedService}
  onChange={handleSelectChange}
  placeholder="اختر الخدمة"
  isMulti={false}
  className="rounded-[10px]"
  styles={{
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#9CA3AF" 
        : "#9CA3AF",
      color: "white", 
      cursor : 'pointer'
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#9CA3AF", // خلفية القائمة نفسها
    }),
  }}
/>


          </div>
          <div className="p-5 flex items-center justify-center flex-col gap-3">
            <FaBoxOpen size={40} className='text-gray-800'/>
            <h2 className='my-2 text-gray-700'>لم يتم إضافة أي خدمات بعد</h2>
            <h3 className='text-gray-500'>اختر خدمة من القائمة أعلاه لإضافتها</h3>
          </div>
        </div>

        {/* الصف الثاني - طرق الدفع والتفاصيل المالية */}
        <div className="flex flex-col lg:flex-row gap-5 mt-5">
          {/* طرق الدفع */}
          <div className="w-full lg:w-[50%] rounded-lg bg-white shadow-lg">
            <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MdOutlinePayment size={20} />
                <span>طرق الدفع</span>
              </div>
              <button className="bg-white rounded-[20px] text-red-600 px-5 py-3 font-semibold text-sm">
                المتبقي : 30
              </button>
            </div>

            <div className="p-5 flex flex-col gap-5">
              <div className='bg-[#f8f9fa] py-5 rounded-lg px-7 flex items-center justify-between w-full'>
                <h2 className='font-medium'>نقدا</h2>
                <div className='flex'>
                  <input 
                    type="text" 
                    className='h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-24 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent' 
                    value={0} 
                    readOnly
                  />
                  <button className='px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700'>
                    ر.س
                  </button>
                </div>
              </div>
              <div className='bg-[#f8f9fa] py-5 rounded-lg px-7 flex items-center justify-between w-full'>
                <h2 className='font-medium'>نقدا</h2>
                <div className='flex'>
                  <input 
                    type="text" 
                    className='h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-24 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent' 
                    value={0} 
                    readOnly
                  />
                  <button className='px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700'>
                    ر.س
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* التفاصيل المالية */}
          <div className="w-full lg:w-[50%] rounded-lg bg-white shadow-lg">
            <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className='text-2xl' />
                <span>التفاصيل المالية</span>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium text-sm">مبلغ الحجز + مبلغ الخدمات</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                      value={formData.bookingAmount || 0}
                      onChange={(e) => handleChange('bookingAmount', e.target.value)}
                    />
                    <button className="px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700">ر.س</button>
                  </div>
                </div>

                {/* الخصم */}
                <div>
                  <label className="block mb-2 font-medium text-sm">الخصم *</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                      value={formData.discount || 0}
                      onChange={(e) => handleChange('discount', e.target.value)}
                    />
                    <button className="px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700">ر.س</button>
                  </div>
                </div>

                {/* المبلغ بعد الخصم */}
                <div> 
                  <label className="block mb-2 font-medium text-sm">المبلغ بعد الخصم</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                      value={formData.afterDiscount || 0}
                      onChange={(e) => handleChange('afterDiscount', e.target.value)}
                    />
                    <button className="px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700">ر.س</button>
                  </div>
                </div>

                {/* الضريبة */}
                <div>
                  <label className="block mb-2 font-medium text-sm">الضريبة</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                      value={formData.tax || 0}
                      onChange={(e) => handleChange('tax', e.target.value)}
                    />
                    <button className="px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700">ر.س</button>
                  </div>
                </div>

                {/* الإجمالي */}
                <div>
                  <label className="block mb-2 font-medium text-sm">الإجمالي</label>
                  <div className="flex">
                    <input
                      type="text"
                      className="h-[40px] px-3 bg-white border border-gray-200 rounded-tr-lg rounded-br-lg w-full focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                      value={formData.total || 0}
                      onChange={(e) => handleChange('total', e.target.value)}
                    />
                    <button className="px-3 bg-gray-200 rounded-tl-lg rounded-bl-lg text-gray-700">ر.س</button>
                  </div>
                </div>

                {/* حالة الدفع */}
                <div>
                  <label className="block mb-2 font-medium text-sm">حالة الدفع</label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                    placeholder="مثال: مدفوع / متبقي"
                    value={formData.paymentStatus || ''}
                    onChange={(e) => handleChange('paymentStatus', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* حالة الحجز */}
        <div className="w-full mt-5 rounded-lg bg-white shadow-lg">
          <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTasks size={20} />
              <span>حالة الحجز</span>
            </div>
            <button className="bg-white rounded-[20px] text-red-600 px-5 py-3 font-semibold text-sm">
              المتبقي : 30
            </button>
          </div>

          <div className="p-5 space-y-3">
            {formDataa.stages.map((stage, idx) => (
              <div key={stage.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                <input
                  type="text"
                  value={stage.name}
                  onChange={(e) => updateStage(idx, { name: e.target.value })}
                  className="w-full border rounded-md outline-none px-3 py-2 focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                />

                <input
                  type="date"
                  value={stage.date}
                  onChange={(e) => updateStage(idx, { date: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#09adce] focus:border-transparent"
                />

                {/* checkbox تم */}
                <div className="flex items-center gap-2">
                  <input
                    id={`stage-done-${stage.id}`}
                    type="checkbox"
                    className="h-4 w-4 text-[#09adce] focus:ring-[#09adce]"
                  />
                  <label htmlFor={`stage-done-${stage.id}`} className="text-sm">تم</label>
                </div>

                <button
                  type="button"
                  onClick={() => deleteStage(idx)}
                  className="bg-red-500 text-white w-full lg:w-1/4 md:w-auto px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* الملاحظات */}
        <div className="w-full mt-5 rounded-lg bg-white shadow-lg">
          <div className="bg-[#09adce] text-white h-20 rounded-lg px-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CiStickyNote size={20} />
              <span>الملاحظات</span>
            </div>
          </div>

          <div className="p-5">
            <textarea 
              placeholder='أضف أي ملاحظات خاصة بالحجز هنا ...' 
              className='w-full border border-gray-200 p-5 outline-none rounded-md focus:ring-2 focus:ring-[#09adce] focus:border-transparent min-h-[120px] resize-vertical'
            ></textarea>
          </div>
        </div>
        
        {/* زر الحفظ */}
        <button
          onClick={handleSubmit}
          className="bg-green-600 mt-5 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors w-full md:w-auto"
        >
          حفظ الحجز
        </button>
      </div>

      {/* مودال إضافة عميل */}
      <AddClientModal 
        isOpen={showAddClientModal}
        onClose={() => setShowAddClientModal(false)}
      />
    </Container>
  );
};

export default AddBookingForm;