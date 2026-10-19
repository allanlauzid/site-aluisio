// COMPORTAMENTO — telas de exemplo (MOCK) dos perfis Pessoal e Religioso (19/10).
// Cada capítulo com "mock" em js/conteudo/capitulos.js monta aqui a sua tela, que aparece ao rolar a página:
//   feed ........ cartões com imagem e texto curto, com filtros (Pessoal e Religioso)
//   calendario .. mês em grade, setas para mudar de mês, clique no dia para ver os eventos
//   fotos ....... grade de fotos; clique abre a foto grande com a legenda (setas e teclado para passar)
//   videos ...... miniaturas; clique abre um "player" de mentira que mostra as legendas curtas
//   mensagens ... séries de pregações: ouvir (barra de áudio de mentira) e ver o esboço
// Conteúdo em js/conteudo/mocks-perfis.js; desenhos em js/desenhos/artes.js.

const MocksPerfis = (() => {
  const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  const X_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  const SETA = (d) => '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '"/></svg>';
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  const PAUSA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>';

  let raiz = null, cap = null;
  const E = { filtro: 'Todas', mes: 0, dia: null, modal: null, voltarFoco: null, raf: 0, audio: null };

  const segundos = (t) => { const m = /^(\d+):(\d+)$/.exec(t || ''); return m ? +m[1] * 60 + +m[2] : 30; };
  const relogio = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const cabecalho = (titulo, sub) => '<header class="mp-cab"><h2>' + titulo + '</h2>' + (sub ? '<p>' + sub + '</p>' : '') + carimboMock() + '</header>';

  function montar(c) {
    parar();
    cap = c;
    raiz = $('conteudo');
    E.filtro = 'Todas'; E.mes = 0; E.dia = null;
    ({ feed: feed, calendario: calendario, fotos: fotos, videos: videos, mensagens: mensagens })[c.mock]();
  }
  function depois() { requestAnimationFrame(() => ajustarCarimbos(raiz)); }

  // ---------- Feed ----------
  function feed() {
    const dados = (cap.dados === 'religioso' ? MOCK_RELIGIOSO : MOCK_PESSOAL).feed;
    const tags = ['Todas'];
    dados.forEach((p) => { if (tags.indexOf(p.tag) < 0) tags.push(p.tag); });
    const lista = E.filtro === 'Todas' ? dados : dados.filter((p) => p.tag === E.filtro);
    raiz.innerHTML = '<section class="feed mp-feed" aria-label="Feed (exemplo)">' +
      '<div class="filtros" role="group" aria-label="Filtrar">' +
      tags.map((t) => '<button type="button" class="chip foco' + (E.filtro === t ? ' on' : '') + '" aria-pressed="' + (E.filtro === t) + '" data-tag="' + escHTML(t) + '">' + escHTML(t) + '</button>').join('') + '</div>' +
      lista.map((p, i) => '<article class="card">' +
        '<div class="card-img">' + arte(p.arte) + carimboMock('canto') + '</div>' +
        '<div class="card-corpo"><div class="card-meta"><span class="tag">' + escHTML(p.tag) + '</span><span class="data">' + escHTML(p.data) + '</span></div>' +
        '<h2>' + escHTML(p.titulo) + '</h2><p>' + escHTML(p.texto) + '</p>' +
        (p.mais ? '<p class="mp-mais" hidden>' + escHTML(p.mais) + '</p><div><button type="button" class="link-btn foco" data-mais="' + i + '" aria-expanded="false">Ler mais' + ICONES.seta + '</button></div>' : '') +
        '</div></article>').join('') + '</section>';
    raiz.querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => { E.filtro = b.dataset.tag; feed(); }));
    raiz.querySelectorAll('[data-mais]').forEach((b) => b.addEventListener('click', () => {
      const t = b.closest('.card-corpo').querySelector('.mp-mais'), abrir = t.hidden;
      t.hidden = !abrir; b.setAttribute('aria-expanded', abrir);
      b.innerHTML = (abrir ? 'Mostrar menos' : 'Ler mais') + ICONES.seta;
    }));
    depois();
  }

  // ---------- Calendário ----------
  function calendario() {
    const hoje = new Date(), base = new Date(hoje.getFullYear(), hoje.getMonth() + E.mes, 1);
    const ano = base.getFullYear(), mes = base.getMonth(), dias = new Date(ano, mes + 1, 0).getDate(), inicio = base.getDay();
    const eventos = MOCK_PESSOAL.calendario.filter((e) => e.mes === E.mes);
    const doDia = (d) => eventos.filter((e) => d >= e.dia && d <= (e.ate || e.dia));
    const ehHoje = (d) => E.mes === 0 && d === hoje.getDate();
    let grade = SEMANA.map((s) => '<span class="mp-sem" aria-hidden="true">' + s + '</span>').join('');
    for (let i = 0; i < inicio; i++) grade += '<span class="mp-vazio"></span>';
    for (let d = 1; d <= dias; d++) {
      const ev = doDia(d);
      grade += '<button type="button" class="mp-dia foco' + (ev.length ? ' tem' : '') + (ehHoje(d) ? ' hoje' : '') + (E.dia === d ? ' sel' : '') + '" data-dia="' + d + '"' +
        ' aria-label="' + d + ' de ' + MESES[mes] + (ev.length ? ', ' + ev.length + ' evento' + (ev.length > 1 ? 's' : '') : '') + '"' + (E.dia === d ? ' aria-pressed="true"' : '') + '>' +
        '<span>' + d + '</span>' + (ev.length ? '<i aria-hidden="true"></i>' : '') + '</button>';
    }
    const lista = E.dia ? doDia(E.dia) : eventos;
    const titLista = E.dia ? E.dia + ' de ' + MESES[mes] : 'Neste mês';
    raiz.innerHTML = '<section class="mp-sec" aria-label="Calendário (exemplo)"><div class="mp-painel mp-cal">' +
      cabecalho('Calendário', 'Exemplo: onde Aluísio vai estar e o que vem por aí.') +
      '<div class="mp-mes"><button type="button" class="mp-seta foco" data-ir="-1" aria-label="Mês anterior">' + SETA(-1) + '</button>' +
      '<strong aria-live="polite">' + MESES[mes] + ' ' + ano + '</strong>' +
      '<button type="button" class="mp-seta foco" data-ir="1" aria-label="Próximo mês">' + SETA(1) + '</button></div>' +
      '<div class="mp-grade">' + grade + '</div>' +
      '<div class="mp-eventos"><div class="mp-eventos-tit">' + titLista + (E.dia ? ' <button type="button" class="mp-limpar foco" data-limpar>ver o mês todo</button>' : '') + '</div>' +
      (lista.length ? '<ul>' + lista.map((e) => '<li><span class="mp-ev-data">' + e.dia + (e.ate ? '–' + e.ate : '') + '</span>' +
        '<span class="mp-ev-txt"><strong>' + escHTML(e.titulo) + '</strong><small>' + escHTML(e.hora) + ' · ' + escHTML(e.local) + '</small></span>' +
        '<span class="tag">' + escHTML(e.tipo) + '</span></li>').join('') + '</ul>'
        : '<p class="mp-nada">Nenhum evento ' + (E.dia ? 'neste dia' : 'neste mês') + '.</p>') +
      '</div></div></section>';
    raiz.querySelectorAll('[data-ir]').forEach((b) => b.addEventListener('click', () => { E.mes += +b.dataset.ir; E.dia = null; calendario(); focar('[data-ir="' + b.dataset.ir + '"]'); }));
    raiz.querySelectorAll('[data-dia]').forEach((b) => b.addEventListener('click', () => { const d = +b.dataset.dia; E.dia = E.dia === d ? null : d; calendario(); focar('[data-dia="' + d + '"]'); }));
    const l = raiz.querySelector('[data-limpar]'); if (l) l.addEventListener('click', () => { E.dia = null; calendario(); });
    depois();
  }
  const focar = (sel) => { const b = raiz.querySelector(sel); if (b) b.focus({ preventScroll: true }); };

  // ---------- Fotos ----------
  function fotos() {
    const F = MOCK_PESSOAL.fotos;
    raiz.innerHTML = '<section class="mp-sec mp-larga" aria-label="Fotos (exemplo)">' +
      '<div class="mp-painel mp-topo">' + cabecalho('Fotos', 'Para contemplar. Clique numa foto para ver grande, com a legenda.') + '</div>' +
      '<div class="mp-fotos">' + F.map((f, i) => '<button type="button" class="mp-foto foco' + (i % 5 === 0 ? ' alta' : '') + '" data-foto="' + i + '" aria-label="Abrir foto: ' + escHTML(f.legenda) + '">' +
        arte(f.arte) + '<span class="mp-legenda">' + escHTML(f.legenda) + '</span></button>').join('') + '</div></section>';
    raiz.querySelectorAll('[data-foto]').forEach((b) => b.addEventListener('click', () => abrirFoto(+b.dataset.foto, b)));
    depois();
  }
  function abrirFoto(i, origem) {
    const F = MOCK_PESSOAL.fotos, n = F.length;
    const pintar = (k) => {
      i = (k + n) % n;
      corpo.innerHTML = '<figure class="mp-foto-grande">' + arte(F[i].arte) + carimboMock('canto') + '</figure>' +
        '<figcaption class="mp-cap"><span>' + escHTML(F[i].legenda) + '</span><small>' + (i + 1) + ' de ' + n + '</small></figcaption>';
      ajustarCarimbos(corpo);
    };
    const corpo = abrirModal('Foto (exemplo)', 'mp-modal-foto', origem, (e) => {
      if (e.key === 'ArrowLeft') pintar(i - 1);
      if (e.key === 'ArrowRight') pintar(i + 1);
    }, '<button type="button" class="mp-seta mp-ant foco" aria-label="Foto anterior">' + SETA(-1) + '</button><button type="button" class="mp-seta mp-prox foco" aria-label="Próxima foto">' + SETA(1) + '</button>');
    E.modal.querySelector('.mp-ant').addEventListener('click', () => pintar(i - 1));
    E.modal.querySelector('.mp-prox').addEventListener('click', () => pintar(i + 1));
    pintar(i);
  }

  // ---------- Vídeos ----------
  function videos() {
    const V = MOCK_PESSOAL.videos;
    raiz.innerHTML = '<section class="mp-sec mp-larga" aria-label="Vídeos (exemplo)">' +
      '<div class="mp-painel mp-topo">' + cabecalho('Vídeos', 'Vídeos curtos, com frases que explicam o que aparece.') + '</div>' +
      '<div class="mp-videos">' + V.map((v, i) => '<button type="button" class="mp-video foco" data-video="' + i + '" aria-label="Assistir: ' + escHTML(v.titulo) + '">' +
        '<span class="mp-thumb">' + arte(v.arte) + '<span class="mp-play">' + PLAY + '</span><span class="mp-dur">' + escHTML(v.duracao) + '</span></span>' +
        '<span class="mp-vtxt"><strong>' + escHTML(v.titulo) + '</strong><small>' + escHTML(v.texto) + '</small></span></button>').join('') + '</div></section>';
    raiz.querySelectorAll('[data-video]').forEach((b) => b.addEventListener('click', () => abrirVideo(+b.dataset.video, b)));
    depois();
  }
  // "Player" de mentira: a barra anda no tempo do vídeo e as frases curtas vão se revezando por cima da imagem
  function abrirVideo(i, origem) {
    const v = MOCK_PESSOAL.videos[i], total = segundos(v.duracao);
    const corpo = abrirModal(v.titulo + ' (exemplo)', 'mp-modal-video', origem, (e) => { if (e.key === ' ' && e.target === document.body) { e.preventDefault(); alternar(); } });
    corpo.innerHTML = '<div class="mp-tela">' + arte(v.arte) + carimboMock('canto') + '<p class="mp-fala" aria-live="polite"></p>' +
      '<button type="button" class="mp-play-grande foco" aria-label="Tocar">' + PLAY + '</button></div>' +
      '<div class="mp-controles"><button type="button" class="mp-tocar foco" aria-label="Tocar">' + PLAY + '</button>' +
      '<div class="mp-barra" aria-hidden="true"><i></i></div><span class="mp-tempo">0:00 / ' + relogio(total) + '</span></div>' +
      '<div class="mp-vinfo"><strong>' + escHTML(v.titulo) + '</strong><p>' + escHTML(v.texto) + '</p><small>Vídeo de mentira: a barra anda e as frases mudam para mostrar como as legendas curtas apareceriam.</small></div>';
    ajustarCarimbos(corpo);
    const tela = corpo.querySelector('.mp-tela'), fala = corpo.querySelector('.mp-fala'), barra = corpo.querySelector('.mp-barra i'),
      tempo = corpo.querySelector('.mp-tempo'), botoes = corpo.querySelectorAll('.mp-tocar, .mp-play-grande');
    let pos = 0, tocando = false, ultimo = 0;
    const pintar = () => {
      barra.style.width = (pos / total * 100).toFixed(2) + '%';
      tempo.textContent = relogio(pos) + ' / ' + relogio(total);
      const k = Math.min(v.falas.length - 1, Math.floor(pos / total * v.falas.length));
      const txt = pos > 0 ? v.falas[k] : '';
      if (fala.textContent !== txt) fala.textContent = txt;
      tela.classList.toggle('tocando', tocando);
      botoes.forEach((b) => { b.innerHTML = tocando ? PAUSA : PLAY; b.setAttribute('aria-label', tocando ? 'Pausar' : 'Tocar'); });
    };
    const quadro = (t) => {
      if (!tocando) return;
      pos = Math.min(total, pos + (ultimo ? (t - ultimo) / 1000 : 0)); ultimo = t;
      if (pos >= total) { tocando = false; pintar(); pos = 0; return; }
      pintar(); E.raf = requestAnimationFrame(quadro);
    };
    const alternar = () => { tocando = !tocando; ultimo = 0; pintar(); if (tocando) E.raf = requestAnimationFrame(quadro); else cancelAnimationFrame(E.raf); };
    botoes.forEach((b) => b.addEventListener('click', alternar));
    pintar();
  }

  // ---------- Mensagens (material do pastor) ----------
  function mensagens() {
    const M = MOCK_RELIGIOSO.mensagens;
    raiz.innerHTML = '<section class="mp-sec mp-larga" aria-label="Mensagens (exemplo)">' +
      '<div class="mp-painel mp-topo">' + cabecalho('Mensagens', 'Pregações organizadas em séries: ouvir e ver o esboço de cada uma.') + '</div>' +
      M.map((s, si) => '<article class="mp-serie">' +
        '<div class="mp-serie-img">' + arte(s.arte) + '</div>' +
        '<div class="mp-serie-corpo"><h3>' + escHTML(s.serie) + '</h3><p>' + escHTML(s.descricao) + '</p>' +
        '<small class="mp-qtd">' + s.itens.length + (s.itens.length > 1 ? ' mensagens' : ' mensagem') + '</small>' +
        '<ol class="mp-msgs">' + s.itens.map((m, mi) => '<li>' +
          '<div class="mp-msg-txt"><strong>' + escHTML(m.titulo) + '</strong><small>' + escHTML(m.ref) + ' · ' + escHTML(m.data) + ' · ' + escHTML(m.duracao) + '</small></div>' +
          '<div class="mp-msg-acoes"><button type="button" class="mp-acao foco" data-ouvir="' + si + '-' + mi + '" aria-pressed="false">' + PLAY + '<span>Ouvir</span></button>' +
          '<button type="button" class="mp-acao foco" data-esboco="' + si + '-' + mi + '">' + ICONES.novidades + '<span>Esboço</span></button></div>' +
          '<div class="mp-audio" hidden><div class="mp-barra"><i></i></div><span class="mp-tempo">0:00</span></div></li>').join('') + '</ol>' +
        '</div>' + carimboMock('canto') + '</article>').join('') +
      '</section>';
    raiz.querySelectorAll('[data-ouvir]').forEach((b) => b.addEventListener('click', () => ouvir(b)));
    raiz.querySelectorAll('[data-esboco]').forEach((b) => b.addEventListener('click', () => {
      const [si, mi] = b.dataset.esboco.split('-').map(Number), m = M[si].itens[mi];
      const corpo = abrirModal('Esboço (exemplo)', 'mp-modal-esboco', b);
      corpo.innerHTML = '<div class="mp-esboco">' + carimboMock() + '<div class="mp-esb-serie">' + escHTML(M[si].serie) + '</div>' +
        '<h3>' + escHTML(m.titulo) + '</h3><p class="mp-esb-ref">Texto base: ' + escHTML(m.ref) + '</p>' +
        '<ol>' + MOCK_RELIGIOSO.esboco.map(([t, d]) => '<li><strong>' + escHTML(t) + '</strong><span>' + escHTML(d) + '</span></li>').join('') + '</ol>' +
        '<button type="button" class="mp-acao foco" disabled title="Exemplo: o PDF ainda não existe">' + ICONES.novidades + '<span>Baixar PDF [arquivo]</span></button></div>';
      ajustarCarimbos(corpo);
    }));
    depois();
  }
  // Áudio de mentira: só uma mensagem toca por vez; a barra anda ~1 s real = 1 min, para mostrar o movimento
  function ouvir(b) {
    const li = b.closest('li'), caixa = li.querySelector('.mp-audio'), barra = caixa.querySelector('i'), tempo = caixa.querySelector('.mp-tempo');
    const mesmo = E.audio && E.audio.b === b;
    pararAudio();
    if (mesmo) return;
    caixa.hidden = false; b.setAttribute('aria-pressed', 'true'); b.classList.add('on'); b.querySelector('span').textContent = 'Pausar';
    b.querySelector('svg').outerHTML = PAUSA;
    const a = { b, caixa, pos: 0, ultimo: 0 }; E.audio = a;
    const quadro = (t) => {
      if (E.audio !== a) return;
      a.pos = (a.pos + (a.ultimo ? (t - a.ultimo) / 1000 : 0)) % 40; a.ultimo = t;
      barra.style.width = (a.pos / 40 * 100).toFixed(2) + '%';
      tempo.textContent = Math.floor(a.pos) + ':00';
      E.raf = requestAnimationFrame(quadro);
    };
    E.raf = requestAnimationFrame(quadro);
  }
  function pararAudio() {
    const a = E.audio; if (!a) return;
    E.audio = null; cancelAnimationFrame(E.raf);
    a.b.setAttribute('aria-pressed', 'false'); a.b.classList.remove('on'); a.b.querySelector('span').textContent = 'Ouvir';
    a.b.querySelector('svg').outerHTML = PLAY;
  }

  // ---------- Janela por cima (foto, vídeo, esboço) ----------
  function abrirModal(rotulo, classe, origem, teclas, extra) {
    fecharModal();
    const m = document.createElement('div');
    m.className = 'mp-modal ' + classe;
    m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); m.setAttribute('aria-label', rotulo);
    m.innerHTML = '<div class="mp-modal-fundo" data-fechar></div><div class="mp-modal-caixa"><button type="button" class="mp-fechar foco" data-fechar aria-label="Fechar">' + X_SVG + '</button>' +
      '<div class="mp-modal-corpo"></div>' + (extra || '') + '</div>';
    document.body.append(m);
    document.documentElement.classList.add('mp-travado');
    E.modal = m; E.voltarFoco = origem || null;
    m.querySelectorAll('[data-fechar]').forEach((b) => b.addEventListener('click', fecharModal));
    m._teclas = (e) => { if (e.key === 'Escape') fecharModal(); else if (teclas) teclas(e); };
    document.addEventListener('keydown', m._teclas);
    requestAnimationFrame(() => { m.classList.add('on'); m.querySelector('.mp-fechar').focus({ preventScroll: true }); });
    return m.querySelector('.mp-modal-corpo');
  }
  function fecharModal() {
    const m = E.modal; if (!m) return;
    E.modal = null; cancelAnimationFrame(E.raf);
    document.removeEventListener('keydown', m._teclas);
    document.documentElement.classList.remove('mp-travado');
    m.remove();
    if (E.voltarFoco && document.contains(E.voltarFoco)) E.voltarFoco.focus({ preventScroll: true });
    E.voltarFoco = null;
  }

  // Ao sair do capítulo (ou trocar de perfil): fecha janelas e para os "players"
  function parar() { fecharModal(); pararAudio(); cancelAnimationFrame(E.raf); cap = null; }

  return { montar, parar };
})();
