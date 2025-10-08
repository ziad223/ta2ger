'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast , ToastContainer } from 'react-toastify';
import CustomSelect from '../../components/shared/CustomSelect';
import apiServiceCall from '../../utils/apiServiceCall';

const AddEmployeeModal = ({ onClose, refetch }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      group: null,
      halls: '',
    },
  });

  // ✅ جلب الأدوار (roles)
  const { data: rolesData, isLoading: rolesLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await apiServiceCall({
        url: 'roles',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ استرجاع البيانات من res.data.data
      return res?.data?.data || [];
    },
  });

  // 🟢 تحويل البيانات إلى خيارات الـSelect
  const groupOptions =
    rolesData?.map((role) => ({
      value: role.id,
      label: role.name,
    })) || [];

  // ✅ Mutation لإضافة موظف جديد
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem('token');
      return await apiServiceCall({
        url: 'users',
        method: 'POST',
        body: data,
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: (res) => {
  toast.success(res.message || 'تمت إضافة الموظف بنجاح');

  setTimeout(() => {
    onClose();
    reset();
  }, 1000);

  setTimeout(() => {
       window.location.reload();

  }, 1500);
},

    onError: (error) => {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        'حدث خطأ أثناء الإضافة';
      toast.error(errMsg);
    },
  });

  // ✅ عند الإرسال
  const onSubmit = (data) => {
    const formattedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role_id: data.group?.value || '',
      halls: data.halls ? [parseInt(data.halls)] : [],
    };

    console.log('🟢 Payload sent:', formattedData);
    mutation.mutate(formattedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer/>
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="font-bold mb-4 text-lg text-center">إضافة موظف</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* 🟢 الاسم */}
          <div>
            <input
              {...register('name', { required: 'الاسم مطلوب' })}
              placeholder="اسم الموظف"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* 🟢 رقم الجوال */}
          

          {/* 🟢 البريد الإلكتروني */}
          <div>
            <input
              {...register('email')}
              placeholder="البريد الإلكتروني"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🟢 كلمة المرور */}
          <div>
            <input
              type="password"
              {...register('password', { required: 'كلمة المرور مطلوبة' })}
              placeholder="كلمة المرور"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="group"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  isLoading={rolesLoading}
                  options={groupOptions}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="اختر الدور"
                />
              )}
            />
            {errors.group && (
              <p className="text-red-500 text-sm">{errors.group.message}</p>
            )}
          </div>

          {/* 🟢 القاعات */}
          <div>
            <input
              {...register('halls')}
              placeholder="رقم القاعة (مثلاً: 1)"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 🟢 الأزرار */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {mutation.isLoading ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
