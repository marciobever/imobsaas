import React, { useState, useMemo } from 'react';
import { 
  BarChart3, Users2, ShieldAlert, KeyRound, CalendarDays, FileText, CheckCircle2, 
  Settings2, Search, Bell, Plus, Filter, Kanban as KanbanIcon, ListFilter, 
  PhoneCall, MessageSquare, Clock, MapPin, Building2, UserCheck, DollarSign, 
  FileCheck, ShieldCheck, TrendingUp, AlertTriangle, CheckSquare, Edit, Trash2, Save 
} from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { Property, Lead, Task, Owner, Broker, Proposal, Rental, AgencySettings, LeadStage } from '../types';

interface CrmPanelProps {
  properties: Property[];
  leads: Lead[];
  tasks: Task[];
  owners: Owner[];
  brokers: Broker[];
  proposals: Proposal[];
  rentals: Rental[];
  settings: AgencySettings;
  onUpdateLeadStage: (leadId: string, newStage: LeadStage) => void;
  onAddLeadInteraction: (leadId: string, type: any, content: string) => void;
  onAddProperty: (property: Property) => void;
  onAddLead: (lead: any) => void;
  onAddTask: (task: Task) => void;
  onUpdateTaskStatus: (taskId: string, status: 'Pendente' | 'Concluída') => void;
}

