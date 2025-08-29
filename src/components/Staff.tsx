import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Shield, 
  Calendar,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck
} from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  cpf: string;
  role: string;
  professionalId?: string;
  phone: string;
  email: string;
  accessLevel: 'attendant' | 'nurse' | 'manager';
  isActive: boolean;
  hireDate: string;
  vaccinesApplied: number;
  appointmentsAttended: number;
  absences: number;
}

const Staff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockStaff: Staff[] = [
    {
      id: '1',
      name: 'Ana Paula Silva',
      cpf: '123.456.789-00',
      role: 'Enfermeira',
      professionalId: 'COREN 123456',
      phone: '+55 11 99999-1234',
      email: 'ana.silva@clinica.com',
      accessLevel: 'nurse',
      isActive: true,
      hireDate: '2023-01-15',
      vaccinesApplied: 245,
      appointmentsAttended: 180,
      absences: 2
    },
    {
      id: '2',
      name: 'Carlos Eduardo Santos',
      cpf: '987.654.321-00',
      role: 'Atendente',
      phone: '+55 11 88888-5678',
      email: 'carlos.santos@clinica.com',
      accessLevel: 'attendant',
      isActive: true,
      hireDate: '2023-03-20',
      vaccinesApplied: 0,
      appointmentsAttended: 320,
      absences: 1
    },
    {
      id: '3',
      name: 'Dr. Maria Fernanda',
      cpf: '456.789.123-00',
      role: 'Médica',
      professionalId: 'CRM 98765',
      phone: '+55 11 77777-9012',
      email: 'maria.fernanda@clinica.com',
      accessLevel: 'manager',
      isActive: true,
      hireDate: '2022-08-10',
      vaccinesApplied: 156,
      appointmentsAttended: 95,
      absences: 0
    },
    {
      id: '4',
      name: 'João Técnico',
      cpf: '321.654.987-00',
      role: 'Técnico em Enfermagem',
      professionalId: 'COREN 654321',
      phone: '+55 11 66666-3456',
      email: 'joao.tecnico@clinica.com',
      accessLevel: 'nurse',
      isActive: false,
      hireDate: '2023-06-01',
      vaccinesApplied: 89,
      appointmentsAttended: 67,
      absences: 5
    }
  ];

  const getAccessLevelLabel = (level: string) => {
    switch (level) {
      case 'attendant': return 'Atendente';
      case 'nurse': return 'Enfermagem';
      case 'manager': return 'Gestor';
      default: return level;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'attendant': return 'bg-blue-100 text-blue-800';
      case 'nurse': return 'bg-green-100 text-green-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.cpf.includes(searchTerm) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || staff.accessLevel === filterRole;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && staff.isActive) ||
                         (filterStatus === 'inactive' && !staff.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeStaff = mockStaff.filter(s => s.isActive).length;
  const totalVaccines = mockStaff.reduce((sum, s) => sum + s.vaccinesApplied, 0);
  const totalAppointments = mockStaff.reduce((sum, s) => sum + s.appointmentsAttended, 0);

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
              <p className="text-gray-600">Gerenciar equipe e permissões</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Colaborador</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Colaboradores Ativos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeStaff}</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacinas Aplicadas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalVaccines}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Atendimentos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalAppointments}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Presença</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-orange-500" />
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
                  placeholder="Buscar por nome, CPF ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os cargos</option>
              <option value="attendant">Atendente</option>
              <option value="nurse">Enfermagem</option>
              <option value="manager">Gestor</option>
            </select>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Colaborador</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cargo/Acesso</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStaff.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                          <div className="text-sm text-gray-500">CPF: {staff.cpf}</div>
                          {staff.professionalId && (
                            <div className="text-xs text-blue-600">{staff.professionalId}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-green-500" />
                        {staff.phone}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        {staff.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{staff.role}</div>
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccessLevelColor(staff.accessLevel)}`}>
                        {getAccessLevelLabel(staff.accessLevel)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{staff.vaccinesApplied} vacinas</div>
                      <div className="text-sm text-gray-500">{staff.appointmentsAttended} atendimentos</div>
                      {staff.absences > 0 && (
                        <div className="text-xs text-orange-600">{staff.absences} faltas</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        staff.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {staff.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Desde {new Date(staff.hireDate).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900 p-1" title="Relatórios">
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1" title="Escala">
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

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum colaborador encontrado</h3>
              <p className="text-gray-500">Ajuste os filtros ou adicione um novo colaborador</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;