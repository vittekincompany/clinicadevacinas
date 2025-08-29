import React, { useState } from 'react';
import { 
  Sparkles, 
  Instagram, 
  Facebook, 
  Edit, 
  Save, 
  Send, 
  Image as ImageIcon,
  Clock,
  CheckCircle,
  FileText,
  Copy,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Calendar,
  Eye
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  status: 'published' | 'draft';
  channels: ('instagram' | 'facebook')[];
}

const MarketingAI: React.FC = () => {
  const [activeView, setActiveView] = useState<'create' | 'preview' | 'history'>('create');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    title: string;
    content: string;
    image?: string;
    postType: 'feed' | 'reels' | 'stories';
  } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [selectedPostType, setSelectedPostType] = useState<'feed' | 'reels' | 'stories'>('feed');

  const templates = [
    {
      id: 'flu-campaign',
      title: 'Campanha da Gripe'
    },
    {
      id: 'hpv-women',
      title: 'HPV para Mulheres'
    },
    {
      id: 'hpv-men',
      title: 'HPV para Homens'
    },
    {
      id: 'bcg-vaccine',
      title: 'Vacina BCG'
    },
    {
      id: 'hepatitis-b',
      title: 'Hepatite B'
    },
    {
      id: 'measles-vaccine',
      title: 'Vacina do Sarampo'
    },
    {
      id: 'yellow-fever',
      title: 'Febre Amarela'
    },
    {
      id: 'tetanus-vaccine',
      title: 'Vacina Antitetânica'
    }
  ];

  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Campanha da gripe em idosos',
      content: '🩺 Proteja-se contra a gripe! A vacinação é essencial para idosos acima de 60 anos. Agende sua consulta e mantenha sua saúde em dia. #VacinaçãoIdosos #SaúdePrevention',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      createdAt: '2025-01-25 14:30',
      status: 'published',
      channels: ['instagram', 'facebook']
    },
    {
      id: '2',
      title: 'Vacinação infantil obrigatória',
      content: '👶 Mantenha o calendário de vacinação do seu filho em dia! Vacinas salvam vidas e protegem nossa comunidade. Consulte nosso pediatra para mais informações. #VacinaçãoInfantil #SaúdeCriança',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      createdAt: '2025-01-24 10:15',
      status: 'draft',
      channels: ['instagram']
    }
  ];

  const handleTemplateSelect = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    setIsGenerating(true);
    setSelectedTemplate(templateId);

    // Simular chamada para webhook n8n
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simular delay da API
      
      // Conteúdo mockado baseado no template
      const mockContent = {
        title: template.title,
        content: generateMockContent(template.title),
        image: getImageByPostType(selectedPostType),
        postType: selectedPostType
      };

      setGeneratedContent(mockContent);
      setActiveView('preview');
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomPrompt = async () => {
    if (!customPrompt.trim()) return;

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockContent = {
        title: 'Campanha Personalizada',
        content: generateMockContent(customPrompt),
        image: getImageByPostType(selectedPostType),
        postType: selectedPostType
      };

      setGeneratedContent(mockContent);
      setActiveView('preview');
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockContent = (prompt: string): string => {
    const contents = [
      '🩺 Cuide da sua saúde! Nossa clínica está aqui para oferecer o melhor atendimento. Agende sua consulta e mantenha-se sempre saudável. #Saúde #BemEstar #Prevenção',
      '💙 Sua saúde é nossa prioridade! Oferecemos atendimento humanizado e tecnologia de ponta. Venha nos conhecer! #AtendimentoHumanizado #Saúde #Cuidado',
      '🌟 Prevenção é o melhor remédio! Mantenha seus exames em dia e cuide da sua família. Estamos aqui para ajudar! #Prevenção #SaúdeFamiliar #Cuidado'
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const getImageByPostType = (postType: 'feed' | 'reels' | 'stories') => {
    switch (postType) {
      case 'feed':
        return 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=1080&h=1080&fit=crop'; // 1:1 quadrado
      case 'reels':
        return 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=1080&h=1920&fit=crop'; // 9:16 vertical
      case 'stories':
        return 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=1080&h=1920&fit=crop'; // 9:16 vertical
      default:
        return 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=1080&h=1080&fit=crop';
    }
  };

  const getPostTypeLabel = (postType: 'feed' | 'reels' | 'stories') => {
    switch (postType) {
      case 'feed': return 'Feed (1:1)';
      case 'reels': return 'Reels (9:16)';
      case 'stories': return 'Stories (9:16)';
      default: return postType;
    }
  };

  const getPostTypeDimensions = (postType: 'feed' | 'reels' | 'stories') => {
    switch (postType) {
      case 'feed': return 'max-w-md mx-auto'; // Quadrado
      case 'reels': return 'max-w-xs mx-auto'; // Vertical
      case 'stories': return 'max-w-xs mx-auto'; // Vertical
      default: return 'max-w-md mx-auto';
    }
  };

  const handlePublish = async (channels: ('instagram' | 'facebook')[]) => {
    if (!generatedContent) return;

    setIsPublishing(true);

    try {
      // Simular chamada para webhook de publicação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        setActiveView('history');
      }, 3000);
    } catch (error) {
      console.error('Erro ao publicar:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const renderCreateView = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar Nova Campanha</h2>
        <p className="text-gray-600">Escolha um modelo pronto ou crie com seu próprio prompt</p>
      </div>

      {/* Modelos Prontos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-blue-500" />
          Usar Modelo Pronto
        </h3>
        
        {/* Seleção do Tipo de Postagem */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Postagem
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedPostType('feed')}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedPostType === 'feed' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <div className="text-sm font-medium text-gray-900">Feed</div>
              <div className="text-xs text-gray-500">Quadrado 1:1</div>
              <div className="text-xs text-gray-400">1080x1080px</div>
            </button>
            
            <button
              onClick={() => setSelectedPostType('reels')}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedPostType === 'reels' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-7 bg-purple-500 rounded"></div>
              </div>
              <div className="text-sm font-medium text-gray-900">Reels</div>
              <div className="text-xs text-gray-500">Vertical 9:16</div>
              <div className="text-xs text-gray-400">1080x1920px</div>
            </button>
            
            <button
              onClick={() => setSelectedPostType('stories')}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedPostType === 'stories' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-7 bg-pink-500 rounded"></div>
              </div>
              <div className="text-sm font-medium text-gray-900">Stories</div>
              <div className="text-xs text-gray-500">Vertical 9:16</div>
              <div className="text-xs text-gray-400">1080x1920px</div>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                selectedTemplate === template.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <h4 className="font-medium text-gray-900 mb-2">{template.title}</h4>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prompt Personalizado */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
          Criar com Prompt Personalizado
        </h3>
        
        {/* Seleção do Tipo de Postagem */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Postagem
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedPostType('feed')}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedPostType === 'feed' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
              <div className="text-sm font-medium text-gray-900">Feed</div>
              <div className="text-xs text-gray-500">Quadrado 1:1</div>
              <div className="text-xs text-gray-400">1080x1080px</div>
            </button>
            
            <button
              onClick={() => setSelectedPostType('reels')}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedPostType === 'reels' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-7 bg-purple-500 rounded"></div>
              </div>
              <div className="text-sm font-medium text-gray-900">Reels</div>
              <div className="text-xs text-gray-500">Vertical 9:16</div>
              <div className="text-xs text-gray-400">1080x1920px</div>
            </button>
            
            <button
              onClick={() => setSelectedPostType('stories')}
              className={`p-4 border-2 rounded-lg transition-all text-center ${
                selectedPostType === 'stories' 
                  ? 'border-pink-500 bg-pink-50' 
                  : 'border-gray-200 hover:border-pink-300'
              }`}
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <div className="w-4 h-7 bg-pink-500 rounded"></div>
              </div>
              <div className="text-sm font-medium text-gray-900">Stories</div>
              <div className="text-xs text-gray-500">Vertical 9:16</div>
              <div className="text-xs text-gray-400">1080x1920px</div>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Descreva a campanha que deseja criar (ex: campanha da gripe em tom acolhedor com foco em idosos)"
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          <button
            onClick={handleCustomPrompt}
            disabled={!customPrompt.trim() || isGenerating}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Gerando conteúdo...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Conteúdo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Gerando conteúdo com IA...</h3>
          <p className="text-gray-600">Isso pode levar alguns segundos</p>
        </div>
      )}
    </div>
  );

  const renderPreviewView = () => {
    if (!generatedContent) return null;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveView('create')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Visualizar Campanha</h2>
          <div></div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Preview do Post */}
          <div className="p-6">
            <div className="text-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                {getPostTypeLabel(generatedContent.postType)}
              </span>
            </div>
            <div className={`${getPostTypeDimensions(generatedContent.postType)} bg-white border border-gray-200 rounded-lg overflow-hidden`}>
              {generatedContent.image && (
                <img 
                  src={generatedContent.image} 
                  alt="Preview"
                  className={`w-full object-cover ${
                    generatedContent.postType === 'feed' ? 'h-64' : 'h-80'
                  }`}
                />
              )}
              <div className="p-4">
                <p className="text-gray-900 text-sm leading-relaxed">
                  {generatedContent.content}
                </p>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Edit className="w-4 h-4" />
                <span>Editar texto</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ImageIcon className="w-4 h-4" />
                <span>Gerar nova imagem</span>
              </button>
              
              <button
                onClick={() => handlePublish(['instagram', 'facebook'])}
                disabled={isPublishing}
                className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 ${
                  generatedContent.postType === 'feed' ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' :
                  generatedContent.postType === 'reels' ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' :
                  'bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700'
                }`}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publicando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Publicar {getPostTypeLabel(generatedContent.postType)} no Instagram/Facebook</span>
                  </>
                )}
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Save className="w-4 h-4" />
                <span>Salvar como rascunho</span>
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {publishSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-900">Post publicado com sucesso!</p>
              <p className="text-sm text-green-700">
                Publicado em Instagram e Facebook às {new Date().toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderHistoryView = () => (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Histórico de Campanhas</h2>
        <button
          onClick={() => setActiveView('create')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Nova Campanha</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{campaign.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {campaign.createdAt}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {campaign.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {campaign.channels.includes('instagram') && (
                    <Instagram className="w-4 h-4 text-pink-500" />
                  )}
                  {campaign.channels.includes('facebook') && (
                    <Facebook className="w-4 h-4 text-blue-600" />
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                {campaign.image && (
                  <img 
                    src={campaign.image} 
                    alt="Campaign"
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                  {campaign.content}
                </p>
              </div>

              <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Eye className="w-3 h-3" />
                  <span>Visualizar</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Copy className="w-3 h-3" />
                  <span>Reutilizar</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketing com IA</h1>
              <p className="text-gray-600">Crie campanhas inteligentes para suas redes sociais</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('create')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'create' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Criar
            </button>
            <button
              onClick={() => setActiveView('history')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'history' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Histórico
            </button>
          </div>
        </div>

        {activeView === 'create' && renderCreateView()}
        {activeView === 'preview' && renderPreviewView()}
        {activeView === 'history' && renderHistoryView()}
      </div>
    </div>
  );
};

export default MarketingAI;
