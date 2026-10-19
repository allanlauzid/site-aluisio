// CONTEÚDO — Cursos do Acervo (livros da prateleira "Cursos").
// Fonte: prompt "Acervo Acadêmico de Cursos e Videoaulas" enviado por Allan (19/10/2026), vindo dos 9 sites de disciplina.
// aulas: [título, código do vídeo no YouTube]. Só o código; o site monta o endereço do player.
// Só entram as aulas apresentadas como do próprio Aluísio. A curadoria de terceiros ficou de fora (decisão pendente).
// avisos: aparecem em vermelho dentro do livro (pendências a confirmar).

const CURSOS = [
  { id: 'economia-empresarial', titulo: 'Economia Empresarial', nivel: 'Graduação',
    descricao: 'Fundamentos da ciência econômica aplicados ao ambiente de negócios: escassez, curva de possibilidades de produção, custo de oportunidade e fluxo circular da renda; evolução do pensamento econômico até o século XXI; microeconomia (demanda, oferta, elasticidades, teoria da firma, custos e estruturas de mercado) e macroeconomia (demanda e oferta agregadas e economia monetária).',
    aulas: [
      ['Apresentação do Ambiente Digital', 'OybcLXwWNmo'],
      ['Encontro Inicial 01', 'L0EGw8Tlzn0'],
      ['Encontro Inicial 02', '8GhXE8Mtybc'],
      ['Tema 1 · Aula 01 — Economia: definição, características, recursos e agentes', 'd8PLeTQHy4E'],
      ['Tema 1 · Aula 02 — A curva de possibilidades de produção e o custo de oportunidade', 'J8TutT1bHqI'],
      ['Tema 1 · Aula 03 — O diagrama do fluxo circular, agentes e sistemas econômicos', 'IHcC7w6vho4'],
      ['Tema 2 · Aula 04 — As origens da ciência econômica do séc. XXI e o pensamento atual', '5d8AZ6jMbac'],
      ['Tema 3 · Aula 05 — Microeconomia: demanda e oferta de mercado', 'uJiIQWOe7co'],
      ['Tema 3 · Aula 05 — Explicação de atividade extra (Consumidor 4.0)', 'eWbYxtv1jJc'],
      ['Tema 3 · Aula 06 — Noções de elasticidades', 'vfC49F1_LP8'],
      ['Tema 3 · Aula 07 — Teoria da firma: produção, custos, receita e lucro total', 'P2eSlfpRtHc'],
      ['Tema 3 · Aula 08 — Estruturas de mercado', 'za-pL39MTdU'],
      ['Tema 5 · Aulas 13 e 14 — Políticas macroeconômicas: demanda e oferta agregadas e economia monetária', 'I2f2YEFQa18'],
      ['Orientações de avaliação (AV1)', 'wbHJujB8Ptc']
    ] },
  { id: 'matematica-financeira', titulo: 'Fundamentos de Matemática Financeira e Estatística', nivel: 'Pós-graduação / MBA em Gestão Financeira e Controladoria',
    descricao: 'Curso quantitativo e prático para a tomada de decisão financeira e a análise de dados: taxas de juros (simples, compostos, nominal e efetiva), calculadora HP 12C, fluxo de caixa descontado, séries de pagamentos, análise de investimentos (VPL, TIR, TMA), sistemas de amortização (SAC e Price), casos internacionais (Lyons Document Storage Corporation e Blaine Kitchenware Inc.) e estatística descritiva em planilhas.',
    avisos: ['Instituição e ano do MBA a confirmar.'],
    aulas: [
      ['Apresentação da disciplina', '7F9YYs5N5jk'],
      ['Aula 01 — Taxa de juros e uso da HP 12C', 'm3bx7HIkyx0'],
      ['Aulas 02 e 03 — Fluxo de caixa, séries de pagamentos e análise de investimentos', '-qW0LekDwnY'],
      ['Aulas 04 e 05 (parte 1) — Estatística descritiva e aplicações práticas', 'yd_gsVuR7r8'],
      ['Aulas 04 e 05 (parte 2) — Estatística descritiva e aplicações práticas', 'A1disJ16H4c'],
      ['Aulas 04 e 05 (parte 3) — Estatística descritiva e aplicações práticas', 'xxCzelz0Pwg']
    ] },
  { id: 'marketing-produtos-servicos', titulo: 'Marketing de Produtos e Serviços', nivel: 'Graduação',
    descricao: 'Conceitos centrais de marketing em vários segmentos, diferenças entre bens tangíveis e serviços, o peso do setor de serviços na economia nacional e global, comportamento do consumidor, expectativas e percepções de valor, segmentação e mercados-alvo, qualidade e produtividade em serviços, composto de marketing (4Ps) e estratégias de valor para o cliente.',
    aulas: [
      ['Apresentação do Ambiente Digital', 'OybcLXwWNmo'],
      ['Tema 1 · Aula 01 — Conceitos centrais de marketing nos diversos segmentos de mercado', '2iqpRK86YeY'],
      ['Tema 1 · Aula 02 — Bens e serviços: definições, diferenciações e especificidades', 'IdEl50W7MTE'],
      ['Tema 1 · Aula 03 — O setor de produtos e serviços na economia nacional e global', 'YRQQW79nxlE'],
      ['Tema 2 · Aula 04 — Comportamento de compra no mercado de produtos e serviços', 'X_ABhw8yr8I'],
      ['Tema 2 · Aula 05 — Expectativa e percepções dos clientes', 'jPaO-d3uYj8'],
      ['Tema 2 · Aula 06 — Segmentos de mercado e seleção de mercados-alvo', 'lp7-VWqg32M'],
      ['Tema 3 · Aula 09 — Excelência e gestão da qualidade de produtos e serviços', '-IB0zdSIWoQ'],
      ['Tema 5 · Aulas 10 e 11 — O composto de marketing e valor para o cliente', 'PeBDzSdwNRQ'],
      ['Tema 5 · Aulas 15 e 16 — Fechamento: estratégias do composto de marketing', 'AtnJUrKg09I']
    ] },
  { id: 'gerenciamento-projetos', titulo: 'Gerenciamento de Projetos', nivel: 'Graduação',
    descricao: 'Curso prático alinhado ao Guia PMBOK (PMI): conceitos de projetos, estruturas organizacionais (funcional, matricial e projetizada), Escritório de Projetos (PMO), ciclo de vida e integração (Termo de Abertura do Projeto), gestão do escopo (declaração de escopo e EAP), tempo e cronograma, matriz e gerenciamento de riscos, pessoas e equipes e custos do projeto.',
    aulas: [
      ['Apresentação do Ambiente Digital', 'OybcLXwWNmo'],
      ['Tema 1 · Aula 01 — Gênesis: princípios e conceitos do gerenciamento de projetos', 'RVjybWj_064'],
      ['Tema 1 · Aula 02 — As estruturas organizacionais', 'xmVUECPCL0I'],
      ['Tema 1 · Aula 03 — PMO: a importância do escritório de projetos', 'Ktdn6bHwBwA'],
      ['Tema 1 · Aula 04 — A relação entre o PMBOK e o gerenciamento de projetos', 'yIdGCqD21e0'],
      ['Tema 2 · Aula 05 — O ciclo de vida do gerenciamento e a integração dos projetos', 'JC8FwFS03Hc'],
      ['Tema 2 · Aula 06 — A gestão do escopo de um projeto', 'zPoj-uV7zlw'],
      ['Tema 2 · Aula 07 (parte 1) — A gestão do tempo do projeto através do cronograma', '6n0d7BCKLT4'],
      ['Tema 2 · Aula 07 (parte 2) — A gestão do tempo do projeto através do cronograma', '_pMRcuUJ9oE'],
      ['Tema 2 · Aula 07 (parte 3) — A gestão do tempo do projeto através do cronograma', 'xi55bFsb8_Q'],
      ['Tema 3 · Aula 08 — Diferença do TAP para o escopo e matriz de risco', 'e8Nz65CjpSY'],
      ['Tema 3 · Aula 09 — Gerenciamento de riscos e pessoas', 'X_5WpOhU66A'],
      ['Tema 3 · Aula 10 — Gerenciamento dos custos do projeto', 'FDK7grRhabc']
    ] },
  { id: 'analise-mercados', titulo: 'Análise de Mercados e Projeção de Cenários', nivel: 'Graduação',
    descricao: 'A organização como sistema aberto orientado ao mercado: cultura organizacional, novas tecnologias e Data Warehouse na criação de valor, prospecção do mercado local, inteligência competitiva e Business Intelligence, análise PESTAL, mapeamento de stakeholders, cenários projetivos e prospectivos, forecasting e modelagem de cenários em estudos de viabilidade econômica.',
    aulas: [
      ['Apresentação da disciplina', 'vOBypb6ANYY'],
      ['Tema 1 · Aula 01 — Organização e mercado (sistema aberto)', '-gdDcIC5YkU'],
      ['Tema 1 · Aula 02 — Influências da cultura organizacional', 'YVpiwCi1R8U'],
      ['Tema 1 · Aula 03 — Avanços tecnológicos e criação de valor para o cliente', 'M2ml8-si1-8'],
      ['Tema 1 · Aula 03 (LPG Recife) — Conhecendo o Data Warehouse de uma empresa pernambucana', 'VwbWzOuHqY0'],
      ['Tema 1 · Aula 04 — Prospecção e exploração do mercado local', '2zbJV27E_Io'],
      ['Tema 2 · Aula 05 — Inteligência competitiva, Business Intelligence e vocações regionais', 'P2b722mEa3M'],
      ['Tema 2 · Aula 06 — Análise PESTAL', 'JC5YYo4ErT8'],
      ['Tema 2/3 · Aulas 07/08 (palestra SEBRAE) — A empresa e os novos tempos', 'YmaiOtUjqlU'],
      ['Tema 3 · Aula 09 — Forecasting e análise de cenários em um estudo de viabilidade econômica', 'ZAnlExtOXlE'],
      ['Tema 5 · Aula 10 — Prática: análise de cenários em um estudo de viabilidade econômica', 'tGZVxfilwKY'],
      ['Orientações de avaliação (AV1)', 'uUxJyN0C_X0']
    ] },
  { id: 'gestao-financeira', titulo: 'Gestão Financeira', nivel: 'Pós-graduação / MBA em Gestão Comercial',
    descricao: 'Disciplina executiva em 5 encontros sobre a tomada de decisão financeira em organizações comerciais: recursos e fontes de financiamento de curto e longo prazo (funding e capital de giro), conceitos básicos de finanças (risco e retorno), o papel e o perfil do gestor financeiro, planejamento e controle financeiro e fluxo de caixa.',
    avisos: ['Instituição e ano do MBA a confirmar.'],
    aulas: [
      ['Apresentação do Ambiente Digital — MBA em Gestão Comercial', 'jew28M33ctc'],
      ['Encontro 01 — Gestão de recursos financeiros', 'DC6hXOdHrzM'],
      ['Encontro 02 — Conceitos básicos de finanças', 'EbThJkMC5bY'],
      ['Encontro 03 — O papel do gestor em finanças', 'Ih4mWRbeQ1Y'],
      ['Encontro 04 — Planejamento e controle em finanças', 'J3HDlRqL5L0'],
      ['Encontro 05 — Movimentações financeiras', 'a1YuWHelihM'],
      ['Encerramento — Avaliação do aprendizado', 'mZ2dP80hbE8']
    ] },
  { id: 'marketing-gestao-servicos', titulo: 'Marketing e Gestão de Serviços', nivel: 'Graduação',
    descricao: 'Especificidades da administração e da comercialização de serviços: introdução ao marketing de serviços, conceitos de gestão e classificação de serviços, tendências para empresas prestadoras de serviços e impactos competitivos e de sustentabilidade nas decisões estratégicas.',
    avisos: ['Nesta disciplina a lista mistura aulas do Aluísio e vídeos de outros autores: confirmar a autoria de cada vídeo.'],
    aulas: [
      ['Apresentação do Ambiente Digital', 'OybcLXwWNmo'],
      ['Aula 01 — Introdução ao marketing de serviços', 'TEUH81CVs-I'],
      ['Aula 01 — O que é marketing: conceitos e definições', 'zFqTO5lDCt8'],
      ['Aula 01 — É tendência: marketing de serviço para qualquer negócio', '4AvD-aj-ByE'],
      ['Aula 02 — Gestão de serviços: conceitos', 'jDF-qsBcN7Q'],
      ['Aula 02 — Administração de serviços: conceitos básicos', 'u-_RnGqPOJo'],
      ['Aula 02 — Gestão de serviços', 'GzscOn1FtgQ'],
      ['Aula 03 — Cenário econômico e impactos nos setores produtivos e de serviços', 'x4yFDz9PoAE']
    ] },
  { id: 'gestao-estrategica-marketing', titulo: 'Gestão Estratégica de Marketing', nivel: 'Graduação',
    descricao: 'Marketing sob a ótica da alta gestão e do planejamento estratégico: evolução do marketing (1.0 ao 4.0), mix de marketing, posicionamento de marca e branding (caso Havaianas), plano de marketing passo a passo, Sistema de Informações de Marketing, matriz SWOT, pesquisa de mercado, mercados-alvo, marketing de relacionamento e CRM B2B e comunicação integrada de marketing.',
    aulas: [
      ['Apresentação da disciplina', 'FcEAGfNVRLc'],
      ['Orientações de estudo dirigido', '5ss_kTYEW-E'],
      ['Revisão geral de marketing', '6MXBH3Km62Y'],
      ['Tema 1 · Estudo dirigido 02 — Planejamento estratégico corporativo', 'SUL9P8huwiA'],
      ['Tema 1 · Aula 03 — Planejamento de marketing', 'a5gLq3FeQpA'],
      ['Tema 2 · Aula 04 — Sistema de informações de marketing e diagnóstico ambiental', 'J9MsQIZJ-Sk'],
      ['Tema 2 · Aula 05 — Segmentos de mercado e seleção de mercados-alvo', 'nB0m7K3Q8DQ'],
      ['Tema 2 · Aula 06 — Implementação e controle de um sistema de pesquisa de marketing', 'EnR2jV6nvgc'],
      ['Tema 3 · Aula 09 — Pesquisa de marketing, marketing de relacionamento e CRM B2B', 'LVFbSLiMnos'],
      ['Tema 5 · Aula 14 — Princípios da comunicação integrada de marketing', 'qmdLVbQJn3g']
    ] },
  { id: 'gestao-conhecimento', titulo: 'Gestão do Conhecimento e Inovação', nivel: 'Graduação',
    descricao: 'O conhecimento como ativo estratégico para a inovação: criação de conhecimento organizacional, organização inteligente, conversão entre conhecimento tácito e explícito (espiral de Nonaka e Takeuchi), transferência do conhecimento em busca da inovação e tecnologias analíticas como Data Warehouse, OLAP e Data Mining.',
    avisos: ['A lista desta disciplina parece incompleta no material recebido.', 'Confirmar a autoria: "Como a gestão do conhecimento pode ajudar sua empresa" também aparece como vídeo de terceiros em outra disciplina.'],
    aulas: [
      ['Apresentação do Ambiente Digital', 'OybcLXwWNmo'],
      ['Tema 1 · Aula 03 — Como a gestão do conhecimento pode ajudar sua empresa', 'kSUTNtRDNnc'],
      ['Tema 2 · Aulas 08 e 09 (LPG Recife) — OLAP, Data Mining e o Data Warehouse de uma empresa pernambucana', 'VwbWzOuHqY0']
    ] }
];
