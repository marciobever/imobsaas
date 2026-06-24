import { Property, Lead, Task, Owner, Broker, Proposal, Rental, NeighborhoodStats, AgencySettings } from './types';

export const INITIAL_SETTINGS: AgencySettings = {
  name: 'Apex Imóveis Premium',
  logo: 'Apex',
  primaryColor: '#0F172A', // Slate 900
  accentColor: '#B45309', // Amber 700 / Ouro envelhecido
  whatsapp: '+55 (11) 99999-8888',
  email: 'contato@apeximoveis.com.br',
  address: 'Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi, São Paulo - SP',
  creciJuridico: 'CRECI 24.580-J',
  seoTitle: 'Apex Premium | Imobiliária de Alto Padrão em São Paulo',
  seoDescription: 'Encontre apartamentos, coberturas e casas de luxo nos bairros mais nobres de São Paulo. Atendimento exclusivo e discrição absoluta.'
};

export const BROKERS: Broker[] = [
  {
    id: 'b1',
    name: 'Roberto Shinyashiki',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    phone: '(11) 98888-1111',
    email: 'roberto@apeximoveis.com.br',
    role: 'Gerente',
    creci: 'CRECI 142.500-F',
    active: true,
    assignedLeads: 12,
    assignedProperties: 8,
    targetSales: 4500000,
    currentSales: 3100000
  },
  {
    id: 'b2',
    name: 'Carolina Mendes',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '(11) 98888-2222',
    email: 'carolina@apeximoveis.com.br',
    role: 'Corretor',
    creci: 'CRECI 198.244-F',
    active: true,
    assignedLeads: 24,
    assignedProperties: 15,
    targetSales: 3500000,
    currentSales: 4200000
  },
  {
    id: 'b3',
    name: 'Thiago Alencar',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '(11) 98888-3333',
    email: 'thiago@apeximoveis.com.br',
    role: 'Corretor',
    creci: 'CRECI 210.450-F',
    active: true,
    assignedLeads: 18,
    assignedProperties: 12,
    targetSales: 3500000,
    currentSales: 2400000
  },
  {
    id: 'b4',
    name: 'Mariana Costa',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '(11) 98888-4444',
    email: 'mariana@apeximoveis.com.br',
    role: 'Atendimento',
    active: true,
    assignedLeads: 45,
    assignedProperties: 0,
    targetSales: 0,
    currentSales: 0
  }
];

export const OWNERS: Owner[] = [
  {
    id: 'o1',
    name: 'Guilherme Leal',
    phone: '(11) 97777-1111',
    email: 'guilherme.leal@email.com',
    document: '123.456.789-00',
    propertiesIds: ['p1', 'p4'],
    notes: 'Empresário do setor de cosméticos, prefere contatos rápidos por WhatsApp.'
  },
  {
    id: 'o2',
    name: 'Beatriz Villela',
    phone: '(11) 97777-2222',
    email: 'beatriz.villela@email.com',
    document: '987.654.321-11',
    propertiesIds: ['p2', 'p5'],
    notes: 'Arquiteta de renome, proprietária de imóveis super sofisticados nos Jardins.'
  },
  {
    id: 'o3',
    name: 'Carlos Alberto Sicupira',
    phone: '(11) 97777-3333',
    email: 'carlos.sicupira@email.com',
    document: '111.222.333-44',
    propertiesIds: ['p3'],
    notes: 'Investidor institucional, focado em alta rentabilidade de aluguel.'
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'p1',
    code: 'AP0844',
    title: 'Garden Duplex com Piscina Privativa no Itaim Bibi',
    description: 'Belo apartamento garden duplex com assinatura de arquiteto renomado. Living com pé direito duplo totalmente integrado à área gourmet externa com piscina aquecida. Acabamentos em mármore Carrara, marcenaria Ornare completa, automação total de som, luz e cortinas. 4 suítes espaçosas, sendo a master com closet generoso e banheira de imersão. Condomínio de altíssimo padrão com segurança armada e lazer de clube privativo.',
    priceSale: 8400000,
    priceRent: 35000,
    condominio: 3800,
    iptu: 1500,
    type: 'Apartamento',
    purpose: 'Ambos',
    status: 'Ativo',
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    address: 'Rua Jerônimo da Veiga, 450',
    zipCode: '04536-001',
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpaces: 4,
    areaPrivativa: 320,
    areaTotal: 450,
    floor: 1,
    solarPosition: 'Norte (Sol da manhã e tarde)',
    furnished: true,
    petsAllowed: true,
    features: ['Piscina Privativa', 'Espaço Gourmet', 'Pé-direito Duplo', 'Automação Residencial', 'Mobiliado', 'Ar Condicionado Central', 'Portaria 24h', 'Depósito Privativo', 'Sala de Academia'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80'
    ],
    ownerId: 'o1',
    brokerId: 'b2',
    highlight: true,
    published: true,
    visitsCount: 42,
    leadsCount: 18,
    notes: 'Visitas precisam ser agendadas com 24h de antecedência. Chaves na portaria.'
  },
  {
    id: 'p2',
    code: 'CO1054',
    title: 'Cobertura Linear Vista 360° nos Jardins',
    description: 'Espetacular cobertura linear que ocupa todo o andar do prestigiado edifício nos Jardins. Hall privativo, amplo living em 3 ambientes com painéis de vidro corrediços que abrem para um imenso deck de madeira com spa, solário e paisagismo impecável. Cozinha profissional totalmente equipada, sala de cinema privativa e adega climatizada para 300 garrafas. Suíte master imponente de 80m² com banheiros Sr. e Sra.',
    priceSale: 14500000,
    condominio: 5200,
    iptu: 2800,
    type: 'Cobertura',
    purpose: 'Venda',
    status: 'Ativo',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    address: 'Alameda Lorena, 1800',
    zipCode: '01424-002',
    bedrooms: 3,
    suites: 3,
    bathrooms: 5,
    parkingSpaces: 5,
    areaPrivativa: 480,
    areaTotal: 650,
    floor: 22,
    solarPosition: '360 Graus',
    furnished: false,
    petsAllowed: true,
    features: ['Cobertura Linear', 'Vista Panorâmica', 'Ofurô/Spa', 'Adega Climatizada', 'Churrasqueira', 'Elevador Privativo', 'Gerador Full', 'Segurança Virtual'],
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80'
    ],
    ownerId: 'o2',
    brokerId: 'b2',
    highlight: true,
    published: true,
    visitsCount: 29,
    leadsCount: 11,
    notes: 'Proprietária exige ficha cadastral prévia dos interessados antes de liberar visita.'
  },
  {
    id: 'p3',
    code: 'AP0412',
    title: 'Apartamento Contemporâneo Impecável em Pinheiros',
    description: 'Imóvel super moderno, ideal para quem busca praticidade com altíssimo nível de conforto. Localizado no quadrilátero de ouro de Pinheiros, próximo a restaurantes renomados e galerias de arte. Planta originalmente de 3 dormitórios, aberta para expandir o living e criar uma aconchegante sala de TV e escritório. Varanda integrada envidraçada com churrasqueira gourmet de última geração. Cozinha integrada de conceito aberto.',
    priceSale: 2950000,
    priceRent: 12000,
    condominio: 1500,
    iptu: 600,
    type: 'Apartamento',
    purpose: 'Ambos',
    status: 'Ativo',
    neighborhood: 'Pinheiros',
    city: 'São Paulo',
    address: 'Rua dos Pinheiros, 820',
    zipCode: '05422-001',
    bedrooms: 2,
    suites: 2,
    bathrooms: 3,
    parkingSpaces: 2,
    areaPrivativa: 125,
    areaTotal: 190,
    floor: 12,
    solarPosition: 'Leste (Sol da manhã)',
    furnished: true,
    petsAllowed: true,
    features: ['Varanda Gourmet', 'Churrasqueira', 'Mobiliado', 'Ar Condicionado', 'Condomínio Club', 'Fechadura Biométrica', 'Carregador de Carro Elétrico'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80'
    ],
    ownerId: 'o3',
    brokerId: 'b3',
    highlight: false,
    published: true,
    visitsCount: 56,
    leadsCount: 34,
    notes: 'Facilidade de agendamento. Proprietário aceita contraproposta à vista.'
  },
  {
    id: 'p4',
    code: 'CA1203',
    title: 'Casa Arquitetônica Minimalista no Jardim Europa',
    description: 'Uma verdadeira obra de arte residencial no bairro mais exclusivo da cidade. Estrutura metálica aparente combinando concreto, vidro e madeira de demolição. Projetada por arquiteto premiado internacionalmente. Living integrado com pé-direito triplo de 8 metros e claraboia central que proporciona iluminação zenital indescritível. Maravilhoso jardim tropical com raia olímpica de natação, sauna seca integrada e academia profissional.',
    priceSale: 24000000,
    condominio: 0,
    iptu: 4500,
    type: 'Casa',
    purpose: 'Venda',
    status: 'Ativo',
    neighborhood: 'Jardins',
    city: 'São Paulo',
    address: 'Rua Turquia, 120',
    zipCode: '01449-010',
    bedrooms: 5,
    suites: 5,
    bathrooms: 8,
    parkingSpaces: 8,
    areaPrivativa: 820,
    areaTotal: 1100,
    solarPosition: 'Norte-Oeste',
    furnished: false,
    petsAllowed: true,
    features: ['Raia de Natação', 'Sauna Seca', 'Pé-direito Triplo', 'Claraboia/Luz Natural', 'Academia', 'Segurança Armada', 'Sistema de Câmeras Al', 'Aquecimento Solar'],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80'
    ],
    ownerId: 'o1',
    brokerId: 'b1',
    highlight: true,
    published: true,
    visitsCount: 15,
    leadsCount: 5,
    notes: 'Exclusividade Apex. Visitas com Roberto Shinyashiki.'
  },
  {
    id: 'p5',
    code: 'AP1120',
    title: 'Apartamento Clássico de Altíssimo Padrão na Vila Nova Conceição',
    description: 'Localizado a poucos passos do Parque do Ibirapuera, este apartamento combina elegância clássica e conforto moderno. Living imenso com lareira ecológica em mármore nero marquina, sala de jantar formal separada, prataria e despensa. Suite master imensa com walk-in closet senhor e senhora separados. Prédio tradicionalíssimo com recuo monumental e portaria blindada com controle de acesso rigoroso.',
    priceSale: 11800000,
    priceRent: 45000,
    condominio: 4500,
    iptu: 2200,
    type: 'Apartamento',
    purpose: 'Ambos',
    status: 'Reservado',
    neighborhood: 'Vila Nova Conceição',
    city: 'São Paulo',
    address: 'Praça Pereira Coutinho, 110',
    zipCode: '04510-010',
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parkingSpaces: 5,
    areaPrivativa: 380,
    areaTotal: 520,
    floor: 16,
    solarPosition: 'Norte (Sol pleno no inverno)',
    furnished: false,
    petsAllowed: true,
    features: ['Lareira', 'Sacada', 'Próximo ao Parque', 'Portaria Blindada', 'Depósito', 'Piscina Coberta Aquecida', 'Gerador para todo o Apartamento'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=80'
    ],
    ownerId: 'o2',
    brokerId: 'b3',
    highlight: false,
    published: true,
    visitsCount: 33,
    leadsCount: 14,
    notes: 'Imóvel atualmente reservado em fase de auditoria de certidões judiciais para venda.'
  }
];

