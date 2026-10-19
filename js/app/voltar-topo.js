// COMPORTAMENTO — botão X azul claro no canto superior direito (19/10).
// Aparece em qualquer botão da barra depois que a pessoa rola a página; ao clicar, a página volta ao topo
// do capítulo (como se a pessoa tivesse rolado de volta), desfazendo as animações de rolagem.
(() => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'voltar-topo foco';
  b.setAttribute('aria-label', 'Voltar ao início deste capítulo');
  b.title = 'Voltar ao início';
  b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  document.body.append(b);
  const conferir = () => b.classList.toggle('on', !!S.ativo && S.tela === 'palco' && window.scrollY > 60);
  b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: SEM_MOVIMENTO ? 'auto' : 'smooth' }));
  window.addEventListener('scroll', conferir, { passive: true });
  document.addEventListener('click', () => setTimeout(conferir, 0));
  conferir();
})();
