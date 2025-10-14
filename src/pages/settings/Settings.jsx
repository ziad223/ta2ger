import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast , ToastContainer } from 'react-toastify';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaUsers, FaUserShield } from 'react-icons/fa';
import { FiUpload, FiX } from 'react-icons/fi';
import CustomSelect from '../../components/shared/CustomSelect';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import apiServiceCall from '../../utils/apiServiceCall';
import 'react-toastify/dist/ReactToastify.css';

const Settings = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // استرجاع البيانات الحالية للإعدادات
  const { data: settingsResponse, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: () => apiServiceCall({ 
      url: 'settings/general',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  });

  // تحويل البيانات من API إلى شكل مناسب للنموذج
  const transformSettingsData = (data) => {
    if (!data?.data) return {};
    
    const transformed = {};
    data.data.forEach(item => {
      transformed[item.key] = item.value;
    });
    return transformed;
  };

  const settingsData = useMemo(() => transformSettingsData(settingsResponse), [settingsResponse]);

  // طفرة لتحديث الإعدادات
  const mutation = useMutation({
    mutationFn: (data) => apiServiceCall({
      url: 'settings/general',
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    onSuccess: () => {
      toast.success('تم حفظ الإعدادات بنجاح');
      queryClient.invalidateQueries(['settings']);
    },
    onError: (error) => {
      toast.error('فشل في حفظ الإعدادات');
      console.error('Error saving settings:', error);
    }
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: settingsData
  });

  // تحديث النموذج عند تغيير البيانات
  useEffect(() => {
    if (settingsData && Object.keys(settingsData).length > 0) {
      reset(settingsData);
      setInvoiceTerms(settingsData.invoiceTerms || '');
      setQuotationTerms(settingsData.quotationTerms || '');
      setContractTerms(settingsData.contractTerms || '');
      setWorkingHoursMessage(settingsData.workingHoursMessage || '');
      setSiteWelcomeMessage(settingsData.siteWelcomeMessage || '');
    }
  }, [settingsData, reset]);

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

  // state للصور المعروضة
  const [logoPreview, setLogoPreview] = useState('');
  const [faviconPreview, setFaviconPreview] = useState('');

  // تحديث معاينات الصور عند تحميل البيانات
  useEffect(() => {
    if (settingsData?.logo) {
      setLogoPreview(settingsData.logo);
    }
    if (settingsData?.favicon) {
      setFaviconPreview(settingsData.favicon);
    }
  }, [settingsData]);

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

  // معالجة رفع الملفات
  const handleFileChange = (event, fieldName, previewSetter) => {
    const file = event.target.files[0];
    if (file) {
      setValue(fieldName, file);
      
      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = (e) => {
        previewSetter(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // حذف الصورة
  const handleRemoveImage = (fieldName, previewSetter) => {
    setValue(fieldName, null);
    previewSetter('');
  };

  // دالة الحفظ
  const onSubmit = (data) => {
    // إنشاء FormData لاحتواء البيانات والمرفقات
    const formData = new FormData();
    
    // إضافة جميع الحقول النصية
    Object.keys(data).forEach(key => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
        formData.append(key, data[key]);
      }
    });
    
    // إضافة محتويات المحررات
    formData.append('invoiceTerms', invoiceTerms);
    formData.append('quotationTerms', quotationTerms);
    formData.append('contractTerms', contractTerms);
    formData.append('workingHoursMessage', workingHoursMessage);
    formData.append('siteWelcomeMessage', siteWelcomeMessage);
    
    // إرسال البيانات
    mutation.mutate(formData);
  };

 

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <ToastContainer/>
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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                اسم النشاط التجاري
              </label>
              <input
                type="text"
                {...register('businessName', { required: 'اسم النشاط التجاري مطلوب' })}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
              {errors.businessName && (
                <p className="text-red-500 text-xs mt-1">{errors.businessName.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                الرقم الضريبي (15 رقم)
              </label>
              <input
                type="text"
                {...register('taxNumber', { 
                  required: 'الرقم الضريبي مطلوب',
                  pattern: {
                    value: /^\d{15}$/,
                    message: 'يجب أن يكون الرقم الضريبي 15 رقماً'
                  }
                })}
                maxLength={15}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
              {errors.taxNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.taxNumber.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                العنوان
              </label>
              <input
                type="text"
                {...register('address', { required: 'العنوان مطلوب' })}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رقم المبنى
              </label>
              <input
                type="text"
                {...register('buildingNumber')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                الشارع
              </label>
              <input
                type="text"
                {...register('street')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رقم الجوال
              </label>
              <input
                type="text"
                {...register('mobile', { 
                  required: 'رقم الجوال مطلوب',
                  pattern: {
                    value: /^\+?[\d\s-]+$/,
                    message: 'رقم الجوال غير صحيح'
                  }
                })}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط الفيس بوك
              </label>
              <input
                type="text"
                {...register('facebook')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط التويتر
              </label>
              <input
                type="text"
                {...register('twitter')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط الانستجرام
              </label>
              <input
                type="text"
                {...register('instagram')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                رابط لينكدإن
              </label>
              <input
                type="text"
                {...register('linkedin')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                العملة الافتراضية
              </label>
              <CustomSelect 
                options={currencyOptions} 
                placeholder="اختر العملة"
                value={currencyOptions.find(option => option.value === watch('currency'))}
                onChange={(selected) => setValue('currency', selected?.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                طريقة الدفع الافتراضية
              </label>
              <CustomSelect
                options={paymentMethodOptions}
                placeholder="اختر طريقة الدفع"
                value={paymentMethodOptions.find(option => option.value === watch('paymentMethod'))}
                onChange={(selected) => setValue('paymentMethod', selected?.value)}
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                خط العرض
              </label>
              <input
                type="text"
                {...register('latitude')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                خط الطول
              </label>
              <input
                type="text"
                {...register('longitude')}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                نسبة الضريبة %
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                {...register('taxRate', { 
                  min: { value: 0, message: 'يجب أن تكون النسبة أكبر من أو تساوي 0' },
                  max: { value: 100, message: 'يجب أن تكون النسبة أقل من أو تساوي 100' }
                })}
                className="outline-none h-[40px] border border-gray-300 px-3 rounded-lg w-full"
              />
              {errors.taxRate && (
                <p className="text-red-500 text-xs mt-1">{errors.taxRate.message}</p>
              )}
            </div>

            {/* حقل الشعار */}
            <div className="lg:col-span-5">
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                تحميل صورة الشعار
              </label>
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                <div className="relative flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo', setLogoPreview)}
                    className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                  />
                  <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white">
                    <span className="text-gray-500">
                      {watch('logo') instanceof File ? watch('logo').name : 'اختر صورة الشعار'}
                    </span>
                    <FiUpload className="text-xl text-gray-500" />
                  </div>
                </div>
                
                {logoPreview && (
                  <div className="relative">
                    <img 
                      src={logoPreview} 
                      alt="معاينة الشعار" 
                      className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('logo', setLogoPreview)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* حقل الأيقونة */}
            <div className="lg:col-span-5">
              <label className="block mb-1 text-sm font-semibold text-gray-600">
                تحميل أيقونة المتصفح
              </label>
              <div className="flex flex-col lg:flex-row gap-4 items-start">
                <div className="relative flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'favicon', setFaviconPreview)}
                    className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
                  />
                  <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 bg-white">
                    <span className="text-gray-500">
                      {watch('favicon') instanceof File ? watch('favicon').name : 'اختر أيقونة المتصفح'}
                    </span>
                    <FiUpload className="text-xl text-gray-500" />
                  </div>
                </div>
                
                {faviconPreview && (
                  <div className="relative">
                    <img 
                      src={faviconPreview} 
                      alt="معاينة الأيقونة" 
                      className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage('favicon', setFaviconPreview)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX size={16} />
                    </button>
                  </div>
                )}
              </div>
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
          <button 
            type="submit"
            disabled={isSubmitting || mutation.isLoading}
            className="bg-green-600 lg:mt-10 mt-5 lg:w-[300px] w-full h-[50px] rounded-lg text-white text-xl hover:bg-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting || mutation.isLoading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Settings;