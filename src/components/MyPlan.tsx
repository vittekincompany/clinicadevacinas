import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  X, 
  Crown, 
  Star,
  Calendar,
  DollarSign,
  Users,
  MessageSquare,
  Shield,
  Zap,
  BarChart3,
  Settings,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Gift
} from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    users: number;
    conversations: number;
    storage: string;
    channels: number;
  };
  popular?: boolean;
  current?: boolean;
}

interface PaymentHistory {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  method: string;
}

const MyPlan: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const currentPlan = {
    name: 'Plano Profissional',
    price: 149.90,
    billingCycle: 'monthly' as const,
    nextBilling: '2025-02-27',
    status: 'active',
    users: 3,
    maxUsers: 10,
    conversations: 1247,
    maxConversations: 5000,
    storage: '2.3 GB',
    maxStorage: '50 GB'
  };

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Básico',
      price: billingCycle === 'monthly' ? 49.90 : 499.90,
      billingCycle,
      features: [
        'Até 3 usuários',
        '1.000 conversas/mês',
        '10 GB de armazenamento',
        '2 canais (WhatsApp + Instagram)',
        'Suporte por email',
        'Relatórios básicos'
      ],
      limits: {
        users: 3,
        conversations: 1000,
        storage: '10 GB',
        channels: 2
      }
    },
    {
      id: 'professional',
      name: 'Profissional',
      price: billingCycle === 'monthly' ? 149.90 : 1499.90,
      billingCycle,
      features: [
        'Até 10 usuários',
        '5.000 conversas/mês',
        '50 GB de armazenamento',
        '3 canais (WhatsApp + Instagram + Facebook)',
        'IA para marketing e suporte clínico',
        'Reativação de clientes',
        'Suporte prioritário',
        'Relatórios avançados'
      ],
      limits: {
        users: 10,
        conversations: 5000,
        storage: '50 GB',
        channels: 3
      },
      popular: true,
      current: true
    },
    {
      id: 'enterprise',
      name: 'Empresarial',
      price: billingCycle === 'monthly' ? 299.90 : 2999.90,
      billingCycle,
      features: [
        'Usuários ilimitados',
        'Conversas ilimitadas',
        '200 GB de armazenamento',
        'Todos os canais disponíveis',
        'IA avançada personalizada',
        'Gerenciador de anúncios',
        'API personalizada',
        'Suporte 24/7',
        'Relatórios personalizados',
        'Treinamento da equipe'
      ],
      limits: {
        users: 999,
        conversations: 999999,
        storage: '200 GB',
        channels: 10
      }
    }
  ];

  const paymentHistory: PaymentHistory[] = [
    {
      id: '1',
      date: '2025-01-27',
      amount: 149.90,
      status: 'paid',
      description: 'Plano Profissional - Janeiro 2025',
      method: 'Cartão de Crédito'
    },
    {
      id: '2',
      date: '2024-12-27',
      amount: 149.90,
      status: 'paid',
      description: 'Plano Profissional - Dezembro 2024',
      method: 'Cartão de Crédito'
    },
    {
      id: '3',
      date: '2024-11-27',
      amount: 149.90,
      status: 'paid',
      description: 'Plano Profissional - Novembro 2024',
      method: 'PIX'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'failed': return 'Falhou';
      default: return status;
    }
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
    setShowUpgradeModal(true);
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meu Plano</h1>
              <p className="text-gray-600">Gerencie sua assinatura e pagamentos</p>
            </div>
          </div>
        </div>

        {/* Current Plan Status */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl shadow-sm text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Crown className="w-6 h-6" />
                <h2 className="text-xl font-bold">{currentPlan.name}</h2>
                <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm font-medium">
                  Ativo
                </span>
              </div>
              <p className="text-purple-100 mb-4">
                Próxima cobrança: {new Date(currentPlan.nextBilling).toLocaleDateString('pt-BR')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-purple-200 text-sm">Usuários</p>
                  <p className="font-semibold">{currentPlan.users}/{currentPlan.maxUsers}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Conversas</p>
                  <p className="font-semibold">{currentPlan.conversations.toLocaleString()}/{currentPlan.maxConversations.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Armazenamento</p>
                  <p className="font-semibold">{currentPlan.storage}/{currentPlan.maxStorage}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Valor Mensal</p>
                  <p className="font-semibold">R$ {currentPlan.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold mb-2">R$ {currentPlan.price.toFixed(2)}</div>
              <div className="text-purple-200">por mês</div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-medium text-gray-900">Usuários</span>
              </div>
              <span className="text-sm text-gray-500">{currentPlan.users}/{currentPlan.maxUsers}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(currentPlan.users / currentPlan.maxUsers) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-green-500" />
                <span className="font-medium text-gray-900">Conversas</span>
              </div>
              <span className="text-sm text-gray-500">{currentPlan.conversations.toLocaleString()}/{currentPlan.maxConversations.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${(currentPlan.conversations / currentPlan.maxConversations) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="font-medium text-gray-900">Armazenamento</span>
              </div>
              <span className="text-sm text-gray-500">{currentPlan.storage}/{currentPlan.maxStorage}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: '4.6%' }} // 2.3GB / 50GB
              />
            </div>
          </div>
        </div>

        {/* Plan Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Planos Disponíveis</h3>
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Mensal
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'yearly' ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
              <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Anual
              </span>
              {billingCycle === 'yearly' && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  2 meses grátis
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border-2 rounded-xl p-6 relative ${
                  plan.current 
                    ? 'border-purple-500 bg-purple-50' 
                    : plan.popular 
                      ? 'border-blue-500' 
                      : 'border-gray-200'
                }`}
              >
                {plan.popular && !plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Plano Atual
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    R$ {plan.price.toFixed(2)}
                  </div>
                  <div className="text-gray-500">
                    por {plan.billingCycle === 'monthly' ? 'mês' : 'ano'}
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => !plan.current && handlePlanChange(plan.id)}
                  disabled={plan.current}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.current
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.current ? 'Plano Atual' : 'Selecionar Plano'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Histórico de Pagamentos</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      R$ {payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {getStatusLabel(payment.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <CreditCard className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Atualizar Cartão</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Renovar Agora</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Gift className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Cupom Desconto</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Relatório Uso</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MyPlan