import React, { useState } from 'react';
import { 
  Home, 
  User, 
  Calendar, 
  MapPin,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Shield,
  Navigation,
  Heart,
  Users,
  TrendingUp
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  cpf: string;
  phone: string;
  email?: string;
  address: string;
  neighborhood: string;
  city: string;
  guardian?: string;
  guardianPhone?: string;
  lastService: string;
  nextService?: string;
  status: 'active' | 'inactive' | 'pending';
  servicesCount: number;
  vaccinesApplied: number;
  medicalConditions?: string[];
}

interface HomeService {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  serviceType: 'vaccination' | 'health_check' | 'nursing_care' | 'physiotherapy';
  professional: string;
  address: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  duration: string;
}

const HomeCare: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterNeighborhood, setFilterNeighborhood] = useState('all');
  const [activeTab, setActiveTab] = useState<'patients' | 'services' | 'routes'>('patients');

  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'Maria Aparecida Silva',
      age: 78,
      cpf: '123.456.789-00',
      phone: '+55 11 99999-1234',
      email: 'maria.silva@email.com',
      address: 'Rua das Flores, 123, Apto 45',
      neighborhood: 'Vila Madalena',
      city: 'São Paulo/SP',
      lastService: '2025-01-20',
      nextService: '2025-02-15',
      status: 'active',
      servicesCount: 8,
      vaccinesApplied: 12,
      medicalConditions: ['Diabetes', 'Hipertensão']
    },
    {
      id: '2',
      name: 'João Pedro Santos',
      age: 12,
      cpf: '987.654.321-00',
      phone: '+55 11 88888-5678',
      address: 'Av. Paulista, 1000, Casa 2',
      neighborhood: 'Bela Vista',
      city: 'São Paulo/SP',
      guardian: 'Ana Santos',
      guardianPhone: '+55 11 77777-9999',
      lastService: '2025-01-18',
      status: 'active',
      servicesCount: 5,
      vaccinesApplied: 8
    },
    {
      id: '3',
      name: 'Carlos Eduardo Costa',
      age: 65,
      cpf: '456.789.123-00',
      phone: '+55 11 77777-9012',
      address: 'Rua Augusta, 500, Apto 12',
      neighborhood: 'Consolação',
      city: 'São Paulo/SP',
      lastService: '2024-12-15',
      status: 'inactive',
      servicesCount: 3,
      vaccinesApplied: 6,
      medicalConditions: ['Mobilidade Reduzida']
    }
  ];

  const mockServices: HomeService[] = [
    {
      id: '1',
      patientId: '1',
      patientName: 'Maria Aparecida Silva',
      date: '2025-02-15',
      time: '09:00',
      serviceType: 'vaccination',
      professional: 'Ana Paula Silva',
      address: 'Rua das Flores, 123, Apto 45 - Vila Madalena',
      status: 'scheduled',
      duration: '30 min'
    },
    {
      id: '2',
      patientId: '2',
      patientName: 'João Pedro Santos',
      date: '2025-01-18',
      time: '14:00',
      serviceType: 'health_check',
      professional: 'Dr. Carlos Oliveira',
      address: 'Av. Paulista, 1000, Casa 2 - Bela Vista',
      status: 'completed',
      notes: 'Consulta de rotina realizada. Paciente em boas condições.',
      duration: '45 min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      case 'scheduled': return 'Agendado';
      case 'in_progress': return 'Em Andamento';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'vaccination': return 'Vacinação';
      case 'health_check': return 'Consulta';
      case 'nursing_care': return 'Cuidados de Enfermagem';
      case 'physiotherapy': return 'Fisioterapia';
      default: return type;
    }
  };

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm) ||
                         patient.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
    const matchesNeighborhood = filterNeighborhood === 'all' || patient.neighborhood === filterNeighborhood;
    
    return matchesSearch && matchesStatus && matchesNeighborhood;
  });

  const totalPatients = mockPatients.length;
  const activePatients = mockPatients.filter(p => p.status === 'active').length;
  const totalServices = mockPatients.reduce((sum, p) => sum + p.servicesCount, 0);
  const totalVaccines = mockPatients.reduce((sum, p) => sum + p.vaccinesApplied, 0);

  const neighborhoods = [...new Set(mockPatients.map(p => p.neighborhood))];

  const renderPatientsTab = () => (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, CPF ou endereço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterNeighborhood}
            onChange={(e) => setFilterNeighborhood(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os bairros</option>
            {neighborhoods.map(neighborhood => (
              <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
            ))}
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="pending">Pendente</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} anos - CPF: {patient.cpf}</div>
                        {patient.guardian && (
                          <div className="text-xs text-purple-600">Responsável: {patient.guardian}</div>
                        )}
                        {patient.medicalConditions && (
                          <div className="text-xs text-orange-600">
                            {patient.medicalConditions.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {patient.phone}
                    </div>
                    {patient.email && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {patient.email}
                      </div>
                    )}
                    {patient.guardianPhone && (
                      <div className="text-xs text-purple-600">
                        Resp: {patient.guardianPhone}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.address}</div>
                    <div className="text-sm text-gray-500">{patient.neighborhood} - {patient.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(patient.lastService).toLocaleDateString('pt-BR')}
                    </div>
                    {patient.nextService && (
                      <div className="text-sm text-blue-600">
                        Próximo: {new Date(patient.nextService).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {patient.servicesCount} serviços | {patient.vaccinesApplied} vacinas
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {getStatusLabel(patient.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Agendar Visita">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Ver no Mapa">
                        <Navigation className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderServicesTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Serviço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profissional</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{service.patientName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(service.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-500">{service.time} ({service.duration})</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getServiceTypeLabel(service.serviceType)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.professional}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(service.status)}`}>
                    {getStatusLabel(service.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRoutesTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <Navigation className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Otimização de Rotas</h3>
        <p className="text-gray-500 mb-6">Planeje as melhores rotas para atendimento domiciliar</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Gerar Rota Otimizada
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Atendimento Domiciliar</h1>
              <p className="text-gray-600">Cuidados de saúde no conforto do lar</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('patients')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'patients' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pacientes
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'services' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Serviços
            </button>
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'routes' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Rotas
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Novo Paciente</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalPatients}</p>
              </div>
              <User className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pacientes Ativos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activePatients}</p>
              </div>
              <Heart className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Serviços Realizados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalServices}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacinas Aplicadas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalVaccines}</p>
              </div>
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {activeTab === 'patients' && renderPatientsTab()}
        {activeTab === 'services' && renderServicesTab()}
        {activeTab === 'routes' && renderRoutesTab()}
      </div>
    </div>
  );
};

export default HomeCare;