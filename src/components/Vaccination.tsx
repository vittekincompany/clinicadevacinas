import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Filter,
  FileText,
  Download,
  Syringe,
  Activity,
  Users,
  TrendingUp,
  Package,
  AlertTriangle,
  Save,
  X
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  gender: 'M' | 'F' | 'Outro';
  phone: string;
  email?: string;
  guardian?: string;
  guardianPhone?: string;
  address: string;
  vaccineHistory: VaccineRecord[];
}

interface VaccineRecord {
  id: string;
  vaccineName: string;
  dose: string;
  applicationDate: string;
  batch: string;
  professional: string;
  location: string;
  nextDose?: string;
  reactions?: string;
}

interface TodayAppointment {
  id: string;
  time: string;
  patientName: string;
  patientPhone: string;
  vaccineName: string;
  dose: string;
  status: 'scheduled' | 'completed' | 'no_show' | 'cancelled';
  professional?: string;
  notes?: string;
}

interface VaccineStock {
  id: string;
  name: string;
  batch: string;
  expiryDate: string;
  availableDoses: number;
  totalDoses: number;
  status: 'ok' | 'low' | 'expired';
}

const Vaccination: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'patients' | 'history' | 'stock'>('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVaccine, setFilterVaccine] = useState('all');
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showVaccineModal, setShowVaccineModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      birthDate: '1985-03-15',
      gender: 'F',
      phone: '+55 11 99999-1234',
      email: 'maria.silva@email.com',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      vaccineHistory: [
        {
          id: '1',
          vaccineName: 'Gripe (Influenza)',
          dose: '1ª dose',
          applicationDate: '2025-01-20',
          batch: 'GRP2025001',
          professional: 'Ana Paula Silva',
          location: 'Unidade Centro'
        }
      ]
    },
    {
      id: '2',
      name: 'João Pedro Oliveira',
      cpf: '987.654.321-00',
      birthDate: '2010-07-22',
      gender: 'M',
      phone: '+55 11 88888-5678',
      guardian: 'Ana Oliveira',
      guardianPhone: '+55 11 77777-9999',
      address: 'Av. Paulista, 1000 - São Paulo/SP',
      vaccineHistory: [
        {
          id: '2',
          vaccineName: 'HPV',
          dose: '1ª dose',
          applicationDate: '2025-01-18',
          batch: 'HPV2025002',
          professional: 'João Técnico',
          location: 'Unidade Centro',
          nextDose: '2025-07-18'
        }
      ]
    }
  ];

  const todayAppointments: TodayAppointment[] = [
    {
      id: '1',
      time: '09:00',
      patientName: 'Maria Silva Santos',
      patientPhone: '+55 11 99999-1234',
      vaccineName: 'Gripe (Influenza)',
      dose: '1ª dose',
      status: 'completed',
      professional: 'Ana Paula Silva'
    },
    {
      id: '2',
      time: '10:30',
      patientName: 'João Pedro Oliveira',
      patientPhone: '+55 11 88888-5678',
      vaccineName: 'HPV',
      dose: '2ª dose',
      status: 'scheduled'
    },
    {
      id: '3',
      time: '14:00',
      patientName: 'Carlos Eduardo Costa',
      patientPhone: '+55 11 77777-9012',
      vaccineName: 'Hepatite B',
      dose: '3ª dose',
      status: 'completed',
      professional: 'João Técnico'
    },
    {
      id: '4',
      time: '15:30',
      patientName: 'Ana Beatriz Santos',
      patientPhone: '+55 11 66666-3456',
      vaccineName: 'Tétano',
      dose: 'Reforço',
      status: 'no_show'
    },
    {
      id: '5',
      time: '16:00',
      patientName: 'Roberto Silva',
      patientPhone: '+55 11 55555-7890',
      vaccineName: 'Febre Amarela',
      dose: '1ª dose',
      status: 'cancelled',
      notes: 'Paciente cancelou por motivos pessoais'
    }
  ];

  const vaccineStock: VaccineStock[] = [
    {
      id: '1',
      name: 'Gripe (Influenza)',
      batch: 'GRP2025001',
      expiryDate: '2025-12-31',
      availableDoses: 380,
      totalDoses: 500,
      status: 'ok'
    },
    {
      id: '2',
      name: 'HPV',
      batch: 'HPV2025002',
      expiryDate: '2025-03-15',
      availableDoses: 22,
      totalDoses: 30,
      status: 'low'
    },
    {
      id: '3',
      name: 'Hepatite B',
      batch: 'HEP2024003',
      expiryDate: '2025-01-20',
      availableDoses: 0,
      totalDoses: 125,
      status: 'expired'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'no_show': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'ok': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendado';
      case 'completed': return 'Concluído';
      case 'no_show': return 'Faltou';
      case 'cancelled': return 'Cancelado';
      case 'ok': return 'Em dia';
      case 'low': return 'Baixo';
      case 'expired': return 'Vencido';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'no_show': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'cancelled': return <X className="w-4 h-4 text-red-500" />;
      case 'ok': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'low': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'expired': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const filteredAppointments = todayAppointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.patientPhone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    const matchesVaccine = filterVaccine === 'all' || apt.vaccineName.includes(filterVaccine);
    
    return matchesSearch && matchesStatus && matchesVaccine;
  });

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm) ||
                         patient.phone.includes(searchTerm);
    
    return matchesSearch;
  });

  const filteredStock = vaccineStock.filter(stock => {
    const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stock.batch.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || stock.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const todayStats = {
    total: todayAppointments.length,
    completed: todayAppointments.filter(a => a.status === 'completed').length,
    scheduled: todayAppointments.filter(a => a.status === 'scheduled').length,
    noShow: todayAppointments.filter(a => a.status === 'no_show').length
  };

  const stockStats = {
    total: vaccineStock.length,
    ok: vaccineStock.filter(s => s.status === 'ok').length,
    low: vaccineStock.filter(s => s.status === 'low').length,
    expired: vaccineStock.filter(s => s.status === 'expired').length
  };

  const renderTodayTab = () => (
    <div className="space-y-6">
      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Hoje</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.total}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Agendados</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.scheduled}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Faltas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{todayStats.noShow}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por paciente, vacina ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterVaccine}
            onChange={(e) => setFilterVaccine(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as vacinas</option>
            <option value="Gripe">Gripe</option>
            <option value="HPV">HPV</option>
            <option value="Hepatite">Hepatite</option>
            <option value="Tétano">Tétano</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="scheduled">Agendado</option>
            <option value="completed">Concluído</option>
            <option value="no_show">Faltou</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Agendamentos de Hoje</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profissional</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {appointment.patientPhone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.vaccineName}</div>
                    <div className="text-sm text-gray-500">{appointment.dose}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(appointment.status)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{appointment.professional || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Aplicar Vacina">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
            <p className="text-gray-500">Ajuste os filtros ou verifique a agenda</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPatientsTab = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Vacina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">CPF: {patient.cpf}</div>
                        {patient.guardian && (
                          <div className="text-xs text-purple-600">Responsável: {patient.guardian}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-green-500" />
                      {patient.phone}
                    </div>
                    {patient.email && (
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
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
                    <div className="text-sm text-gray-900">{calculateAge(patient.birthDate)} anos</div>
                    <div className="text-sm text-gray-500">
                      {patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Feminino' : 'Outro'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.vaccineHistory.length > 0 ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {patient.vaccineHistory[patient.vaccineHistory.length - 1].vaccineName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(patient.vaccineHistory[patient.vaccineHistory.length - 1].applicationDate).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">Nenhuma vacina</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 p-1" 
                        title="Ver Carteira"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Nova Vacina">
                        <Shield className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Agendar">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Histórico de Vacinações</h3>
        <p className="text-gray-500 mb-6">Visualize o histórico completo de todas as vacinações realizadas</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Ver Histórico Completo
        </button>
      </div>
    </div>
  );

  const renderStockTab = () => (
    <div className="space-y-6">
      {/* Stock Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Vacinas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stockStats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Em Dia</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stockStats.ok}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stockStats.low}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vencidas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stockStats.expired}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por vacina ou lote..."
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
            <option value="ok">Em dia</option>
            <option value="low">Estoque baixo</option>
            <option value="expired">Vencido</option>
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStock.map((stock) => (
                <tr key={stock.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stock.batch}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(stock.expiryDate).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stock.availableDoses} doses</div>
                    <div className="text-sm text-gray-500">de {stock.totalDoses} total</div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className={`h-1 rounded-full ${
                          stock.status === 'ok' ? 'bg-green-500' :
                          stock.status === 'low' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(stock.availableDoses / stock.totalDoses) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(stock.status)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(stock.status)}`}>
                        {getStatusLabel(stock.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Movimentar">
                        <Activity className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sala de Vacinas</h1>
              <p className="text-gray-600">Gestão de aplicações e controle de estoque</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'today' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Hoje
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'patients' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pacientes
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'history' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Histórico
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'stock' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Estoque
            </button>
            <button
              onClick={() => setShowVaccineModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Aplicação</span>
            </button>
          </div>
        </div>

        {activeTab === 'today' && renderTodayTab()}
        {activeTab === 'patients' && renderPatientsTab()}
        {activeTab === 'history' && renderHistoryTab()}
        {activeTab === 'stock' && renderStockTab()}

        {/* Patient Details Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Carteira de Vacinação</h2>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                    <p className="text-gray-600">CPF: {selectedPatient.cpf}</p>
                    <p className="text-gray-600">{calculateAge(selectedPatient.birthDate)} anos</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Histórico de Vacinações</h4>
                  {selectedPatient.vaccineHistory.length > 0 ? (
                    <div className="space-y-3">
                      {selectedPatient.vaccineHistory.map((vaccine) => (
                        <div key={vaccine.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium text-gray-900">{vaccine.vaccineName}</h5>
                              <p className="text-sm text-gray-600">{vaccine.dose}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-900">
                                {new Date(vaccine.applicationDate).toLocaleDateString('pt-BR')}
                              </p>
                              <p className="text-sm text-gray-500">Lote: {vaccine.batch}</p>
                            </div>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            Aplicada por: {vaccine.professional} • {vaccine.location}
                          </div>
                          {vaccine.nextDose && (
                            <div className="mt-2 text-sm text-blue-600">
                              Próxima dose: {new Date(vaccine.nextDose).toLocaleDateString('pt-BR')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Nenhuma vacinação registrada</p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Exportar PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vaccination;