import React, { useState, useMemo } from "react";
import { FiSearch, FiDownload, FiX, FiCalendar } from "react-icons/fi";
import DonutChart from "./DonutChart";

const demoTableData = Array.from({ length: 27 }).map((_, i) => ({
  id: i + 1,
  name: `عنصر ${i + 1}`,
  date: `2025-09-${(i % 30) + 1}`.padStart(10, "0"),
  amount: (Math.random() * 1000).toFixed(2),
  status: i % 3 === 0 ? "مغلقة" : "مفتوحة",
}));

export default function ReportModal({ openReport, onClose }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return demoTableData;
    return demoTableData.filter((r) => r.name.includes(q) || String(r.id) === q);
  }, [query]);

  const pageCount = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (!openReport) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-bold text-lg">{openReport.title}</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm">
              <FiDownload />
              تصدير
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center">
            <DonutChart value={51} />
          </div>

          <div className="md:col-span-2 col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center border rounded-md px-3 py-2 gap-2 w-[60%]">
                <FiSearch />
                <input
                  type="text"
                  placeholder="بحث..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  className="w-full outline-none text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 border rounded-md flex items-center gap-2">
                  <FiCalendar />
                  آخر 30 يوم
                </button>
                <button className="px-3 py-2 bg-teal-600 text-white rounded-md">عرض</button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-right">#</th>
                    <th className="p-3 text-right">الاسم</th>
                    <th className="p-3 text-right">التاريخ</th>
                    <th className="p-3 text-right">القيمة</th>
                    <th className="p-3 text-right">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-gray-500">
                        لا توجد نتائج
                      </td>
                    </tr>
                  ) : (
                    pageData.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="p-3 text-right">{r.id}</td>
                        <td className="p-3 text-right">{r.name}</td>
                        <td className="p-3 text-right">{r.date}</td>
                        <td className="p-3 text-right">{r.amount} ج.م</td>
                        <td className="p-3 text-right">{r.status}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-3">
              <div className="text-xs text-gray-500">إجمالي نتائج: {filtered.length}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                  disabled={page === 1}
                >
                  السابق
                </button>
                <div className="px-3 py-1 border rounded-md">{page} / {pageCount || 1}</div>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount || 1, p + 1))}
                  className="px-3 py-1 border rounded-md disabled:opacity-50"
                  disabled={page === pageCount || pageCount === 0}
                >
                  التالي
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
