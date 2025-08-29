import { Contact, Message, Conversation, DashboardStats } from '../types';

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Maria Silva',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    phone: '+55 11 99999-1234',
    lastSeen: '2 min atrás',
    channel: 'whatsapp'
  },
  {
    id: '2',
    name: 'João Santos',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop',
    phone: '+55 11 88888-5678',
    lastSeen: '5 min atrás',
    channel: 'instagram'
  },
  {
    id: '3',
    name: 'Ana Costa',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    email: 'ana.costa@email.com',
    lastSeen: '10 min atrás',
    channel: 'facebook'
  },
  {
    id: '4',
    name: 'Carlos Oliveira',
    phone: '+55 11 77777-9012',
    lastSeen: '15 min atrás',
    channel: 'whatsapp'
  },
  {
    id: '5',
    name: 'Luiza Ferreira',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?w=100&h=100&fit=crop',
    lastSeen: '1 hora atrás',
    channel: 'instagram'
  }
];

export const messages: Message[] = [
  {
    id: '1',
    contactId: '1',
    content: 'Olá! Gostaria de saber mais sobre os seus produtos.',
    timestamp: '2025-01-27 14:30',
    isFromContact: true,
    channel: 'whatsapp',
    status: 'read'
  },
  {
    id: '2',
    contactId: '1',
    content: 'Oi Maria! Claro, ficarei feliz em ajudar. Que tipo de produto você tem interesse?',
    timestamp: '2025-01-27 14:32',
    isFromContact: false,
    channel: 'whatsapp',
    status: 'read'
  },
  {
    id: '3',
    contactId: '1',
    content: 'Estou procurando algo para casa, na faixa de R$ 500.',
    timestamp: '2025-01-27 14:35',
    isFromContact: true,
    channel: 'whatsapp',
    status: 'read'
  },
  {
    id: '4',
    contactId: '2',
    content: 'Vi seu post no Instagram e fiquei interessado!',
    timestamp: '2025-01-27 14:25',
    isFromContact: true,
    channel: 'instagram',
    status: 'delivered'
  },
  {
    id: '5',
    contactId: '3',
    content: 'Preciso de ajuda com meu pedido #1234',
    timestamp: '2025-01-27 14:20',
    isFromContact: true,
    channel: 'facebook',
    status: 'sent'
  }
];

export const conversations: Conversation[] = [
  {
    id: '1',
    contactId: '1',
    status: 'active',
    lastMessage: 'Estou procurando algo para casa, na faixa de R$ 500.',
    lastActivity: '2025-01-27 14:35',
    channel: 'whatsapp',
    unreadCount: 0,
    assignedTo: 'Você'
  },
  {
    id: '2',
    contactId: '2',
    status: 'pending',
    lastMessage: 'Vi seu post no Instagram e fiquei interessado!',
    lastActivity: '2025-01-27 14:25',
    channel: 'instagram',
    unreadCount: 1
  },
  {
    id: '3',
    contactId: '3',
    status: 'pending',
    lastMessage: 'Preciso de ajuda com meu pedido #1234',
    lastActivity: '2025-01-27 14:20',
    channel: 'facebook',
    unreadCount: 1
  },
  {
    id: '4',
    contactId: '4',
    status: 'resolved',
    lastMessage: 'Obrigado pelo atendimento!',
    lastActivity: '2025-01-27 13:45',
    channel: 'whatsapp',
    unreadCount: 0,
    assignedTo: 'Você'
  },
  {
    id: '5',
    contactId: '5',
    status: 'pending',
    lastMessage: 'Quando vocês vão lançar novos produtos?',
    lastActivity: '2025-01-27 13:30',
    channel: 'instagram',
    unreadCount: 2
  }
];

export const dashboardStats: DashboardStats = {
  totalConversations: 24,
  pendingTickets: 8,
  resolvedToday: 12,
  avgResponseTime: '2m 30s',
  channelStats: {
    whatsapp: 12,
    instagram: 8,
    facebook: 4
  }
};