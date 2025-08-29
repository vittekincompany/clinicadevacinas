import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Filter,
  Download,
  Eye,
  Phone,
  Mail,
  Navigation,
  Building,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface Unit {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  coordinates: { lat: number; lng: number };
  status: 'active' | 'inactive' | 'at_risk';
  type: 'fixed' | 'mobile';
  responsiblePerson: string;
  phone: string;
  email: string;
  lastActivity: string;
  patientsCount: number;
  vaccinesApplied: number;
}

const UnitsMap: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const unitsData: Unit[] = [
    {
      id: '1',
      name: 'Unidade Centro',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      coordinates: { lat: -23.5505, lng: -46.6333 },
      status: 'active',
      type: 'fixed',
      responsiblePerson: 'Dr. João Silva',
      phone: '+55 11 99999-0001',
      email: 'centro@clinica.com',
      lastActivity: '2025-01-27 14:30',
      patientsCount: 1250,
      vaccinesApplied: 2840
    },
    {
      id: '2',
      name: 'Unidade Zona Sul',
      address: 'Rua Vergueiro, 500',
      city: 'São Paulo',
      state: 'SP',
      coordinates: { lat: -23.5629, lng: -46.6395 },
      status: 'active',
      type: 'fixed',
      responsiblePerson: 'Dra. Maria Santos',
      phone: '+55 11 99999-0002',
      email: 'zonasul@clinica.com',
      lastActivity: '2025-01-27 12:15',
      patientsCount: 980,
      vaccinesApplied: 2650
    },
    {
      id: '3',
      name: 'Unidade Norte',
      address: 'Av. Cruzeiro do Sul, 200',
      city: 'São Paulo',
      state: 'SP',
      coordinates: { lat: -23.5200, lng: -46.6094 },
      status: 'at_risk',
      type: 'fixed',
      responsiblePerson: 'Dr. Carlos Oliveira',
      phone: '+55 11 99999-0003',
      email: 'norte@clinica.com',
      lastActivity: '2025-01-26 18:45',
      patientsCount: 750,
      vaccinesApplied: 2420
    },
    {
      id: '4',
      name: 'Unidade Móvel 01',
      address: 'Região Oeste',
      city: 'São Paulo',
      state: 'SP',
      coordinates: { lat: -23.5489, lng: -46.7208 },
      status: 'active',
      type: 'mobile',
      responsiblePerson: 'Enf. Ana Costa',
      phone: '+55 11 99999-0004',
      email: 'movel01@clinica.com',
      lastActivity: '2025-01-27 10:20',
      patientsCount: 320,
      vaccinesApplied: 890
    },
    {
      id: '5',
      name: 'Unidade ABC',
      address: 'Rua Industrial, 100',
      city: 'Santo André',
      state: 'SP',
      coordinates: { lat: -23.6821, lng: -46.5820 },
      status: 'inactive',
      type: 'fixed',
      responsiblePerson: 'Dr. Roberto Lima',
      phone: '+55 11 99999-0005',
      email: 'abc@clinica.com',
      lastActivity: '2025-01-25 16:30',
      patientsCount: 450,
      vaccinesApplied: 1200
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'inactive': return 'text-red-600';
      case 'at_risk': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'at_risk': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'inactive': return 'Inativa';
      case 'at_risk': return 'Em Risco';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'fixed': return 'Fixa';
      case 'mobile': return 'Móvel';
      default: return type;
    }
  };

  const filteredUnits = unitsData.filter(unit => {
    const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         unit.responsiblePerson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || unit.status === filterStatus;
    const matchesType = filterType === 'all' || unit.type === filterType;
    const matchesLocation = filterLocation === 'all' || unit.state === filterLocation;
    
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  const states = [...new Set(unitsData.map(unit => unit.state))];

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mapa das Unidades</h1>
              <p className="text-gray-600">Visualização geográfica da rede de clínicas</p>
            </div>
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar Mapa PDF</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por unidade, cidade ou responsável..."
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
              <option value="at_risk">Em Risco</option>
            </select>
            
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os tipos</option>
              <option value="fixed">Fixa</option>
              <option value="mobile">Móvel</option>
            </select>
            
            <select 
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os estados</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mapa Interativo</h3>
              
              {/* Simulated Map */}
              <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  {/* Map Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#000" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                  
                  {/* Unit Pins */}
                  {filteredUnits.map((unit, index) => (
                    <div
                      key={unit.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                        selectedUnit?.id === unit.id ? 'scale-125 z-10' : ''
                      }`}
                      style={{
                        left: `${20 + (index * 15)}%`,
                        top: `${30 + (index * 12)}%`
                      }}
                      onClick={() => setSelectedUnit(unit)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                        unit.status === 'active' ? 'bg-green-500' :
                        unit.status === 'inactive' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        <div className="font-medium">{unit.name}</div>
                        <div>{unit.city}/{unit.state}</div>
                        <div>{getStatusLabel(unit.status)}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Legenda</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Ativa</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Em Risco</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-gray-600">Inativa</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Details Panel */}
          <div className="space-y-6">
            {selectedUnit ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Detalhes da Unidade</h3>
                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{selectedUnit.name}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(selectedUnit.status)}
                      <span className={`text-sm font-medium ${getStatusColor(selectedUnit.status)}`}>
                        {getStatusLabel(selectedUnit.status)}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {getTypeLabel(selectedUnit.type)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="text-sm text-gray-600">
                        <div>{selectedUnit.address}</div>
                        <div>{selectedUnit.city}/{selectedUnit.state}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedUnit.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedUnit.email}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Responsável</h5>
                    <p className="text-sm text-gray-600">{selectedUnit.responsiblePerson}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Estatísticas</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{selectedUnit.patientsCount}</div>
                        <div className="text-xs text-gray-500">Pacientes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{selectedUnit.vaccinesApplied}</div>
                        <div className="text-xs text-gray-500">Vacinas</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-xs text-gray-500">
                      Última atividade: {new Date(selectedUnit.lastActivity).toLocaleString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                      Ver Detalhes
                    </button>
                    <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Selecione uma Unidade</h3>
                  <p className="text-gray-500">Clique em um pino no mapa para ver os detalhes</p>
                </div>
              </div>
            )}

            {/* Units List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Lista de Unidades</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredUnits.map((unit) => (
                  <div
                    key={unit.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedUnit?.id === unit.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedUnit(unit)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{unit.name}</div>
                        <div className="text-xs text-gray-500">{unit.city}/{unit.state}</div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(unit.status)}
                        <span className="text-xs text-gray-500">{getTypeLabel(unit.type)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsMap;