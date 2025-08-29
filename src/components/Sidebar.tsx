import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Settings, 
  BarChart3,
  MessageCircle,
  Menu,
  X,
  Sparkles,
  Stethoscope,
  RefreshCw,
  TrendingUp,
  UserCheck,
  Shield,
  Package,
  DollarSign,
  Zap,
  Calendar,
  CreditCard,
  Building,
  Home,
  Plus,
  CheckCircle,
  MapPin,
  ShoppingCart,
  Send,
  Store,
  FileText
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuSections = [
    {
      title: 'Atendimento',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'inbox', label: 'Caixa de Entrada', icon: MessageSquare },
        { id: 'contacts', label: 'Contatos', icon: Users },
        { id: 'whatsapp-campaigns', label: 'Campanhas WhatsApp', icon: MessageCircle },
        { id: 'analytics', label: 'Relatórios', icon: BarChart3 }
      ]
    },
    {
      title: 'Ferramentas com IA',
      items: [
        { id: 'clinical', label: 'Suporte Clínico', icon: Stethoscope },
        { id: 'reactivation', label: 'Resgate Vacinal', icon: RefreshCw },
      ]
    },
    {
      title: 'Marketing',
      items: [
        { id: 'marketing', label: 'Criar Campanha', icon: Sparkles },
        { id: 'ads', label: 'Gerenciar Anúncios', icon: Zap }
      ]
    },
    {
      title: 'Loja Online',
      items: [
        { id: 'online-store', label: 'Loja Virtual', icon: ShoppingCart }
      ]
    },
    {
      title: 'Gestão Clínica',
      items: [
        { id: 'statistics', label: 'Estatísticas', icon: TrendingUp },
        { id: 'clients', label: 'Clientes', icon: Users },
        { id: 'staff', label: 'Colaboradores', icon: UserCheck },
        { id: 'vaccination', label: 'Sala de Vacinas', icon: Shield },
        { id: 'vaccine-history', label: 'Histórico Vacinal', icon: FileText },
        { id: 'rnds-sipni', label: 'Envio RNDS/SI-PNI', icon: Send },
        { id: 'schedule', label: 'Agenda', icon: Calendar },
        { id: 'inventory', label: 'Estoque', icon: Package },
        { id: 'purchase-order', label: 'Ordem de Compra', icon: ShoppingCart },
      ]
    },
    {
      title: 'Atendimento Extramuro',
      items: [
        { id: 'in-company', label: 'In Company', icon: Building },
        { id: 'home-care', label: 'Domiciliar', icon: Home }
      ]
    },
    {
      title: 'Gestão Multiclínicas',
      items: [
        { id: 'network-overview', label: 'Análise Geral', icon: BarChart3 },
        { id: 'performance-ranking', label: 'Ranking de Desempenho', icon: TrendingUp },
        { id: 'add-unit', label: 'Cadastrar Nova Unidade', icon: Plus },
        { id: 'unit-status', label: 'Status', icon: CheckCircle },
        { id: 'units-map', label: 'Mapa das Unidades', icon: MapPin },
        { id: 'manage-access', label: 'Gerencia Acesso', icon: Settings },
        { id: 'internal-communication', label: 'Comunicado Interno', icon: MessageCircle }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex items-center">
              <Zap className="w-8 h-8 mr-3" />
              <div>
                <h1 className="text-xl font-bold">ZYVIA</h1>
                <p className="text-xs text-purple-100">Vacinação Inteligente</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-3 px-3">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`
                        w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-colors text-sm
                        ${activeTab === item.id 
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Settings */}
          <div className="px-4 pb-4 bg-gray-50 rounded-lg mx-2">
            <button
              onClick={() => {
                setActiveTab('settings');
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-colors text-sm
                ${activeTab === 'settings' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Settings className="w-4 h-4 mr-3" />
              Configurações
            </button>
            
            <button
              onClick={() => {
                setActiveTab('plan');
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center px-3 py-2.5 text-left rounded-lg transition-colors text-sm mt-1
                ${activeTab === 'plan' 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <CreditCard className="w-4 h-4 mr-3" />
              Meu Plano
            </button>
          </div>

          {/* User Profile */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">JS</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">João Silva</p>
                <p className="text-xs text-gray-500">Atendente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;