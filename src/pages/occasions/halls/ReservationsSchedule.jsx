"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import CustomSelect from "../../../components/shared/CustomSelect";
import { Link } from "react-router-dom";

const daysOfWeek = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

// بيانات القاعات
const sampleHalls = [
  { id: 1, name: "القاعة الكبرى", color: "bg-green-100 text-green-700" },
  { id: 2, name: "القاعة الجانبية", color: "bg-blue-100 text-blue-700" },
  { id: 3, name: "قاعة المناسبات", color: "bg-purple-100 text-purple-700" },
  { id: 4, name: "القاعة الملكية", color: "bg-pink-100 text-pink-700" },
  { id: 5, name: "القاعة الماسية", color: "bg-yellow-100 text-yellow-700" },
];

// بيانات حجز عشوائية
const bookedData = [
  {
    name: "خالد عبدالله",
    total: 6000,
    deposit: 700,
    remaining: 5300,
  },
  {
    name: "منى أحمد",
    total: 4500,
    deposit: 1000,
    remaining: 3500,
  },
  {
    name: "محمد فوزي",
    total: 5000,
    deposit: 500,
    remaining: 4500,
  },
];

const ReservationsSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));
  const [viewMode, setViewMode] = useState("month");

  const next = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (viewMode === "month" ? 1 : 0),
        currentDate.getDate() + (viewMode === "week" ? 7 : 0)
      )
    );
  };

  const prev = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - (viewMode === "month" ? 1 : 0),
        currentDate.getDate() - (viewMode === "week" ? 7 : 0)
      )
    );
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayIndex = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // دالة لتوليد عشوائي لحجز أو قاعة متاحة
  const getRandomStatus = () => {
    const random = Math.random();
    if (random < 0.4) {
      // 40% احتمال يكون محجوز
      const booking =
        bookedData[Math.floor(Math.random() * bookedData.length)];
      return { booked: true, booking };
    }
    // غير محجوز
    return { booked: false, hall: sampleHalls[Math.floor(Math.random() * sampleHalls.length)] };
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? 0 : -day;
    startOfWeek.setDate(currentDate.getDate() + diff);

    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10 border">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            تقويم القاعات
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition"
            >
              <FiChevronRight className="text-xl text-gray-700" />
            </button>
            <span className="text-gray-800 font-semibold px-3 text-lg">
              {currentDate.toLocaleDateString("ar-EG", {
                year: "numeric",
                month: "long",
              })}
            </span>
            <button
              onClick={next}
              className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 transition"
            >
              <FiChevronLeft className="text-xl text-gray-700" />
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("month")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === "month"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              عرض شهري
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition ${
                viewMode === "week"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              عرض أسبوعي
            </button>
          </div>

          <div className="w-full sm:w-60">
            <CustomSelect
              placeholder="اختر القاعة"
              options={[
                { value: "hall1", label: "القاعة الرئيسية" },
                { value: "hall2", label: "القاعة الجانبية" },
              ]}
            />
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-10">
          {/* 📅 العرض الشهري */}
          {viewMode === "month" && (
            <div className="grid grid-cols-7 gap-3 text-center">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="py-4" />
              ))}

              {daysArray.map((day) => {
                const status = getRandomStatus();
                return (
                  <div
                    key={day}
                    className="border rounded-lg p-3 bg-white hover:bg-blue-50 transition cursor-pointer text-sm text-gray-700 shadow-sm group relative flex flex-col justify-between"
                  >
                    <div className="font-bold text-gray-800">{day}</div>

                    {/* إذا القاعة محجوزة */}
                    {status.booked ? (
                      <div className="mt-3 text-xs bg-red-50 text-red-700 p-3 rounded-lg space-y-1 text-right">
                        <p className="font-bold text-red-800">محجوز</p>
                        <p>
                          <span className="font-semibold text-s">العميل:</span>{" "}
                          {status.booking.name}
                        </p>
                        <p>
                          <span className="font-semibold">المبلغ:</span>{" "}
                          {status.booking.total} ج
                        </p>
                        <p>
                          <span className="font-semibold">العربون:</span>{" "}
                          {status.booking.deposit} ج
                        </p>
                        <p>
                          <span className="font-semibold">المتبقي:</span>{" "}
                          {status.booking.remaining} ج
                        </p>
                      </div>
                    ) : (
                      <>
                        <div
                          className={`mt-3 text-xs px-3 py-2 rounded-lg font-semibold ${status.hall.color}`}
                        >
                          {status.hall.name}
                        </div>
                        <Link
                          to="/new-booking"
                          className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden group-hover:flex items-center gap-1 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full shadow-md hover:bg-blue-700 transition"
                        >
                          <FiPlus size={14} />
                          احجز
                        </Link>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationsSchedule;
