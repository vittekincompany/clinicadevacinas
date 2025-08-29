import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Search, 
  Filter,
  Star,
  MapPin,
  Calendar,
  Clock,
  Shield,
  User,
  Phone,
  Mail,
  CreditCard,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Heart,
  Share2,
  Download,
  Settings,
  Zap,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface Vaccine {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'infantil' | 'adulto' | 'idoso' | 'viagem' | 'ocupacional';
  ageRange: string;
  doses: number;
  interval?: string;
  image: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  isPopular: boolean;
  isPromotion: boolean;
  contraindications: string[];
  benefits: string[];
  availableUnits: string[];
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vaccines: {
    vaccineId: string;
    vaccineName: string;
    quantity: number;
    price: number;
  }[];
  selectedUnit: string;
  selectedDate: string;
  selectedTime: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: 'pix' | 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
  notes?: string;
}

interface StoreSettings {
  isActive: boolean;
  allowOnlinePayment: boolean;
  requireAdvancePayment: boolean;
  cancellationPolicy: string;
  deliveryOptions: string[];
  workingHours: {
    start: string;
    end: string;
  };
  availableDays: string[];
}

const OnlineStore: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings' | 'analytics'>('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Vaccine | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const mockVaccines: Vaccine[] = [
    {
      id: '1',
      name: 'Vacina da Gripe (Influenza)',
      description: 'Proteção anual contra os vírus da gripe mais comuns. Recomendada para todas as idades.',
      price: 80.00,
      originalPrice: 100.00,
      category: 'adulto',
      ageRange: 'A partir de 6 meses',
      doses: 1,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      inStock: true,
      stockCount: 150,
      rating: 4.8,
      reviewsCount: 234,
      isPopular: true,
      isPromotion: true,
      contraindications: ['Alergia ao ovo', 'Febre alta'],
      benefits: ['Previne gripe', 'Reduz complicações', 'Proteção por 1 ano'],
      availableUnits: ['Centro', 'Zona Sul', 'Norte']
    },
    {
      id: '2',
      name: 'Vacina HPV (Quadrivalente)',
      description: 'Proteção contra o papilomavírus humano. Previne câncer de colo do útero e verrugas genitais.',
      price: 320.00,
      category: 'adulto',
      ageRange: '9 a 45 anos',
      doses: 3,
      interval: '0, 2 e 6 meses',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      inStock: true,
      stockCount: 45,
      rating: 4.9,
      reviewsCount: 189,
      isPopular: true,
      isPromotion: false,
      contraindications: ['Gravidez', 'Imunodeficiência'],
      benefits: ['Previne câncer', 'Proteção duradoura', 'Reduz verrugas'],
      availableUnits: ['Centro', 'Zona Sul', 'Norte', 'Oeste']
    },
    {
      id: '3',
      name: 'Vacina Hepatite B',
      description: 'Proteção contra hepatite B. Essencial para profissionais da saúde e grupos de risco.',
      price: 150.00,
      category: 'adulto',
      ageRange: 'Todas as idades',
      doses: 3,
      interval: '0, 1 e 6 meses',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      inStock: true,
      stockCount: 80,
      rating: 4.7,
      reviewsCount: 156,
      isPopular: false,
      isPromotion: false,
      contraindications: ['Alergia à levedura'],
      benefits: ['Proteção hepática', 'Imunidade duradoura', 'Segurança comprovada'],
      availableUnits: ['Centro', 'Norte', 'Leste']
    },
    {
      id: '4',
      name: 'Vacina Tétano (dT)',
      description: 'Proteção contra tétano e difteria. Reforço recomendado a cada 10 anos.',
      price: 50.00,
      category: 'adulto',
      ageRange: 'A partir de 7 anos',
      doses: 1,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      inStock: true,
      stockCount: 200,
      rating: 4.6,
      reviewsCount: 98,
      isPopular: false,
      isPromotion: false,
      contraindications: ['Reação prévia grave'],
      benefits: ['Previne tétano', 'Proteção por 10 anos', 'Segura'],
      availableUnits: ['Centro', 'Zona Sul', 'Norte', 'Oeste', 'Leste']
    },
    {
      id: '5',
      name: 'Vacina COVID-19',
      description: 'Proteção contra COVID-19. Disponível para todas as idades conforme protocolo.',
      price: 40.00,
      category: 'adulto',
      ageRange: 'A partir de 6 meses',
      doses: 2,
      interval: '21 a 28 dias',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      inStock: true,
      stockCount: 300,
      rating: 4.5,
      reviewsCount: 445,
      isPopular: true,
      isPromotion: false,
      contraindications: ['Alergia aos componentes'],
      benefits: ['Previne COVID-19', 'Reduz hospitalização', 'Proteção comunitária'],
      availableUnits: ['Centro', 'Zona Sul', 'Norte', 'Oeste', 'Leste', 'ABC']
    },
    {
      id: '6',
      name: 'Vacina Febre Amarela',
      description: 'Proteção contra febre amarela. Obrigatória para viagens a áreas de risco.',
      price: 120.00,
      category: 'viagem',
      ageRange: '9 meses a 60 anos',
      doses: 1,
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=400&h=400&fit=crop',
      inStock: false,
      stockCount: 0,
      rating: 4.8,
      reviewsCount: 67,
      isPopular: false,
      isPromotion: false,
      contraindications: ['Gravidez', 'Imunossupressão', 'Alergia ao ovo'],
      benefits: ['Proteção vitalícia', 'Obrigatória para viagens', 'Certificado internacional'],
      availableUnits: ['Centro', 'Norte']
    }
  ];

  const mockOrders: Order[] = [
    {
      id: '1',
      customerName: 'Maria Silva Santos',
      customerPhone: '+55 11 99999-1234',
      customerEmail: 'maria.silva@email.com',
      vaccines: [
        {
          vaccineId: '1',
          vaccineName: 'Vacina da Gripe',
          quantity: 1,
          price: 80.00
        }
      ],
      selectedUnit: 'Centro',
      selectedDate: '2025-02-15',
      selectedTime: '09:00',
      totalAmount: 80.00,
      status: 'confirmed',
      paymentMethod: 'pix',
      paymentStatus: 'paid',
      createdAt: '2025-01-27 14:30'
    },
    {
      id: '2',
      customerName: 'João Pedro Oliveira',
      customerPhone: '+55 11 88888-5678',
      customerEmail: 'joao.oliveira@email.com',
      vaccines: [
        {
          vaccineId: '2',
          vaccineName: 'Vacina HPV',
          quantity: 1,
          price: 320.00
        }
      ],
      selectedUnit: 'Zona Sul',
      selectedDate: '2025-02-18',
      selectedTime: '14:30',
      totalAmount: 320.00,
      status: 'pending',
      paymentMethod: 'card',
      paymentStatus: 'pending',
      createdAt: '2025-01-27 10:15'
    },
    {
      id: '3',
      customerName: 'Ana Costa Lima',
      customerPhone: '+55 11 77777-9012',
      customerEmail: 'ana.costa@email.com',
      vaccines: [
        {
          vaccineId: '3',
          vaccineName: 'Vacina Hepatite B',
          quantity: 1,
          price: 150.00
        },
        {
          vaccineId: '4',
          vaccineName: 'Vacina Tétano',
          quantity: 1,
          price: 50.00
        }
      ],
      selectedUnit: 'Norte',
      selectedDate: '2025-02-20',
      selectedTime: '11:00',
      totalAmount: 200.00,
      status: 'completed',
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      createdAt: '2025-01-26 16:45',
      notes: 'Cliente solicitou aplicação no mesmo dia'
    }
  ];

  const storeSettings: StoreSettings = {
    isActive: true,
    allowOnlinePayment: true,
    requireAdvancePayment: false,
    cancellationPolicy: 'Cancelamento gratuito até 24h antes',
    deliveryOptions: ['Clínica', 'Domicílio'],
    workingHours: {
      start: '08:00',
      end: '18:00'
    },
    availableDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'infantil': return 'Infantil';
      case 'adulto': return 'Adulto';
      case 'idoso': return 'Idoso';
      case 'viagem': return 'Viagem';
      case 'ocupacional': return 'Ocupacional';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'infantil': return 'bg-pink-100 text-pink-800';
      case 'adulto': return 'bg-blue-100 text-blue-800';
      case 'idoso': return 'bg-purple-100 text-purple-800';
      case 'viagem': return 'bg-green-100 text-green-800';
      case 'ocupacional': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'paid': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getPaymentStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'paid': return 'Pago';
      case 'failed': return 'Falhou';
      default: return status;
    }
  };

  const filteredVaccines = mockVaccines.filter(vaccine => {
    const matchesSearch = vaccine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaccine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vaccine.category === filterCategory;
    const matchesAvailability = filterAvailability === 'all' || 
                               (filterAvailability === 'in_stock' && vaccine.inStock) ||
                               (filterAvailability === 'out_stock' && !vaccine.inStock);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerPhone.includes(searchTerm) ||
                         order.vaccines.some(v => v.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const totalProducts = mockVaccines.length;
  const inStockProducts = mockVaccines.filter(v => v.inStock).length;
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const totalRevenue = mockOrders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const renderProductsTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar vacinas por nome ou descrição..."
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
            <option value="infantil">Infantil</option>
            <option value="adulto">Adulto</option>
            <option value="idoso">Idoso</option>
            <option value="viagem">Viagem</option>
            <option value="ocupacional">Ocupacional</option>
          </select>
          
          <select 
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os produtos</option>
            <option value="in_stock">Em estoque</option>
            <option value="out_stock">Fora de estoque</option>
          </select>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Package className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVaccines.map((vaccine) => (
            <div key={vaccine.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img 
                  src={vaccine.image} 
                  alt={vaccine.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {vaccine.isPopular && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Popular
                    </span>
                  )}
                  {vaccine.isPromotion && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Promoção
                    </span>
                  )}
                  {!vaccine.inStock && (
                    <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Fora de Estoque
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <button className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(vaccine.category)}`}>
                      {getCategoryLabel(vaccine.category)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{vaccine.rating}</span>
                    <span className="text-sm text-gray-500">({vaccine.reviewsCount})</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{vaccine.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{vaccine.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {vaccine.ageRange}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2" />
                    {vaccine.doses} dose{vaccine.doses > 1 ? 's' : ''}
                    {vaccine.interval && ` (${vaccine.interval})`}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    {vaccine.inStock ? `${vaccine.stockCount} disponíveis` : 'Fora de estoque'}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    {vaccine.originalPrice && vaccine.originalPrice > vaccine.price && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        R$ {vaccine.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-2xl font-bold text-gray-900">
                      R$ {vaccine.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedProduct(vaccine)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    disabled={!vaccine.inStock}
                  >
                    {vaccine.inStock ? 'Agendar' : 'Indisponível'}
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avaliação</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVaccines.map((vaccine) => (
                  <tr key={vaccine.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={vaccine.image} 
                          alt={vaccine.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{vaccine.name}</div>
                          <div className="text-sm text-gray-500">{vaccine.ageRange}</div>
                          <div className="flex space-x-1 mt-1">
                            {vaccine.isPopular && (
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                Popular
                              </span>
                            )}
                            {vaccine.isPromotion && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">
                                Promoção
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(vaccine.category)}`}>
                        {getCategoryLabel(vaccine.category)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">R$ {vaccine.price.toFixed(2)}</div>
                      {vaccine.originalPrice && vaccine.originalPrice > vaccine.price && (
                        <div className="text-sm text-gray-500 line-through">R$ {vaccine.originalPrice.toFixed(2)}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${vaccine.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {vaccine.inStock ? `${vaccine.stockCount} disponíveis` : 'Fora de estoque'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-900">{vaccine.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({vaccine.reviewsCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          className="text-blue-600 hover:text-blue-900 p-1" 
                          title="Visualizar"
                          onClick={() => setSelectedProduct(vaccine)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1" title="Duplicar">
                          <Plus className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1" title="Remover">
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
      )}

      {filteredVaccines.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
          <div className="text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 mb-6">Ajuste os filtros ou adicione novos produtos</p>
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Adicionar Primeiro Produto
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar pedidos por cliente, telefone ou vacina..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacinas</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agendamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pagamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {order.customerPhone}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="w-3 h-3 mr-1" />
                          {order.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {order.vaccines.map((vaccine, index) => (
                        <div key={index} className="text-sm text-gray-900">
                          {vaccine.vaccineName} (x{vaccine.quantity})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(order.selectedDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-sm text-gray-500">{order.selectedTime}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      Unidade {order.selectedUnit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">R$ {order.totalAmount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {getPaymentStatusLabel(order.paymentStatus)}
                    </div>
                    <div className="text-sm text-gray-500 capitalize">{order.paymentMethod}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 p-1" 
                        title="Visualizar"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Confirmar">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1" title="Cancelar">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
            <p className="text-gray-500">Os pedidos aparecerão aqui conforme os clientes fizerem compras</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações da Loja</h3>
        
        <div className="space-y-6">
          {/* Store Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Loja Online Ativa</h4>
              <p className="text-sm text-gray-500">Permitir que clientes façam pedidos online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={storeSettings.isActive}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Payment Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Configurações de Pagamento</h4>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Pagamento Online</h5>
                <p className="text-sm text-gray-500">PIX, cartão de crédito/débito</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={storeSettings.allowOnlinePayment}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-gray-900">Pagamento Antecipado Obrigatório</h5>
                <p className="text-sm text-gray-500">Exigir pagamento antes do agendamento</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={storeSettings.requireAdvancePayment}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Horário de Funcionamento</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Abertura</label>
                <input
                  type="time"
                  value={storeSettings.workingHours.start}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fechamento</label>
                <input
                  type="time"
                  value={storeSettings.workingHours.end}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Política de Cancelamento</label>
            <textarea
              value={storeSettings.cancellationPolicy}
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Descreva a política de cancelamento..."
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Salvar Configurações</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Conversion Funnel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Funil de Conversão</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Eye className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Visualizações</span>
            </div>
            <span className="text-xl font-bold text-blue-600">2,847</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-900">Adicionaram ao Carrinho</span>
            </div>
            <span className="text-xl font-bold text-purple-600">456</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-900">Finalizaram Compra</span>
            </div>
            <span className="text-xl font-bold text-green-600">89</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-gray-900">Compareceram</span>
            </div>
            <span className="text-xl font-bold text-orange-600">76</span>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Taxa de conversão: <span className="font-bold text-green-600">3.1%</span> (visualização → compra)
          </p>
          <p className="text-sm text-gray-600">
            Taxa de comparecimento: <span className="font-bold text-blue-600">85.4%</span> (compra → comparecimento)
          </p>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Produtos Mais Vendidos</h3>
        <div className="space-y-4">
          {mockVaccines.slice(0, 5).map((vaccine, index) => (
            <div key={vaccine.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-400' :
                  index === 2 ? 'bg-amber-600' :
                  'bg-gray-300'
                }`}>
                  {index + 1}
                </div>
                <img 
                  src={vaccine.image} 
                  alt={vaccine.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">{vaccine.name}</div>
                  <div className="text-sm text-gray-500">R$ {vaccine.price.toFixed(2)}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-gray-900">
                  {Math.floor(Math.random() * 50) + 10} vendas
                </div>
                <div className="text-sm text-green-600">
                  R$ {(vaccine.price * (Math.floor(Math.random() * 50) + 10)).toFixed(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Loja Online</h1>
              <p className="text-gray-600">E-commerce de vacinas com agendamento integrado</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'products' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pedidos
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'settings' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Configurações
            </button>
            <button
              onClick={() => setShowProductModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Produto</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">{inStockProducts} em estoque</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Online</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-yellow-600 mt-2">{pendingOrders} pendentes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faturamento Online</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">R$ {(totalRevenue / 1000).toFixed(1)}k</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+18%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ticket Médio</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">R$ {avgOrderValue.toFixed(0)}</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">por pedido online</p>
          </div>
        </div>

        {activeTab === 'products' && renderProductsTab()}
        {activeTab === 'orders' && renderOrdersTab()}
        {activeTab === 'settings' && renderSettingsTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Detalhes do Produto</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex space-x-6">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h3>
                      {selectedProduct.isPopular && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Categoria:</span>
                        <span className="ml-2 font-medium">{getCategoryLabel(selectedProduct.category)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Faixa etária:</span>
                        <span className="ml-2 font-medium">{selectedProduct.ageRange}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Doses:</span>
                        <span className="ml-2 font-medium">{selectedProduct.doses}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Estoque:</span>
                        <span className={`ml-2 font-medium ${selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedProduct.inStock ? `${selectedProduct.stockCount} disponíveis` : 'Fora de estoque'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Benefícios</h4>
                    <ul className="space-y-2">
                      {selectedProduct.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Contraindicações</h4>
                    <ul className="space-y-2">
                      {selectedProduct.contraindications.map((contraindication, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                          {contraindication}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Unidades Disponíveis</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.availableUnits.map((unit, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        Unidade {unit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Editar Produto
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Detalhes do Pedido #{selectedOrder.id}</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Informações do Cliente</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-500">Nome:</span> <span className="font-medium">{selectedOrder.customerName}</span></div>
                      <div><span className="text-gray-500">Telefone:</span> <span className="font-medium">{selectedOrder.customerPhone}</span></div>
                      <div><span className="text-gray-500">E-mail:</span> <span className="font-medium">{selectedOrder.customerEmail}</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Agendamento</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-500">Data:</span> <span className="font-medium">{new Date(selectedOrder.selectedDate).toLocaleDateString('pt-BR')}</span></div>
                      <div><span className="text-gray-500">Horário:</span> <span className="font-medium">{selectedOrder.selectedTime}</span></div>
                      <div><span className="text-gray-500">Unidade:</span> <span className="font-medium">Unidade {selectedOrder.selectedUnit}</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Vacinas Solicitadas</h4>
                  <div className="space-y-3">
                    {selectedOrder.vaccines.map((vaccine, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{vaccine.vaccineName}</div>
                          <div className="text-sm text-gray-500">Quantidade: {vaccine.quantity}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">R$ {vaccine.price.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">por dose</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-900">Total do Pedido:</span>
                  <span className="text-xl font-bold text-blue-600">R$ {selectedOrder.totalAmount.toFixed(2)}</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusLabel(selectedOrder.status)}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Pagamento:</span>
                    <span className={`ml-2 font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                      {getPaymentStatusLabel(selectedOrder.paymentStatus)}
                    </span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-2">Observações:</h5>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
                <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <Globe className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-900">Ver Loja Pública</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
              <Share2 className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-900">Compartilhar Link</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
              <Smartphone className="w-6 h-6 text-purple-600" />
              <span className="font-medium text-gray-900">Versão Mobile</span>
            </button>
            
            <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
              <Download className="w-6 h-6 text-orange-600" />
              <span className="font-medium text-gray-900">Exportar Catálogo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineStore;