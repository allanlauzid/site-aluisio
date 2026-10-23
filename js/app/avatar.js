// COMPORTAMENTO — como o site reage (não contém textos do site).
// Avatar em vídeo (perfil Profissional): repouso em loop, com fundo transparente.
// - Telas de até 760 px usam a versão menor (_m); computador usa a maior.
// - Safari e iPhone/iPad não mostram a transparência do WebM: ficam com a imagem parada.
// - "Reduzir movimento": só a imagem parada.
// - O vídeo só começa a baixar quando a bola da intro começa a cair (sem intro: na hora).
// - O vídeo pausa quando a aba está escondida, numa página de post ou em outro perfil.

const AVATAR_VIDEO = {
  profissional: { grande: 'img/avatar/profissional_repouso.webm', pequeno: 'img/avatar/profissional_repouso_m.webm',
                  pose: 'img/avatar/profissional_pose.webp', poseP: 'img/avatar/profissional_pose_m.webp' }
};
const UA = navigator.userAgent;
const SEM_ALFA_WEBM = /iP(hone|ad|od)/.test(UA) || (/Macintosh/.test(UA) && 'ontouchend' in document) ||
  (/Safari\//.test(UA) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android/.test(UA));
const USA_VIDEO = !SEM_MOVIMENTO && !SEM_ALFA_WEBM;
const telaPequena = () => window.matchMedia('(max-width: 760px)').matches;

document.querySelectorAll('.avatar-midia').forEach((m) => {
  const cfg = AVATAR_VIDEO[m.dataset.perfil]; if (!cfg) return;
  m.querySelector('.avatar-pose').src = telaPequena() ? cfg.poseP : cfg.pose;
  const v = m.querySelector('.avatar-video');
  if (!USA_VIDEO) { v.remove(); return; }
  v.addEventListener('playing', () => m.classList.add('tocando'));
  v.addEventListener('error', () => { m.classList.remove('tocando'); v.remove(); });
  // 23/10: o vídeo só começa a baixar quando a intro termina de escrever (a imagem parada aparece nesse meio-tempo); sem intro, começa na hora
  const comecar = () => { v.src = telaPequena() ? cfg.pequeno : cfg.grande; v.preload = 'auto'; atualizarVideo(); };
  if (window.INTRO && window.INTRO.aoCair) window.INTRO.aoCair(comecar); else comecar();
});

function atualizarVideo() {
  document.querySelectorAll('.avatar-midia').forEach((m) => {
    const v = m.querySelector('.avatar-video'); if (!v) return;
    const deve = !document.hidden && S.tela === 'palco' && m.dataset.perfil === S.perfil;
    if (deve && v.paused) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
    else if (!deve && !v.paused) v.pause();
  });
}
document.addEventListener('visibilitychange', atualizarVideo);
