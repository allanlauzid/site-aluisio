// CONTEÚDO — Projetos (cartões da grade e página de cada projeto).
// ATENÇÃO (19/10/2026): os 8 projetos abaixo são MOCK, inventados só para testar a câmera, a grade, as setas
// e a página "antes → ação → depois → impacto". Nada aqui é do Aluísio. NÃO PUBLICAR.
// Para um projeto real: copie um item, troque os textos e tire "mock: true" (o carimbo MOCK some sozinho).
//   frente  = área de atuação (aparece no cartão)          fig = desenho do cartão (nomes em js/desenhos/figuras.js)
//   antes / acao / depois / impacto = textos das 4 etapas

const PROJETOS_MODELOS = [
  { tema: 'Central de atendimento ao estudante', frente: 'Gestão acadêmica', periodo: '2019–2021', fig: 'message_circle',
    resumo: 'Texto inventado: um canal único para as dúvidas dos estudantes de uma rede de polos.',
    antes: 'Dúvidas sobre matrícula, notas e provas chegavam por vários canais diferentes e levavam dias para ser respondidas. Cada polo respondia de um jeito.',
    acao: 'Levantamento das perguntas mais frequentes, criação de um roteiro único de respostas e treinamento das equipes dos polos para usar o mesmo padrão.',
    depois: 'Um só canal de atendimento, com respostas padronizadas e prazos acompanhados toda semana pela coordenação.',
    impacto: 'Estudantes atendidos mais rápido e equipes com menos retrabalho. [números fictícios — substituir por dados reais]' },
  { tema: 'Planejamento da oferta de disciplinas', frente: 'Gestão acadêmica', periodo: '2015–2017', fig: 'clipboard',
    resumo: 'Texto inventado: reorganizar turmas e salas para reduzir sobreposição de disciplinas iguais.',
    antes: 'Disciplinas com a mesma ementa eram oferecidas em turmas separadas, com salas ociosas em alguns horários e lotadas em outros.',
    acao: 'Cruzamento das ementas, junção das turmas equivalentes e novo quadro de ensalamento por turno.',
    depois: 'Menos turmas repetidas, salas mais bem distribuídas e carga horária docente planejada com antecedência.',
    impacto: 'Economia de recursos para a instituição e horários mais estáveis para professores e alunos. [fictício]' },
  { tema: 'Oficina de finanças para pequenos negócios', frente: 'Consultoria', periodo: '2022–2023', fig: 'tools',
    resumo: 'Texto inventado: uma oficina prática de controle financeiro para empreendedores.',
    antes: 'Empreendedores misturavam as contas pessoais com as da empresa e não sabiam calcular o preço de venda.',
    acao: 'Oficina em quatro encontros: fluxo de caixa, custos, formação de preço e ponto de equilíbrio, com planilha simples para levar.',
    depois: 'Participantes saem com o fluxo de caixa montado e o preço dos principais produtos recalculado.',
    impacto: 'Negócios com mais clareza sobre lucro e caixa. [fictício]' }
];

// 8 projetos para testar as setas: os 3 modelos acima repetidos, com letras diferentes (A a H)
const PROJETOS = 'ABCDEFGH'.split('').map((letra, i) => {
  const m = PROJETOS_MODELOS[i % PROJETOS_MODELOS.length];
  return Object.assign({}, m, { id: 'mock-' + letra.toLowerCase(), mock: true, titulo: 'Projeto mock ' + letra + ' — ' + m.tema });
});
