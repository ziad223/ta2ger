import React, { useState } from "react";
import Container from "../../components/shared/Container";
import { FaImages, FaConciergeBell, FaUsers, FaFileContract } from "react-icons/fa";
import { MdEvent, MdStarRate, MdGavel } from "react-icons/md";
import SliderTab from "./tabs/sliderTab/SliderTab";
import ServicesTab from "./tabs/servicesTab/ServicesTab";
import ClientsTab from "./tabs/clientsTab/ClientsTab";
import EventsTab from "./tabs/eventsTab/EventsTab";
import ContractsTab from "./tabs/contractsTab/ContractsTab";
import BookingIterms from "./tabs/BookingIterms";


const LandingControl = () => {
  const [activeTab, setActiveTab] = useState("slider");

  const tabs = [
    { key: "slider", label: "السلايدر", icon: <FaImages /> },
    { key: "services", label: "الخدمات", icon: <FaConciergeBell /> },
    { key: "clients", label: "آراء العملاء", icon: <FaUsers /> },
    { key: "rules", label: "شروط الحجز للزائر", icon: <MdGavel /> },
    { key: "events", label: "مناسبات القاعة", icon: <MdEvent /> },
    { key: "contracts", label: "العقود", icon: <FaFileContract /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "slider": return <SliderTab />;
      case "services": return <ServicesTab />;
      case "clients": return <ClientsTab />;
      case "rules": return <BookingIterms />;
      case "events": return <EventsTab />;
      case "contracts": return <ContractsTab />;
      default: return null;
    }
  };

  return (
    <Container>
      <div className="min-h-screen mt-20">
        <div className="bg-white rounded-lg shadow-md">
          <div className="h-[50px] bg-blue-600 rounded-tr-lg rounded-tl-lg flex items-center text-xl text-white px-5">
            إدارة الصفحة الرئيسية
          </div>

          <div className="flex flex-wrap gap-3 px-5 py-3 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5">{renderTabContent()}</div>
        </div>
      </div>
    </Container>
  );
};

export default LandingControl;
