import React, { useState, useMemo, useEffect } from "react";
import Container from "../../../components/shared/Container";
import Table from "../../../components/shared/Table";
import { FaPrint, FaTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import AddHallModal from "./AddHallModal";
import EditHallModal from "./EditHallModal";
import DeleteHallModal from "./DeleteHallModal";
import apiServiceCall from "../../../utils/apiServiceCall";

const Halls = () => {
  const [halls, setHalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  // 🧭 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);

  // 🕒 مدة صلاحية الكاش (5 دقائق)
  const CACHE_DURATION = 30 * 60 * 1000;

  const fetchHalls = async (page = 1, forceRefresh = false) => {
    setError("");

    if (!forceRefresh) {
      const cachedData = localStorage.getItem("hallsCache");
      if (cachedData) {
        const { data, timestamp, pagination } = JSON.parse(cachedData);

        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log("⚡ جلب البيانات من الكاش");
          setHalls(data);
          if (pagination) {
            setCurrentPage(pagination.current_page);
            setLastPage(pagination.last_page);
            setPerPage(pagination.per_page);
            setTotal(pagination.total);
          }
          return; // نوقف هنا ومندخلش الشبكة
        } else {
          // انتهى الكاش
          localStorage.removeItem("hallsCache");
        }
      }
    }

    // ✅ لو مفيش كاش أو انتهى، نجيب من السيرفر
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      const response = await apiServiceCall({
        url: `halls?page=${page}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (Array.isArray(response.data)) {
        const cleanedData = response.data.map((hall) => ({ ...hall }));
        setHalls(cleanedData);

        if (response.pagination) {
          setCurrentPage(response.pagination.current_page);
          setLastPage(response.pagination.last_page);
          setPerPage(response.pagination.per_page);
          setTotal(response.pagination.total);
        }

        // ✅ نحفظ الكاش
        localStorage.setItem(
          "hallsCache",
          JSON.stringify({
            data: cleanedData,
            pagination: response.pagination,
            timestamp: Date.now(),
          })
        );

        console.log("🌐 تم جلب البيانات من السيرفر وتخزينها في الكاش");
      } else {
        setHalls([]);
      }
    } catch (err) {
      console.error("❌ فشل جلب القاعات:", err);
      setError("حدث خطأ أثناء تحميل القاعات");
    } finally {
      setIsLoading(false);
    }
  };

  // 🪄 تحميل أولي
  useEffect(() => {
    fetchHalls(currentPage);
  }, [currentPage]);

  // 🧩 الأعمدة
  const columns = useMemo(() => {
    if (!halls.length) return [];

    const excludedKeys = [
      "wa_api_instance_id",
      "wa_api_token",
      "wa_api_instance_id_generated_at",
      "taqnyat_app_key",
      "taqnyat_sender",
    ];

    const keys = Object.keys(halls[0]).filter(
      (key) => !excludedKeys.includes(key)
    );
    const orderedKeys = ["logo", ...keys.filter((key) => key !== "logo")];

    const columnLabels = {
      logo: "شعار القاعة",
      name: "اسم القاعة",
      address: "العنوان",
      tax_number: "الرقم الضريبي",
      phone: "الجوال",
      status: "الحالة",
      rent_from_time: "من وقت الإيجار",
      rent_to_time: "إلى وقت الإيجار",
      about_hall: "عن القاعة",
      alert_message: "رسالة التنبيه",
    };

    return orderedKeys
      .map((key) => ({
        label: columnLabels[key] || key,
        key,
      }))
      .concat([{ label: "التحكم", key: "actions" }]);
  }, [halls]);

  // 🔍 الفلترة
  const filteredHalls = useMemo(() => {
    if (!searchTerm.trim()) return halls;
    return halls.filter(
      (hall) =>
        hall.name?.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        hall.address?.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [searchTerm, halls]);

  const dataWithActions = useMemo(() => {
    if (!Array.isArray(filteredHalls)) return [];

    return filteredHalls.map((hall) => {
      const normalizedHall = Object.fromEntries(
        Object.entries(hall).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            return [key, value.name || value.id || JSON.stringify(value)];
          }
          return [key, value];
        })
      );

      return {
        ...normalizedHall,
        logo: hall.logo ? (
          <img
            src={hall.logo}
            alt={hall.name}
            className="w-16 h-12 object-cover rounded mx-auto"
          />
        ) : (
          <span className="text-gray-400">لا يوجد شعار</span>
        ),
        status:
          hall.status === 1 || hall.status === true ? (
            <span className="text-green-600 font-semibold">متاحة</span>
          ) : (
            <span className="text-red-600 font-semibold">غير متاحة</span>
          ),
        actions: (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setSelectedHall(hall);
                setEditModalOpen(true);
              }}
              className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
            >
              <CiEdit size={20} />
            </button>
            <button
              onClick={() => {
                setSelectedHall(hall);
                setDeleteModalOpen(true);
              }}
              className="text-white bg-red-500 w-[30px] h-[30px] rounded-sm flex items-center justify-center hover:bg-red-600 transition"
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        ),
      };
    });
  }, [filteredHalls]);

  const handleAddHall = (newHall) => {
    const id = halls.length ? halls[halls.length - 1].id + 1 : 1;
    const updated = [...halls, { ...newHall, id }];
    setHalls(updated);
    // ✅ نحدّث الكاش
    localStorage.setItem(
      "hallsCache",
      JSON.stringify({ data: updated, timestamp: Date.now() })
    );
  };

  const handleUpdateHall = (updatedHall) => {
    const updated = halls.map((h) =>
      h.id === updatedHall.id ? updatedHall : h
    );
    setHalls(updated);
    localStorage.setItem(
      "hallsCache",
      JSON.stringify({ data: updated, timestamp: Date.now() })
    );
  };

  const handleDeleteHall = () => {
    const updated = halls.filter((h) => h.id !== selectedHall.id);
    setHalls(updated);
    setDeleteModalOpen(false);
    setSelectedHall(null);
    localStorage.setItem(
      "hallsCache",
      JSON.stringify({ data: updated, timestamp: Date.now() })
    );
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <h2 className="text-xl font-bold mb-4">القاعات</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0 mb-4">
            <input
              type="text"
              placeholder="البحث بالاسم أو العنوان"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-1/3"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <div className="flex gap-2">
              <div
                onClick={() => window.print()}
                className="bg-yellow-400 w-[35px] h-[35px] rounded-md text-white flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition"
              >
                <FaPrint size={19} />
              </div>
              <Link
                to="/reservations-schedule"
                className="bg-[#0dcaf0] flex items-center gap-2 px-3 h-[35px] text-white rounded-md w-full md:w-auto"
              >
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

          {lastPage > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-1.5 rounded-md font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#0dcaf0] text-white hover:bg-[#0bb4d8]"
                }`}
              >
                السابق
              </button>

              {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md font-semibold border transition ${
                    page === currentPage
                      ? "bg-[#0dcaf0] text-white border-[#0dcaf0]"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(lastPage, p + 1))}
                disabled={currentPage === lastPage}
                className={`px-4 py-1.5 rounded-md font-medium transition ${
                  currentPage === lastPage
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#0dcaf0] text-white hover:bg-[#0bb4d8]"
                }`}
              >
                التالي
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 🧱 المودالات */}
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
        hallId={selectedHall?.id}
      />
    </Container>
  );
};

export default Halls;
