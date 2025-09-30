import React, { useEffect, Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Loader from './components/shared/Loader';
import Home from './pages/Home';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import AddClient from './pages/add-client/AddClient';
import Reservations from './pages/reservations/Reservations';
import Invoices from './pages/invoices/Invoices';
import Settings from './pages/settings/Settings';
import Employees from './pages/settings/Employees';
import Sections from './pages/settings/Sections';
import PayWays from './pages/settings/PayWays';
import PrivacyPolicyContent from './pages/settings/PrivacyPolicyContent';
import LandingControl from './pages/landing-control/LandingControl';
import Occasions from './pages/occasions/Occasions';
import Halls from './pages/occasions/halls/Halls';
import Services from './pages/services/Services';
import Offers from './pages/services/offers/Offers';
import Categories from './pages/services/categories/Categories';
import ContactMessages from './pages/contact-messages/ContactMessages';
import MessagesSettings from './pages/messages/MessagesSettings';
import SendingMarketingMessages from './pages/messages/SendingMarketingMessages';
import WhatsappSettings from './pages/messages/WhatsappSettings';
import Units from './pages/services/units/Units';
import ProgramAdditions from './pages/program-additions/ProgramAdditions';
import Notifications from './pages/notifications/Notifications';
import Clients from './pages/clients/Clients';
import NewInvoices from './pages/new-invoices/NewInvoices';
import PhotoGallery from './pages/photo-gallery/PhotoGallery';
import Alerts from './pages/alerts/Alerts';
import Login from './pages/login/Login';
import VisitorsReservations from './pages/visitrors-reservations/VisitorsReservations';
import ProtectedRoute from './components/ProtectedRoute';
import Reports from './pages/reports/Reports';
import BookingPage from './pages/new-booking/BookingPage';
import ReservationsSchedule from './pages/occasions/halls/ReservationsSchedule';
import Bond from './pages/reservations/Bond';
import InvoiceRent from './pages/invoices/InvoiceRent';
import ReservationsRent from './pages/reservations/ReservationsRent';
import SingleReservation from './pages/reservations/SingleReservation';
import Accounting from './pages/accounting/Accounting';
import AccountSettings from './pages/accounting/Account-settings';
import AccountingTree from './pages/accounting/Accounting-tree';
 import AccountStatement from './pages/accounting/AccountStatement';
import TrialBalance from './pages/accounting/TrialBalance';
import Restrictions from './pages/accounting/Restrictions';
import IncomeStatement from './pages/accounting/IncomeStatment';


const AppContent = () => {
  const location = useLocation();
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }, [language]);

  // 👇 الشرط هنا
  const hideFooter = location.pathname === '/login';
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/add-client' element={<ProtectedRoute><AddClient /></ProtectedRoute>} />
          <Route path='/reservations' element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
          <Route path='/single-reservation' element={<ProtectedRoute><SingleReservation /></ProtectedRoute>} />
          <Route path='/visitor-reservations' element={<ProtectedRoute><VisitorsReservations /></ProtectedRoute>} />
          <Route path='/reservations-rent' element={<ProtectedRoute><ReservationsRent /></ProtectedRoute>} />
          <Route path='/invoices' element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path='/settings/employees' element={<ProtectedRoute><Employees /></ProtectedRoute>} />
          <Route path='/settings/sections' element={<ProtectedRoute><Sections /></ProtectedRoute>} />
          <Route path='/settings/pay-ways' element={<ProtectedRoute><PayWays /></ProtectedRoute>} />
          <Route path='/landing-control' element={<ProtectedRoute><LandingControl /></ProtectedRoute>} />
          <Route path='/occasions' element={<ProtectedRoute><Occasions /></ProtectedRoute>} />
          <Route path='/halls' element={<ProtectedRoute><Halls /></ProtectedRoute>} />
          <Route path='/services' element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path='/services/offers' element={<ProtectedRoute><Offers /></ProtectedRoute>} />
          <Route path='/services/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path='/services/units' element={<ProtectedRoute><Units /></ProtectedRoute>} />
          <Route path='/contact-messages' element={<ProtectedRoute><ContactMessages /></ProtectedRoute>} />
          <Route path='/messages-settings' element={<ProtectedRoute><MessagesSettings /></ProtectedRoute>} />
          <Route path='/sending-marketing-messages' element={<ProtectedRoute><SendingMarketingMessages /></ProtectedRoute>} />
          <Route path='/whatsapp-settings' element={<ProtectedRoute><WhatsappSettings /></ProtectedRoute>} />
          <Route path='/program-additions' element={<ProtectedRoute><ProgramAdditions /></ProtectedRoute>} />
          <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path='/clients' element={<ProtectedRoute><Clients /></ProtectedRoute>} />
          <Route path='/new-invoices' element={<ProtectedRoute><NewInvoices /></ProtectedRoute>} />
          <Route path='/photo-gallery' element={<ProtectedRoute><PhotoGallery /></ProtectedRoute>} />
          <Route path='/alerts' element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
          <Route path='/reports' element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path='/new-booking' element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path='/reservations-schedule' element={<ProtectedRoute><ReservationsSchedule /></ProtectedRoute>} />
          <Route path='/bond' element={<ProtectedRoute><Bond /></ProtectedRoute>} />
          <Route path='/invoice-rent' element={<ProtectedRoute><InvoiceRent /></ProtectedRoute>} />
          <Route path='/settings/privacy-policy' element={<ProtectedRoute><PrivacyPolicyContent /></ProtectedRoute>} />
          <Route path='/accounting' element={<ProtectedRoute><Accounting /></ProtectedRoute>} />
          <Route path='/account-settings' element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
          <Route path='/account-tree' element={<ProtectedRoute><AccountingTree /></ProtectedRoute>} />
          <Route path='/restrictions' element={<ProtectedRoute><Restrictions /></ProtectedRoute>} />
          <Route path='/account-statement' element={<ProtectedRoute><AccountStatement /></ProtectedRoute>} />
          <Route path='/trial-balance' element={<ProtectedRoute><TrialBalance /></ProtectedRoute>} />
          <Route path='/income-statement' element={<ProtectedRoute><IncomeStatement /></ProtectedRoute>} />
        </Routes>
      </Suspense>
      {!hideFooter && <Footer />}
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <BrowserRouter basename='/'>
      <AppContent />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
