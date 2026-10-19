// CONTEÚDO — Acervo: a estante que aparece ao rolar no botão Acervo.
// Cada linha da estante tem prateleiras (grupos com nome). Cada item vira um LIVRO na prateleira:
// basta acrescentar um item à lista que o livro aparece sozinho.
//   titulo    = texto da lombada e título do livro aberto
//   sub       = linha pequena abaixo do título (ano, instituição...)
//   texto     = parágrafos dentro do livro aberto
//   link      = { rotulo, url } botão que abre em nova aba
//   curso     = id de um curso em js/conteudo/cursos.js (o livro mostra a descrição e as aulas)
//   avisos    = pendências em vermelho
//   mock:true = carimbo vermelho MOCK (conteúdo provisório ou inventado)

const ACERVO = [
  [ // linha de cima
    { nome: 'Currículos', itens: [
      { titulo: 'Currículo Lattes', sub: 'atualizado em 31/08/2026',
        texto: ['Versão oficial e sempre atual do currículo na Plataforma Lattes (CNPq).'],
        link: { rotulo: 'Abrir no Lattes', url: 'http://lattes.cnpq.br/7782992145937845' } },
      { titulo: 'Currículo vitae', sub: '[data de atualização]', mock: true,
        texto: ['[Aqui entra o PDF revisado do currículo para baixar.]'],
        avisos: ['O arquivo atual tem nº de polos em conflito, telefone e não inclui a experiência de Controller: precisa de versão revisada antes de publicar.'] }
    ] },
    { nome: 'Diplomas', itens: [
      { titulo: 'Mestrado — UFRPE', sub: '2007–2009', mock: true,
        texto: ['Mestrado em Administração e Desenvolvimento Rural, Universidade Federal Rural de Pernambuco.', '[imagem do diploma]'] },
      { titulo: 'Ciências Econômicas — UNICAP', sub: '1999–2004', mock: true,
        texto: ['Graduação em Ciências Econômicas, Universidade Católica de Pernambuco.', '[imagem do diploma]'] },
      { titulo: 'Pedagogia e Teologia — Unicesumar', sub: 'em andamento, desde 2024',
        texto: ['Graduações em Pedagogia e em Teologia, em andamento desde 2024.'] }
    ] },
    { nome: 'Certificados', itens: [
      { titulo: '1º lugar — Fórum Docente 2020', sub: 'Estácio', mock: true,
        texto: ['1º lugar no Fórum Docente 2020 — Práticas das Ferramentas de Inovação, Estácio.', '[imagem do certificado]'] },
      { titulo: 'Informática Avançada — UNICAP', sub: '[ano]', mock: true,
        texto: ['Curso de Informática Avançada, UNICAP.', '[imagem do certificado]'] }
    ] },
    { nome: 'Publicações', itens: [
      { titulo: 'Trabalho, produção e educação', sub: 'livro, 2014',
        texto: ['Trabalho, produção e educação: saberes da pós em construção. 1. ed. Jaboatão dos Guararapes: Tarcisio Pereira Editor, 2014. 276 p.'],
        avisos: ['Confirmar se é autoria ou organização.'] },
      { titulo: 'Bancos comunitários e microcrédito', sub: 'dissertação, 2009',
        texto: ['Bancos Comunitários: impactos do microcrédito e sua influência nas famílias da Região Metropolitana de Pernambuco. Dissertação de mestrado, UFRPE, 2009.'] },
      { titulo: 'A profissão do economista em PE', sub: 'palestra, 2019',
        texto: ['Desafios da profissão do economista no cenário pernambucano. Palestra, 2019.'] }
    ] }
  ],
  [ // linha de baixo
    { nome: 'Cursos', itens: CURSOS.map((c) => ({ titulo: c.titulo, sub: c.nivel, curso: c.id })) },
    { nome: 'Material didático', itens: [
      'Apostila', 'Slides', 'Lista de exercícios', 'Estudo de caso', 'Roteiro de aula', 'Planilha modelo', 'Apostila',
      'Slides', 'Lista de exercícios', 'Estudo de caso', 'Roteiro de aula', 'Planilha modelo', 'Apostila', 'Slides'
    ].map((tipo, i) => ({
      titulo: tipo + ' mock ' + String(i + 1).padStart(2, '0'), sub: '[disciplina]', mock: true,
      texto: ['Material inventado para testar a estante, o livro e a janela de leitura.', '[Aqui entra o material didático: PDF, slides ou link.]']
    })) }
  ]
];
