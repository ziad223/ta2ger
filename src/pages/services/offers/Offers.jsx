import React, { useState, useMemo } from "react";
import Container from "../../../components/shared/Container";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import  Table  from "../../../components/shared/Table"; // نفس الكومبوننت اللي عندك للجدول
import AddOfferModal from "./AddOfferModal";
import EditOfferModal from "./EditOfferModal";
import DeleteOfferModal from "./DeleteOfferModal";

const Offers = () => {
  const [offers, setOffers] = useState([
    { id: 1, name: "عرض الصيف", start: "2025-09-01", end: "2025-09-30", discount: "20%", showDiscount: "نعم" },
    { id: 2, name: "عرض رمضان", start: "2025-03-01", end: "2025-04-15", discount: "30%", showDiscount: "لا" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const columns = [
    { label: "#", key: "id" },
    { label: "اسم المنتج", key: "name" },
    { label: "البداية", key: "start" },
    { label: "النهاية", key: "end" },
    { label: "النسبة", key: "discount" },
    { label: "ظهور نسبة الخصم", key: "showDiscount" },
    { label: "التحكم", key: "actions" },
  ];

  const filteredOffers = useMemo(() => {
    if (!searchTerm.trim()) return offers;
    return offers.filter((o) =>
      o.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, offers]);

  const dataWithActions = filteredOffers.map((o) => ({
    ...o,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedOffer(o);
            setEditModalOpen(true);
          }}
          className="text-white text-xs bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedOffer(o);
            setDeleteModalOpen(true);
          }}
          className="text-white text-xs bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  const handleAddOffer = (newOffer) => {
    const id = offers.length ? offers[offers.length - 1].id + 1 : 1;
    setOffers([...offers, { ...newOffer, id }]);
    setAddModalOpen(false);
  };

  const handleUpdateOffer = (updatedOffer) => {
    setOffers(offers.map((o) => (o.id === updatedOffer.id ? updatedOffer : o)));
    setEditModalOpen(false);
    setSelectedOffer(null);
  };

  const handleDeleteOffer = () => {
    setOffers(offers.filter((o) => o.id !== selectedOffer.id));
    setDeleteModalOpen(false);
    setSelectedOffer(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen">
        <h2 className="text-xl font-bold mb-4">العروض</h2>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="ابحث باسم العرض"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[200px]"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />

            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف عرض +
            </button>
          </div>

          <div className="mt-6">
            <Table columns={columns} data={dataWithActions} />
          </div>
        </div>
      </div>

      {/* المودالات */}
      <AddOfferModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddOffer}
      />

      <EditOfferModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onUpdate={handleUpdateOffer}
        offer={selectedOffer}
      />

      <DeleteOfferModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteOffer}
        offer={selectedOffer}
      />
    </Container>
  );
};

export default Offers;
