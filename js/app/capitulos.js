// COMPORTAMENTO — como o site reage (não contém textos do site).
// Capítulos: itens, letreiro, ilustração de fundo, feed, seleção

// ---------- Capítulos ----------
function itemInfo(it, i) {
  if (it.fig) {
    return '<div class="info-item fig" style="transition-delay:' + (i * 110) + 'ms" data-atraso="' + (i * 110) + '">' +
      '<div class="info-fig" aria-hidden="true">' + svg(FIG[it.fig]) + '</div>' +
      '<div class="info-txt"><div class="info-big letreiro" data-palavra="' + it.big + '"><span class="sr">' + it.big + '</span><span class="giro" aria-hidden="true"></span></div>' +
      '<div class="info-cap">' + (it.cap || '') + '</div></div></div>';
  }
  const corpo = it.contato
    ? (it.link
      ? '<a class="contato-btn foco" href="' + it.link + '" target="_blank" rel="noopener noreferrer">' + ICONES[it.contato] + it.big + '</a>'
      : '<button type="button" class="contato-btn foco">' + ICONES[it.contato] + it.big + '</button>')
    : '<div class="info-big">' + it.big + '</div><div class="info-cap">' + (it.cap || '') + '</div>';
  return '<div class="info-item" style="transition-delay:' + (i * 110) + 'ms">' + corpo + '</div>';
}

// Letreiro de aeroporto (só as letras): cada letra gira por caracteres sorteados e para na certa, da esquerda para a direita
const SEM_MOVIMENTO = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÇÃÁÉÍÓÚÊ0123456789';
let tLetreiro = [];
function pararLetreiros() { tLetreiro.forEach((t) => { clearTimeout(t); clearInterval(t); }); tLetreiro = []; }
function letreiro(item) {
  const alvo = item.querySelector('.giro'), palavra = item.querySelector('.letreiro').dataset.palavra;
  const atraso = +item.dataset.atraso || 0;
  // 19/10: o espaço entre palavras não gira e permite quebrar a linha (ex.: MATERIAL DIDÁTICO no celular)
  alvo.innerHTML = '<span class="pal">' + Array.from(palavra).map((l) => l === ' ' ? '</span><span class="ch esp"> </span><span class="pal">' : '<span class="ch">&nbsp;</span>').join('') + '</span>';
  const chs = alvo.querySelectorAll('.ch');
  if (SEM_MOVIMENTO) { Array.from(palavra).forEach((l, k) => { chs[k].textContent = l; }); item.classList.add('pronto'); return; }
  Array.from(palavra).forEach((l, k) => {
    if (l === ' ') { if (k === palavra.length - 1) tLetreiro.push(setTimeout(() => item.classList.add('pronto'), atraso + 380 + k * 60)); return; }
    tLetreiro.push(setTimeout(() => {
      const roda = setInterval(() => { chs[k].textContent = LETRAS[Math.floor(Math.random() * LETRAS.length)]; chs[k].classList.add('gira'); }, 45);
      tLetreiro.push(roda);
      tLetreiro.push(setTimeout(() => {
        clearInterval(roda); chs[k].textContent = l; chs[k].classList.remove('gira');
        if (k === palavra.length - 1) item.classList.add('pronto');
      }, 260 + k * 60));
    }, atraso + 120));
  });
}

// Ilustração de fundo do capítulo: troca com um esmaecer curto
let fundoVez = 0;
function trocarFundo(c) {
  const f = $('fundo-cap'), vez = ++fundoVez;
  const estava = f.classList.contains('on');
  f.classList.remove('on');
  if (!c || !c.fundo) return;
  setTimeout(() => {
    if (vez !== fundoVez) return;
    f.innerHTML = '<svg viewBox="0 0 680 440" preserveAspectRatio="xMidYMid meet">' + CENAS[c.fundo]() + '</svg>';
    requestAnimationFrame(() => f.classList.add('on'));
  }, estava ? 300 : 0);
}

