import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Shield,
  Users,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Bot,
  Zap,
  Eye,
  Plus,
  Calendar,
  Activity,
  Download,
  Filter,
  Star,
  PieChart,
  TrendingDown,
  Clock,
  MapPin,
  Phone,
  Mail,
  Building
} from 'lucide-react';

interface FilterState {
  period: 'week' | 'month' | 'quarter' | 'custom';
  unit: string;
  serviceType: 'all' | 'clinic' | 'extramural' | 'home';
  campaign: string;
}

interface TopClient {
  id: string;
  name: string;
  unit: string;
  vaccinesCount: number;
  totalPaid: number;
  lastVisit: string;
}

const NetworkOverview: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    period: 'month',
    unit: 'all',
    serviceType: 'all',
    campaign: 'all'
  });

  const [showExportModal, setShowExportModal] = useState(false);

  // Dados mockados baseados nos filtros
  const mainStats = [
    {
      title: 'Vacinas Aplicadas',
      value: '12,847',
      change: '+18%',
      trend: 'up',
      icon: Shield,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Faturamento Total',
      value: 'R$ 486.2k',
      change: '+25%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Clientes Reativados',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: RefreshCw,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Estoque Crítico',
      value: '3 unidades',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      actionButton: 'Ver Unidades'
    },
    {
      title: 'Atendimento via IA',
      value: '78%',
      change: '+8%',
      trend: 'up',
      icon: Bot,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'NPS Médio',
      value: '8.7',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    }
  ];

  const vaccineDistribution = [
    { name: 'Gripe', value: 35, count: 4496, color: 'bg-blue-500' },
    { name: 'COVID-19', value: 28, count: 3597, color: 'bg-purple-500' },
    { name: 'HPV', value: 18, count: 2312, color: 'bg-pink-500' },
    { name: 'Hepatite B', value: 12, count: 1542, color: 'bg-green-500' },
    { name: 'Tétano', value: 7, count: 900, color: 'bg-orange-500' }
  ];

  const unitRevenue = [
    { unit: 'Centro', revenue: 98500, vaccines: 2840 },
    { unit: 'Zona Sul', revenue: 89200, vaccines: 2650 },
    { unit: 'Norte', revenue: 82100, vaccines: 2420 },
    { unit: 'Oeste', revenue: 75800, vaccines: 2180 },
    { unit: 'Leste', revenue: 68400, vaccines: 1950 },
    { unit: 'ABC', revenue: 62300, vaccines: 1820 }
  ];

  const dailyApplications = [
    { day: '20/01', applications: 420 },
    { day: '21/01', applications: 380 },
    { day: '22/01', applications: 450 },
    { day: '23/01', applications: 520 },
    { day: '24/01', applications: 480 },
    { day: '25/01', applications: 390 },
    { day: '26/01', applications: 610 },
    { day: '27/01', applications: 580 }
  ];

  const reactivationsByUnit = [
    { unit: 'Centro', reactivations: 156, campaign: 'Gripe' },
    { unit: 'Zona Sul', reactivations: 142, campaign: 'HPV' },
    { unit: 'Norte', reactivations: 128, campaign: 'COVID' },
    { unit: 'Oeste', reactivations: 115, campaign: 'Gripe' },
    { unit: 'Leste', reactivations: 98, campaign: 'Hepatite' }
  ];

  const topClients: TopClient[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      unit: 'Unidade Centro',
      vaccinesCount: 8,
      totalPaid: 640.00,
      lastVisit: '2025-01-25'
    },
    {
      id: '2',
      name: 'João Pedro Oliveira',
      unit: 'Unidade Zona Sul',
      vaccinesCount: 6,
      totalPaid: 1920.00,
      lastVisit: '2025-01-24'
    },
    {
      id: '3',
      name: 'Ana Costa Lima',
      unit: 'Unidade Norte',
      vaccinesCount: 5,
      totalPaid: 400.00,
      lastVisit: '2025-01-23'
    },
    {
      id: '4',
      name: 'Carlos Eduardo',
      unit: 'Unidade Centro',
      vaccinesCount: 4,
      totalPaid: 320.00,
      lastVisit: '2025-01-22'
    },
    {
      id: '5',
      name: 'Lucia Ferreira',
      unit: 'Unidade Oeste',
      vaccinesCount: 4,
      totalPaid: 280.00,
      lastVisit: '2025-01-21'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      title: 'Estoque Vencendo',
      description: 'Unidade Norte: 45 doses de Gripe vencem em 5 dias',
      action: 'Ver Estoque',
      icon: AlertTriangle,
      color: 'bg-yellow-50 border-yellow-200 text-yellow-800'
    },
    {
      type: 'error',
      title: 'Performance Baixa',
      description: 'Unidade Leste: Taxa de reativação abaixo de 15%',
      action: 'Analisar',
      icon: TrendingDown,
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      type: 'warning',
      title: 'Integração Inativa',
      description: 'WhatsApp desconectado na Unidade Oeste há 2 dias',
      action: 'Reconectar',
      icon: Phone,
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    }
  ];

  const maxRevenue = Math.max(...unitRevenue.map(u => u.revenue));
  const maxApplications = Math.max(...dailyApplications.map(d => d.applications));
  const maxReactivations = Math.max(...reactivationsByUnit.map(r => r.reactivations));

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Simular exportação
    console.log(`Exportando dados em formato ${format.toUpperCase()}`);
    setShowExportModal(false);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Análise Geral da Rede</h1>
              <p className="text-gray-600">Panorama completo do desempenho de todas as unidades</p>
            </div>
          </div>

          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Dados</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
              <select 
                value={filters.period}
                onChange={(e) => handleFilterChange('period', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mês</option>
                <option value="quarter">Este Trimestre</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unidade</label>
              <select 
                value={filters.unit}
                onChange={(e) => handleFilterChange('unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas as Unidades</option>
                <option value="centro">Unidade Centro</option>
                <option value="zona-sul">Unidade Zona Sul</option>
                <option value="norte">Unidade Norte</option>
                <option value="oeste">Unidade Oeste</option>
                <option value="leste">Unidade Leste</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Atendimento</label>
              <select 
                value={filters.serviceType}
                onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os Tipos</option>
                <option value="clinic">Clínica</option>
                <option value="extramural">Extramuro</option>
                <option value="home">Domicílio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Campanha</label>
              <select 
                value={filters.campaign}
                onChange={(e) => handleFilterChange('campaign', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todas as Campanhas</option>
                <option value="gripe">Gripe</option>
                <option value="covid">COVID-19</option>
                <option value="hpv">HPV</option>
                <option value="hepatite">Hepatite B</option>
                <option value="tetano">Tétano</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards de Indicadores */}
        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
            {mainStats.map((stat, index) => (
              <div key={index} className={`${stat.bgColor} rounded-xl border border-gray-200 p-6 min-w-64 shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center shadow-md`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold ${stat.textColor} mb-2`}>{stat.value}</p>
                  {stat.actionButton && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      {stat.actionButton} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráficos Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribuição de Vacinas (Pie Chart) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-blue-500" />
              Distribuição por Tipo de Vacina
            </h3>
            <div className="space-y-4">
              {vaccineDistribution.map((vaccine, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${vaccine.color} rounded-full`} />
                    <span className="text-sm font-medium text-gray-900">{vaccine.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 ${vaccine.color} rounded-full transition-all duration-500`}
                        style={{ width: `${vaccine.value}%` }}
                      />
                    </div>
                    <div className="text-right min-w-16">
                      <div className="text-sm font-medium text-gray-900">{vaccine.value}%</div>
                      <div className="text-xs text-gray-500">{vaccine.count.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Faturamento por Unidade */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
              Faturamento por Unidade
            </h3>
            <div className="space-y-4">
              {unitRevenue.map((unit, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Unidade {unit.unit}</span>
                    <span className="text-sm font-bold text-gray-900">R$ {(unit.revenue / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 relative"
                      style={{ width: `${(unit.revenue / maxRevenue) * 100}%` }}
                    >
                      <div className="absolute -top-6 right-0 text-xs text-gray-600">
                        {unit.vaccines} vacinas
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evolução Temporal */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-purple-500" />
              Aplicações ao Longo do Tempo
            </h3>
            <div className="space-y-4">
              {dailyApplications.map((data, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 w-12">{data.day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.applications / maxApplications) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {data.applications}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reativações por Unidade */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <RefreshCw className="w-5 h-5 mr-2 text-orange-500" />
              Reativações por Unidade
            </h3>
            <div className="space-y-4">
              {reactivationsByUnit.map((unit, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">Unidade {unit.unit}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {unit.campaign}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{unit.reactivations}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(unit.reactivations / maxReactivations) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabela de Principais Clientes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-500" />
              Principais Clientes do Período
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacinas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Pago</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Atendimento</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topClients.map((client, index) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Building className="w-4 h-4 mr-1 text-gray-400" />
                        {client.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.vaccinesCount} vacinas</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">R$ {client.totalPaid.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alertas Importantes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
            Alertas Importantes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border ${alert.color}`}>
                <div className="flex items-start space-x-3">
                  <alert.icon className="w-5 h-5 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{alert.title}</h4>
                    <p className="text-sm mb-3">{alert.description}</p>
                    <button className="text-sm font-medium hover:underline">
                      {alert.action} →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-blue-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group">
              <Plus className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Criar Nova Campanha</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-orange-300 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all group">
              <Eye className="w-8 h-8 text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Ver Unidades em Atenção</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-6 border-2 border-dashed border-green-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all group">
              <DollarSign className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-gray-900">Acessar Painel Financeiro</span>
            </button>
          </div>
        </div>

        {/* Modal de Exportação */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Exportar Dados</h3>
              <p className="text-gray-600 mb-6">Escolha o formato para exportar os dados da análise:</p>
              
              <div className="space-y-3">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar como CSV</span>
                </button>
                
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar como PDF</span>
                </button>
              </div>
              
              <button
                onClick={() => setShowExportModal(false)}
                className="w-full mt-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkOverview;