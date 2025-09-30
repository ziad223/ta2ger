// BookingPage.jsx
import React, { useState } from 'react';

import AddBookingForm from './AddBookingForm';

const BookingPage = () => {
  const [bookingData, setBookingData] = useState({
    client: {},
    material: {},
    followUp: {},
    services: [],
    financial: {},
    notes: ''
  });

  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const updateBookingData = (section, data) => {
    setBookingData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSaveBooking = () => {
    console.log('بيانات الحجز:', bookingData);
    alert('تم حفظ الحجز بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
  
      <AddBookingForm/>
    </div>
  );
};

export default BookingPage;