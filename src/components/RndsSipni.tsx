import React, { useState } from 'react';
import { 
  Send, 
  Database, 
  CheckCircle, 
  AlertCircle,
  Clock,
  FileText,
  Download,
  Upload,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Calendar,
  User,
  Shield,
  Building,
  Activity,
  Zap,
  Settings,
  AlertTriangle,
  Info,
  ExternalLink,
  Server,
  Wifi,
  WifiOff
} from 'lucide-react';

interface VaccinationRecord {
  id: string;
  patientName: string;
  patientCpf: string;
  vaccineName: string;
  dose: string;
  applicationDate: string;
  batch: string;
  professional: string;
  cns?: string;
  rndsStatus: 'pending' | 'sent' | 'confirmed' | 'error';
  sipniStatus: 'pending' | 'sent' | 'confirmed' | 'error';
  lastAttempt?: string;
  errorMessage?: string;
}

interface SystemStatus {
  rnds: {
    connected: boolean;
    lastSync: string;
    pendingRecords: number;
    errorCount: number;
  };
  sipni: {
    connected: boolean;
    lastSync: string;
    pendingRecords: number;
    errorCount: number;
  };
}

const RndsSipni: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'records' | 'sync' | 'settings'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSystem, setFilterSystem] = useState('all');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const systemStatus: SystemStatus = {
    rnds: {
      connected: true,
      lastSync: '2025-01-27 14:30',
      pendingRecords: 23,
      errorCount: 2
    },
    sipni: {
      connected: true,
      lastSync: '2025-01-27 14:25',
      pendingRecords: 18,
      errorCount: 1
    }
  };

  const mockRecords: VaccinationRecord[] = [
    {
      id: '1',
      patientName: 'Maria Silva Santos',
      patientCpf: '123.456.789-00',
      vaccineName: 'Gripe (Influenza)',
      dose: '1ª dose',
      applicationDate: '2025-01-27',
      batch: 'GRP2025001',
      professional: 'Ana Paula Silva',
      cns: '123456789012345',
      rndsStatus: 'confirmed',
      sipniStatus: 'confirmed',
      lastAttempt: '2025-01-27 14:30'
    },
    {
      id: '2',
      patientName: 'João Pedro Oliveira',
      patientCpf: '987.654.321-00',
      vaccineName: 'HPV',
      dose: '2ª dose',
      applicationDate: '2025-01-27',
      batch: 'HPV2025002',
      professional: 'João Técnico',
      rndsStatus: 'sent',
      sipniStatus: 'pending',
      lastAttempt: '2025-01-27 13:45'
    },
    {
      id: '3',
      patientName: 'Carlos Eduardo Costa',
      patientCpf: '456.789.123-00',
      vaccineName: 'Hepatite B',
      dose: '3ª dose',
      applicationDate: '2025-01-26',
      batch: 'HEP2025003',
      professional: 'Dr. Carlos Oliveira',
      cns: '987654321098765',
      rndsStatus: 'error',
      sipniStatus: 'error',
      lastAttempt: '2025-01-26 16:20',
      errorMessage: 'CPF não encontrado na base do Ministério da Saúde'
    },
    {
      id: '4',
      patientName: 'Ana Beatriz Santos',
      patientCpf: '321.654.987-00',
      vaccineName: 'Tétano',
      dose: 'Reforço',
      applicationDate: '2025-01-26',
      batch: 'TET2025004',
      professional: 'Ana Paula Silva',
      rndsStatus: 'pending',
      sipniStatus: 'pending',
      lastAttempt: '2025-01-26 15:10'
    },
    {
      id: '5',
      patientName: 'Roberto Silva',
      patientCpf: '654.321.987-00',
      vaccineName: 'COVID-19',
      dose: '1ª dose',
      applicationDate: '2025-01-25',
      batch: 'COV2025005',
      professional: 'Dr. Carlos Oliveira',
      cns: '456789123456789',
      rndsStatus: 'confirmed',
      sipniStatus: 'sent',
      lastAttempt: '2025-01-25 11:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'sent': return <Send className="w-4 h-4 text-blue-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'sent': return 'Enviado';
      case 'pending': return 'Pendente';
      case 'error': return 'Erro';
      default: return status;
    }
  };

  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.patientCpf.includes(searchTerm) ||
                         record.vaccineName.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (filterStatus !== 'all') {
      matchesStatus = record.rndsStatus === filterStatus || record.sipniStatus === filterStatus;
    }
    
    let matchesSystem = true;
    if (filterSystem === 'rnds_pending') {
      matchesSystem = record.rndsStatus === 'pending' || record.rndsStatus === 'error';
    } else if (filterSystem === 'sipni_pending') {
      matchesSystem = record.sipniStatus === 'pending' || record.sipniStatus === 'error';
    }
    
    return matchesSearch && matchesStatus && matchesSystem;
  });

  const handleSyncSelected = async () => {
    if (selectedRecords.length === 0) {
      alert('Selecione pelo menos um registro para sincronizar');
      return;
    }

    setIsSyncing(true);
    
    try {
      // Simular sincronização
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Reset selection
      setSelectedRecords([]);
      
      alert(`${selectedRecords.length} registros sincronizados com sucesso!`);
    } catch (error) {
      console.error('Erro na sincronização:', error);
      alert('Erro ao sincronizar registros');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      alert('Sincronização completa realizada com sucesso!');
    } catch (error) {
      console.error('Erro na sincronização:', error);
      alert('Erro ao realizar sincronização completa');
    } finally {
      setIsSyncing(false);
    }
  };

  const toggleRecordSelection = (recordId: string) => {
    setSelectedRecords(prev => 
      prev.includes(recordId) 
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const selectAllFiltered = () => {
    const filteredIds = filteredRecords.map(r => r.id);
    setSelectedRecords(filteredIds);
  };

  const clearSelection = () => {
    setSelectedRecords([]);
  };

  const totalRecords = mockRecords.length;
  const confirmedRecords = mockRecords.filter(r => r.rndsStatus === 'confirmed' && r.sipniStatus === 'confirmed').length;
  const pendingRecords = mockRecords.filter(r => r.rndsStatus === 'pending' || r.sipniStatus === 'pending').length;
  const errorRecords = mockRecords.filter(r => r.rndsStatus === 'error' || r.sipniStatus === 'error').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">RNDS</h3>
                <p className="text-sm text-gray-600">Rede Nacional de Dados em Saúde</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {systemStatus.rnds.connected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                systemStatus.rnds.connected ? 'text-green-600' : 'text-red-600'
              }`}>
                {systemStatus.rnds.connected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{systemStatus.rnds.pendingRecords}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Erros</p>
              <p className="text-2xl font-bold text-red-600">{systemStatus.rnds.errorCount}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Última sincronização: {new Date(systemStatus.rnds.lastSync).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">SI-PNI</h3>
                <p className="text-sm text-gray-600">Sistema de Informação do PNI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {systemStatus.sipni.connected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <span className={`text-sm font-medium ${
                systemStatus.sipni.connected ? 'text-green-600' : 'text-red-600'
              }`}>
                {systemStatus.sipni.connected ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">{systemStatus.sipni.pendingRecords}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Erros</p>
              <p className="text-2xl font-bold text-red-600">{systemStatus.sipni.errorCount}</p>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Última sincronização: {new Date(systemStatus.sipni.lastSync).toLocaleString('pt-BR')}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={handleSyncAll}
            disabled={isSyncing}
            className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            {isSyncing ? (
              <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
            ) : (
              <RefreshCw className="w-6 h-6 text-blue-600" />
            )}
            <span className="font-medium text-gray-900">Sincronizar Tudo</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <Download className="w-6 h-6 text-green-600" />
            <span className="font-medium text-gray-900">Exportar Relatório</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-purple-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
            <Settings className="w-6 h-6 text-purple-600" />
            <span className="font-medium text-gray-900">Configurações</span>
          </button>
          
          <button className="flex items-center justify-center space-x-3 p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors">
            <FileText className="w-6 h-6 text-orange-600" />
            <span className="font-medium text-gray-900">Log de Erros</span>
          </button>
        </div>
      </div>

      {/* Sync Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Estatísticas de Sincronização</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* RNDS Stats */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <Database className="w-5 h-5 mr-2 text-blue-500" />
              RNDS - Últimos 30 dias
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-700">Enviados com sucesso</span>
                <span className="font-bold text-green-800">1,247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-yellow-700">Pendentes</span>
                <span className="font-bold text-yellow-800">{systemStatus.rnds.pendingRecords}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-700">Erros</span>
                <span className="font-bold text-red-800">{systemStatus.rnds.errorCount}</span>
              </div>
            </div>
          </div>

          {/* SI-PNI Stats */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-500" />
              SI-PNI - Últimos 30 dias
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-700">Enviados com sucesso</span>
                <span className="font-bold text-green-800">1,189</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-yellow-700">Pendentes</span>
                <span className="font-bold text-yellow-800">{systemStatus.sipni.pendingRecords}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm text-red-700">Erros</span>
                <span className="font-bold text-red-800">{systemStatus.sipni.errorCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Important Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Alertas Importantes</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Registros Pendentes</h4>
              <p className="text-sm text-yellow-700">
                {pendingRecords} vacinações aguardando envio para os sistemas governamentais
              </p>
            </div>
          </div>
          
          {errorRecords > 0 && (
            <div className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-red-900">Erros de Sincronização</h4>
                <p className="text-sm text-red-700">
                  {errorRecords} registros com erro. Verifique os dados e tente novamente.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Conformidade</h4>
              <p className="text-sm text-blue-700">
                Sistema em conformidade com as diretrizes do Ministério da Saúde
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por paciente, CPF ou vacina..."
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
            <option value="confirmed">Confirmado</option>
            <option value="sent">Enviado</option>
            <option value="pending">Pendente</option>
            <option value="error">Erro</option>
          </select>
          
          <select 
            value={filterSystem}
            onChange={(e) => setFilterSystem(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os sistemas</option>
            <option value="rnds_pending">RNDS Pendentes</option>
            <option value="sipni_pending">SI-PNI Pendentes</option>
          </select>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={selectAllFiltered}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Selecionar Todos ({filteredRecords.length})
            </button>
            <button
              onClick={clearSelection}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Limpar Seleção
            </button>
            {selectedRecords.length > 0 && (
              <span className="text-sm text-gray-600">
                {selectedRecords.length} selecionados
              </span>
            )}
          </div>
          
          {selectedRecords.length > 0 && (
            <button
              onClick={handleSyncSelected}
              disabled={isSyncing}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {isSyncing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              <span>Sincronizar Selecionados</span>
            </button>
          )}
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={selectedRecords.length === filteredRecords.length && filteredRecords.length > 0}
                    onChange={() => selectedRecords.length === filteredRecords.length ? clearSelection() : selectAllFiltered()}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacinação</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RNDS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SI-PNI</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Tentativa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRecords.includes(record.id)}
                      onChange={() => toggleRecordSelection(record.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{record.patientName}</div>
                        <div className="text-sm text-gray-500">CPF: {record.patientCpf}</div>
                        {record.cns && (
                          <div className="text-xs text-blue-600">CNS: {record.cns}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.vaccineName}</div>
                    <div className="text-sm text-gray-500">{record.dose}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(record.applicationDate).toLocaleDateString('pt-BR')} • Lote: {record.batch}
                    </div>
                    <div className="text-xs text-gray-400">Prof: {record.professional}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.rndsStatus)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.rndsStatus)}`}>
                        {getStatusLabel(record.rndsStatus)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.sipniStatus)}
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(record.sipniStatus)}`}>
                        {getStatusLabel(record.sipniStatus)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {record.lastAttempt ? new Date(record.lastAttempt).toLocaleString('pt-BR') : '-'}
                    </div>
                    {record.errorMessage && (
                      <div className="text-xs text-red-600 mt-1">
                        {record.errorMessage}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1" title="Reenviar">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 p-1" title="Log">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum registro encontrado</h3>
            <p className="text-gray-500">Ajuste os filtros para ver mais resultados</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSync = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sincronização Manual</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-8 h-8 text-blue-500" />
              <div>
                <h4 className="font-medium text-gray-900">RNDS</h4>
                <p className="text-sm text-gray-600">Rede Nacional de Dados em Saúde</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Registros pendentes:</span>
                <span className="font-medium text-gray-900">{systemStatus.rnds.pendingRecords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Última sincronização:</span>
                <span className="font-medium text-gray-900">
                  {new Date(systemStatus.rnds.lastSync).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSyncing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>Sincronizar RNDS</span>
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <h4 className="font-medium text-gray-900">SI-PNI</h4>
                <p className="text-sm text-gray-600">Sistema de Informação do PNI</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Registros pendentes:</span>
                <span className="font-medium text-gray-900">{systemStatus.sipni.pendingRecords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Última sincronização:</span>
                <span className="font-medium text-gray-900">
                  {new Date(systemStatus.sipni.lastSync).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
            
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="w-full bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSyncing ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span>Sincronizar SI-PNI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sync History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Sincronizações</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Sincronização automática</p>
                <p className="text-xs text-gray-500">RNDS + SI-PNI • 156 registros</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">27/01/2025 14:30</span>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Erro na sincronização</p>
                <p className="text-xs text-gray-500">SI-PNI • 3 registros falharam</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">27/01/2025 12:15</span>
          </div>
          
          <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Sincronização manual</p>
                <p className="text-xs text-gray-500">RNDS • 89 registros</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">26/01/2025 16:45</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Configurações de Integração</h3>
        
        <div className="space-y-6">
          {/* RNDS Settings */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-6 h-6 text-blue-500" />
              <h4 className="text-lg font-medium text-gray-900">RNDS</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL do Endpoint</label>
                <input
                  type="url"
                  defaultValue="https://ehr-services.saude.gov.br"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Certificado Digital</label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">✓ Válido até 15/12/2025</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Renovar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Sincronização automática a cada 30 minutos</span>
              </label>
            </div>
          </div>

          {/* SI-PNI Settings */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-green-500" />
              <h4 className="text-lg font-medium text-gray-900">SI-PNI</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Código CNES</label>
                <input
                  type="text"
                  defaultValue="1234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Token de Acesso</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    defaultValue="••••••••••••••••"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Renovar
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">Envio automático após aplicação da vacina</span>
              </label>
            </div>
          </div>

          {/* General Settings */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Configurações Gerais</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tentativas de reenvio</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="3">3 tentativas</option>
                  <option value="5">5 tentativas</option>
                  <option value="10">10 tentativas</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intervalo entre tentativas</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="5">5 minutos</option>
                  <option value="15">15 minutos</option>
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Notificar por e-mail em caso de erro</span>
                </label>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Gerar relatório diário de sincronização</span>
                </label>
              </div>
            </div>
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

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Envio RNDS/SI-PNI</h1>
              <p className="text-gray-600">Integração com sistemas governamentais de saúde</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'dashboard' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'records' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Registros
            </button>
            <button
              onClick={() => setActiveTab('sync')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'sync' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sincronizar
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
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Registros</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalRecords}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{confirmedRecords}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">
              {((confirmedRecords / totalRecords) * 100).toFixed(1)}% de sucesso
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{pendingRecords}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm text-yellow-600 mt-2">Aguardando envio</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Erros</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{errorRecords}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-sm text-red-600 mt-2">Requerem atenção</p>
          </div>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'records' && renderRecords()}
        {activeTab === 'sync' && renderSync()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
  );
};

export default RndsSipni;