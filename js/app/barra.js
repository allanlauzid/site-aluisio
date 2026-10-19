// COMPORTAMENTO — como o site reage (não contém textos do site).
// Barra de baixo: montar, marcar, esconder e mostrar

// ---------- Barra ----------
function montarBarra() {
  const nav = $('barra');
  nav.setAttribute('aria-label', 'Navegação do perfil ' + NOMES[S.perfil]);
  nav.innerHTML = BARRAS[S.perfil].map((id) => {
    const c = CAPITULOS[id];
    return '<button type="button" class="barra-btn" data-cap="' + id + '" aria-pressed="false" aria-label="' + c.label + '">' +
      ICONES[c.icone || id] + '<span class="rotulo">' + c.label + '</span>' +
      (id === 'novidades' ? '<span class="ponto" hidden aria-hidden="true"></span>' : '') + '</button>';
  }).join('');
  nav.querySelectorAll('.barra-btn').forEach((b) => {
    b.addEventListener('click', () => selecionar(b.dataset.cap));
  });
  atualizarBarra();
}
function atualizarBarra() {
  $('barra').querySelectorAll('.barra-btn').forEach((b) => {
    const on = S.ativo === b.dataset.cap;
    b.classList.toggle('ativo', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (b.dataset.cap === 'novidades') {
      const luz = lequeVisivel();
      b.classList.toggle('pulsa', S.pulso && !luz);
      b.classList.toggle('brilho', luz);
      const p = b.querySelector('.ponto');
      if (p) p.hidden = !(S.ponto && !S.aberto && !S.ativo);
    }
  });
  const ini = $('inicio');
  ini.classList.toggle('ativo', !S.ativo);
  ini.setAttribute('aria-pressed', S.ativo ? 'false' : 'true');
  $('aba-topo').classList.toggle('cor-inicio-ativo', !S.ativo);
}

// ---------- Esconder / mostrar a barra ----------
function posicaoBarra() {
  const w = $('wrap');
  if (!S.barraOculta) { w.style.transform = 'translate(-50%, 50%)'; return; }
  // Desce o conjunto até sobrar só a aba de cima, encostada na base da tela
  const H = window.innerHeight;
  const pct = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--barra')) / 100 || 0.2;
  const h = w.offsetHeight;
  const aba = $('aba-topo').offsetHeight;
  const topoEmRepouso = (1 - pct) * H - h / 2;
  const desce = H - (topoEmRepouso + aba);
  w.style.transform = 'translate(-50%, ' + (h / 2 + desce) + 'px)';
}
function alternarBarra() {
  if (S.animandoBarra) return;
  S.animandoBarra = true;
  S.barraOculta = !S.barraOculta;
  if (S.barraOculta) fecharLeque();
  const aba = $('aba-topo');
  aba.setAttribute('aria-expanded', S.barraOculta ? 'false' : 'true');
  aba.setAttribute('aria-label', S.barraOculta ? 'Mostrar a barra' : 'Esconder a barra');
  $('barra').querySelectorAll('button').forEach((b) => { b.tabIndex = S.barraOculta ? -1 : 0; });
  $('inicio').tabIndex = S.barraOculta ? -1 : 0;
  posicaoBarra();
  atualizarLeque();
  // A seta só gira depois que o movimento termina
  setTimeout(() => { aba.classList.toggle('cima', S.barraOculta); S.animandoBarra = false; }, 560);
}
$('aba-topo').addEventListener('click', () => { S.mexeuBarra = true; alternarBarra(); });
window.addEventListener('resize', () => { if (S.barraOculta) posicaoBarra(); });

// 19/10: rolar a página para baixo esconde a barra (mesma animação da seta); ao voltar ao topo, ela reaparece
// (só se foi escondida pela rolagem — se a pessoa escondeu pela seta, continua escondida).
// Se a pessoa reabrir a barra pela seta enquanto rola, ela fica aberta até voltar ao topo e rolar de novo.
let barraEscondidaPelaRolagem = false, rolagemJaEscondeu = false;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 40) {
    if (!rolagemJaEscondeu && !S.barraOculta && !S.animandoBarra) {
      alternarBarra(); barraEscondidaPelaRolagem = true; rolagemJaEscondeu = true;
    }
  } else if (y <= 4) voltouAoTopo();
}, { passive: true });
function voltouAoTopo() {
  if (window.scrollY > 4) return;
  if (S.animandoBarra) { setTimeout(voltouAoTopo, 120); return; }   // espera o movimento atual terminar
  if (barraEscondidaPelaRolagem && S.barraOculta) alternarBarra();
  barraEscondidaPelaRolagem = false; rolagemJaEscondeu = false;
}
window.addEventListener('resize', () => { if (S.aberto) atualizarLeque(); });
