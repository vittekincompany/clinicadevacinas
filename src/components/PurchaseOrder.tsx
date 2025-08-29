import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter,
  Building,
  Phone,
  Mail,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Send,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Save,
  FileText,
  Download,
  Package,
  DollarSign,
  Calendar,
  User,
  Truck,
  CreditCard
} from 'lucide-react';

interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  category: 'vaccines' | 'materials' | 'equipment' | 'services';
  status: 'active' | 'inactive' | 'pending';
  paymentTerms: string;
  deliveryTime: string;
  rating: number;
  lastOrder: string;
  totalOrders: number;
}

interface PurchaseOrderItem {
  id: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'vaccines' | 'materials' | 'equipment';
}

interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'delivered' | 'cancelled';
  createdAt: string;
  expectedDelivery?: string;
  deliveredAt?: string;
  notes?: string;
  createdBy: string;
  approvedBy?: string;
}

const PurchaseOrder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'suppliers' | 'create'>('orders');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);

  const mockSuppliers: Supplier[] = [
    {
      id: '1',
      name: 'Distribuidora Vacinas Brasil Ltda',
      cnpj: '12.345.678/0001-90',
      contact: 'Maria Santos',
      phone: '+55 11 99999-1234',
      email: 'vendas@vacinasbrasil.com',
      address: 'Av. Paulista, 1000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      category: 'vaccines',
      status: 'active',
      paymentTerms: '30 dias',
      deliveryTime: '5-7 dias úteis',
      rating: 4.8,
      lastOrder: '2025-01-20',
      totalOrders: 45
    },
    {
      id: '2',
      name: 'MedSupply Equipamentos Médicos',
      cnpj: '98.765.432/0001-10',
      contact: 'João Silva',
      phone: '+55 11 88888-5678',
      email: 'compras@medsupply.com',
      address: 'Rua Industrial, 500',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04567-890',
      category: 'equipment',
      status: 'active',
      paymentTerms: '45 dias',
      deliveryTime: '10-15 dias úteis',
      rating: 4.5,
      lastOrder: '2025-01-15',
      totalOrders: 23
    },
    {
      id: '3',
      name: 'Materiais Hospitalares ABC',
      cnpj: '11.222.333/0001-44',
      contact: 'Ana Costa',
      phone: '+55 11 77777-9012',
      email: 'vendas@materiaisabc.com',
      address: 'Rua dos Materiais, 200',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '02345-678',
      category: 'materials',
      status: 'active',
      paymentTerms: '30 dias',
      deliveryTime: '3-5 dias úteis',
      rating: 4.2,
      lastOrder: '2025-01-18',
      totalOrders: 67
    },
    {
      id: '4',
      name: 'Laboratório Farmacêutico XYZ',
      cnpj: '22.333.444/0001-55',
      contact: 'Dr. Carlos Oliveira',
      phone: '+55 11 66666-3456',
      email: 'comercial@labxyz.com',
      address: 'Av. das Indústrias, 1500',
      city: 'Guarulhos',
      state: 'SP',
      zipCode: '07123-456',
      category: 'vaccines',
      status: 'pending',
      paymentTerms: '60 dias',
      deliveryTime: '7-10 dias úteis',
      rating: 4.6,
      lastOrder: '2024-12-10',
      totalOrders: 12
    }
  ];

  const mockOrders: PurchaseOrder[] = [
    {
      id: '1',
      orderNumber: 'OC-2025-001',
      supplierId: '1',
      supplierName: 'Distribuidora Vacinas Brasil Ltda',
      items: [
        {
          id: '1',
          productName: 'Vacina Gripe (Influenza)',
          description: 'Vacina trivalente contra influenza - Caixa com 50 doses',
          quantity: 100,
          unitPrice: 25.50,
          total: 2550.00,
          category: 'vaccines'
        },
        {
          id: '2',
          productName: 'Vacina HPV',
          description: 'Vacina contra HPV quadrivalente - Caixa com 10 doses',
          quantity: 50,
          unitPrice: 320.00,
          total: 16000.00,
          category: 'vaccines'
        }
      ],
      subtotal: 18550.00,
      taxes: 1855.00,
      shipping: 150.00,
      total: 20555.00,
      status: 'approved',
      createdAt: '2025-01-25 10:30',
      expectedDelivery: '2025-02-01',
      createdBy: 'João Silva',
      approvedBy: 'Dr. Maria Santos'
    },
    {
      id: '2',
      orderNumber: 'OC-2025-002',
      supplierId: '2',
      supplierName: 'MedSupply Equipamentos Médicos',
      items: [
        {
          id: '3',
          productName: 'Seringas Descartáveis 3ml',
          description: 'Seringas descartáveis com agulha - Caixa com 100 unidades',
          quantity: 20,
          unitPrice: 45.00,
          total: 900.00,
          category: 'materials'
        }
      ],
      subtotal: 900.00,
      taxes: 90.00,
      shipping: 50.00,
      total: 1040.00,
      status: 'sent',
      createdAt: '2025-01-24 14:15',
      expectedDelivery: '2025-02-05',
      createdBy: 'Ana Costa'
    },
    {
      id: '3',
      orderNumber: 'OC-2025-003',
      supplierId: '3',
      supplierName: 'Materiais Hospitalares ABC',
      items: [
        {
          id: '4',
          productName: 'Algodão Hidrófilo',
          description: 'Algodão hidrófilo estéril - Pacote 500g',
          quantity: 10,
          unitPrice: 12.50,
          total: 125.00,
          category: 'materials'
        },
        {
          id: '5',
          productName: 'Álcool 70%',
          description: 'Álcool etílico 70% - Frasco 1L',
          quantity: 25,
          unitPrice: 8.90,
          total: 222.50,
          category: 'materials'
        }
      ],
      subtotal: 347.50,
      taxes: 34.75,
      shipping: 25.00,
      total: 407.25,
      status: 'draft',
      createdAt: '2025-01-26 09:45',
      createdBy: 'Roberto Lima'
    }
  ];

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    cnpj: '',
    contact: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    category: 'vaccines' as const,
    paymentTerms: '',
    deliveryTime: ''
  });

  const [newOrderItem, setNewOrderItem] = useState({
    productName: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    category: 'vaccines' as const
  });

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'vaccines': return 'Vacinas';
      case 'materials': return 'Materiais';
      case 'equipment': return 'Equipamentos';
      case 'services': return 'Serviços';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'vaccines': return 'bg-blue-100 text-blue-800';
      case 'materials': return 'bg-green-100 text-green-800';
      case 'equipment': return 'bg-purple-100 text-purple-800';
      case 'services': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      case 'draft': return 'Rascunho';
      case 'sent': return 'Enviada';
      case 'approved': return 'Aprovada';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.cnpj.includes(searchTerm) ||
                         supplier.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || supplier.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || supplier.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.includes(searchTerm) ||
                         order.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'sent' || o.status === 'approved').length;
  const totalValue = mockOrders.reduce((sum, o) => sum + o.total, 0);
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;

  const addOrderItem = () => {
    if (!newOrderItem.productName || !newOrderItem.quantity || !newOrderItem.unitPrice) {
      alert('Preencha todos os campos do item');
      return;
    }

    const item: PurchaseOrderItem = {
      id: Date.now().toString(),
      productName: newOrderItem.productName,
      description: newOrderItem.description,
      quantity: newOrderItem.quantity,
      unitPrice: newOrderItem.unitPrice,
      total: newOrderItem.quantity * newOrderItem.unitPrice,
      category: newOrderItem.category
    };

    setOrderItems(prev => [...prev, item]);
    setNewOrderItem({
      productName: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      category: 'vaccines'
    });
  };

  const removeOrderItem = (itemId: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId));
  };

  const calculateOrderTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const taxes = subtotal * 0.1; // 10% de impostos
    const shipping = subtotal > 1000 ? 0 : 50; // Frete grátis acima de R$ 1000
    return {
      subtotal,
      taxes,
      shipping,
      total: subtotal + taxes + shipping
    };
  };

  const renderSuppliersTab = () => (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome, CNPJ ou contato..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as categorias</option>
            <option value="vaccines">Vacinas</option>
            <option value="materials">Materiais</option>
            <option value="equipment">Equipamentos</option>
            <option value="services">Serviços</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativo</option>
            <option value="inactive">Inativo</option>
            <option value="pending">Pendente</option>
          </select>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condições</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                        <div className="text-sm text-gray-500">CNPJ: {supplier.cnpj}</div>
                        <div className="text-xs text-gray-400">{supplier.city}/{supplier.state}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{supplier.contact}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      {supplier.phone}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {supplier.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(supplier.category)}`}>
                      {getCategoryLabel(supplier.category)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Pagamento: {supplier.paymentTerms}</div>
                    <div className="text-sm text-gray-500">Entrega: {supplier.deliveryTime}</div>
                    <div className="text-xs text-gray-400">{supplier.totalOrders} pedidos realizados</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(supplier.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{supplier.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Último pedido: {new Date(supplier.lastOrder).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                      {getStatusLabel(supplier.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Nova Ordem">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderOrdersTab = () => (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por número, fornecedor ou produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="draft">Rascunho</option>
            <option value="sent">Enviada</option>
            <option value="approved">Aprovada</option>
            <option value="delivered">Entregue</option>
            <option value="cancelled">Cancelada</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Itens</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    <div className="text-sm text-gray-500">Por: {order.createdBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.supplierName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.items.length} item(s)</div>
                    <div className="text-sm text-gray-500">
                      {order.items.slice(0, 2).map(item => item.productName).join(', ')}
                      {order.items.length > 2 && '...'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">R$ {order.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Subtotal: R$ {order.subtotal.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                    {order.expectedDelivery && (
                      <div className="text-xs text-gray-500 mt-1">
                        Entrega: {new Date(order.expectedDelivery).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Enviar">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Exportar PDF">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Cancelar">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderCreateTab = () => {
    const totals = calculateOrderTotal();
    
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Nova Ordem de Compra</h3>
          
          {/* Supplier Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Fornecedor *</label>
            <select 
              value={selectedSupplier?.id || ''}
              onChange={(e) => {
                const supplier = mockSuppliers.find(s => s.id === e.target.value);
                setSelectedSupplier(supplier || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um fornecedor</option>
              {mockSuppliers.filter(s => s.status === 'active').map(supplier => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name} - {getCategoryLabel(supplier.category)}
                </option>
              ))}
            </select>
            
            {selectedSupplier && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm text-blue-900">
                  <strong>{selectedSupplier.name}</strong> • {selectedSupplier.contact}
                </div>
                <div className="text-sm text-blue-700">
                  Pagamento: {selectedSupplier.paymentTerms} • Entrega: {selectedSupplier.deliveryTime}
                </div>
              </div>
            )}
          </div>

          {/* Add Items */}
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Adicionar Item</h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produto *</label>
                <input
                  type="text"
                  value={newOrderItem.productName}
                  onChange={(e) => setNewOrderItem(prev => ({ ...prev, productName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do produto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade *</label>
                <input
                  type="number"
                  value={newOrderItem.quantity}
                  onChange={(e) => setNewOrderItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço Unit. *</label>
                <input
                  type="number"
                  step="0.01"
                  value={newOrderItem.unitPrice}
                  onChange={(e) => setNewOrderItem(prev => ({ ...prev, unitPrice: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={newOrderItem.category}
                  onChange={(e) => setNewOrderItem(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="vaccines">Vacinas</option>
                  <option value="materials">Materiais</option>
                  <option value="equipment">Equipamentos</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={addOrderItem}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={newOrderItem.description}
                onChange={(e) => setNewOrderItem(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descrição detalhada do produto (opcional)"
              />
            </div>
          </div>

          {/* Order Items */}
          {orderItems.length > 0 && (
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">Itens da Ordem ({orderItems.length})</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Produto</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qtd</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Preço Unit.</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orderItems.map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500">{item.description}</div>
                          )}
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(item.category)}`}>
                            {getCategoryLabel(item.category)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">R$ {item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">R$ {item.total.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => removeOrderItem(item.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Order Totals */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">R$ {totals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Impostos (10%):</span>
                      <span className="font-medium">R$ {totals.taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Frete:</span>
                      <span className="font-medium">R$ {totals.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-2">
                      <span>Total:</span>
                      <span>R$ {totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Salvar Rascunho
            </button>
            <button 
              disabled={!selectedSupplier || orderItems.length === 0}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Ordem</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ordem de Compra</h1>
              <p className="text-gray-600">Gestão de fornecedores e pedidos de compra</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ordens
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'suppliers' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Fornecedores
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'create' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Criar Ordem
            </button>
            <button
              onClick={() => setShowSupplierModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Fornecedor</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Ordens</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ordens Pendentes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingOrders}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">R$ {(totalValue / 1000).toFixed(0)}k</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Fornecedores Ativos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{activeSuppliers}</p>
              </div>
              <Building className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'suppliers' && renderSuppliersTab()}
        {activeTab === 'create' && renderCreateTab()}

        {/* Modal Novo Fornecedor */}
        {showSupplierModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Novo Fornecedor</h2>
                <button
                  onClick={() => setShowSupplierModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa *</label>
                    <input
                      type="text"
                      value={newSupplier.name}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: Distribuidora ABC Ltda"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CNPJ *</label>
                    <input
                      type="text"
                      value={newSupplier.cnpj}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, cnpj: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pessoa de Contato *</label>
                    <input
                      type="text"
                      value={newSupplier.contact}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, contact: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Nome do responsável"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
                    <input
                      type="tel"
                      value={newSupplier.phone}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+55 11 99999-0000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-mail *</label>
                    <input
                      type="email"
                      value={newSupplier.email}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="contato@empresa.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
                    <select
                      value={newSupplier.category}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="vaccines">Vacinas</option>
                      <option value="materials">Materiais</option>
                      <option value="equipment">Equipamentos</option>
                      <option value="services">Serviços</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
                    <input
                      type="text"
                      value={newSupplier.address}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Rua, número, complemento"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cidade *</label>
                    <input
                      type="text"
                      value={newSupplier.city}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="São Paulo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                    <select
                      value={newSupplier.state}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condições de Pagamento</label>
                    <input
                      type="text"
                      value={newSupplier.paymentTerms}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, paymentTerms: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 30 dias"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prazo de Entrega</label>
                    <input
                      type="text"
                      value={newSupplier.deliveryTime}
                      onChange={(e) => setNewSupplier(prev => ({ ...prev, deliveryTime: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 5-7 dias úteis"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowSupplierModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>Salvar Fornecedor</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseOrder;