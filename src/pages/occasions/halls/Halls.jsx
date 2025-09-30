import React, { useState, useMemo } from "react";
import Container from "../../../components/shared/Container";
import Table from "../../../components/shared/Table";
import { FaCalendar, FaEdit, FaTrashAlt } from "react-icons/fa";
import AddHallModal from "./AddHallModal";
import EditHallModal from "./EditHallModal";
import DeleteHallModal from "./DeleteHallModal";
import logo1 from '../../../../public/images/home/media-center.png'
import logo2 from '../../../../public/images/home/hero.png'
import { Link } from "react-router-dom";
const Halls = () => {
  const [halls, setHalls] = useState([
    {
      id: 1,
      logo:logo1,
      name: "قاعة الأندلس",
      address: "الرياض - شارع الملك فهد",
      taxNumber: "123456789",
      phone: "0551234567",
      status: "متاحة",
      prices: "5000 ريال",
      bookings: "12",
    },
    {
      id: 2,
      logo: logo2,
      name: "قاعة الفيصل",
      address: "جدة - حي السلامة",
      taxNumber: "987654321",
      phone: "0567890123",
      status: "مغلقة",
      prices: "7000 ريال",
      bookings: "5",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedHall, setSelectedHall] = useState(null);

  // الأعمدة
  const columns = [
    { label: "شعار القاعة", key: "logo" },
    { label: "اسم القاعة", key: "name" },
    { label: "العنوان", key: "address" },
    { label: "الرقم الضريبي", key: "taxNumber" },
    { label: "الجوال", key: "phone" },
    { label: "الحالة", key: "status" },
    { label: "الأسعار", key: "prices" },
    { label: "الحجوزات", key: "bookings" },
    { label: "التحكم", key: "actions" },
  ];

  // فلترة البحث بالاسم أو العنوان
  const filteredHalls = useMemo(() => {
    if (!searchTerm.trim()) return halls;
    return halls.filter(
      (hall) =>
        hall.name.includes(searchTerm.trim()) ||
        hall.address.includes(searchTerm.trim())
    );
  }, [searchTerm, halls]);

  // إضافة أزرار التحكم
  const dataWithActions = filteredHalls.map((hall) => ({
    ...hall,
    logo: (
      <img
        src={hall.logo}
        alt={hall.name}
        className="w-16 h-12 object-cover rounded mx-auto"
      />
    ),
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedHall(hall);
            setEditModalOpen(true);
          }}
          className="text-white bg-[#0dcaf0] w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            setSelectedHall(hall);
            setDeleteModalOpen(true);
          }}
          className="text-white bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center"
        >
          <FaTrashAlt size={14} />
        </button>
      </div>
    ),
  }));

  // إضافة قاعة جديدة
  const handleAddHall = (newHall) => {
    const id = halls.length ? halls[halls.length - 1].id + 1 : 1;
    setHalls([...halls, { ...newHall, id }]);
  };

  // تعديل بيانات القاعة
  const handleUpdateHall = (updatedHall) => {
    setHalls(halls.map((h) => (h.id === updatedHall.id ? updatedHall : h)));
  };

  // حذف القاعة
  const handleDeleteHall = () => {
    setHalls(halls.filter((h) => h.id !== selectedHall.id));
    setDeleteModalOpen(false);
    setSelectedHall(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <h2 className="text-xl font-bold mb-4">القاعات</h2>

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="البحث بالاسم أو العنوان"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-1/3"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
           <div className="flex gap-2">
              <Link
              to='/reservations-schedule'
              onClick={() => setAddModalOpen(true)}
              className="bg-[#0dcaf0] flex items-center gap-2 px-3 h-[35px] text-white rounded-md w-full md:w-auto"
            >
              <FaCalendar/>
             جدول الحجوزات
            </Link>
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] px-3 h-[35px] text-white rounded-md w-full md:w-auto"
            >
              أضف قاعة +
            </button>
           </div>
          </div>

          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>

      {/* مودالات */}
      <AddHallModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddHall}
      />
      <EditHallModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        hallData={selectedHall}
        onUpdate={handleUpdateHall}
      />
      <DeleteHallModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteHall}
        hallName={selectedHall?.name}
      />
    </Container>
  );
};

export default Halls;
