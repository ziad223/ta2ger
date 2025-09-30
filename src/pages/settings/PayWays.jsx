import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import { FaBuffer, FaCreditCard, FaEdit, FaTrashAlt, FaUsers, FaUserShield } from 'react-icons/fa';
import Table from '../../components/shared/Table';
import AddPayWayModal from './AddPayWayModal';
import EditPayWayModal from './EditPayWayModal';
import DeletePayWayModal from './DeletePayWayModal';
import { Link } from 'react-router-dom';

const PayWays = () => {
  const [payWays, setPayWays] = useState([
    {
      id: 1,
      name: "تحويل بنكي",
      accountNumber: "123456789",
      status: "نشط",
      cash: "لا",
      defaultPayment: "نعم",
      employees: "محمد علي",
    },
    {
      id: 2,
      name: "كاش",
      accountNumber: "-",
      status: "نشط",
      cash: "نعم",
      defaultPayment: "لا",
      employees: "أحمد حسن",
    },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedPayWay, setSelectedPayWay] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "رقم الحساب", key: "accountNumber" },
    { label: "الحالة", key: "status" },
    { label: "نقدي", key: "cash" },
    { label: "الافتراضي للدفع", key: "defaultPayment" },
    { label: "الموظفين", key: "employees" },
    { label: "التحكم", key: "actions" },
  ];

  // تجهيز البيانات مع أزرار التحكم
  const dataWithActions = useMemo(() =>
    payWays.map((way) => ({
      ...way,
      actions: (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => {
              setSelectedPayWay(way);
              setEditModalOpen(true);
            }}
            className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
          >
            <FaEdit size={16} />
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
    }))
  , [payWays]);

  // إضافة طريقة دفع
  const handleAddPayWay = (newWay) => {
    const id = payWays.length ? payWays[payWays.length - 1].id + 1 : 1;
    setPayWays([...payWays, { ...newWay, id }]);
    setAddModalOpen(false);
  };

  // تعديل طريقة دفع
  const handleUpdatePayWay = (updatedWay) => {
    setPayWays(payWays.map((w) => (w.id === updatedWay.id ? updatedWay : w)));
    setEditModalOpen(false);
    setSelectedPayWay(null);
  };

  // حذف طريقة دفع
  const handleDeletePayWay = () => {
    setPayWays(payWays.filter((w) => w.id !== selectedPayWay.id));
    setDeleteModalOpen(false);
    setSelectedPayWay(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen">
          <div className='flex items-center flex-col lg:flex-row  justify-between w-full my-10 '>
        <h2 className="text-xl font-bold">طرق الدفع</h2>
         <div className='flex items-center gap-2 flex-col lg:flex-row'>
            <Link to='/settings/employees' className='flex items-center  gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>الموظفين</span>
                <FaUsers/>
            </Link>
             <Link to = '/settings/sections' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>الأقسام</span>
                <FaBuffer/>
            </Link>
            <Link to='/settings/privacy-policy' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>سياسة الخصوصية</span>
                <FaUserShield/>
            </Link>
            <Link to='/settings/pay-ways' className='flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white'>
                <span>طرق الدفع</span>
                <FaCreditCard/>
            </Link>
          </div>
          </div>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center w-full gap-3 md:gap-0">
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف طريقة دفع +
            </button>
          </div>

          <div className="mt-6">
            <Table columns={columns} data={dataWithActions} />
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
