import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Shield, 
  FileText,
  Download,
  Eye,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Syringe,
  Activity,
  Users,
  TrendingUp,
  Package,
  AlertTriangle,
  Save,
  X,
  QrCode,
  Printer,
  Send,
  Star,
  Award,
  Heart,
  Baby,
  UserCheck
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  gender: 'M' | 'F' | 'Outro';
  phone: string;
  email?: string;
  guardian?: string;
  guardianPhone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bloodType?: string;
  allergies?: string[];
  medicalConditions?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  registrationDate: string;
  lastUpdate: string;
  vaccineHistory: VaccineRecord[];
  upcomingVaccines: UpcomingVaccine[];
  totalVaccines: number;
  completionRate: number;
}

interface VaccineRecord {
  id: string;
  vaccineName: string;
  dose: string;
  applicationDate: string;
  batch: string;
  expiryDate: string;
  professional: string;
  professionalId: string;
  location: string;
  unitName: string;
  nextDose?: string;
  reactions?: string;
  notes?: string;
  certificate?: string;
  qrCode?: string;
}

interface UpcomingVaccine {
  id: string;
  vaccineName: string;
  dose: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  ageRecommended: string;
  isOverdue: boolean;
  daysOverdue?: number;
}

const VaccineHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAge, setFilterAge] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterCompletionRate, setFilterCompletionRate] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [activeView, setActiveView] = useState<'list' | 'card'>('card');

  const mockPatients: Patient[] = [
    {
      id: '1',
      name: 'Maria Silva Santos',
      cpf: '123.456.789-00',
      birthDate: '1985-03-15',
      gender: 'F',
      phone: '+55 11 99999-1234',
      email: 'maria.silva@email.com',
      address: 'Rua das Flores, 123, Apto 45',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      bloodType: 'O+',
      allergies: ['Penicilina'],
      emergencyContact: {
        name: 'João Silva Santos',
        phone: '+55 11 88888-1234',
        relationship: 'Esposo'
      },
      registrationDate: '2023-01-15',
      lastUpdate: '2025-01-20',
      vaccineHistory: [
        {
          id: '1',
          vaccineName: 'Gripe (Influenza)',
          dose: '1ª dose',
          applicationDate: '2025-01-20',
          batch: 'GRP2025001',
          expiryDate: '2025-12-31',
          professional: 'Ana Paula Silva',
          professionalId: 'COREN 123456',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR123456789'
        },
        {
          id: '2',
          vaccineName: 'COVID-19',
          dose: '3ª dose (Reforço)',
          applicationDate: '2024-11-15',
          batch: 'COV2024015',
          expiryDate: '2025-06-30',
          professional: 'Dr. Carlos Oliveira',
          professionalId: 'CRM 98765',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR987654321'
        },
        {
          id: '3',
          vaccineName: 'Hepatite B',
          dose: '2ª dose',
          applicationDate: '2024-08-10',
          batch: 'HEP2024008',
          expiryDate: '2025-08-31',
          professional: 'João Técnico',
          professionalId: 'COREN 654321',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          nextDose: '2025-02-10',
          qrCode: 'QR456789123'
        }
      ],
      upcomingVaccines: [
        {
          id: '1',
          vaccineName: 'Hepatite B',
          dose: '3ª dose',
          dueDate: '2025-02-10',
          priority: 'high',
          ageRecommended: 'Adulto',
          isOverdue: false
        }
      ],
      totalVaccines: 3,
      completionRate: 85
    },
    {
      id: '2',
      name: 'João Pedro Oliveira',
      cpf: '987.654.321-00',
      birthDate: '2010-07-22',
      gender: 'M',
      phone: '+55 11 88888-5678',
      guardian: 'Ana Oliveira',
      guardianPhone: '+55 11 77777-9999',
      address: 'Av. Paulista, 1000, Casa 2',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100',
      bloodType: 'A+',
      emergencyContact: {
        name: 'Ana Oliveira',
        phone: '+55 11 77777-9999',
        relationship: 'Mãe'
      },
      registrationDate: '2023-03-20',
      lastUpdate: '2025-01-18',
      vaccineHistory: [
        {
          id: '4',
          vaccineName: 'HPV',
          dose: '1ª dose',
          applicationDate: '2025-01-18',
          batch: 'HPV2025002',
          expiryDate: '2025-07-31',
          professional: 'Ana Paula Silva',
          professionalId: 'COREN 123456',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          nextDose: '2025-07-18',
          qrCode: 'QR789123456'
        },
        {
          id: '5',
          vaccineName: 'Meningocócica ACWY',
          dose: '1ª dose',
          applicationDate: '2024-12-05',
          batch: 'MEN2024012',
          expiryDate: '2025-12-31',
          professional: 'Dr. Carlos Oliveira',
          professionalId: 'CRM 98765',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR321654987'
        }
      ],
      upcomingVaccines: [
        {
          id: '2',
          vaccineName: 'HPV',
          dose: '2ª dose',
          dueDate: '2025-07-18',
          priority: 'high',
          ageRecommended: 'Adolescente',
          isOverdue: false
        },
        {
          id: '3',
          vaccineName: 'Tétano',
          dose: '1ª dose',
          dueDate: '2025-03-15',
          priority: 'medium',
          ageRecommended: 'Adolescente',
          isOverdue: false
        }
      ],
      totalVaccines: 2,
      completionRate: 65
    },
    {
      id: '3',
      name: 'Carlos Eduardo Costa',
      cpf: '456.789.123-00',
      birthDate: '1972-11-08',
      gender: 'M',
      phone: '+55 11 77777-9012',
      email: 'carlos.costa@email.com',
      address: 'Rua Augusta, 789, Sala 12',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-100',
      bloodType: 'B-',
      medicalConditions: ['Diabetes Tipo 2', 'Hipertensão'],
      emergencyContact: {
        name: 'Lucia Costa',
        phone: '+55 11 66666-9012',
        relationship: 'Esposa'
      },
      registrationDate: '2022-08-10',
      lastUpdate: '2025-01-15',
      vaccineHistory: [
        {
          id: '6',
          vaccineName: 'Gripe (Influenza)',
          dose: 'Anual 2025',
          applicationDate: '2025-01-15',
          batch: 'GRP2025001',
          expiryDate: '2025-12-31',
          professional: 'Ana Paula Silva',
          professionalId: 'COREN 123456',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR654987321'
        },
        {
          id: '7',
          vaccineName: 'Pneumocócica 23',
          dose: '1ª dose',
          applicationDate: '2024-10-20',
          batch: 'PNE2024010',
          expiryDate: '2025-10-31',
          professional: 'Dr. Carlos Oliveira',
          professionalId: 'CRM 98765',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          nextDose: '2029-10-20',
          qrCode: 'QR147258369'
        },
        {
          id: '8',
          vaccineName: 'Hepatite B',
          dose: '3ª dose',
          applicationDate: '2024-06-15',
          batch: 'HEP2024006',
          expiryDate: '2025-06-30',
          professional: 'João Técnico',
          professionalId: 'COREN 654321',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR963852741'
        }
      ],
      upcomingVaccines: [
        {
          id: '4',
          vaccineName: 'Tétano',
          dose: 'Reforço',
          dueDate: '2025-04-15',
          priority: 'medium',
          ageRecommended: 'Adulto',
          isOverdue: false
        }
      ],
      totalVaccines: 3,
      completionRate: 92
    },
    {
      id: '4',
      name: 'Ana Beatriz Santos',
      cpf: '321.654.987-00',
      birthDate: '2018-05-12',
      gender: 'F',
      phone: '+55 11 66666-3456',
      guardian: 'Beatriz Santos',
      guardianPhone: '+55 11 55555-3456',
      address: 'Rua dos Jardins, 456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04567-890',
      bloodType: 'AB+',
      emergencyContact: {
        name: 'Beatriz Santos',
        phone: '+55 11 55555-3456',
        relationship: 'Mãe'
      },
      registrationDate: '2023-06-01',
      lastUpdate: '2025-01-12',
      vaccineHistory: [
        {
          id: '9',
          vaccineName: 'Tríplice Viral (SCR)',
          dose: '2ª dose',
          applicationDate: '2025-01-12',
          batch: 'SCR2025001',
          expiryDate: '2025-08-31',
          professional: 'Ana Paula Silva',
          professionalId: 'COREN 123456',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR159753486'
        },
        {
          id: '10',
          vaccineName: 'DTP (Tríplice Bacteriana)',
          dose: '1º Reforço',
          applicationDate: '2024-09-20',
          batch: 'DTP2024009',
          expiryDate: '2025-09-30',
          professional: 'João Técnico',
          professionalId: 'COREN 654321',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          nextDose: '2028-09-20',
          qrCode: 'QR753159486'
        }
      ],
      upcomingVaccines: [
        {
          id: '5',
          vaccineName: 'Varicela',
          dose: '1ª dose',
          dueDate: '2025-05-12',
          priority: 'high',
          ageRecommended: 'Infantil',
          isOverdue: false
        },
        {
          id: '6',
          vaccineName: 'Hepatite A',
          dose: '1ª dose',
          dueDate: '2025-03-20',
          priority: 'medium',
          ageRecommended: 'Infantil',
          isOverdue: false
        }
      ],
      totalVaccines: 2,
      completionRate: 45
    },
    {
      id: '5',
      name: 'Roberto Silva Lima',
      cpf: '654.321.987-00',
      birthDate: '1958-12-03',
      gender: 'M',
      phone: '+55 11 55555-7890',
      email: 'roberto.silva@email.com',
      address: 'Av. Independência, 2000',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04567-123',
      bloodType: 'O-',
      medicalConditions: ['Cardiopatia', 'DPOC'],
      allergies: ['Ovo'],
      emergencyContact: {
        name: 'Maria Silva Lima',
        phone: '+55 11 44444-7890',
        relationship: 'Esposa'
      },
      registrationDate: '2022-11-20',
      lastUpdate: '2025-01-10',
      vaccineHistory: [
        {
          id: '11',
          vaccineName: 'Pneumocócica 23',
          dose: '1ª dose',
          applicationDate: '2025-01-10',
          batch: 'PNE2025001',
          expiryDate: '2025-12-31',
          professional: 'Dr. Carlos Oliveira',
          professionalId: 'CRM 98765',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          nextDose: '2030-01-10',
          qrCode: 'QR852741963'
        },
        {
          id: '12',
          vaccineName: 'Gripe (Influenza)',
          dose: 'Anual 2025',
          applicationDate: '2024-12-20',
          batch: 'GRP2024020',
          expiryDate: '2025-12-31',
          professional: 'Ana Paula Silva',
          professionalId: 'COREN 123456',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          qrCode: 'QR741852963'
        },
        {
          id: '13',
          vaccineName: 'Herpes Zóster',
          dose: '1ª dose',
          applicationDate: '2024-08-15',
          batch: 'HZO2024008',
          expiryDate: '2025-08-31',
          professional: 'Dr. Carlos Oliveira',
          professionalId: 'CRM 98765',
          location: 'Unidade Centro',
          unitName: 'ZYVIA Centro',
          nextDose: '2026-08-15',
          qrCode: 'QR369258147'
        }
      ],
      upcomingVaccines: [
        {
          id: '7',
          vaccineName: 'Gripe (Influenza)',
          dose: 'Anual 2026',
          dueDate: '2025-12-20',
          priority: 'high',
          ageRecommended: 'Idoso',
          isOverdue: false
        }
      ],
      totalVaccines: 3,
      completionRate: 95
    }
  ];

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const getAgeGroup = (birthDate: string) => {
    const age = calculateAge(birthDate);
    if (age < 18) return 'Infantil/Adolescente';
    if (age < 60) return 'Adulto';
    return 'Idoso';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionBg = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.cpf.includes(searchTerm) ||
                         patient.phone.includes(searchTerm);
    
    const age = calculateAge(patient.birthDate);
    const matchesAge = filterAge === 'all' || 
                      (filterAge === 'child' && age < 18) ||
                      (filterAge === 'adult' && age >= 18 && age < 60) ||
                      (filterAge === 'elderly' && age >= 60);
    
    const matchesGender = filterGender === 'all' || patient.gender === filterGender;
    
    const matchesCompletion = filterCompletionRate === 'all' ||
                             (filterCompletionRate === 'high' && patient.completionRate >= 80) ||
                             (filterCompletionRate === 'medium' && patient.completionRate >= 60 && patient.completionRate < 80) ||
                             (filterCompletionRate === 'low' && patient.completionRate < 60);
    
    return matchesSearch && matchesAge && matchesGender && matchesCompletion;
  });

  const totalPatients = mockPatients.length;
  const totalVaccines = mockPatients.reduce((sum, p) => sum + p.totalVaccines, 0);
  const avgCompletionRate = mockPatients.reduce((sum, p) => sum + p.completionRate, 0) / mockPatients.length;
  const overduePatients = mockPatients.filter(p => p.upcomingVaccines.some(v => v.isOverdue)).length;

  const exportVaccineCard = (patient: Patient, format: 'pdf' | 'digital') => {
    // Simular exportação
    console.log(`Exportando carteira de ${patient.name} em formato ${format.toUpperCase()}`);
    alert(`Carteira de vacinação de ${patient.name} exportada em ${format.toUpperCase()}!`);
  };

  const renderPatientCard = (patient: Patient) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {patient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
            <p className="text-sm text-gray-500">
              {calculateAge(patient.birthDate)} anos • {patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Feminino' : 'Outro'}
            </p>
            {patient.guardian && (
              <p className="text-xs text-purple-600">Responsável: {patient.guardian}</p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getCompletionColor(patient.completionRate)}`}>
            {patient.completionRate}%
          </div>
          <div className="text-sm text-gray-500">Completude</div>
          <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className={`h-2 rounded-full ${getCompletionBg(patient.completionRate)}`}
              style={{ width: `${patient.completionRate}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{patient.totalVaccines}</div>
          <div className="text-sm text-blue-600">Vacinas Aplicadas</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">{patient.upcomingVaccines.length}</div>
          <div className="text-sm text-orange-600">Próximas Vacinas</div>
        </div>
      </div>

      {/* Upcoming Vaccines */}
      {patient.upcomingVaccines.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Próximas Vacinas:</h4>
          <div className="space-y-2">
            {patient.upcomingVaccines.slice(0, 2).map((vaccine) => (
              <div key={vaccine.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">{vaccine.vaccineName}</p>
                  <p className="text-xs text-gray-500">{vaccine.dose}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{new Date(vaccine.dueDate).toLocaleDateString('pt-BR')}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(vaccine.priority)}`}>
                    {getPriorityLabel(vaccine.priority)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={() => {
            setSelectedPatient(patient);
            setShowPatientModal(true);
          }}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center justify-center space-x-1"
        >
          <Eye className="w-4 h-4" />
          <span>Ver Carteira</span>
        </button>
        <button
          onClick={() => exportVaccineCard(patient, 'pdf')}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Exportar PDF"
        >
          <Download className="w-4 h-4" />
        </button>
        <button
          onClick={() => exportVaccineCard(patient, 'digital')}
          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          title="Carteira Digital"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderPatientList = (patient: Patient) => (
    <tr key={patient.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
            <div className="text-sm text-gray-500">CPF: {patient.cpf}</div>
            {patient.guardian && (
              <div className="text-xs text-purple-600">Responsável: {patient.guardian}</div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 flex items-center">
          <Phone className="w-4 h-4 mr-1 text-green-500" />
          {patient.phone}
        </div>
        {patient.email && (
          <div className="text-sm text-gray-500 flex items-center">
            <Mail className="w-4 h-4 mr-1" />
            {patient.email}
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{calculateAge(patient.birthDate)} anos</div>
        <div className="text-sm text-gray-500">{getAgeGroup(patient.birthDate)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{patient.totalVaccines} aplicadas</div>
        <div className="text-sm text-gray-500">{patient.upcomingVaccines.length} pendentes</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <div className={`text-sm font-bold ${getCompletionColor(patient.completionRate)}`}>
            {patient.completionRate}%
          </div>
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getCompletionBg(patient.completionRate)}`}
              style={{ width: `${patient.completionRate}%` }}
            />
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {new Date(patient.lastUpdate).toLocaleDateString('pt-BR')}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setSelectedPatient(patient);
              setShowPatientModal(true);
            }}
            className="text-blue-600 hover:text-blue-900 p-1"
            title="Ver Carteira"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => exportVaccineCard(patient, 'pdf')}
            className="text-green-600 hover:text-green-900 p-1"
            title="Exportar PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => exportVaccineCard(patient, 'digital')}
            className="text-purple-600 hover:text-purple-900 p-1"
            title="Carteira Digital"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-900 p-1" title="Editar">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Histórico Vacinal</h1>
              <p className="text-gray-600">Carteira de vacinação digital de todos os pacientes</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('card')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'card' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setActiveView('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeView === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lista
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Pacientes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalPatients}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacinas Registradas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalVaccines}</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completude Média</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{avgCompletionRate.toFixed(0)}%</p>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vacinas em Atraso</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{overduePatients}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, CPF ou telefone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select 
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as idades</option>
              <option value="child">Crianças/Adolescentes (0-17)</option>
              <option value="adult">Adultos (18-59)</option>
              <option value="elderly">Idosos (60+)</option>
            </select>
            
            <select 
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os gêneros</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            
            <select 
              value={filterCompletionRate}
              onChange={(e) => setFilterCompletionRate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas as completudes</option>
              <option value="high">Alta (80%+)</option>
              <option value="medium">Média (60-79%)</option>
              <option value="low">Baixa (&lt;60%)</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {activeView === 'card' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPatients.map(renderPatientCard)}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paciente</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contato</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vacinas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completude</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Última Atualização</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map(renderPatientList)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
              <p className="text-gray-500">Ajuste os filtros para ver mais resultados</p>
            </div>
          </div>
        )}

        {/* Patient Details Modal */}
        {selectedPatient && showPatientModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-semibold text-gray-900">Carteira de Vacinação Digital</h2>
                </div>
                <button
                  onClick={() => {
                    setShowPatientModal(false);
                    setSelectedPatient(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                {/* Patient Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {selectedPatient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{selectedPatient.name}</h3>
                        <p className="text-blue-100">CPF: {selectedPatient.cpf}</p>
                        <p className="text-blue-100">
                          {calculateAge(selectedPatient.birthDate)} anos • {selectedPatient.gender === 'M' ? 'Masculino' : selectedPatient.gender === 'F' ? 'Feminino' : 'Outro'}
                        </p>
                        {selectedPatient.guardian && (
                          <p className="text-blue-100">Responsável: {selectedPatient.guardian}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{selectedPatient.completionRate}%</div>
                      <div className="text-blue-100">Completude</div>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Informações Pessoais</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-green-500" />
                        <span>{selectedPatient.phone}</span>
                      </div>
                      {selectedPatient.email && (
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{selectedPatient.email}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{selectedPatient.address}, {selectedPatient.city}/{selectedPatient.state}</span>
                      </div>
                      {selectedPatient.bloodType && (
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-2 text-red-500" />
                          <span>Tipo Sanguíneo: {selectedPatient.bloodType}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Informações Médicas</h4>
                    <div className="space-y-2 text-sm">
                      {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                        <div>
                          <span className="font-medium text-red-600">Alergias:</span>
                          <span className="ml-2">{selectedPatient.allergies.join(', ')}</span>
                        </div>
                      )}
                      {selectedPatient.medicalConditions && selectedPatient.medicalConditions.length > 0 && (
                        <div>
                          <span className="font-medium text-orange-600">Condições:</span>
                          <span className="ml-2">{selectedPatient.medicalConditions.join(', ')}</span>
                        </div>
                      )}
                      {selectedPatient.emergencyContact && (
                        <div>
                          <span className="font-medium text-purple-600">Emergência:</span>
                          <span className="ml-2">
                            {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship}) - {selectedPatient.emergencyContact.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Upcoming Vaccines */}
                {selectedPatient.upcomingVaccines.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-orange-500" />
                      Próximas Vacinas Recomendadas
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPatient.upcomingVaccines.map((vaccine) => (
                        <div key={vaccine.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{vaccine.vaccineName}</h5>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(vaccine.priority)}`}>
                              {getPriorityLabel(vaccine.priority)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{vaccine.dose}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              Recomendada para: {new Date(vaccine.dueDate).toLocaleDateString('pt-BR')}
                            </span>
                            {vaccine.isOverdue && (
                              <span className="text-xs text-red-600 font-medium">
                                {vaccine.daysOverdue} dias em atraso
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vaccine History */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-500" />
                    Histórico de Vacinações ({selectedPatient.vaccineHistory.length})
                  </h4>
                  
                  {selectedPatient.vaccineHistory.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPatient.vaccineHistory
                        .sort((a, b) => new Date(b.applicationDate).getTime() - new Date(a.applicationDate).getTime())
                        .map((vaccine) => (
                        <div key={vaccine.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                  <Shield className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                  <h5 className="text-lg font-semibold text-gray-900">{vaccine.vaccineName}</h5>
                                  <p className="text-sm text-gray-600">{vaccine.dose}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Data de Aplicação:</span> {new Date(vaccine.applicationDate).toLocaleDateString('pt-BR')}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Lote:</span> {vaccine.batch}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Validade:</span> {new Date(vaccine.expiryDate).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Profissional:</span> {vaccine.professional}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Registro:</span> {vaccine.professionalId}
                                  </p>
                                  <p className="text-gray-600">
                                    <span className="font-medium">Local:</span> {vaccine.unitName}
                                  </p>
                                </div>
                              </div>
                              
                              {vaccine.nextDose && (
                                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                  <p className="text-sm text-blue-700">
                                    <span className="font-medium">Próxima dose recomendada:</span> {new Date(vaccine.nextDose).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                              )}
                              
                              {vaccine.reactions && (
                                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                  <p className="text-sm text-yellow-700">
                                    <span className="font-medium">Reações:</span> {vaccine.reactions}
                                  </p>
                                </div>
                              )}
                              
                              {vaccine.notes && (
                                <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">Observações:</span> {vaccine.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col space-y-2 ml-4">
                              {vaccine.qrCode && (
                                <button
                                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                  title="Ver QR Code"
                                >
                                  <QrCode className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                title="Imprimir Certificado"
                              >
                                <Printer className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                title="Enviar por WhatsApp"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma vacinação registrada</h3>
                      <p className="text-gray-500">Este paciente ainda não possui histórico de vacinações</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex space-x-3">
                  <button
                    onClick={() => exportVaccineCard(selectedPatient, 'pdf')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar PDF</span>
                  </button>
                  <button
                    onClick={() => exportVaccineCard(selectedPatient, 'digital')}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Carteira Digital</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Printer className="w-4 h-4" />
                    <span>Imprimir</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowPatientModal(false);
                    setSelectedPatient(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccineHistory;