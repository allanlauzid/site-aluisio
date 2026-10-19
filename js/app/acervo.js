// COMPORTAMENTO — botão Acervo: ao rolar, a estante entra da direita para a esquerda, na frente do Aluísio (conteúdo em js/conteudo/acervo.js).
// Cada item do conteúdo vira um livro na prateleira (é só acrescentar um item que o livro aparece).
// Clicar num livro: ele sai da estante em 3D, vira mostrando a capa, vai para o centro e cresce para ler o título.
// Clicar nele abre a capa e mergulha na página (janela de tela inteira). Ao fechar, o livro volta para o mesmo lugar. Com "reduzir movimento", a janela só aparece.
const Acervo = (() => {
  const VOO = { puxar: 300, virar: 640, abrir: 300 };   // ms de cada parte da animação do livro
  const PERSP = 1400;                                    // profundidade da cena 3D (px)
  const PLAY = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>';
  let lista = [];

  const lombadaHTML = (it) => '<span class="livro-lombada"><span class="livro-faixa"></span><span class="livro-tit">' + escHTML(it.titulo) + '</span><span class="livro-faixa baixo"></span></span>';
  const capaHTML = (it, grupo) => '<span class="capa-faixa"></span><span class="capa-grupo">' + escHTML(grupo) + '</span>' +
    '<span class="capa-tit">' + escHTML(it.titulo) + '</span><span class="capa-sub">' + escHTML(it.sub || '') + '</span>' +
    (it.mock ? carimboMock('capa') : '') + '<span class="capa-faixa baixo"></span>';

  function livroHTML(it, grupo, n) {
    lista.push({ it, grupo });
    const alt = 70 + ((n * 37) % 23), larg = 42 + ((n * 13) % 20);
    return '<button type="button" class="livro foco tom' + (n % 4) + '" data-livro="' + (lista.length - 1) + '" style="--alt:' + alt + ';--larg:' + larg + 'px"' +
      ' aria-label="' + escHTML(it.titulo + (it.sub ? ' — ' + it.sub : '')) + (it.mock ? ' (mock)' : '') + '">' +
      lombadaHTML(it) + (it.mock ? carimboMock('mini') : '') + '</button>';
  }

  function montar() {
    lista = [];
    let n = 0;
    const camada = document.createElement('div');
    camada.className = 'cam-camada acv-camada';
    camada.innerHTML = '<div class="cam-area estante">' + ACERVO.map((linha, k) =>
      '<div class="estante-linha">' + roloHTML('estante-trilho', linha.map((g) =>
        '<div class="grupo"><span class="grupo-nome">' + escHTML(g.nome) + '</span><div class="grupo-livros">' +
        g.itens.map((it) => livroHTML(it, g.nome, n++)).join('') + '</div></div>').join(''), 'na prateleira ' + (k + 1)) +
      '</div>').join('') + '</div>';
    Camera.iniciar({ camada, modo: 'deslizar', aoParar: () => { Janela.fechar(true); soltarLivro(); } });
    camada.querySelectorAll('[data-rolo]').forEach(ligarRolo);
    camada.querySelectorAll('[data-livro]').forEach((b) => b.addEventListener('click', () => abrir(b)));
    ajustarCarimbos(camada);
  }

  // ---------- Livro 3D ----------
  // O livro é uma caixa: capa (largura W) na frente, lombada (largura S) na lateral esquerda.
  // 1) clique na lombada: o livro sai da estante, gira mostrando a capa e vai para o centro da tela;
  // 2) lá ele cresce um pouco (para ler o título) e espera. Clicar fora ou Esc devolve o livro à estante;
  // 3) clique no livro: a capa abre, a câmera mergulha na página em branco e o conteúdo aparece em tela inteira.
  let V = null;   // livro fora da estante: { botao, it, grupo, palco, el, k, ... }
  const T = (x, y, z, rot, esc) => 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px) rotateY(' + rot + 'deg) scale(' + esc + ')';

  function criarVoo(botao, it, grupo) {
    const r = botao.getBoundingClientRect(), S = r.width, H = r.height, W = Math.round(H * 0.72);
    const palco = document.createElement('div');
    palco.className = 'voo-palco';
    palco.style.perspective = PERSP + 'px';
    palco.innerHTML = '<div class="voo-fundo"></div>' +
      '<div class="voo-livro" role="button" tabindex="-1" aria-label="Abrir: ' + escHTML(it.titulo) + '" style="width:' + W + 'px;height:' + H + 'px">' +
      '<div class="voo-face voo-pagina" style="transform:translateZ(' + (S / 2 - 1) + 'px)"><span></span><span></span><span></span><span></span></div>' +
      '<div class="voo-capa-gira" style="transform:translateZ(' + S / 2 + 'px)">' +
        '<div class="voo-face voo-capa">' + capaHTML(it, grupo) + '</div><div class="voo-face voo-capa-dentro"></div></div>' +
      '<div class="voo-face voo-verso" style="transform:rotateY(180deg) translateZ(' + S / 2 + 'px)"></div>' +
      '<div class="voo-face voo-lado" style="width:' + S + 'px;left:' + (W - S) / 2 + 'px;transform:rotateY(-90deg) translateZ(' + W / 2 + 'px)">' + botao.querySelector('.livro-lombada').outerHTML + '</div>' +
      '<div class="voo-face voo-folhas" style="width:' + S + 'px;left:' + (W - S) / 2 + 'px;transform:rotateY(90deg) translateZ(' + W / 2 + 'px)"></div></div>' +
      '<div class="voo-dica" aria-hidden="true">Clique no livro para abrir</div>' +
      '<button type="button" class="voo-voltar foco">' + ICONES.voltar + 'Voltar à estante</button>';
    document.body.append(palco);
    ajustarCarimbos(palco);
    const x0 = r.left + S / 2 - W / 2, y0 = r.top, cx = innerWidth / 2 - W / 2, cy = innerHeight / 2 - H / 2;
    const ler = Math.min(innerHeight * 0.56, 440, innerWidth * 0.62 / 0.72) / H;           // tamanho para ler o título
    const encher = Math.max(innerWidth / W, innerHeight / H) * 1.12;                       // página em branco ocupa a tela
    return {
      botao, it, grupo, palco, el: palco.querySelector('.voo-livro'), capa: palco.querySelector('.voo-capa-gira'), S,
      k: {
        estante: T(x0, y0, 0, 90, 1), fora: T(x0, y0 - 18, 140, 90, 1),
        centro: T(cx, cy, 0, 0, ler * 0.84), ler: T(cx, cy, 0, 0, ler), dentro: T(cx, cy, 0, 0, encher)
      }
    };
  }

  function abrir(botao) {
    if (V) return;
    const { it, grupo } = lista[+botao.dataset.livro];
    if (SEM_MOVIMENTO) { abrirJanela(it, grupo, botao); return; }
    V = criarVoo(botao, it, grupo);
    const v = V;
    botao.style.visibility = 'hidden';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => v.palco.classList.add('claro'));
    const total = VOO.puxar + VOO.virar;
    v.el.animate([
      { transform: v.k.estante, easing: 'cubic-bezier(.3,0,.4,1)' },
      { transform: v.k.fora, offset: VOO.puxar / total, easing: 'cubic-bezier(.45,0,.2,1)' },
      { transform: v.k.centro }
    ], { duration: total, fill: 'forwards' }).finished.then(() => {
      if (V !== v) return;
      return v.el.animate([{ transform: v.k.centro }, { transform: v.k.ler }], { duration: 380, easing: 'cubic-bezier(.2,.8,.3,1)', fill: 'forwards' }).finished;
    }).then(() => {
      if (V !== v) return;
      v.palco.classList.add('parado');
      v.el.tabIndex = 0;
      v.el.focus({ preventScroll: true });
      v.el.addEventListener('click', (e) => { e.stopPropagation(); entrar(v); });
      v.el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); entrar(v); } });
      v.palco.querySelector('.voo-fundo').addEventListener('click', () => devolver(v, v.k.ler));
      v.palco.querySelector('.voo-voltar').addEventListener('click', () => devolver(v, v.k.ler));
      document.addEventListener('keydown', esc);
    });
  }
  function esc(e) { if (e.key === 'Escape' && V && V.palco.classList.contains('parado')) devolver(V, V.k.ler); }

  // Clique no livro do centro: a capa abre e a câmera mergulha na página em branco
  function entrar(v) {
    if (!v.palco.classList.contains('parado')) return;
    v.palco.classList.remove('parado');
    document.removeEventListener('keydown', esc);
    v.capa.animate([{ transform: 'translateZ(' + v.S / 2 + 'px) rotateY(0deg)' }, { transform: 'translateZ(' + v.S / 2 + 'px) rotateY(-165deg)' }],
      { duration: 620, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).finished.then(() => {
      if (V !== v) return;
      return v.el.animate([{ transform: v.k.ler }, { transform: v.k.dentro }], { duration: 520, easing: 'cubic-bezier(.6,0,.9,.5)', fill: 'forwards' }).finished;
    }).then(() => {
      if (V !== v) return;
      abrirJanela(v.it, v.grupo, v.botao);
      v.palco.classList.add('escondido');
    });
  }

  // Ao fechar a página: a câmera sai da página, a capa fecha e o livro volta para a estante
  function sair(v) {
    document.body.style.overflow = 'hidden';
    v.palco.classList.remove('escondido');
    v.el.animate([{ transform: v.k.dentro }, { transform: v.k.ler }], { duration: 480, easing: 'cubic-bezier(.1,.5,.4,1)', fill: 'forwards' }).finished.then(() => {
      if (V !== v) return;
      return v.capa.animate([{ transform: 'translateZ(' + v.S / 2 + 'px) rotateY(-165deg)' }, { transform: 'translateZ(' + v.S / 2 + 'px) rotateY(0deg)' }],
        { duration: 480, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }).finished;
    }).then(() => { if (V === v) devolver(v, v.k.ler); });
  }

  function devolver(v, de) {
    v.palco.classList.remove('parado', 'claro');
    document.removeEventListener('keydown', esc);
    const r = v.botao.getBoundingClientRect(), x0 = r.left + v.S / 2 - parseFloat(v.el.style.width) / 2;
    const estante = T(x0, r.top, 0, 90, 1), fora = T(x0, r.top - 18, 140, 90, 1);
    const total = VOO.puxar + VOO.virar;
    v.el.animate([
      { transform: de, easing: 'cubic-bezier(.45,0,.2,1)' },
      { transform: fora, offset: VOO.virar / total, easing: 'cubic-bezier(.4,0,.7,1)' },
      { transform: estante }
    ], { duration: total, fill: 'forwards' }).finished.then(() => { if (V === v) soltarLivro(); });
  }

  // Tira o livro da cena e devolve a página ao normal (também chamado ao trocar de capítulo)
  function soltarLivro() {
    document.removeEventListener('keydown', esc);
    if (!V) return;
    const v = V;
    V = null;
    v.palco.remove();
    document.body.style.overflow = '';
    v.botao.style.visibility = '';
    if (v.botao.isConnected) v.botao.focus({ preventScroll: true });
  }

  // ---------- Livro aberto (janela de tela inteira) ----------
  function abrirJanela(it, grupo, botao) {
    let h = '<div class="livro-topo"><span class="livro-meta">' + escHTML(grupo) + (it.sub ? ' · ' + escHTML(it.sub) : '') + '</span>' + (it.mock ? carimboMock() : '') + '</div>' +
      '<h2 id="janela-titulo">' + escHTML(it.titulo) + '</h2>' + avisosHTML(it.avisos);
    const c = it.curso ? CURSOS.find((x) => x.id === it.curso) : null;
    if (c) {
      h += '<p class="livro-desc">' + escHTML(c.descricao) + '</p>' + avisosHTML(c.avisos) +
        '<div class="livro-player" hidden></div>' +
        '<h3>Aulas do Prof. Aluísio</h3><ol class="livro-aulas">' + c.aulas.map((a) =>
          '<li><button type="button" class="livro-aula foco" data-v="' + escHTML(a[1]) + '" data-t="' + escHTML(a[0]) + '">' + PLAY + '<span>' + escHTML(a[0]) + '</span></button></li>').join('') + '</ol>';
    } else {
      h += (it.texto || []).map((t) => '<p>' + escHTML(t) + '</p>').join('');
    }
    if (it.link) h += '<p><a class="livro-link foco" href="' + escHTML(it.link.url) + '" target="_blank" rel="noopener noreferrer">' + escHTML(it.link.rotulo) + ICONES.seta + '</a></p>';
    const d = Janela.abrir(h, { classe: 'livro-janela', retorno: botao, aoFechar: () => { if (V) sair(V); else if (botao.isConnected) botao.focus({ preventScroll: true }); } });
    d.querySelectorAll('.livro-aula').forEach((b) => b.addEventListener('click', () => tocar(d, b)));
  }
  // O vídeo só é carregado quando a pessoa clica numa aula (um player só, no topo da lista)
  function tocar(d, b) {
    const id = b.dataset.v, p = d.querySelector('.livro-player');
    d.querySelectorAll('.livro-aula').forEach((x) => x.classList.toggle('on', x === b));
    p.hidden = false;
    p.innerHTML = '<div class="livro-video"><iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0" title="' + escHTML(b.dataset.t) + '"' +
      ' allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>' +
      '<div class="livro-video-rodape"><strong>' + escHTML(b.dataset.t) + '</strong>' +
      '<a class="livro-link foco" href="https://www.youtube.com/watch?v=' + encodeURIComponent(id) + '" target="_blank" rel="noopener noreferrer">Assistir no YouTube' + ICONES.seta + '</a></div>' +
      '<p class="livro-nota">Se o vídeo não abrir aqui (pode acontecer quando o site é aberto direto do computador), use "Assistir no YouTube".</p>';
    p.scrollIntoView({ block: 'start', behavior: SEM_MOVIMENTO ? 'auto' : 'smooth' });
  }
  return { montar };
})();
