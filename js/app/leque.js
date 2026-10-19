// COMPORTAMENTO — como o site reage (não contém textos do site).
// Leque de destaques do botão Novidades

const TEASER = [Object.assign({}, POSTS[0], { rot: 'Mais recente' })]
  .concat(POSTS.filter((p) => p.fav && p.id !== POSTS[0].id).slice(0, 3).map((p) => Object.assign({}, p, { rot: 'Destaque' })));

// ---------- Leque de Novidades ----------
function montarLeque() {
  $('leque').innerHTML = TEASER.map((p, i) =>
    '<button type="button" class="carta" data-i="' + i + '" aria-label="' + p.rot + ': ' + p.titulo + '" tabindex="-1">' +
    '<div class="carta-img" aria-hidden="true">' + imagemPost(p) + '</div>' +
    '<div class="carta-txt"><span class="carta-rot">' + p.rot + '</span><span class="carta-tit">' + p.titulo + '</span></div></button>').join('') +
    (TEASER.length > 1 ?
      '<button type="button" class="leque-seta" data-passo="-1" aria-label="Destaque anterior" tabindex="-1"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>' +
      '<button type="button" class="leque-seta" data-passo="1" aria-label="Próximo destaque" tabindex="-1"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>' : '');
  $('leque').querySelectorAll('.carta').forEach((c) => {
    c.addEventListener('click', () => irParaPost(TEASER[+c.dataset.i].id));
    c.addEventListener('mouseenter', entrarLeque);
    c.addEventListener('mouseleave', sairLeque);
    c.addEventListener('focus', entrarLeque);
    c.addEventListener('blur', sairLeque);
  });
  $('leque').querySelectorAll('.leque-seta').forEach((b) => {
    b.addEventListener('click', () => {
      const n = TEASER.length;
      S.frente = (S.frente + (+b.dataset.passo) + n) % n;
      atualizarLeque();
    });
    b.addEventListener('mouseenter', entrarLeque);
    b.addEventListener('mouseleave', sairLeque);
    b.addEventListener('focus', entrarLeque);
    b.addEventListener('blur', sairLeque);
  });
}
const POSES = [
  'translate(-50%, 0) rotate(0deg) scale(1)',
  'translate(calc(-50% - 52px), 12px) rotate(-10deg) scale(0.9)',
  'translate(calc(-50% + 52px), 12px) rotate(10deg) scale(0.9)',
  'translate(-50%, 22px) rotate(0deg) scale(0.82)'
];
const lequeVisivel = () => S.aberto && S.perfil === 'profissional' && !S.ativo && !S.rolou && S.tela === 'palco' && !S.barraOculta;
function atualizarLeque() {
  const vis = lequeVisivel();
  // O leque sai do botão Novidades, onde quer que ele esteja na barra; no celular, não passa da borda da tela
  const nb = $('barra').querySelector('[data-cap="novidades"]');
  let x = window.innerWidth / 2;
  if (nb) {
    const rw = $('wrap').getBoundingClientRect(), rb = nb.getBoundingClientRect();
    const meia = 185;
    x = Math.min(Math.max(rb.left + rb.width / 2, meia), window.innerWidth - meia);
    $('leque').style.left = (x - rw.left) + 'px';
  }
  // Setas encostadas nas laterais da tela (com uma folga); o card da frente diminui se for preciso para caber
  // entre elas (os cards de trás podem ficar parcialmente cobertos pelas setas)
  const SETA_MARGEM = 12, SETA_RAIO = 16, FOLGA = 8;
  const c0 = $('leque').querySelector('.carta');
  const wc = c0 ? c0.offsetWidth : 152, hc = c0 ? c0.offsetHeight : 150;
  const centroEsq = SETA_MARGEM + SETA_RAIO, centroDir = window.innerWidth - SETA_MARGEM - SETA_RAIO;
  const espaco = Math.min(x - (centroEsq + SETA_RAIO + FOLGA), (centroDir - SETA_RAIO - FOLGA) - x);
  const esc = Math.max(0.5, Math.min(1, espaco / (wc / 2)));
  $('leque').style.transform = 'scale(' + esc + ')';
  const n = TEASER.length;
  $('leque').querySelectorAll('.carta').forEach((c, i) => {
    const rank = (i - S.frente + n) % n;
    const atraso = vis ? i * 70 : 0;
    c.style.transition = 'transform 520ms cubic-bezier(.2,.8,.2,1) ' + atraso + 'ms, opacity 300ms ease ' + atraso + 'ms, box-shadow 160ms ease';
    c.style.transform = vis ? POSES[rank] : 'translate(-50%, 70px) rotate(0deg) scale(0.2)';
    c.style.opacity = vis ? 1 : 0;
    c.style.zIndex = n - rank;
    c.style.pointerEvents = vis ? 'auto' : 'none';
    c.tabIndex = vis && rank === 0 ? 0 : -1;
    c.setAttribute('aria-hidden', vis ? 'false' : 'true');
  });
  // Setas dos lados dos cards
  $('leque').querySelectorAll('.leque-seta').forEach((b) => {
    const lado = +b.dataset.passo;
    b.style.transition = 'transform 520ms cubic-bezier(.2,.8,.2,1) ' + (vis ? 220 : 0) + 'ms, opacity 300ms ease ' + (vis ? 220 : 0) + 'ms, color 160ms ease';
    const alvo = ((lado < 0 ? centroEsq : centroDir) - x) / esc; // posição na escala do leque
    b.style.bottom = (hc / 2 - SETA_RAIO) + 'px';
    b.style.transform = vis ? 'translateX(' + alvo + 'px) scale(' + (1 / esc) + ')' : 'translateX(' + (lado * 60 / esc) + 'px) scale(' + (0.5 / esc) + ')';
    b.style.opacity = vis ? 1 : 0;
    b.style.pointerEvents = vis ? 'auto' : 'none';
    b.tabIndex = vis ? 0 : -1;
    b.setAttribute('aria-hidden', vis ? 'false' : 'true');
  });
  $('leque').hidden = S.perfil !== 'profissional';
}
function fecharLeque() {
  clearTimeout(tFechar);
  if (S.aberto) { S.aberto = false; S.ponto = true; S.hover = false; atualizar(); }
}
function agendarFechar(ms) {
  clearTimeout(tFechar);
  tFechar = setTimeout(() => { if (!S.hover) fecharLeque(); }, ms);
}
// As cartas só abrem pelo tempo programado. Se o mouse estiver sobre a barra, a abertura espera ele sair.
function abrirLeque() {
  if (S.perfil !== 'profissional' || S.ativo || S.rolou || S.tela !== 'palco' || S.barraOculta || S.baloes || S.girando || S.aberto) return;
  if (S.mouseBarra) { S.lequePendente = true; return; }
  S.lequePendente = false;
  S.aberto = true;
  atualizar();
  agendarFechar(10000);
}
// Mouse sobre as cartas abertas: só as mantém abertas (não abre nada)
function entrarLeque() {
  if (!S.aberto) return;
  clearTimeout(tFechar);
  S.hover = true;
}
function sairLeque() {
  if (!S.aberto) return;
  S.hover = false;
  agendarFechar(2200);
}
const placa = document.querySelector('.placa');
placa.addEventListener('mouseenter', () => {
  S.mouseBarra = true;
  if (S.aberto) fecharLeque();
});
placa.addEventListener('mouseleave', () => {
  S.mouseBarra = false;
  if (S.lequePendente) setTimeout(abrirLeque, 400);
});

// Cartas giram sozinhas a cada 3,6 s enquanto o leque está aberto
setInterval(() => {
  if (S.tela === 'palco' && S.aberto && !S.hover) { S.frente = (S.frente + 1) % TEASER.length; atualizarLeque(); }
}, 3600);

// Cartas de Novidades: a primeira aparição é sorteada entre 30 e 45 s; as seguintes, entre 30 e 60 s.
// O botão pulsa um instante antes de as cartas saírem.
let tLeque = null;
const sortear = (min, max) => min + Math.random() * (max - min);
function agendarLeque(min, max) {
  clearTimeout(tLeque);
  tLeque = setTimeout(() => {
    const pode = S.perfil === 'profissional' && !S.ativo && !S.rolou && S.tela === 'palco' && !S.barraOculta && !S.baloes && !S.girando && !S.aberto;
    if (pode && !S.mouseBarra) {
      S.pulso = true; atualizar();
      setTimeout(abrirLeque, 600);
      setTimeout(() => { S.pulso = false; atualizar(); }, 2900);
    } else if (pode) {
      abrirLeque(); // fica pendente até o mouse sair da barra
    }
    agendarLeque(30000, 60000);
  }, sortear(min, max));
}
