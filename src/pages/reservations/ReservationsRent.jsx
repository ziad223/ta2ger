
import React from 'react';
import { FaChevronLeft, FaPrint } from 'react-icons/fa';
import Container from '../../components/shared/Container';
import logo from '../../../public/images/home/login-logo.png';
import Table from '../../components/shared/Table'; // استدعاء الجدول

const ReservationsRent = () => {
  const invoiceColumns = [
    { label: 'رقم الفاتورة - Invoice number', key: 'invoiceNumber' },
    { label: 'تاريخ الفاتورة - Invoice date', key: 'invoiceDate' },
    { label: 'وقت الفاتورة - Payment time', key: 'paymentTime' },
    { label: 'حالة الفاتورة - Payment method', key: 'paymentMethod' },
  ];
  const invoiceData = [
    {
      invoiceNumber: 'INV-001',
      invoiceDate: '2025-09-28',
      paymentTime: '12:30 PM',
      paymentMethod: 'مدفوع',
    },
  ];

  // بيانات الجدول الثاني
  const bookingColumns = [
    { label: 'رقم الحجز', key: 'bookingNumber' },
    { label: 'القاعه', key: 'hall' },
    { label: 'مده التاجير', key: 'duration' },
    { label: 'بدايه الايجار', key: 'startDate' },
    { label: 'نهاية الايجار', key: 'endDate' },
    { label: 'المبلغ', key: 'amount' },
    { label: 'الضريبه', key: 'tax' },
    { label: 'المجموع', key: 'total' },
  ];
  const bookingData = [
    {
      bookingNumber: 'BKG-101',
      hall: 'قاعة المعالي',
      duration: '3 أيام',
      startDate: '2025-10-01',
      endDate: '2025-10-03',
      amount: '5000 ر.س',
      tax: '750 ر.س',
      total: '5750 ر.س',
    },
  ];

  // بيانات الجدول الثالث
  const serviceColumns = [
    { label: 'الخدمة', key: 'service' },
    { label: 'الكمية', key: 'quantity' },
    { label: 'السعر', key: 'price' },
    { label: 'المبلغ', key: 'amount' },
    { label: 'الضريبة', key: 'tax' },
    { label: 'الاجمالي', key: 'total' },
  ];
  const serviceData = [
    {
      service: 'تصوير',
      quantity: '2',
      price: '1000 ر.س',
      amount: '2000 ر.س',
      tax: '300 ر.س',
      total: '2300 ر.س',
    },
  ];

  return (
    <Container>
      <div className="my-10 min-h-screen px-3 sm:px-5">
        <div className="w-full mx-auto">
          {/* أزرار الطباعة والرجوع */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full sm:w-auto justify-center"
            >
              <span>طباعة</span>
              <span className="text-sm">
                <FaPrint />
              </span>
            </button>

            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 w-full sm:w-auto justify-center"
            >
              <span>رجوع</span>
              <span className="text-sm mt-1">
                <FaChevronLeft />
              </span>
            </button>
          </div>

          {/* العنوان */}
          <div className="bg-white p-5 mt-5 text-center text-xl">
            <h2>فاتورة ضريبية مبسطة</h2>
            <div className="border-2 border-gray-700 py-5 lg:px-20 mt-5 rounded-lg">
              <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-5">
                <div className="flex flex-col gap-3 items-start font-bold text-base">
                  <h3>قاعة المعالي الكبرئ</h3>
                  <h3>جدة - الحرازات</h3>
                  <h3>الرقم الضريبي: 302214006200003</h3>
                  <h3>الجوال: 0503085393</h3>
                </div>
                <img src={logo} alt="logo" className="w-32 h-32" />
                <div className="flex flex-col gap-3 items-start font-bold text-base">
                  <p>شيخ1</p>
                  <p>الرقم الضريبي:</p>
                  <p>الجوال: 0545477164</p>
                </div>
              </div>
            </div>
               <Table columns={invoiceColumns} data={invoiceData} />

          <Table columns={bookingColumns} data={bookingData} />

          <Table columns={serviceColumns} data={serviceData} />
          </div>

       
        </div>
      </div>
    </Container>
  );
};

export default ReservationsRent;
