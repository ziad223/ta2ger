// NewInvoices.jsx
import React, { useState, useMemo } from 'react';
import Container from '../../components/shared/Container';
import Table from '../../components/shared/Table';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import CustomSelect from '../../components/shared/CustomSelect';
import AddInvoiceModal from './AddInvoiceModal';

const NewInvoices = () => {
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('');
  const [clientFilter, setClientFilter] = useState('');

  const [invoices, setInvoices] = useState([
    {
      id: 101,
      client: "محمد علي",
      date: "2025-09-20",
      amount: "15000",
      tax: "750",
      total: "15750",
      remaining: "5000",
      status: "مدفوعة جزئيا",
      paymentMethod: "كاش",
    },
    {
      id: 102,
      client: "سارة عبد الله",
      date: "2025-09-25",
      amount: "10000",
      tax: "500",
      total: "10500",
      remaining: "0",
      status: "مدفوعة",
      paymentMethod: "تحويل",
    },
    {
      id: 103,
      client: "أحمد حسن",
      date: "2025-09-28",
      amount: "8000",
      tax: "400",
      total: "8400",
      remaining: "8400",
      status: "غير مدفوعة",
      paymentMethod: "شبكة",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns = [
    { label: "رقم الفاتورة", key: "id" },
    { label: "العميل", key: "client" },
    { label: "تاريخ الفاتورة", key: "date" },
    { label: "مبلغ الفاتورة", key: "amount" },
    { label: "الضريبة", key: "tax" },
    { label: "المبلغ الإجمالي", key: "total" },
    { label: "المتبقي", key: "remaining" },
    { label: "حالة الفاتورة", key: "status" },
    { label: "طريقة الدفع", key: "paymentMethod" },
    { label: "التحكم", key: "actions" },
  ];

  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesInvoiceSearch =
        invoiceSearch === '' || inv.id.toString().includes(invoiceSearch);

      const matchesFrom = dateFrom ? new Date(inv.date) >= new Date(dateFrom) : true;
      const matchesTo = dateTo ? new Date(inv.date) <= new Date(dateTo) : true;

      const matchesPaymentMethod = paymentMethodFilter
        ? inv.paymentMethod === paymentMethodFilter
        : true;

      const matchesClient = clientFilter
        ? inv.client === clientFilter
        : true;

      return matchesInvoiceSearch && matchesFrom && matchesTo && matchesPaymentMethod && matchesClient;
    });
  }, [invoiceSearch, dateFrom, dateTo, paymentMethodFilter, clientFilter, invoices]);

  const dataWithActions = filteredInvoices.map(inv => ({
    ...inv,
    actions: (
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => {
            setSelectedInvoice(inv);
            setEditModalOpen(true);
          }}
          className="bg-[#0dcaf0] text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaEdit size={18} />
        </button>
        <button
          onClick={() => {
            setSelectedInvoice(inv);
            setDeleteModalOpen(true);
          }}
          className="bg-red-500 text-white rounded-sm w-[30px] h-[30px] flex items-center justify-center"
        >
          <FaTrashAlt size={16} />
        </button>
      </div>
    )
  }));

  const handleUpdateInvoice = (updated) => {
    setInvoices(prev =>
      prev.map(inv => (inv.id === updated.id ? updated : inv))
    );
  };

  const handleDeleteInvoice = (id) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
    setSelectedInvoice(null);
  };

  return (
    <Container>
      <div className="p-4 min-h-screen my-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-bold mb-4">الفواتير</h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2ba670] px-3 h-[35px] text-white rounded-md"
          >
            أضف فاتورة +
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* فلاتر البحث */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 items-center">
            {/* بحث برقم الفاتورة */}
            <input
              type="text"
              value={invoiceSearch}
              onChange={e => setInvoiceSearch(e.target.value)}
              placeholder="بحث برقم الفاتورة"
              className="border h-[40px] px-3 rounded-lg text-sm w-full outline-none"
            />

            {/* تاريخ من + إلى */}
            <input
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              className="border h-[40px] px-2 rounded-lg text-sm w-full outline-none"
            />
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="border h-[40px] px-2 rounded-lg text-sm w-full outline-none"
            />

            {/* Select طريقة الدفع */}
            <CustomSelect
              value={paymentMethodFilter ? { label: paymentMethodFilter, value: paymentMethodFilter } : null}
              onChange={(selected) => setPaymentMethodFilter(selected ? selected.value : "")}
              options={[
                { value: "", label: "كل طرق الدفع" },
                { value: "كاش", label: "كاش" },
                { value: "شبكة", label: "شبكة" },
                { value: "تحويل", label: "تحويل" },
              ]}
              className="text-sm w-full"
              placeholder="طريقة الدفع"
            />

            {/* Select العميل */}
            <CustomSelect
              value={clientFilter ? { label: clientFilter, value: clientFilter } : null}
              onChange={(selected) => setClientFilter(selected ? selected.value : "")}
              options={[
                { value: "", label: "كل العملاء" },
                ...invoices.map(inv => ({ value: inv.client, label: inv.client })),
              ]}
              className="text-sm w-full"
              placeholder="اختيار العميل"
            />
          </div>

          {/* جدول الفواتير */}
          <Table columns={columns} data={dataWithActions} />
        </div>

        {/* مودال التعديل */}
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          invoice={selectedInvoice}
          onSave={handleUpdateInvoice}
        />

        {/* مودال الحذف */}
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          invoice={selectedInvoice}
          onDelete={handleDeleteInvoice}
        />
        <AddInvoiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={(newInvoice) => setInvoices(prev => [...prev, newInvoice])}
          clients={[...new Set(invoices.map(inv => inv.client))]} // قائمة العملاء المميزة
        />
      </div>
    </Container>
  );
};

export default NewInvoices;
