import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  CreditCard,
  Banknote,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Package,
  Building,
  UserCheck,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const Statistics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('vaccinations');

  const vaccinationData = [
    { month: 'Jan', vaccinations: 245, patients: 180, revenue: 19600 },
    { month: 'Fev', vaccinations: 320, patients: 220, revenue: 25600 },
    { month: 'Mar', vaccinations: 280, patients: 195, revenue: 22400 },
    { month: 'Abr', vaccinations: 410, patients: 285, revenue: 32800 },
    { month: 'Mai', vaccinations: 380, patients: 260, revenue: 30400 },
    { month: 'Jun', vaccinations: 450, patients: 310, revenue: 36000 }
  ];

  const revenueByVaccine = [
    { name: 'Gripe', revenue: 28500, percentage: 35, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { name: 'HPV', revenue: 24000, percentage: 30, color: 'bg-purple-500', textColor: 'text-purple-600' },
    { name: 'Hepatite B', revenue: 16000, percentage: 20, color: 'bg-green-500', textColor: 'text-green-600' },
    { name: 'COVID-19', revenue: 8000, percentage: 10, color: 'bg-orange-500', textColor: 'text-orange-600' },
    { name: 'Outras', revenue: 4000, percentage: 5, color: 'bg-gray-500', textColor: 'text-gray-600' }
  ];

  const paymentMethods = [
    { method: 'PIX', amount: 32500, percentage: 40, color: 'bg-purple-500', icon: '💳' },
    { method: 'Cartão', amount: 24375, percentage: 30, color: 'bg-blue-500', icon: '💳' },
    { method: 'Dinheiro', amount: 16250, percentage: 20, color: 'bg-green-500', icon: '💵' },
    { method: 'Convênio', amount: 8125, percentage: 10, color: 'bg-orange-500', icon: '🏥' }
  ];

  const ageGroupRevenue = [
    { group: '0-17 anos', revenue: 18200, percentage: 22, count: 156, avgTicket: 116.67 },
    { group: '18-59 anos', revenue: 42900, percentage: 53, count: 234, avgTicket: 183.33 },
    { group: '60+ anos', revenue: 20150, percentage: 25, count: 130, avgTicket: 155.00 }
  ];

  const monthlyFinancials = [
    { month: 'Jan', revenue: 19600, costs: 8820, profit: 10780, margin: 55 },
    { month: 'Fev', revenue: 25600, costs: 11520, profit: 14080, margin: 55 },
    { month: 'Mar', revenue: 22400, costs: 10080, profit: 12320, margin: 55 },
    { month: 'Abr', revenue: 32800, costs: 14760, profit: 18040, margin: 55 },
    { month: 'Mai', revenue: 30400, costs: 13680, profit: 16720, margin: 55 },
    { month: 'Jun', revenue: 36000, costs: 16200, profit: 19800, margin: 55 }
  ];

  const performanceMetrics = [
    { label: 'Taxa de Cobertura', value: '87%', trend: '+5%', color: 'text-green-600' },
    { label: 'Tempo Médio de Atendimento', value: '12min', trend: '-2min', color: 'text-green-600' },
    { label: 'Satisfação do Cliente', value: '4.8/5', trend: '+0.2', color: 'text-green-600' },
    { label: 'Taxa de Reação Adversa', value: '0.3%', trend: '-0.1%', color: 'text-green-600' },
    { label: 'Ticket Médio', value: 'R$ 162', trend: '+R$ 18', color: 'text-green-600' },
    { label: 'Taxa de Conversão', value: '78%', trend: '+8%', color: 'text-green-600' }
  ];

  const topVaccines = [
    { name: 'Gripe (Influenza)', applications: 450, revenue: 28500, avgPrice: 63.33 },
    { name: 'HPV', applications: 75, revenue: 24000, avgPrice: 320.00 },
    { name: 'Hepatite B', applications: 160, revenue: 16000, avgPrice: 100.00 },
    { name: 'COVID-19', applications: 200, revenue: 8000, avgPrice: 40.00 },
    { name: 'Tétano', applications: 80, revenue: 4000, avgPrice: 50.00 }
  ];

  const maxVaccinations = Math.max(...vaccinationData.map(d => d.vaccinations));
  const maxRevenue = Math.max(...vaccinationData.map(d => d.revenue));
  const totalRevenue = revenueByVaccine.reduce((sum, item) => sum + item.revenue, 0);
  const totalPayments = paymentMethods.reduce((sum, method) => sum + method.amount, 0);

  // Função para criar gráfico de pizza circular
  const createPieChart = (data: any[], size: number = 200) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="20"
          />
          {data.map((item, index) => {
            const strokeDasharray = `${item.percentage * 2.51} 251`;
            const strokeDashoffset = -cumulativePercentage * 2.51;
            cumulativePercentage += item.percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={(size - 20) / 2}
                fill="none"
                stroke={item.color?.replace('bg-', '#') || '#3b82f6'}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              R$ {(totalRevenue / 1000).toFixed(0)}k
            </div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Estatísticas</h1>
              <p className="text-gray-600">Análise de desempenho e indicadores financeiros</p>
            </div>
          </div>

          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Última semana</option>
            <option value="month">Último mês</option>
            <option value="quarter">Último trimestre</option>
            <option value="year">Último ano</option>
          </select>
        </div>

        {/* Key Financial Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faturamento Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">R$ {(totalRevenue / 1000).toFixed(0)}k</p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+25%</span>
              <span className="text-sm text-gray-500 ml-1">vs. período anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">R$ 162</p>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+R$ 18</span>
              <span className="text-sm text-gray-500 ml-1">aumento médio</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Vacinas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2,085</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+18%</span>
              <span className="text-sm text-gray-500 ml-1">vs. período anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Margem de Lucro</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">55%</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+3%</span>
              <span className="text-sm text-gray-500 ml-1">melhoria</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue by Vaccine - Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-blue-500" />
              Faturamento por Vacina
            </h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg width="200" height="200" className="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="20"
                  />
                  {revenueByVaccine.map((item, index) => {
                    const circumference = 2 * Math.PI * 80;
                    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -revenueByVaccine.slice(0, index).reduce((sum, prev) => sum + (prev.percentage / 100) * circumference, 0);
                    
                    const colors = {
                      'bg-blue-500': '#3b82f6',
                      'bg-purple-500': '#8b5cf6',
                      'bg-green-500': '#10b981',
                      'bg-orange-500': '#f59e0b',
                      'bg-gray-500': '#6b7280'
                    };
                    
                    return (
                      <circle
                        key={index}
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke={colors[item.color as keyof typeof colors]}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 hover:stroke-width-[25]"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      R$ {(totalRevenue / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {revenueByVaccine.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${item.color} rounded-full`} />
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">R$ {(item.revenue / 1000).toFixed(1)}k</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods - Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-500" />
              Métodos de Pagamento
            </h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg width="200" height="200" className="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="20"
                  />
                  {paymentMethods.map((method, index) => {
                    const circumference = 2 * Math.PI * 80;
                    const strokeDasharray = `${(method.percentage / 100) * circumference} ${circumference}`;
                    const strokeDashoffset = -paymentMethods.slice(0, index).reduce((sum, prev) => sum + (prev.percentage / 100) * circumference, 0);
                    
                    const colors = {
                      'bg-purple-500': '#8b5cf6',
                      'bg-blue-500': '#3b82f6',
                      'bg-green-500': '#10b981',
                      'bg-orange-500': '#f59e0b'
                    };
                    
                    return (
                      <circle
                        key={index}
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke={colors[method.color as keyof typeof colors]}
                        strokeWidth="20"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 hover:stroke-width-[25]"
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      R$ {(totalPayments / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-500">Recebido</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 ${method.color} rounded-full`} />
                    <span className="text-sm font-medium text-gray-900">{method.icon} {method.method}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">R$ {(method.amount / 1000).toFixed(1)}k</div>
                    <div className="text-xs text-gray-500">{method.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Revenue Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-green-500" />
                Evolução Financeira
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedMetric === 'revenue' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Receita
                </button>
                <button
                  onClick={() => setSelectedMetric('profit')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedMetric === 'profit' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Lucro
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {monthlyFinancials.map((data, index) => {
                const value = selectedMetric === 'revenue' ? data.revenue : data.profit;
                const maxValue = selectedMetric === 'revenue' ? maxRevenue : Math.max(...monthlyFinancials.map(d => d.profit));
                
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 w-8">{data.month}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          selectedMetric === 'revenue' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(value / maxValue) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                      R$ {(value / 1000).toFixed(1)}k
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Age Group Revenue Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-orange-500" />
              Faturamento por Faixa Etária
            </h3>
            <div className="space-y-6">
              {ageGroupRevenue.map((group, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{group.group}</span>
                    <span className="text-xl font-bold text-gray-900">R$ {(group.revenue / 1000).toFixed(1)}k</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Pacientes:</span>
                      <span className="font-medium text-gray-900 ml-1">{group.count}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ticket:</span>
                      <span className="font-medium text-gray-900 ml-1">R$ {group.avgTicket.toFixed(0)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Participação:</span>
                      <span className="font-medium text-gray-900 ml-1">{group.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Vaccines */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-500" />
            Top 5 Vacinas por Faturamento
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aplicações</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faturamento</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço Médio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topVaccines.map((vaccine, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-amber-600' :
                          'bg-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{vaccine.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vaccine.applications}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-green-600">R$ {(vaccine.revenue / 1000).toFixed(1)}k</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">R$ {vaccine.avgPrice.toFixed(2)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(vaccine.revenue / Math.max(...topVaccines.map(v => v.revenue))) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Metrics Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Target className="w-5 h-5 mr-2 text-purple-500" />
            Indicadores de Performance (KPIs)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{metric.label}</h4>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${metric.color}`}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span className="font-medium">{metric.trend}</span>
                  </div>
                  <span className="text-sm text-gray-500">vs. anterior</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Receita Mensal</p>
                <p className="text-3xl font-bold mt-2">R$ 36.0k</p>
                <p className="text-green-100 text-sm mt-1">450 vacinações</p>
              </div>
              <ArrowUpRight className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Custos Operacionais</p>
                <p className="text-3xl font-bold mt-2">R$ 16.2k</p>
                <p className="text-blue-100 text-sm mt-1">45% da receita</p>
              </div>
              <ArrowDownLeft className="w-8 h-8 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Lucro Líquido</p>
                <p className="text-3xl font-bold mt-2">R$ 19.8k</p>
                <p className="text-purple-100 text-sm mt-1">55% margem</p>
              </div>
              <Award className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Alerts and Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Alertas e Recomendações Financeiras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium text-green-900">Meta Superada</span>
              </div>
              <p className="text-sm text-green-700">
                Faturamento mensal superou a meta em 25%. Excelente performance!
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-medium text-blue-900">Oportunidade</span>
              </div>
              <p className="text-sm text-blue-700">
                HPV tem maior ticket médio (R$ 320). Considere campanhas focadas.
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-medium text-yellow-900">Atenção</span>
              </div>
              <p className="text-sm text-yellow-700">
                20% dos pagamentos ainda são em dinheiro. Incentive métodos digitais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;