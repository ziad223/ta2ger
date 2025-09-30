import React, { useState } from "react";
import Container from "../../../components/shared/Container";

// ========== Add Modal ==========
const AddUnitModal = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onAdd({ id: Date.now(), name });
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">إضافة وحدة جديدة</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

// ========== Edit Modal ==========
const EditUnitModal = ({ isOpen, onClose, onSave, unit }) => {
  const [name, setName] = useState(unit?.name || "");

  React.useEffect(() => {
    if (unit) setName(unit.name);
  }, [unit]);

  if (!isOpen || !unit) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    onSave({ ...unit, name });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h3 className="text-lg font-bold mb-4">تعديل الوحدة</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

// ========== Delete Modal ==========
const DeleteUnitModal = ({ isOpen, onClose, onConfirm, unit }) => {
  if (!isOpen || !unit) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[350px]">
        <h3 className="text-lg font-bold mb-4">تأكيد الحذف</h3>
        <p className="mb-4">هل أنت متأكد من حذف الوحدة "{unit.name}"؟</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
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

// ========== Main Page ==========
const Units = () => {
  const [units, setUnits] = useState([
    { id: 1, name: "قطعة" },
    { id: 2, name: "كيلو" },
  ]);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleAdd = (unit) => {
    setUnits([...units, unit]);
  };

  const handleEdit = (unit) => {
    setUnits(units.map((u) => (u.id === unit.id ? unit : u)));
  };

  const handleDelete = (id) => {
    setUnits(units.filter((u) => u.id !== id));
  };

  return (
    <Container>

    <div className="p-6 my-10 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">الوحدات</h2>
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + إضافة وحدة
        </button>
      </div>

      {/* Table */}
      <table className="w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">الاسم</th>
            <th className="p-2 border">التحكم</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => (
            <tr key={unit.id} className="text-center">
              <td className="p-2 border">{unit.name}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => {
                    setSelectedUnit(unit);
                    setEditOpen(true);
                  }}
                  className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                  تعديل
                </button>
                <button
                  onClick={() => {
                    setSelectedUnit(unit);
                    setDeleteOpen(true);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      <AddUnitModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
      <EditUnitModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleEdit}
        unit={selectedUnit}
      />
      <DeleteUnitModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        unit={selectedUnit}
      />
    </div>
    </Container>
  );
};

export default Units;
