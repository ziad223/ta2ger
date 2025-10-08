import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import apiServiceCall from '../../utils/apiServiceCall';

const ViewEmployeeModal = ({ userId, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await apiServiceCall({
          url: `users/${userId}`,
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res?.status) {
          setUser(res.data);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[450px] max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold mb-4 text-lg text-center">بيانات الموظف</h3>

        {loading ? (
          <p className="text-center text-gray-500 py-5">جاري التحميل...</p>
        ) : (
          <div className="space-y-3 text-sm">
            <div><strong>الاسم:</strong> {user.name}</div>
            <div><strong>البريد الإلكتروني:</strong> {user.email}</div>
            <div><strong>رقم الهاتف:</strong> {user.phone || '-'}</div>
            <div><strong>النوع:</strong> {user.type}</div>
            <div><strong>الدور:</strong> {user.role?.name || '-'}</div>
            <div><strong>الصلاحيات:</strong> {user.role?.permissions?.name || '-'}</div>
            <div><strong>القاعات:</strong> {user.halls?.join(', ') || '-'}</div>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;
