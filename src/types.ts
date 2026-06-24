export type PropertyType = 'Apartamento' | 'Casa' | 'Cobertura' | 'Terreno' | 'Comercial';
export type PropertyPurpose = 'Venda' | 'Aluguel' | 'Ambos';
export type PropertyStatus = 'Ativo' | 'Reservado' | 'Vendido' | 'Alugado';

export interface Property {
  id: string;
  code: string;
  title: string;
  description: string;
  priceSale?: number;
  priceRent?: number;
  condominio?: number;
  iptu?: number;
  type: PropertyType;
  purpose: PropertyPurpose;
  status: PropertyStatus;
  neighborhood: string;
  city: string;
  address: string;
  zipCode: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parkingSpaces: number;
  areaPrivativa: number;
  areaTotal: number;
  floor?: number;
  solarPosition?: string;
  furnished: boolean;
  petsAllowed: boolean;
  features: string[];
  images: string[];
  ownerId: string;
  brokerId: string;
  highlight: boolean;
  published: boolean;
  visitsCount: number;
  leadsCount: number;
  notes?: string;
}

export type LeadSource = 'Site' | 'WhatsApp' | 'Imóvel Web' | 'Zap' | 'Instagram' | 'Indicação';
export type LeadStage = 
  | 'Novo Lead' 
  | 'Contato Inicial' 
  | 'Qualificado' 
  | 'Imóvel Enviado' 
  | 'Visita Agendada' 
  | 'Proposta' 
  | 'Negociação' 
  | 'Fechado' 
  | 'Perdido';

export type LeadTemperature = 'Quente' | 'Morno' | 'Frio';

export interface Interaction {
  id: string;
  type: 'Ligação' | 'WhatsApp' | 'Visita' | 'Email' | 'Proposta' | 'Nota';
  content: string;
  date: string;
  brokerName: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  interest: 'Compra' | 'Aluguel' | 'Ambos';
  propertyTypeDesired?: PropertyType;
  neighborhoodDesired?: string[];
  maxPrice?: number;
  stage: LeadStage;
  brokerId: string;
  temperature: LeadTemperature;
  createdAt: string;
  lastInteraction: string;
  nextTaskDate?: string;
  notes?: string;
  history: Interaction[];
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  status: 'Pendente' | 'Concluída';
  type: 'Ligação' | 'Visita' | 'Proposta' | 'Follow-up';
  leadId?: string;
  leadName?: string;
  brokerId: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  document: string;
  propertiesIds: string[];
  notes?: string;
}

export type BrokerRole = 'Administrador' | 'Gerente' | 'Corretor' | 'Atendimento' | 'Marketing';

export interface Broker {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  role: BrokerRole;
  creci?: string;
  active: boolean;
  assignedLeads: number;
  assignedProperties: number;
  targetSales: number;
  currentSales: number;
}

export interface Proposal {
  id: string;
  leadId: string;
  leadName: string;
  propertyId: string;
  propertyTitle: string;
  brokerId: string;
  brokerName: string;
  type: 'Venda' | 'Aluguel';
  value: number;
  date: string;
  status: 'Enviada' | 'Em Análise' | 'Contraproposta' | 'Aceita' | 'Recusada' | 'Cancelada';
  notes?: string;
  history: string[];
}

export interface Rental {
  id: string;
  leadId: string;
  leadName: string;
  propertyId: string;
  propertyTitle: string;
  brokerId: string;
  value: number;
  startDate: string;
  endDate: string;
  guarantee: 'Caução' | 'Seguro Fiança' | 'Fiador';
  status: 'Pendente' | 'Ativo' | 'Vencido';
  documents: string[];
  notes?: string;
}

export interface NeighborhoodStats {
  name: string;
  city: string;
  averagePriceSale: number;
  averagePriceRent: number;
  activeProperties: number;
  description: string;
  advantages: string[];
  imageUrl: string;
}

export interface AgencySettings {
  name: string;
  logo: string;
  primaryColor: string;
  accentColor: string;
  whatsapp: string;
  email: string;
  address: string;
  creciJuridico: string;
  seoTitle: string;
  seoDescription: string;
}

export interface SocialMediaSchedule {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyCode: string;
  propertyImage: string;
  dayOfWeek: 'Segunda-feira' | 'Terça-feira' | 'Quarta-feira' | 'Quinta-feira' | 'Sexta-feira' | 'Sábado' | 'Domingo';
  platform: 'Instagram' | 'Facebook' | 'LinkedIn' | 'TikTok';
  scheduledTime: string;
  caption: string;
  status: 'Agendado' | 'Publicado' | 'Pendente';
}

