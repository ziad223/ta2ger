import React, { useState, useMemo } from "react";
import Container from "../../components/shared/Container";
import Table from "../../components/shared/Table";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import CustomSelect from "../../components/shared/CustomSelect";
import AddInvoiceModal from "./AddInvoiceModal";
import { FaEdit, FaRegEye, FaRegFileImage, FaTrashAlt } from "react-icons/fa";
import { MdOutlineFileUpload, MdOutlineNotInterested } from "react-icons/md";
import { BiSolidFilePdf } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { PiNewspaperClippingThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import RecoveryModal from "./RecoveryModal";

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

const Invoices = () => {
  const [searchClientOrHall, setSearchClientOrHall] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("");
  const [reservationStatusFilter, setReservationStatusFilter] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null); // Track which dropdown is open
  const [isRecovaryModelOpen, setRecovaryModelOpen] = useState(false);
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
    {
      id: 3,
      client: "أحمد حسن",
      phone: "0559988776",
      eventType: "عيد ميلاد",
      startDate: "2025-09-25",
      endDate: "2025-09-25",
      hall: "قاعة الورد",
      sections: "النساء",
      amount: "8000",
      discount: "500",
      paid: "4000",
      tax: "400",
      total: "7900",
      paidTotal: "4000",
      cash: "4000",
      network: "0",
      remaining: "3900",
      reservationStatus: "قيد الانتظار",
      paymentStatus: "جزئي",
      notes: "",
      owner: "نبيل 3",
    },
    {
      id: 4,
      client: "ليلى محمد",
      phone: "0544433221",
      eventType: "مؤتمر",
      startDate: "2025-09-28",
      endDate: "2025-09-28",
      hall: "قاعة الفيصل",
      sections: "الرجال",
      amount: "12000",
      discount: "0",
      paid: "12000",
      tax: "600",
      total: "12600",
      paidTotal: "12600",
      cash: "8000",
      network: "4000",
      remaining: "0",
      reservationStatus: "مؤكد",
      paymentStatus: "مدفوع",
      notes: "",
      owner: "نبيل 4",
    },
  ]);

  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Toggle dropdown for a specific reservation
  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setOpenDropdownId(null);
    }
  };

  // Add event listener for closing dropdowns when clicking outside
  useMemo(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openEditModal = (reservation) => {
    setSelectedReservation(reservation);
    setEditModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when opening modal
  };

  const openDeleteModal = (reservation) => {
    setSelectedReservation(reservation);
    setDeleteModalOpen(true);
    setOpenDropdownId(null); // Close dropdown when opening modal
  };

  const openRecoveryModal = (reservation) => {
    setSelectedReservation(reservation);
    setRecovaryModelOpen(true);
    setOpenDropdownId(null); // Close dropdown when opening modal
  };

  const columns = [
    { label: "#", key: "id" },
    { label: "القاعة", key: "hall" },
    { label: "العميل", key: "client" },
    { label: "تاريخ الحجز", key: "startDate" },
    { label: "تاريخ المناسبة", key: "endDate" },
    { label: "الإجمالي", key: "total" },
    { label: "المقدم", key: "paid" },
    { label: "المدفوع", key: "paidTotal" },
    { label: "المتبقي", key: "remaining" },
    { label: "حالة الحجز", key: "reservationStatus" },
    { label: "حالة الدفع", key: "paymentStatus" },
    { label: "الإجراءات", key: "actions" },
  ];

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      const searchText = searchClientOrHall.trim().toLowerCase();
      const matchesClientOrHall =
        searchText === "" ||
        r.client.toLowerCase().includes(searchText) ||
        r.hall.toLowerCase().includes(searchText);

      const matchesFrom = dateFrom
        ? new Date(r.startDate) >= new Date(dateFrom)
        : true;
      const matchesTo = dateTo
        ? new Date(r.startDate) <= new Date(dateTo)
        : true;

      const matchesPaymentStatus = paymentStatusFilter
        ? (paymentStatusFilter === "مدفوعة" && r.paymentStatus === "مدفوع") ||
          (paymentStatusFilter === "مدفوعة جزئيا" &&
            r.paymentStatus === "جزئي") ||
          (paymentStatusFilter === "غير مدفوعة" &&
            r.paymentStatus !== "مدفوع" &&
            r.paymentStatus !== "جزئي")
        : true;

      const matchesReservationStatus = reservationStatusFilter
        ? r.reservationStatus === reservationStatusFilter
        : true;

      return (
        matchesClientOrHall &&
        matchesFrom &&
        matchesTo &&
        matchesPaymentStatus &&
        matchesReservationStatus
      );
    });
  }, [
    searchClientOrHall,
    dateFrom,
    dateTo,
    paymentStatusFilter,
    reservationStatusFilter,
    reservations,
  ]);

  const dataWithActions = filteredReservations.map((r) => ({
    ...r,
    actions: (
      <div className="flex justify-center align-center" style={{ gap: "3px" }}>
        <div className="tooltip-container">
          <Link
            to="/invoice-rent"
            className="transition duration-300 bg-[#8d44ad] rounded-sm text-[#ffff] w-[30px] h-[30px] flex items-center justify-center"
            data-label="معاينة"
          >
            <FaRegEye size={14} />
          </Link>
          <span className="tooltip">معاينة</span>
        </div>

        <div className="tooltip-container">
          <button
            onClick={() => openRecoveryModal(r)}
            className="transition duration-300 bg-[#0ccbf2] rounded-sm text-[#ffff] w-[30px] h-[30px] flex items-center justify-center"
            data-label="إسترجاع"
          >
            <MdOutlineFileUpload size={14} />
          </button>
          <span className="tooltip">إسترجاع</span>
        </div>

        <div className="tooltip-container">
          <Link
            to="/bond"
            className="transition duration-300 bg-[#fec107] rounded-sm text-[#ffff] w-[30px] h-[30px] flex items-center justify-center"
            data-label="السند"
          >
            <FaRegFileImage size={14} />
          </Link>
          <span className="tooltip">السند</span>
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
                <FaTrashAlt size={17} />
                <span>حذف</span>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
  }));

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

  return (
    <>
      <style>{customStyles}</style>
      <Container>
        <div className="p-4 min-h-screen my-10">
          <div className="flex items-center w-full justify-between">
            <h2 className="text-xl font-bold mb-4">الفواتير </h2>
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#2ba670] text-white rounded-lg text-sm h-[40px] outline-none w-full max-w-[120px]"
            >
              إضافة فاتورة +
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6 items-center">
              <input
                type="text"
                value={searchClientOrHall}
                onChange={(e) => setSearchClientOrHall(e.target.value)}
                placeholder="بحث عن عميل أو قاعة"
                className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
              />

              <div className="flex gap-2 col-span-2">
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border h-[40px] px-2 rounded-lg text-sm w-full outline-none"
                />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border h-[40px] px-2 rounded-lg text-sm w-full outline-none"
                />
              </div>

              <CustomSelect
                value={
                  paymentStatusFilter
                    ? { label: paymentStatusFilter, value: paymentStatusFilter }
                    : null
                }
                onChange={(selected) =>
                  setPaymentStatusFilter(selected ? selected.value : "")
                }
                options={[
                  { value: "", label: "كل حالات الفاتورة" },
                  { value: "مدفوعة", label: "مدفوعة" },
                  { value: "مدفوعة جزئيا", label: "مدفوعة جزئيا" },
                  { value: "غير مدفوعة", label: "غير مدفوعة" },
                ]}
                className="text-sm w-full md:w-[200px]"
                placeholder="كل حالات الفاتورة"
              />

              <div className="lg:mr-[25px]">
                <CustomSelect
                  value={
                    reservationStatusFilter
                      ? {
                          label: reservationStatusFilter,
                          value: reservationStatusFilter,
                        }
                      : null
                  }
                  onChange={(selected) =>
                    setReservationStatusFilter(selected ? selected.value : "")
                  }
                  options={[
                    { value: "", label: "كل حالات الحجز" },
                    { value: "مؤكد", label: "مؤكد" },
                    { value: "ملغي", label: "ملغي" },
                    { value: "قيد الانتظار", label: "قيد الانتظار" },
                  ]}
                  className="text-sm w-full md:w-[200px] ml-3" // المسافة بين السيلكتين
                  placeholder="كل حالات الحجز"
                />
              </div>
            </div>

            {/* جدول الحجوزات */}
            <Table columns={columns} data={dataWithActions} />
          </div>

          {/* مودال التعديل */}
          <EditModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            reservation={selectedReservation}
            onSave={handleUpdateReservation}
          />

          {/* مودال الحذف */}
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            reservation={selectedReservation}
            onDelete={handleDeleteReservation}
          />

          <RecoveryModal
            isOpen={isRecovaryModelOpen}
            onClose={() => setRecovaryModelOpen(false)}
            reservation={selectedReservation}
            onSave={handleUpdateReservation}
          />
          <AddInvoiceModal
            isOpen={isAddModalOpen}
            onClose={() => setAddModalOpen(false)}
            onSave={(newReservation) =>
              setReservations((prev) => [
                ...prev,
                { ...newReservation, id: prev.length + 1 },
              ])
            }
            clients={[...new Set(reservations.map((r) => r.client))]}
            halls={[...new Set(reservations.map((r) => r.hall))]}
          />
        </div>
      </Container>
    </>
  );
};

export default Invoices;
