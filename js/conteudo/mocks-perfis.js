// CONTEÚDO — exemplos (MOCK) dos perfis Pessoal e Religioso. Tudo aqui é provisório, só para mostrar como cada
// botão funciona. As "fotos" são desenhos (js/desenhos/artes.js: praia, montanha, por-do-sol, cidade, cafe, livro,
// mesa, corrida, jardim, ceu, chuva, igreja, biblia, comunidade, vela, caminho). Troque pelos materiais reais.
// Entre colchetes [ ] = informação que ainda falta.

// ---------- Perfil Pessoal (boné) ----------
const MOCK_PESSOAL = {
  // Feed: foto + texto curto
  feed: [
    { arte: 'por-do-sol', tag: 'Momentos', data: '[data]', titulo: 'Fim de tarde', texto: 'Texto curto de exemplo: o que este momento teve de bom. [local]' },
    { arte: 'cafe', tag: 'Dia a dia', data: '[data]', titulo: 'O primeiro café', texto: 'Exemplo de publicação simples: uma foto e duas linhas sobre o começo do dia.' },
    { arte: 'livro', tag: 'Leituras', data: '[data]', titulo: 'Leitura da semana', texto: 'Aqui entra o livro que está lendo e uma frase sobre por que vale a pena. [título do livro]' },
    { arte: 'montanha', tag: 'Viagens', data: '[data]', titulo: 'Subida até o mirante', texto: 'Exemplo de post de viagem: onde foi, como chegou e o que viu lá de cima. [local]' },
    { arte: 'corrida', tag: 'Dia a dia', data: '[data]', titulo: 'Caminhada de domingo', texto: 'Exemplo: registro de um hábito, com um texto curto e leve.' },
    { arte: 'cidade', tag: 'Viagens', data: '[data]', titulo: 'Andando pela cidade', texto: 'Exemplo: uma rua, um prédio, um detalhe que chamou atenção. [cidade]' }
  ],
  // Calendário: mes = 0 é o mês atual, 1 o próximo, -1 o anterior (o mês real é calculado pelo site)
  calendario: [
    { mes: 0, dia: 4, hora: '7h', titulo: 'Caminhada (exemplo)', local: '[local]', tipo: 'Rotina' },
    { mes: 0, dia: 11, hora: '19h', titulo: 'Encontro com amigos (exemplo)', local: '[local]', tipo: 'Encontro' },
    { mes: 0, dia: 18, hora: '—', titulo: 'Clube do livro (exemplo)', local: '[local]', tipo: 'Leitura' },
    { mes: 0, dia: 23, ate: 26, hora: '—', titulo: 'Viagem (exemplo)', local: '[destino]', tipo: 'Viagem' },
    { mes: 1, dia: 2, hora: '20h', titulo: 'Show / evento cultural (exemplo)', local: '[local]', tipo: 'Cultura' },
    { mes: 1, dia: 15, hora: '7h', titulo: 'Caminhada longa (exemplo)', local: '[local]', tipo: 'Rotina' },
    { mes: -1, dia: 20, hora: '18h', titulo: 'Exposição (exemplo)', local: '[local]', tipo: 'Cultura' }
  ],
  // Fotos: legendas curtas que explicam algo
  fotos: [
    { arte: 'praia', legenda: 'Mar calmo no começo da manhã. [local]' },
    { arte: 'montanha', legenda: 'A trilha leva umas duas horas até o topo (exemplo).' },
    { arte: 'cafe', legenda: 'O café de sempre, antes de tudo.' },
    { arte: 'jardim', legenda: 'Flores que nasceram depois da chuva.' },
    { arte: 'ceu', legenda: 'Céu limpo, longe das luzes da cidade.' },
    { arte: 'cidade', legenda: 'Arquitetura que chamou atenção no caminho. [cidade]' },
    { arte: 'chuva', legenda: 'Dia de chuva: bom para ler.' },
    { arte: 'livro', legenda: 'Anotações na margem do livro.' },
    { arte: 'por-do-sol', legenda: 'O sol se pondo devagar sobre a água.' },
    { arte: 'mesa', legenda: 'Mesa posta para receber os amigos.' },
    { arte: 'corrida', legenda: 'Estrada vazia, cedo, antes do movimento.' },
    { arte: 'caminho', legenda: 'Um caminho que vale a pena repetir.' }
  ],
  // Vídeos: título, duração e frases curtas que aparecem enquanto o vídeo (de mentira) toca
  videos: [
    { arte: 'praia', titulo: 'Ondas', duracao: '0:24', texto: 'Um minuto de mar para respirar.', falas: ['O som das ondas, sem pressa.', 'Aqui entra uma frase curta explicando o lugar.', '[local]'] },
    { arte: 'montanha', titulo: 'Lá de cima', duracao: '0:41', texto: 'A vista no fim da trilha.', falas: ['A subida foi longa (exemplo).', 'Lá de cima dá para ver toda a região.', '[local]'] },
    { arte: 'cafe', titulo: 'Como eu passo o café', duracao: '0:32', texto: 'Um ritual simples da manhã.', falas: ['Água quente, sem ferver.', 'Pó na medida e paciência.', 'Exemplo de vídeo curto com legenda.'] },
    { arte: 'cidade', titulo: 'Caminhando pela cidade', duracao: '0:55', texto: 'Ruas, detalhes e gente.', falas: ['Exemplo de vídeo de passeio.', 'Cada frase explica o que aparece na tela.', '[cidade]'] },
    { arte: 'ceu', titulo: 'Noite estrelada', duracao: '0:18', texto: 'Céu em tempo real (exemplo).', falas: ['Longe das luzes, o céu muda.', 'Exemplo de legenda curta.'] },
    { arte: 'jardim', titulo: 'O jardim depois da chuva', duracao: '0:27', texto: 'Cores que aparecem com a água.', falas: ['Exemplo: um detalhe por vez.', 'Texto curto, sem atrapalhar a imagem.'] }
  ]
};

