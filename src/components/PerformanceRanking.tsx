import React, { useState } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Filter,
  Download,
  Medal,
  Star,
  AlertTriangle,
  CheckCircle,
  Calendar,
  MapPin
} from 'lucide-react';

interface UnitPerformance {
  id: string;
  name: string;
  vaccines: number;
  revenue: number;
  attendance: number;
  reactivated: number;
  nps: number;
  efficiency: number;
  location: string;
}

const PerformanceRanking: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [campaignType, setCampaignType] = useState('all');
  const [serviceLocation, setServiceLocation] = useState('all');

  const unitsData: UnitPerformance[] = [
    {
      id: '1',
      name: 'Unidade Centro',
      vaccines: 2840,
      revenue: 98500,
      attendance: 94,
      reactivated: 156,
      nps: 9.2,
      efficiency: 92,
      location: 'São Paulo - Centro'
    },
    {
      id: '2',
      name: 'Unidade Zona Sul',
      vaccines: 2650,
      revenue: 89200,
      attendance: 91,
      reactivated: 142,
      nps: 8.8,
      efficiency: 88,
      location: 'São Paulo - Zona Sul'
    },
    {
      id: '3',
      name: 'Unidade Norte',
      vaccines: 2420,
      revenue: 82100,
      attendance: 89,
      reactivated: 128,
      nps: 8.5,
      efficiency: 85,
      location: 'São Paulo - Zona Norte'
    },
    {
      id: '4',
      name: 'Unidade Oeste',
      vaccines: 2180,
      revenue: 75800,
      attendance: 87,
      reactivated: 115,
      nps: 8.1,
      efficiency: 82,
      location: 'São Paulo - Zona Oeste'
    },
    {
      id: '5',
      name: 'Unidade Leste',
      vaccines: 1950,
      revenue: 68400,
      attendance: 83,
      reactivated: 98,
      nps: 7.8,
      efficiency: 79,
      location: 'São Paulo - Zona Leste'
    },
    {
      id: '6',
      name: 'Unidade ABC',
      vaccines: 1820,
      revenue: 62300,
      attendance: 81,
      reactivated: 89,
      nps: 7.5,
      efficiency: 76,
      location: 'Santo André'
    },
    {
      id: '7',
      name: 'Unidade Guarulhos',
      vaccines: 1650,
      revenue: 58900,
      attendance: 78,
      reactivated: 82,
      nps: 7.2,
      efficiency: 73,
      location: 'Guarulhos'
    }
  ];

  const getRankingIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{position}</span>;
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEfficiencyBg = (efficiency: number) => {
    if (efficiency >= 90) return 'bg-green-50';
    if (efficiency >= 80) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  const getBadges = (unit: UnitPerformance, position: number) => {
    const badges = [];
    
    if (position <= 3) {
      badges.push({
        text: position === 1 ? 'Top 1' : `Top ${position}`,
        color: position === 1 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
      });
    }
    
    if (unit.efficiency >= 90) {
      badges.push({
        text: 'Alta Eficiência',
        color: 'bg-green-100 text-green-800'
      });
    }
    
    if (unit.nps >= 9.0) {
      badges.push({
        text: 'NPS Excelente',
        color: 'bg-purple-100 text-purple-800'
      });
    }
    
    if (unit.attendance >= 90) {
      badges.push({
        text: '100% Estoque Controlado',
        color: 'bg-indigo-100 text-indigo-800'
      });
    }
    
    return badges;
  };

  const averageEfficiency = unitsData.reduce((sum, unit) => sum + unit.efficiency, 0) / unitsData.length;

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ranking de Desempenho</h1>
              <p className="text-gray-600">Comparação de performance entre unidades da rede</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar CSV</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="quarter">Este Trimestre</option>
            </select>
            
            <select 
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as Campanhas</option>
              <option value="flu">Gripe</option>
              <option value="covid">COVID-19</option>
              <option value="child">Infantil</option>
              <option value="adult">Adulto</option>
            </select>
            
            <select 
              value={serviceLocation}
              onChange={(e) => setServiceLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Locais</option>
              <option value="clinic">Clínica</option>
              <option value="extramural">Extramuro</option>
            </select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Melhor Unidade</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{unitsData[0].name}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">{unitsData[0].efficiency}% de eficiência</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Média da Rede</p>
                <p className="text-xl font-bold text-gray-900 mt-2">{averageEfficiency.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Eficiência geral</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unidades Acima da Média</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {unitsData.filter(u => u.efficiency > averageEfficiency).length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">de {unitsData.length} unidades</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Necessitam Atenção</p>
                <p className="text-xl font-bold text-gray-900 mt-2">
                  {unitsData.filter(u => u.efficiency < 80).length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-sm text-orange-600 mt-2">Abaixo de 80%</p>
          </div>
        </div>

        {/* Ranking Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacinas Aplicadas</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Faturamento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxa Comparecimento</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clientes Reativados</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPS Médio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eficiência</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {unitsData.map((unit, index) => {
                  const position = index + 1;
                  const badges = getBadges(unit, position);
                  const isAboveAverage = unit.efficiency > averageEfficiency;
                  
                  return (
                    <tr 
                      key={unit.id} 
                      className={`hover:bg-gray-50 ${
                        !isAboveAverage ? 'bg-red-25' : ''
                      } ${getEfficiencyBg(unit.efficiency)}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          {getRankingIcon(position)}
                          <span className="font-bold text-gray-900">#{position}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{unit.name}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {unit.location}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {badges.map((badge, badgeIndex) => (
                              <span 
                                key={badgeIndex}
                                className={`px-2 py-1 text-xs font-medium rounded-full ${badge.color}`}
                              >
                                {badge.text}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {unit.vaccines.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          R$ {(unit.revenue / 1000).toFixed(0)}k
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{unit.attendance}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                          <div 
                            className={`h-1 rounded-full ${
                              unit.attendance >= 90 ? 'bg-green-500' :
                              unit.attendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${unit.attendance}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{unit.reactivated}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <Star className={`w-4 h-4 ${unit.nps >= 9 ? 'text-yellow-400' : 'text-gray-300'}`} />
                          <span className="text-sm font-medium text-gray-900">{unit.nps}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-bold ${getEfficiencyColor(unit.efficiency)}`}>
                          {unit.efficiency}%
                        </div>
                        {!isAboveAverage && (
                          <div className="text-xs text-red-600 flex items-center mt-1">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Abaixo da média
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceRanking;