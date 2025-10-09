'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast , ToastContainer } from 'react-toastify';
import CustomSelect from '../../components/shared/CustomSelect';
import { GoX } from 'react-icons/go';
import apiServiceCall from '../../utils/apiServiceCall';

const EditPayWayModal = ({ payWay, onClose, refetch }) => {
  const [options, setOptions] = useState([]);

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

useEffect(() => {
  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await apiServiceCall({
        url: 'select/paymentMethods/types',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      const fetchedOptions =
        res?.data?.map((item) => ({
          value: item.id, // استخدم id كـ value
          label: item.name, // الاسم للعرض
        })) || [];

      setOptions(fetchedOptions);
    } catch (err) {
      console.error('❌ خطأ أثناء تحميل طرق الدفع:', err);
      toast.error('حدث خطأ أثناء تحميل طرق الدفع');
    }
  };

  fetchPaymentMethods();
}, []);


  // ✅ تحميل بيانات الدفع في الحقول عند فتح المودال
  useEffect(() => {
    if (payWay) {
      setValue('name', payWay.name || '');
      setValue('type', payWay.type || '');
      setValue('is_active', !!payWay.is_active);
      setValue('is_default', !!payWay.is_default);
    }
  }, [payWay, setValue]);

  // ✅ الميوتاشن للتحديث
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');

      const payload = {
        name: data.name,
        type: data.type,
        is_active: !!data.is_active,
        is_default: !!data.is_default,
      };

      return apiServiceCall({
        url: `payment-methods/${payWay.id}`,
        method: 'PUT',
        body: payload,
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
    },

    onSuccess: (res) => {
      toast.success(res.message || 'تم التحديث بنجاح ✅');
        setTimeout(() => {
      onClose();
    }, 1000);

    setTimeout(() => {
     window.location.reload()
    }, 1200);
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
      <ToastContainer/>
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

        <div>
  <label className="block mb-1 text-sm font-semibold">النوع</label>
  <Controller
    name="type"
    control={control}
    rules={{ required: 'النوع مطلوب' }}
    render={({ field }) => (
      <CustomSelect
        options={options}
        value={
          options.find((opt) => opt.value === field.value) || null
        }
        onChange={(option) => field.onChange(option?.value)}
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
