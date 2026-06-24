import React, { useState, useMemo } from 'react';
import { Search, MapPin, BedDouble, Bath, Car, Maximize2, Phone, Calendar, Heart, Shield, Landmark, Sparkles, Building2, HelpCircle, ArrowRight, Share2, Upload, CheckCircle2, Star } from 'lucide-react';
import { Property, NeighborhoodStats, AgencySettings, Broker, Owner } from '../types';

interface PublicPortalProps {
  properties: Property[];
  brokers: Broker[];
  neighborhoods: NeighborhoodStats[];
  settings: AgencySettings;
  onAddLead: (lead: any) => void;
  onAddProperty: (property: any) => void;
  onBookVisit: (visit: any) => void;
}

export default function PublicPortal({
  properties,
  brokers,
  neighborhoods,
  settings,
  onAddLead,
  onAddProperty,
  onBookVisit
}: PublicPortalProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'catalogo' | 'bairros' | 'anunciar'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Search filter states
  const [searchPurpose, setSearchPurpose] = useState<'Venda' | 'Aluguel'>('Venda');
  const [searchType, setSearchType] = useState<string>('Todos');
  const [searchNeighborhood, setSearchNeighborhood] = useState<string>('Todos');
  const [searchMaxPrice, setSearchMaxPrice] = useState<string>('');
  const [searchMinBedrooms, setSearchMinBedrooms] = useState<string>('');

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  // Detailed modal/drawer form state
  const [visitName, setVisitName] = useState('');
  const [visitEmail, setVisitEmail] = useState('');
  const [visitPhone, setVisitPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [visitSuccess, setVisitSuccess] = useState(false);

  // Contact form state on Details page
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Owner form state
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPropertyType, setOwnerPropertyType] = useState('Apartamento');
  const [ownerCity, setOwnerCity] = useState('São Paulo');
  const [ownerNeighborhood, setOwnerNeighborhood] = useState('Jardins');
  const [ownerPurpose, setOwnerPurpose] = useState<'Venda' | 'Aluguel'>('Venda');
  const [ownerPrice, setOwnerPrice] = useState('');
  const [ownerDescription, setOwnerDescription] = useState('');
  const [ownerSuccess, setOwnerSuccess] = useState(false);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('catalogo');
  };

  const handleAnuncieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !ownerPhone) return;

    // Create a new property object to add to properties list
    const newPropertyCode = `AP0${Math.floor(Math.random() * 900) + 100}`;
    const mockProperty: Property = {
      id: `p_${Date.now()}`,
      code: newPropertyCode,
      title: `Imóvel do Proprietário - ${ownerNeighborhood}`,
      description: ownerDescription || `Imóvel de alto padrão anunciado via plataforma no bairro ${ownerNeighborhood}. Excelente oportunidade residencial.`,
      priceSale: ownerPurpose === 'Venda' ? Number(ownerPrice) || 2500000 : undefined,
      priceRent: ownerPurpose === 'Aluguel' ? Number(ownerPrice) || 12000 : undefined,
      condominio: ownerPurpose === 'Aluguel' ? 1500 : 2500,
      iptu: 600,
      type: ownerPropertyType as any,
      purpose: ownerPurpose,
      status: 'Ativo',
      neighborhood: ownerNeighborhood,
      city: ownerCity,
      address: `Rua do Proprietário, cadastrado em ${new Date().toLocaleDateString()}`,
      zipCode: '01000-000',
      bedrooms: 3,
      suites: 2,
      bathrooms: 4,
      parkingSpaces: 2,
      areaPrivativa: 150,
      areaTotal: 200,
      furnished: false,
      petsAllowed: true,
      features: ['Ar Condicionado', 'Varanda Gourmet'],
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80'
      ],
      ownerId: 'o1',
      brokerId: 'b2',
      highlight: false,
      published: true,
      visitsCount: 0,
      leadsCount: 1
    };

    onAddProperty(mockProperty);

    // Also register owner as a Lead in CRM!
    const mockLead = {
      name: ownerName,
      phone: ownerPhone,
      email: ownerEmail,
      source: 'Site' as const,
      interest: ownerPurpose,
      propertyTypeDesired: ownerPropertyType as any,
      maxPrice: Number(ownerPrice),
      notes: `Proprietário quer anunciar imóvel para ${ownerPurpose}. Descrição: ${ownerDescription}`,
      temperature: 'Quente' as const
    };
    onAddLead(mockLead);

    setOwnerSuccess(true);
    setTimeout(() => {
      // Clear form
      setOwnerName('');
      setOwnerPhone('');
      setOwnerEmail('');
      setOwnerDescription('');
      setOwnerPrice('');
      setOwnerSuccess(false);
    }, 4000);
  };

  const handleBookVisitSubmit = (e: React.FormEvent, property: Property) => {
    e.preventDefault();
    if (!visitName || !visitPhone || !visitDate) return;

    // Create a visit and lead
    const newLead = {
      name: visitName,
      phone: visitPhone,
      email: visitEmail,
      source: 'Site' as const,
      interest: property.purpose,
      propertyTypeDesired: property.type,
      notes: `Agendou visita para imóvel ${property.code} - ${property.title} no dia ${visitDate} às ${visitTime}`,
      temperature: 'Quente' as const
    };

    onAddLead(newLead);

    onBookVisit({
      id: `v_${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      leadName: visitName,
      date: visitDate,
      time: visitTime,
      brokerId: property.brokerId,
      status: 'Agendada'
    });

    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setVisitName('');
      setVisitEmail('');
      setVisitPhone('');
      setVisitDate('');
      setVisitTime('');
    }, 4000);
  };

  const handleContactSubmit = (e: React.FormEvent, property: Property) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    // Create lead
    const newLead = {
      name: contactName,
      phone: contactPhone,
      email: contactEmail,
      source: 'Site' as const,
      interest: property.purpose,
      propertyTypeDesired: property.type,
      notes: `Demonstrou interesse direto no imóvel ${property.code} - ${property.title}`,
      temperature: 'Quente' as const
    };

    onAddLead(newLead);
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
    }, 4000);
  };

  // Filter properties for public list
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (!p.published) return false;
      if (p.purpose !== 'Ambos' && p.purpose !== searchPurpose) return false;
      if (searchType !== 'Todos' && p.type !== searchType) return false;
      if (searchNeighborhood !== 'Todos' && p.neighborhood !== searchNeighborhood) return false;
      if (searchMaxPrice) {
        const price = p.purpose === 'Aluguel' ? p.priceRent : p.priceSale;
        if (price && price > Number(searchMaxPrice)) return false;
      }
      if (searchMinBedrooms && p.bedrooms < Number(searchMinBedrooms)) return false;
      return true;
    });
  }, [properties, searchPurpose, searchType, searchNeighborhood, searchMaxPrice, searchMinBedrooms]);

  const selectedProperty = useMemo(() => {
    return properties.find(p => p.id === selectedPropertyId);
  }, [properties, selectedPropertyId]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Header Público */}
      <header id="public_header" className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setSelectedPropertyId(null); setActiveTab('home'); }}>
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-serif text-lg font-bold">
                A
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-slate-900">{settings.name}</h1>
                <p className="text-[10px] font-mono text-amber-700 tracking-wider font-semibold uppercase">{settings.creciJuridico}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <button
                onClick={() => { setSelectedPropertyId(null); setActiveTab('home'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'home' && !selectedPropertyId ? 'text-slate-950 bg-slate-50' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Início
              </button>
              <button
                onClick={() => { setSelectedPropertyId(null); setActiveTab('catalogo'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'catalogo' && !selectedPropertyId ? 'text-slate-950 bg-slate-50' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Buscar Imóveis
              </button>
              <button
                onClick={() => { setSelectedPropertyId(null); setActiveTab('bairros'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'bairros' && !selectedPropertyId ? 'text-slate-950 bg-slate-50' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Bairros
              </button>
              <button
                onClick={() => { setSelectedPropertyId(null); setActiveTab('anunciar'); }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'anunciar' && !selectedPropertyId ? 'text-slate-950 bg-slate-50' : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Anuncie seu Imóvel
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/5511999998888?text=Olá!%20Gostaria%20de%20um%20atendimento%20premium%20para%20encontrar%20um%20imóvel.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Falar com Especialista</span>
            </a>
          </div>
        </div>
      </header>

      {/* Conditionally Render Selected Property Details Page */}
      {selectedPropertyId && selectedProperty ? (
        <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full animate-fade-in">
          {/* Breadcrumb e Voltar */}
          <button 
            onClick={() => setSelectedPropertyId(null)}
            className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            ← Voltar para listagem
          </button>

          {/* Galeria de Fotos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 rounded-2xl overflow-hidden shadow-md">
            <div className="md:col-span-2 h-[450px]">
              <img 
                src={selectedProperty.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'} 
                alt={selectedProperty.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden md:flex flex-col gap-4 h-[450px]">
              <div className="h-1/2 rounded-r-lg overflow-hidden">
                <img 
                  src={selectedProperty.images[1] || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80'} 
                  alt={selectedProperty.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="h-1/2 rounded-r-lg overflow-hidden bg-slate-200 flex items-center justify-center relative">
                {selectedProperty.images[2] ? (
                  <img 
                    src={selectedProperty.images[2]} 
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center text-white font-bold text-sm">
                    Ver mais fotos
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Central / Detalhes */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <span className="bg-slate-900 text-white text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded">
                    REF: {selectedProperty.code}
                  </span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded">
                    {selectedProperty.type}
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded">
                    {selectedProperty.purpose}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{selectedProperty.title}</h2>
                <p className="flex items-center gap-1.5 text-slate-500 text-xs mt-2 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  {selectedProperty.address} — {selectedProperty.neighborhood}, {selectedProperty.city}
                </p>
              </div>

              {/* Ficha técnica rápida */}
              <div className="grid grid-cols-4 gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-xs text-center">
                <div className="space-y-1">
                  <BedDouble className="w-5 h-5 mx-auto text-amber-700" />
                  <p className="text-xs text-slate-400">Suítes / Quartos</p>
                  <p className="font-semibold text-sm text-slate-900">{selectedProperty.suites} S / {selectedProperty.bedrooms} Q</p>
                </div>
                <div className="space-y-1 border-l border-slate-100">
                  <Bath className="w-5 h-5 mx-auto text-amber-700" />
                  <p className="text-xs text-slate-400">Banheiros</p>
                  <p className="font-semibold text-sm text-slate-900">{selectedProperty.bathrooms}</p>
                </div>
                <div className="space-y-1 border-l border-slate-100">
                  <Car className="w-5 h-5 mx-auto text-amber-700" />
                  <p className="text-xs text-slate-400">Vagas</p>
                  <p className="font-semibold text-sm text-slate-900">{selectedProperty.parkingSpaces}</p>
                </div>
                <div className="space-y-1 border-l border-slate-100">
                  <Maximize2 className="w-5 h-5 mx-auto text-amber-700" />
                  <p className="text-xs text-slate-400">Área Privativa</p>
                  <p className="font-semibold text-sm text-slate-900">{selectedProperty.areaPrivativa} m²</p>
                </div>
              </div>

              {/* Descrição */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Descrição Comercial</h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap bg-white p-6 rounded-2xl border border-slate-100">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Características e Infraestrutura */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">Comodidades & Diferenciais</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedProperty.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Fixa de Conversão */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm sticky top-24 space-y-6">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Valores do Imóvel</span>
                  {selectedProperty.priceSale && (
                    <div className="mt-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Preço de Venda</p>
                      <h3 className="text-2xl font-bold text-slate-900">R$ {selectedProperty.priceSale.toLocaleString('pt-BR')}</h3>
                    </div>
                  )}
                  {selectedProperty.priceRent && (
                    <div className="mt-2 pt-2 border-t border-slate-50">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Preço de Aluguel</p>
                      <h3 className="text-xl font-bold text-slate-900">R$ {selectedProperty.priceRent.toLocaleString('pt-BR')} <span className="text-xs text-slate-400">/ mês</span></h3>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-50 text-xs">
                    <div>
                      <p className="text-slate-400">Condomínio</p>
                      <p className="font-semibold text-slate-800">R$ {selectedProperty.condominio?.toLocaleString('pt-BR') || '---'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">IPTU</p>
                      <p className="font-semibold text-slate-800">R$ {selectedProperty.iptu?.toLocaleString('pt-BR') || '---'}</p>
                    </div>
                  </div>
                </div>

                {/* Form Agendamento de Visita */}
                <div className="pt-4 border-t border-slate-50 space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-700" />
                    Agendar Visita
                  </h4>

                  {visitSuccess ? (
                    <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-100 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <p className="font-bold">Visita Solicitada!</p>
                        <p className="mt-0.5">Nossa equipe entrará em contato em minutos para confirmar seu agendamento.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleBookVisitSubmit(e, selectedProperty)} className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Seu nome"
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        required
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                      />
                      <input 
                        type="tel" 
                        placeholder="WhatsApp"
                        value={visitPhone}
                        onChange={(e) => setVisitPhone(e.target.value)}
                        required
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input 
                          type="date" 
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          required
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                        />
                        <input 
                          type="time" 
                          value={visitTime}
                          onChange={(e) => setVisitTime(e.target.value)}
                          required
                          className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-2.5 rounded-lg transition-all"
                      >
                        Agendar Agora
                      </button>
                    </form>
                  )}
                </div>

                {/* Contato Corretor */}
                <div className="pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
                      alt="Corretor" 
                      className="w-10 h-10 rounded-full object-cover border border-slate-100"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Carolina Mendes</p>
                      <p className="text-[10px] text-slate-400">Especialista Apex (CRECI 198.244-F)</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <a 
                      href={`https://wa.me/5511999998888?text=Olá%20Carolina,%20gostaria%20de%20informações%20sobre%20o%20imóvel%20${selectedProperty.code}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-700" />
                      <span>WhatsApp</span>
                    </a>
                    <button 
                      onClick={() => alert(`Link de compartilhamento copiado para a área de transferência do imóvel ${selectedProperty.code}`)}
                      className="flex items-center justify-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5 text-slate-500" />
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Seção Principal do Site Público */
        <main className="flex-1">
          {/* HOME PAGE */}
          {activeTab === 'home' && (
            <div className="space-y-16 pb-16 animate-fade-in">
              {/* HERO SECTION */}
              <section className="relative bg-slate-900 text-white py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80" 
                    alt="Mansão de Luxo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                  <span className="bg-amber-600/20 text-amber-500 font-mono text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-amber-600/30 inline-flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> Exclusividade em São Paulo
                  </span>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    Encontre o seu refúgio nos endereços mais nobres de São Paulo
                  </h2>
                  <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto font-light">
                    Apartamentos, coberturas e casas arquitetônicas nos Jardins, Itaim Bibi, Pinheiros e Vila Nova Conceição. Atendimento boutique diferenciado.
                  </p>

                  {/* Formulário de Busca Rápida */}
                  <form onSubmit={handleSearchSubmit} className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-100 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto text-slate-800 text-left mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                      {/* Compra ou Aluguel */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Objetivo</label>
                        <select 
                          value={searchPurpose}
                          onChange={(e) => setSearchPurpose(e.target.value as any)}
                          className="w-full text-xs font-semibold bg-transparent border-0 border-b border-slate-200 py-1.5 focus:outline-none focus:border-amber-700 cursor-pointer"
                        >
                          <option value="Venda">Comprar</option>
                          <option value="Aluguel">Alugar</option>
                        </select>
                      </div>

                      {/* Tipo de Imóvel */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipo</label>
                        <select 
                          value={searchType}
                          onChange={(e) => setSearchType(e.target.value)}
                          className="w-full text-xs font-semibold bg-transparent border-0 border-b border-slate-200 py-1.5 focus:outline-none focus:border-amber-700 cursor-pointer"
                        >
                          <option value="Todos">Todos os Tipos</option>
                          <option value="Apartamento">Apartamento</option>
                          <option value="Casa">Casa</option>
                          <option value="Cobertura">Cobertura</option>
                        </select>
                      </div>

                      {/* Bairro */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Localização</label>
                        <select 
                          value={searchNeighborhood}
                          onChange={(e) => setSearchNeighborhood(e.target.value)}
                          className="w-full text-xs font-semibold bg-transparent border-0 border-b border-slate-200 py-1.5 focus:outline-none focus:border-amber-700 cursor-pointer"
                        >
                          <option value="Todos">São Paulo (Todos)</option>
                          <option value="Jardins">Jardins</option>
                          <option value="Itaim Bibi">Itaim Bibi</option>
                          <option value="Pinheiros">Pinheiros</option>
                        </select>
                      </div>

                      {/* Quartos */}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quartos mín.</label>
                        <select 
                          value={searchMinBedrooms}
                          onChange={(e) => setSearchMinBedrooms(e.target.value)}
                          className="w-full text-xs font-semibold bg-transparent border-0 border-b border-slate-200 py-1.5 focus:outline-none focus:border-amber-700 cursor-pointer"
                        >
                          <option value="">Qualquer</option>
                          <option value="2">2+ Quartos</option>
                          <option value="3">3+ Quartos</option>
                          <option value="4">4+ Quartos</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>Buscar Imóveis</span>
                    </button>
                  </form>
                </div>
              </section>

              {/* IMÓVEIS EM DESTAQUE */}
              <section className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                  <div>
                    <span className="text-amber-700 font-mono text-[10px] uppercase tracking-wider font-bold">Curadoria Exclusiva</span>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">Imóveis Residenciados em Destaque</h3>
                    <p className="text-slate-500 text-xs mt-1">Nossos lançamentos e destaques mais procurados nos melhores condomínios da capital.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('catalogo')}
                    className="mt-4 md:mt-0 flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    <span>Ver todos os imóveis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {properties.slice(0, 3).map((property) => (
                    <div 
                      key={property.id} 
                      onClick={() => setSelectedPropertyId(property.id)}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      {/* Imagem */}
                      <div className="h-56 relative overflow-hidden bg-slate-200">
                        <img 
                          src={property.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'} 
                          alt={property.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                          <span className="bg-slate-900/90 backdrop-blur-xs text-white text-[9px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded">
                            {property.purpose}
                          </span>
                          {property.highlight && (
                            <span className="bg-amber-600 text-white text-[9px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 fill-current" /> Destaque
                            </span>
                          )}
                        </div>

                        {/* Botão Favoritar */}
                        <button 
                          onClick={(e) => toggleFavorite(property.id, e)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white transition-all shadow-xs"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(property.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                      </div>

                      {/* Detalhes */}
                      <div className="p-5 space-y-3">
                        <div>
                          <p className="text-[10px] font-mono text-slate-400 font-semibold">{property.neighborhood} • {property.type}</p>
                          <h4 className="font-bold text-sm text-slate-900 tracking-tight group-hover:text-amber-700 transition-colors line-clamp-1 mt-0.5">
                            {property.title}
                          </h4>
                        </div>

                        {/* Características do Imóvel */}
                        <div className="flex items-center gap-3 text-slate-500 text-[11px] font-medium py-2 border-y border-slate-50">
                          <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-amber-700" /> {property.bedrooms} Dorms</span>
                          <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-amber-700" /> {property.bathrooms} Banheiros</span>
                          <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-amber-700" /> {property.parkingSpaces} Vagas</span>
                          <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-amber-700" /> {property.areaPrivativa} m²</span>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Valor Solicitado</p>
                            <h5 className="font-bold text-base text-slate-900">
                              R$ {property.purpose === 'Aluguel' ? property.priceRent?.toLocaleString('pt-BR') : property.priceSale?.toLocaleString('pt-BR')}
                              {property.purpose === 'Aluguel' && <span className="text-[10px] text-slate-400 font-normal"> /mês</span>}
                            </h5>
                          </div>
                          <span className="text-[10px] text-amber-700 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                            Ver mais →
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ANUNCIE SEU IMÓVEL - BLOCO DE CAPTAÇÃO */}
              <section className="bg-slate-100 py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <span className="text-amber-700 font-mono text-[10px] uppercase tracking-wider font-bold">Para Proprietários</span>
                    <h3 className="text-2xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight">
                      Deseja vender ou alugar sua propriedade de luxo com máxima segurança?
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Na Apex, seu patrimônio recebe o devido tratamento premium. Desenvolvemos estratégias de marketing sob medida com fotógrafos profissionais de arquitetura, campanhas direcionadas para investidores e curadoria de visitas extremamente rigorosa.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
                      <div className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-amber-700" />
                        <span>Discrição & Sigilo Absoluto</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-amber-700" />
                        <span>Assessoria Jurídica Full</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-slate-100">
                    <h4 className="text-base font-bold text-slate-900 mb-4">Cadastre seu Imóvel de Forma Rápida</h4>
                    {ownerSuccess ? (
                      <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-bold text-sm">Cadastro de Captação Concluído!</h5>
                          <p className="text-xs mt-1 leading-relaxed">Nossa equipe de avaliação entrará em contato nas próximas horas para agendar a sessão fotográfica profissional.</p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleAnuncieSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Seu Nome</label>
                            <input 
                              type="text" 
                              required
                              value={ownerName}
                              onChange={(e) => setOwnerName(e.target.value)}
                              placeholder="Nome completo"
                              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp</label>
                            <input 
                              type="tel" 
                              required
                              value={ownerPhone}
                              onChange={(e) => setOwnerPhone(e.target.value)}
                              placeholder="(11) 99999-9999"
                              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tipo do Imóvel</label>
                            <select 
                              value={ownerPropertyType}
                              onChange={(e) => setOwnerPropertyType(e.target.value)}
                              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white cursor-pointer"
                            >
                              <option value="Apartamento">Apartamento</option>
                              <option value="Casa">Casa</option>
                              <option value="Cobertura">Cobertura</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Valor Desejado (R$)</label>
                            <input 
                              type="number" 
                              required
                              value={ownerPrice}
                              onChange={(e) => setOwnerPrice(e.target.value)}
                              placeholder="Preço estimado"
                              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Breve Descrição / Localização</label>
                          <textarea 
                            rows={3}
                            value={ownerDescription}
                            onChange={(e) => setOwnerDescription(e.target.value)}
                            placeholder="Descreva brevemente o condomínio, infraestrutura e estado geral..."
                            className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white resize-none"
                          />
                        </div>

                        <button 
                          type="submit" 
                          className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Solicitar Avaliação Profissional</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* CATÁLOGO DE IMÓVEIS (LISTA COMPLETA & FILTROS) */}
          {activeTab === 'catalogo' && (
            <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in">
              <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="text-amber-700 font-mono text-[10px] uppercase tracking-wider font-bold">Catálogo Disponível</span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">Busque seu Novo Endereço</h3>
                  <p className="text-slate-500 text-xs mt-1">Filtrando {filteredProperties.length} propriedades em conformidade técnica.</p>
                </div>

                {/* Filtros de Topo Rápidos */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSearchPurpose('Venda')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border ${
                      searchPurpose === 'Venda' ? 'bg-slate-950 border-slate-950 text-white shadow-xs' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-950'
                    }`}
                  >
                    Compra
                  </button>
                  <button 
                    onClick={() => setSearchPurpose('Aluguel')}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all border ${
                      searchPurpose === 'Aluguel' ? 'bg-slate-950 border-slate-950 text-white shadow-xs' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-950'
                    }`}
                  >
                    Aluguel
                  </button>
                </div>
              </div>

              {/* Layout da Listagem com Filtros Laterais */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filtros Lateral */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-5">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">Refinar Filtros</h4>
                    
                    {/* Bairro */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bairro Nobre</label>
                      <select 
                        value={searchNeighborhood} 
                        onChange={(e) => setSearchNeighborhood(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white cursor-pointer font-medium"
                      >
                        <option value="Todos">Todos os bairros</option>
                        <option value="Jardins">Jardins</option>
                        <option value="Itaim Bibi">Itaim Bibi</option>
                        <option value="Pinheiros">Pinheiros</option>
                        <option value="Vila Nova Conceição">Vila Nova Conceição</option>
                      </select>
                    </div>

                    {/* Tipo */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categoria</label>
                      <select 
                        value={searchType} 
                        onChange={(e) => setSearchType(e.target.value)}
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white cursor-pointer font-medium"
                      >
                        <option value="Todos">Todos os tipos</option>
                        <option value="Apartamento">Apartamentos</option>
                        <option value="Casa">Casas</option>
                        <option value="Cobertura">Coberturas</option>
                      </select>
                    </div>

                    {/* Preço Limite */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Preço Limite (R$)
                      </label>
                      <input 
                        type="number" 
                        value={searchMaxPrice}
                        onChange={(e) => setSearchMaxPrice(e.target.value)}
                        placeholder="Ex: 5000000"
                        className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                      />
                    </div>

                    <button 
                      onClick={() => {
                        setSearchNeighborhood('Todos');
                        setSearchType('Todos');
                        setSearchMaxPrice('');
                        setSearchMinBedrooms('');
                      }}
                      className="w-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-xs font-bold py-2 rounded-lg transition-all"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>

                {/* Grid Resultados */}
                <div className="lg:col-span-3">
                  {filteredProperties.length === 0 ? (
                    <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center space-y-4 shadow-xs">
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mx-auto text-slate-400">
                        <Search className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">Nenhum imóvel corresponde aos filtros</h4>
                        <p className="text-slate-500 text-xs max-w-sm mx-auto">Tente flexibilizar os valores limite ou bairros desejados para encontrar opções adicionais.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredProperties.map((property) => (
                        <div 
                          key={property.id} 
                          onClick={() => setSelectedPropertyId(property.id)}
                          className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer group"
                        >
                          {/* Imagem */}
                          <div className="h-52 relative overflow-hidden bg-slate-200">
                            <img 
                              src={property.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'} 
                              alt={property.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                              <span className="bg-slate-900/95 backdrop-blur-xs text-white text-[9px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded">
                                {property.purpose}
                              </span>
                              {property.highlight && (
                                <span className="bg-amber-600 text-white text-[9px] font-mono tracking-wider uppercase font-bold px-2 py-0.5 rounded">
                                  Destaque
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Detalhes */}
                          <div className="p-5 space-y-3">
                            <div>
                              <p className="text-[10px] font-mono text-slate-400 font-semibold">{property.neighborhood} • {property.type}</p>
                              <h4 className="font-bold text-sm text-slate-900 tracking-tight group-hover:text-amber-700 transition-colors line-clamp-1 mt-0.5">
                                {property.title}
                              </h4>
                            </div>

                            {/* Características */}
                            <div className="flex items-center gap-3 text-slate-500 text-[11px] font-medium py-2 border-y border-slate-50">
                              <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5 text-amber-700" /> {property.bedrooms}D</span>
                              <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5 text-amber-700" /> {property.bathrooms}B</span>
                              <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-amber-700" /> {property.parkingSpaces}V</span>
                              <span className="flex items-center gap-1"><Maximize2 className="w-3.5 h-3.5 text-amber-700" /> {property.areaPrivativa}m²</span>
                            </div>

                            <div className="flex items-center justify-between pt-1">
                              <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Valor do Investimento</p>
                                <h5 className="font-bold text-sm text-slate-900">
                                  R$ {property.purpose === 'Aluguel' ? property.priceRent?.toLocaleString('pt-BR') : property.priceSale?.toLocaleString('pt-BR')}
                                  {property.purpose === 'Aluguel' && <span className="text-[10px] text-slate-400 font-normal"> /mês</span>}
                                </h5>
                              </div>
                              <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5">
                                Ver Detalhes →
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* EXPLORAR BAIRROS */}
          {activeTab === 'bairros' && (
            <div className="max-w-7xl mx-auto px-6 py-8 animate-fade-in space-y-12">
              <div>
                <span className="text-amber-700 font-mono text-[10px] uppercase tracking-wider font-bold">Zonas Nobres</span>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">Guia de Bairros Residenciais Premium</h3>
                <p className="text-slate-500 text-xs mt-1">Entenda o perfil de cada região antes de tomar sua decisão patrimonial.</p>
              </div>

              <div className="space-y-12">
                {neighborhoods.map((n, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 p-6 lg:p-8 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="h-56 lg:h-auto rounded-xl overflow-hidden relative bg-slate-200">
                      <img 
                        src={n.imageUrl} 
                        alt={n.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-bold text-slate-900">{n.name}</h4>
                          <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{n.city}</span>
                        </div>
                        <p className="text-slate-600 text-xs leading-relaxed">{n.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">M² Médio Venda</p>
                            <p className="text-sm font-bold text-slate-900">R$ {n.averagePriceSale.toLocaleString('pt-BR')}</p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">M² Médio Aluguel</p>
                            <p className="text-sm font-bold text-slate-900">R$ {n.averagePriceRent.toLocaleString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-50 flex items-center justify-between flex-wrap gap-4">
                        <div className="text-xs font-semibold text-slate-800">
                          {n.activeProperties} Imóveis cadastrados na região
                        </div>
                        <button 
                          onClick={() => {
                            setSearchNeighborhood(n.name);
                            setActiveTab('catalogo');
                          }}
                          className="bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                        >
                          Explorar Imóveis do Bairro
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANUNCIE SEU IMÓVEL */}
          {activeTab === 'anunciar' && (
            <div className="max-w-3xl mx-auto px-6 py-12 animate-fade-in space-y-8">
              <div className="text-center space-y-2">
                <span className="text-amber-700 font-mono text-[10px] uppercase tracking-wider font-bold">Captação Exclusiva</span>
                <h3 className="text-3xl font-serif font-bold text-slate-900">Anuncie Seu Patrimônio Imobiliário</h3>
                <p className="text-slate-500 text-xs max-w-lg mx-auto">Disponibilizamos nossa estrutura de ponta para intermediar seu negócio com sofisticação comercial absoluta.</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-100">
                {ownerSuccess ? (
                  <div className="p-8 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 text-center space-y-4">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <div>
                      <h4 className="font-bold text-lg">Cadastro Concluído com Sucesso!</h4>
                      <p className="text-xs mt-1 text-emerald-700 max-w-md mx-auto">Recebemos sua proposta de captação. Um de nossos corretores especialistas em {ownerNeighborhood} entrará em contato em menos de 2 horas para formalizar o laudo inicial.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAnuncieSubmit} className="space-y-6">
                    <div className="border-b border-slate-100 pb-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950">1. Dados de Contato</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Seu Nome Completo</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Ex: Guilherme Leal"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">WhatsApp de Contato</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="Ex: (11) 99999-8888"
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Endereço de E-mail</label>
                      <input 
                        type="email" 
                        required
                        placeholder="Ex: guilherme.leal@email.com"
                        value={ownerEmail}
                        onChange={(e) => setOwnerEmail(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white"
                      />
                    </div>

                    <div className="border-b border-slate-100 pb-2 pt-4">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-950">2. Características do Imóvel</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Tipo</label>
                        <select 
                          value={ownerPropertyType} 
                          onChange={(e) => setOwnerPropertyType(e.target.value)}
                          className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white cursor-pointer font-semibold"
                        >
                          <option value="Apartamento">Apartamento</option>
                          <option value="Casa">Casa</option>
                          <option value="Cobertura">Cobertura</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Bairro</label>
                        <select 
                          value={ownerNeighborhood} 
                          onChange={(e) => setOwnerNeighborhood(e.target.value)}
                          className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white cursor-pointer font-semibold"
                        >
                          <option value="Jardins">Jardins</option>
                          <option value="Itaim Bibi">Itaim Bibi</option>
                          <option value="Pinheiros">Pinheiros</option>
                          <option value="Vila Nova Conceição">Vila Nova Conceição</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-600">Finalidade</label>
                        <select 
                          value={ownerPurpose} 
                          onChange={(e) => setOwnerPurpose(e.target.value as any)}
                          className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white cursor-pointer font-semibold"
                        >
                          <option value="Venda">Desejo Vender</option>
                          <option value="Aluguel">Desejo Alugar</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Valor Pretendido (R$)</label>
                      <input 
                        type="number" 
                        required
                        placeholder="Ex: 4500000"
                        value={ownerPrice}
                        onChange={(e) => setOwnerPrice(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white font-semibold"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Observações de Diferenciais</label>
                      <textarea 
                        rows={4}
                        placeholder="Ex: Prédio assinado por Isay Weinfeld, marcenaria alemã sob medida, adega de pedras brutas..."
                        value={ownerDescription}
                        onChange={(e) => setOwnerDescription(e.target.value)}
                        className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-700 focus:bg-white resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Cadastrar Proposta de Captação</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </main>
      )}

      {/* Footer Público */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-bold">
                A
              </div>
              <h4 className="text-white font-bold text-sm">{settings.name}</h4>
            </div>
            <p className="text-[11px] leading-relaxed">
              Intermediação imobiliária corporativa de alto padrão. Atendimento boutique focado na discrição comercial absoluta.
            </p>
            <p className="text-[10px] font-mono font-semibold text-amber-500 uppercase tracking-wider">{settings.creciJuridico}</p>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Endereços Principais</h5>
            <ul className="text-xs space-y-2 leading-relaxed">
              <li>Itaim Bibi, São Paulo</li>
              <li>Jardins, São Paulo</li>
              <li>Pinheiros, São Paulo</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Contato Direto</h5>
            <ul className="text-xs space-y-2">
              <li>Telefone: +55 (11) 3450-9999</li>
              <li>WhatsApp: {settings.whatsapp}</li>
              <li>E-mail: {settings.email}</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Conformidade Legal</h5>
            <p className="text-[10px] leading-relaxed text-slate-500">
              Todas as imagens são ilustrativas. Preços e condições sujeitos a alterações sem aviso prévio nos termos da legislação brasileira.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-6 text-center text-[10px] text-slate-600">
          <p>© 2026 Apex Imóveis Corp. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
