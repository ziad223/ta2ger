import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import CustomSelect from "../../../components/shared/CustomSelect";

const ReservationsSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // سبتمبر 2025
  const [viewMode, setViewMode] = useState("month"); // month | week

  const formatMonth = (date) =>
    date.toLocaleDateString("ar-EG", { month: "long", year: "numeric" });

  const formatWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7)); // بداية الأسبوع (سبت)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // نهاية الأسبوع (جمعة)

    return `${startOfWeek.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
    })} - ${endOfWeek.toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
    })}`;
  };

  const changeMonth = (step) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + step, 1)
    );
  };

  const changeWeek = (step) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + step * 7);
    setCurrentDate(newDate);
  };

  const reservations = {
    18: {
      hall: "قاعة المعالي الكبرى",
      section: "رجال",
      client: "المعلم/ سعيد",
      phone: "0545477166",
      amount: 9200,
      status: "booked",
    },
    23: {
      hall: "اليوم الوطني السعودي",
      section: "عطلة",
      status: "holiday",
    },
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-500 text-white";
      case "partial":
        return "bg-yellow-500 text-black";
      case "unpaid":
        return "bg-gray-600 text-white";
      case "holiday":
        return "bg-red-500 text-white";
      default:
        return "bg-green-600 text-white";
    }
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let startDay = new Date(year, month, 1).getDay();
  startDay = (startDay + 6) % 7;

  const calendarDays = [
    ...Array(startDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // تجهيز الأسبوع الحالي
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
  const weekDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">📅 تقويم القاعات</h2>
        <div className="flex items-center gap-2">
         <CustomSelect
  options={[
    { value: "all", label: "جميع القاعات" },
    { value: "hall1", label: "قاعة 1" },
    { value: "hall2", label: "قاعة 2" },
  ]}
  value={{ value: "all", label: "جميع القاعات" }}
  onChange={(selected) => console.log(selected)}
  placeholder="اختر قاعة"
  className="w-40 text-sm"
/>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded text-sm shadow ${
                viewMode === "month"
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded text-sm shadow ${
                viewMode === "week"
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              أسبوعي
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
          >
            {viewMode === "month" ? "هذا الشهر" : "هذا الأسبوع"}
          </button>
          <button
            onClick={() =>
              viewMode === "month" ? changeMonth(-1) : changeWeek(-1)
            }
            className="p-2 border rounded hover:bg-gray-100"
          >
            <FiChevronRight />
          </button>
          <button
            onClick={() =>
              viewMode === "month" ? changeMonth(1) : changeWeek(1)
            }
            className="p-2 border rounded hover:bg-gray-100"
          >
            <FiChevronLeft />
          </button>
        </div>
        <h3 className="font-semibold text-lg">
          {viewMode === "month"
            ? formatMonth(currentDate)
            : formatWeekRange(currentDate)}
        </h3>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-green-600"></span> متاح
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-blue-600"></span> محجوز
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span> دفع جزئي
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-gray-600"></span> غير مدفوع
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-red-600"></span> عطلة رسمية
        </div>
      </div>

      {/* Calendar Grid */}
      {viewMode === "month" ? (
        <div className="grid grid-cols-7 border rounded-lg overflow-hidden text-center bg-white shadow">
          {["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"].map((day) => (
            <div
              key={day}
              className="border-b border-r py-2 font-semibold bg-gray-100 text-gray-700"
            >
              {day}
            </div>
          ))}

          {calendarDays.map((day, i) => {
            const reservation = reservations[day];
            return (
              <div
                key={i}
                className="border-b border-r h-36 p-1 text-xs relative hover:bg-gray-50 transition"
              >
                {day && (
                  <>
                    <span className="absolute top-1 right-1 text-gray-600 font-medium">
                      {day}
                    </span>

                    {reservation && (
                      <div
                        className={`mt-5 rounded p-2 text-[11px] text-right shadow ${getStatusClass(
                          reservation.status
                        )}`}
                      >
                        <strong>{reservation.hall}</strong>
                        <br />
                        {reservation.section && `القسم: ${reservation.section}`}
                        <br />
                        {reservation.client && `العميل: ${reservation.client}`}
                        <br />
                        {reservation.phone && `📞 ${reservation.phone}`}
                        <br />
                        {reservation.amount > 0 &&
                          `💰 ${reservation.amount} ريال`}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-7 border rounded-lg overflow-hidden text-center bg-white shadow">
          {["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"].map((day, idx) => (
            <div
              key={day}
              className="border-b border-r py-2 font-semibold bg-gray-100 text-gray-700"
            >
              {day}
            </div>
          ))}

          {weekDays.map((date, i) => {
            const day = date.getDate();
            const reservation = reservations[day];
            return (
              <div
                key={i}
                className="border-b border-r h-40 p-1 text-xs relative hover:bg-gray-50 transition"
              >
                <span className="absolute top-1 right-1 text-gray-600 font-medium">
                  {day}
                </span>

                {reservation && (
                  <div
                    className={`mt-5 rounded p-2 text-[11px] text-right shadow ${getStatusClass(
                      reservation.status
                    )}`}
                  >
                    <strong>{reservation.hall}</strong>
                    <br />
                    {reservation.section && `القسم: ${reservation.section}`}
                    <br />
                    {reservation.client && `العميل: ${reservation.client}`}
                    <br />
                    {reservation.phone && `📞 ${reservation.phone}`}
                    <br />
                    {reservation.amount > 0 && `💰 ${reservation.amount} ريال`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationsSchedule;
