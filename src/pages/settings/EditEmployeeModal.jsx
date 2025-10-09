'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import CustomSelect from '../../components/shared/CustomSelect';
import { useMutation } from '@tanstack/react-query';
import apiServiceCall from '../../utils/apiServiceCall';
import { toast, ToastContainer } from 'react-toastify';

const EditEmployeeModal = ({ onClose, employee, refetch }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      group: null,
      halls: '',
    },
  });

  // ✅ تحميل الأدوار
  const [rolesOptions, setRolesOptions] = React.useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await apiServiceCall({
          url: 'roles',
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const options = res.data.data.map((role) => ({
          value: role.id,
          label: role.name,
        }));
        setRolesOptions(options);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  // ✅ تعبئة البيانات عند فتح المودال
  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        group: employee.role
          ? { value: employee.role.id, label: employee.role.name }
          : null,
        halls: employee.halls ? employee.halls.join(',') : '',
      });
    }
  }, [employee, reset]);

const mutation = useMutation({
  mutationFn: async (data) => {
    const token = localStorage.getItem('token');

    return apiServiceCall({
      url: `users/${employee.id}`,
      method: 'POST', // 👈 نستخدم POST بدل PUT
      body: {
        _method: 'PUT', // 👈 نضيفها هنا عشان السيرفر يفهم إنها تحديث
        name: data.name,
        email: data.email,
        phone: data.phone,
        role_id: data.group?.value,
        halls: data.halls
          ? data.halls.split(',').map((h) => parseInt(h.trim()))
          : [],
      },
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  onSuccess: (res) => {
    toast.success(res.message || 'تم التحديث بنجاح ✅');

    setTimeout(() => {
      onClose();
    }, 1000);

    setTimeout(() => {
      refetch && refetch();
    }, 1500);
  },

  onError: (err) => {
    toast.error(err?.response?.data?.message || 'حدث خطأ أثناء التحديث ❌');
  },
});

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px]">
        <h3 className="font-bold mb-4 text-lg text-center">تعديل الموظف</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* الاسم */}
          <input
            {...register('name', { required: 'الاسم مطلوب' })}
            placeholder="اسم الموظف"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* البريد الإلكتروني */}
          <input
            {...register('email')}
            placeholder="البريد الإلكتروني"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* الدور */}
          <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <CustomSelect
                value={field.value}
                onChange={field.onChange}
                options={rolesOptions}
                placeholder="اختر الدور"
                isLoading={!rolesOptions.length}
              />
            )}
          />

          {/* القاعات */}
          <input
            {...register('halls')}
            placeholder="القاعات (مثال: 1,2)"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
