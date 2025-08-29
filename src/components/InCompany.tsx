import React, { useState } from 'react';
import { 
  Building, 
  Users, 
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
  User,
  Briefcase,
  Target,
  TrendingUp
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  employees: number;
  lastService: string;
  nextService?: string;
  status: 'active' | 'inactive' | 'pending';
  servicesCount: number;
  vaccinesApplied: number;
}

interface Service {
  id: string;
  companyId: string;
  companyName: string;
  date: string;
  time: string;
  serviceType: 'vaccination' | 'health_check' | 'training';
  employeesAttended: number;
  professional: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

const InCompany: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [activeTab, setActiveTab] = useState<'companies' | 'services' | 'schedule'>('companies');

  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Tech Solutions Ltda',
      cnpj: '12.345.678/0001-90',
      contact: 'Maria Santos',
      phone: '+55 11 99999-1234',
      email: 'rh@techsolutions.com',
      address: 'Av. Paulista, 1000 - São Paulo/SP',
      employees: 150,
      lastService: '2025-01-20',
      nextService: '2025-02-15',
      status: 'active',
      servicesCount: 12,
      vaccinesApplied: 450
    },
    {
      id: '2',
      name: 'Indústria ABC S.A.',
      cnpj: '98.765.432/0001-10',
      contact: 'João Silva',
      phone: '+55 11 88888-5678',
      email: 'seguranca@industriaabc.com',
      address: 'Rua Industrial, 500 - São Bernardo/SP',
      employees: 300,
      lastService: '2025-01-15',
      status: 'active',
      servicesCount: 8,
      vaccinesApplied: 890
    },
    {
      id: '3',
      name: 'Escritório Advocacia XYZ',
      cnpj: '11.222.333/0001-44',
      contact: 'Ana Costa',
      phone: '+55 11 77777-9012',
      email: 'admin@advocaciaxyz.com',
      address: 'Rua dos Advogados, 200 - São Paulo/SP',
      employees: 45,
      lastService: '2024-12-10',
      status: 'inactive',
      servicesCount: 3,
      vaccinesApplied: 135
    }
  ];

  const mockServices: Service[] = [
    {
      id: '1',
      companyId: '1',
      companyName: 'Tech Solutions Ltda',
      date: '2025-02-15',
      time: '09:00',
      serviceType: 'vaccination',
      employeesAttended: 45,
      professional: 'Ana Paula Silva',
      status: 'scheduled'
    },
    {
      id: '2',
      companyId: '2',
      companyName: 'Indústria ABC S.A.',
      date: '2025-01-15',
      time: '14:00',
      serviceType: 'health_check',
      employeesAttended: 80,
      professional: 'Dr. Carlos Oliveira',
      status: 'completed',
      notes: 'Campanha de vacinação da gripe realizada com sucesso'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
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
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'vaccination': return 'Vacinação';
      case 'health_check': return 'Check-up';
      case 'training': return 'Treinamento';
      default: return type;
    }
  };

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.cnpj.includes(searchTerm) ||
                         company.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalCompanies = mockCompanies.length;
  const activeCompanies = mockCompanies.filter(c => c.status === 'active').length;
  const totalEmployees = mockCompanies.reduce((sum, c) => sum + c.employees, 0);
  const totalVaccines = mockCompanies.reduce((sum, c) => sum + c.vaccinesApplied, 0);

  const renderCompaniesTab = () => (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por empresa, CNPJ ou contato..."
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
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="pending">Pendente</option>
          </select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funcionários</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Serviço</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">CNPJ: {company.cnpj}</div>
                        <div className="text-xs text-gray-400">{company.address}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.contact}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {company.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {company.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.employees} funcionários</div>
                    <div className="text-sm text-gray-500">{company.vaccinesApplied} vacinas aplicadas</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(company.lastService).toLocaleDateString('pt-BR')}
                    </div>
                    {company.nextService && (
                      <div className="text-sm text-blue-600">
                        Próximo: {new Date(company.nextService).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(company.status)}`}>
                      {getStatusLabel(company.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Agendar Serviço">
                        <Calendar className="w-4 h-4" />
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Hora</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Serviço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Funcionários</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profissional</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockServices.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{service.companyName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(service.date).toLocaleDateString('pt-BR')}
                  </div>
                  <div className="text-sm text-gray-500">{service.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{getServiceTypeLabel(service.serviceType)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.employeesAttended}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{service.professional}</div>
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

  const renderScheduleTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Agenda de Serviços In Company</h3>
        <p className="text-gray-500 mb-6">Gerencie agendamentos e disponibilidade</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Novo Agendamento
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Atendimento In Company</h1>
              <p className="text-gray-600">Serviços de saúde nas empresas</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'companies' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Empresas
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'services' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Serviços
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'schedule' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Agenda
            </button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Nova Empresa</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Empresas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalCompanies}</p>
              </div>
              <Building className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Empresas Ativas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeCompanies}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Funcionários</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
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

        {activeTab === 'companies' && renderCompaniesTab()}
        {activeTab === 'services' && renderServicesTab()}
        {activeTab === 'schedule' && renderScheduleTab()}
      </div>
    </div>
  );
};

export default InCompany;