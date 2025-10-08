'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CustomSelect from '../../components/shared/CustomSelect';
import { GoX } from 'react-icons/go';
import apiServiceCall from '../../utils/apiServiceCall';

const EditPayWayModal = ({ payWay, onClose, refetch }) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      type: '',
      is_active: true,
      is_default: false,
    },
  });

  // ✅ تحميل البيانات عند الفتح
  useEffect(() => {
    if (payWay) {
      setValue('name', payWay.name || '');
      setValue('type', payWay.type || '');
      setValue('is_active', !!payWay.is_active);
      setValue('is_default', !!payWay.is_default);
    }
  }, [payWay, setValue]);

  // ✅ أنواع الدفع
  const options = [
    { value: 'cash', label: 'نقدي' },
    { value: 'wallet', label: 'محفظة إلكترونية' },
    { value: 'bank_transfer', label: 'تحويل بنكي' },
    { value: 'credit_card', label: 'بطاقة بنكية' },
  ];

  // ✅ الميوتاشن للتحديث
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');

      const payload = {
        name: data.name,
        type: data.type,
        is_active: data.is_active ? true : false,
        is_default: data.is_default ? true : false,
      };

      console.log('📤 البيانات المرسلة:', payload);

      return apiServiceCall({
        url: `payment-ways/${payWay.id}`,
        method: 'PUT', // ✅ POST مع _method: 'PUT'
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
    },

    onSuccess: (res) => {
      toast.success(res.message || 'تم التحديث بنجاح ✅');

      // ⏱️ غلق المودال بعد ثانية
      setTimeout(() => {
        onClose();
      }, 1000);

      // ⏱️ refetch بعد ثانية ونصف
      setTimeout(() => {
        refetch && refetch();
      }, 1500);
    },

    onError: (err) => {
      console.error('❌ خطأ في التحديث:', err);
      toast.error(err?.response?.data?.message || 'حدث خطأ أثناء التحديث ❌');
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4 flex justify-between">
          تعديل طريقة الدفع
          <span
            className="text-3xl cursor-pointer hover:text-red-500"
            onClick={onClose}
          >
            <GoX />
          </span>
        </h3>
        <hr />

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
          {/* الاسم */}
          <div>
            <label className="block mb-1 text-sm font-semibold">الاسم</label>
            <input
              {...register('name', { required: 'الاسم مطلوب' })}
              placeholder="ادخل اسم طريقة الدفع"
              className="border p-2 rounded w-full"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          {/* النوع */}
          <div>
            <label className="block mb-1 text-sm font-semibold">النوع</label>
            <Controller
              name="type"
              control={control}
              rules={{ required: 'النوع مطلوب' }}
              render={({ field }) => (
                <CustomSelect
                  value={
                    field.value
                      ? options.find((opt) => opt.value === field.value)
                      : null
                  }
                  onChange={(option) => field.onChange(option?.value)}
                  options={options}
                  placeholder="اختر نوع الدفع"
                />
              )}
            />
            {errors.type && (
              <span className="text-red-500 text-sm">{errors.type.message}</span>
            )}
          </div>

          {/* خصائص */}
          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('is_active')} />
              <span>نشط (Active)</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('is_default')} />
              <span>افتراضي (Default)</span>
            </label>
          </div>

          <hr className="mt-3" />

          {/* الأزرار */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>

            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-4 py-2 bg-[#0dcaf0] text-white rounded"
            >
              {mutation.isLoading ? 'جارٍ التحديث...' : 'تحديث'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPayWayModal;
