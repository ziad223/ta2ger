"use client";

import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";
import CustomSelect from "../../../components/shared/CustomSelect";
import { Link } from "react-router-dom";

const daysOfWeek = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

const ReservationsSchedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1)); // سبتمبر 2025
  const [viewMode, setViewMode] = useState("month"); // month | week

  // التنقل
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

  // حساب الأيام
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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
          {viewMode === "month" && (
            <div className="grid grid-cols-7 gap-2 text-center">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}

              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="py-4" />
              ))}

              {daysArray.map((day) => (
                <div
                  key={day}
                  className="border rounded-lg p-4 bg-gray-50 hover:bg-blue-50 cursor-pointer transition text-sm text-gray-700 shadow-sm"
                >
                  {day}
                </div>
              ))}
            </div>
          )}

          {viewMode === "week" && (
            <div className="grid grid-cols-7 gap-2 text-center">
              {daysOfWeek.map((day, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-6 bg-gray-50 hover:bg-blue-50 cursor-pointer transition text-sm text-gray-700 shadow-sm"
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="mt-10 flex justify-center">
          <Link to='/new-booking' className="flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition">
            <FiPlus className="text-lg" />
            إضافة حجز جديد
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationsSchedule;
