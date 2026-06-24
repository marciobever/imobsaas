import React, { useState } from 'react';
import { Home, ShieldAlert, BookOpen, AlertCircle } from 'lucide-react';
import PublicPortal from './components/PublicPortal';
import CrmPanel from './components/CrmPanel';
import SitemapSpec from './components/SitemapSpec';
import { 
  PROPERTIES, 
  BROKERS, 
  OWNERS, 
  NEIGHBORHOODS, 
  INITIAL_LEADS, 
  INITIAL_TASKS, 
  PROPOSALS, 
  RENTALS, 
  INITIAL_SETTINGS 
} from './data';
import { Property, Lead, Task, LeadStage, Interaction, Proposal, SocialMediaSchedule } from './types';

const INITIAL_SOCIAL_MEDIA_SCHEDULES: SocialMediaSchedule[] = [
  {
    id: 'sm1',
    propertyId: 'p1',
    propertyTitle: 'Garden Duplex com Piscina Privativa no Itaim Bibi',
    propertyCode: 'AP0844',
    propertyImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
    dayOfWeek: 'Segunda-feira',
    platform: 'Instagram',
    scheduledTime: '09:00',
    caption: '🌟 OPORTUNIDADE DE LUXO NO ITAIM BIBI! Cobertura Garden Duplex de altíssimo padrão com área de lazer privativa e piscina aquecida. 🛋️ Living com pé direito duplo totalmente integrado à área gourmet externa. Marcenaria completa e acabamentos em mármore Carrara. Entre em contato para agendar sua curadoria exclusiva de visitas. #AltoPadrao #ItaimBibi #ApexImoveis #LuxoSP',
    status: 'Publicado'
  },
  {
    id: 'sm2',
    propertyId: 'p4',
    propertyTitle: 'Casa Arquitetônica Minimalista no Jardim Europa',
    propertyCode: 'CA2839',
    propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
    dayOfWeek: 'Terça-feira',
    platform: 'TikTok',
    scheduledTime: '18:30',
    caption: '✨ Design minimalista de linhas puras e concreto aparente no coração do Jardim Europa. Projeto premiado de iluminação natural e integração total da sala de estar ao jardim interno. 5 suítes impecáveis com automação inteligente. Um verdadeiro refúgio urbano de extrema sofisticação. #ArquiteturaMinimalista #JardimEuropa #MansaoLuxo #ApexImoveis',
    status: 'Agendado'
  }
];