export default function CrmPanel({
  properties,
  leads,
  tasks,
  owners,
  brokers,
  proposals,
  rentals,
  settings,
  onUpdateLeadStage,
  onAddLeadInteraction,
  onAddProperty,
  onAddLead,
  onAddTask,
  onUpdateTaskStatus
}: CrmPanelProps) {
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  
  // Local state for searching/filtering
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilterTemp, setLeadFilterTemp] = useState<string>('Todos');
  const [propertySearch, setPropertySearch] = useState('');
  const [propertyFilterStatus, setPropertyFilterStatus] = useState<string>('Todos');

  // Selected entities for drawers/modals
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [isNewPropertyModalOpen, setIsNewPropertyModalOpen] = useState(false);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadInterest, setNewLeadInterest] = useState<'Compra' | 'Aluguel' | 'Ambos'>('Compra');
  const [newLeadTemp, setNewLeadTemp] = useState<'Quente' | 'Morno' | 'Frio'>('Morno');
  const [newLeadBroker, setNewLeadBroker] = useState('b2');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  // New Property Form State
  const [newPropCode, setNewPropCode] = useState('');
  const [newPropTitle, setNewPropTitle] = useState('');
  const [newPropDesc, setNewPropDesc] = useState('');
  const [newPropSale, setNewPropSale] = useState('');
  const [newPropRent, setNewPropRent] = useState('');
  const [newPropCondo, setNewPropCondo] = useState('');
  const [newPropType, setNewPropType] = useState<'Apartamento' | 'Casa' | 'Cobertura'>('Apartamento');
  const [newPropPurpose, setNewPropPurpose] = useState<'Venda' | 'Aluguel' | 'Ambos'>('Venda');
  const [newPropNeighborhood, setNewPropNeighborhood] = useState('Jardins');
  const [newPropBedrooms, setNewPropBedrooms] = useState('3');
  const [newPropSuites, setNewPropSuites] = useState('2');
  const [newPropParking, setNewPropParking] = useState('2');
  const [newPropArea, setNewPropArea] = useState('140');
  const [newPropOwner, setNewPropOwner] = useState('o1');
  const [newPropBroker, setNewPropBroker] = useState('b2');

  // Quick Interaction Log State
  const [logType, setLogType] = useState<'Ligação' | 'WhatsApp' | 'Visita' | 'Email' | 'Nota'>('Ligação');
  const [logContent, setLogContent] = useState('');

  // Quick Task State
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskDate, setQuickTaskDate] = useState('');

  // Toggle Lead List View Mode (Table vs Kanban)
  const [leadViewMode, setLeadViewMode] = useState<'kanban' | 'table'>('kanban');

  // Computed Lead Stats for Charts
  const leadsByStageData = useMemo(() => {
    const stages: Record<LeadStage, number> = {
      'Novo Lead': 0,
      'Contato Inicial': 0,
      'Qualificado': 0,
      'Imóvel Enviado': 0,
      'Visita Agendada': 0,
      'Proposta': 0,
      'Negociação': 0,
      'Fechado': 0,
      'Perdido': 0
    };
    leads.forEach(l => {
      if (stages[l.stage] !== undefined) {
        stages[l.stage]++;
      }
    });
    return Object.entries(stages).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const leadsBySourceData = useMemo(() => {
    const sources: Record<string, number> = {};
    leads.forEach(l => {
      sources[l.source] = (sources[l.source] || 0) + 1;
    });
    return Object.entries(sources).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const COLORS = ['#0F172A', '#D97706', '#2563EB', '#16A34A', '#8B5CF6', '#EC4899'];

  // Selected Lead details
  const selectedLead = useMemo(() => {
    return leads.find(l => l.id === selectedLeadId);
  }, [leads, selectedLeadId]);

  // Handle lead submission
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone) return;

    onAddLead({
      name: newLeadName,
      phone: newLeadPhone,
      email: newLeadEmail,
      source: 'Site' as const,
      interest: newLeadInterest,
      brokerId: newLeadBroker,
      temperature: newLeadTemp,
      notes: newLeadNotes
    });

    setIsNewLeadModalOpen(false);
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadNotes('');
  };

  // Handle Property Creation
  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPropTitle || !newPropCode) return;

    const mockProperty: Property = {
      id: `p_${Date.now()}`,
      code: newPropCode,
      title: newPropTitle,
      description: newPropDesc || 'Sem descrição cadastrada.',
      priceSale: newPropSale ? Number(newPropSale) : undefined,
      priceRent: newPropRent ? Number(newPropRent) : undefined,
      condominio: newPropCondo ? Number(newPropCondo) : undefined,
      iptu: 500,
      type: newPropType,
      purpose: newPropPurpose,
      status: 'Ativo',
      neighborhood: newPropNeighborhood,
      city: 'São Paulo',
      address: `Rua Cadastrada de Luxo, ${newPropNeighborhood}`,
      zipCode: '04500-000',
      bedrooms: Number(newPropBedrooms),
      suites: Number(newPropSuites),
      bathrooms: Number(newPropBedrooms) + 1,
      parkingSpaces: Number(newPropParking),
      areaPrivativa: Number(newPropArea),
      areaTotal: Number(newPropArea) + 50,
      furnished: false,
      petsAllowed: true,
      features: ['Ar Condicionado', 'Varanda Gourmet', 'Churrasqueira'],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'
      ],
      ownerId: newPropOwner,
      brokerId: newPropBroker,
      highlight: false,
      published: true,
      visitsCount: 0,
      leadsCount: 0
    };

    onAddProperty(mockProperty);
    setIsNewPropertyModalOpen(false);
    setNewPropTitle('');
    setNewPropCode('');
    setNewPropDesc('');
    setNewPropSale('');
    setNewPropRent('');
    setNewPropCondo('');
  };

  const handleLogInteractionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadId || !logContent) return;

    onAddLeadInteraction(selectedLeadId, logType, logContent);
    setLogContent('');
  };

  const handleAddQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadId || !quickTaskTitle || !quickTaskDate) return;

    const brokerId = selectedLead?.brokerId || 'b2';
    const brokerName = brokers.find(b => b.id === brokerId)?.name || 'Corretor';

    // Add task
    onAddTask({
      id: `t_${Date.now()}`,
      title: quickTaskTitle,
      dueDate: quickTaskDate,
      status: 'Pendente',
      type: 'Follow-up',
      leadId: selectedLeadId,
      leadName: selectedLead?.name,
      brokerId: brokerId
    });

    // Log interactive task creation
    onAddLeadInteraction(
      selectedLeadId,
      'Nota',
      `Tarefa agendada pelo corretor: ${quickTaskTitle} (Vencimento: ${quickTaskDate})`
    );

    setQuickTaskTitle('');
    setQuickTaskDate('');
  };

  // Filter lists based on searches
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchSearch = l.name.toLowerCase().includes(leadSearch.toLowerCase()) || 
                          l.phone.includes(leadSearch) || 
                          l.email.toLowerCase().includes(leadSearch.toLowerCase());
      const matchTemp = leadFilterTemp === 'Todos' || l.temperature === leadFilterTemp;
      return matchSearch && matchTemp;
    });
  }, [leads, leadSearch, leadFilterTemp]);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(propertySearch.toLowerCase()) || 
                          p.code.toLowerCase().includes(propertySearch.toLowerCase()) || 
                          p.neighborhood.toLowerCase().includes(propertySearch.toLowerCase());
      const matchStatus = propertyFilterStatus === 'Todos' || p.status === propertyFilterStatus;
      return matchSearch && matchStatus;
    });
  }, [properties, propertySearch, propertyFilterStatus]);

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR DO PAINEL */}
      <aside className="w-64 bg-slate-950 shrink-0 border-r border-slate-800 flex flex-col justify-between p-5">
        <div>
          {/* Header de Marca */}
          <div className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-slate-950 flex items-center justify-center font-bold text-base">
              A
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-tight text-white uppercase">{settings.name}</h2>
              <span className="text-[10px] text-amber-500 font-mono tracking-wider font-semibold">CRM OPERACIONAL</span>
            </div>
          </div>

          {/* Menus */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveMenu('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'dashboard' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Painel Geral</span>
            </button>

            <button 
              onClick={() => setActiveMenu('leads')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'leads' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Users2 className="w-4 h-4 shrink-0" />
              <span>Funil de Leads (CRM)</span>
            </button>

            <button 
              onClick={() => setActiveMenu('properties')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'properties' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span>Gestão de Imóveis</span>
            </button>

            <button 
              onClick={() => setActiveMenu('owners')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'owners' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>Proprietários</span>
            </button>

            <button 
              onClick={() => setActiveMenu('brokers')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'brokers' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Users2 className="w-4 h-4 shrink-0" />
              <span>Equipe & Corretores</span>
            </button>

            <button 
              onClick={() => setActiveMenu('agenda')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'agenda' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <CalendarDays className="w-4 h-4 shrink-0" />
              <span>Agenda de Visitas</span>
            </button>

            <button 
              onClick={() => setActiveMenu('propostas')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'propostas' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Propostas</span>
            </button>

            <button 
              onClick={() => setActiveMenu('locacao')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-semibold transition-all ${
                activeMenu === 'locacao' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Esteira de Locação</span>
            </button>
          </nav>
        </div>

        {/* User Perfil de Operação */}
        <div className="pt-4 border-t border-slate-800 flex items-center gap-2.5">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80" 
            alt="Diretor" 
            className="w-9 h-9 rounded-full object-cover border border-slate-700"
            referrerPolicy="no-referrer"
          />
          <div>
            <p className="text-xs font-bold text-white leading-tight">Roberto S.</p>
            <p className="text-[9px] text-amber-500 font-mono tracking-wide uppercase">Gerente Adm</p>
          </div>
        </div>
      </aside>

      {/* ÁREA CENTRAL DE CONTEÚDO */}
      <main className="flex-1 bg-slate-900 overflow-y-auto flex flex-col h-full">
        {/* Topbar do CRM */}
        <header className="h-16 border-b border-slate-850 px-6 shrink-0 flex items-center justify-between bg-slate-950/60 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">Ambiente Conectado</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (activeMenu === 'properties') {
                  setIsNewPropertyModalOpen(true);
                } else {
                  setIsNewLeadModalOpen(true);
                }
              }}
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{activeMenu === 'properties' ? 'Novo Imóvel' : 'Novo Lead'}</span>
            </button>
          </div>
        </header>

        {/* CONTEÚDO DINÂMICO DOS MENUS */}
        <div className="p-6 flex-1 w-full max-w-7xl mx-auto space-y-6">

          {/* 1. DASHBOARD COMPLETO */}
          {activeMenu === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* KPIs de Topo */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Leads Ativos</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{leads.length}</h3>
                    <p className="text-[10px] text-emerald-500 flex items-center gap-0.5 mt-1 font-medium"><TrendingUp className="w-3 h-3" /> +15% este mês</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-500 flex items-center justify-center">
                    <Users2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Portfólio Cadastrado</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{properties.length}</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Imóveis de alto padrão</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-500 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Propostas em Análise</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{proposals.length}</h3>
                    <p className="text-[10px] text-amber-500 flex items-center gap-0.5 mt-1 font-medium"><AlertTriangle className="w-3 h-3" /> Aguardando proprietário</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-500 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Faturamento (Vendas)</span>
                    <h3 className="text-xl font-bold text-white mt-1">R$ 9.7 M</h3>
                    <p className="text-[10px] text-emerald-500 flex items-center gap-0.5 mt-1 font-medium"><TrendingUp className="w-3 h-3" /> Meta de R$ 12M próximo</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-500 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Seção de Gráficos Recharts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-sm">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fluxo de Leads por Etapa do Funil</h4>
                    <p className="text-[10px] text-slate-500">Mapeamento dinâmico da esteira operacional de vendas</p>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={leadsByStageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={9} />
                        <YAxis stroke="#64748B" fontSize={9} />
                        <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                        <Bar dataKey="value" fill="#D97706" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Canais de Atração</h4>
                    <p className="text-[10px] text-slate-500">Distribuição percentual de origem de leads</p>
                  </div>
                  <div className="h-44 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={leadsBySourceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {leadsBySourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', color: '#fff', fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[9px] text-slate-400">
                    {leadsBySourceData.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                        <span className="truncate">{d.name}: {d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Atividades Recentes & Tarefas Pendentes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tarefas Operacionais */}
                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Tarefas Pendentes do Dia</h4>
                      <p className="text-[10px] text-slate-500">Compromissos prioritários da equipe</p>
                    </div>
                    <CheckSquare className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="space-y-3 overflow-y-auto max-h-60">
                    {tasks.map((t) => (
                      <div key={t.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3 transition-colors hover:border-slate-700">
                        <input 
                          type="checkbox" 
                          checked={t.status === 'Concluída'}
                          onChange={() => onUpdateTaskStatus(t.id, t.status === 'Pendente' ? 'Concluída' : 'Pendente')}
                          className="mt-0.5 cursor-pointer accent-amber-600 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold leading-tight ${t.status === 'Concluída' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                            {t.title}
                          </p>
                          <div className="flex gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                            <span className="text-amber-500 font-bold">{t.dueDate}</span>
                            <span>•</span>
                            <span>Lead: {t.leadName || 'Sem vínculo'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leads Quentes Recentes */}
                <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-sm">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Leads Quentes no Pipeline</h4>
                    <p className="text-[10px] text-slate-500">Contatos de alta probabilidade de fechamento</p>
                  </div>
                  <div className="space-y-3">
                    {leads.filter(l => l.temperature === 'Quente').slice(0, 3).map((l) => (
                      <div 
                        key={l.id} 
                        onClick={() => { setSelectedLeadId(l.id); setActiveMenu('leads'); }}
                        className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-amber-600/30 transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-200">{l.name}</p>
                          <p className="text-[10px] text-slate-500">{l.notes || 'Sem observações adicionais.'}</p>
                        </div>
                        <span className="bg-amber-600/15 text-amber-500 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                          {l.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CRM DE LEADS - KANBAN & TABELA */}
          {activeMenu === 'leads' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-850 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white uppercase">Módulo de CRM & Negociações</h3>
                  <p className="text-xs text-slate-500 mt-1">Gerencie a esteira comercial e interações com potenciais compradores.</p>
                </div>

                {/* Barra de Controles */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Busca */}
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar leads..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="text-xs bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:border-amber-700 w-44"
                    />
                  </div>

                  {/* Filtro Temperatura */}
                  <select 
                    value={leadFilterTemp}
                    onChange={(e) => setLeadFilterTemp(e.target.value)}
                    className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-amber-700 cursor-pointer"
                  >
                    <option value="Todos">Todas Temps</option>
                    <option value="Quente">Quente</option>
                    <option value="Morno">Morno</option>
                    <option value="Frio">Frio</option>
                  </select>

                  {/* Botões Mudar de Visão */}
                  <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                    <button 
                      onClick={() => setLeadViewMode('kanban')}
                      className={`px-2.5 py-1.5 rounded-md transition-all ${
                        leadViewMode === 'kanban' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <KanbanIcon className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => setLeadViewMode('table')}
                      className={`px-2.5 py-1.5 rounded-md transition-all ${
                        leadViewMode === 'table' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ListFilter className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SE KANBAN */}
              {leadViewMode === 'kanban' ? (
                <div className="flex gap-4 overflow-x-auto pb-4 max-h-[600px] items-start">
                  {(['Novo Lead', 'Contato Inicial', 'Qualificado', 'Imóvel Enviado', 'Visita Agendada', 'Proposta', 'Negociação', 'Fechado', 'Perdido'] as LeadStage[]).map((stage) => {
                    const stageLeads = filteredLeads.filter(l => l.stage === stage);
                    return (
                      <div key={stage} className="w-64 bg-slate-950/60 border border-slate-850 rounded-2xl p-4 shrink-0 space-y-3 flex flex-col max-h-[550px]">
                        <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-300">{stage}</h4>
                          <span className="bg-slate-800 text-slate-400 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                            {stageLeads.length}
                          </span>
                        </div>

                        <div className="space-y-3 overflow-y-auto flex-1 pr-1">
                          {stageLeads.map((lead) => (
                            <div 
                              key={lead.id} 
                              onClick={() => setSelectedLeadId(lead.id)}
                              className={`p-3 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-amber-600/50 transition-all space-y-2 relative ${
                                lead.temperature === 'Quente' ? 'border-l-4 border-l-amber-600' : ''
                              }`}
                            >
                              <div>
                                <h5 className="text-xs font-bold text-white line-clamp-1">{lead.name}</h5>
                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{lead.phone}</p>
                              </div>

                              <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
                                {lead.notes || 'Sem notas internas de qualificação.'}
                              </p>

                              <div className="flex items-center justify-between pt-1 border-t border-slate-850 text-[9px] text-slate-500">
                                <span className="font-semibold bg-slate-850 px-1.5 py-0.5 rounded">{lead.source}</span>
                                <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* SE TABELA LEADS */
                <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                        <th className="p-3">Nome</th>
                        <th className="p-3">WhatsApp / Email</th>
                        <th className="p-3">Estágio</th>
                        <th className="p-3">Origem</th>
                        <th className="p-3">Temperatura</th>
                        <th className="p-3 text-right">Ação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-slate-300">
                      {filteredLeads.map((lead) => (
                        <tr 
                          key={lead.id} 
                          onClick={() => setSelectedLeadId(lead.id)}
                          className="hover:bg-slate-900 cursor-pointer transition-colors"
                        >
                          <td className="p-3 font-bold text-white">{lead.name}</td>
                          <td className="p-3 space-y-0.5">
                            <p className="font-mono">{lead.phone}</p>
                            <p className="text-slate-500 text-[10px]">{lead.email}</p>
                          </td>
                          <td className="p-3">
                            <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-bold">
                              {lead.stage}
                            </span>
                          </td>
                          <td className="p-3">{lead.source}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              lead.temperature === 'Quente' ? 'bg-amber-600/10 text-amber-500' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {lead.temperature}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={(e) => { e.stopPropagation(); setSelectedLeadId(lead.id); }}
                              className="text-amber-500 hover:text-white font-bold"
                            >
                              Perfil →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* DRAWER PERFIL DO LEAD SELECIONADO */}
              {selectedLeadId && selectedLead && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex justify-end animate-fade-in">
                  <div className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
                    
                    <div className="space-y-6">
                      {/* Topo Drawer */}
                      <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-white">{selectedLead.name}</h4>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                              selectedLead.temperature === 'Quente' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {selectedLead.temperature}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Adicionado em {new Date(selectedLead.createdAt).toLocaleDateString()}</p>
                        </div>
                        <button 
                          onClick={() => setSelectedLeadId(null)}
                          className="text-slate-400 hover:text-white font-bold text-sm bg-slate-800 w-7 h-7 rounded-full flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Informações Estruturais */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">WhatsApp</p>
                          <p className="font-semibold text-white font-mono">{selectedLead.phone}</p>
                        </div>
                        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Estágio de Funil</p>
                          <select 
                            value={selectedLead.stage}
                            onChange={(e) => onUpdateLeadStage(selectedLead.id, e.target.value as LeadStage)}
                            className="bg-transparent border-0 font-semibold text-amber-500 focus:outline-none text-xs cursor-pointer"
                          >
                            <option value="Novo Lead">Novo Lead</option>
                            <option value="Contato Inicial">Contato Inicial</option>
                            <option value="Qualificado">Qualificado</option>
                            <option value="Imóvel Enviado">Imóvel Enviado</option>
                            <option value="Visita Agendada">Visita Agendada</option>
                            <option value="Proposta">Proposta</option>
                            <option value="Negociação">Negociação</option>
                            <option value="Fechado">Fechado</option>
                            <option value="Perdido">Perdido</option>
                          </select>
                        </div>
                      </div>

                      {/* Registrar Interação */}
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">Registrar Follow-up / Ação</h5>
                        <form onSubmit={handleLogInteractionSubmit} className="space-y-3">
                          <div className="flex gap-2">
                            {(['Ligação', 'WhatsApp', 'Visita', 'Nota'] as const).map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setLogType(type)}
                                className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all ${
                                  logType === type ? 'bg-amber-600 border-amber-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                          <textarea 
                            rows={3}
                            value={logContent}
                            onChange={(e) => setLogContent(e.target.value)}
                            placeholder="Descreva o resumo da conversa ou nota interna..."
                            required
                            className="w-full text-xs p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-700 resize-none"
                          />
                          <button 
                            type="submit"
                            className="w-full bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold py-2 rounded-lg transition-all"
                          >
                            Gravar na Timeline
                          </button>
                        </form>
                      </div>

                      {/* Agendar Próxima Tarefa */}
                      <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">Criar Tarefa de Retorno</h5>
                        <form onSubmit={handleAddQuickTask} className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="O que fazer? Ex: Ligar de volta"
                            value={quickTaskTitle}
                            onChange={(e) => setQuickTaskTitle(e.target.value)}
                            required
                            className="text-xs p-2 bg-slate-900 border border-slate-800 rounded-lg text-white col-span-2"
                          />
                          <input 
                            type="date" 
                            value={quickTaskDate}
                            onChange={(e) => setQuickTaskDate(e.target.value)}
                            required
                            className="text-xs p-2 bg-slate-900 border border-slate-800 rounded-lg text-white"
                          />
                          <button 
                            type="submit"
                            className="bg-amber-600 hover:bg-amber-750 text-white text-xs font-bold py-2 rounded-lg"
                          >
                            Agendar
                          </button>
                        </form>
                      </div>

                      {/* Linha do Tempo de Histórico */}
                      <div className="space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-white">Timeline de Atendimento</h5>
                        <div className="relative border-l border-slate-800 pl-4 space-y-4 text-xs text-slate-400">
                          {selectedLead.history && selectedLead.history.map((h, idx) => (
                            <div key={idx} className="relative">
                              <span className="absolute -left-[21px] top-0.5 bg-amber-600/20 text-amber-500 w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold">
                                •
                              </span>
                              <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-850 space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-slate-200 text-[10px]">{h.type}</span>
                                  <span className="text-[9px] text-slate-500">{new Date(h.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-slate-400 text-xs">{h.content}</p>
                                <p className="text-[9px] text-slate-500 font-mono">Por: {h.brokerName}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 text-center">
                      <button 
                        onClick={() => setSelectedLeadId(null)}
                        className="text-xs font-bold text-slate-400 hover:text-white"
                      >
                        Fechar Perfil
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. GESTÃO DE IMÓVEIS */}
          {activeMenu === 'properties' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-850 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white uppercase">Gestão de Portfólio Imobiliário</h3>
                  <p className="text-xs text-slate-500 mt-1">Monitore, cadastre e edite propriedades exclusivas cadastradas.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Pesquisar código, título..."
                      value={propertySearch}
                      onChange={(e) => setPropertySearch(e.target.value)}
                      className="text-xs bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:border-amber-700 w-44"
                    />
                  </div>

                  <select 
                    value={propertyFilterStatus}
                    onChange={(e) => setPropertyFilterStatus(e.target.value)}
                    className="text-xs bg-slate-950 border border-slate-800 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-amber-700 cursor-pointer animate-fade-in"
                  >
                    <option value="Todos">Todos os Status</option>
                    <option value="Ativo">Ativos</option>
                    <option value="Reservado">Reservados</option>
                    <option value="Vendido">Vendidos</option>
                    <option value="Alugado">Alugados</option>
                  </select>
                </div>
              </div>

              {/* Tabela de Imóveis */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                      <th className="p-3">Ref Código</th>
                      <th className="p-3">Título / Bairro</th>
                      <th className="p-3">Tipo / Finalidade</th>
                      <th className="p-3">Valores</th>
                      <th className="p-3">Performance</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    {filteredProperties.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-900 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-500">{p.code}</td>
                        <td className="p-3">
                          <p className="font-semibold text-white">{p.title}</p>
                          <p className="text-slate-500 text-[10px] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3 text-amber-600" /> {p.neighborhood}, {p.city}</p>
                        </td>
                        <td className="p-3">
                          <p className="font-semibold">{p.type}</p>
                          <p className="text-slate-500 text-[10px]">{p.purpose}</p>
                        </td>
                        <td className="p-3 font-mono">
                          {p.priceSale && <p className="text-slate-200">V: R$ {p.priceSale.toLocaleString('pt-BR')}</p>}
                          {p.priceRent && <p className="text-amber-500">A: R$ {p.priceRent.toLocaleString('pt-BR')}</p>}
                        </td>
                        <td className="p-3 text-[10px] space-y-0.5">
                          <p className="text-slate-400">Leads vinculados: {p.leadsCount}</p>
                          <p className="text-slate-400">Visitas presenciais: {p.visitsCount}</p>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            p.status === 'Ativo' ? 'bg-emerald-600/10 text-emerald-500' : 'bg-amber-600/10 text-amber-500'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. GESTÃO DE PROPRIETÁRIOS */}
          {activeMenu === 'owners' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-base font-bold text-white uppercase">Proprietários de Imóveis</h3>
                <p className="text-xs text-slate-500 mt-1">Controle de contatos e captações de propriedades privadas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {owners.map((owner) => (
                  <div key={owner.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{owner.name}</h4>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">CPF: {owner.document}</p>
                      </div>
                      <span className="bg-slate-850 text-slate-400 text-[9px] px-2 py-0.5 rounded">
                        ID: {owner.id}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-slate-300 border-t border-slate-900 pt-3">
                      <p>WhatsApp: <span className="font-mono text-white font-semibold">{owner.phone}</span></p>
                      <p>E-mail: <span className="text-slate-400 font-mono">{owner.email}</span></p>
                      <p className="text-slate-500 text-[11px] leading-relaxed italic">
                        "{owner.notes || 'Sem observações cadastrais.'}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-400">
                      <span>Imóveis Vinculados: {owner.propertiesIds.length}</span>
                      <button 
                        onClick={() => alert(`Visualizando imóveis de ${owner.name}`)}
                        className="text-amber-500 hover:text-white font-bold"
                      >
                        Ver Imóveis →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. GESTÃO DE CORRETORES / EQUIPE */}
          {activeMenu === 'brokers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-base font-bold text-white uppercase">Equipe & Performance Comercial</h3>
                <p className="text-xs text-slate-500 mt-1">Gerencie metas, performance financeira e CRECI da equipe.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brokers.map((broker) => {
                  const percentMeta = broker.targetSales > 0 ? (broker.currentSales / broker.targetSales) * 100 : 0;
                  return (
                    <div key={broker.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-5">
                      <div className="flex items-center gap-3">
                        <img 
                          src={broker.avatar} 
                          alt={broker.name} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-white text-sm">{broker.name}</h4>
                          <p className="text-[10px] text-amber-500 font-mono">{broker.creci || 'SDR / Interno'}</p>
                          <span className="bg-slate-850 text-slate-400 text-[9px] font-bold px-1.5 py-0.5 rounded mt-1 inline-block">
                            {broker.role}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1.5 text-slate-300 border-t border-slate-900 pt-3">
                        <p>Contatos: <span className="font-mono text-white">{broker.phone}</span></p>
                        <p>Leads Atribuídos: <span className="text-slate-400 font-bold">{broker.assignedLeads}</span></p>
                      </div>

                      {/* Progresso de Metas */}
                      {broker.targetSales > 0 && (
                        <div className="space-y-1.5 pt-3 border-t border-slate-900">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>Vendas: R$ {broker.currentSales.toLocaleString('pt-BR')}</span>
                            <span>Meta: R$ {broker.targetSales.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-amber-600 h-full rounded-full"
                              style={{ width: `${Math.min(percentMeta, 100)}%` }}
                            ></div>
                          </div>
                          <p className="text-right text-[9px] font-mono text-amber-500 font-bold">{percentMeta.toFixed(0)}% da meta atingida</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 6. AGENDA DE VISITAS */}
          {activeMenu === 'agenda' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-base font-bold text-white uppercase">Agenda de Visitas a Imóveis</h3>
                <p className="text-xs text-slate-500 mt-1">Acompanhe visitas agendadas pelos clientes no portal em tempo real.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Visitas Confirmadas & Pendentes</h4>
                
                <div className="space-y-3">
                  {tasks.filter(t => t.type === 'Visita').map((v) => (
                    <div key={v.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-amber-600/10 text-amber-500 flex items-center justify-center">
                          <CalendarDays className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-200">Visita no Imóvel com {v.leadName}</p>
                          <p className="text-[10px] text-slate-500 font-mono">Agendado para: {v.dueDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-600/10 text-emerald-500 text-[10px] font-bold px-2 py-0.5 rounded">
                          Confirmada
                        </span>
                        <button 
                          onClick={() => alert('Alterando status da visita')}
                          className="text-slate-400 hover:text-white text-xs font-bold bg-slate-800 px-3 py-1 rounded"
                        >
                          Gerenciar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. PROPOSTAS */}
          {activeMenu === 'propostas' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-base font-bold text-white uppercase">Gestão de Propostas Judiciais & Comerciais</h3>
                <p className="text-xs text-slate-500 mt-1">Lista de propostas enviadas de compra e aluguel sob curadoria técnica.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                      <th className="p-3">Comprador (Lead)</th>
                      <th className="p-3">Imóvel de Interesse</th>
                      <th className="p-3">Tipo</th>
                      <th className="p-3">Valor Oferecido</th>
                      <th className="p-3">Status da Proposta</th>
                      <th className="p-3 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850 text-slate-300">
                    {proposals.map((pr) => (
                      <tr key={pr.id} className="hover:bg-slate-900 transition-colors">
                        <td className="p-3 font-bold text-white">{pr.leadName}</td>
                        <td className="p-3 text-slate-300">{pr.propertyTitle}</td>
                        <td className="p-3 font-semibold">{pr.type}</td>
                        <td className="p-3 font-mono font-bold text-slate-100">
                          R$ {pr.value.toLocaleString('pt-BR')}
                        </td>
                        <td className="p-3">
                          <span className="bg-amber-600/10 text-amber-500 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                            {pr.status}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => alert('Análise jurídica e financeira de certidões iniciada.')}
                            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-2 py-1 rounded"
                          >
                            Analisar minutas
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 8. ESTEIRA DE LOCAÇÃO */}
          {activeMenu === 'locacao' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-850 pb-4">
                <h3 className="text-base font-bold text-white uppercase">Esteira de Locação & Garantias</h3>
                <p className="text-xs text-slate-500 mt-1">Monitore minutas, fiadores e prazos de reajuste de aluguéis ativos.</p>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Garantias e Prazos Vigentes</h4>
                
                <div className="space-y-4">
                  {rentals.map((r) => (
                    <div key={r.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                      <div className="flex justify-between items-center flex-wrap gap-2 border-b border-slate-800 pb-2">
                        <div>
                          <p className="text-xs font-bold text-white">Inquilino: {r.leadName}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Imóvel: {r.propertyTitle}</p>
                        </div>
                        <span className="bg-slate-800 text-slate-400 text-[9px] font-mono px-2 py-0.5 rounded">
                          Garantia: {r.guarantee}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-500">Valor Mensal</p>
                          <p className="font-bold text-white">R$ {r.value.toLocaleString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Data de Início</p>
                          <p className="font-semibold text-slate-300">{r.startDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Vigência Limite</p>
                          <p className="font-semibold text-slate-300">{r.endDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Documentação</p>
                          <p className="text-emerald-500 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Aprovado
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL - NOVO LEAD (CRM) */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Novo Lead Manual</h4>
              <button onClick={() => setIsNewLeadModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail</label>
                  <input 
                    type="email" 
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Interesse</label>
                  <select 
                    value={newLeadInterest}
                    onChange={(e) => setNewLeadInterest(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Compra">Compra</option>
                    <option value="Aluguel">Aluguel</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Temperatura</label>
                  <select 
                    value={newLeadTemp}
                    onChange={(e) => setNewLeadTemp(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Quente">Quente</option>
                    <option value="Morno">Morno</option>
                    <option value="Frio">Frio</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 rounded-lg"
              >
                Criar Lead Comercial
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL - NOVO IMÓVEL (PORTFÓLIO) */}
      {isNewPropertyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Novo Imóvel Residencial</h4>
              <button onClick={() => setIsNewPropertyModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cód de Referência</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ex: AP0988"
                    value={newPropCode}
                    onChange={(e) => setNewPropCode(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Título Comercial</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Duplex nos Jardins..."
                    value={newPropTitle}
                    onChange={(e) => setNewPropTitle(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipo</label>
                  <select 
                    value={newPropType}
                    onChange={(e) => setNewPropType(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Cobertura">Cobertura</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bairro</label>
                  <select 
                    value={newPropNeighborhood}
                    onChange={(e) => setNewPropNeighborhood(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Jardins">Jardins</option>
                    <option value="Itaim Bibi">Itaim Bibi</option>
                    <option value="Pinheiros">Pinheiros</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Finalidade</label>
                  <select 
                    value={newPropPurpose}
                    onChange={(e) => setNewPropPurpose(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  >
                    <option value="Venda">Venda</option>
                    <option value="Aluguel">Aluguel</option>
                    <option value="Ambos">Ambos</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Valor Venda</label>
                  <input 
                    type="number" 
                    placeholder="R$ 3500000"
                    value={newPropSale}
                    onChange={(e) => setNewPropSale(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Valor Aluguel</label>
                  <input 
                    type="number" 
                    placeholder="R$ 15000"
                    value={newPropRent}
                    onChange={(e) => setNewPropRent(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Condomínio</label>
                  <input 
                    type="number" 
                    placeholder="R$ 2000"
                    value={newPropCondo}
                    onChange={(e) => setNewPropCondo(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quartos</label>
                  <input 
                    type="number" 
                    value={newPropBedrooms}
                    onChange={(e) => setNewPropBedrooms(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suítes</label>
                  <input 
                    type="number" 
                    value={newPropSuites}
                    onChange={(e) => setNewPropSuites(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Área M²</label>
                  <input 
                    type="number" 
                    value={newPropArea}
                    onChange={(e) => setNewPropArea(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Descrição Interna / Detalhes</label>
                <textarea 
                  rows={3}
                  value={newPropDesc}
                  onChange={(e) => setNewPropDesc(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-white resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 rounded-lg"
              >
                Cadastrar Imóvel Comercial
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
