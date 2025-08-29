import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  DollarSign, 
  Users,
  Eye,
  BarChart3,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Smartphone,
  Bot,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface Campaign {
  id: string;
  name: string;
  objective: 'awareness' | 'traffic' | 'conversions' | 'leads';
  status: 'active' | 'paused' | 'completed' | 'draft';
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  createdWith: 'manual' | 'ai';
}

const AdsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'create' | 'analytics'>('campaigns');
  const [creationMode, setCreationMode] = useState<'manual' | 'ai'>('ai');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Campanha Vacina da Gripe 2025',
      objective: 'conversions',
      status: 'active',
      budget: 500.00,
      spent: 287.50,
      reach: 12500,
      clicks: 450,
      conversions: 23,
      startDate: '2025-01-20',
      endDate: '2025-02-20',
      targetAudience: 'Adultos 40-65 anos, São Paulo',
      createdWith: 'ai'
    },
    {
      id: '2',
      name: 'HPV para Adolescentes',
      objective: 'awareness',
      status: 'active',
      budget: 300.00,
      spent: 156.80,
      reach: 8900,
      clicks: 320,
      conversions: 12,
      startDate: '2025-01-15',
      endDate: '2025-02-15',
      targetAudience: 'Pais de adolescentes 12-17 anos',
      createdWith: 'manual'
    },
    {
      id: '3',
      name: 'Vacinação Infantil Completa',
      objective: 'leads',
      status: 'paused',
      budget: 400.00,
      spent: 89.20,
      reach: 3200,
      clicks: 125,
      conversions: 8,
      startDate: '2025-01-10',
      endDate: '2025-02-10',
      targetAudience: 'Pais com crianças 0-5 anos',
      createdWith: 'ai'
    }
  ];

  const getObjectiveLabel = (objective: string) => {
    switch (objective) {
      case 'awareness': return 'Reconhecimento';
      case 'traffic': return 'Tráfego';
      case 'conversions': return 'Conversões';
      case 'leads': return 'Leads';
      default: return objective;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'paused': return 'Pausada';
      case 'completed': return 'Concluída';
      case 'draft': return 'Rascunho';
      default: return status;
    }
  };

  const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalReach = mockCampaigns.reduce((sum, c) => sum + c.reach, 0);
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0);

  const renderCampaignsTab = () => (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Orçamento Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ {totalBudget.toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Gasto Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ {totalSpent.toFixed(2)}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alcance Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalReach.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversões</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalConversions}</p>
            </div>
            <Target className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campanha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objetivo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orçamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        campaign.createdWith === 'ai' ? 'bg-purple-500' : 'bg-blue-500'
                      }`} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.targetAudience}</div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          {campaign.createdWith === 'ai' ? (
                            <>
                              <Bot className="w-3 h-3 mr-1" />
                              Criada com IA
                            </>
                          ) : (
                            'Criada manualmente'
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getObjectiveLabel(campaign.objective)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">R$ {campaign.budget.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Gasto: R$ {campaign.spent.toFixed(2)}</div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                      <div 
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.reach.toLocaleString()} alcance</div>
                    <div className="text-sm text-gray-500">{campaign.clicks} cliques</div>
                    <div className="text-sm text-green-600">{campaign.conversions} conversões</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {getStatusLabel(campaign.status)}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(campaign.startDate).toLocaleDateString('pt-BR')} - {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Play/Pause">
                        {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

  const renderCreateTab = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Creation Mode Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Como deseja criar sua campanha?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => setCreationMode('ai')}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
              creationMode === 'ai' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-purple-500 mr-3" />
              <h4 className="text-lg font-medium text-gray-900">Criação com IA</h4>
            </div>
            <p className="text-gray-600 mb-4">
              Nossa IA cria campanhas otimizadas automaticamente com base no seu objetivo e público-alvo.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>✓ Segmentação automática</li>
              <li>✓ Textos otimizados</li>
              <li>✓ Orçamento sugerido</li>
              <li>✓ Cronograma inteligente</li>
            </ul>
          </div>

          <div
            onClick={() => setCreationMode('manual')}
            className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
              creationMode === 'manual' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-blue-500 mr-3" />
              <h4 className="text-lg font-medium text-gray-900">Criação Manual</h4>
            </div>
            <p className="text-gray-600 mb-4">
              Controle total sobre todos os aspectos da sua campanha publicitária.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>✓ Controle completo</li>
              <li>✓ Segmentação personalizada</li>
              <li>✓ Textos customizados</li>
              <li>✓ Configurações avançadas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Campaign Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          {creationMode === 'ai' ? (
            <>
              <Bot className="w-5 h-5 mr-2 text-purple-500" />
              Criação Assistida por IA
            </>
          ) : (
            <>
              <Settings className="w-5 h-5 mr-2 text-blue-500" />
              Criação Manual
            </>
          )}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Campanha</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Campanha Vacina da Gripe 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="awareness">Reconhecimento da Marca</option>
              <option value="traffic">Tráfego para Site</option>
              <option value="conversions">Conversões</option>
              <option value="leads">Geração de Leads</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Orçamento Diário</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="50.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duração</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="7">7 dias</option>
              <option value="14">14 dias</option>
              <option value="30">30 dias</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
        </div>

        {creationMode === 'ai' ? (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descreva sua campanha (a IA criará tudo automaticamente)
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: Quero promover a vacina da gripe para adultos entre 40-65 anos em São Paulo, focando na prevenção e cuidado com a saúde..."
            />
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Público-Alvo</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Idade</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="18-65"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Localização</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="São Paulo, SP"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Interesses</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Saúde, Medicina"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Texto do Anúncio</label>
              <textarea
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Proteja-se contra a gripe! Agende sua vacina hoje mesmo..."
              />
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6 space-x-3">
          <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Salvar Rascunho
          </button>
          <button className={`px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors ${
            creationMode === 'ai' ? 'bg-purple-500' : 'bg-blue-500'
          }`}>
            {creationMode === 'ai' ? 'Criar com IA' : 'Criar Campanha'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Avançado</h3>
        <p className="text-gray-500 mb-6">Funcionalidade em desenvolvimento</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Ver Relatórios Detalhados
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Anúncios</h1>
              <p className="text-gray-600">Campanhas de tráfego pago no Meta (Facebook/Instagram)</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'campaigns' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Campanhas
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'create' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Criar
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
          </div>
        </div>

        {activeTab === 'campaigns' && renderCampaignsTab()}
        {activeTab === 'create' && renderCreateTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </div>
    </div>
  );
};

export default AdsManager;