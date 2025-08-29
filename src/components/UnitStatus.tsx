import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Clock,
  Wifi,
  WifiOff,
  Bot,
  Package,
  Activity,
  RefreshCw,
  Settings,
  Power,
  Key,
  Eye,
  Search,
  Filter
} from 'lucide-react';

interface Unit {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  whatsappConnected: boolean;
  aiResponding: boolean;
  stockStatus: 'ok' | 'low' | 'critical';
  lastActivity: string;
  location: string;
  responsiblePerson: string;
  phone: string;
  integrationIssues: string[];
  paymentStatus: 'ok' | 'pending' | 'overdue';
}

const UnitStatus: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterIntegration, setFilterIntegration] = useState('all');

  const unitsData: Unit[] = [
    {
      id: '1',
      name: 'Unidade Centro',
      status: 'active',
      whatsappConnected: true,
      aiResponding: true,
      stockStatus: 'ok',
      lastActivity: '2025-01-27 14:30',
      location: 'São Paulo - Centro',
      responsiblePerson: 'Dr. João Silva',
      phone: '+55 11 99999-0001',
      integrationIssues: [],
      paymentStatus: 'ok'
    },
    {
      id: '2',
      name: 'Unidade Zona Sul',
      status: 'active',
      whatsappConnected: true,
      aiResponding: false,
      stockStatus: 'low',
      lastActivity: '2025-01-27 12:15',
      location: 'São Paulo - Zona Sul',
      responsiblePerson: 'Dra. Maria Santos',
      phone: '+55 11 99999-0002',
      integrationIssues: ['IA não está respondendo há 2 horas'],
      paymentStatus: 'ok'
    },
    {
      id: '3',
      name: 'Unidade Norte',
      status: 'active',
      whatsappConnected: false,
      aiResponding: false,
      stockStatus: 'critical',
      lastActivity: '2025-01-26 18:45',
      location: 'São Paulo - Zona Norte',
      responsiblePerson: 'Dr. Carlos Oliveira',
      phone: '+55 11 99999-0003',
      integrationIssues: ['WhatsApp desconectado há 18 horas', 'Estoque crítico: 5 vacinas restantes'],
      paymentStatus: 'pending'
    },
    {
      id: '4',
      name: 'Unidade Oeste',
      status: 'inactive',
      whatsappConnected: false,
      aiResponding: false,
      stockStatus: 'ok',
      lastActivity: '2025-01-25 09:20',
      location: 'São Paulo - Zona Oeste',
      responsiblePerson: 'Dra. Ana Costa',
      phone: '+55 11 99999-0004',
      integrationIssues: ['Unidade temporariamente inativa'],
      paymentStatus: 'overdue'
    },
    {
      id: '5',
      name: 'Unidade Leste',
      status: 'pending',
      whatsappConnected: false,
      aiResponding: false,
      stockStatus: 'ok',
      lastActivity: '2025-01-27 08:00',
      location: 'São Paulo - Zona Leste',
      responsiblePerson: 'Dr. Roberto Lima',
      phone: '+55 11 99999-0005',
      integrationIssues: ['Aguardando configuração inicial'],
      paymentStatus: 'ok'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'inactive': return 'Inativa';
      case 'pending': return 'Integração Pendente';
      default: return status;
    }
  };

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-600';
      case 'low': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStockStatusLabel = (status: string) => {
    switch (status) {
      case 'ok': return 'Em dia';
      case 'low': return 'Baixo';
      case 'critical': return 'Crítico';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'ok': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const filteredUnits = unitsData.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || unit.status === filterStatus;
    const matchesIntegration = filterIntegration === 'all' || 
                              (filterIntegration === 'whatsapp' && !unit.whatsappConnected) ||
                              (filterIntegration === 'ai' && !unit.aiResponding) ||
                              (filterIntegration === 'payment' && unit.paymentStatus !== 'ok');
    
    return matchesSearch && matchesStatus && matchesIntegration;
  });

  const activeUnits = unitsData.filter(u => u.status === 'active').length;
  const integrationIssues = unitsData.filter(u => u.integrationIssues.length > 0).length;
  const paymentIssues = unitsData.filter(u => u.paymentStatus !== 'ok').length;
  const noActivity = unitsData.filter(u => {
    const lastActivity = new Date(u.lastActivity);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return lastActivity < threeDaysAgo;
  }).length;

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Status das Unidades</h1>
              <p className="text-gray-600">Monitoramento operacional em tempo real</p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unidades Ativas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeUnits}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">de {unitsData.length} unidades</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Problemas de Integração</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{integrationIssues}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-sm text-orange-600 mt-2">Requerem atenção</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendências de Pagamento</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{paymentIssues}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-sm text-red-600 mt-2">Verificar urgente</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sem Atividade</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{noActivity}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Últimos 3 dias</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por unidade, localização ou responsável..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativa</option>
              <option value="inactive">Inativa</option>
              <option value="pending">Pendente</option>
            </select>
            
            <select 
              value={filterIntegration}
              onChange={(e) => setFilterIntegration(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as integrações</option>
              <option value="whatsapp">Problemas WhatsApp</option>
              <option value="ai">IA não respondendo</option>
              <option value="payment">Pendências pagamento</option>
            </select>
          </div>
        </div>

        {/* Units Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WhatsApp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IA</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atividade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{unit.name}</div>
                        <div className="text-sm text-gray-500">{unit.location}</div>
                        <div className="text-xs text-gray-400">{unit.responsiblePerson}</div>
                        {unit.integrationIssues.length > 0 && (
                          <div className="mt-2">
                            {unit.integrationIssues.map((issue, index) => (
                              <div key={index} className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded mb-1">
                                {issue}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(unit.status)}
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(unit.status)}`}>
                          {getStatusLabel(unit.status)}
                        </span>
                      </div>
                      <div className={`text-xs mt-1 ${getPaymentStatusColor(unit.paymentStatus)}`}>
                        Pagamento: {unit.paymentStatus === 'ok' ? 'Em dia' : 
                                   unit.paymentStatus === 'pending' ? 'Pendente' : 'Vencido'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {unit.whatsappConnected ? (
                          <Wifi className="w-4 h-4 text-green-500" />
                        ) : (
                          <WifiOff className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${unit.whatsappConnected ? 'text-green-600' : 'text-red-600'}`}>
                          {unit.whatsappConnected ? 'Conectado' : 'Desconectado'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Bot className={`w-4 h-4 ${unit.aiResponding ? 'text-green-500' : 'text-red-500'}`} />
                        <span className={`text-sm ${unit.aiResponding ? 'text-green-600' : 'text-red-600'}`}>
                          {unit.aiResponding ? 'Respondendo' : 'Inativa'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Package className={`w-4 h-4 ${getStockStatusColor(unit.stockStatus)}`} />
                        <span className={`text-sm ${getStockStatusColor(unit.stockStatus)}`}>
                          {getStockStatusLabel(unit.stockStatus)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(unit.lastActivity).toLocaleString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 p-1" 
                          title="Ver Detalhes"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-900 p-1" 
                          title="Reativar Unidade"
                          disabled={unit.status === 'active'}
                        >
                          <Power className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-purple-600 hover:text-purple-900 p-1" 
                          title="Editar Permissões"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-orange-600 hover:text-orange-900 p-1" 
                          title="Resetar Token"
                        >
                          <Key className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 p-1" 
                          title="Desconectar Canal"
                        >
                          <WifiOff className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUnits.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma unidade encontrada</h3>
              <p className="text-gray-500">Ajuste os filtros para ver mais resultados</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
              <RefreshCw className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-900">Reativar Todas</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Wifi className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-900">Reconectar WhatsApp</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
              <Settings className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-gray-900">Configurações Globais</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
              <Key className="w-6 h-6 text-orange-600" />
              <span className="font-medium text-gray-900">Resetar Tokens</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitStatus;