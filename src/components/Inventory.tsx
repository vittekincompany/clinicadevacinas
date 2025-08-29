import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Package, 
  AlertTriangle, 
  TrendingDown,
  Calendar,
  FileText,
  Download,
  Edit,
  Trash2,
  Eye,
  Filter,
  BarChart3,
  Clock,
  CheckCircle
} from 'lucide-react';

interface InventoryItem {
  id: string;
  vaccineName: string;
  supplier: string;
  batch: string;
  expiryDate: string;
  totalVials: number;
  dosesPerVial: number;
  totalDoses: number;
  usedDoses: number;
  availableDoses: number;
  entryDate: string;
  status: 'available' | 'expiring' | 'expired' | 'depleted';
  laboratory: string;
}

interface StockMovement {
  id: string;
  type: 'entry' | 'exit' | 'loss';
  vaccineName: string;
  batch: string;
  quantity: number;
  reason?: string;
  date: string;
  user: string;
}

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterVaccine, setFilterVaccine] = useState('all');
  const [activeTab, setActiveTab] = useState<'inventory' | 'movements' | 'reports'>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);

  const mockInventory: InventoryItem[] = [
    {
      id: '1',
      vaccineName: 'Gripe (Influenza)',
      supplier: 'Fornecedor A',
      batch: 'GRP2025001',
      expiryDate: '2025-12-31',
      totalVials: 50,
      dosesPerVial: 10,
      totalDoses: 500,
      usedDoses: 120,
      availableDoses: 380,
      entryDate: '2025-01-15',
      status: 'available',
      laboratory: 'Lab Alpha'
    },
    {
      id: '2',
      vaccineName: 'HPV',
      supplier: 'Fornecedor B',
      batch: 'HPV2025002',
      expiryDate: '2025-03-15',
      totalVials: 30,
      dosesPerVial: 1,
      totalDoses: 30,
      usedDoses: 8,
      availableDoses: 22,
      entryDate: '2025-01-10',
      status: 'expiring',
      laboratory: 'Lab Beta'
    },
    {
      id: '3',
      vaccineName: 'Hepatite B',
      supplier: 'Fornecedor C',
      batch: 'HEP2024003',
      expiryDate: '2025-01-20',
      totalVials: 25,
      dosesPerVial: 5,
      totalDoses: 125,
      usedDoses: 125,
      availableDoses: 0,
      entryDate: '2024-12-01',
      status: 'depleted',
      laboratory: 'Lab Gamma'
    },
    {
      id: '4',
      vaccineName: 'Tétano',
      supplier: 'Fornecedor A',
      batch: 'TET2024004',
      expiryDate: '2025-01-10',
      totalVials: 20,
      dosesPerVial: 10,
      totalDoses: 200,
      usedDoses: 45,
      availableDoses: 155,
      entryDate: '2024-11-15',
      status: 'expired',
      laboratory: 'Lab Alpha'
    }
  ];

  const mockMovements: StockMovement[] = [
    {
      id: '1',
      type: 'entry',
      vaccineName: 'Gripe (Influenza)',
      batch: 'GRP2025001',
      quantity: 50,
      date: '2025-01-15 10:30',
      user: 'Ana Paula Silva'
    },
    {
      id: '2',
      type: 'exit',
      vaccineName: 'HPV',
      batch: 'HPV2025002',
      quantity: 1,
      reason: 'Aplicação em paciente',
      date: '2025-01-25 14:20',
      user: 'João Técnico'
    },
    {
      id: '3',
      type: 'loss',
      vaccineName: 'Tétano',
      batch: 'TET2024004',
      quantity: 5,
      reason: 'Vencimento',
      date: '2025-01-26 09:00',
      user: 'Ana Paula Silva'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'depleted': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'expiring': return 'Vencendo';
      case 'expired': return 'Vencido';
      case 'depleted': return 'Esgotado';
      default: return status;
    }
  };

  const getMovementTypeColor = (type: string) => {
    switch (type) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'exit': return 'bg-blue-100 text-blue-800';
      case 'loss': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMovementTypeLabel = (type: string) => {
    switch (type) {
      case 'entry': return 'Entrada';
      case 'exit': return 'Saída';
      case 'loss': return 'Perda';
      default: return type;
    }
  };

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.batch.includes(searchTerm) ||
                         item.laboratory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesVaccine = filterVaccine === 'all' || item.vaccineName.includes(filterVaccine);
    
    return matchesSearch && matchesStatus && matchesVaccine;
  });

  const totalDoses = mockInventory.reduce((sum, item) => sum + item.totalDoses, 0);
  const availableDoses = mockInventory.reduce((sum, item) => sum + item.availableDoses, 0);
  const expiringItems = mockInventory.filter(item => item.status === 'expiring' || item.status === 'expired').length;
  const depletedItems = mockInventory.filter(item => item.status === 'depleted').length;

  const renderInventoryTab = () => (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por vacina, lote ou laboratório..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterVaccine}
            onChange={(e) => setFilterVaccine(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todas as vacinas</option>
            <option value="Gripe">Gripe</option>
            <option value="HPV">HPV</option>
            <option value="Hepatite">Hepatite</option>
            <option value="Tétano">Tétano</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="available">Disponível</option>
            <option value="expiring">Vencendo</option>
            <option value="expired">Vencido</option>
            <option value="depleted">Esgotado</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lote/Validade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fornecedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.vaccineName}</div>
                        <div className="text-sm text-gray-500">{item.laboratory}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Lote: {item.batch}</div>
                    <div className="text-sm text-gray-500">
                      Validade: {new Date(item.expiryDate).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-gray-400">
                      Entrada: {new Date(item.entryDate).toLocaleDateString('pt-BR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.availableDoses} doses disponíveis</div>
                    <div className="text-sm text-gray-500">{item.usedDoses} doses utilizadas</div>
                    <div className="text-xs text-gray-400">{item.totalVials} frascos ({item.dosesPerVial} doses/frasco)</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.supplier}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                    {(item.status === 'expiring' || item.status === 'expired') && (
                      <div className="flex items-center text-xs text-red-600 mt-1">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Atenção
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Movimentar">
                        <TrendingDown className="w-4 h-4" />
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

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-500">Ajuste os filtros ou adicione um novo item ao estoque</p>
          </div>
        )}
      </div>
    </>
  );

  const renderMovementsTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacina/Lote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Motivo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data/Usuário</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockMovements.map((movement) => (
              <tr key={movement.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMovementTypeColor(movement.type)}`}>
                    {getMovementTypeLabel(movement.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movement.vaccineName}</div>
                  <div className="text-sm text-gray-500">Lote: {movement.batch}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movement.quantity} doses</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movement.reason || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{new Date(movement.date).toLocaleString('pt-BR')}</div>
                  <div className="text-sm text-gray-500">{movement.user}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
      <div className="text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Relatórios de Estoque</h3>
        <p className="text-gray-500 mb-6">Funcionalidade em desenvolvimento</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
            Relatório de Consumo
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
            Relatório de Validade
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
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Estoque</h1>
              <p className="text-gray-600">Controle de vacinas e movimentações</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'inventory' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inventário
            </button>
            <button
              onClick={() => setActiveTab('movements')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'movements' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Movimentações
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'reports' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Relatórios
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Nova Entrada</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Doses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalDoses}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Doses Disponíveis</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{availableDoses}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Itens Vencendo</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{expiringItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Itens Esgotados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{depletedItems}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {activeTab === 'inventory' && renderInventoryTab()}
        {activeTab === 'movements' && renderMovementsTab()}
        {activeTab === 'reports' && renderReportsTab()}
      </div>
    </div>
  );
};

export default Inventory;