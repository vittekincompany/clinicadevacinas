import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users,
  MessageSquare,
  Phone,
  Instagram,
  Facebook
} from 'lucide-react';

const Analytics: React.FC = () => {
  const timeRangeData = [
    { hour: '09:00', messages: 12 },
    { hour: '10:00', messages: 18 },
    { hour: '11:00', messages: 25 },
    { hour: '12:00', messages: 30 },
    { hour: '13:00', messages: 22 },
    { hour: '14:00', messages: 35 },
    { hour: '15:00', messages: 28 },
    { hour: '16:00', messages: 20 },
    { hour: '17:00', messages: 15 }
  ];

  const channelPerformance = [
    { channel: 'WhatsApp', icon: Phone, messages: 245, avgResponse: '1m 45s', satisfaction: 4.8, color: 'text-green-500' },
    { channel: 'Instagram', icon: Instagram, messages: 156, avgResponse: '3m 12s', satisfaction: 4.6, color: 'text-pink-500' },
    { channel: 'Facebook', icon: Facebook, messages: 89, avgResponse: '4m 30s', satisfaction: 4.4, color: 'text-blue-600' }
  ];

  const maxMessages = Math.max(...timeRangeData.map(d => d.messages));

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Relatórios e Analytics</h1>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option>Últimos 7 dias</option>
          <option>Últimos 30 dias</option>
          <option>Este mês</option>
          <option>Mês anterior</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Mensagens</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+23%</span>
            <span className="text-sm text-gray-500 ml-1">vs. período anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tempo Médio de Resposta</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">2m 30s</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-15%</span>
            <span className="text-sm text-gray-500 ml-1">melhor que antes</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contatos Ativos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">342</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+8%</span>
            <span className="text-sm text-gray-500 ml-1">novos contatos</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Satisfação</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">4.7</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+0.3</span>
            <span className="text-sm text-gray-500 ml-1">pontos</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages by Hour */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Mensagens por Horário</h3>
          <div className="space-y-4">
            {timeRangeData.map((data, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 w-12">{data.hour}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(data.messages / maxMessages) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 w-8">{data.messages}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance por Canal</h3>
          <div className="space-y-6">
            {channelPerformance.map((channel, index) => (
              <div key={index} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <channel.icon className={`w-5 h-5 ${channel.color}`} />
                    <span className="font-medium text-gray-900">{channel.channel}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{channel.messages}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Tempo médio:</span>
                    <span className="font-medium text-gray-900 ml-1">{channel.avgResponse}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Satisfação:</span>
                    <span className="font-medium text-gray-900 ml-1">{channel.satisfaction}/5</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Response Time Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Tendências de Tempo de Resposta</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">Respondidas em &lt; 5min</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-3xl font-bold text-yellow-600 mb-2">12%</div>
            <div className="text-sm text-gray-600">Respondidas em 5-15min</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">3%</div>
            <div className="text-sm text-gray-600">Respondidas em &gt; 15min</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Analytics;