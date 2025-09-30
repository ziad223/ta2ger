import React, { useState, useMemo } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Table from "../../../../components/shared/Table";
import AddClientModal from "./AddClientModal";
import EditClientModal from "./EditClientModal";
import DeleteClientModal from "./DeleteClientModal";

const ClientsTab = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "محمد علي",
      opinion: "خدمة ممتازة وتجربة رائعة.",
      image: "https://via.placeholder.com/80",
    },
    {
      id: 2,
      name: "أحمد حسن",
      opinion: "كل شيء كان منظم بشكل جميل.",
      image: "https://via.placeholder.com/80",
    },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // الأعمدة
  const columns = [
    { label: "#", key: "id" },
    { label: "الاسم", key: "name" },
    { label: "الرأي", key: "opinion" },
    {
      label: "الصورة",
      key: "image",
      render: (row) => (
        <img
          src={row.image}
          alt={row.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    { label: "الإجراءات", key: "actions" },
  ];

  // دمج الإجراءات
  const dataWithActions = useMemo(
    () =>
      clients.map((client) => ({
        ...client,
        actions: (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setSelectedClient(client);
                setEditModalOpen(true);
              }}
              className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedClient(client);
                setDeleteModalOpen(true);
              }}
              className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        ),
      })),
    [clients]
  );

  // إضافة
  const handleAddClient = (newClient) => {
    const id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    setClients([...clients, { ...newClient, id }]);
    setAddModalOpen(false);
  };

  // تعديل
  const handleUpdateClient = (updatedClient) => {
    setClients(
      clients.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    setEditModalOpen(false);
    setSelectedClient(null);
  };

  // حذف
  const handleDeleteClient = () => {
    setClients(clients.filter((c) => c.id !== selectedClient.id));
    setDeleteModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white shadow-sm p-5 rounded-lg">
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
        >
          أضف رأي جديد +
        </button>

        <div className="mt-6">
          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* المودالات */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddClient}
      />

      <EditClientModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        client={selectedClient}
        onSubmit={handleUpdateClient}
      />

      <DeleteClientModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteClient}
      />
    </div>
  );
};

export default ClientsTab;
