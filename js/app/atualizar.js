// COMPORTAMENTO — como o site reage (não contém textos do site).
// Atualização geral da tela e rolagem

// ---------- Atualização geral ----------
function atualizar() {
  const palco = S.tela === 'palco';
  $('palco-tela').hidden = !palco;
  $('post').hidden = palco;
  const ind = $('indicador-pos'), mostrarInd = palco && !!S.ativo && !S.rolou && !!S.indPronto;
  // Ao aparecer, a seta e o texto começam a animação do início
  if (mostrarInd && !ind.classList.contains('on')) ind.getAnimations({ subtree: true }).forEach((a) => { if (a instanceof CSSAnimation) a.currentTime = 0; });
  ind.classList.toggle('on', mostrarInd);
  atualizarBarra();
  atualizarLeque();
  atualizarPerfis();
  atualizarVideo();
}

window.addEventListener('scroll', () => {
  const r = window.scrollY > window.innerHeight * 0.22;
  if (r !== S.rolou) { S.rolou = r; atualizar(); }
}, { passive: true });
