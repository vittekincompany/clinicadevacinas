import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Smartphone,
  Key,
  Save,
  Phone,
  Instagram,
  Facebook,
  Zap
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'integrations', label: 'Integrações', icon: Zap },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'general', label: 'Geral', icon: Globe }
  ];

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">JS</span>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">João Silva</h3>
          <p className="text-gray-500">joao.silva@empresa.com</p>
          <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
            Alterar foto
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
          <input
            type="text"
            defaultValue="João Silva"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            defaultValue="joao.silva@empresa.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
          <input
            type="tel"
            defaultValue="+55 11 99999-0000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
          <input
            type="text"
            defaultValue="Atendente"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notificações de Mensagens</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Novas mensagens</h4>
            <p className="text-sm text-gray-500">Receber notificação para cada nova mensagem</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Mensagens não lidas</h4>
            <p className="text-sm text-gray-500">Lembrete para mensagens não respondidas</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Canais de Notificação</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="email" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <label htmlFor="email" className="text-gray-700">Email</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="push" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
            <label htmlFor="push" className="text-gray-700">Notificações push</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="sms" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor="sms" className="text-gray-700">SMS</label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Integrações Disponíveis</h3>
      
      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-8 h-8 text-green-500" />
              <div>
                <h4 className="font-medium text-gray-900">WhatsApp Business</h4>
                <p className="text-sm text-gray-500">Conectar conta do WhatsApp Business</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Conectado
            </span>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Configurar
            </button>
            <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              Desconectar
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Instagram className="w-8 h-8 text-pink-500" />
              <div>
                <h4 className="font-medium text-gray-900">Instagram</h4>
                <p className="text-sm text-gray-500">Conectar perfil comercial do Instagram</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Conectado
            </span>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Configurar
            </button>
            <button className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
              Desconectar
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Facebook className="w-8 h-8 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Facebook</h4>
                <p className="text-sm text-gray-500">Conectar página do Facebook</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              Desconectado
            </span>
          </div>
          <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Conectar
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Senha e Autenticação</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha atual</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nova senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar nova senha</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Autenticação em Duas Etapas</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">2FA via SMS</h4>
            <p className="text-sm text-gray-500">Receber código por SMS</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">App Authenticator</h4>
            <p className="text-sm text-gray-500">Usar app de autenticação</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Preferências Gerais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Português (Brasil)</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuso horário</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>América/São_Paulo</option>
              <option>América/New_York</option>
              <option>Europa/Londres</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Configurações de Interface</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Tema escuro</h4>
            <p className="text-sm text-gray-500">Alternar entre tema claro e escuro</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium text-gray-900">Sons de notificação</h4>
            <p className="text-sm text-gray-500">Reproduzir sons para novas mensagens</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileSettings();
      case 'notifications': return renderNotificationSettings();
      case 'integrations': return renderIntegrationSettings();
      case 'security': return renderSecuritySettings();
      case 'general': return renderGeneralSettings();
      default: return renderProfileSettings();
    }
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {renderTabContent()}
              
              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;