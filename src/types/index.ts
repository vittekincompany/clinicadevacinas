export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  phone?: string;
  email?: string;
  lastSeen: string;
  channel: 'whatsapp' | 'instagram' | 'facebook';
}

export interface Message {
  id: string;
  contactId: string;
  content: string;
  timestamp: string;
  isFromContact: boolean;
  channel: 'whatsapp' | 'instagram' | 'facebook';
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  contactId: string;
  status: 'pending' | 'active' | 'resolved';
  lastMessage: string;
  lastActivity: string;
  channel: 'whatsapp' | 'instagram' | 'facebook';
  unreadCount: number;
  assignedTo?: string;
}

export interface DashboardStats {
  totalConversations: number;
  pendingTickets: number;
  resolvedToday: number;
  avgResponseTime: string;
  channelStats: {
    whatsapp: number;
    instagram: number;
    facebook: number;
  };
}