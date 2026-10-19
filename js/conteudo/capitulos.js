// CONTEÚDO — é aqui que se edita o texto do site (não precisa mexer no resto).
// Capítulos: nome do botão, itens em volta do avatar e caixa de rolagem

// MOCK provisório (18/10/2026): palavras e desenhos só sinalizam o assunto de cada capítulo; não são informações do Aluísio.
const CAPITULOS = {
  trajetoria: { label: 'Trajetória', fundo: 'traj',
    esq: [{ fig: 'map_pin', big: 'ORIGEM', cap: 'onde tudo começou' }, { fig: 'school', big: 'FORMAÇÃO', cap: 'os estudos' }],
    dir: [{ fig: 'briefcase', big: 'EXPERIÊNCIA', cap: 'por onde passou' }, { fig: 'flag', big: 'HOJE', cap: 'onde está' }],
    // 3º item do marcador (opcional): linhas { ano, texto, aviso } mostradas na caixa; com aviso, a linha fica em vermelho
    marcador: ['Rolagem de Trajetória', '[Linha do tempo animada, na horizontal ou mista — conteúdo a fornecer]', [
      { ano: '2022', texto: 'Faculdade Nova Roma',
        aviso: 'Visto só no LinkedIn (cartão de aniversário da Faculdade Nova Roma, nov/2022, e agradecimento pelo "sentido de pertencimento"). Não aparece no currículo nem no Lattes: confirmar com Aluísio o cargo e o período.' }
    ]] },
  novidades: { label: 'Novidades', feed: true, fundo: 'nov',
    esq: [{ fig: 'bell', big: 'AGORA', cap: 'o que está acontecendo' }, { fig: 'news', big: 'RECENTES', cap: 'publicações novas' }],
    dir: [{ fig: 'filter', big: 'FRENTES', cap: 'por área de atuação' }, { fig: 'star', big: 'DESTAQUES', cap: 'o que mais importa' }] },
  projetos: { label: 'Projetos', fundo: 'proj',
    esq: [{ fig: 'clipboard', big: 'ANTES', cap: 'o ponto de partida' }, { fig: 'tools', big: 'AÇÃO', cap: 'o que foi feito' }],
    dir: [{ fig: 'chart_line', big: 'DEPOIS', cap: 'o que mudou' }, { fig: 'users', big: 'IMPACTO', cap: 'quem ganhou' }],
    marcador: ['Rolagem de Projetos', '[Zoom no fundo revela a grade de projetos: antes, depois e impacto]'] },
  acervo: { label: 'Acervo', fundo: 'acv',
    // 19/10: 6 itens (3 de cada lado); CURSOS e MATERIAL DIDÁTICO incluídos a pedido de Allan
    esq: [{ fig: 'file_text', big: 'CURRÍCULOS', cap: 'versões completas' }, { fig: 'school', big: 'DIPLOMAS', cap: 'formação' }, { fig: 'certificate', big: 'CERTIFICADOS', cap: 'cursos' }],
    dir: [{ fig: 'books', big: 'PUBLICAÇÕES', cap: 'livros e palestras' }, { fig: 'presentation', big: 'CURSOS', cap: 'aulas e disciplinas' }, { fig: 'book', big: 'MATERIAL DIDÁTICO', cap: 'apoio às aulas' }],
    marcador: ['Rolagem de Acervo', '[Estantes de arquivos entram atrás do Aluísio e revelam os documentos]'] },
  contato: { label: 'Contato', fundo: 'cont', orbita: true,  // orbita: os botões giram em volta da cabeça (ícones em img/icones/)
    // link: endereço que o botão abre (em nova aba). Sem link, o botão ainda não leva a lugar nenhum.
    esq: [{ contato: 'insta', big: 'Instagram', link: 'https://www.instagram.com/aluisiogondim.academico/' },
          { contato: 'linkedin', big: 'LinkedIn', link: 'https://www.linkedin.com/in/aluisiogondim/' }],
    dir: [{ contato: 'email', big: 'E-mail' },
          { contato: 'facebook', big: 'Facebook', link: 'https://www.facebook.com/aluisiogondim.academico' }],
    marcador: null },  // sem caixa: só o espaço para rolar (a rolagem acelera os ícones)
  rel1: { label: 'Teologia', icone: 'vazio', fundo: 'teo',
    esq: [{ fig: 'book', big: 'ESTUDO', cap: 'formação teológica' }, { fig: 'bulb', big: 'REFLEXÃO', cap: 'ideias e textos' }],
    dir: [{ fig: 'presentation', big: 'ENSINO', cap: 'aulas e conversas' }, { fig: 'route', big: 'CAMINHO', cap: 'a jornada da fé' }],
    marcador: ['Perfil religioso', '[Conteúdo e animação a definir]'] },
  rel2: { label: 'Atuação pastoral', icone: 'vazio', fundo: 'past',
    esq: [{ fig: 'users_group', big: 'COMUNIDADE', cap: 'as pessoas' }, { fig: 'heart', big: 'CUIDADO', cap: 'acompanhar de perto' }],
    dir: [{ fig: 'message_circle', big: 'ENCONTROS', cap: 'reuniões e cultos' }, { fig: 'target', big: 'PROJETOS', cap: 'iniciativas próprias' }],
    marcador: ['Perfil religioso', '[Conteúdo e animação a definir]'] },
  galeria: { label: 'Galeria', fundo: 'gal',
    esq: [{ fig: 'photo', big: 'FOTOS', cap: 'momentos registrados' }, { fig: 'video', big: 'VÍDEOS', cap: 'em movimento' }],
    dir: [{ fig: 'camera', big: 'MOMENTOS', cap: 'do dia a dia' }, { fig: 'movie', big: 'BASTIDORES', cap: 'o que não aparece' }],
    marcador: ['Galeria pessoal', '[Grande galeria de fotos e vídeos]'] },

  // 19/10 — perfis Pessoal e Religioso (MOCK). mock: qual tela de exemplo aparece ao rolar (conteúdo em js/conteudo/mocks-perfis.js)
  pfeed: { label: 'Feed', icone: 'novidades', fundo: 'gal', mock: 'feed', dados: 'pessoal',
    esq: [{ fig: 'photo', big: 'FOTOS', cap: 'e textos curtos' }, { fig: 'heart', big: 'MOMENTOS', cap: 'do dia a dia' }],
    dir: [{ fig: 'route', big: 'VIAGENS', cap: 'lugares e caminhos' }, { fig: 'book', big: 'LEITURAS', cap: 'o que está lendo' }] },
  calendario: { label: 'Calendário', fundo: 'cal', mock: 'calendario',
    esq: [{ fig: 'calendar', big: 'AGENDA', cap: 'mês a mês' }, { fig: 'map_pin', big: 'LUGARES', cap: 'onde vai estar' }],
    dir: [{ fig: 'users', big: 'ENCONTROS', cap: 'com amigos' }, { fig: 'flag', big: 'VIAGENS', cap: 'próximos destinos' }] },
  fotos: { label: 'Fotos', icone: 'galeria', fundo: 'gal', mock: 'fotos',
    esq: [{ fig: 'photo', big: 'FOTOS', cap: 'para contemplar' }, { fig: 'camera', big: 'OLHAR', cap: 'o que chamou atenção' }],
    dir: [{ fig: 'map_pin', big: 'LUGARES', cap: 'por onde passou' }, { fig: 'heart', big: 'DETALHES', cap: 'pequenas coisas' }] },
  videos: { label: 'Vídeos', fundo: 'gal', mock: 'videos',
    esq: [{ fig: 'video', big: 'VÍDEOS', cap: 'curtos' }, { fig: 'movie', big: 'CENAS', cap: 'em movimento' }],
    dir: [{ fig: 'message_circle', big: 'LEGENDAS', cap: 'que explicam' }, { fig: 'route', big: 'PASSEIOS', cap: 'caminhos filmados' }] },
  rfeed: { label: 'Feed', icone: 'novidades', fundo: 'teo', mock: 'feed', dados: 'religioso',
    esq: [{ fig: 'bulb', big: 'REFLEXÕES', cap: 'textos curtos' }, { fig: 'users_group', big: 'COMUNIDADE', cap: 'encontros' }],
    dir: [{ fig: 'bell', big: 'AGENDA', cap: 'cultos e estudos' }, { fig: 'book', big: 'ESTUDOS', cap: 'convites' }] },
  mensagens: { label: 'Mensagens', fundo: 'teo', mock: 'mensagens',
    esq: [{ fig: 'book', big: 'MENSAGENS', cap: 'pregações' }, { fig: 'books', big: 'SÉRIES', cap: 'por tema' }],
    dir: [{ fig: 'file_text', big: 'ESBOÇOS', cap: 'para estudar' }, { fig: 'message_circle', big: 'ÁUDIO', cap: 'para ouvir' }] }
};
