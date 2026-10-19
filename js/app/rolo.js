// COMPORTAMENTO — faixa que desliza na horizontal (grade de Projetos e prateleiras do Acervo).
// Só desliza quando os espaços estão cheios (o conteúdo passa da largura): aí aparecem as setas,
// dentro de um círculo branco, nas laterais. Funciona com as setas, o dedo (celular) e o trackpad.
const SETA_ROLO = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
function roloHTML(classeTrilho, conteudo, nome) {
  return '<div class="rolo" data-rolo>' +
    '<button type="button" class="rolo-seta esq" aria-label="Voltar ' + nome + '">' + SETA_ROLO + '</button>' +
    '<div class="rolo-trilho ' + classeTrilho + '">' + conteudo + '</div>' +
    '<button type="button" class="rolo-seta dir" aria-label="Avançar ' + nome + '">' + SETA_ROLO + '</button></div>';
}
function ligarRolo(el) {
  const trilho = el.querySelector('.rolo-trilho'), esq = el.querySelector('.rolo-seta.esq'), dir = el.querySelector('.rolo-seta.dir');
  const conferir = () => {
    const sobra = trilho.scrollWidth - trilho.clientWidth, cheio = sobra > 4;
    el.classList.toggle('cheio', cheio);
    esq.disabled = !cheio || trilho.scrollLeft <= 2;
    dir.disabled = !cheio || trilho.scrollLeft >= sobra - 2;
  };
  const passo = (s) => trilho.scrollBy({ left: s * trilho.clientWidth * 0.9, behavior: SEM_MOVIMENTO ? 'auto' : 'smooth' });
  esq.addEventListener('click', () => passo(-1));
  dir.addEventListener('click', () => passo(1));
  trilho.addEventListener('scroll', conferir, { passive: true });
  if (window.ResizeObserver) new ResizeObserver(conferir).observe(trilho);
  window.addEventListener('resize', conferir);
  conferir();
  return conferir;
}
