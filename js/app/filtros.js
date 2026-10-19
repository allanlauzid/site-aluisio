// COMPORTAMENTO — faixa de filtros do feed de Novidades (19/10, pedido de Allan).
// - Faixa preta, com 1 linha de opções; o que não cabe fica escondido e aparece no botão Menu (branco, 3 linhas).
// - Ao rolar, a faixa sobe até aparecer inteira embaixo da tela e TRAVA ali; os posts continuam passando por trás.
// - No computador ela ocupa a largura do cenário, respeitando as margens laterais do site.
const MENU_FILTROS = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

function filtrosHTML(chips, rotulo) {
  return '<div class="filtros filtros-nov" role="group" aria-label="' + rotulo + '">' +
    '<div class="filtros-linha">' + chips + '</div>' +
    '<button type="button" class="filtros-menu foco" aria-expanded="false" aria-label="Ver todas as opções de filtro" title="Todas as opções">' + MENU_FILTROS + '</button>' +
    '<div class="filtros-painel" role="group" aria-label="Todas as opções de filtro" hidden>' + chips + '</div></div>';
}

// Largura útil da tela (sem a barra de rolagem), usada para a faixa ocupar o cenário inteiro
function medirLarguraUtil() { document.documentElement.style.setProperty('--vw-util', document.documentElement.clientWidth + 'px'); }
medirLarguraUtil();
window.addEventListener('resize', medirLarguraUtil);

function ligarFiltros(faixa) {
  if (!faixa) return;
  medirLarguraUtil();
  const linha = faixa.querySelector('.filtros-linha'), menu = faixa.querySelector('.filtros-menu'), painel = faixa.querySelector('.filtros-painel');
  // Marca o Menu com um ponto azul quando o filtro escolhido ficou escondido (não coube na linha)
  const conferir = () => {
    const chips = linha.querySelectorAll('.chip');
    if (!chips.length) return;
    const topo = chips[0].offsetTop, on = linha.querySelector('.chip.on');
    menu.classList.toggle('marcado', !!on && on.offsetTop > topo);
  };
  const fechar = () => { painel.hidden = true; menu.setAttribute('aria-expanded', 'false'); document.removeEventListener('pointerdown', fora, true); document.removeEventListener('keydown', esc); };
  const fora = (e) => { if (!faixa.contains(e.target)) fechar(); };
  const esc = (e) => { if (e.key === 'Escape') { fechar(); menu.focus(); } };
  menu.addEventListener('click', () => {
    if (!painel.hidden) { fechar(); return; }
    painel.hidden = false; menu.setAttribute('aria-expanded', 'true');
    document.addEventListener('pointerdown', fora, true); document.addEventListener('keydown', esc);
    const on = painel.querySelector('.chip.on') || painel.querySelector('.chip');
    if (on) on.focus({ preventScroll: true });
  });
  conferir();
  if (window.ResizeObserver) new ResizeObserver(conferir).observe(linha);
}