// ---------- Perfil Religioso (cruz) ----------
const MOCK_RELIGIOSO = {
  // Feed: imagem + texto
  feed: [
    { arte: 'biblia', tag: 'Reflexão', data: '[data]', titulo: 'Reflexão da semana', texto: 'Exemplo de publicação: um trecho curto da mensagem e a referência bíblica. [referência bíblica]',
      mais: 'Texto completo de exemplo. Aqui Aluísio desenvolve a reflexão em poucos parágrafos, sem pressa, para quem quiser ler até o fim. [texto a definir]' },
    { arte: 'comunidade', tag: 'Comunidade', data: '[data]', titulo: 'Encontro de [grupo]', texto: 'Exemplo de registro de um encontro: quem participou, o tema e uma foto do momento. [igreja]' },
    { arte: 'igreja', tag: 'Agenda', data: '[data]', titulo: 'Culto de [dia da semana]', texto: 'Exemplo de aviso de agenda: dia, horário e local. [horário] · [endereço público da igreja]' },
    { arte: 'vela', tag: 'Reflexão', data: '[data]', titulo: 'Um momento de silêncio', texto: 'Exemplo de post curto, só imagem e uma frase para meditar.' },
    { arte: 'caminho', tag: 'Estudo', data: '[data]', titulo: 'Estudo bíblico: [tema]', texto: 'Exemplo: convite para o estudo da semana, com o tema e o texto base. [referência bíblica]',
      mais: 'Exemplo de texto completo: os pontos que serão estudados e como participar. [texto a definir]' }
  ],
  // Mensagens (material dele como pastor): séries de pregações com áudio e esboço
  mensagens: [
    { arte: 'caminho', serie: 'Série de exemplo: [tema da série]', descricao: 'Exemplo de série de mensagens sobre um mesmo tema, uma por semana.',
      itens: [
        { titulo: '[Título da mensagem 1]', ref: '[referência bíblica]', data: '[data]', duracao: '[duração]' },
        { titulo: '[Título da mensagem 2]', ref: '[referência bíblica]', data: '[data]', duracao: '[duração]' },
        { titulo: '[Título da mensagem 3]', ref: '[referência bíblica]', data: '[data]', duracao: '[duração]' }
      ] },
    { arte: 'biblia', serie: 'Série de exemplo: [livro da Bíblia]', descricao: 'Exemplo de série que percorre um livro da Bíblia, capítulo por capítulo.',
      itens: [
        { titulo: '[Título da mensagem 1]', ref: '[referência bíblica]', data: '[data]', duracao: '[duração]' },
        { titulo: '[Título da mensagem 2]', ref: '[referência bíblica]', data: '[data]', duracao: '[duração]' }
      ] },
    { arte: 'vela', serie: 'Mensagens avulsas', descricao: 'Exemplo de mensagens de datas especiais ou convites.',
      itens: [
        { titulo: '[Título da mensagem]', ref: '[referência bíblica]', data: '[data]', duracao: '[duração]' }
      ] }
  ],
  // Esboço de exemplo (o mesmo para todas as mensagens até haver material real)
  esboco: [
    ['Introdução', '[como a mensagem começa]'],
    ['1. [Primeiro ponto]', '[ideia principal e texto de apoio]'],
    ['2. [Segundo ponto]', '[ideia principal e texto de apoio]'],
    ['3. [Terceiro ponto]', '[ideia principal e texto de apoio]'],
    ['Aplicação', '[o que levar para a semana]']
  ]
};
