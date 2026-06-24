import React, { useState } from 'react';
import { BookOpen, Map, Home, ShieldAlert, BarChart3, Layers, Settings, Sparkles, Database, Users2, Workflow, ArrowRightLeft } from 'lucide-react';

export default function SitemapSpec() {
  const [activeTab, setActiveTab] = useState<string>('visao');

  const sections = [
    { id: 'visao', label: '1. Visão Geral', icon: BookOpen },
    { id: 'sitemap', label: '2. Sitemap Completo', icon: Map },
    { id: 'site_publico', label: '3. Detalhamento Público', icon: Home },
    { id: 'crm_detalhe', label: '4. Detalhamento CRM', icon: ShieldAlert },
    { id: 'telas', label: '5. Estrutura de Telas', icon: Layers },
    { id: 'design_system', label: '6. Design System', icon: Sparkles },
    { id: 'banco', label: '7. Estrutura de Dados', icon: Database },
    { id: 'fluxos', label: '8. Fluxos de Negócio', icon: Workflow },
    { id: 'permissoes', label: '9. Perfis & Permissões', icon: Users2 },
    { id: 'ux_conversao', label: '10. Recomendações UX', icon: ArrowRightLeft },
    { id: 'ui_layout', label: '11. Recomendações UI', icon: Settings },
    { id: 'roadmap', label: '12. Roadmap de Evolução', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px] text-slate-700">
      {/* Sidebar de Navegação do Documento */}
      <div className="w-full lg:w-80 shrink-0 bg-slate-900 text-white rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <span className="text-amber-500 font-mono text-xs tracking-wider uppercase font-bold">Documentação</span>
            <h3 className="text-xl font-bold font-sans mt-1 text-slate-100">Especificação de Produto</h3>
            <p className="text-xs text-slate-400 mt-1">ImobiSaaS - Portal & CRM Premium</p>
          </div>
          
          <nav className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isSelected = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-xs font-medium transition-all duration-150 ${
                    isSelected 
                      ? 'bg-amber-600 text-white shadow-md' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-800 text-[10px] text-slate-400 font-mono text-center">
          <p>Apex Imóveis Corp © 2026</p>
          <p>Projeto de Produto Homologado</p>
        </div>
      </div>

      {/* Área de Conteúdo da Especificação */}
      <div className="flex-1 bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-slate-100 overflow-y-auto max-h-[800px] text-sm leading-relaxed">
        {activeTab === 'visao' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 1</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Visão Geral do Produto</h2>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 mt-4">1.1 Posicionamento da Plataforma</h3>
              <p>
                A <strong>Apex Imóveis Premium</strong> é uma plataforma SaaS imobiliária de ponta a ponta (All-in-One), focada no segmento de <strong>alto padrão e luxo</strong>. Ela resolve a desconexão histórica entre o portal imobiliário voltado ao cliente final e o sistema de CRM operacional utilizado pelos corretores.
              </p>
              <p>
                Ao contrário de soluções generalistas e legadas de mercado, que entregam experiências visuais datadas e funis comerciais rígidos, a Apex combina a sofisticação de uma boutique imobiliária com a eficiência tecnológica de um SaaS financeiro.
              </p>

              <h3 className="text-lg font-bold text-slate-900 mt-4">1.2 A Lógica dos Módulos</h3>
              <p>
                O sistema opera de forma simbiótica e totalmente integrada:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Módulo de Captação & Portal Público:</strong> Uma máquina de conversão de leads refinada, otimizada para SEO local em bairros e condomínios específicos de alta renda. Os formulários e gatilhos de WhatsApp são rastreáveis, gerando ricas informações comportamentais sobre o interesse do visitante.</li>
                <li><strong>Módulo CRM Comercial:</strong> Uma esteira ágil onde leads e propriedades se conectam de forma automatizada. Corretores contam com pipelines visuais (Kanban), gestão de proprietários, histórico imutável de interações, e agendamento de visitas sincronizado.</li>
                <li><strong>Módulo Executivo de Inteligência:</strong> Dashboards operacionais e relatórios consolidados que oferecem aos gerentes e proprietários da imobiliária total visibilidade sobre conversão de corretores, retorno de investimento em portais de anúncios, e liquidez de portfólio.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 mt-4">1.3 Proposta de Valor</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-amber-700">Para Clientes</h4>
                  <p className="text-xs text-slate-600">Navegação fluida, fotos monumentais em altíssima resolução, atendimento exclusivo via WhatsApp em segundos e agendamentos inteligentes sem burocracia.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-amber-700">Para Corretores</h4>
                  <p className="text-xs text-slate-600">Eliminação total de tarefas repetitivas, alertas instantâneos de novos leads, histórico de conversa integrado e facilidade de apresentar opções similares via um catálogo impecável.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 text-amber-700">Para Proprietários da Imobiliária</h4>
                  <p className="text-xs text-slate-600">Controle total das metas de equipe, rastreabilidade absoluta dos leads, transparência na auditoria jurídica de propostas e visão clara de faturamento.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sitemap' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 2</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Sitemap Completo da Plataforma</h2>
            </div>

            <div className="space-y-6 text-xs font-mono">
              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-amber-400">STRUCTURE 1: SITE PÚBLICO / PORTAL</h3>
                <pre className="overflow-x-auto text-[11px] leading-relaxed">
{`├── / (Home)
│   ├── Hero de Busca Inteligente (Venda / Aluguel)
│   ├── Imóveis em Destaque (Filtro Dinâmico)
│   ├── Hub de Bairros Nobres
│   ├── Bloco "Anuncie Seu Imóvel" (Captação)
│   ├── Depoimentos de Clientes & Prova Social
│   └── Rodapé Corporativo Completo
├── /imoveis (Busca / Catálogo Completo)
│   ├── Filtros Avançados (Preço, Vagas, Metragem, Comodidades)
│   ├── Grid de Cards Premium de Imóveis
│   └── Paginação & Modo Mapa
├── /imovel/:id (Detalhes do Imóvel)
│   ├── Galeria de Fotos em Larga Escala
│   ├── Detalhes Técnicos (Condomínio, IPTU, Área Privativa, Posição Solar)
│   ├── Bloco do Corretor Atribuído (Contato Direto)
│   ├── Formulário Integrado de Interesse & Agendamento de Visita
│   └── Recomendações de Similares
├── /bairros (Explorar Regiões)
│   └── Páginas Dedicadas de Bairros (Foco SEO Local)
└── /anunciar (Captação de Proprietários)
    └── Formulário Avançado de Captação com Upload`}
                </pre>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-4">
                <h3 className="text-sm font-bold text-amber-400">STRUCTURE 2: CRM & PAINEL ADMINISTRATIVO</h3>
                <pre className="overflow-x-auto text-[11px] leading-relaxed">
{`├── /dashboard (Métricas Gerais de Operação Comercial)
│   ├── KPI de Vendas, Aluguel, Leads e Visitas Realizadas
│   └── Gráficos de Conversão do Funil, Tarefas Pendentes, Origem de Leads
├── /leads (Gestão de CRM Comercial)
│   ├── Visualização Kanban (Pipeline Completo por Estágios)
│   ├── Tabela Avançada de Leads com Filtros Dinâmicos
│   └── Drawer/Modal de Detalhe do Lead (Timeline, Histórico, Notas, Tarefas)
├── /imoveis (Gestão de Portfólio de Imóveis)
│   ├── Lista de Imóveis com Status (Ativo, Reservado, Vendido, Alugado)
│   ├── Formulário em Abas de Cadastro de Imóvel (Completo)
│   └── Vínculo com Proprietário e Corretor Responsável
├── /proprietarios (Gestão de Proprietários / Fornecedores)
│   └── Cadastro de Proprietários e Histórico de Imóveis Vinculados
├── /agenda (Controle Operacional)
│   ├── Calendário de Visitas a Imóveis
│   └── Agendamentos de Follow-ups e Reuniões de Fechamento
├── /propostas (Central de Contratos e Fechamentos)
│   └── Controle de Status de Propostas e Histórico de Contrapropostas
├── /locacao (Módulo de Gestão de Contratos de Aluguel)
│   └── Garantias, Documentos de Inquilinos, Prazos de Vencimento
├── /relatorios (Analytics)
│   └── Relatório de Conversão de Equipe, Imóveis mais Buscados, ROI Portais
└── /configuracoes (Configurações Gerais da Imobiliária)
    └── Usuários (CRECI, Metas), Cores do Sistema, Dados Fiscais`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'site_publico' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 3</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Detalhamento do Site Público</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">3.1 Estratégia da Home (Alta Conversão)</h3>
              <p>
                A Home é desenhada como uma <strong>landing page de alta conversão</strong>, despida de links desnecessários que possam distrair o usuário de sua principal intenção: <em>encontrar um imóvel ou anunciar sua propriedade</em>.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Barra de Busca Inteligente:</strong> Ao invés de uma pesquisa textual burra, a busca permite escolher a finalidade imediatamente (Comprar ou Alugar) e oferece autocompletar inteligente para bairros pré-cadastrados, além de seletores rápidos de faixa de preço e número de dormitórios.</li>
                <li><strong>Cards de Destaque:</strong> Exibem fotografias grandiosas. Cada card contém ícones discretos com características (quartos, vagas, metragem) e badge indicando "Exclusividade Apex".</li>
                <li><strong>SEO Local para Bairros Nobres:</strong> Seção contendo atalhos visuais para bairros cadastrados. Ao clicar, o usuário cai em uma página segmentada para aquela região.</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 mt-4">3.2 Sistema de Filtros Avançados (Portal Imobiliário)</h3>
              <p>
                A busca avançada permite refinamento total:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="font-bold text-xs text-slate-800 uppercase mb-2">Filtros Estruturais</h4>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                    <li>Tipo de Imóvel (Apartamento, Cobertura, Casa, Terreno)</li>
                    <li>Faixa de Metragem Privativa (Mínimo e Máximo)</li>
                    <li>Vagas de Garagem (Seletor numérico de 1 a 5+)</li>
                    <li>Suítes e Banheiros (Seletor de 1 a 5+)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800 uppercase mb-2">Características Específicas</h4>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                    <li>Piscina Privativa, Espaço Gourmet, Varanda</li>
                    <li>Imóvel Mobiliado / Porteira Fechada</li>
                    <li>Aceitação de Animais de Estimação (Pet Friendly)</li>
                    <li>Vista 360°, Próximo ao Metrô, Pé-direito duplo</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-4">3.3 Página de Detalhes do Imóvel (Vendedora)</h3>
              <p>
                A página de detalhes possui uma hierarquia que foca em <strong>urgência e exclusividade</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Galeria Premium:</strong> Utilização de visualizador em mosaico grande, permitindo abrir visualizador de alta escala com suporte a navegação por teclado.</li>
                <li><strong>Sidebar de Conversão Fixa:</strong> Contém o preço de venda/aluguel, custos fixos (Condomínio e IPTU), um formulário de contato integrado e botões flutuantes para WhatsApp do corretor atribuído ao imóvel.</li>
                <li><strong>Especificações Claras:</strong> Ícones desenhados sob medida para metragem, quartos, vagas e suítes, seguido da ficha técnica descritiva do imóvel.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'crm_detalhe' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 4</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Detalhamento Completo do Painel / CRM</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">4.1 O Dashboard Executivo</h3>
              <p>
                Fornece informações gerenciais consolidadas. Não exibe dados vazios ou dados técnicos desnecessários; em vez disso, foca no funil de vendas e na produtividade:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Métricas Cruciais (KPIs):</strong> Volume geral de propostas pendentes em análise financeira, leads ativos na semana, novos agendamentos de visita.</li>
                <li><strong>Analytics de Desempenho:</strong> Gráfico de etapas do funil para diagnosticar gargalos (ex: muitos leads parados na etapa de "Contato Inicial" ou "Imóvel Enviado").</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 mt-4">4.2 O Pipeline Comercial (Kanban Inteligente)</h3>
              <p>
                Permite arrastar leads através das etapas de atendimento. Cada card do lead no Kanban exibe:
              </p>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-start gap-4">
                <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold shrink-0">QUENTE</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">Roberto Civita Neto</h4>
                  <p className="text-xs text-slate-600">Busca Cobertura nos Jardins (Max: R$ 15M)</p>
                  <div className="flex gap-2 mt-1 text-[10px] font-mono text-slate-500">
                    <span>Corretor: Carolina M.</span>
                    <span>•</span>
                    <span>Visita: 25/06</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-4">4.3 Módulo de Locação</h3>
              <p>
                Um fluxo dedicado à gestão de contratos ativos, focado na captação de documentos de garantia (fiança bancária, caução ou fiadores):
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Checklist de Documentação:</strong> Permite fazer upload e aprovar documentos de identificação, certidões negativas de débito e comprovantes de renda.</li>
                <li><strong>Vigência e Reajustes:</strong> Alertas visuais automáticos para contratos próximos da data de vencimento ou período de reajuste do IGP-M/IPCA.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'telas' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 5</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Estrutura Detalhada de Cada Tela</h2>
            </div>

            <div className="space-y-6 text-xs">
              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Tela A: Pipeline do CRM de Leads</h4>
                <p className="text-slate-600"><strong>Objetivo:</strong> Gerenciamento ágil da esteira comercial de atendimento.</p>
                <p className="text-slate-600"><strong>Componentes:</strong> Barra de busca global de leads, seletor de corretor responsável, seletor de temperatura, grid Kanban com 9 colunas verticais correspondentes às etapas de funil.</p>
                <p className="text-slate-600"><strong>Ações:</strong> Arrastar card de lead para mudar etapa (dispara gravação automática na timeline do lead), clicar no card para abrir o Drawer de Perfil Detalhado, criar novo lead por modal rápido.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Tela B: Cadastro e Edição de Imóvel</h4>
                <p className="text-slate-600"><strong>Objetivo:</strong> Cadastrar propriedades com precisão máxima para evitar retrabalho de atendimento.</p>
                <p className="text-slate-600"><strong>Componentes:</strong> Formulário estruturado em 4 Abas: 1. Informações Básicas (título, código, valores, proprietário); 2. Características Físicas (suítes, vagas, metragem); 3. Diferenciais (comodidades); 4. Mídia e Publicação (galeria de imagens, status de publicação).</p>
                <p className="text-slate-600"><strong>Ações:</strong> Salvar como rascunho, publicar imediatamente no portal público, vincular proprietário existente e definir corretor especialista do imóvel.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm">Tela C: Perfil do Lead (Drawer Lateral)</h4>
                <p className="text-slate-600"><strong>Objetivo:</strong> Oferecer em uma única visão integrada tudo sobre o histórico e interesses do cliente.</p>
                <p className="text-slate-600"><strong>Componentes:</strong> Cabeçalho com dados de contato direto, badge de temperatura e estágio atual do funil. Coluna esquerda com preferências de busca do lead (tipo de imóvel, bairros de interesse, preço limite). Coluna direita com Timeline Histórica de interações e painel para registrar novas ligações, conversas ou agendar visitas.</p>
                <p className="text-slate-600"><strong>Ações:</strong> Registrar ligação, enviar WhatsApp direto do sistema, agendar visita ao imóvel desejado, alterar estágio de funil e transferir responsabilidade para outro corretor.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'design_system' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 6</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Componentes Reutilizáveis do Design System</h2>
            </div>

            <div className="space-y-4">
              <p>
                O Design System foi desenvolvido com foco em <strong>consistência, clareza e ritmo visual</strong>. Os principais componentes reutilizáveis incluem:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                  <h4 className="font-bold text-slate-900">Card de Imóvel Premium (Portal)</h4>
                  <p className="text-slate-600">Controla a renderização de fotos, badges de destaque (exclusividade, oportunidade, valor promocional), exibição unificada de características de área privativa, vagas e quartos, além de botões rápidos para visualizar detalhes e iniciar contato via WhatsApp.</p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                  <h4 className="font-bold text-slate-900">Card de Métricas (Dashboard)</h4>
                  <p className="text-slate-600">Padroniza a apresentação dos indicadores chave do sistema, integrando o valor numérico principal, um mini-gráfico de tendência lateral, descrição da métrica e indicação de variação percentual em relação ao mês anterior (verde para positivo, vermelho para atenção).</p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                  <h4 className="font-bold text-slate-900">Barra de Filtros Avançados</h4>
                  <p className="text-slate-600">Uma única barra sanfonada compacta que expande os filtros secundários de forma reativa, mantendo o usuário imerso na listagem de imóveis sem perda de performance de rendering.</p>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
                  <h4 className="font-bold text-slate-900">Badge de Status Unificado</h4>
                  <p className="text-slate-600">Controla a renderização visual das fases do lead e propriedades (Ativo, Vendido, Novo Lead, Proposta, etc.) usando cores com contraste e padding harmônico.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'banco' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 7</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Estrutura de Dados e Entidades</h2>
            </div>

            <div className="space-y-4">
              <p>
                Abaixo está a modelagem relacional conceitual do banco de dados, mapeada para garantir total consistência e integridade referencial:
              </p>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Entidade: Properties (Imóveis)</h4>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                    <li><strong>id:</strong> UUID (Primary Key)</li>
                    <li><strong>code:</strong> VARCHAR(10) (Unique, ex: AP0844)</li>
                    <li><strong>title:</strong> VARCHAR(150)</li>
                    <li><strong>price_sale:</strong> DECIMAL(12,2) (Null se apenas aluguel)</li>
                    <li><strong>price_rent:</strong> DECIMAL(12,2) (Null se apenas venda)</li>
                    <li><strong>owner_id:</strong> UUID (Foreign Key de Owners)</li>
                    <li><strong>broker_id:</strong> UUID (Foreign Key de Brokers)</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Entidade: Leads</h4>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                    <li><strong>id:</strong> UUID (Primary Key)</li>
                    <li><strong>name:</strong> VARCHAR(100)</li>
                    <li><strong>phone:</strong> VARCHAR(20)</li>
                    <li><strong>stage:</strong> ENUM('Novo', 'Contato Inicial', 'Qualificado', 'Visita Agendada', 'Proposta', 'Fechado', 'Perdido')</li>
                    <li><strong>broker_id:</strong> UUID (Foreign Key de Brokers, Nullable)</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">Entidade: Lead_Interactions (Interações)</h4>
                  <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                    <li><strong>id:</strong> UUID (Primary Key)</li>
                    <li><strong>lead_id:</strong> UUID (Foreign Key de Leads)</li>
                    <li><strong>type:</strong> ENUM('Ligação', 'WhatsApp', 'Visita', 'Email', 'Proposta', 'Nota')</li>
                    <li><strong>content:</strong> TEXT</li>
                    <li><strong>created_at:</strong> TIMESTAMP</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'fluxos' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 8</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Fluxos de Negócio e Jornadas</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Jornada 1: O Ciclo de Vida do Lead de Imóvel</h3>
                <div className="relative border-l border-slate-200 pl-6 ml-3 mt-4 space-y-6 text-xs text-slate-600">
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">1</span>
                    <h4 className="font-bold text-slate-900">Atração & Captação</h4>
                    <p>O cliente navega pelo portal público, filtra imóveis, visualiza fotos monumentais nos Jardins e envia seus contatos pelo formulário de detalhes ou via botão flutuante de WhatsApp do corretor.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">2</span>
                    <h4 className="font-bold text-slate-900">Distribuição Inteligente</h4>
                    <p>O lead entra instantaneamente no CRM da imobiliária na coluna "Novo Lead". Uma notificação é disparada e o sistema atribui o lead ao corretor responsável pelo imóvel ou de acordo com escala operacional.</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">3</span>
                    <h4 className="font-bold text-slate-900">Contato Inicial & Qualificação</h4>
                    <p>O corretor entra em contato via WhatsApp integrado para qualificar o perfil do cliente (perfil de financiamento, bairros aceitáveis, urgência de mudança). O lead é movido para "Qualificado".</p>
                  </div>
                  <div className="relative">
                    <span className="absolute -left-[30px] top-0 bg-slate-900 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono">4</span>
                    <h4 className="font-bold text-slate-900">Visita Presencial & Proposta</h4>
                    <p>Visita presencial agendada e confirmada. Após a visita positiva ao imóvel desejado, o corretor redige e insere a Proposta no sistema para auditoria jurídica e apresentação ao proprietário.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'permissoes' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 9</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Perfis de Acesso e Matriz de Permissões</h2>
            </div>

            <div className="space-y-4">
              <p>
                Para resguardar a privacidade de dados de proprietários e compradores de alto padrão, o sistema implementa uma matriz rígida baseada em funções (RBAC):
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <th className="p-3">Funcionalidade / Tela</th>
                      <th className="p-3">Administrador</th>
                      <th className="p-3">Gerente Comercial</th>
                      <th className="p-3">Corretor de Vendas</th>
                      <th className="p-3">Atendimento/SDR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Ver Dashboard Executivo</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-red-600">Bloqueado</td>
                      <td className="p-3 text-red-600">Bloqueado</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Cadastrar/Editar Imóveis</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-amber-600">Apenas os seus</td>
                      <td className="p-3 text-red-600">Bloqueado</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Visualizar Dados do Proprietário</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-amber-600">Apenas imóveis vinculados</td>
                      <td className="p-3 text-red-600">Bloqueado</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Alterar Distribuição de Leads</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                      <td className="p-3 text-red-600">Bloqueado</td>
                      <td className="p-3 text-green-700 font-medium">Acesso Total</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ux_conversao' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 10</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Recomendações Táticas de UX e Conversão</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">10.1 Elevando a Captação de Leads</h3>
              <p>
                No segmento de alto padrão, formulários invasivos com perguntas extensas matam a conversão. A melhor estratégia de UX é a <strong>coleta fracionada</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Micro-interações de interesse:</strong> No portal, substitua campos abertos por perguntas de múltipla escolha simples (ex: <em>"Qual o seu prazo de mudança desejado?"</em>, <em>"Você prefere andar alto ou tanto faz?"</em>). Apenas na etapa final solicite o Nome e WhatsApp.</li>
                <li><strong>WhatsApp Direct como Canal Oficial:</strong> Ofereça botões do WhatsApp que pré-carregam mensagens contextualizadas informando o código exato do imóvel em que o usuário está (ex: <em>"Olá, gostaria de receber mais informações sobre a cobertura linear nos Jardins (Ref: CO1054)"</em>).</li>
              </ul>

              <h3 className="text-lg font-bold text-slate-900 mt-4">10.2 Maximizando Eficiência do CRM</h3>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Prevenção de Fila Fria (SLA de Atendimento):</strong> Estabeleça um sistema visual no CRM indicando se um lead está sem contato há mais de 48h. Um badge piscante amarelo ou vermelho estimula os gerentes a redistribuírem o lead parado.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'ui_layout' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 11</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Diretrizes de UI e Design Visual Premium</h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">11.1 A Estética "Luxo Silencioso" (Quiet Luxury)</h3>
              <p>
                Projetos imobiliários de alto padrão exigem sofisticação sóbria. Evite decorações carregadas, cores estridentes e excesso de bordas ou separadores:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600">
                <li><strong>Uso Generoso de Espaço em Branco (Paddings):</strong> Permita que as fotos e dados técnicos respirem. Mantenha espaçamentos (gaps) amplos entre cards e descritores.</li>
                <li><strong>Tipografia Sólida:</strong> Pairings sofisticados de fontes sans-serif corporativas de peso intermediário (como Inter ou Outfit) ajudam a passar sensação de estabilidade corporativa e maturidade comercial.</li>
                <li><strong>Cores Sóbrias e Pontos de Contraste Elegantes:</strong> Base neutra clara (Slate e Zinc) combinada com um tom forte para CTAs e conversões (como um Ouro Envelhecido / Amber ou Azul Noturno).</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-amber-600">ETAPA 12</span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Roadmap de Evolução de Produto</h2>
            </div>

            <div className="space-y-4">
              <p>
                Após estabilizar a operação comercial básica do Portal e CRM, as seguintes fases de evolução estratégica estão planejadas no roadmap do produto:
              </p>

              <div className="relative border-l-2 border-slate-200 pl-6 space-y-6 text-xs text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fase 1: Motor de Inteligência Artificial Gemini (Próximos 3 meses)</h4>
                  <p className="mt-1">Implementar motor de IA integrado para redigir descrições comerciais poéticas de novos imóveis a partir de fotos carregadas e dados de vistoria técnica. Adicionar chatbot com IA integrado ao WhatsApp para qualificação autônoma prévia dos leads na primeira hora de recepção.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fase 2: Integração Multicanal e Portais (Próximos 6 meses)</h4>
                  <p className="mt-1">Desenvolver conexões diretas via API com os principais marketplaces e portais imobiliários nacionais (Zap Imóveis, VivaReal, Imovelweb) para replicação de portfólio instantânea, otimizando investimentos de publicidade.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Fase 3: Formalização Digital Total (Próximos 12 meses)</h4>
                  <p className="mt-1">Assinatura digital de contratos nativa (DocuSign/Clicksign) integrada diretamente ao módulo de propostas e locação, incluindo automações de envio de cobranças e faturamento recorrente mensal.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
