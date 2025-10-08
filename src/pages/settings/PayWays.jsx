'use client';

import React, { useMemo, useState } from 'react';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaUsers, FaUserShield, FaTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';
import Table from '../../components/shared/Table';
import AddPayWayModal from './AddPayWayModal';
import EditPayWayModal from './EditPayWayModal';
import DeletePayWayModal from './DeletePayWayModal';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import apiServiceCall from '../../utils/apiServiceCall';
import { toast } from 'react-toastify';

const PayWays = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPayWay, setSelectedPayWay] = useState(null);

  // ✅ جلب طرق الدفع من API
  const {
    data: payWaysData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await apiServiceCall({
        url: 'payment-methods',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      return res?.data || [];
    },
  });

  // ✅ أعمدة الجدول
  const columns = [
    { label: '#', key: 'id' },
    { label: 'الاسم', key: 'name' },
    { label: 'النوع', key: 'type' },
    { label: 'الحالة', key: 'is_active' },
    { label: 'افتراضي', key: 'is_default' },
    { label: 'التحكم', key: 'actions' },
  ];

  // ✅ تجهيز البيانات للعرض في الجدول
  const dataWithActions = useMemo(
    () =>
      (payWaysData || []).map((way) => ({
        ...way,
        is_active: way.is_active ? 'نشط' : 'غير نشط',
        is_default: way.is_default ? 'نعم' : 'لا',
        actions: (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setSelectedPayWay(way);
                setEditModalOpen(true);
              }}
              className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
            >
              <CiEdit size={22} />
            </button>

            <button
              onClick={() => {
                setSelectedPayWay(way);
                setDeleteModalOpen(true);
              }}
              className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        ),
      })),
    [payWaysData]
  );

  // ✅ إضافة طريقة دفع
  const handleAddPayWay = (newWay) => {
    setAddModalOpen(false);
    toast.success('تمت إضافة طريقة الدفع بنجاح');
    setTimeout(() => refetch(), 1500);
  };

  // ✅ تعديل طريقة دفع
  const handleUpdatePayWay = (updatedWay) => {
    setEditModalOpen(false);
    toast.success('تم تحديث طريقة الدفع بنجاح');
    setTimeout(() => refetch(), 1500);
  };

  // ✅ حذف طريقة دفع
  const handleDeletePayWay = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await apiServiceCall({
        url: `payment-methods/${selectedPayWay.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.status) {
        toast.success('تم حذف طريقة الدفع بنجاح');
        setTimeout(() => refetch(), 1000);
        setTimeout(() => {
          setDeleteModalOpen(false);
          setSelectedPayWay(null);
        }, 800);
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف طريقة الدفع');
    }
  };

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <div className="flex items-center flex-col lg:flex-row justify-between w-full my-10">
          <h2 className="text-xl font-bold">طرق الدفع</h2>
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

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-end w-full gap-3 md:gap-0">
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف طريقة دفع +
            </button>
          </div>

          <div className="mt-6">
            {isLoading ? (
              <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>
            ) : (
              <Table columns={columns} data={dataWithActions} />
            )}
          </div>
        </div>

        {/* ✅ مودال الإضافة */}
        {isAddModalOpen && (
          <AddPayWayModal
            onClose={() => setAddModalOpen(false)}
            onSave={handleAddPayWay}
          />
        )}

        {/* ✅ مودال التعديل */}
        {isEditModalOpen && selectedPayWay && (
          <EditPayWayModal
            payWay={selectedPayWay}
            onClose={() => setEditModalOpen(false)}
            onSave={handleUpdatePayWay}
          />
        )}

        {/* ✅ مودال الحذف */}
        {isDeleteModalOpen && selectedPayWay && (
          <DeletePayWayModal
            payWay={selectedPayWay}
            onClose={() => setDeleteModalOpen(false)}
            onDelete={handleDeletePayWay}
          />
        )}
      </div>
    </Container>
  );
};

export default PayWays;
