import React, { useState } from 'react';
import { 
  RefreshCw, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  TrendingDown,
  Search,
  Filter,
  Phone,
  Calendar,
  X,
  Send,
  Edit,
  Eye,
  AlertCircle,
  Users,
  Mail,
  Bot,
  Copy,
  Play
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  phone: string;
  vaccineOverdue: string;
  dose: string;
  lastDoseDate: string;
  messageStatus: 'sent' | 'responded' | 'ignored' | 'failed';
  lastAttempt: string;
  daysOverdue: number;
}

interface DashboardStats {
  overdueClients: number;
  messagesSent: number;
  deliveryRate: number;
  successfulReactivations: number;
  pendingResponses: number;
  conversionRate: number;
}

const ClientReactivation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patients' | 'template'>('patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVaccine, setFilterVaccine] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDays, setFilterDays] = useState('all');
  const [templateText, setTemplateText] = useState(
    'Você é um assistente atencioso de uma clínica de vacinação. Escreva uma mensagem curta e empática convidando o paciente {{nome}} a agendar a próxima dose de {{vacina}}, que está atrasada desde {{data_ultima_dose}}. Seja gentil e claro.'
  );
  const [previewExample, setPreviewExample] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const dashboardStats: DashboardStats = {
    overdueClients: 127,
    messagesSent: 89,
    deliveryRate: 94.5,
    successfulReactivations: 23,
    pendingResponses: 45,
    conversionRate: 25.8
  };

  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'Maria Silva',
      phone: '+55 11 99999-1234',
      vaccineOverdue: 'Gripe',
      dose: '2ª dose',
      lastDoseDate: '2024-11-15',
      messageStatus: 'sent',
      lastAttempt: '2025-01-25 14:30',
      daysOverdue: 45
    },
    {
      id: '2',
      name: 'João Santos',
      phone: '+55 11 88888-5678',
      vaccineOverdue: 'HPV',
      dose: '3ª dose',
      lastDoseDate: '2024-10-20',
      messageStatus: 'responded',
      lastAttempt: '2025-01-24 10:15',
      daysOverdue: 67
    },
    {
      id: '3',
      name: 'Ana Costa',
      phone: '+55 11 77777-9012',
      vaccineOverdue: 'Hepatite B',
      dose: '1ª dose',
      lastDoseDate: '2024-12-01',
      messageStatus: 'ignored',
      lastAttempt: '2025-01-23 16:45',
      daysOverdue: 30
    },
    {
      id: '4',
      name: 'Carlos Oliveira',
      phone: '+55 11 66666-3456',
      vaccineOverdue: 'Tétano',
      dose: 'Reforço',
      lastDoseDate: '2024-09-10',
      messageStatus: 'failed',
      lastAttempt: '2025-01-22 09:20',
      daysOverdue: 98
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'responded': return 'bg-green-100 text-green-800';
      case 'ignored': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'sent': return 'Enviada';
      case 'responded': return 'Respondida';
      case 'ignored': return 'Ignorada';
      case 'failed': return 'Falha';
      default: return status;
    }
  };

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesVaccine = filterVaccine === 'all' || patient.vaccineOverdue === filterVaccine;
    const matchesStatus = filterStatus === 'all' || patient.messageStatus === filterStatus;
    const matchesDays = filterDays === 'all' || 
                       (filterDays === '30+' && patient.daysOverdue >= 30) ||
                       (filterDays === '60+' && patient.daysOverdue >= 60) ||
                       (filterDays === '90+' && patient.daysOverdue >= 90);
    
    return matchesSearch && matchesVaccine && matchesStatus && matchesDays;
  });

  const generatePreview = () => {
    const examplePatient = {
      nome: 'Maria Silva',
      vacina: 'Gripe',
      data_ultima_dose: '15/11/2024'
    };
    
    // Simular resposta da IA
    const mockResponse = `Olá, ${examplePatient.nome}! 😊\n\nEsperamos que você esteja bem. Notamos que sua vacina da ${examplePatient.vacina} está com a próxima dose em atraso desde ${examplePatient.data_ultima_dose}.\n\nQue tal agendarmos? É rápido e você fica protegida! 💙\n\nResponda este WhatsApp para marcarmos um horário que seja bom para você.\n\nEquipe da Clínica`;
    
    setPreviewExample(mockResponse);
    setShowPreview(true);
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Clientes em Atraso</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.overdueClients}</p>
          </div>
          <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Mensagens Enviadas</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.messagesSent}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-sm text-green-600 mt-2">{dashboardStats.deliveryRate}% entregues</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Reativações</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.successfulReactivations}</p>
          </div>
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Pendentes</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.pendingResponses}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Taxa Conversão</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{dashboardStats.conversionRate}%</p>
          </div>
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatientsTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
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
            <option value="Hepatite B">Hepatite B</option>
            <option value="Tétano">Tétano</option>
          </select>
          
          <select 
            value={filterDays}
            onChange={(e) => setFilterDays(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Qualquer atraso</option>
            <option value="30+">Mais de 30 dias</option>
            <option value="60+">Mais de 60 dias</option>
            <option value="90+">Mais de 90 dias</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="sent">Enviada</option>
            <option value="responded">Respondida</option>
            <option value="ignored">Ignorada</option>
            <option value="failed">Falha</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina em Atraso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Dose</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Tentativa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {patient.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{patient.vaccineOverdue}</div>
                  <div className="text-sm text-gray-500">{patient.dose}</div>
                  <div className="text-xs text-red-600">{patient.daysOverdue} dias em atraso</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(patient.lastDoseDate).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.messageStatus)}`}>
                    {getStatusLabel(patient.messageStatus)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(patient.lastAttempt).toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 p-1" title="Reenviar mensagem">
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 p-1" title="Agendar manualmente">
                      <Calendar className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 p-1" title="Visualizar conversa">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1" title="Ignorar">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
          <p className="text-gray-500">Ajuste os filtros para ver mais resultados</p>
        </div>
      )}
    </div>
  );

  const renderTemplateTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Bot className="w-5 h-5 mr-2 text-purple-500" />
        Template de Mensagem Automática (IA)
      </h3>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prompt para IA
          </label>
          <textarea
            value={templateText}
            onChange={(e) => setTemplateText(e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Digite o prompt que será usado pela IA para gerar as mensagens..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Use variáveis: <code className="bg-gray-100 px-1 rounded">{'{{nome}}'}</code>, 
            <code className="bg-gray-100 px-1 rounded ml-1">{'{{vacina}}'}</code>, 
            <code className="bg-gray-100 px-1 rounded ml-1">{'{{data_ultima_dose}}'}</code>
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={generatePreview}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Visualizar Exemplo</span>
          </button>
          
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Testar Envio para Mim</span>
          </button>
          
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2">
            <Copy className="w-4 h-4" />
            <span>Salvar Template</span>
          </button>
        </div>

        {showPreview && (
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Exemplo Gerado pela IA:</h4>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 whitespace-pre-line">{previewExample}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Reativação de Clientes</h1>
              <p className="text-gray-600">Gerencie pacientes com vacinas em atraso</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('patients')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'patients' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lista de Pacientes
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'template' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Template IA
            </button>
          </div>
        </div>

        {renderDashboard()}

        {activeTab === 'patients' && renderPatientsTab()}
        {activeTab === 'template' && renderTemplateTab()}
      </div>
    </div>
  );
};

export default ClientReactivation;