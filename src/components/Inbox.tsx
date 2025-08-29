import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Instagram, 
  Facebook,
  Clock,
  User,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  MessageSquare,
  Bot,
  Zap,
  Phone
} from 'lucide-react';
import { conversations, contacts, messages } from '../data/mockData';
import type { Conversation } from '../types';

// Ícone personalizado do WhatsApp
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const Inbox: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [aiEnabled, setAiEnabled] = useState(false);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <WhatsAppIcon className="w-4 h-4 text-green-500" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      default: return <Phone className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChannelIconLarge = (channel: string, isActive: boolean) => {
    const baseClasses = "w-7 h-7";
    switch (channel) {
      case 'whatsapp': 
        return <WhatsAppIcon className={`${baseClasses} ${isActive ? 'text-green-600' : 'text-green-500'}`} />;
      case 'instagram': 
        return <Instagram className={`${baseClasses} ${isActive ? 'text-pink-600' : 'text-pink-500'}`} />;
      case 'facebook': 
        return <Facebook className={`${baseClasses} ${isActive ? 'text-blue-700' : 'text-blue-600'}`} />;
      default: 
        return <MessageSquare className={`${baseClasses} ${isActive ? 'text-gray-700' : 'text-gray-500'}`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'active': return 'Ativo';
      case 'resolved': return 'Resolvido';
      default: return status;
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const channelMatch = activeChannel === 'all' || conv.channel === activeChannel;
    const statusMatch = filterStatus === 'all' || conv.status === filterStatus;
    return channelMatch && statusMatch;
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const selectedContact = selectedConv ? contacts.find(c => c.id === selectedConv.contactId) : null;
  const conversationMessages = messages.filter(m => m.contactId === selectedConv?.contactId);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Simular envio de mensagem
      console.log('Enviando:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Conversation List */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar conversas..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Channel Filter Icons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-3">
              <button
                onClick={() => setActiveChannel('all')}
                className={`p-3 rounded-lg transition-colors ${
                  activeChannel === 'all' 
                    ? 'bg-blue-50 border-2 border-blue-300 shadow-sm' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50 shadow-sm'
                }`}
                title="Todos os canais"
              >
                {getChannelIconLarge('all', activeChannel === 'all')}
              </button>
              
              <button
                onClick={() => setActiveChannel('whatsapp')}
                className={`p-3 rounded-lg transition-colors ${
                  activeChannel === 'whatsapp' 
                    ? 'bg-green-50 border-2 border-green-300 shadow-sm' 
                    : 'bg-white border border-gray-200 hover:bg-green-50 shadow-sm'
                }`}
                title="WhatsApp"
              >
                {getChannelIconLarge('whatsapp', activeChannel === 'whatsapp')}
              </button>
              
              <button
                onClick={() => setActiveChannel('instagram')}
                className={`p-3 rounded-lg transition-colors ${
                  activeChannel === 'instagram' 
                    ? 'bg-pink-50 border-2 border-pink-300 shadow-sm' 
                    : 'bg-white border border-gray-200 hover:bg-pink-50 shadow-sm'
                }`}
                title="Instagram"
              >
                {getChannelIconLarge('instagram', activeChannel === 'instagram')}
              </button>
              
              <button
                onClick={() => setActiveChannel('facebook')}
                className={`p-3 rounded-lg transition-colors ${
                  activeChannel === 'facebook' 
                    ? 'bg-blue-50 border-2 border-blue-300 shadow-sm' 
                    : 'bg-white border border-gray-200 hover:bg-blue-50 shadow-sm'
                }`}
                title="Facebook"
              >
                {getChannelIconLarge('facebook', activeChannel === 'facebook')}
              </button>
            </div>
            
            {/* Toggle IA */}
            <div className="flex items-center space-x-2">
              <Bot className={`w-5 h-5 ${aiEnabled ? 'text-purple-600' : 'text-gray-400'}`} />
              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  aiEnabled ? 'bg-purple-600' : 'bg-gray-300'
                }`}
                title={aiEnabled ? 'IA Ativada' : 'IA Desativada'}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  aiEnabled ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="active">Ativo</option>
              <option value="resolved">Resolvido</option>
            </select>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const contact = contacts.find(c => c.id === conversation.contactId);
            return (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    {contact?.avatar ? (
                      <img 
                        src={contact.avatar} 
                        alt={contact.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1">
                      {getChannelIcon(conversation.channel)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {contact?.name || 'Usuário'}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {conversation.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                          {getStatusLabel(conversation.status)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(conversation.lastActivity).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {conversation.assignedTo && (
                        <span className="text-xs text-blue-600">
                          {conversation.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {selectedContact?.avatar ? (
                      <img 
                        src={selectedContact.avatar} 
                        alt={selectedContact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1">
                      {getChannelIcon(selectedConv?.channel || '')}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="font-medium text-gray-900">
                      {selectedContact?.name || 'Usuário'}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {selectedContact?.lastSeen}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                    <option value="active">Ativo</option>
                    <option value="pending">Pendente</option>
                    <option value="resolved">Resolvido</option>
                  </select>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {conversationMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromContact ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isFromContact
                        ? 'bg-white border border-gray-200 text-gray-900'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isFromContact ? 'text-gray-500' : 'text-blue-100'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              {aiEnabled && (
                <div className="mb-3 p-3 bg-purple-50 border border-purple-200 rounded-lg flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-purple-700">IA ativada - suas mensagens serão otimizadas automaticamente</span>
                </div>
              )}
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  className={`p-2 rounded-lg transition-colors ${
                    aiEnabled 
                      ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {aiEnabled ? <Zap className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selecione uma conversa
              </h3>
              <p className="text-gray-500">
                Escolha uma conversa na lista para começar a responder
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;