function montarCapitulo() {
  Trajetoria.parar();
  Camera.parar();
  MocksPerfis.parar();
  const c = S.ativo ? CAPITULOS[S.ativo] : null;
  pararLetreiros();
  trocarFundo(c);
  const comFig = !!(c && c.esq.concat(c.dir).some((it) => it.fig));
  $('info-esq').classList.toggle('com-fig', comFig);
  $('info-dir').classList.toggle('com-fig', comFig);
  // 19/10: capítulo com 6 itens (3 de cada lado) — no celular viram 2 linhas de 3
  const seis = !!(c && c.esq.length > 2);
  $('info-esq').classList.toggle('seis', seis); $('info-dir').classList.toggle('seis', seis);
  document.body.classList.toggle('cap-seis', seis);
  const orbita = !!(c && c.orbita);
  $('info-esq').innerHTML = c && !orbita ? c.esq.map((it, i) => itemInfo(it, i)).join('') : '';
  $('info-dir').innerHTML = c && !orbita ? c.dir.map((it, i) => itemInfo(it, i + 1)).join('') : '';
  if (orbita) montarOrbita(c.esq.concat(c.dir)); else pararOrbita();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.querySelectorAll('.info-item').forEach((el) => el.classList.add('on'));
    document.querySelectorAll('.info-item.fig').forEach(letreiro);
  }));
  const cont = $('conteudo');
  if (!c) { cont.innerHTML = ''; return; }
  if (c.feed) { montarFeed(); return; }
  if (S.ativo === 'trajetoria') { Trajetoria.montar(); return; }
  if (S.ativo === 'projetos') { Projetos.montar(); return; }
  if (S.ativo === 'acervo') { Acervo.montar(); return; }
  if (c.mock) { MocksPerfis.montar(c); return; }  // 19/10: telas de exemplo dos perfis Pessoal e Religioso
  if (!c.marcador) { cont.innerHTML = '<section class="marcador-sec" aria-hidden="true"></section>'; return; }
  const linhas = c.marcador[2] || [];
  cont.innerHTML = '<section class="marcador-sec"><div class="marcador"><div class="marcador-tit">' + c.marcador[0] + '</div><p>' + c.marcador[1] + '</p>' +
    (linhas.length ? '<ul class="marcador-linhas">' + linhas.map((l) => '<li' + (l.aviso ? ' class="pendente"' : '') + '><strong>' + l.ano + '</strong> ' + l.texto +
      (l.aviso ? '<span class="aviso">' + l.aviso + '</span>' : '') + '</li>').join('') + '</ul>' : '') +
    '</div></section>';
}
function montarFeed() {
  const tags = [];
  POSTS.forEach((p) => p.tags.forEach((t) => { if (tags.indexOf(t) < 0) tags.push(t); }));
  const lista = S.filtro === 'Todas' ? POSTS : POSTS.filter((p) => p.tags.indexOf(S.filtro) >= 0);
  // 19/10: filtros numa faixa preta de 1 linha + botão Menu (todas as opções); a faixa trava embaixo da tela (js/app/filtros.js)
  const chips = ['Todas'].concat(tags).map((t) => '<button type="button" class="chip foco' + (S.filtro === t ? ' on' : '') + '" aria-pressed="' + (S.filtro === t) + '" data-tag="' + t + '">' + t + '</button>').join('');
  $('conteudo').innerHTML =
    '<section class="feed feed-nov" aria-label="Feed de novidades">' +
    filtrosHTML(chips, 'Filtrar por atuação') +
    lista.map((p) =>
      '<article class="card' + (S.destaque === p.id ? ' destaque' : '') + '" id="post-' + p.id + '">' +
      '<div class="card-img" aria-hidden="true">' + imagemPost(p) + '</div>' +
      '<div class="card-corpo"><div class="card-meta">' + p.tags.map((t) => '<span class="tag">' + t + '</span>').join('') +
      '<span class="data">' + p.data + '</span></div>' +
      '<h2>' + p.titulo + '</h2><p>' + p.resumo + '</p>' + avisosPost(p) +
      (p.paragrafos ? '<div><button type="button" class="link-btn foco" data-post="' + p.id + '">Ler completo' + ICONES.seta + '</button></div>' : '') +
      '</div></article>').join('') +
    '<div class="feed-fim" aria-hidden="true"></div></section>';
  ligarFiltros($('conteudo').querySelector('.filtros-nov'));
  $('conteudo').querySelectorAll('.chip').forEach((b) => b.addEventListener('click', () => { S.filtro = b.dataset.tag; S.destaque = null; montarFeed(); }));
  $('conteudo').querySelectorAll('[data-post]').forEach((b) => b.addEventListener('click', () => abrirPost(b.dataset.post)));
}
// 19/10: ao trocar de capítulo com a página rolada, o conteúdo de baixo some e a página volta ao topo num salto.
// Como o palco fica preso na tela, o salto não aparece: vê-se só o Aluísio e o fundo mudando.
// O conteúdo do capítulo novo fica abaixo da tela e só aparece quando a pessoa rolar.
function voltarAoTopoSemMostrar() {
  if (window.scrollY <= 0) return;
  const c = $('conteudo');
  c.style.visibility = 'hidden';
  window.scrollTo(0, 0);
  S.rolou = false;
  requestAnimationFrame(() => requestAnimationFrame(() => { c.style.visibility = ''; }));
}
function selecionar(id) {
  fecharLeque();
  clearTimeout(tBaloes);
  S.baloes = false;
  document.body.classList.add('discreto');
  const vindoDoPost = S.tela === 'post';
  if (vindoDoPost) S.tela = 'palco';
  if (S.ativo === id && !vindoDoPost) { irInicio(); return; }
  if (vindoDoPost) window.scrollTo(0, 0);
  else voltarAoTopoSemMostrar();
  S.ativo = id; S.destaque = null; S.filtro = 'Todas';
  adiarIndicador();
  montarCapitulo(); atualizar();
}
function irInicio() {
  fecharLeque();
  clearTimeout(tBaloes);
  S.tela = 'palco';
  S.ativo = null; S.baloes = false; S.destaque = null;
  document.body.classList.add('discreto');
  voltarAoTopoSemMostrar();
  montarCapitulo(); atualizar();
}
$('inicio').addEventListener('click', irInicio);
function irParaPost(id) {
  selecionar('novidades');
  S.destaque = id; montarFeed();
  setTimeout(() => {
    const el = $('post-' + id);
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, 120);
}
