import React, { useState } from 'react';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  Filter,
  Send,
  Users,
  Image as ImageIcon,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Target,
  Upload,
  X,
  Save,
  Copy,
  Download,
  User,
  Phone,
  Mail,
  MapPin,
  Zap,
  Bot,
  Sparkles,
  TrendingUp,
  Activity,
  Loader2
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  message: string;
  image?: string;
  targetAudience: {
    type: 'all' | 'age_range' | 'gender' | 'custom';
    ageMin?: number;
    ageMax?: number;
    gender?: 'M' | 'F';
    customIds?: string[];
  };
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused';
  scheduledDate?: string;
  createdAt: string;
  sentCount: number;
  deliveredCount: number;
  readCount: number;
  responseCount: number;
  totalRecipients: number;
  createdBy: string;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  birthDate: string;
  gender: 'M' | 'F';
  lastVaccine?: string;
  city: string;
  isActive: boolean;
}

const WhatsAppCampaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'create' | 'analytics' | 'clients'>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [campaignSuccess, setCampaignSuccess] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
    image: null as File | null,
    targetType: 'all' as 'all' | 'age_range' | 'gender' | 'custom',
    ageMin: 18,
    ageMax: 65,
    gender: 'M' as 'M' | 'F',
    scheduledDate: '',
    scheduledTime: ''
  });

  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campanha Gripe 2025',
      message: '🩺 Olá! A temporada da gripe chegou e é hora de se proteger! 💙\n\nAgende sua vacina da gripe e mantenha sua saúde em dia. Nossa equipe está pronta para atendê-lo com todo cuidado e segurança.\n\n📅 Agende pelo WhatsApp: (11) 99999-0000\n🏥 Clínica ZYVIA - Sua saúde é nossa prioridade!',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      targetAudience: {
        type: 'age_range',
        ageMin: 40,
        ageMax: 80
      },
      status: 'completed',
      createdAt: '2025-01-25 10:30',
      sentCount: 1247,
      deliveredCount: 1189,
      readCount: 892,
      responseCount: 156,
      totalRecipients: 1247,
      createdBy: 'João Silva'
    },
    {
      id: '2',
      name: 'HPV para Adolescentes',
      message: '👨‍👩‍👧‍👦 Pais e responsáveis! \n\nA vacina HPV é fundamental para proteger nossos adolescentes. Recomendada para meninas e meninos de 9 a 14 anos.\n\n✅ Proteção contra o câncer\n✅ Segura e eficaz\n✅ Disponível na nossa clínica\n\nAgende hoje mesmo! 📱',
      targetAudience: {
        type: 'custom',
        customIds: ['1', '3', '5', '8', '12']
      },
      status: 'sending',
      scheduledDate: '2025-01-27 14:00',
      createdAt: '2025-01-26 16:20',
      sentCount: 89,
      deliveredCount: 85,
      readCount: 45,
      responseCount: 12,
      totalRecipients: 156,
      createdBy: 'Maria Santos'
    },
    {
      id: '3',
      name: 'Vacinação Feminina',
      message: '💜 Mulheres, cuidem da sua saúde! \n\nTemos um calendário especial de vacinação feminina:\n\n🔸 HPV\n🔸 Rubéola\n🔸 Hepatite B\n🔸 Gripe\n\nVenha conversar conosco sobre qual vacina é ideal para você! 👩‍⚕️',
      targetAudience: {
        type: 'gender',
        gender: 'F'
      },
      status: 'scheduled',
      scheduledDate: '2025-01-28 09:00',
      createdAt: '2025-01-26 11:45',
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      responseCount: 0,
      totalRecipients: 892,
      createdBy: 'Ana Costa'
    },
    {
      id: '4',
      name: 'Lembrete Hepatite B',
      message: '⚠️ Lembrete importante!\n\nSua segunda dose da vacina Hepatite B está próxima do vencimento.\n\n📅 Agende o quanto antes para manter sua proteção completa.\n\nEstamos aqui para ajudar! 💙',
      targetAudience: {
        type: 'custom',
        customIds: ['2', '4', '7', '9']
      },
      status: 'draft',
      createdAt: '2025-01-27 08:15',
      sentCount: 0,
      deliveredCount: 0,
      readCount: 0,
      responseCount: 0,
      totalRecipients: 23,
      createdBy: 'Carlos Oliveira'
    }
  ];

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      phone: '+55 11 99999-1234',
      email: 'maria.silva@email.com',
      birthDate: '1985-03-15',
      gender: 'F',
      lastVaccine: 'Gripe',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '2',
      name: 'João Pedro Oliveira',
      phone: '+55 11 88888-5678',
      birthDate: '2010-07-22',
      gender: 'M',
      lastVaccine: 'HPV',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '3',
      name: 'Ana Beatriz Costa',
      phone: '+55 11 77777-9012',
      email: 'ana.costa@email.com',
      birthDate: '1972-11-08',
      gender: 'F',
      lastVaccine: 'Hepatite B',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '4',
      name: 'Carlos Eduardo Lima',
      phone: '+55 11 66666-3456',
      birthDate: '1990-05-20',
      gender: 'M',
      lastVaccine: 'Tétano',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '5',
      name: 'Lucia Ferreira Santos',
      phone: '+55 11 55555-7890',
      email: 'lucia.ferreira@email.com',
      birthDate: '1965-09-12',
      gender: 'F',
      lastVaccine: 'Gripe',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '6',
      name: 'Roberto Silva Costa',
      phone: '+55 11 44444-1234',
      birthDate: '1988-12-03',
      gender: 'M',
      city: 'São Paulo',
      isActive: false
    },
    {
      id: '7',
      name: 'Fernanda Lima Oliveira',
      phone: '+55 11 33333-5678',
      email: 'fernanda.lima@email.com',
      birthDate: '1995-04-18',
      gender: 'F',
      lastVaccine: 'HPV',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '8',
      name: 'Pedro Santos Silva',
      phone: '+55 11 22222-9012',
      birthDate: '2008-08-25',
      gender: 'M',
      lastVaccine: 'Meningocócica',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '9',
      name: 'Juliana Rocha Costa',
      phone: '+55 11 11111-3456',
      email: 'juliana.rocha@email.com',
      birthDate: '1978-01-30',
      gender: 'F',
      lastVaccine: 'COVID-19',
      city: 'São Paulo',
      isActive: true
    },
    {
      id: '10',
      name: 'Gabriel Alves Santos',
      phone: '+55 11 99999-7777',
      birthDate: '1992-06-14',
      gender: 'M',
      city: 'São Paulo',
      isActive: true
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

  const getTargetAudienceDescription = (campaign: Campaign) => {
    const { targetAudience } = campaign;
    
    switch (targetAudience.type) {
      case 'all':
        return 'Todos os clientes';
      case 'age_range':
        return `Idade: ${targetAudience.ageMin}-${targetAudience.ageMax} anos`;
      case 'gender':
        return `Gênero: ${targetAudience.gender === 'M' ? 'Masculino' : 'Feminino'}`;
      case 'custom':
        return `${targetAudience.customIds?.length || 0} clientes selecionados`;
      default:
        return 'Segmentação personalizada';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Rascunho';
      case 'scheduled': return 'Agendada';
      case 'sending': return 'Enviando';
      case 'completed': return 'Concluída';
      case 'paused': return 'Pausada';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return <FileText className="w-4 h-4 text-gray-500" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'sending': return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'paused': return <Pause className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || campaign.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm) ||
                         client.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (newCampaign.targetType === 'age_range') {
      const age = calculateAge(client.birthDate);
      return matchesSearch && age >= newCampaign.ageMin && age <= newCampaign.ageMax;
    }
    
    if (newCampaign.targetType === 'gender') {
      return matchesSearch && client.gender === newCampaign.gender;
    }
    
    return matchesSearch && client.isActive;
  });

  const getTargetedClientsCount = () => {
    if (newCampaign.targetType === 'all') {
      return mockClients.filter(c => c.isActive).length;
    }
    if (newCampaign.targetType === 'custom') {
      return selectedClients.length;
    }
    return filteredClients.length;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCampaign(prev => ({ ...prev, image: file }));
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.message) {
      alert('Preencha o nome e a mensagem da campanha');
      return;
    }

    setIsCreatingCampaign(true);

    try {
      // Simular criação da campanha
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setCampaignSuccess(true);
      setTimeout(() => {
        setCampaignSuccess(false);
        setShowCreateModal(false);
        setActiveTab('campaigns');
        // Reset form
        setNewCampaign({
          name: '',
          message: '',
          image: null,
          targetType: 'all',
          ageMin: 18,
          ageMax: 65,
          gender: 'M',
          scheduledDate: '',
          scheduledTime: ''
        });
        setSelectedClients([]);
      }, 2000);
    } catch (error) {
      console.error('Erro ao criar campanha:', error);
    } finally {
      setIsCreatingCampaign(false);
    }
  };

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const selectAllFilteredClients = () => {
    const filteredIds = filteredClients.map(c => c.id);
    setSelectedClients(filteredIds);
  };

  const clearSelection = () => {
    setSelectedClients([]);
  };

  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'sending' || c.status === 'scheduled').length;
  const totalSent = mockCampaigns.reduce((sum, c) => sum + c.sentCount, 0);
  const totalResponses = mockCampaigns.reduce((sum, c) => sum + c.responseCount, 0);
  const avgResponseRate = totalSent > 0 ? ((totalResponses / totalSent) * 100).toFixed(1) : '0';

  const renderCampaignsTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar campanhas por nome ou conteúdo..."
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
            <option value="draft">Rascunho</option>
            <option value="scheduled">Agendada</option>
            <option value="sending">Enviando</option>
            <option value="completed">Concluída</option>
            <option value="paused">Pausada</option>
          </select>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  {getStatusIcon(campaign.status)}
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(campaign.status)}`}>
                    {getStatusLabel(campaign.status)}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Message Preview */}
                  <div className="lg:col-span-2">
                    <div className="flex space-x-4">
                      {campaign.image && (
                        <img 
                          src={campaign.image} 
                          alt="Campaign"
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 line-clamp-4 whitespace-pre-line">
                          {campaign.message}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {getTargetAudienceDescription(campaign)}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {campaign.createdBy}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(campaign.createdAt).toLocaleString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{campaign.sentCount}</div>
                        <div className="text-xs text-blue-600">Enviadas</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{campaign.deliveredCount}</div>
                        <div className="text-xs text-green-600">Entregues</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{campaign.readCount}</div>
                        <div className="text-xs text-purple-600">Lidas</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{campaign.responseCount}</div>
                        <div className="text-xs text-orange-600">Respostas</div>
                      </div>
                    </div>
                    
                    {campaign.status === 'completed' && (
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-gray-900">
                          Taxa de Resposta: {((campaign.responseCount / campaign.sentCount) * 100).toFixed(1)}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <button className="text-blue-600 hover:text-blue-900 p-2" title="Visualizar">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-900 p-2" title="Duplicar">
                  <Copy className="w-4 h-4" />
                </button>
                {campaign.status === 'sending' ? (
                  <button className="text-red-600 hover:text-red-900 p-2" title="Pausar">
                    <Pause className="w-4 h-4" />
                  </button>
                ) : campaign.status === 'paused' ? (
                  <button className="text-green-600 hover:text-green-900 p-2" title="Retomar">
                    <Play className="w-4 h-4" />
                  </button>
                ) : null}
                <button className="text-gray-600 hover:text-gray-900 p-2" title="Editar">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900 p-2" title="Excluir">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
          <div className="text-center">
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma campanha encontrada</h3>
            <p className="text-gray-500 mb-6">Crie sua primeira campanha de WhatsApp para engajar seus clientes</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Criar Primeira Campanha
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCreateTab = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Nova Campanha de WhatsApp</h3>
        
        <div className="space-y-6">
          {/* Campaign Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Campanha *
            </label>
            <input
              type="text"
              value={newCampaign.name}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Campanha Gripe 2025"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem *
            </label>
            <textarea
              value={newCampaign.message}
              onChange={(e) => setNewCampaign(prev => ({ ...prev, message: e.target.value }))}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Digite a mensagem que será enviada para os clientes..."
            />
            <p className="text-sm text-gray-500 mt-1">
              {newCampaign.message.length}/1000 caracteres
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem (Opcional)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="campaign-image"
              />
              <label
                htmlFor="campaign-image"
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <Upload className="w-4 h-4" />
                <span>Escolher Imagem</span>
              </label>
              {newCampaign.image && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">{newCampaign.image.name}</span>
                  <button
                    onClick={() => setNewCampaign(prev => ({ ...prev, image: null }))}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Público-Alvo
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                onClick={() => setNewCampaign(prev => ({ ...prev, targetType: 'all' }))}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  newCampaign.targetType === 'all' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <Users className="w-6 h-6 text-blue-500 mb-2" />
                <h4 className="font-medium text-gray-900">Todos os Clientes</h4>
                <p className="text-sm text-gray-500">
                  {mockClients.filter(c => c.isActive).length} clientes ativos
                </p>
              </div>

              <div
                onClick={() => setNewCampaign(prev => ({ ...prev, targetType: 'age_range' }))}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  newCampaign.targetType === 'age_range' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <Calendar className="w-6 h-6 text-green-500 mb-2" />
                <h4 className="font-medium text-gray-900">Por Faixa Etária</h4>
                <p className="text-sm text-gray-500">Segmentar por idade</p>
              </div>

              <div
                onClick={() => setNewCampaign(prev => ({ ...prev, targetType: 'gender' }))}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  newCampaign.targetType === 'gender' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <User className="w-6 h-6 text-purple-500 mb-2" />
                <h4 className="font-medium text-gray-900">Por Gênero</h4>
                <p className="text-sm text-gray-500">Masculino ou Feminino</p>
              </div>

              <div
                onClick={() => setNewCampaign(prev => ({ ...prev, targetType: 'custom' }))}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  newCampaign.targetType === 'custom' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
              >
                <Target className="w-6 h-6 text-orange-500 mb-2" />
                <h4 className="font-medium text-gray-900">Seleção Manual</h4>
                <p className="text-sm text-gray-500">Escolher clientes específicos</p>
              </div>
            </div>

            {/* Target Configuration */}
            {newCampaign.targetType === 'age_range' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Idade Mínima</label>
                    <input
                      type="number"
                      value={newCampaign.ageMin}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, ageMin: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Idade Máxima</label>
                    <input
                      type="number"
                      value={newCampaign.ageMax}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, ageMax: parseInt(e.target.value) || 120 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="0"
                      max="120"
                    />
                  </div>
                </div>
                <p className="text-sm text-green-700 mt-2">
                  {getTargetedClientsCount()} clientes nesta faixa etária
                </p>
              </div>
            )}

            {newCampaign.targetType === 'gender' && (
              <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="M"
                      checked={newCampaign.gender === 'M'}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' }))}
                      className="mr-2"
                    />
                    Masculino
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="F"
                      checked={newCampaign.gender === 'F'}
                      onChange={(e) => setNewCampaign(prev => ({ ...prev, gender: e.target.value as 'M' | 'F' }))}
                      className="mr-2"
                    />
                    Feminino
                  </label>
                </div>
                <p className="text-sm text-purple-700 mt-2">
                  {getTargetedClientsCount()} clientes do gênero {newCampaign.gender === 'M' ? 'masculino' : 'feminino'}
                </p>
              </div>
            )}

            {newCampaign.targetType === 'custom' && (
              <div className="mt-4">
                <button
                  onClick={() => setActiveTab('clients')}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Selecionar Clientes ({selectedClients.length} selecionados)
                </button>
              </div>
            )}
          </div>

          {/* Scheduling */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Agendamento (Opcional)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Data</label>
                <input
                  type="date"
                  value={newCampaign.scheduledDate}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Horário</label>
                <input
                  type="time"
                  value={newCampaign.scheduledTime}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Deixe em branco para enviar imediatamente
            </p>
          </div>

          {/* Preview */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-900 mb-3">Prévia da Mensagem:</h4>
            <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-md">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  {newCampaign.image && (
                    <div className="mb-3">
                      <div className="w-48 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-gray-900 whitespace-pre-line">
                    {newCampaign.message || 'Digite sua mensagem acima para ver a prévia...'}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Será enviada para {getTargetedClientsCount()} cliente(s)
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Salvar Rascunho
            </button>
            <button
              onClick={handleCreateCampaign}
              disabled={!newCampaign.name || !newCampaign.message || isCreatingCampaign}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isCreatingCampaign ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Criando...</span>
                </>
              ) : newCampaign.scheduledDate ? (
                <>
                  <Clock className="w-4 h-4" />
                  <span>Agendar Campanha</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Agora</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {campaignSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="font-medium text-green-900">Campanha criada com sucesso!</p>
            <p className="text-sm text-green-700">
              {newCampaign.scheduledDate 
                ? `Agendada para ${new Date(newCampaign.scheduledDate).toLocaleDateString('pt-BR')} às ${newCampaign.scheduledTime}`
                : 'Enviando mensagens agora...'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderClientsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Selecionar Clientes para Campanha
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={selectAllFilteredClients}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            Selecionar Todos ({filteredClients.length})
          </button>
          <button
            onClick={clearSelection}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Limpar Seleção
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            Continuar ({selectedClients.length} selecionados)
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes por nome, telefone ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              onClick={() => toggleClientSelection(client.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                selectedClients.includes(client.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedClients.includes(client.id)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300'
                }`}>
                  {selectedClients.includes(client.id) && (
                    <CheckCircle className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{client.name}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  {client.phone}
                </div>
                {client.email && (
                  <div className="flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    {client.email}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {calculateAge(client.birthDate)} anos • {client.gender === 'M' ? 'Masculino' : 'Feminino'}
                </div>
                {client.lastVaccine && (
                  <div className="text-xs text-blue-600">
                    Última vacina: {client.lastVaccine}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
            <p className="text-gray-500">Ajuste os filtros ou critérios de segmentação</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Entrega</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">95.3%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+2.1% vs. mês anterior</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Leitura</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">71.5%</p>
            </div>
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-sm text-blue-600 mt-2">+5.2% vs. mês anterior</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Resposta</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{avgResponseRate}%</p>
            </div>
            <MessageCircle className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-sm text-purple-600 mt-2">+1.8% vs. mês anterior</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Agendamentos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-sm text-orange-600 mt-2">Gerados pelas campanhas</p>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance das Campanhas</h3>
        <div className="space-y-4">
          {mockCampaigns.filter(c => c.status === 'completed').map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <span className="text-sm text-gray-500">
                  {new Date(campaign.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{campaign.sentCount}</div>
                  <div className="text-xs text-gray-500">Enviadas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{campaign.deliveredCount}</div>
                  <div className="text-xs text-gray-500">Entregues</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{campaign.readCount}</div>
                  <div className="text-xs text-gray-500">Lidas</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{campaign.responseCount}</div>
                  <div className="text-xs text-gray-500">Respostas</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(campaign.responseCount / campaign.sentCount) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Taxa de resposta: {((campaign.responseCount / campaign.sentCount) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
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
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Campanhas de WhatsApp</h1>
              <p className="text-gray-600">Disparo em massa de mensagens para clientes</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'campaigns' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Campanhas
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'create' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Criar
            </button>
            <button
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'clients' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Selecionar Clientes
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Campanhas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalCampaigns}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Campanhas Ativas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeCampaigns}</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mensagens Enviadas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalSent.toLocaleString()}</p>
              </div>
              <Send className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Resposta</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgResponseRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {activeTab === 'campaigns' && renderCampaignsTab()}
        {activeTab === 'create' && renderCreateTab()}
        {activeTab === 'clients' && renderClientsTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </div>
    </div>
  );
};

export default WhatsAppCampaigns;