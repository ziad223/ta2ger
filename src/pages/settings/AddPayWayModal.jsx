'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast , ToastContainer } from 'react-toastify';
import CustomSelect from '../../components/shared/CustomSelect';
import { GoX } from 'react-icons/go';
import apiServiceCall from '../../utils/apiServiceCall';

const AddPayWayModal = ({ onClose, selectedPayway, refetch }) => {
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
      is_cash: false,
      is_active: true,
      is_default: false,
    },
  });

  const options = [
    { value: 'cash', label: 'نقدي' },
    { value: 'wallet', label: 'محفظة إلكترونية' },
    { value: 'online', label: 'أونلاين' },
    { value: 'bank', label: 'تحويل بنكي' },
  ];

  useEffect(() => {
    if (selectedPayway) {
      setValue('name', selectedPayway.name || '');
      setValue('type', selectedPayway.type || '');
      setValue('is_cash', !!selectedPayway.is_cash);
      setValue('is_active', !!selectedPayway.is_active);
      setValue('is_default', !!selectedPayway.is_default);
    }
  }, [selectedPayway, setValue]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');

      const payload = {
        name: data.name,
        type: data.type,
        is_cash: data.is_cash,
        is_active: data.is_active,
        is_default: data.is_default,
      };

      const method = selectedPayway ? 'PUT' : 'POST';
      const url = selectedPayway
        ? `payment-methods/${selectedPayway.id}`
        : 'payment-methods';

      // 👇 لاحظ أننا بنبعت body مش data
      return await apiServiceCall({
        url,
        method,
        body: payload,
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    onSuccess: (res) => {
      toast.success(res.message || 'تم حفظ طريقة الدفع بنجاح 🎉');

    setTimeout(() => {
        onClose();
      }, 800);
       setTimeout(() => {
        window.location.reload()
      }, 1000);
     
    },

    onError: (error) => {
      console.error('❌ Error:', error);
      toast.error(error?.response?.data?.message || 'حدث خطأ أثناء حفظ طريقة الدفع ❌');
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
          {selectedPayway ? 'تعديل طريقة الدفع' : 'إضافة طريقة دفع'}
          <span className="text-3xl cursor-pointer" onClick={onClose}>
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
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
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
            {errors.type && <span className="text-red-500 text-sm">{errors.type.message}</span>}
          </div>

          {/* خصائص */}
          <div className="flex flex-col gap-3 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('is_cash')} />
              <span>نقدي (Cash)</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('is_active')} />
              <span>نشط (Active)</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" {...register('is_default')} />
              <span>افتراضي للدفع (Default)</span>
            </label>
          </div>

          <hr className="mt-3" />

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
              className="px-4 py-2 bg-[#0d6efd] text-white rounded"
            >
              {mutation.isLoading ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPayWayModal;
