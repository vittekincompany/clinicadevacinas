import React from 'react';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Phone,
  Instagram,
  Facebook
} from 'lucide-react';
import { dashboardStats } from '../data/mockData';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total de Conversas',
      value: dashboardStats.totalConversations,
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Tickets Pendentes',
      value: dashboardStats.pendingTickets,
      icon: AlertCircle,
      color: 'bg-orange-500',
      change: '-8%'
    },
    {
      title: 'Resolvidos Hoje',
      value: dashboardStats.resolvedToday,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+25%'
    },
    {
      title: 'Tempo Médio',
      value: dashboardStats.avgResponseTime,
      icon: Clock,
      color: 'bg-purple-500',
      change: '-15%'
    }
  ];

  const channelIcons = {
    whatsapp: Phone,
    instagram: Instagram,
    facebook: Facebook
  };

  const channelColors = {
    whatsapp: 'bg-green-500',
    instagram: 'bg-pink-500',
    facebook: 'bg-blue-600'
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Atualizado há 2 minutos
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Canal</h3>
          <div className="space-y-4">
            {Object.entries(dashboardStats.channelStats).map(([channel, count]) => {
              const Icon = channelIcons[channel as keyof typeof channelIcons];
              const colorClass = channelColors[channel as keyof typeof channelColors];
              const percentage = Math.round((count / dashboardStats.totalConversations) * 100);
              
              return (
                <div key={channel} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 ${colorClass} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 capitalize">{channel}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 ${colorClass} rounded-full`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 w-12 text-right">
                      {count} ({percentage}%)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ticket #1234 resolvido</p>
                <p className="text-xs text-gray-500">5 minutos atrás</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nova mensagem de Maria Silva</p>
                <p className="text-xs text-gray-500">8 minutos atrás</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ticket pendente há 1 hora</p>
                <p className="text-xs text-gray-500">1 hora atrás</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;