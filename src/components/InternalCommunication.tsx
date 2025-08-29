import React, { useState } from 'react';
import { 
  MessageCircle, 
  Plus, 
  Send, 
  Eye, 
  Edit,
  Trash2,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Pin,
  Search,
  Filter,
  Bell,
  FileText,
  Image as ImageIcon,
  Paperclip
} from 'lucide-react';

interface Communication {
  id: string;
  title: string;
  content: string;
  type: 'announcement' | 'urgent' | 'info' | 'reminder';
  author: string;
  authorRole: string;
  targetAudience: string[];
  createdAt: string;
  expiresAt?: string;
  status: 'draft' | 'published' | 'expired';
  readBy: string[];
  totalRecipients: number;
  isPinned: boolean;
  hasAttachment: boolean;
}

const InternalCommunication: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCommunication, setSelectedCommunication] = useState<Communication | null>(null);

  const communicationsData: Communication[] = [
    {
      id: '1',
      title: 'Nova Política de Vacinação COVID-19',
      content: 'Informamos sobre as novas diretrizes para aplicação da vacina COVID-19 em crianças de 6 meses a 2 anos. Todos os profissionais devem revisar o protocolo atualizado antes de realizar qualquer aplicação.',
      type: 'announcement',
      author: 'Dr. João Silva',
      authorRole: 'Diretor Médico',
      targetAudience: ['Todas as unidades'],
      createdAt: '2025-01-27 09:00',
      expiresAt: '2025-02-27 23:59',
      status: 'published',
      readBy: ['user1', 'user2', 'user3'],
      totalRecipients: 25,
      isPinned: true,
      hasAttachment: true
    },
    {
      id: '2',
      title: 'URGENTE: Recall Lote Vacina Gripe',
      content: 'ATENÇÃO: O lote GRP2025001 da vacina da gripe deve ser imediatamente retirado de circulação. Entrar em contato com a coordenação para procedimentos de devolução.',
      type: 'urgent',
      author: 'Maria Santos',
      authorRole: 'Coordenadora de Qualidade',
      targetAudience: ['Unidade Centro', 'Unidade Norte', 'Unidade Sul'],
      createdAt: '2025-01-26 15:30',
      status: 'published',
      readBy: ['user1', 'user4'],
      totalRecipients: 15,
      isPinned: true,
      hasAttachment: false
    },
    {
      id: '3',
      title: 'Treinamento Obrigatório - Sistema Novo',
      content: 'Será realizado treinamento obrigatório sobre o novo sistema de gestão nos dias 15 e 16 de fevereiro. Todos os colaboradores devem participar.',
      type: 'info',
      author: 'Ana Costa',
      authorRole: 'Gerente de TI',
      targetAudience: ['Todas as unidades'],
      createdAt: '2025-01-25 14:20',
      expiresAt: '2025-02-16 18:00',
      status: 'published',
      readBy: ['user1', 'user2', 'user3', 'user5'],
      totalRecipients: 25,
      isPinned: false,
      hasAttachment: true
    },
    {
      id: '4',
      title: 'Lembrete: Relatório Mensal',
      content: 'Lembramos que o prazo para envio dos relatórios mensais de vacinação é até o dia 30. Favor enviar para coordenacao@clinica.com',
      type: 'reminder',
      author: 'Carlos Oliveira',
      authorRole: 'Coordenador Administrativo',
      targetAudience: ['Gestores de Unidade'],
      createdAt: '2025-01-24 10:15',
      expiresAt: '2025-01-30 23:59',
      status: 'published',
      readBy: ['user2', 'user6'],
      totalRecipients: 8,
      isPinned: false,
      hasAttachment: false
    },
    {
      id: '5',
      title: 'Atualização de Protocolos',
      content: 'Rascunho da nova política de atendimento domiciliar. Aguardando aprovação da diretoria.',
      type: 'info',
      author: 'Roberto Lima',
      authorRole: 'Supervisor',
      targetAudience: ['Equipe Domiciliar'],
      createdAt: '2025-01-23 16:45',
      status: 'draft',
      readBy: [],
      totalRecipients: 12,
      isPinned: false,
      hasAttachment: false
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'announcement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'info': return 'bg-green-100 text-green-800 border-green-200';
      case 'reminder': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="w-4 h-4" />;
      case 'announcement': return <Bell className="w-4 h-4" />;
      case 'info': return <FileText className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'urgent': return 'Urgente';
      case 'announcement': return 'Comunicado';
      case 'info': return 'Informativo';
      case 'reminder': return 'Lembrete';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'expired': return 'Expirado';
      default: return status;
    }
  };

  const filteredCommunications = communicationsData.filter(comm => {
    const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || comm.type === filterType;
    const matchesStatus = filterStatus === 'all' || comm.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalCommunications = communicationsData.length;
  const publishedCommunications = communicationsData.filter(c => c.status === 'published').length;
  const urgentCommunications = communicationsData.filter(c => c.type === 'urgent' && c.status === 'published').length;
  const draftCommunications = communicationsData.filter(c => c.status === 'draft').length;

  const getReadPercentage = (comm: Communication) => {
    return comm.totalRecipients > 0 ? Math.round((comm.readBy.length / comm.totalRecipients) * 100) : 0;
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Comunicado Interno</h1>
              <p className="text-gray-600">Comunicação entre unidades da rede</p>
            </div>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Comunicado</span>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Comunicados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalCommunications}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Publicados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{publishedCommunications}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgentes Ativos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{urgentCommunications}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rascunhos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{draftCommunications}</p>
              </div>
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
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
                  placeholder="Buscar por título, conteúdo ou autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os tipos</option>
              <option value="urgent">Urgente</option>
              <option value="announcement">Comunicado</option>
              <option value="info">Informativo</option>
              <option value="reminder">Lembrete</option>
            </select>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os status</option>
              <option value="published">Publicado</option>
              <option value="draft">Rascunho</option>
              <option value="expired">Expirado</option>
            </select>
          </div>
        </div>

        {/* Communications List */}
        <div className="space-y-4">
          {filteredCommunications.map((comm) => (
            <div
              key={comm.id}
              className={`bg-white rounded-xl shadow-sm border-l-4 p-6 ${
                comm.type === 'urgent' ? 'border-l-red-500' :
                comm.type === 'announcement' ? 'border-l-blue-500' :
                comm.type === 'info' ? 'border-l-green-500' :
                'border-l-yellow-500'
              } ${comm.isPinned ? 'ring-2 ring-blue-200' : 'border border-gray-100'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {comm.isPinned && <Pin className="w-4 h-4 text-blue-500" />}
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getTypeColor(comm.type)}`}>
                      {getTypeIcon(comm.type)}
                      <span className="text-sm font-medium">{getTypeLabel(comm.type)}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(comm.status)}`}>
                      {getStatusLabel(comm.status)}
                    </span>
                    {comm.hasAttachment && (
                      <div className="flex items-center text-gray-500">
                        <Paperclip className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{comm.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{comm.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{comm.author} • {comm.authorRole}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(comm.createdAt).toLocaleString('pt-BR')}</span>
                      </div>
                      {comm.expiresAt && (
                        <div className="flex items-center space-x-1 text-orange-600">
                          <Clock className="w-4 h-4" />
                          <span>Expira: {new Date(comm.expiresAt).toLocaleDateString('pt-BR')}</span>
                        </div>
                      )}
                    </div>

                    {comm.status === 'published' && (
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{comm.readBy.length}</span> de{' '}
                          <span className="font-medium">{comm.totalRecipients}</span> leram
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getReadPercentage(comm)}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {getReadPercentage(comm)}%
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {comm.targetAudience.map((audience, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 ml-4">
                  <button 
                    className="text-blue-600 hover:text-blue-900 p-2" 
                    title="Visualizar"
                    onClick={() => setSelectedCommunication(comm)}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    className="text-gray-600 hover:text-gray-900 p-2" 
                    title="Editar"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900 p-2" 
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCommunications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum comunicado encontrado</h3>
              <p className="text-gray-500 mb-6">Ajuste os filtros ou crie um novo comunicado</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Criar Primeiro Comunicado
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-400 hover:bg-red-50 transition-colors">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <span className="font-medium text-gray-900">Comunicado Urgente</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Bell className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-900">Anúncio Geral</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors">
              <Clock className="w-6 h-6 text-yellow-600" />
              <span className="font-medium text-gray-900">Lembrete</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
              <Users className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-900">Relatório Leitura</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalCommunication;