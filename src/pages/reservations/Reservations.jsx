import { useState, useMemo } from "react";
import Table from "../../components/shared/Table";
import EditReservationModal from "./EditReservationModal";
import DeleteReservationModal from "./DeleteReservationModal";
import AddReservationModal from "./AddReservationModal";
import CustomSelect from "../../components/shared/CustomSelect";
import { MdOutlineNotInterested } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { PiNewspaperClippingThin } from "react-icons/pi";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiFilePaperLine } from "react-icons/ri";
import { Link, Links } from "react-router-dom";
import Container from "../../components/shared/Container";

// Adding CSS for the tooltip and dropdown
const customStyles = `
  .tooltip-container {
    position: relative;
    display: inline-block;
  }

  .tooltip {
    visibility: hidden;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 4px;
    padding: 8px 12px;
    position: absolute;
    z-index: 1000;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 14px;
    white-space: nowrap;
    pointer-events: none;
  }

  .tooltip::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
    transform: rotate(0deg);
  }

  .tooltip-container:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }

  .dropdown-menu {
    position: absolute;
    top: 35px;
    left: 10px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 1000;
    width: 150px;
    padding: 5px 0;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .dropdown-item:hover {
    background-color: #f5f5f5;
  }

  .dropdown-item.edit:hover {
    background-color: #0dcaf0;
    color: white;
  }

  .dropdown-item.delete:hover {
    background-color: #ef4444;
    color: white;
  }

  .dropdown-item svg {
    margin-left: 10px;
  }
`;

