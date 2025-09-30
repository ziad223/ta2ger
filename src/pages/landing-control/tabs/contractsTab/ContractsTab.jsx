import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Table from '../../../../components/shared/Table';

import AddContractModal from './AddContractModal';
import EditContractModal from './EditContractModal';
import DeleteContractModal from './DeleteContractModal';

const ContractsTab = () => {
  const [contracts, setContracts] = useState([
    {
      id: 1,
      clientName: "شركة المستقبل",
      contractTitle: "عقد إيجار قاعة",
      startDate: "2025-09-01",
      endDate: "2025-12-01",
      amount: "20000",
      remainingDays: 72,
      attachment: "لا يوجد مرفق	",
    },
    {
      id: 2,
      clientName: "مؤسسة السلام",
      contractTitle: "عقد صيانة",
      startDate: "2025-08-15",
      endDate: "2026-08-15",
      amount: "15000",
      remainingDays: 330,
      attachment: "لا يوجد مرفق	",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "اسم العميل", key: "clientName" },
    { label: "عنوان العقد", key: "contractTitle" },
    { label: "تاريخ العقد", key: "startDate" },
    { label: "تاريخ النهاية", key: "endDate" },
    { label: "المبلغ", key: "amount" },
    { label: "المتبقي بالأيام", key: "remainingDays" },
    { label: "المرفق", key: "attachment" },
    { label: "التحكم", key: "actions" },
  ];

  // تصفية العقود
  const filteredContracts = useMemo(() => {
    if (!searchTerm.trim()) return contracts;
    return contracts.filter(contract =>
      contract.clientName.includes(searchTerm.trim())
    );
  }, [searchTerm, contracts]);

  // تجهيز البيانات مع الأكشنز
  const dataWithActions = filteredContracts.map(contract => ({
    ...contract,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedContract(contract);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedContract(contract);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
    attachment: (
      <p
        href={`/${contract.attachment}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        لا يوجد مرفق	
      </p>
    ),
  }));

  // إضافة عقد جديد
  const handleAddContract = (newContract) => {
    const id = contracts.length ? contracts[contracts.length - 1].id + 1 : 1;
    setContracts([...contracts, { ...newContract, id }]);
    setAddModalOpen(false);
  };

  // تعديل العقد
  const handleUpdateContract = (updatedContract) => {
    setContracts(
      contracts.map(c => (c.id === updatedContract.id ? updatedContract : c))
    );
    setEditModalOpen(false);
    setSelectedContract(null);
  };

  // حذف العقد
  const handleDeleteContract = () => {
    setContracts(contracts.filter(c => c.id !== selectedContract.id));
    setDeleteModalOpen(false);
    setSelectedContract(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white shadow-sm p-5 rounded-lg">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
        >
          أضف عقد جديد +
        </button>

        <div className="mt-6">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* المودالات */}
      {isAddModalOpen && (
        <AddContractModal
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddContract}
        />
      )}

      {isEditModalOpen && (
        <EditContractModal
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleUpdateContract}
          contract={selectedContract}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteContractModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteContract}
          contract={selectedContract}
        />
      )}
    </div>
  );
};

export default ContractsTab;