export default function App() {
  // Master states representing database entities in memory
  const [properties, setProperties] = useState<Property[]>(PROPERTIES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [proposals, setProposals] = useState(PROPOSALS);
  const [rentals, setRentals] = useState(RENTALS);
  const [owners, setOwners] = useState(OWNERS);
  const [brokers, setBrokers] = useState(BROKERS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [socialMediaSchedules, setSocialMediaSchedules] = useState<SocialMediaSchedule[]>(INITIAL_SOCIAL_MEDIA_SCHEDULES);

  // View mode state to navigate the prototype tabs
  const [viewMode, setViewMode] = useState<'public' | 'crm' | 'spec'>('public');

  // Callback to add a new lead (synchronized from public site or manual form)
  const handleAddLead = (leadData: any) => {
    const newLead: Lead = {
      id: `l_${Date.now()}`,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || `${leadData.name.toLowerCase().replace(/\s+/g, '')}@email.com`,
      source: leadData.source || 'Site',
      interest: leadData.interest || 'Compra',
      propertyTypeDesired: leadData.propertyTypeDesired || 'Apartamento',
      maxPrice: leadData.maxPrice || 3000000,
      stage: 'Novo Lead',
      brokerId: leadData.brokerId || 'b2',
      temperature: leadData.temperature || 'Morno',
      createdAt: new Date().toISOString(),
      lastInteraction: new Date().toISOString(),
      notes: leadData.notes || 'Lead cadastrado via formulário de conversão.',
      history: [
        {
          id: `i_${Date.now()}`,
          type: 'WhatsApp',
          content: leadData.notes || 'Lead capturado com sucesso no site público.',
          date: new Date().toISOString(),
          brokerName: 'Sistema de Atendimento'
        }
      ]
    };

    setLeads(prevLeads => [newLead, ...prevLeads]);
  };

  // Callback to register a property (owner captação or broker insertion)
  const handleAddProperty = (newProp: Property) => {
    setProperties(prevProps => [newProp, ...prevProps]);
    
    // Increment properties count for the assigned broker
    setBrokers(prevBrokers => prevBrokers.map(b => {
      if (b.id === newProp.brokerId) {
        return { ...b, assignedProperties: b.assignedProperties + 1 };
      }
      return b;
    }));
  };

  // Callback to schedule a visit in calendar & task queue
  const handleBookVisit = (visitData: any) => {
    // Add a corresponding task
    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: `Visita presencial: ${visitData.propertyTitle}`,
      dueDate: visitData.date,
      status: 'Pendente',
      type: 'Visita',
      leadName: visitData.leadName,
      brokerId: visitData.brokerId
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  // Callback to update lead stage in Kanban board
  const handleUpdateLeadStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prevLeads => prevLeads.map(l => {
      if (l.id === leadId) {
        // Log stage transition in lead history
        const newInteraction: Interaction = {
          id: `i_${Date.now()}`,
          type: 'Nota',
          content: `Estágio de atendimento atualizado para: ${newStage}`,
          date: new Date().toISOString(),
          brokerName: 'Roberto Shinyashiki'
        };
        return { 
          ...l, 
          stage: newStage, 
          lastInteraction: new Date().toISOString(),
          history: [newInteraction, ...l.history]
        };
      }
      return l;
    }));
  };

  // Callback to log a custom interaction in Lead timeline
  const handleAddLeadInteraction = (leadId: string, type: 'Ligação' | 'WhatsApp' | 'Visita' | 'Email' | 'Proposta' | 'Nota', content: string) => {
    setLeads(prevLeads => prevLeads.map(l => {
      if (l.id === leadId) {
        const newInteraction: Interaction = {
          id: `i_${Date.now()}`,
          type,
          content,
          date: new Date().toISOString(),
          brokerName: 'Roberto Shinyashiki'
        };
        return {
          ...l,
          lastInteraction: new Date().toISOString(),
          history: [newInteraction, ...l.history]
        };
      }
      return l;
    }));
  };

  // Callback to add a task
  const handleAddTask = (task: Task) => {
    setTasks(prevTasks => [task, ...prevTasks]);
  };

  // Callback to toggle task complete
  const handleUpdateTaskStatus = (taskId: string, status: 'Pendente' | 'Concluída') => {
    setTasks(prevTasks => prevTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, status };
      }
      return t;
    }));
  };

  // Callback to add/register a proposal
  const handleAddProposal = (newProposal: Proposal) => {
    setProposals(prev => [newProposal, ...prev]);

    // Update Lead history and stage
    setLeads(prevLeads => prevLeads.map(l => {
      if (l.id === newProposal.leadId) {
        const newInteraction: Interaction = {
          id: `i_${Date.now()}`,
          type: 'Proposta',
          content: `Proposta comercial registrada para o imóvel "${newProposal.propertyTitle}". Valor oferecido: R$ ${newProposal.value.toLocaleString('pt-BR')}. Condições: ${newProposal.notes || 'Sem observações.'}`,
          date: new Date().toISOString(),
          brokerName: newProposal.brokerName || 'Sistema de Vendas'
        };
        return {
          ...l,
          stage: 'Proposta',
          lastInteraction: new Date().toISOString(),
          history: [newInteraction, ...l.history]
        };
      }
      return l;
    }));

    // Add a Task for follow-up
    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: `Acompanhar proposta de R$ ${newProposal.value.toLocaleString('pt-BR')} (Lead: ${newProposal.leadName})`,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 dias para frente
      status: 'Pendente',
      type: 'Proposta',
      leadName: newProposal.leadName,
      leadId: newProposal.leadId,
      brokerId: newProposal.brokerId || 'b2'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  // Callback to update proposal status
  const handleUpdateProposalStatus = (proposalId: string, status: any) => {
    setProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        const newHistoryLog = `${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}: Status alterado para ${status}.`;
        return {
          ...p,
          status,
          history: [newHistoryLog, ...(p.history || [])]
        };
      }
      return p;
    }));
  };

  // Callbacks for social media scheduling
  const handleAddSocialMediaSchedule = (newSchedule: SocialMediaSchedule) => {
    setSocialMediaSchedules(prev => [newSchedule, ...prev]);
  };

  const handleUpdateSocialMediaSchedule = (scheduleId: string, updatedFields: Partial<SocialMediaSchedule>) => {
    setSocialMediaSchedules(prev => prev.map(s => {
      if (s.id === scheduleId) {
        return { ...s, ...updatedFields };
      }
      return s;
    }));
  };

  const handleDeleteSocialMediaSchedule = (scheduleId: string) => {
    setSocialMediaSchedules(prev => prev.filter(s => s.id !== scheduleId));
  };


  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Barra superior do Prototype Switcher */}
      <div className="bg-slate-950 border-b border-slate-800 text-xs py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="bg-amber-600/10 text-amber-500 font-mono text-[10px] font-bold px-2 py-1 rounded border border-amber-600/20">
            PROTÓTIPO PREMIUM HÍBRIDO
          </span>
          <p className="text-slate-400 font-medium">Navegue pelas frentes da plataforma e especificação integrada:</p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1 gap-1">
          <button 
            onClick={() => setViewMode('public')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold transition-all ${
              viewMode === 'public' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Site Público</span>
          </button>

          <button 
            onClick={() => setViewMode('crm')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold transition-all ${
              viewMode === 'crm' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Painel / CRM</span>
          </button>

          <button 
            onClick={() => setViewMode('spec')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-bold transition-all ${
              viewMode === 'spec' 
                ? 'bg-amber-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documento de Especificação</span>
          </button>
        </div>
      </div>

      {/* Alerta de Persistência em Memória */}
      <div className="bg-slate-900 border-b border-slate-850 px-6 py-2.5 text-[11px] text-slate-400 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
        <p>
          <strong>Sincronização em Tempo Real Ativa:</strong> Ações realizadas no Portal Público (anunciar imóvel ou solicitar visita) alimentam imediatamente o CRM, atualizando o dashboard e a esteira de corretores. Os dados estão sendo mantidos localmente em memória de estado React.
        </p>
      </div>

      {/* Renderização Fluida Baseada no Modo Selecionado */}
      <div className="flex-1 overflow-hidden h-full">
        {viewMode === 'public' && (
          <div className="h-full overflow-y-auto bg-slate-50">
            <PublicPortal 
              properties={properties}
              brokers={brokers}
              neighborhoods={NEIGHBORHOODS}
              settings={settings}
              onAddLead={handleAddLead}
              onAddProperty={handleAddProperty}
              onBookVisit={handleBookVisit}
            />
          </div>
        )}

        {viewMode === 'crm' && (
          <div className="h-full bg-slate-900">
            <CrmPanel 
              properties={properties}
              leads={leads}
              tasks={tasks}
              owners={owners}
              brokers={brokers}
              proposals={proposals}
              rentals={rentals}
              settings={settings}
              socialMediaSchedules={socialMediaSchedules}
              onUpdateLeadStage={handleUpdateLeadStage}
              onAddLeadInteraction={handleAddLeadInteraction}
              onAddProperty={handleAddProperty}
              onAddLead={handleAddLead}
              onAddTask={handleAddTask}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onAddProposal={handleAddProposal}
              onUpdateProposalStatus={handleUpdateProposalStatus}
              onAddSocialMediaSchedule={handleAddSocialMediaSchedule}
              onUpdateSocialMediaSchedule={handleUpdateSocialMediaSchedule}
              onDeleteSocialMediaSchedule={handleDeleteSocialMediaSchedule}
            />
          </div>
        )}

        {viewMode === 'spec' && (
          <div className="h-full overflow-y-auto bg-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="text-center py-6">
                <h1 className="text-3xl font-bold font-serif text-white tracking-tight">Especificação de Arquitetura & UX</h1>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">Leia abaixo o detalhamento funcional em formato de documento executivo oficial, homologado pela equipe de produto.</p>
              </div>
              <SitemapSpec />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
