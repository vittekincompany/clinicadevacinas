import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  Shield,
  Mail,
  Eye,
  Edit,
  Trash2,
  Key,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  UserPlus,
  Settings
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  accessLevel: 'network_admin' | 'unit_manager' | 'attendant' | 'health_professional';
  units: string[];
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  createdAt: string;
  permissions: string[];
}

const ManageAccess: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUnit, setFilterUnit] = useState('all');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const usersData: User[] = [
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@clinica.com',
      role: 'Gestor do Grupo',
      accessLevel: 'network_admin',
      units: ['all'],
      status: 'active',
      lastLogin: '2025-01-27 14:30',
      createdAt: '2024-01-15',
      permissions: ['full_access', 'user_management', 'financial', 'reports']
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@clinica.com',
      role: 'Gestora de Unidade',
      accessLevel: 'unit_manager',
      units: ['Unidade Centro'],
      status: 'active',
      lastLogin: '2025-01-27 12:15',
      createdAt: '2024-02-20',
      permissions: ['unit_management', 'staff_management', 'reports', 'inventory']
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana.costa@clinica.com',
      role: 'Atendente',
      accessLevel: 'attendant',
      units: ['Unidade Centro', 'Unidade Zona Sul'],
      status: 'active',
      lastLogin: '2025-01-27 10:45',
      createdAt: '2024-03-10',
      permissions: ['schedule', 'patients', 'messaging']
    },
    {
      id: '4',
      name: 'Dr. Carlos Oliveira',
      email: 'carlos.oliveira@clinica.com',
      role: 'Médico',
      accessLevel: 'health_professional',
      units: ['Unidade Norte'],
      status: 'active',
      lastLogin: '2025-01-26 16:20',
      createdAt: '2024-04-05',
      permissions: ['vaccination', 'clinical_support', 'patients']
    },
    {
      id: '5',
      name: 'Roberto Lima',
      email: 'roberto.lima@clinica.com',
      role: 'Atendente',
      accessLevel: 'attendant',
      units: ['Unidade Leste'],
      status: 'pending',
      lastLogin: 'Nunca',
      createdAt: '2025-01-25',
      permissions: ['schedule', 'patients']
    },
    {
      id: '6',
      name: 'Lucia Ferreira',
      email: 'lucia.ferreira@clinica.com',
      role: 'Enfermeira',
      accessLevel: 'health_professional',
      units: ['Unidade Oeste'],
      status: 'inactive',
      lastLogin: '2025-01-20 09:30',
      createdAt: '2024-06-15',
      permissions: ['vaccination', 'patients']
    }
  ];

  const accessLevels = [
    {
      id: 'network_admin',
      name: 'Gestor do Grupo',
      description: 'Acesso total a todas as unidades e funcionalidades',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'unit_manager',
      name: 'Gestor de Unidade',
      description: 'Gerencia apenas sua unidade específica',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'attendant',
      name: 'Atendente',
      description: 'Pode agendar e responder mensagens',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'health_professional',
      name: 'Profissional de Saúde',
      description: 'Aplica vacinas e acessa suporte clínico',
      color: 'bg-orange-100 text-orange-800'
    }
  ];

  const availableUnits = [
    'Unidade Centro',
    'Unidade Zona Sul',
    'Unidade Norte',
    'Unidade Oeste',
    'Unidade Leste',
    'Unidade ABC'
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
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return status;
    }
  };

  const getAccessLevelInfo = (level: string) => {
    return accessLevels.find(al => al.id === level) || accessLevels[0];
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.accessLevel === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesUnit = filterUnit === 'all' || 
                       user.units.includes('all') || 
                       user.units.includes(filterUnit);
    
    return matchesSearch && matchesRole && matchesStatus && matchesUnit;
  });

  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(u => u.status === 'active').length;
  const pendingUsers = usersData.filter(u => u.status === 'pending').length;
  const adminUsers = usersData.filter(u => u.accessLevel === 'network_admin').length;

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Acesso</h1>
              <p className="text-gray-600">Usuários, permissões e vinculações com unidades</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Convidar por E-mail</span>
            </button>
            <button
              onClick={() => setShowUserModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Criar Usuário</span>
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usuários</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeUsers}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Convites Pendentes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingUsers}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Administradores</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{adminUsers}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Access Levels Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfis de Acesso</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {accessLevels.map((level) => (
              <div key={level.id} className="border border-gray-200 rounded-lg p-4">
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${level.color} mb-2`}>
                  {level.name}
                </div>
                <p className="text-sm text-gray-600">{level.description}</p>
              </div>
            ))}
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
                  placeholder="Buscar por nome, e-mail ou cargo..."
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
              <option value="all">Todos os perfis</option>
              {accessLevels.map(level => (
                <option key={level.id} value={level.id}>{level.name}</option>
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
            
            <select 
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as unidades</option>
              {availableUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Perfil</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidades</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const accessLevel = getAccessLevelInfo(user.accessLevel);
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">{user.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${accessLevel.color}`}>
                          {accessLevel.name}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {user.permissions.length} permissões
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.units.includes('all') ? (
                            <span className="text-purple-600 font-medium">Todas as unidades</span>
                          ) : (
                            <div className="space-y-1">
                              {user.units.slice(0, 2).map((unit, index) => (
                                <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {unit}
                                </div>
                              ))}
                              {user.units.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{user.units.length - 2} mais
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {getStatusLabel(user.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.lastLogin === 'Nunca' ? (
                            <span className="text-gray-500">Nunca</span>
                          ) : (
                            new Date(user.lastLogin).toLocaleString('pt-BR')
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Criado em {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            className="text-blue-600 hover:text-blue-900 p-1" 
                            title="Visualizar"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-900 p-1" 
                            title="Editar Permissões"
                          >
                            <Settings className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-orange-600 hover:text-orange-900 p-1" 
                            title="Resetar Senha"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-900 p-1" 
                            title="Editar"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 p-1" 
                            title="Bloquear/Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum usuário encontrado</h3>
              <p className="text-gray-500">Ajuste os filtros ou crie um novo usuário</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
              <UserPlus className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-gray-900">Convite em Lote</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Settings className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-900">Configurar Perfis</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
              <Eye className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-900">Log de Atividades</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
              <Key className="w-6 h-6 text-orange-600" />
              <span className="font-medium text-gray-900">Resetar Senhas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccess;