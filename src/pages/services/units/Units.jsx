import React, { useState, useMemo } from "react";
import Container from "../../../components/shared/Container";
import { FaBuffer, FaCreditCard, FaEdit, FaTrashAlt, FaUsers, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

// ===== Add Modal =====
const AddUnitModal = ({ onClose, onSave }) => {
  const [name, setName] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ id: Date.now(), name });
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">إضافة وحدة جديدة</h3>
        <form onSubmit={handleSave} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="اسم الوحدة"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              إضافة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===== Edit Modal =====
const EditUnitModal = ({ unit, onClose, onSave }) => {
  const [name, setName] = useState(unit?.name || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ ...unit, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">تعديل الوحدة</h3>
        <form onSubmit={handleUpdate} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="اسم الوحدة"
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ===== Delete Modal =====
const DeleteUnitModal = ({ unit, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p className="mb-4">هل أنت متأكد من حذف الوحدة "{unit.name}"؟</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            إلغاء
          </button>
          <button
            onClick={() => {
              onConfirm(unit.id);
              onClose();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

// ===== Main Page =====
const Units = () => {
  const [units, setUnits] = useState([
    { id: 1, name: "قطعة" },
    { id: 2, name: "كيلو" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const filteredUnits = useMemo(() => {
    if (!searchTerm.trim()) return units;
    return units.filter((u) => u.name.includes(searchTerm.trim()));
  }, [searchTerm, units]);

  const handleAdd = (unit) => setUnits([...units, unit]);
  const handleEdit = (unit) => setUnits(units.map((u) => (u.id === unit.id ? unit : u)));
  const handleDelete = (id) => setUnits(units.filter((u) => u.id !== id));

  return (
    <Container>
      <div className="p-4 min-h-screen">
        {/* Header Section */}
        <div className="flex items-center flex-col lg:flex-row justify-between w-full my-10">
          <h2 className="text-xl font-bold">الوحدات</h2>
          <div className="flex items-center gap-2 flex-col lg:flex-row">
            <Link
              to="/settings/employees"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>الموظفين</span>
              <FaUsers />
            </Link>
            <Link
              to="/settings/sections"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>الأقسام</span>
              <FaBuffer />
            </Link>
            <Link
              to="/settings/privacy-policy"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>سياسة الخصوصية</span>
              <FaUserShield />
            </Link>
            <Link
              to="/settings/pay-ways"
              className="flex items-center gap-2 px-3 h-[35px] rounded-lg bg-[#17a2b8] text-white"
            >
              <span>طرق الدفع</span>
              <FaCreditCard />
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white mt-5 shadow-sm p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-3 md:gap-0">
            <input
              type="text"
              placeholder="بحث باسم الوحدة"
              className="outline-none h-[40px] border px-3 rounded-lg w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={() => setAddOpen(true)}
              className="bg-[#2ba670] px-4 h-[40px] text-white rounded-md w-full md:w-auto"
            >
              أضف وحدة +
            </button>
          </div>

          {/* Cards Layout */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="border rounded-lg p-4 flex flex-col items-center justify-between gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-lg font-medium">{unit.name}</div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelectedUnit(unit);
                      setEditOpen(true);
                    }}
                     className="text-white text-xs bg-gradient-to-r from-[#0dcaf0] to-[#09a5cc] w-[30px] h-[30px] rounded-md flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-transform duration-200"
                                              >
                                         <CiEdit  size={24} />
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
        {addOpen && <AddUnitModal onClose={() => setAddOpen(false)} onSave={handleAdd} />}
        {editOpen && selectedUnit && (
          <EditUnitModal
            unit={selectedUnit}
            onClose={() => setEditOpen(false)}
            onSave={handleEdit}
          />
        )}
        {deleteOpen && selectedUnit && (
          <DeleteUnitModal
            unit={selectedUnit}
            onClose={() => setDeleteOpen(false)}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </Container>
  );
};

export default Units;
