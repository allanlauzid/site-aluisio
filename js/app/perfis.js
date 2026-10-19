// COMPORTAMENTO — como o site reage (não contém textos do site).
// Notch de perfis e troca de perfil (giro do cenário)

// ---------- Notch de perfis e giro ----------
function atualizarPerfis() {
  document.querySelectorAll('.perfil-btn').forEach((b) => {
    const atual = b.dataset.perfil === S.perfil;
    b.classList.toggle('atual', atual);
    b.setAttribute('aria-pressed', atual ? 'true' : 'false');
  });
  const av = $('avatar');
  av.setAttribute('aria-label', 'Aluísio (perfil ' + NOMES[S.perfil] + ')');
  // toggleAttribute funciona também em <svg> (a propriedade .hidden não existe em SVG)
  av.querySelectorAll('[data-perfil]').forEach((sv) => { sv.toggleAttribute('hidden', sv.dataset.perfil !== S.perfil); });
}
document.querySelectorAll('.perfil-btn').forEach((b) => b.addEventListener('click', () => trocarPerfil(b.dataset.perfil)));

// Esconder / expandir: primeiro o movimento, depois o círculo muda de cor
let notchAberto = true, animandoNotch = false;
function posicaoNotch() {
  $('notch-wrap').style.transform = notchAberto ? 'translate(-50%, 0)' : 'translate(-50%, -' + $('notch').offsetHeight + 'px)';
}
function alternarNotch() {
  if (animandoNotch) return;
  animandoNotch = true;
  notchAberto = !notchAberto;
  const aba = $('aba-notch');
  aba.setAttribute('aria-expanded', notchAberto ? 'true' : 'false');
  aba.setAttribute('aria-label', notchAberto ? 'Esconder os perfis' : 'Mostrar os perfis');
  document.querySelectorAll('.perfil-btn').forEach((b) => { b.tabIndex = notchAberto ? 0 : -1; });
  posicaoNotch();
  setTimeout(() => { aba.classList.toggle('cheio', notchAberto); animandoNotch = false; }, 540);
}
$('aba-notch').addEventListener('click', () => { S.mexeuNotch = true; alternarNotch(); });
window.addEventListener('resize', () => { if (!notchAberto) posicaoNotch(); });

// Troca de perfil na barra de baixo: afundar os botões atuais em cascata...
function afundarBarra() {
  const bs = Array.from($('barra').querySelectorAll('.barra-btn'));
  bs.forEach((b, i) => { b.style.animationDelay = (i * 45) + 'ms'; b.classList.add('afunda'); });
  return (bs.length - 1) * 45 + 300;
}
// ...e fazer os novos emergirem, com a barra ajustando a largura à nova quantidade de botões
function emergirBarra(larguraAntiga) {
  const barra = $('barra');
  const bs = Array.from(barra.querySelectorAll('.barra-btn'));
  bs.forEach((b, i) => { b.style.animationDelay = (50 + i * 70) + 'ms'; b.classList.add('emerge'); });
  barra.style.transition = 'none';
  barra.style.width = '';
  const larguraNova = barra.offsetWidth;
  barra.style.overflow = 'hidden';
  barra.style.width = larguraAntiga + 'px';
  void barra.offsetWidth;
  barra.style.transition = 'width 420ms cubic-bezier(.3,.7,.2,1)';
  barra.style.width = larguraNova + 'px';
  const total = 50 + (bs.length - 1) * 70 + 540;
  setTimeout(() => {
    barra.style.transition = ''; barra.style.width = ''; barra.style.overflow = '';
    bs.forEach((b) => { b.classList.remove('emerge'); b.style.animationDelay = ''; });
  }, Math.max(total, 440));
}

function trocarPerfil(p) {
  if (p === S.perfil || S.girando) return;
  const delta = (ORDEM.indexOf(p) - ORDEM.indexOf(S.perfil) + 3) % 3;
  const dir = delta === 1 ? 1 : -1;
  limpar();
  S.girando = true; S.baloes = false; S.aberto = false; S.hover = false; S.pulso = false;
  atualizar();
  const tAfunda = afundarBarra();
  const larguraAntiga = $('barra').offsetWidth;
  const cena = $('cena');
  cena.style.transition = 'transform 420ms cubic-bezier(.5,0,.75,0), opacity 420ms cubic-bezier(.7,0,.9,.4)';
  cena.style.transform = 'rotateY(' + (-90 * dir) + 'deg)';
  cena.style.opacity = 0;
  setTimeout(() => {
    window.scrollTo(0, 0);
    S.perfil = p; S.tela = 'palco'; S.ativo = null; S.destaque = null; S.filtro = 'Todas';
    montarBarra(); montarCapitulo(); atualizar();
    emergirBarra(larguraAntiga);
    cena.style.transition = 'none';
    cena.style.transform = 'rotateY(' + (90 * dir) + 'deg)';
    void cena.offsetWidth;
    cena.style.transition = 'transform 640ms cubic-bezier(.2,.8,.3,1), opacity 420ms ease-out';
    cena.style.transform = 'rotateY(0deg)';
    cena.style.opacity = 1;
    setTimeout(() => { S.girando = false; cena.style.transition = 'none'; cena.style.transform = 'none'; }, 680);
  }, Math.max(420, tAfunda));
}
