"use client";

import React, { useState, useEffect, useMemo } from "react";
import Container from "../../../components/shared/Container";
import { FaBuffer, FaCreditCard, FaUsers, FaUserShield, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

import apiServiceCall from "../../../utils/apiServiceCall";
import AddUnitModal from "./AddUnitModal";
import EditUnitModal from "./EditUnitModal";
import DeleteUnitModal from "./DeleteUnitModal";

const Units = () => {
  const [units, setUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await apiServiceCall({
          url: "units",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status) {
          setUnits(response.data || []);
        }
      } catch (error) {
        console.error("خطأ في جلب الوحدات:", error);
      }
    };

    fetchUnits();
  }, []);

  // فلترة الوحدات حسب البحث
  const filteredUnits = useMemo(() => {
    if (!searchTerm.trim()) return units;
    return units.filter((u) => u.name.includes(searchTerm.trim()));
  }, [searchTerm, units]);

  return (
    <Container>
      <div className="p-4 min-h-screen">
        {/* Header */}
        <div className="flex items-center flex-col lg:flex-row justify-between w-full my-10">
          <h2 className="text-xl font-bold">الوحدات</h2>
          <div className="flex items-center gap-2 flex-col lg:flex-row">
            <Link to="/settings/employees" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>الموظفين</span>
              <FaUsers />
            </Link>
            <Link to="/settings/sections" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>الأقسام</span>
              <FaBuffer />
            </Link>
            <Link to="/settings/privacy-policy" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>سياسة الخصوصية</span>
              <FaUserShield />
            </Link>
            <Link to="/settings/pay-ways" className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white">
              <span>طرق الدفع</span>
              <FaCreditCard />
            </Link>
          </div>
        </div>

        {/* Search + Add */}
        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="بحث باسم الوحدة"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setAddOpen(true)} className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto">
              أضف وحدة +
            </button>
          </div>

          {/* Cards */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="border rounded-lg p-4 flex flex-col items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-lg font-medium">{unit.name}</div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedUnit(unit);
                      setEditOpen(true);
                    }}
                    className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
                  >
                    <CiEdit size={24} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUnit(unit);
                      setDeleteOpen(true);
                    }}
                    className="text-white bg-red-500 w-[30px] h-[30px] rounded-md flex items-center justify-center hover:bg-red-600 transition"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modals */}
        {addOpen && (
          <AddUnitModal
            onClose={() => setAddOpen(false)}
            onSave={(u) => setUnits([...units, u])}
          />
        )}
        {editOpen && selectedUnit && (
          <EditUnitModal
            unit={selectedUnit}
            onClose={() => setEditOpen(false)}
            onSave={(u) => setUnits(units.map((x) => (x.id === u.id ? u : x)))}
          />
        )}
        {deleteOpen && selectedUnit && (
          <DeleteUnitModal
            unit={selectedUnit}
            onClose={() => setDeleteOpen(false)}
            onConfirm={(id) => setUnits(units.filter((x) => x.id !== id))}
          />
        )}
      </div>
    </Container>
  );
};

export default Units;
