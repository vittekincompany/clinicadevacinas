import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inbox from './components/Inbox';
import ContactList from './components/ContactList';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import MarketingAI from './components/MarketingAI';
import ClinicalSupport from './components/ClinicalSupport';
import ClientReactivation from './components/ClientReactivation';
import Statistics from './components/Statistics';
import Clients from './components/Clients';
import Staff from './components/Staff';
import Vaccination from './components/Vaccination';
import Inventory from './components/Inventory';
import Financial from './components/Financial';
import AdsManager from './components/AdsManager';
import Schedule from './components/Schedule';
import MyPlan from './components/MyPlan';
import InCompany from './components/InCompany';
import HomeCare from './components/HomeCare';
import NetworkOverview from './components/NetworkOverview';
import PerformanceRanking from './components/PerformanceRanking';
import AddUnit from './components/AddUnit';
import UnitStatus from './components/UnitStatus';
import UnitsMap from './components/UnitsMap';
import ManageAccess from './components/ManageAccess';
import InternalCommunication from './components/InternalCommunication';
import PurchaseOrder from './components/PurchaseOrder';
import WhatsAppCampaigns from './components/WhatsAppCampaigns';
import OnlineStore from './components/OnlineStore';
import VaccineHistory from './components/VaccineHistory';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inbox':
        return <Inbox />;
      case 'contacts':
        return <ContactList />;
      case 'marketing':
        return <MarketingAI />;
      case 'clinical':
        return <ClinicalSupport />;
      case 'reactivation':
        return <ClientReactivation />;
      case 'ads':
        return <AdsManager />;
      case 'analytics':
        return <Analytics />;
      case 'statistics':
        return <Statistics />;
      case 'clients':
        return <Clients />;
      case 'staff':
        return <Staff />;
      case 'vaccination':
        return <Vaccination />;
      case 'vaccine-history':
        return <VaccineHistory />;
      case 'schedule':
        return <Schedule />;
      case 'inventory':
        return <Inventory />;
      case 'financial':
        return <Financial />;
      case 'settings':
        return <Settings />;
      case 'plan':
        return <MyPlan />;
      case 'in-company':
        return <InCompany />;
      case 'home-care':
        return <HomeCare />;
      case 'network-overview':
        return <NetworkOverview />;
      case 'performance-ranking':
        return <PerformanceRanking />;
      case 'add-unit':
        return <AddUnit />;
      case 'unit-status':
        return <UnitStatus />;
      case 'units-map':
        return <UnitsMap />;
      case 'manage-access':
        return <ManageAccess />;
      case 'internal-communication':
        return <InternalCommunication />;
      case 'purchase-order':
        return <PurchaseOrder />;
      case 'whatsapp-campaigns':
        return <WhatsAppCampaigns />;
      case 'rnds-sipni':
        return <RndsSipni />;
      case 'online-store':
        return <OnlineStore />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;