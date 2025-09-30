import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaUsers, FaUserShield } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import CustomSelect from '../../components/shared/CustomSelect';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Settings = () => {
  // Select options
  const currencyOptions = useMemo(
    () => [
      { value: 'SAR', label: 'ريال سعودي' },
      { value: 'USD', label: 'دولار أمريكي' },
      { value: 'EUR', label: 'يورو' },
    ],
    []
  );

  const paymentMethodOptions = useMemo(
    () => [
      { value: 'cash', label: 'نقدًا' },
      { value: 'card', label: 'بطاقة' },
      { value: 'bank', label: 'تحويل بنكي' },
    ],
    []
  );

  // state لكل محرر
  const [invoiceTerms, setInvoiceTerms] = useState('');
  const [quotationTerms, setQuotationTerms] = useState('');
  const [contractTerms, setContractTerms] = useState('');
  const [workingHoursMessage, setWorkingHoursMessage] = useState('');
  const [siteWelcomeMessage, setSiteWelcomeMessage] = useState('');

  // إعدادات Quill
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ align: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'align',
    'list',
    'bullet',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video',
  ];

  return (
    <Container>
      <div className="p-4 min-h-screen">
        {/* الهيدر */}
        <div className="flex items-center flex-col lg:flex-row justify-between w-full mt-10">
          <h2 className="text-xl font-bold">الإعدادات</h2>
          <div className="flex items-center gap-2 flex-col lg:flex-row">
            <Link
              to="/settings/employees"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>الموظفين</span>
              <FaUsers />
            </Link>
            <Link
              to="/settings/sections"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>الأقسام</span>
              <FaBuffer />
            </Link>
            <Link
              to="/settings/privacy-policy"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>سياسة الخصوصية</span>
              <FaUserShield />
            </Link>
            <Link
              to="/settings/pay-ways"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>طرق الدفع</span>
              <FaCreditCard />
            </Link>
          </div>
        </div>

        {/* الفورم */}
        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                اسم النشاط التجاري
              </label>
              <input
                type="text"
                name="businessName"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                الرقم الضريبي (15 رقم)
              </label>
              <input
                type="text"
                name="taxNumber"
                maxLength={15}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                العنوان
              </label>
              <input
                type="text"
                name="address"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رقم المبنى
              </label>
              <input
                type="text"
                name="buildingNumber"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                الشارع
              </label>
              <input
                type="text"
                name="street"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رقم الجوال
              </label>
              <input
                type="text"
                name="mobile"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط الفيس بوك
              </label>
              <input
                type="text"
                name="facebook"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط التويتر
              </label>
              <input
                type="text"
                name="twitter"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط الانستجرام
              </label>
              <input
                type="text"
                name="instagram"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط لينكدإن
              </label>
              <input
                type="text"
                name="linkedin"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                العملة الافتراضية
              </label>
              <CustomSelect options={currencyOptions} placeholder="اختر العملة" />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                طريقة الدفع الافتراضية
              </label>
              <CustomSelect
                options={paymentMethodOptions}
                placeholder="اختر طريقة الدفع"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                خط العرض
              </label>
              <input
                type="text"
                name="latitude"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                خط الطول
              </label>
              <input
                type="text"
                name="longitude"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                تحميل صورة الشعار
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="logo"
                  className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                />
                <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white">
                  <span className="text-gray-500">اختر صورة</span>
                  <FiUpload className="text-xl text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                تحميل أيقونة المتصفح
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="favicon"
                  className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                />
                <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white">
                  <span className="text-gray-500">اختر أيقونة</span>
                  <FiUpload className="text-xl text-gray-500" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                نسبة الضريبة %
              </label>
              <input
                type="number"
                name="taxRate"
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>
          </div>

          {/* المحررات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 mt-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                شروط الفاتورة
              </label>
              <ReactQuill
                theme="snow"
                value={invoiceTerms}
                onChange={setInvoiceTerms}
                modules={modules}
                formats={formats}
                className="h-[200px] mb-10"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                شروط عرض السعر
              </label>
              <ReactQuill
                theme="snow"
                value={quotationTerms}
                onChange={setQuotationTerms}
                modules={modules}
                formats={formats}
                className="h-[200px] mb-10"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                شروط عقد تأجير قاعة أفراح
              </label>
              <ReactQuill
                theme="snow"
                value={contractTerms}
                onChange={setContractTerms}
                modules={modules}
                formats={formats}
                className="h-[200px] mb-10"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                رسالة أوقات العمل
              </label>
              <ReactQuill
                theme="snow"
                value={workingHoursMessage}
                onChange={setWorkingHoursMessage}
                modules={modules}
                formats={formats}
                className="h-[200px] mb-10"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-600">
                رسالة واجهة الموقع
              </label>
              <ReactQuill
                theme="snow"
                value={siteWelcomeMessage}
                onChange={setSiteWelcomeMessage}
                modules={modules}
                formats={formats}
                className="h-[200px] mb-10"
              />
            </div>
          </div>

          {/* زر الحفظ */}
          <button className="bg-green-600 lg:mt-10 mt-5 lg:w-[300px] w-full h-[50px] rounded-lg text-white text-xl hover:bg-green-500">
            حفظ
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Settings;
