import React from "react";
import Table from "../../components/shared/Table";
import Container from "../../components/shared/Container";

const TaxReturn = () => {
  // الأعمدة الخاصة بجداول الربع
  const quarterColumns = [
    { key: "id", label: "#" },
    { key: "title", label: "البيان" },
    { key: "months", label: "الاشهر" },
    { key: "from", label: "من تاريخ" },
    { key: "to", label: "الي تاريخ" },
  ];

  // بيانات الأرباع
  const quarters = [
    {
      id: 1,
      title: "الربع الاول",
      months: "يناير / فبراير / مارس",
      from: "2025-01-01",
      to: "2025-03-31",
      purchases: [
        { statement: "قيمة المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      sales: [
        { statement: "قيمة المبيعات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المبيعات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      expenses: [
        { statement: "قيمة المصروفات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المصروفات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
    },
    {
      id: 2,
      title: "الربع الثاني من عام 2025",
      months: "ابريل / مايو / يونيو",
      from: "2025-04-01",
      to: "2025-06-30",
      purchases: [
        { statement: "قيمة المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      sales: [
        { statement: "قيمة المبيعات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المبيعات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      expenses: [
        { statement: "قيمة المصروفات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المصروفات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
    },
    {
      id: 3,
      title: "الربع الثالث من عام 2025",
      months: "يوليو / اغسطس / سبتمبر",
      from: "2025-07-01",
      to: "2025-09-30",
      purchases: [
        { statement: "قيمة المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      sales: [
        { statement: "قيمة المبيعات", before: "15,533.75", tax: "2,741.25", after: "18,275.00" },
        { statement: "اجمالي المبيعات", before: "15,533.75", tax: "2,741.25", after: "18,275.00" },
      ],
      expenses: [
        { statement: "قيمة المصروفات", before: "10.00", tax: "0.00", after: "10.00" },
        { statement: "اجمالي المصروفات", before: "10.00", tax: "0.00", after: "10.00" },
      ],
    },
    {
      id: 4,
      title: "الربع الرابع من عام 2025",
      months: "اكتوبر / نوفمبر / ديسمبر",
      from: "2025-10-01",
      to: "2025-12-31",
      purchases: [
        { statement: "قيمة المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المشتريات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      sales: [
        { statement: "قيمة المبيعات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المبيعات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
      expenses: [
        { statement: "قيمة المصروفات", before: "0.00", tax: "0.00", after: "0.00" },
        { statement: "اجمالي المصروفات", before: "0.00", tax: "0.00", after: "0.00" },
      ],
    },
  ];

  // أعمدة المشتريات/المبيعات/المصروفات
  const taxColumns = [
    { key: "statement", label: "البيان" },
    { key: "before", label: "اجمالى المجموع قبل الضريبه" },
    { key: "tax", label: "اجمالى الضريبة" },
    { key: "after", label: "المجموع الكلى بعد الضريبه" },
  ];

  return (
    <Container>
      <div className="p-6 space-y-10">
      <h1 className="text-xl font-bold text-center mb-6">الإقرار الضريبي لعام 2025</h1>

      {quarters.map((q) => (
        <div key={q.id} className="space-y-6 bg-white p-5 rounded-lg">
          <h2 className="text-lg font-bold text-gray-800">{q.title}</h2>

          {/* جدول بيانات الربع */}
          <Table columns={quarterColumns} data={[q]} />

          {/* المشتريات */}
          <h3 className="text-md font-semibold text-gray-700 mt-4">
            المشتريات الخاصة للضريبة الاساسية
          </h3>
          <Table columns={taxColumns} data={q.purchases} />

          {/* المبيعات */}
          <h3 className="text-md font-semibold text-gray-700 mt-4">
            المبيعات الخاصة للضريبة الاساسية
          </h3>
          <Table columns={taxColumns} data={q.sales} />

          {/* المصروفات */}
          <h3 className="text-md font-semibold text-gray-700 mt-4">
            المصروفات الخاصة للضريبة الاساسية
          </h3>
          <Table columns={taxColumns} data={q.expenses} />
        </div>
      ))}

      {/* ملخص في الآخر */}
      <div className="mt-10 bg-gray-100 p-5 rounded-lg shadow text-right space-y-2">
        <p className="font-bold text-gray-800">
          صافي ضريبة المبيعات: <span className="text-green-600">2,741.25</span>
        </p>
        <p className="font-bold text-gray-800">
          صافي ضريبة المشتريات + المصروفات: <span className="text-red-600">0.00</span>
        </p>
        <p className="font-bold text-gray-800">
          صافي الضريبة المستحقة: <span className="text-blue-600">2,741.25</span>
        </p>
      </div>
    </div>
    </Container>
  );
};

export default TaxReturn;
