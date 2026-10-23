// COMPORTAMENTO — como o site reage (não contém textos do site).
// 21/10: seta pontilhada apontando para a barra de botões, no fim da entrada (estilo da seta "Role a página").
// SETA_BARRA.mostrar() é chamada por iniciar.js quando a barra de baixo termina de aparecer.
// Some no primeiro clique em qualquer botão da barra (ou no Início). Também some se a barra for escondida,
// para não ficar apontando para o nada. Depois de sumir, não volta (só ao recarregar a página).

const SETA_BARRA = (() => {
  // Desenhos (coordenadas em px dentro do próprio SVG). O fim do caminho é o ponto que encosta na barra.
  const DESENHOS = {
    // Computador: vem do lado esquerdo, faz uma volta e chega na horizontal à ponta esquerda da barra
    pc: { w: 200, h: 170, fim: [194, 158], d: 'M14 6 C -6 46, 46 70, 64 64 C 86 56, 74 24, 54 40 C 30 60, 70 110, 110 132 C 140 150, 166 157, 194 158' },
    // Celular: arco curto que desce pelo canto esquerdo e chega de cima no começo da barra
    cel: { w: 48, h: 96, fim: [34, 92], d: 'M6 4 C 34 12, 2 40, 20 56 C 30 64, 34 74, 34 92' }
  };
  let el = null, estado = 'fora';   // fora → visivel → saindo → fim

  function montar() {
    el = document.createElement('div');
    el.className = 'seta-barra';
    el.setAttribute('aria-hidden', 'true');
    el.hidden = true;
    el.innerHTML = Object.keys(DESENHOS).map((k) => {
      const s = DESENHOS[k];
      return '<span class="sb-desenho sb-' + k + '" style="position:relative;width:' + s.w + 'px;height:' + s.h + 'px">' +
        '<svg width="' + s.w + '" height="' + s.h + '" viewBox="0 0 ' + s.w + ' ' + s.h + '">' +
        '<defs><mask id="m-sb-' + k + '" maskUnits="userSpaceOnUse" x="-20" y="-20" width="' + (s.w + 40) + '" height="' + (s.h + 40) + '">' +
        '<path class="sb-mascara" pathLength="100" d="' + s.d + '"/></mask></defs>' +
        '<path class="sb-pontos" d="' + s.d + '" mask="url(#m-sb-' + k + ')"/></svg>' +
        '<span class="sb-ponta" style="offset-path:path(\'' + s.d + '\')"><svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2 L11 7 L2 12"/></svg></span>' +
        '</span>';
    }).join('');
    document.body.append(el);
  }

  const celular = () => window.matchMedia('(max-width:760px)').matches;

  // Encosta o fim do desenho na barra (lado esquerdo no computador; em cima, no começo, no celular)
  function posicionar() {
    if (!el || estado === 'fora' || estado === 'fim') return;
    const cel = celular();
    el.classList.toggle('celular', cel);
    const s = DESENHOS[cel ? 'cel' : 'pc'];
    const r = $('barra').getBoundingClientRect();
    const alvo = cel ? [r.left + 26, r.top - 34] : [r.left - 12, r.top + r.height / 2];   // no celular, acima da aba da seta
    el.style.left = (alvo[0] - s.fim[0]) + 'px';
    el.style.top = (alvo[1] - s.fim[1]) + 'px';
  }

  function mostrar() {
    if (estado !== 'fora' || S.barraOculta || document.documentElement.classList.contains('modo-admin')) return;
    estado = 'visivel';
    el.hidden = false;
    posicionar();
    el.classList.add('desenha');
  }

  function esconder() {
    if (estado !== 'visivel') { if (estado === 'fora') estado = 'fim'; return; }
    estado = 'saindo';
    el.classList.remove('desenha');
    void el.offsetWidth;   // reinicia a animação
    el.classList.add('apaga');
    setTimeout(() => { el.hidden = true; estado = 'fim'; }, 1150);
  }

  montar();
  // Os botões da barra são refeitos ao trocar de perfil, então o clique é ouvido na barra inteira
  $('barra').addEventListener('click', (e) => { if (e.target.closest('.barra-btn')) esconder(); });
  $('inicio').addEventListener('click', esconder);
  // A barra escondida (pela rolagem ou pela aba) leva a seta junto
  $('aba-topo').addEventListener('click', () => { if (estado === 'visivel') esconder(); });
  window.addEventListener('scroll', () => { if (estado === 'visivel' && window.scrollY > 40) esconder(); }, { passive: true });
  window.addEventListener('resize', posicionar);

  return { mostrar, esconder };
})();
