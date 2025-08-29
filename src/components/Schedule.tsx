import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  User,
  Shield,
  Phone,
  Mail,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Send,
  X,
  Save
} from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  vaccineName: string;
  dose: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  professionalName?: string;
  notes?: string;
  reminderSent: boolean;
}

interface NewAppointmentForm {
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  vaccineName: string;
  dose: string;
  date: string;
  time: string;
  notes: string;
}

const Schedule: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'agenda' | 'calendar'>('agenda');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('today');
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Maria Silva Santos',
      patientPhone: '+55 11 99999-1234',
      patientEmail: 'maria.silva@email.com',
      vaccineName: 'Gripe (Influenza)',
      dose: '1ª dose',
      date: '2025-01-27',
      time: '09:00',
      status: 'confirmed',
      professionalName: 'Ana Paula Silva',
      reminderSent: true
    },
    {
      id: '2',
      patientName: 'João Pedro Oliveira',
      patientPhone: '+55 11 88888-5678',
      vaccineName: 'HPV',
      dose: '2ª dose',
      date: '2025-01-27',
      time: '10:30',
      status: 'scheduled',
      reminderSent: false
    },
    {
      id: '3',
      patientName: 'Carlos Eduardo Costa',
      patientPhone: '+55 11 77777-9012',
      vaccineName: 'Hepatite B',
      dose: '3ª dose',
      date: '2025-01-27',
      time: '14:00',
      status: 'completed',
      professionalName: 'João Técnico',
      reminderSent: true
    },
    {
      id: '4',
      patientName: 'Ana Beatriz Santos',
      patientPhone: '+55 11 66666-3456',
      vaccineName: 'Tétano',
      dose: 'Reforço',
      date: '2025-01-28',
      time: '11:00',
      status: 'scheduled',
      reminderSent: false
    },
    {
      id: '5',
      patientName: 'Roberto Silva',
      patientPhone: '+55 11 55555-7890',
      vaccineName: 'Febre Amarela',
      dose: '1ª dose',
      date: '2025-01-28',
      time: '15:30',
      status: 'cancelled',
      notes: 'Paciente cancelou por motivos pessoais',
      reminderSent: true
    },
    {
      id: '6',
      patientName: 'Lucia Ferreira',
      patientPhone: '+55 11 44444-1234',
      patientEmail: 'lucia.ferreira@email.com',
      vaccineName: 'COVID-19',
      dose: '1ª dose',
      date: '2025-01-29',
      time: '08:30',
      status: 'confirmed',
      professionalName: 'Dr. Carlos Oliveira',
      reminderSent: true
    },
    {
      id: '7',
      patientName: 'Pedro Santos',
      patientPhone: '+55 11 33333-5678',
      vaccineName: 'Pneumocócica',
      dose: '1ª dose',
      date: '2025-01-29',
      time: '16:00',
      status: 'scheduled',
      reminderSent: false
    },
    {
      id: '8',
      patientName: 'Fernanda Lima',
      patientPhone: '+55 11 22222-9012',
      patientEmail: 'fernanda.lima@email.com',
      vaccineName: 'Meningocócica',
      dose: '2ª dose',
      date: '2025-01-30',
      time: '09:30',
      status: 'confirmed',
      professionalName: 'Ana Paula Silva',
      reminderSent: true
    },
    {
      id: '9',
      patientName: 'Gabriel Costa',
      patientPhone: '+55 11 11111-3456',
      vaccineName: 'Varicela',
      dose: '1ª dose',
      date: '2025-01-30',
      time: '13:45',
      status: 'scheduled',
      reminderSent: false
    },
    {
      id: '10',
      patientName: 'Mariana Oliveira',
      patientPhone: '+55 11 99999-7777',
      patientEmail: 'mariana.oliveira@email.com',
      vaccineName: 'Gripe (Influenza)',
      dose: '1ª dose',
      date: '2025-01-31',
      time: '10:15',
      status: 'confirmed',
      professionalName: 'João Técnico',
      reminderSent: true
    },
    {
      id: '11',
      patientName: 'Ricardo Alves',
      patientPhone: '+55 11 88888-2222',
      vaccineName: 'Hepatite A',
      dose: '2ª dose',
      date: '2025-01-31',
      time: '14:30',
      status: 'scheduled',
      reminderSent: false
    },
    {
      id: '12',
      patientName: 'Juliana Rocha',
      patientPhone: '+55 11 77777-4444',
      patientEmail: 'juliana.rocha@email.com',
      vaccineName: 'HPV',
      dose: '3ª dose',
      date: '2025-02-03',
      time: '11:30',
      status: 'confirmed',
      professionalName: 'Dr. Carlos Oliveira',
      reminderSent: true
    },
    {
      id: '13',
      patientName: 'André Martins',
      patientPhone: '+55 11 66666-8888',
      vaccineName: 'Tétano',
      dose: 'Reforço',
      date: '2025-02-03',
      time: '15:00',
      status: 'scheduled',
      reminderSent: false
    },
    {
      id: '14',
      patientName: 'Camila Souza',
      patientPhone: '+55 11 55555-1111',
      patientEmail: 'camila.souza@email.com',
      vaccineName: 'Rotavírus',
      dose: '1ª dose',
      date: '2025-02-04',
      time: '08:45',
      status: 'confirmed',
      professionalName: 'Ana Paula Silva',
      reminderSent: true
    },
    {
      id: '15',
      patientName: 'Diego Ferreira',
      patientPhone: '+55 11 44444-6666',
      vaccineName: 'Febre Amarela',
      dose: '1ª dose',
      date: '2025-02-04',
      time: '16:45',
      status: 'scheduled',
      reminderSent: false
    }
  ]);

  const [newAppointment, setNewAppointment] = useState<NewAppointmentForm>({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    vaccineName: '',
    dose: '1',
    date: '',
    time: '',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no_show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendado';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      case 'no_show': return 'Faltou';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed': return <Shield className="w-4 h-4 text-gray-500" />;
      case 'cancelled': return <X className="w-4 h-4 text-red-500" />;
      case 'no_show': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.vaccineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.patientPhone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    
    let matchesDate = true;
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (filterDate === 'today') {
      matchesDate = apt.date === today;
    } else if (filterDate === 'tomorrow') {
      matchesDate = apt.date === tomorrow;
    } else if (filterDate === 'week') {
      matchesDate = apt.date >= today && apt.date <= weekFromNow;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const todayAppointments = appointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0]
  );

  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const scheduledAppointments = appointments.filter(apt => apt.status === 'scheduled');
  const noReminderAppointments = appointments.filter(apt => !apt.reminderSent && apt.status !== 'completed');

  const groupAppointmentsByDate = (appointments: Appointment[]) => {
    const grouped: { [key: string]: Appointment[] } = {};
    appointments.forEach(apt => {
      if (!grouped[apt.date]) {
        grouped[apt.date] = [];
      }
      grouped[apt.date].push(apt);
    });
    
    // Sort by date
    const sortedDates = Object.keys(grouped).sort();
    const result: { [key: string]: Appointment[] } = {};
    sortedDates.forEach(date => {
      result[date] = grouped[date].sort((a, b) => a.time.localeCompare(b.time));
    });
    
    return result;
  };

  const groupedAppointments = groupAppointmentsByDate(filteredAppointments);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const handleInputChange = (field: keyof NewAppointmentForm, value: string) => {
    setNewAppointment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAppointment = () => {
    if (!newAppointment.patientName || !newAppointment.patientPhone || !newAppointment.vaccineName || !newAppointment.date || !newAppointment.time) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const newId = (appointments.length + 1).toString();
    const appointment: Appointment = {
      id: newId,
      patientName: newAppointment.patientName,
      patientPhone: newAppointment.patientPhone,
      patientEmail: newAppointment.patientEmail || undefined,
      vaccineName: newAppointment.vaccineName,
      dose: newAppointment.dose,
      date: newAppointment.date,
      time: newAppointment.time,
      status: 'scheduled',
      notes: newAppointment.notes || undefined,
      reminderSent: false
    };

    setAppointments(prev => [...prev, appointment]);
    setShowAddModal(false);
    setNewAppointment({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      vaccineName: '',
      dose: '1',
      date: '',
      time: '',
      notes: ''
    });
  };

  const renderAgendaView = () => (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por paciente, vacina ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select 
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os dias</option>
            <option value="today">Hoje</option>
            <option value="tomorrow">Amanhã</option>
            <option value="week">Próximos 7 dias</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos os status</option>
            <option value="scheduled">Agendado</option>
            <option value="confirmed">Confirmado</option>
            <option value="completed">Concluído</option>
            <option value="cancelled">Cancelado</option>
            <option value="no_show">Faltou</option>
          </select>
        </div>
      </div>

      {/* Appointments by Date */}
      <div className="space-y-6">
        {Object.keys(groupedAppointments).length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-gray-500 mb-6">Ajuste os filtros ou crie um novo agendamento</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Novo Agendamento
              </button>
            </div>
          </div>
        ) : (
          Object.entries(groupedAppointments).map(([date, appointments]) => (
            <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  {formatDate(date)}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({appointments.length} agendamento{appointments.length !== 1 ? 's' : ''})
                  </span>
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-medium text-gray-900">{appointment.patientName}</h4>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                              {getStatusLabel(appointment.status)}
                            </span>
                            {appointment.reminderSent ? (
                              <div className="flex items-center text-green-600" title="Lembrete enviado">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">Lembrete enviado</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-orange-600" title="Lembrete não enviado">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">Sem lembrete</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-blue-500" />
                              <span className="font-medium">{appointment.time}</span>
                            </div>
                            <div className="flex items-center">
                              <Shield className="w-4 h-4 mr-2 text-green-500" />
                              <span>{appointment.vaccineName} - {appointment.dose}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-purple-500" />
                              <span>{appointment.patientPhone}</span>
                            </div>
                          </div>
                          
                          {appointment.professionalName && (
                            <div className="mt-2 text-sm text-gray-500">
                              Profissional: {appointment.professionalName}
                            </div>
                          )}
                          
                          {appointment.notes && (
                            <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                              {appointment.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors" title="Visualizar">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors" title="Confirmar">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        {!appointment.reminderSent && appointment.status !== 'completed' && (
                          <button className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors" title="Enviar Lembrete">
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors" title="Editar">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors" title="Cancelar">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCalendarView = () => {
    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();

      const days = [];
      
      // Add empty cells for days before the first day of the month
      for (let i = 0; i < startingDayOfWeek; i++) {
        days.push(null);
      }
      
      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
      
      return days;
    };

    const getAppointmentsForDate = (date: Date) => {
      const dateString = date.toISOString().split('T')[0];
      return appointments.filter(apt => apt.date === dateString);
    };

    const days = getDaysInMonth(currentDate);
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Hoje
          </button>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {dayNames.map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="h-32 border-r border-b border-gray-100" />;
            }

            const dayAppointments = getAppointmentsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className="h-32 border-r border-b border-gray-100 p-1 hover:bg-gray-50 transition-colors overflow-hidden"
              >
                <div className={`text-sm font-medium mb-1 p-1 ${
                  isToday ? 'text-blue-600 bg-blue-100 rounded' : 'text-gray-900'
                }`}>
                  {day.getDate()}
                </div>
                <div className="space-y-1 overflow-y-auto" style={{ maxHeight: '100px' }}>
                  {dayAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className={`text-xs p-1 rounded border-l-2 cursor-pointer hover:shadow-sm transition-all ${
                        apt.status === 'confirmed' ? 'bg-green-50 border-green-400 text-green-800' :
                        apt.status === 'scheduled' ? 'bg-blue-50 border-blue-400 text-blue-800' :
                        apt.status === 'completed' ? 'bg-gray-50 border-gray-400 text-gray-800' :
                        apt.status === 'cancelled' ? 'bg-red-50 border-red-400 text-red-800' :
                        'bg-orange-50 border-orange-400 text-orange-800'
                      }`}
                      title={`${apt.patientName} - ${apt.vaccineName} (${apt.dose}) às ${apt.time}`}
                    >
                      <div className="font-medium">{apt.time}</div>
                      <div className="font-semibold truncate">{apt.patientName}</div>
                      <div className="truncate opacity-75">{apt.vaccineName}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agenda</h1>
              <p className="text-gray-600">Agendamentos de vacinação</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'agenda' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Calendário
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Agendamento</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Hoje</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{todayAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-sm text-blue-600 mt-2">agendamentos</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmados</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{confirmedAppointments.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-green-600 mt-2">prontos para atender</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{scheduledAppointments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-sm text-yellow-600 mt-2">aguardando confirmação</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sem Lembrete</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{noReminderAppointments.length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <p className="text-sm text-orange-600 mt-2">precisam ser notificados</p>
          </div>
        </div>

        {viewMode === 'agenda' ? renderAgendaView() : renderCalendarView()}

        {/* Modal de Novo Agendamento */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Novo Agendamento</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Paciente *
                    </label>
                    <input
                      type="text"
                      value={newAppointment.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Digite o nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      value={newAppointment.patientPhone}
                      onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="+55 11 99999-0000"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail (Opcional)
                    </label>
                    <input
                      type="email"
                      value={newAppointment.patientEmail}
                      onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vacina *
                    </label>
                    <select 
                      value={newAppointment.vaccineName}
                      onChange={(e) => handleInputChange('vaccineName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione a vacina</option>
                      <option value="Gripe (Influenza)">Gripe (Influenza)</option>
                      <option value="HPV">HPV</option>
                      <option value="Hepatite A">Hepatite A</option>
                      <option value="Hepatite B">Hepatite B</option>
                      <option value="Tétano">Tétano</option>
                      <option value="COVID-19">COVID-19</option>
                      <option value="Pneumocócica">Pneumocócica</option>
                      <option value="Meningocócica">Meningocócica</option>
                      <option value="Varicela">Varicela</option>
                      <option value="Febre Amarela">Febre Amarela</option>
                      <option value="Rotavírus">Rotavírus</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dose *
                    </label>
                    <select 
                      value={newAppointment.dose}
                      onChange={(e) => handleInputChange('dose', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="1ª dose">1ª dose</option>
                      <option value="2ª dose">2ª dose</option>
                      <option value="3ª dose">3ª dose</option>
                      <option value="Reforço">Reforço</option>
                      <option value="Dose única">Dose única</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data *
                    </label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horário *
                    </label>
                    <select 
                      value={newAppointment.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Selecione o horário</option>
                      <option value="08:00">08:00</option>
                      <option value="08:30">08:30</option>
                      <option value="09:00">09:00</option>
                      <option value="09:30">09:30</option>
                      <option value="10:00">10:00</option>
                      <option value="10:30">10:30</option>
                      <option value="11:00">11:00</option>
                      <option value="11:30">11:30</option>
                      <option value="14:00">14:00</option>
                      <option value="14:30">14:30</option>
                      <option value="15:00">15:00</option>
                      <option value="15:30">15:30</option>
                      <option value="16:00">16:00</option>
                      <option value="16:30">16:30</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações (Opcional)
                  </label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    placeholder="Observações sobre o agendamento..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleSaveAppointment}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Agendar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;