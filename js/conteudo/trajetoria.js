// CONTEÚDO do mock: informações fornecidas no prompt, sem validação documental.
const TRAJETORIA_MARCOS = [
  {
    "id": "marco-1",
    "ano": "1995–2000",
    "palavra": "ORIGEM",
    "titulo": "O começo na indústria",
    "instituicao": "Rhodia",
    "cargo": "Operador de Utilidade",
    "resumo": "O início de uma trajetória marcada por operações, controle de processos e responsabilidade técnica.",
    "detalhes": "",
    "pendente": false
  },
  {
    "id": "marco-2",
    "ano": "1998–2002/2003",
    "palavra": "ECONOMIA",
    "titulo": "A base da formação econômica",
    "instituicao": "Universidade Católica de Pernambuco — UNICAP",
    "cargo": "Graduação em Ciências Econômicas",
    "resumo": "Uma formação econômica que fundamenta sua atuação em finanças, planejamento e gestão.",
    "detalhes": "",
    "pendente": true
  },
  {
    "id": "marco-3",
    "ano": "2000",
    "palavra": "MICROCRÉDITO",
    "titulo": "Finanças com impacto",
    "instituicao": "Banco do Brasil",
    "cargo": "Agente de Microcrédito Sênior",
    "resumo": "Análise financeira, crédito e desenvolvimento de instrumentos de gestão.",
    "detalhes": "- Avaliação de desempenho.\n- Acompanhamento de carteiras inadimplentes.\n- Instrumentos de recuperação de crédito.\n- Rotinas e planilhas de controle.\n- Análise do perfil dos clientes.\n- Controle de documentação e aplicação de recursos.",
    "pendente": false
  },
  {
    "id": "marco-4",
    "ano": "2000–2002",
    "palavra": "LIDERANÇA",
    "titulo": "A experiência na direção",
    "instituicao": "UNICAP JR",
    "cargo": "Diretor-Presidente",
    "resumo": "Gestão de equipes, projetos, recursos e relacionamentos institucionais.",
    "detalhes": "- Gestão das áreas financeira, marketing e projetos.\n- Organização e acompanhamento de equipes.\n- Desenvolvimento de parcerias.\n- Coordenação de projetos de consultoria.\n- Administração dos recursos financeiros.\n- Relacionamento com clientes.",
    "pendente": false
  },
  {
    "id": "marco-5",
    "ano": "2003–2007",
    "palavra": "IMPACTO SOCIAL",
    "titulo": "Gestão e desenvolvimento de pessoas",
    "instituicao": "Visão Mundial",
    "cargo": "Coordenador do Sou Ligado",
    "resumo": "Coordenação de iniciativas sociais, formação de equipes e administração de recursos.",
    "detalhes": "- Implantação e estruturação de projetos.\n- Gestão de competências.\n- Formação e capacitação de equipes.\n- Gestão financeira.\n- Administração de recursos.\n- Pesquisas de impacto socioeconômico.",
    "pendente": true
  },
  {
    "id": "marco-6",
    "ano": "2003–2007",
    "palavra": "DESENVOLVIMENTO",
    "titulo": "Microcrédito e desenvolvimento econômico",
    "instituicao": "Agência Nacional de Desenvolvimento Microempresarial — ANDE",
    "cargo": "Assessor de Microcrédito",
    "resumo": "Formação de equipes, gestão de carteiras e desenvolvimento de estratégias de crédito.",
    "detalhes": "- Treinamento de equipes.\n- Prospecção e acompanhamento de clientes.\n- Recuperação de crédito.\n- Avaliação de carteiras.\n- Controle documental.\n- Desenvolvimento de rotinas e planilhas.\n- Campanhas e metas operacionais.",
    "pendente": true
  },
  {
    "id": "marco-7",
    "ano": "2003–2018",
    "palavra": "DOCÊNCIA",
    "titulo": "O início de uma longa experiência no ensino superior",
    "instituicao": "Faculdade dos Guararapes",
    "cargo": "Professor",
    "resumo": "Atuação no ensino superior, formação de estudantes e desenvolvimento de práticas pedagógicas.",
    "detalhes": "- Planejamento de aulas.\n- Elaboração de atividades e avaliações.\n- Acompanhamento de frequência.\n- Desenvolvimento de projetos de ensino.\n- Incentivo à leitura e pesquisa.\n- Ensino de conteúdos relacionados à Administração e Economia, conforme currículo.\n\n**Observação:** este vínculo ocorreu simultaneamente a outras experiências.",
    "pendente": false
  },
  {
    "id": "marco-8",
    "ano": "2007–2009",
    "palavra": "MESTRADO",
    "titulo": "Aprofundamento acadêmico",
    "instituicao": "Universidade Federal Rural de Pernambuco — UFRPE",
    "cargo": "Mestrado em Administração e Desenvolvimento Rural",
    "resumo": "Aprofundamento dos estudos em Administração e Desenvolvimento Rural.",
    "detalhes": "Apresentar a formação e a instituição.\n\nO LinkedIn identifica o programa genericamente como Business/Commerce, General; o currículo registra Administração e Desenvolvimento Rural.\n\nUtilizar a denominação do currículo, sinalizando a necessidade de validação documental antes da publicação definitiva.",
    "pendente": false
  },
  {
    "id": "marco-9",
    "ano": "2009–2014",
    "palavra": "COORDENAÇÃO",
    "titulo": "Da docência à gestão de cursos",
    "instituicao": "Faculdade dos Guararapes",
    "cargo": "Coordenador do Curso de Administração",
    "resumo": "Coordenação de professores, planejamento acadêmico e desenvolvimento do curso.",
    "detalhes": "- Coordenação docente.\n- Captação de alunos.\n- Planejamento estratégico.\n- Desenvolvimento de programas de ensino.\n- Planejamento financeiro.\n- Otimização de custos.",
    "pendente": true
  },
  {
    "id": "marco-10",
    "ano": "2012/2014–2018",
    "palavra": "GESTÃO INSTITUCIONAL",
    "titulo": "Planejamento acadêmico em escala",
    "instituicao": "Centro Universitário dos Guararapes / Faculdade dos Guararapes",
    "cargo": "Assessor de Planejamento Acadêmico",
    "resumo": "Planejamento de cursos, professores, estruturas acadêmicas e processos regulatórios.",
    "detalhes": "- Planejamento e distribuição de cargas horárias.\n- Reestruturação de currículos.\n- Organização de espaços acadêmicos.\n- Controle de custos e folha docente.\n- Gestão de atividades acadêmicas.\n- Documentação regulatória para EAD e pós-graduação.\n- Participação em processos de credenciamento, recredenciamento e reconhecimento.\n- Acompanhamento de indicadores institucionais.\n- Apoio à reitoria e à direção acadêmica.",
    "pendente": true
  },
  {
    "id": "marco-11",
    "ano": "2013–ATUAL",
    "palavra": "ESTRATÉGIA",
    "titulo": "Consultoria e gestão empresarial",
    "instituicao": "A7 Consultoria e Gestão Empresarial",
    "cargo": "",
    "resumo": "Planejamento acadêmico, estratégia empresarial e gestão econômico-financeira.",
    "detalhes": "- Planejamento acadêmico de IES.\n- Planejamento financeiro.\n- CAPEX e OPEX.\n- Estruturação de modelos acadêmicos.\n- Elaboração e atualização de PDI, PPI e PPC.\n- Estratégias para ENADE.\n- Melhoria e manutenção de indicadores CPC, IGC e CC.\n- Precificação.\n- Gestão de capital de giro.\n- Planejamento de estoques.\n- Controle de custos.\n- Indicadores financeiros.\n- Estratégias de captação e sustentabilidade institucional.",
    "pendente": true
  },
  {
    "id": "marco-12",
    "ano": "2013–ATUAL",
    "palavra": "INOVAÇÃO",
    "titulo": "Desenvolvimento de negócios e educação empreendedora",
    "instituicao": "SEBRAE",
    "cargo": "",
    "resumo": "Consultoria em gestão, finanças, inovação e formação empreendedora.",
    "detalhes": "- Consultoria financeira.\n- Planejamento empresarial.\n- Melhoria de processos.\n- Orientação de empreendedores.\n- Projetos de inovação.\n- Educação empreendedora.\n- Formação e supervisão de Agentes Locais de Inovação.\n\n**Dado documentado no currículo:**\nConsultor Sênior de sete Agentes Locais de Inovação (ALI) na área de Educação Empreendedora.",
    "pendente": true
  },
  {
    "id": "marco-13",
    "ano": "2018–2019",
    "palavra": "FINANÇAS",
    "titulo": "Gestão orientada por indicadores",
    "instituicao": "Credimóveis Novolar Ltda.",
    "cargo": "Controller",
    "resumo": "Planejamento econômico-financeiro, análise de desempenho e suporte à estratégia.",
    "detalhes": "- Planejamento financeiro.\n- Análise de custos.\n- Controle orçamentário.\n- Indicadores operacionais e financeiros.\n- Relatórios gerenciais.\n- Acompanhamento de resultados.\n- Apoio à direção.",
    "pendente": false
  },
  {
    "id": "marco-15",
    "ano": "2019–2022",
    "palavra": "ENSINO APLICADO",
    "titulo": "Conhecimento conectado à prática",
    "instituicao": "Estácio",
    "cargo": "",
    "resumo": "Docência, empreendedorismo, inovação e projetos práticos de gestão.",
    "detalhes": "Atividades práticas e mentoria envolvendo estudantes dos cursos de Administração, Ciências Contábeis, Recursos Humanos e Logística.",
    "pendente": true
  },
  {
    "id": "marco-14",
    "ano": "2019–2020",
    "palavra": "EDUCAÇÃO DIGITAL",
    "titulo": "Gestão da educação a distância",
    "instituicao": "Faculdade Pitágoras",
    "cargo": "Coordenador Geral de Cursos EAD",
    "resumo": "Coordenação acadêmica, administrativa e financeira de cursos EAD e pós-graduação.",
    "detalhes": "- Planejamento de cargas horárias.\n- Coordenação de professores e tutores.\n- Gestão de ambientes virtuais de aprendizagem.\n- Captação e retenção de estudantes.\n- Gestão de projetos acadêmicos.\n- CAPEX e OPEX.\n- Organização de processos administrativos.\n- Parcerias institucionais.",
    "pendente": true
  },
  {
    "id": "marco-16",
    "ano": "2020–2021",
    "palavra": "ESPECIALIZAÇÃO",
    "titulo": "Coordenação de programas de pós-graduação",
    "instituicao": "Faculdade ESUDA",
    "cargo": "Coordenador de Pós-Graduação",
    "resumo": "Planejamento pedagógico e coordenação simultânea de quatro programas de MBA.",
    "detalhes": "- Elaboração de PPCs.\n- Seleção de professores.\n- Planejamento de cronogramas.\n- Captação de estudantes.\n- Gestão de aulas.\n- Gestão acadêmica dos alunos.\n- Organização das atividades docentes.",
    "pendente": true
  },
  {
    "id": "marco-17",
    "ano": "2021–ATUAL",
    "palavra": "GESTÃO DE POLOS",
    "titulo": "Gestão acadêmica em rede",
    "instituicao": "UniCesumar",
    "cargo": "",
    "resumo": "Gestão operacional e acadêmica de polos, com foco em qualidade, captação e permanência de estudantes.",
    "detalhes": "- Coordenação acadêmica.\n- Gestão administrativa.\n- Operação de polos EAD.\n- Padronização de procedimentos.\n- Indicadores de captação.\n- Permanência dos alunos.\n- Redução de evasão.\n- Acompanhamento financeiro e comercial.\n\n**Destaque numérico:** 20 polos, conforme currículo.",
    "pendente": true
  },
  {
    "id": "nova-roma",
    "ano": "2022",
    "palavra": "ENSINO SUPERIOR",
    "titulo": "Faculdade Nova Roma",
    "instituicao": "Faculdade Nova Roma",
    "cargo": "[Cargo e período a confirmar]",
    "resumo": "Registro de vínculo em 2022; informações em validação.",
    "detalhes": "Referência no LinkedIn em novembro de 2022. Cargo, atribuições e período completo ainda precisam de confirmação.",
    "pendente": true
  },
  {
    "id": "marco-18",
    "ano": "2023–2025",
    "palavra": "GESTÃO EDUCACIONAL",
    "titulo": "Experiência na gestão de polo",
    "instituicao": "UNIASSELVI",
    "cargo": "Gerente de Polo",
    "resumo": "Gestão acadêmica e operacional de polo de ensino superior.",
    "detalhes": "Apresentar as atribuições documentadas, sem inventar resultados, indicadores ou números.",
    "pendente": true
  },
  {
    "id": "marco-19",
    "ano": "2024–2027",
    "palavra": "FORMAÇÃO CONTÍNUA",
    "titulo": "Novas perspectivas para ensinar e aprender",
    "instituicao": "UniCesumar",
    "cargo": "",
    "resumo": "Aprofundamento dos fundamentos pedagógicos e dos estudos teológicos.",
    "detalhes": "Apresentar as duas graduações em andamento.\n\nA formação em Pedagogia se relaciona ao desenvolvimento de competências para gestão acadêmica.\n\nA formação em Teologia também poderá ter conexão com o perfil Religioso do site.\n\nNão apresentar as graduações como concluídas.",
    "pendente": true
  }
];
