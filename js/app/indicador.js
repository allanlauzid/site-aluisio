// COMPORTAMENTO — como o site reage (não contém textos do site).
// Indicador "role para explorar"

// ---------- Indicador ----------
// Ao clicar num botão da barra, o indicador só aparece 2 s depois (S.indPronto)
const ATRASO_INDICADOR = 2000;
let tIndicador = null;
function adiarIndicador() {
  S.indPronto = false;
  clearTimeout(tIndicador);
  tIndicador = setTimeout(() => { S.indPronto = true; atualizar(); }, ATRASO_INDICADOR);
}
document.querySelectorAll('[data-descer]').forEach((b) => {
  b.setAttribute('aria-label', 'Role a página');
  b.addEventListener('click', () => window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' }));
});
if (toque) document.querySelectorAll('[data-toque]').forEach((el) => { el.innerHTML = el.dataset.toque; });

// Contorno tracejado da pílula: um retângulo de pontas redondas do tamanho exato do texto
document.querySelectorAll('.rab-texto').forEach((t) => {
  const r = t.querySelector('.rab-pilula rect');
  if (!r) return;
  const ajustar = () => {
    const e = 1.3, w = t.offsetWidth - 2 * e, h = t.offsetHeight - 2 * e;
    if (w <= 0 || h <= 0) return;
    r.setAttribute('x', e); r.setAttribute('y', e);
    r.setAttribute('width', w); r.setAttribute('height', h);
    r.setAttribute('rx', h / 2); r.setAttribute('ry', h / 2);
  };
  ajustar();
  if (window.ResizeObserver) new ResizeObserver(ajustar).observe(t);
});

// 19/10: no computador, o "Role a página" fica ao lado direito da barra de botões.
// A largura da barra muda com o perfil (5, 3 ou 2 botões), então a posição acompanha a largura medida.
(() => {
  const placa = document.querySelector('.placa');
  if (!placa) return;
  const medir = () => document.documentElement.style.setProperty('--meia-barra', (placa.offsetWidth / 2) + 'px');
  medir();
  if (window.ResizeObserver) new ResizeObserver(medir).observe(placa);
  window.addEventListener('resize', medir);
})();