export const NEIGHBORHOODS: NeighborhoodStats[] = [
  {
    name: 'Itaim Bibi',
    city: 'São Paulo',
    averagePriceSale: 22000,
    averagePriceRent: 95,
    activeProperties: 48,
    description: 'O principal centro financeiro e de entretenimento corporativo de São Paulo. Reúne edifícios corporativos icônicos, restaurantes premiados internacionalmente e apartamentos boutique ultra-modernos voltados para profissionais exigentes.',
    advantages: ['Quadrilátero de ouro corporativo', 'Hub gastronômico estelar (Faria Lima)', 'Ruas planas excelentes para caminhabilidade', 'Altíssima segurança ativa e passiva'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Jardins',
    city: 'São Paulo',
    averagePriceSale: 25000,
    averagePriceRent: 110,
    activeProperties: 72,
    description: 'O bairro residencial de luxo mais tradicional do país. Ruas extremamente arborizadas, lojas de grifes globais na Oscar Freire e casarões imponentes mesclados com edifícios de altíssimo padrão arquitetônico.',
    advantages: ['Lojas de luxo e grifes internacionais', 'Restaurantes com estrela Michelin', 'Urbanismo europeu altamente arborizado', 'Facilidade de acesso à Av. Paulista'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80'
  },
  {
    name: 'Pinheiros',
    city: 'São Paulo',
    averagePriceSale: 18500,
    averagePriceRent: 80,
    activeProperties: 61,
    description: 'A vanguarda cultural e intelectual de São Paulo. Pinheiros une de forma simbiótica o charme de uma região residencial com cafés conceituais, galerias de arte contemporânea, metrô integrado e grande pluralidade arquitetônica.',
    advantages: ['Cultura rica e ambiente descontraído', 'Excelência em transporte coletivo multimodal', 'Parques urbanos e praças de convivência', 'Forte potencial de valorização imobiliária'],
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Roberto Civita Neto',
    phone: '(11) 99122-3344',
    email: 'roberto.civita@investidores.com',
    source: 'Site',
    interest: 'Compra',
    propertyTypeDesired: 'Cobertura',
    neighborhoodDesired: ['Jardins', 'Vila Nova Conceição'],
    maxPrice: 15000000,
    stage: 'Visita Agendada',
    brokerId: 'b2',
    temperature: 'Quente',
    createdAt: '2026-06-15T10:00:00Z',
    lastInteraction: '2026-06-22T15:30:00Z',
    nextTaskDate: '2026-06-25',
    notes: 'Busca cobertura ampla com boa insolação, sem necessidade de estar reformada (pretende fazer obra completa).',
    history: [
      {
        id: 'i1_1',
        type: 'Nota',
        content: 'Lead qualificado. Confirmado interesse em coberturas acima de 300m² privativos.',
        date: '2026-06-15T10:30:00Z',
        brokerName: 'Carolina Mendes'
      },
      {
        id: 'i1_2',
        type: 'WhatsApp',
        content: 'Enviadas 3 opções de coberturas nos Jardins. Gostou muito do código CO1054 e solicitou visita.',
        date: '2026-06-18T14:15:00Z',
        brokerName: 'Carolina Mendes'
      },
      {
        id: 'i1_3',
        type: 'Visita',
        content: 'Visita pré-agendada e autorizada pela proprietária Beatriz para o dia 25/06 às 14h.',
        date: '2026-06-22T15:30:00Z',
        brokerName: 'Carolina Mendes'
      }
    ]
  },
  {
    id: 'l2',
    name: 'Alessandra Ambrósio',
    phone: '(11) 98111-7777',
    email: 'alessandra.ambrosio@model.com',
    source: 'WhatsApp',
    interest: 'Ambos',
    propertyTypeDesired: 'Apartamento',
    neighborhoodDesired: ['Itaim Bibi', 'Jardins'],
    maxPrice: 9000000,
    stage: 'Contato Inicial',
    brokerId: 'b2',
    temperature: 'Morno',
    createdAt: '2026-06-21T09:12:00Z',
    lastInteraction: '2026-06-21T09:45:00Z',
    nextTaskDate: '2026-06-24',
    notes: 'Busca imóvel mobiliado pronto para morar com segurança máxima. Passará temporadas no Brasil.',
    history: [
      {
        id: 'i2_1',
        type: 'WhatsApp',
        content: 'Primeiro contato realizado após lead gerado via link direto do WhatsApp do imóvel AP0844. Mostrou-se simpática mas informou estar em viagem nos EUA até o dia 28/06.',
        date: '2026-06-21T09:45:00Z',
        brokerName: 'Carolina Mendes'
      }
    ]
  },
  {
    id: 'l3',
    name: 'Felipe Massa',
    phone: '(11) 99200-5555',
    email: 'felipe.massa@racing.com',
    source: 'Indicação',
    interest: 'Compra',
    propertyTypeDesired: 'Casa',
    neighborhoodDesired: ['Jardins'],
    maxPrice: 25000000,
    stage: 'Proposta',
    brokerId: 'b1',
    temperature: 'Quente',
    createdAt: '2026-06-02T11:00:00Z',
    lastInteraction: '2026-06-23T16:00:00Z',
    nextTaskDate: '2026-06-24',
    notes: 'Ex-piloto de F1, focado no imóvel CA1203 no Jardim Europa. Deseja fechar negócio rápido.',
    history: [
      {
        id: 'i3_1',
        type: 'Visita',
        content: 'Visita presencial fantástica com toda a família. Gostaram muito do paisagismo e da área de lazer.',
        date: '2026-06-10T15:00:00Z',
        brokerName: 'Roberto Shinyashiki'
      },
      {
        id: 'i3_2',
        type: 'Nota',
        content: 'Solicitou certidões atualizadas do imóvel e da holding proprietária do Guilherme Leal.',
        date: '2026-06-16T11:30:00Z',
        brokerName: 'Roberto Shinyashiki'
      },
      {
        id: 'i3_3',
        type: 'Proposta',
        content: 'Apresentou proposta formal de R$ 22.500.000 à vista (desconto sobre os R$ 24.000.000). Proposta enviada ao proprietário.',
        date: '2026-06-23T16:00:00Z',
        brokerName: 'Roberto Shinyashiki'
      }
    ]
  },
  {
    id: 'l4',
    name: 'José Olympio Pereira',
    phone: '(11) 97345-6789',
    email: 'jose.olympio@banco.com',
    source: 'Zap',
    interest: 'Aluguel',
    propertyTypeDesired: 'Apartamento',
    neighborhoodDesired: ['Pinheiros'],
    maxPrice: 15000,
    stage: 'Negociação',
    brokerId: 'b3',
    temperature: 'Quente',
    createdAt: '2026-06-10T08:30:00Z',
    lastInteraction: '2026-06-22T11:00:00Z',
    nextTaskDate: '2026-06-24',
    notes: 'Diretor de banco de investimento. Aluguel do AP0412 em Pinheiros para moradia de seu filho universitário.',
    history: [
      {
        id: 'i4_1',
        type: 'Visita',
        content: 'Visita realizada pelo filho que aprovou integralmente as acomodações do condomínio.',
        date: '2026-06-14T10:00:00Z',
        brokerName: 'Thiago Alencar'
      },
      {
        id: 'i4_2',
        type: 'WhatsApp',
        content: 'Negociação de valores iniciada. Solicitou isenção de 2 meses de condomínio devido a uma pequena reforma estética necessária.',
        date: '2026-06-19T16:00:00Z',
        brokerName: 'Thiago Alencar'
      },
      {
        id: 'i4_3',
        type: 'Nota',
        content: 'Proprietário Carlos Alberto aceitou conceder R$ 5.000 de abatimento total parcelado nos 3 primeiros aluguéis. Enviando minutas do contrato.',
        date: '2026-06-22T11:00:00Z',
        brokerName: 'Thiago Alencar'
      }
    ]
  },
  {
    id: 'l5',
    name: 'Eduardo Gualter',
    phone: '(11) 96322-1111',
    email: 'eduardo@gualteradv.com.br',
    source: 'Instagram',
    interest: 'Compra',
    propertyTypeDesired: 'Apartamento',
    maxPrice: 3500000,
    stage: 'Novo Lead',
    brokerId: 'b4',
    temperature: 'Morno',
    createdAt: '2026-06-23T15:00:00Z',
    lastInteraction: '2026-06-23T15:00:00Z',
    notes: 'Gerou lead preenchendo formulário de campanha de Instagram. Demonstrou interesse genérico em apartamentos em Pinheiros ou Itaim.',
    history: []
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Confirmar documentos da proposta de Felipe Massa (CA1203)',
    dueDate: '2026-06-24',
    status: 'Pendente',
    type: 'Proposta',
    leadId: 'l3',
    leadName: 'Felipe Massa',
    brokerId: 'b1'
  },
  {
    id: 't2',
    title: 'Acompanhar envio de minuta de contrato de locação (AP0412)',
    dueDate: '2026-06-24',
    status: 'Pendente',
    type: 'Follow-up',
    leadId: 'l4',
    leadName: 'José Olympio Pereira',
    brokerId: 'b3'
  },
  {
    id: 't3',
    title: 'Visita guiada no imóvel CO1054 nos Jardins',
    dueDate: '2026-06-25',
    status: 'Pendente',
    type: 'Visita',
    leadId: 'l1',
    leadName: 'Roberto Civita Neto',
    brokerId: 'b2'
  },
  {
    id: 't4',
    title: 'Primeira ligação para qualificação de Eduardo Gualter',
    dueDate: '2026-06-24',
    status: 'Pendente',
    type: 'Ligação',
    leadId: 'l5',
    leadName: 'Eduardo Gualter',
    brokerId: 'b4'
  },
  {
    id: 't5',
    title: 'Retorno WhatsApp de Alessandra Ambrósio nos EUA',
    dueDate: '2026-06-28',
    status: 'Pendente',
    type: 'Follow-up',
    leadId: 'l2',
    leadName: 'Alessandra Ambrósio',
    brokerId: 'b2'
  }
];

export const PROPOSALS: Proposal[] = [
  {
    id: 'pr1',
    leadId: 'l3',
    leadName: 'Felipe Massa',
    propertyId: 'p4',
    propertyTitle: 'Casa Arquitetônica Minimalista no Jardim Europa',
    brokerId: 'b1',
    brokerName: 'Roberto Shinyashiki',
    type: 'Venda',
    value: 22500000,
    date: '2026-06-23T16:00:00Z',
    status: 'Em Análise',
    notes: 'Pagamento integral à vista mediante assinatura da escritura de compra e venda.',
    history: [
      '2026-06-23: Proposta recebida do comprador e encaminhada ao proprietário Guilherme Leal.'
    ]
  }
];

export const RENTALS: Rental[] = [
  {
    id: 'r1',
    leadId: 'l4',
    leadName: 'José Olympio Pereira',
    propertyId: 'p3',
    propertyTitle: 'Apartamento Contemporâneo Impecável em Pinheiros',
    brokerId: 'b3',
    value: 12000,
    startDate: '2026-07-01',
    endDate: '2028-06-30',
    guarantee: 'Seguro Fiança',
    status: 'Pendente',
    documents: ['RG/CPF Locatário', 'Comprovante de Renda', 'Apólice de Seguro Porto Seguro'],
    notes: 'Contrato de 30 meses com isenção de multa contratual após 12 meses.'
  }
];
