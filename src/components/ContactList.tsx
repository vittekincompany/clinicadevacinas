import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Phone, 
  Instagram, 
  Facebook, 
  Mail, 
  User,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { contacts } from '../data/mockData';

const ContactList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState<string>('all');

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <Phone className="w-4 h-4 text-green-500" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      default: return <Phone className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone?.includes(searchTerm) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = filterChannel === 'all' || contact.channel === filterChannel;
    
    return matchesSearch && matchesChannel;
  });

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contatos</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Novo Contato</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contatos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os canais</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="relative">
                {contact.avatar ? (
                  <img 
                    src={contact.avatar} 
                    alt={contact.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-600" />
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                  {getChannelIcon(contact.channel)}
                </div>
              </div>
              
              <div className="relative">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{contact.name}</h3>
              
              {contact.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
              )}
              
              {contact.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Visto {contact.lastSeen}
                </span>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum contato encontrado
          </h3>
          <p className="text-gray-500">
            {searchTerm ? 'Tente ajustar sua busca' : 'Adicione seu primeiro contato para começar'}
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default ContactList;