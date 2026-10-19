// COMPORTAMENTO — carimbo vermelho "MOCK" em tudo que é provisório ou inventado.
// O contorno usa os mesmos tracinhos da seta "Role a página" (traço 2,6 · 5 cheio / 6 vazio), em vermelho.
function carimboMock(extra) {
  return '<span class="carimbo-mock' + (extra ? ' ' + extra : '') + '" role="note" aria-label="Conteúdo provisório (mock)">' +
    '<span aria-hidden="true">MOCK</span><svg class="carimbo-borda" aria-hidden="true"><rect/></svg></span>';
}
// Ajusta o retângulo tracejado ao tamanho de cada carimbo (chamar depois de mostrar o carimbo na tela)
function ajustarCarimbos(raiz) {
  (raiz || document).querySelectorAll('.carimbo-mock').forEach((c) => {
    const r = c.querySelector('rect'), e = 1.3, w = c.offsetWidth - 2 * e, h = c.offsetHeight - 2 * e;
    if (!r || w <= 0 || h <= 0) return;
    r.setAttribute('x', e); r.setAttribute('y', e); r.setAttribute('width', w); r.setAttribute('height', h);
    r.setAttribute('rx', 5); r.setAttribute('ry', 5);
  });
}
// Texto seguro dentro do HTML
const escHTML = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// Avisos em vermelho (mesmo estilo dos posts)
const avisosHTML = (lista) => lista && lista.length ? '<div class="avisos">' + lista.map((a) => '<span class="aviso">' + escHTML(a) + '</span>').join('') + '</div>' : '';
