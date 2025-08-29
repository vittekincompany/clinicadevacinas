import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  DollarSign, 
  CreditCard, 
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar,
  FileText,
  Download,
  Edit,
  Eye,
  Filter,
  BarChart3,
  Receipt,
  Banknote,
  PiggyBank,
  Calculator,
  Building,
  Printer,
  Send,
  RefreshCw,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  CreditCard as CardIcon,
  Smartphone,
  Shield
} from 'lucide-react';

interface Payment {
  id: string;
  type: 'income' | 'expense';
  patientName?: string;
  patientId?: string;
  description: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'pix' | 'bank_transfer' | 'check' | 'insurance';
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  date: string;
  dueDate?: string;
  category: string;
  professionalName?: string;
  invoiceNumber?: string;
  notes?: string;
}

interface Invoice {
  id: string;
  number: string;
  patientName: string;
  patientId: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  taxes: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  issueDate: string;
  dueDate: string;
  notes?: string;
}

interface CashFlow {
  id: string;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  balance: number;
}

const Financial: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'payments' | 'receivables' | 'invoices' | 'cashflow' | 'reports'>('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockPayments: Payment[] = [
    {
      id: '1',
      type: 'income',
      patientName: 'Maria Silva Santos',
      patientId: '1',
      description: 'Vacina Gripe (Influenza)',
      amount: 80.00,
      paymentMethod: 'card',
      status: 'paid',
      date: '2025-01-25',
      category: 'Vacinação',
      professionalName: 'Ana Paula Silva',
      invoiceNumber: 'NF-001'
    },
    {
      id: '2',
      type: 'income',
      patientName: 'João Pedro Oliveira',
      patientId: '2',
      description: 'Vacina HPV',
      amount: 320.00,
      paymentMethod: 'insurance',
      status: 'paid',
      date: '2025-01-24',
      category: 'Vacinação',
      professionalName: 'Ana Paula Silva'
    },
    {
      id: '3',
      type: 'expense',
      description: 'Compra de vacinas - Fornecedor ABC',
      amount: 1500.00,
      paymentMethod: 'bank_transfer',
      status: 'paid',
      date: '2025-01-23',
      category: 'Estoque'
    },
    {
      id: '4',
      type: 'income',
      patientName: 'Carlos Eduardo Costa',
      patientId: '3',
      description: 'Vacina Hepatite B',
      amount: 150.00,
      paymentMethod: 'pix',
      status: 'pending',
      date: '2025-01-23',
      dueDate: '2025-01-30',
      category: 'Vacinação'
    }
  ];

  const mockInvoices: Invoice[] = [
    {
      id: '1',
      number: 'NF-001',
      patientName: 'Maria Silva Santos',
      patientId: '1',
      items: [
        {
          description: 'Vacina Gripe (Influenza)',
          quantity: 1,
          unitPrice: 80.00,
          total: 80.00
        }
      ],
      subtotal: 80.00,
      taxes: 0.00,
      discount: 0.00,
      total: 80.00,
      status: 'paid',
      issueDate: '2025-01-25',
      dueDate: '2025-01-25'
    },
    {
      id: '2',
      number: 'NF-002',
      patientName: 'João Pedro Oliveira',
      patientId: '2',
      items: [
        {
          description: 'Vacina HPV',
          quantity: 1,
          unitPrice: 320.00,
          total: 320.00
        }
      ],
      subtotal: 320.00,
      taxes: 0.00,
      discount: 0.00,
      total: 320.00,
      status: 'sent',
      issueDate: '2025-01-24',
      dueDate: '2025-02-24'
    }
  ];

  const mockCashFlow: CashFlow[] = [
    {
      id: '1',
      date: '2025-01-25',
      description: 'Vacina Gripe - Maria Silva',
      category: 'Vacinação',
      type: 'income',
      amount: 80.00,
      balance: 5280.00
    },
    {
      id: '2',
      date: '2025-01-24',
      description: 'Vacina HPV - João Pedro',
      category: 'Vacinação',
      type: 'income',
      amount: 320.00,
      balance: 5200.00
    },
    {
      id: '3',
      date: '2025-01-23',
      description: 'Compra de vacinas',
      category: 'Estoque',
      type: 'expense',
      amount: -1500.00,
      balance: 4880.00
    }
  ];

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return <Banknote className="w-4 h-4 text-green-600" />;
      case 'card': return <CardIcon className="w-4 h-4 text-blue-600" />;
      case 'pix': return <Smartphone className="w-4 h-4 text-purple-600" />;
      case 'bank_transfer': return <Building className="w-4 h-4 text-gray-600" />;
      case 'check': return <FileText className="w-4 h-4 text-orange-600" />;
      case 'insurance': return <Shield className="w-4 h-4 text-teal-600" />;
      default: return <Wallet className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'cash': return 'Dinheiro';
      case 'card': return 'Cartão';
      case 'pix': return 'PIX';
      case 'bank_transfer': return 'Transferência';
      case 'check': return 'Cheque';
      case 'insurance': return 'Convênio';
      default: return method;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Pago';
      case 'pending': return 'Pendente';
      case 'overdue': return 'Vencido';
      case 'cancelled': return 'Cancelado';
      case 'draft': return 'Rascunho';
      case 'sent': return 'Enviada';
      default: return status;
    }
  };

  const totalIncome = mockPayments.filter(p => p.type === 'income' && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalExpenses = mockPayments.filter(p => p.type === 'expense' && p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingReceivables = mockPayments.filter(p => p.type === 'income' && p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const overdueAmount = mockPayments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Receita Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ {totalIncome.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12%</span>
            <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Despesas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ {totalExpenses.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <ArrowDownLeft className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
            <span className="text-sm text-red-600">+8%</span>
            <span className="text-sm text-gray-500 ml-1">vs. mês anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">A Receber</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ {pendingReceivables.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lucro Líquido</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">R$ {(totalIncome - totalExpenses).toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Plus className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Novo Recebimento</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Receipt className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Emitir Nota Fiscal</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Send className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Enviar Cobrança</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Relatórios</span>
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Transações Recentes</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver todas</button>
        </div>
        <div className="space-y-3">
          {mockPayments.slice(0, 5).map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {payment.type === 'income' ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="w-4 h-4 text-red-600" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{payment.description}</p>
                  <p className="text-xs text-gray-500">{payment.patientName || 'Sistema'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${payment.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {payment.type === 'income' ? '+' : '-'}R$ {payment.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">{new Date(payment.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por descrição, paciente ou nota fiscal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os tipos</option>
            <option value="income">Receitas</option>
            <option value="expense">Despesas</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="paid">Pago</option>
            <option value="pending">Pendente</option>
            <option value="overdue">Vencido</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Método</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {payment.type === 'income' ? (
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <ArrowDownLeft className="w-4 h-4 text-red-600" />
                        </div>
                      )}
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {payment.type === 'income' ? 'Receita' : 'Despesa'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                    {payment.patientName && (
                      <div className="text-sm text-gray-500">{payment.patientName}</div>
                    )}
                    {payment.invoiceNumber && (
                      <div className="text-xs text-blue-600">{payment.invoiceNumber}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${payment.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {payment.type === 'income' ? '+' : '-'}R$ {payment.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">{payment.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <span className="ml-2">{getPaymentMethodLabel(payment.paymentMethod)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                      {getStatusLabel(payment.status)}
                    </span>
                    {payment.dueDate && payment.status !== 'paid' && (
                      <div className="text-xs text-gray-500 mt-1">
                        Venc: {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Recibo">
                        <Receipt className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Exportar">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notas Fiscais</h3>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Nova Nota Fiscal</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emissão</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vencimento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.patientName}</div>
                    <div className="text-sm text-gray-500">ID: {invoice.patientId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">R$ {invoice.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{invoice.items.length} item(s)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                      {getStatusLabel(invoice.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.issueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(invoice.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Imprimir">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Enviar">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCashFlow = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa</h3>
        <div className="space-y-3">
          {mockCashFlow.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {item.type === 'income' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                  {item.type === 'income' ? '+' : ''}R$ {item.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-900">Saldo: R$ {item.balance.toFixed(2)}</p>
                <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReceivables = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Contas a Receber</h3>
        <p className="text-gray-500 mb-6">Gerencie cobranças e recebimentos pendentes</p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
          Gerenciar Recebimentos
        </button>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Relatórios Financeiros</h3>
        <p className="text-gray-500 mb-6">Análises detalhadas de performance financeira</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            DRE
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
            Fluxo de Caixa
          </button>
          <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
            Balanço
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
              <p className="text-gray-600">Gestão financeira completa da clínica</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'payments' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pagamentos
            </button>
            <button
              onClick={() => setActiveTab('receivables')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'receivables' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              A Receber
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'invoices' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Notas Fiscais
            </button>
            <button
              onClick={() => setActiveTab('cashflow')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'cashflow' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Fluxo de Caixa
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'reports' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Relatórios
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'payments' && renderPayments()}
        {activeTab === 'receivables' && renderReceivables()}
        {activeTab === 'invoices' && renderInvoices()}
        {activeTab === 'cashflow' && renderCashFlow()}
        {activeTab === 'reports' && renderReports()}
      </div>
    </div>
  );
};

export default Financial;