const Reservations = () => {
  const [searchId, setSearchId] = useState("");
  const [eventType, setEventType] = useState("");
  const [owner, setOwner] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open

  const [reservations, setReservations] = useState([
    {
      id: 1,
      client: "محمد علي",
      phone: "0551234567",
      eventType: "زفاف",
      startDate: "2025-09-20",
      endDate: "2025-09-21",
      hall: "قاعة الأندلس",
      sections: "الرجال, النساء",
      amount: "15000",
      discount: "1000",
      paid: "5000",
      tax: "750",
      total: "14750",
      paidTotal: "5000",
      cash: "3000",
      network: "2000",
      remaining: "9750",
      reservationStatus: "مؤكد",
      paymentStatus: "جزئي",
      notes: "يلزم التواصل قبل الموعد بـ 3 أيام",
      owner: "نبيل 1",
    },
    {
      id: 2,
      client: "سارة عبد الله",
      phone: "0567890123",
      eventType: "تخرج",
      startDate: "2025-10-01",
      endDate: "2025-10-01",
      hall: "قاعة الفيصل",
      sections: "النساء",
      amount: "10000",
      discount: "0",
      paid: "10000",
      tax: "500",
      total: "10500",
      paidTotal: "10500",
      cash: "10500",
      network: "0",
      remaining: "0",
      reservationStatus: "مؤكد",
      paymentStatus: "مدفوع",
      notes: "",
      owner: "نبيل 2",
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");

  // Toggle dropdown for a specific reservation
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown-container')) {
      setOpenDropdownId(null);
    }
  };

  // Add event listener for closing dropdowns when clicking outside
  useMemo(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const openEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setEditModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when opening modal
  };

  const openNotesModal = (note) => {
    setSelectedNote(note);
    setIsNotesModalOpen(true);
  };

  const handleAddReservation = (newRes) => {
    setReservations((prev) => [...prev, newRes]);
  };

  const openDeleteModal = (reservation) => {
    setSelectedReservation(reservation);
    setDeleteModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when opening modal
  };

  const handleUpdateReservation = (updated) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const handleDeleteReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.id !== id));
    setDeleteModalOpen(false);
    setSelectedReservation(null);
  };

  const columns = [
    { label: " الحجز", key: "id" },
    { label: "العميل", key: "client" },
    { label: "جوال ", key: "phone" },
    { label: " المناسبة", key: "eventType" },
    { label: "بداية الحجز", key: "startDate" },
    { label: "نهاية الحجز", key: "endDate" },
    { label: "القاعة", key: "hall" },
    { label: "الأقسام", key: "sections" },
    { label: "مبلغ الحجز", key: "amount" },
    { label: "الخصم", key: "discount" },
    { label: "المقدم", key: "paid" },
    { label: "الضريبة", key: "tax" },
    { label: "الاجمالي", key: "total" },
    { label: "المدفوع", key: "paidTotal" },
    { label: "نقدا", key: "cash" },
    { label: "شبكة", key: "network" },
    { label: "المتبقي", key: "remaining" },
    { 
      label: "حالة الحجز", 
      key: "reservationStatus",
      render: (row) => (
        <span 
          className={`inline-block w-full px-2 py-1 text-center font-bold text-white rounded-full outline-none border-none ${
            row.reservationStatus === "مؤكد" 
              ? "bg-green-500 border border-green-700" 
              : "bg-yellow-500 border border-yellow-700"
          }`}
        >
          {row.reservationStatus}
        </span>
      )
    },
    { 
      label: "حالة الدفع", 
      key: "paymentStatus",
      render: (row) => (
        <span 
          className={`inline-block w-full px-2 py-1 text-center font-bold text-white rounded-full ${
            row.paymentStatus === "جزئي" 
              ? "bg-red-500" 
              : "bg-green-500"
          }`}
        >
          {row.paymentStatus}
        </span>
      )
    },
    { 
      label: "الملاحظات", 
      key: "notes",
      render: (row) => (
        row.notes ? (
          <div className="flex justify-center">
            <button 
              onClick={() => openNotesModal(row.notes)}
              className="text-[#000]"
            >
              <RiFilePaperLine size={20} />
            </button>
          </div>
        ) : null
      )
    },
    { label: "التحكم", key: "actions" },
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const matchesId = searchId ? r.id.toString().includes(searchId) : true;
      const matchesEvent = eventType ? r.eventType === eventType : true;
      const matchesOwner = owner ? r.owner === owner : true;
      const matchesFrom = dateFrom
        ? new Date(r.startDate) >= new Date(dateFrom)
        : true;
      const matchesTo = dateTo ? new Date(r.endDate) <= new Date(dateTo) : true;
      return (
        matchesId && matchesEvent && matchesOwner && matchesFrom && matchesTo
      );
    });
  }, [searchId, eventType, owner, dateFrom, dateTo, reservations]);

  const dataWithActions = filteredReservations.map((r) => ({
    ...r,
    actions: (
      <div className="flex justify-center align-center" style={{ gap: "3px" }}>
        <div className="tooltip-container">
          <Link to= '/bond' 
            style={{ borderRadius: "0 5px 5px 0" }}
            className="transition duration-300 border-[#000] border-2  hover:bg-[#000] hover:text-white text-[#000] w-[30px] h-[30px] flex items-center justify-center"
            data-label="السند"
          >
            <PiNewspaperClippingThin size={14} />
          </Link>
          <span className="tooltip">السند</span>
        </div>
        <div className="tooltip-container">
          <Link
          to='/reservations-rent'
            className="transition  duration-300 border-[#1374fd] hover:bg-[#1374fd] border-2 hover:bg-gray-200 hover:text-white text-[#1374fd] w-[30px] h-[30px] flex items-center justify-center"
            data-label="الفاتورة"
          >
            <TbReportMoney size={14} />
          </Link>
          <span className="tooltip">الفاتورة</span>
        </div>

        <div className="tooltip-container">
          <Link
            to='/single-reservation'
            className="transition duration-300 border-[#dc3545] border-2 hover:bg-[#dc3545] hover:text-white text-[#dc3545] w-[30px] h-[30px] flex items-center justify-center"
            data-label="العقد"
          >
            <BiSolidFilePdf size={14} />
          </Link>
          <span className="tooltip">العقد</span>
        </div>

        <div className="tooltip-container">
          <button
            onClick={() => openEditModal(r)}
            className="transition duration-300 border-[#ffc428] border-2 hover:bg-[#ffc428] hover:text-white text-[#ffc428] w-[30px] h-[30px] flex items-center justify-center"
            data-label="إلغاء الحجز"
          >
            <MdOutlineNotInterested size={14} />
          </button>
          <span className="tooltip">إلغاء الحجز</span>
        </div>

        {/* Dropdown menu container */}
        <div className="dropdown-container relative">
          <div
            className="bg-[#f8f9fa] hover:bg-[#f8f9fa] rounded-lg p-2 flex flex-col justify-center cursor-pointer"
            style={{ gap: "2px" }}
            onClick={() => toggleDropdown(r.id)}
          >
            <div className="rounded-full bg-[#000] w-[4px] h-[4px]"></div>
            <div className="rounded-full bg-[#000] w-[4px] h-[4px]"></div>
            <div className="rounded-full bg-[#000] w-[4px] h-[4px]"></div>
          </div>
          
          {/* Dropdown menu */}
          {openDropdownId === r.id && (
            <div className="dropdown-menu">
              <div 
                className="dropdown-item edit"
                onClick={() => openEditModal(r)}
              >
             
                <FaEdit size={17} />
                <span>تعديل</span>
              </div>
              <div 
                className="dropdown-item delete text-red-500"
                onClick={() => openDeleteModal(r)}
              >
              
                <FaTrashAlt size={17} color/>
                <span>حذف</span>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <>
      <style>{customStyles}</style>
     <Container>
       <div className="p-4 min-h-screen my-10">
        <h2 className="text-xl font-bold mb-4">الحجوزات</h2>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* فلاتر البحث */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 items-center">
            <CustomSelect
              name="eventType"
              value={eventType ? { value: eventType, label: eventType } : null}
              onChange={(selected) =>
                setEventType(selected ? selected.value : "")
              }
              options={[
                { value: "", label: "كل المناسبات" },
                { value: "زفاف", label: "زفاف" },
                { value: "تخرج", label: "تخرج" },
                { value: "اجتماع", label: "اجتماع" },
              ]}
              placeholder="كل المناسبات"
              className="text-sm"
            />

            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="بحث برقم الحجز"
              className="border h-[40px] outline-none px-3 rounded-lg text-sm w-full"
            />

            <CustomSelect
              name="owner"
              value={owner ? { value: owner, label: owner } : null}
              onChange={(selected) => setOwner(selected ? selected.value : "")}
              options={[
                { value: "", label: "اختر كواكب التقنية" },
                { value: "نبيل 1", label: "نبيل 1" },
                { value: "نبيل 2", label: "نبيل 2" },
              ]}
              placeholder="اختر كواكب التقنية"
              className="text-sm"
            />

            {/* التاريخ ياخد عمودين */}
            <div className="flex gap-2 col-span-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border h-[40px] outline-none px-2 rounded-lg text-sm w-full"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border h-[40px] outline-none px-2 rounded-lg text-sm w-full"
              />
            </div>

            <Link
            to='/new-booking'
              className="bg-[#2ba670] flex items-center justify-center text-white rounded-lg text-sm h-[40px] outline-none w-full max-w-[120px]"
            >
              إضافة حجز +
            </Link>
          </div>

          <Table columns={columns} data={dataWithActions} />
        </div>
      </div>
     </Container>

      {/* مودال التعديل */}
      <EditReservationModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        reservation={selectedReservation}
        onSave={handleUpdateReservation}
      />

      {/* مودال الحذف */}
      <DeleteReservationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        reservation={selectedReservation}
        onDelete={handleDeleteReservation}
      />

      {/* مودال الإضافة */}
      <AddReservationModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={handleAddReservation}
      />
      
      {isNotesModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">الملاحظات</h2>
            <div className="mb-6 min-h-[60px] flex items-center">
              <p className="text-gray-700">{selectedNote}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsNotesModalOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reservations;