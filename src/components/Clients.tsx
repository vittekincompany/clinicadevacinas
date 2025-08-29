import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Download,
  Edit,
  Trash2,
  Shield,
  AlertCircle,
  MapPin,
  Users,
  Filter,
  Eye
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  gender: 'M' | 'F' | 'Outro';
  phone: string;
  email: string;
  address: string;
  guardian?: string;
  communicationPreference: 'whatsapp' | 'email' | 'both';
  vaccinesCount: number;
  pendingVaccines: number;
  lastVisit: string;
}

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterAge, setFilterAge] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      birthDate: '1985-03-15',
      gender: 'F',
      phone: '+55 11 99999-1234',
      email: 'maria.silva@email.com',
      address: 'Rua das Flores, 123 - São Paulo/SP',
      communicationPreference: 'whatsapp',
      vaccinesCount: 12,
      pendingVaccines: 1,
      lastVisit: '2025-01-20'
    },
    {
      id: '2',
      name: 'João Pedro Oliveira',
      cpf: '987.654.321-00',
      birthDate: '2018-07-22',
      gender: 'M',
      phone: '+55 11 88888-5678',
      email: 'joao.oliveira@email.com',
      address: 'Av. Paulista, 456 - São Paulo/SP',
      guardian: 'Ana Oliveira',
      communicationPreference: 'both',
      vaccinesCount: 8,
      pendingVaccines: 2,
      lastVisit: '2025-01-18'
    },
    {
      id: '3',
      name: 'Carlos Eduardo Costa',
      cpf: '456.789.123-00',
      birthDate: '1972-11-08',
      gender: 'M',
      phone: '+55 11 77777-9012',
      email: 'carlos.costa@email.com',
      address: 'Rua Augusta, 789 - São Paulo/SP',
      communicationPreference: 'email',
      vaccinesCount: 15,
      pendingVaccines: 0,
      lastVisit: '2025-01-15'
    }
  ];

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

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.cpf.includes(searchTerm) ||
                         client.phone.includes(searchTerm);
    const matchesGender = filterGender === 'all' || client.gender === filterGender;
    const age = calculateAge(client.birthDate);
    const matchesAge = filterAge === 'all' || 
                      (filterAge === 'child' && age < 18) ||
                      (filterAge === 'adult' && age >= 18 && age < 60) ||
                      (filterAge === 'elderly' && age >= 60);
    
    return matchesSearch && matchesGender && matchesAge;
  });

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600">Gerenciar pacientes e histórico vacinal</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Cliente</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{mockClients.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vacinas Pendentes</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockClients.reduce((sum, client) => sum + client.pendingVaccines, 0)}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Vacinas Aplicadas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {mockClients.reduce((sum, client) => sum + client.vaccinesCount, 0)}
              </p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Novos Este Mês</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
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
                placeholder="Buscar por nome, CPF ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os gêneros</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          
          <select 
            value={filterAge}
            onChange={(e) => setFilterAge(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as idades</option>
            <option value="child">Crianças (0-17)</option>
            <option value="adult">Adultos (18-59)</option>
            <option value="elderly">Idosos (60+)</option>
          </select>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacinas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Visita</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.name}</div>
                        <div className="text-sm text-gray-500">CPF: {client.cpf}</div>
                        {client.guardian && (
                          <div className="text-xs text-purple-600">Responsável: {client.guardian}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Phone className="w-4 h-4 mr-1 text-green-500" />
                      {client.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {client.email}
                    </div>
                    <div className="text-xs text-gray-400">
                      Pref: {client.communicationPreference === 'whatsapp' ? 'WhatsApp' : 
                             client.communicationPreference === 'email' ? 'E-mail' : 'Ambos'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{calculateAge(client.birthDate)} anos</div>
                    <div className="text-sm text-gray-500">{client.gender === 'M' ? 'Masculino' : client.gender === 'F' ? 'Feminino' : 'Outro'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.vaccinesCount} aplicadas</div>
                    {client.pendingVaccines > 0 && (
                      <div className="text-sm text-orange-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {client.pendingVaccines} pendente(s)
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.lastVisit).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Carteira Vacinal">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Exportar PDF">
                        <Download className="w-4 h-4" />
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

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
            <p className="text-gray-500">Ajuste os filtros ou adicione um novo cliente</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Clients;