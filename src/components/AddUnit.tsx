import React, { useState } from 'react';
import { 
  Plus, 
  Building, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Upload,
  Check,
  AlertCircle,
  Save,
  ArrowLeft
} from 'lucide-react';

const AddUnit: React.FC = () => {
  const [formData, setFormData] = useState({
    clinicName: '',
    cnpj: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    technicalResponsible: '',
    unitType: 'clinic',
    phone: '',
    email: '',
    unitCode: '',
    logo: null as File | null
  });

  const [integrations, setIntegrations] = useState({
    whatsapp: false,
    instagram: false,
    facebook: false,
    stripe: false
  });

  const [modules, setModules] = useState({
    reactivation: false,
    marketing: false,
    clinicalSupport: false,
    adsManager: false,
    inventory: false,
    financial: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      logo: file
    }));
  };

  const handleIntegrationChange = (integration: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: !prev[integration as keyof typeof prev]
    }));
  };

  const handleModuleChange = (module: string) => {
    setModules(prev => ({
      ...prev,
      [module]: !prev[module as keyof typeof prev]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular criação da unidade
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        // Reset form or redirect
        setCurrentStep(1);
        setFormData({
          clinicName: '',
          cnpj: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          technicalResponsible: '',
          unitType: 'clinic',
          phone: '',
          email: '',
          unitCode: '',
          logo: null
        });
        setIntegrations({
          whatsapp: false,
          instagram: false,
          facebook: false,
          stripe: false
        });
        setModules({
          reactivation: false,
          marketing: false,
          clinicalSupport: false,
          adsManager: false,
          inventory: false,
          financial: false
        });
      }, 3000);
    } catch (error) {
      console.error('Erro ao criar unidade:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Informações Básicas</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Clínica *
          </label>
          <input
            type="text"
            name="clinicName"
            value={formData.clinicName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Clínica Saúde Total"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CNPJ *
          </label>
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="00.000.000/0000-00"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Endereço Completo *
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Rua, número, complemento"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cidade *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="São Paulo"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione o estado</option>
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="RS">Rio Grande do Sul</option>
            {/* Adicionar outros estados */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CEP *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="00000-000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Responsável Técnico *
          </label>
          <input
            type="text"
            name="technicalResponsible"
            value={formData.technicalResponsible}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Dr. João Silva - CRM 123456"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Unidade *
          </label>
          <select
            name="unitType"
            value={formData.unitType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="clinic">Clínica</option>
            <option value="mobile">Móvel</option>
            <option value="temporary">Posto Temporário</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="+55 11 99999-0000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail Institucional *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="contato@clinica.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Código da Unidade (Opcional)
          </label>
          <input
            type="text"
            name="unitCode"
            value={formData.unitCode}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="UN001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logotipo (Opcional)
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" />
              <span>Escolher arquivo</span>
            </label>
            {formData.logo && (
              <span className="text-sm text-green-600">{formData.logo.name}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Configurações Iniciais</h3>
      
      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Ativar Canais de Comunicação</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(integrations).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  key === 'whatsapp' ? 'bg-green-100' :
                  key === 'instagram' ? 'bg-pink-100' :
                  key === 'facebook' ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  {key === 'whatsapp' && <Phone className="w-4 h-4 text-green-600" />}
                  {key === 'instagram' && <span className="text-pink-600 font-bold text-xs">IG</span>}
                  {key === 'facebook' && <span className="text-blue-600 font-bold text-xs">FB</span>}
                  {key === 'stripe' && <span className="text-purple-600 font-bold text-xs">$</span>}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {key === 'whatsapp' ? 'WhatsApp' :
                     key === 'instagram' ? 'Instagram' :
                     key === 'facebook' ? 'Facebook' :
                     'Stripe'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {key === 'stripe' ? 'Pagamentos' : 'Mensagens'}
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleIntegrationChange(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-md font-medium text-gray-900 mb-4">Selecionar Módulos Ativos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(modules).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  {key === 'reactivation' ? 'Reativação de Clientes' :
                   key === 'marketing' ? 'Marketing com IA' :
                   key === 'clinicalSupport' ? 'Suporte Clínico' :
                   key === 'adsManager' ? 'Gerenciar Anúncios' :
                   key === 'inventory' ? 'Controle de Estoque' :
                   'Gestão Financeira'}
                </p>
                <p className="text-sm text-gray-500">
                  {key === 'reactivation' ? 'Campanhas automáticas' :
                   key === 'marketing' ? 'Criação de conteúdo' :
                   key === 'clinicalSupport' ? 'Assistente médico' :
                   key === 'adsManager' ? 'Facebook/Instagram Ads' :
                   key === 'inventory' ? 'Vacinas e materiais' :
                   'Faturamento e pagamentos'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleModuleChange(key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Revisão e Confirmação</h3>
      
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Informações da Clínica</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-600">Nome:</span> <span className="font-medium">{formData.clinicName}</span></div>
            <div><span className="text-gray-600">CNPJ:</span> <span className="font-medium">{formData.cnpj}</span></div>
            <div><span className="text-gray-600">Tipo:</span> <span className="font-medium">{formData.unitType}</span></div>
            <div><span className="text-gray-600">Responsável:</span> <span className="font-medium">{formData.technicalResponsible}</span></div>
            <div className="md:col-span-2"><span className="text-gray-600">Endereço:</span> <span className="font-medium">{formData.address}, {formData.city}/{formData.state}</span></div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Canais Ativos</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(integrations).filter(([_, active]) => active).map(([channel]) => (
              <span key={channel} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                {channel}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Módulos Selecionados</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(modules).filter(([_, active]) => active).map(([module]) => (
              <span key={module} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {module === 'reactivation' ? 'Reativação' :
                 module === 'marketing' ? 'Marketing IA' :
                 module === 'clinicalSupport' ? 'Suporte Clínico' :
                 module === 'adsManager' ? 'Anúncios' :
                 module === 'inventory' ? 'Estoque' :
                 'Financeiro'}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Importante</h4>
            <p className="text-sm text-blue-700 mt-1">
              Após criar a unidade, você receberá um e-mail com as instruções de acesso e configuração inicial. 
              As integrações selecionadas precisarão ser configuradas individualmente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (submitSuccess) {
    return (
      <div className="h-screen overflow-y-auto">
        <div className="p-6">
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unidade Criada com Sucesso!</h2>
            <p className="text-gray-600 mb-6">
              A unidade <strong>{formData.clinicName}</strong> foi adicionada à sua rede. 
              Em breve você receberá um e-mail com as instruções de configuração.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-green-900 mb-2">Próximos Passos:</h3>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• Configure as integrações selecionadas</li>
                <li>• Adicione os colaboradores da unidade</li>
                <li>• Configure o estoque inicial</li>
                <li>• Teste as funcionalidades ativas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cadastrar Nova Unidade</h1>
                <p className="text-gray-600">Adicione uma nova clínica à sua rede</p>
              </div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step === 1 ? 'Informações Básicas' :
                     step === 2 ? 'Configurações' :
                     'Revisão'}
                  </span>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    <span>Próximo</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Criando...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Criar Unidade e Ativar Acesso</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUnit;