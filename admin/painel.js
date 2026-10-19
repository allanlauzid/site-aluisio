// PAINEL ADMINISTRATIVO (19/10/2026) — abre em index.html#admin.
// 1) Só um campo: senha provisória ou código TOTP de 6 dígitos de um celular cadastrado.
// 2) Painel: "Site" (volta ao site) no canto superior esquerdo · "Bem-vindo, [apelido]" · seções para atualizar o site.
// Sem banco de dados ainda: as edições viram RASCUNHO só neste navegador; o site continua lendo js/conteudo/.

const PAINEL = (() => {
  const H = document.documentElement;
  let raiz = null, sessao = null, secao = 'inicio', relogio = 0, ocupado = false;
  const esc = (s) => escHTML(s);
  const quando = (t) => new Date(t).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  // lê uma variável do conteúdo do site (POSTS, CAPITULOS...) sem quebrar se o arquivo não existir
  const global = (nome, padrao) => { try { const v = Function('return typeof ' + nome + ' !== "undefined" ? ' + nome + ' : undefined')(); return v === undefined ? padrao : v; } catch (e) { return padrao; } };
  const copia = (o) => JSON.parse(JSON.stringify(o));

  // ---------------- Seções ----------------
  const cap = (id) => (global('CAPITULOS', {})[id] || { esq: [], dir: [] });
  const lista = (id, grupo, nome, desc, fonte, titulo, sub, extra) => Object.assign({ id, grupo, nome, desc, tipo: 'lista', fonte, titulo, sub }, extra || {});
  const SECOES = [
    { id: 'inicio', grupo: '', nome: 'Início', tipo: 'inicio' },
    lista('novidades', 'Profissional', 'Novidades', 'Posts do feed de Novidades. "fav" marcado = aparece no leque de destaques.',
      () => global('POSTS', []), (p) => p.titulo, (p) => [p.data, (p.tags || []).join(', ')].filter(Boolean).join(' · ')),
    lista('trajetoria', 'Profissional', 'Trajetória', 'Marcos da trajetória, em ordem do tempo.',
      () => global('TRAJETORIA_MARCOS', []), (m) => m.titulo, (m) => [m.ano, m.instituicao].filter(Boolean).join(' · ')),
    lista('projetos', 'Profissional', 'Projetos', 'Cards da grade de Projetos (antes, ação, depois, impacto).',
      () => global('PROJETOS', []), (p) => p.titulo, (p) => [p.frente, p.periodo].filter(Boolean).join(' · ')),
    lista('acervo', 'Profissional', 'Acervo', 'Itens das prateleiras do Acervo (currículos, diplomas, certificados...).',
      () => global('ACERVO', []).flat().reduce((l, pr) => l.concat((pr.itens || []).map((it) => Object.assign({ prateleira: pr.nome }, it))), []),
      (i) => i.titulo, (i) => [i.prateleira, i.sub].filter(Boolean).join(' · ')),
    lista('cursos', 'Profissional', 'Cursos', 'Disciplinas e aulas (vídeos do YouTube) que aparecem no Acervo.',
      () => global('CURSOS', []), (c) => c.titulo, (c) => [c.nivel, (c.aulas || []).length + ' aulas'].join(' · ')),
    lista('contato', 'Profissional', 'Contato', 'Botões que giram em volta do Aluísio. link = endereço que o botão abre.',
      () => cap('contato').esq.concat(cap('contato').dir), (c) => c.big, (c) => c.link || '[sem link]'),
    lista('rfeed', 'Religioso', 'Feed', 'Publicações do perfil religioso (imagem + texto).',
      () => global('MOCK_RELIGIOSO', { feed: [] }).feed, (p) => p.titulo, (p) => [p.tag, p.data].join(' · '), { mock: true }),
    lista('mensagens', 'Religioso', 'Mensagens', 'Séries de pregações: cada uma com mensagens (título, referência, áudio, esboço).',
      () => global('MOCK_RELIGIOSO', { mensagens: [] }).mensagens, (s) => s.serie, (s) => (s.itens || []).length + ' mensagens', { mock: true }),
    lista('teologia', 'Religioso', 'Teologia', 'Itens em volta do Aluísio no botão Teologia (conteúdo do botão: a definir).',
      () => cap('rel1').esq.concat(cap('rel1').dir), (i) => i.big, (i) => i.cap),
    lista('pastoral', 'Religioso', 'Atuação pastoral', 'Itens em volta do Aluísio no botão Atuação pastoral (conteúdo: a definir).',
      () => cap('rel2').esq.concat(cap('rel2').dir), (i) => i.big, (i) => i.cap),
    lista('pfeed', 'Pessoal', 'Feed', 'Publicações do perfil pessoal (foto + texto curto).',
      () => global('MOCK_PESSOAL', { feed: [] }).feed, (p) => p.titulo, (p) => [p.tag, p.data].join(' · '), { mock: true }),
    lista('calendario', 'Pessoal', 'Calendário', 'Eventos. mes: 0 = mês atual, 1 = próximo (quando houver banco, vira data de verdade).',
      () => global('MOCK_PESSOAL', { calendario: [] }).calendario, (e) => e.titulo, (e) => 'dia ' + e.dia + (e.ate ? '–' + e.ate : '') + ' · ' + e.local, { mock: true }),
    lista('fotos', 'Pessoal', 'Fotos', 'Fotos com legenda curta.',
      () => global('MOCK_PESSOAL', { fotos: [] }).fotos, (f) => f.legenda, (f) => f.arte, { mock: true }),
    lista('videos', 'Pessoal', 'Vídeos', 'Vídeos curtos com frases que explicam o que aparece.',
      () => global('MOCK_PESSOAL', { videos: [] }).videos, (v) => v.titulo, (v) => v.duracao + ' · ' + v.texto, { mock: true }),
    lista('barra', 'Site', 'Barra e botões', 'Quais botões aparecem na barra de cada perfil, na ordem (um por linha).',
      () => global('ORDEM', []).map((p) => ({ perfil: p, nome: global('NOMES', {})[p], botoes: (global('BARRAS', {})[p] || []).slice() })),
      (b) => b.nome, (b) => b.botoes.map((id) => (cap(id).label || id)).join(' · ')),
    lista('itens', 'Site', 'Itens em volta do avatar', 'Ícone, palavra grande e legenda de cada botão (esq = esquerda, dir = direita).',
      () => Object.keys(global('CAPITULOS', {})).map((id) => ({ id, label: cap(id).label, esq: cap(id).esq, dir: cap(id).dir })),
      (c) => c.label, (c) => c.id),
    { id: 'imagens', grupo: 'Site', nome: 'Imagens', tipo: 'imagens' },
    { id: 'checagem', grupo: 'Site', nome: 'Checagem antes de publicar', tipo: 'checagem' },
    { id: 'publicar', grupo: 'Site', nome: 'Publicar e histórico', tipo: 'publicar' },
    { id: 'dispositivos', grupo: 'Acesso', nome: 'Celulares (TOTP)', tipo: 'dispositivos' },
    { id: 'senha', grupo: 'Acesso', nome: 'Senha provisória', tipo: 'senha' },
    { id: 'acessos', grupo: 'Acesso', nome: 'Acessos recentes', tipo: 'acessos' }
  ];
  const achar = (id) => SECOES.find((s) => s.id === id) || SECOES[0];

  const ROTULOS = {
    titulo: 'Título', resumo: 'Resumo', paragrafos: 'Parágrafos (um por linha)', data: 'Data', tags: 'Tags (uma por linha)',
    fav: 'Destaque no leque', img: 'Imagem (arquivo em img/posts/)', fotoX: 'X vermelho na foto', avisos: 'Avisos em vermelho (um por linha)',
    mock: 'Marcar como MOCK', id: 'Identificador', ano: 'Ano', palavra: 'Palavra grande', instituicao: 'Instituição', cargo: 'Cargo',
    detalhes: 'Detalhes', pendente: 'Pendente de confirmação', tema: 'Tema', frente: 'Frente', periodo: 'Período', fig: 'Ícone',
    antes: 'Antes', acao: 'Ação', depois: 'Depois', impacto: 'Impacto', prateleira: 'Prateleira', sub: 'Subtítulo', texto: 'Texto',
    link: 'Link', nivel: 'Nível', descricao: 'Descrição', aulas: 'Aulas', contato: 'Rede', big: 'Palavra grande', cap: 'Legenda',
    arte: 'Imagem', tag: 'Tag', mais: 'Texto completo ("Ler mais")', serie: 'Série', itens: 'Mensagens', mes: 'Mês (0 = atual)',
    dia: 'Dia', ate: 'Até o dia', hora: 'Hora', local: 'Local', tipo: 'Tipo', legenda: 'Legenda', duracao: 'Duração (m:ss)',
    falas: 'Frases durante o vídeo (uma por linha)', perfil: 'Perfil', nome: 'Nome', botoes: 'Botões (um por linha)', label: 'Nome do botão',
    esq: 'Itens à esquerda', dir: 'Itens à direita'
  };
  const LONGOS = ['resumo', 'texto', 'descricao', 'detalhes', 'mais', 'antes', 'acao', 'depois', 'impacto'];

  // ---------------- Abrir / fechar ----------------
  function abrir() {
    H.classList.add('modo-admin');
    if (!raiz) { raiz = document.createElement('div'); raiz.id = 'admin'; document.body.append(raiz); ligarAtividade(); }
    raiz.hidden = false;
    if (typeof PWA !== 'undefined') PWA.ligar();
    sessao = lerSessao();
    if (sessao) mostrarPainel(); else mostrarLogin();
  }
  function fechar() {
    H.classList.remove('modo-admin');
    if (raiz) raiz.hidden = true;
  }
  function irAoSite() {
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; }
    fechar();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', () => { if (location.hash === '#admin') abrir(); else fechar(); });

  // ---------------- Sessão ----------------
  function lerSessao() {
    try { const s = JSON.parse(sessionStorage.getItem('admin-sessao')); return s && s.ate > Date.now() ? s : null; } catch (e) { return null; }
  }
  function gravarSessao() { if (!sessao) return; sessao.ate = Date.now() + ADMIN_CONFIG.sessaoMinutos * 60000; try { sessionStorage.setItem('admin-sessao', JSON.stringify(sessao)); } catch (e) { /* nada */ } }
  function sair() { sessao = null; try { sessionStorage.removeItem('admin-sessao'); } catch (e) { /* nada */ } mostrarLogin(); }
  function ligarAtividade() {
    let ultimo = 0;
    ['pointerdown', 'keydown'].forEach((ev) => raiz.addEventListener(ev, () => { if (sessao && Date.now() - ultimo > 20000) { ultimo = Date.now(); gravarSessao(); } }));
    setInterval(() => { if (sessao && !lerSessao() && !raiz.hidden) sair(); }, 30000);
  }

  // ---------------- Tela de acesso: só o campo ----------------
  function mostrarLogin() {
    raiz.className = 'adm-login';
    raiz.innerHTML = '<form class="adm-campo" autocomplete="off" novalidate>' +
      '<input id="adm-codigo" type="password" autocomplete="one-time-code" enterkeyhint="go" spellcheck="false" autocapitalize="off" placeholder="Código" aria-label="Código de acesso" aria-describedby="adm-msg">' +
      '<p id="adm-msg" class="adm-msg" role="alert"></p></form>';
    const f = raiz.querySelector('form'), inp = f.querySelector('input'), msg = f.querySelector('.adm-msg');
    if (!TOTP.disponivel()) { msg.textContent = 'Este navegador não permite o acesso (abra pelo endereço https do site).'; inp.disabled = true; return; }
    const enviar = async () => {
      if (ocupado || !inp.value) return;
      ocupado = true; msg.textContent = '';
      const r = await conferirAcesso(inp.value.trim());
      ocupado = false;
      if (r.ok) { sessao = { apelido: r.apelido, metodo: r.metodo }; gravarSessao(); BANCO.registrarAcesso(r.apelido, r.metodo); secao = 'inicio'; mostrarPainel(); return; }
      msg.textContent = r.msg; inp.value = '';
      f.classList.remove('erro'); void f.offsetWidth; f.classList.add('erro');
    };
    f.addEventListener('submit', (e) => { e.preventDefault(); enviar(); });
    // código de 6 dígitos: entra sozinho, sem precisar apertar Enter
    inp.addEventListener('input', () => { if (/^\d{6}$/.test(inp.value) && BANCO.dispositivos().length) enviar(); });
    setTimeout(() => inp.focus(), 60);
  }
  async function conferirAcesso(v) {
    const t = BANCO.tentativas();
    if (t.ate > Date.now()) return { msg: 'Muitas tentativas. Tente de novo em ' + Math.ceil((t.ate - Date.now()) / 60000) + ' min.' };
    if (/^\d{6}$/.test(v)) {
      const l = BANCO.dispositivos();
      for (const d of l) {
        const p = await TOTP.conferir(d.segredo, v, d.ultimoPasso);
        if (p >= 0) { d.ultimoPasso = p; d.ultimoAcesso = Date.now(); BANCO.salvarDispositivos(l); BANCO.salvarTentativas({ erros: 0, ate: 0 }); return { ok: true, apelido: d.apelido, metodo: 'TOTP' }; }
      }
    }
    if (BANCO.senhaLigada() && await TOTP.sha256('site-aluisio:' + v) === BANCO.senhaHash()) {
      BANCO.salvarTentativas({ erros: 0, ate: 0 });
      return { ok: true, apelido: 'Administrador', metodo: 'senha provisória' };
    }
    t.erros = (t.erros || 0) + 1;
    if (t.erros >= ADMIN_CONFIG.maxTentativas) { t.erros = 0; t.ate = Date.now() + ADMIN_CONFIG.bloqueioMinutos * 60000; }
    BANCO.salvarTentativas(t);
    return { msg: t.ate > Date.now() ? 'Muitas tentativas. Tente de novo em ' + ADMIN_CONFIG.bloqueioMinutos + ' min.' : 'Código inválido.' };
  }

  // ---------------- Painel ----------------
  function mostrarPainel() {
    raiz.className = 'adm-painel';
    let grupo = null, menu = '';
    SECOES.forEach((s) => {
      if (s.grupo !== grupo) { if (grupo !== null) menu += '</div>'; grupo = s.grupo; menu += '<div class="adm-grupo">' + (grupo ? '<span class="adm-grupo-nome">' + grupo + '</span>' : ''); }
      menu += '<button type="button" class="adm-item' + (s.id === secao ? ' on' : '') + '" data-secao="' + s.id + '"' + (s.id === secao ? ' aria-current="page"' : '') + '>' + s.nome +
        (BANCO.rascunho(s.id) ? '<i class="adm-ponto" title="Tem rascunho"></i>' : '') + '</button>';
    });
    menu += '</div>';
    raiz.innerHTML =
      '<header class="adm-topo"><button type="button" class="adm-site">Site</button>' +
      '<div class="adm-ola">Bem-vindo, <strong>' + esc(sessao.apelido) + '</strong></div>' +
      '<button type="button" class="adm-sair">Sair</button></header>' +
      '<div class="adm-corpo"><nav class="adm-menu" aria-label="Seções do painel">' + menu + '</nav><main class="adm-main" tabindex="-1"></main></div>';
    raiz.querySelector('.adm-site').addEventListener('click', irAoSite);
    raiz.querySelector('.adm-sair').addEventListener('click', sair);
    raiz.querySelectorAll('[data-secao]').forEach((b) => b.addEventListener('click', () => { secao = b.dataset.secao; mostrarPainel(); }));
    const atual = raiz.querySelector('.adm-item.on'); if (atual && atual.scrollIntoView) atual.scrollIntoView({ block: 'nearest', inline: 'center' });
    montarSecao();
  }
  const main = () => raiz.querySelector('.adm-main');
  const cabecalho = (s, extra) => '<header class="adm-cab"><div><span class="adm-cab-grupo">' + (s.grupo || 'Painel') + '</span><h1>' + s.nome + '</h1>' +
    (s.desc ? '<p>' + esc(s.desc) + '</p>' : '') + '</div>' + (s.mock ? carimboMock() : '') + (extra || '') + '</header>';
  const aviso = (txt, tipo) => '<div class="adm-aviso ' + (tipo || '') + '">' + txt + '</div>';
  const SEM_BANCO = 'Sem banco de dados: o que você salvar aqui fica como <strong>rascunho só neste navegador</strong>. O site continua mostrando o conteúdo dos arquivos.';

  function montarSecao() {
    const s = achar(secao);
    ({ inicio, lista: secaoLista, imagens, checagem, publicar, dispositivos, senha, acessos })[s.tipo](s);
    ajustarCarimbos(main());
  }

  // ---- Início ----
  function inicio(s) {
    const d = BANCO.dispositivos(), rasc = BANCO.secoesComRascunho();
    const conta = (g) => SECOES.filter((x) => x.grupo === g && x.tipo === 'lista').reduce((n, x) => n + x.fonte().length, 0);
    const app = typeof PWA !== 'undefined' ? PWA.estado() : 'navegador';
    main().innerHTML = '<header class="adm-cab"><div><span class="adm-cab-grupo">Painel</span><h1>Bem-vindo, ' + esc(sessao.apelido) + '</h1>' +
      '<p>Entrou por ' + esc(sessao.metodo) + '. Escolha uma seção no menu para atualizar o site.</p></div></header>' +
      (BANCO.conectado() ? '' : aviso('<strong>Banco de dados ainda não ligado.</strong> O painel já mostra todo o conteúdo do site e salva rascunhos neste navegador. Quando o banco existir, o mesmo painel passa a gravar de verdade e publicar.', 'atencao')) +
      (BANCO.senhaLigada() ? aviso('A <strong>senha provisória</strong> está ligada. Cadastre os celulares em <a href="#" data-ir="dispositivos">Celulares (TOTP)</a> e depois desligue a senha.', 'atencao') : '') +
      '<div class="adm-cards">' +
      card('Profissional', conta('Profissional') + ' itens', 'Novidades, Trajetória, Projetos, Acervo, Cursos, Contato') +
      card('Religioso', conta('Religioso') + ' itens', 'Feed, Mensagens, Teologia, Atuação pastoral') +
      card('Pessoal', conta('Pessoal') + ' itens', 'Feed, Calendário, Fotos, Vídeos') +
      card('Celulares (TOTP)', d.length ? d.map((x) => esc(x.apelido)).join(', ') : 'nenhum', d.length ? 'Cada um entra com o código do seu app.' : 'Cadastre o seu e o do Aluísio.', 'dispositivos') +
      card('Rascunhos', rasc.length ? rasc.length + ' seção(ões)' : 'nenhum', rasc.map((r) => achar(r).nome).join(', ') || 'Nada pendente.') +
      card('App no celular', app === 'instalado' ? 'aberto como app' : app === 'pode' ? 'pronto para instalar' : 'pelo navegador',
        app === 'pode' ? '<button type="button" class="adm-btn azul" data-instalar>Instalar</button>' :
        app === 'instalado' ? 'Abre direto neste painel.' : 'No site publicado (https), abra /#admin e use "Instalar app" ou "Adicionar à tela de início".') +
      '</div>';
    main().querySelectorAll('[data-ir]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); secao = a.dataset.ir; mostrarPainel(); }));
    const ins = main().querySelector('[data-instalar]'); if (ins) ins.addEventListener('click', () => PWA.instalar().then(() => montarSecao()));
  }
  const card = (t, v, sub, ir) => '<div class="adm-card"' + '><span>' + t + '</span><strong>' + v + '</strong><small>' + sub + '</small>' +
    (ir ? '<a href="#" class="adm-link" data-ir="' + ir + '">Abrir</a>' : '') + '</div>';

  // ---- Listas de conteúdo (edição genérica) ----
  function itensDe(s) { const r = BANCO.rascunho(s.id); return r ? r.itens : copia(s.fonte()); }
  function secaoLista(s) {
    const r = BANCO.rascunho(s.id), itens = itensDe(s);
    main().innerHTML = cabecalho(s) + aviso(SEM_BANCO) +
      '<div class="adm-acoes"><button type="button" class="adm-btn azul" data-novo>+ Novo item</button>' +
      (r ? '<span class="adm-rasc">Rascunho salvo em ' + quando(r.quando) + '</span><button type="button" class="adm-btn" data-descartar>Descartar rascunho</button>' : '') +
      '<button type="button" class="adm-btn" disabled title="Precisa do banco de dados">Publicar no site</button></div>' +
      (itens.length ? '<ol class="adm-lista">' + itens.map((it, i) => '<li>' +
        '<div class="adm-li-txt"><strong>' + esc(s.titulo(it) || '(sem título)') + '</strong><small>' + esc(s.sub(it) || '') + '</small></div>' +
        ((it && it.mock) || s.mock ? '<span class="adm-tag-mock">MOCK</span>' : '') +
        (it && it.avisos && it.avisos.length ? '<span class="adm-tag-aviso" title="Tem avisos em vermelho">' + it.avisos.length + ' aviso(s)</span>' : '') +
        '<div class="adm-li-acoes">' +
        '<button type="button" class="adm-ico" data-subir="' + i + '" aria-label="Subir"' + (i ? '' : ' disabled') + '>↑</button>' +
        '<button type="button" class="adm-ico" data-descer="' + i + '" aria-label="Descer"' + (i < itens.length - 1 ? '' : ' disabled') + '>↓</button>' +
        '<button type="button" class="adm-btn" data-editar="' + i + '">Editar</button>' +
        '<button type="button" class="adm-btn perigo" data-remover="' + i + '">Remover</button></div></li>').join('') + '</ol>'
        : '<p class="adm-vazio">Nenhum item.</p>');
    const salvar = (l) => { BANCO.salvarRascunho(s.id, l); mostrarPainel(); };
    const m = main();
    m.querySelectorAll('[data-editar]').forEach((b) => b.addEventListener('click', () => editar(s, itens, +b.dataset.editar)));
    m.querySelectorAll('[data-subir]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.subir; itens.splice(i - 1, 0, itens.splice(i, 1)[0]); salvar(itens); }));
    m.querySelectorAll('[data-descer]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.descer; itens.splice(i + 1, 0, itens.splice(i, 1)[0]); salvar(itens); }));
    m.querySelectorAll('[data-remover]').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.certeza) { itens.splice(+b.dataset.remover, 1); salvar(itens); return; }
      b.dataset.certeza = '1'; b.textContent = 'Confirmar remoção';
    }));
    m.querySelector('[data-novo]').addEventListener('click', () => { itens.push(modelo(itens[0])); editar(s, itens, itens.length - 1, true); });
    const d = m.querySelector('[data-descartar]'); if (d) d.addEventListener('click', () => { BANCO.descartarRascunho(s.id); mostrarPainel(); });
  }
  function modelo(ex) {
    if (!ex) return { titulo: '', texto: '' };
    const n = {};
    Object.keys(ex).forEach((k) => { const v = ex[k]; n[k] = typeof v === 'boolean' ? false : typeof v === 'number' ? 0 : typeof v === 'string' ? (k === 'id' ? 'novo-' + Date.now().toString(36) : '') : Array.isArray(v) ? [] : {}; });
    return n;
  }
  function campo(k, v) {
    const r = esc(ROTULOS[k] || k), nome = ' name="' + esc(k) + '"';
    if (typeof v === 'boolean') return '<label class="adm-check"><input type="checkbox" data-t="b"' + nome + (v ? ' checked' : '') + '> ' + r + '</label>';
    if (typeof v === 'number') return '<label class="adm-f"><span>' + r + '</span><input type="number" data-t="n"' + nome + ' value="' + v + '"></label>';
    if (typeof v === 'string') return '<label class="adm-f"><span>' + r + '</span>' + (v.length > 70 || LONGOS.indexOf(k) >= 0
      ? '<textarea data-t="s"' + nome + ' rows="' + Math.min(10, 2 + Math.ceil(v.length / 90)) + '">' + esc(v) + '</textarea>'
      : '<input type="text" data-t="s"' + nome + ' value="' + esc(v) + '">') + '</label>';
    if (Array.isArray(v) && v.every((x) => typeof x === 'string'))
      return '<label class="adm-f"><span>' + r + '</span><textarea data-t="l"' + nome + ' rows="' + Math.min(12, Math.max(3, v.length + 1)) + '">' + esc(v.join('\n')) + '</textarea></label>';
    return '<label class="adm-f"><span>' + r + ' <em>(formato técnico)</em></span><textarea class="adm-json" data-t="j"' + nome + ' rows="8">' + esc(JSON.stringify(v, null, 2)) + '</textarea></label>';
  }
  function editar(s, itens, i, novo) {
    const it = itens[i];
    main().innerHTML = cabecalho(s) +
      '<form class="adm-form"><h2>' + (novo ? 'Novo item' : 'Editar: ' + esc(s.titulo(it) || '')) + '</h2>' +
      Object.keys(it).map((k) => campo(k, it[k])).join('') +
      '<p class="adm-msg" role="alert"></p>' +
      '<div class="adm-acoes"><button type="submit" class="adm-btn azul">Salvar rascunho</button><button type="button" class="adm-btn" data-voltar>Cancelar</button></div></form>';
    main().scrollTop = 0;
    const f = main().querySelector('form');
    f.querySelector('[data-voltar]').addEventListener('click', () => mostrarPainel());
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const n = {};
      try {
        f.querySelectorAll('[data-t]').forEach((x) => {
          const t = x.dataset.t;
          n[x.name] = t === 'b' ? x.checked : t === 'n' ? Number(x.value) : t === 's' ? x.value : t === 'l' ? x.value.split('\n').map((l) => l.trim()).filter(Boolean) : JSON.parse(x.value);
        });
      } catch (err) { f.querySelector('.adm-msg').textContent = 'Um campo "formato técnico" ficou com erro. Confira vírgulas e aspas.'; return; }
      itens[i] = n; BANCO.salvarRascunho(s.id, itens); mostrarPainel();
    });
  }

  // ---- Imagens: converter para WebP (já funciona sem banco) ----
  function imagens(s) {
    main().innerHTML = cabecalho(s) +
      '<p class="adm-txt">Escolha fotos: o painel reduz para no máximo 1600 px e converte para WebP (arquivo bem menor, mesma aparência). ' +
      'Por enquanto você baixa o arquivo pronto; com o banco, ele vai direto para o site.</p>' +
      '<label class="adm-upload"><input type="file" accept="image/*" multiple><span>Escolher imagens</span></label><ul class="adm-imgs"></ul>';
    main().querySelector('input[type=file]').addEventListener('change', (e) => {
      const ul = main().querySelector('.adm-imgs');
      Array.from(e.target.files).forEach((arq) => {
        const li = document.createElement('li'); li.textContent = arq.name + ' — convertendo...'; ul.append(li);
        const img = new Image(), url = URL.createObjectURL(arq);
        img.onload = () => {
          const k = Math.min(1, 1600 / Math.max(img.width, img.height)), c = document.createElement('canvas');
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          c.toBlob((b) => {
            const nome = arq.name.replace(/\.[^.]+$/, '') + '.webp', link = URL.createObjectURL(b);
            li.innerHTML = '<img src="' + link + '" alt=""><span><strong>' + esc(nome) + '</strong><small>' + c.width + '×' + c.height + ' · ' +
              Math.round(arq.size / 1024) + ' KB → ' + Math.round(b.size / 1024) + ' KB</small></span><a class="adm-btn" download="' + esc(nome) + '" href="' + link + '">Baixar</a>';
            URL.revokeObjectURL(url);
          }, 'image/webp', 0.82);
        };
        img.onerror = () => { li.textContent = arq.name + ' — não consegui abrir esta imagem.'; };
        img.src = url;
      });
    });
  }

  // ---- Checagem NÃO PUBLICAR (procura padrões suspeitos em todo o conteúdo) ----
  const PADROES = [
    ['Telefone', /\(?\b\d{2}\)?\s?9\d{4}[-\s.]?\d{4}\b|\b9\d{4}-\d{4}\b/g],
    ['CPF', /\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g],
    ['CEP / endereço', /\b\d{5}-\d{3}\b|\b(?:Rua|Avenida|Av\.|Travessa|Rodovia)\s+[A-ZÁÉÍÓÚ][\wÀ-ú]+/g],
    ['Rede FOCO', /rede\s*foco/gi],
    ['Idade / estado civil / filhos', /\b\d{2}\s+anos de idade\b|\b(casad[oa]|divorciad[oa]|solteir[oa]|viúv[oa]|meus filhos|minha filha|meu filho|minha esposa)\b/gi],
    ['E-mail', /\b[\w.+-]+@[\w-]+\.[\w.]+\b/g],
    ['Dados técnicos da Aluisia', /\b(aluisia|supabase|n8n|token|api[_ -]?key)\b/gi]
  ];
  function checagem(s) {
    const achados = [];
    SECOES.filter((x) => x.tipo === 'lista').forEach((x) => itensDe(x).forEach((it) => {
      const textos = []; (function andar(v) { if (typeof v === 'string') textos.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(andar); })(it);
      textos.forEach((t) => PADROES.forEach(([nome, re]) => {
        re.lastIndex = 0; let m;
        while ((m = re.exec(t))) {
          const a = Math.max(0, m.index - 40), b = Math.min(t.length, m.index + m[0].length + 40);
          achados.push({ secao: x.nome, grupo: x.grupo, item: x.titulo(it), nome, trecho: (a ? '…' : '') + esc(t.slice(a, m.index)) + '<mark>' + esc(m[0]) + '</mark>' + esc(t.slice(m.index + m[0].length, b)) + (b < t.length ? '…' : '') });
        }
      }));
    }));
    main().innerHTML = cabecalho(s) +
      '<p class="adm-txt">Procura em todo o conteúdo (incluindo rascunhos) coisas da lista NÃO PUBLICAR: telefones, endereços, idade, estado civil, filhos, Rede FOCO, dados da Aluisia. ' +
      'É só um alerta: confira cada caso. Fotos pessoais e nomes de alunos não dá para detectar automaticamente.</p>' +
      (achados.length ? '<p class="adm-txt"><strong>' + achados.length + ' ponto(s) para conferir.</strong></p><ul class="adm-achados">' + achados.map((a) =>
        '<li><span class="adm-tag-aviso">' + a.nome + '</span><div><small>' + a.grupo + ' › ' + a.secao + ' › ' + esc(a.item || '') + '</small><p>' + a.trecho + '</p></div></li>').join('') + '</ul>'
        : aviso('Nada encontrado.', 'ok'));
  }

  function publicar(s) {
    const rasc = BANCO.secoesComRascunho();
    main().innerHTML = cabecalho(s) + aviso('Disponível quando o banco de dados existir.', 'atencao') +
      '<ol class="adm-passos"><li><strong>Rascunho</strong> — você edita nas seções (já funciona, só neste navegador).</li>' +
      '<li><strong>Pré-visualizar</strong> — ver o site com o rascunho antes de todo mundo.</li>' +
      '<li><strong>Checagem</strong> — o painel roda a checagem NÃO PUBLICAR antes de liberar.</li>' +
      '<li><strong>Publicar</strong> — o site passa a mostrar a versão nova.</li>' +
      '<li><strong>Histórico</strong> — cada publicação guarda a anterior, com quem publicou e quando; dá para desfazer.</li></ol>' +
      '<h2 class="adm-h2">Rascunhos neste navegador</h2>' +
      (rasc.length ? '<ul class="adm-simples">' + rasc.map((r) => '<li>' + achar(r).grupo + ' › ' + achar(r).nome + ' <small>' + quando(BANCO.rascunho(r).quando) + '</small></li>').join('') + '</ul>' : '<p class="adm-vazio">Nenhum.</p>');
  }

  // ---- Acesso: celulares com TOTP ----
  function dispositivos(s) {
    const l = BANCO.dispositivos();
    main().innerHTML = cabecalho(s) +
      '<p class="adm-txt">Cada pessoa cadastra o próprio celular com um apelido. Ao entrar com o código do app, o painel diz "Bem-vindo, [apelido]". ' +
      'Use um app autenticador (Google Authenticator, Microsoft Authenticator, Authy...).</p>' +
      (BANCO.conectado() ? '' : aviso('Sem banco: o cadastro fica só <strong>neste navegador</strong>. Cadastre no aparelho em que vai entrar (ex.: no app instalado no celular).', 'atencao')) +
      (l.length ? '<ul class="adm-disp">' + l.map((d, i) => '<li><div><strong>' + esc(d.apelido) + '</strong><small>Cadastrado em ' + quando(d.criado) +
        (d.ultimoAcesso ? ' · último acesso ' + quando(d.ultimoAcesso) : ' · ainda não entrou') + '</small></div>' +
        '<div class="adm-li-acoes"><button type="button" class="adm-btn" data-renomear="' + i + '">Renomear</button>' +
        '<button type="button" class="adm-btn" data-trocar="' + i + '">Gerar novo código</button>' +
        '<button type="button" class="adm-btn perigo" data-tirar="' + i + '">Remover</button></div></li>').join('') + '</ul>' : '<p class="adm-vazio">Nenhum celular cadastrado ainda.</p>') +
      '<div class="adm-acoes"><button type="button" class="adm-btn azul" data-adicionar>+ Cadastrar celular</button></div><div class="adm-setup"></div>';
    const m = main();
    m.querySelector('[data-adicionar]').addEventListener('click', () => configurar(-1));
    m.querySelectorAll('[data-trocar]').forEach((b) => b.addEventListener('click', () => configurar(+b.dataset.trocar)));
    m.querySelectorAll('[data-renomear]').forEach((b) => b.addEventListener('click', () => {
      const i = +b.dataset.renomear, li = b.closest('li');
      li.querySelector('div').innerHTML = '<form class="adm-inline"><input type="text" maxlength="30" value="' + esc(l[i].apelido) + '" aria-label="Novo apelido"><button class="adm-btn azul">Salvar</button></form>';
      const f = li.querySelector('form'); f.querySelector('input').focus();
      f.addEventListener('submit', (e) => { e.preventDefault(); const v = f.querySelector('input').value.trim(); if (!v) return; l[i].apelido = v; BANCO.salvarDispositivos(l); mostrarPainel(); });
    }));
    m.querySelectorAll('[data-tirar]').forEach((b) => b.addEventListener('click', () => {
      const i = +b.dataset.tirar;
      if (l.length === 1 && !BANCO.senhaLigada()) { b.textContent = 'Ligue a senha antes'; return; }
      if (!b.dataset.certeza) { b.dataset.certeza = '1'; b.textContent = 'Confirmar remoção'; return; }
      l.splice(i, 1); BANCO.salvarDispositivos(l); mostrarPainel();
    }));
  }
  // Cadastro em 3 passos: apelido → QR code / chave no app → confirmar com o primeiro código
  function configurar(i) {
    const l = BANCO.dispositivos(), caixa = main().querySelector('.adm-setup');
    const passo2 = (apelido) => {
      const segredo = TOTP.novoSegredo(), url = TOTP.endereco(segredo, apelido, ADMIN_CONFIG.emissorTOTP);
      let qr = '';
      try { const q = qrcode(0, 'M'); q.addData(url); q.make(); qr = q.createSvgTag({ cellSize: 5, margin: 2, scalable: true }); } catch (e) { qr = ''; }
      caixa.innerHTML = '<div class="adm-setup-caixa"><h2>' + (i >= 0 ? 'Novo código para ' : 'Cadastrar ') + esc(apelido) + '</h2>' +
        '<div class="adm-setup-grade"><div class="adm-qr" role="img" aria-label="QR code para o app autenticador">' + qr + '</div><div>' +
        '<p><strong>1.</strong> No app autenticador, toque em <em>adicionar</em> e leia o QR code.</p>' +
        '<p>No próprio celular? <a class="adm-link" href="' + esc(url) + '">Abrir no app autenticador</a> ou digite a chave:</p>' +
        '<code class="adm-chave">' + segredo.replace(/(.{4})/g, '$1 ').trim() + '</code> <button type="button" class="adm-btn" data-copiar>Copiar</button>' +
        '<p><strong>2.</strong> Digite o código de 6 dígitos que o app mostra:</p>' +
        '<form class="adm-inline"><input type="text" inputmode="numeric" maxlength="6" autocomplete="one-time-code" placeholder="000000" aria-label="Código do app"><button class="adm-btn azul">Confirmar</button></form>' +
        '<p class="adm-msg" role="alert"></p></div></div>' +
        (i >= 0 ? '<p class="adm-txt">O código antigo deste celular deixa de valer quando você confirmar.</p>' : '') + '</div>';
      caixa.querySelector('[data-copiar]').addEventListener('click', (e) => { try { navigator.clipboard.writeText(segredo); e.target.textContent = 'Copiado'; } catch (er) { /* nada */ } });
      const f = caixa.querySelector('form'), msg = caixa.querySelector('.adm-msg');
      f.addEventListener('submit', async (e) => {
        e.preventDefault();
        const p = await TOTP.conferir(segredo, f.querySelector('input').value.trim(), 0);
        if (p < 0) { msg.textContent = 'Código não confere. Espere o próximo código do app e tente de novo.'; return; }
        const d = { apelido, segredo, criado: Date.now(), ultimoPasso: p, ultimoAcesso: 0 };
        if (i >= 0) { d.criado = l[i].criado; l[i] = d; } else l.push(d);
        BANCO.salvarDispositivos(l); mostrarPainel();
      });
      caixa.querySelector('input').focus();
    };
    if (i >= 0) { passo2(l[i].apelido); return; }
    caixa.innerHTML = '<div class="adm-setup-caixa"><h2>Cadastrar celular</h2><form class="adm-inline"><input type="text" maxlength="30" placeholder="Apelido (ex.: Allan)" aria-label="Apelido">' +
      '<button class="adm-btn azul">Continuar</button></form><p class="adm-msg" role="alert"></p></div>';
    const f = caixa.querySelector('form');
    f.querySelector('input').focus();
    f.addEventListener('submit', (e) => {
      e.preventDefault(); const v = f.querySelector('input').value.trim();
      if (!v) return;
      if (l.some((d) => d.apelido.toLowerCase() === v.toLowerCase())) { caixa.querySelector('.adm-msg').textContent = 'Já existe um celular com esse apelido.'; return; }
      passo2(v);
    });
  }

  // ---- Acesso: senha provisória ----
  function senha(s) {
    const ligada = BANCO.senhaLigada(), temCel = BANCO.dispositivos().length > 0;
    main().innerHTML = cabecalho(s) +
      '<p class="adm-txt">A senha provisória serve para entrar enquanto ninguém tem o celular cadastrado. Depois, o ideal é desligá-la e entrar só com o código do app.</p>' +
      aviso('Situação: <strong>' + (ligada ? 'ligada' : 'desligada') + '</strong>.', ligada ? 'atencao' : 'ok') +
      '<form class="adm-form estreito"><h2>Trocar a senha</h2><label class="adm-f"><span>Nova senha</span><input type="password" name="a" autocomplete="new-password"></label>' +
      '<label class="adm-f"><span>Repita a nova senha</span><input type="password" name="b" autocomplete="new-password"></label><p class="adm-msg" role="alert"></p>' +
      '<div class="adm-acoes"><button class="adm-btn azul">Salvar nova senha</button></div></form>' +
      '<div class="adm-acoes">' + (ligada
        ? '<button type="button" class="adm-btn" data-ligar="0"' + (temCel ? '' : ' disabled title="Cadastre um celular antes"') + '>Desligar a senha provisória</button>'
        : '<button type="button" class="adm-btn" data-ligar="1">Ligar a senha provisória</button>') + '</div>';
    const f = main().querySelector('form'), msg = f.querySelector('.adm-msg');
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const a = f.a.value, b = f.b.value;
      if (a.length < 6) { msg.textContent = 'Use pelo menos 6 caracteres.'; return; }
      if (/^\d{6}$/.test(a)) { msg.textContent = 'Não use 6 números (se confunde com o código do app).'; return; }
      if (a !== b) { msg.textContent = 'As duas senhas não são iguais.'; return; }
      BANCO.salvarSenhaHash(await TOTP.sha256('site-aluisio:' + a)); BANCO.ligarSenha(true);
      msg.textContent = 'Senha trocada.'; msg.classList.add('ok'); f.reset();
    });
    const t = main().querySelector('[data-ligar]'); if (t) t.addEventListener('click', () => { BANCO.ligarSenha(t.dataset.ligar === '1'); mostrarPainel(); });
  }

  function acessos(s) {
    const l = BANCO.acessos();
    main().innerHTML = cabecalho(s) + (l.length ? '<ul class="adm-simples">' + l.map((a) => '<li><strong>' + esc(a.apelido) + '</strong> · ' + esc(a.metodo) + ' <small>' + quando(a.quando) + '</small></li>').join('') + '</ul>' : '<p class="adm-vazio">Nenhum acesso registrado.</p>') +
      '<p class="adm-txt">Com o banco de dados, aqui também dá para encerrar sessões abertas em outros aparelhos.</p>';
  }

  // Abre já, se o endereço for #admin (scripts com defer: a página já foi lida)
  if (location.hash === '#admin') abrir();
  return { abrir, fechar, atualizar: () => { if (sessao && raiz && !raiz.hidden && secao === 'inicio') montarSecao(); } };
})();
