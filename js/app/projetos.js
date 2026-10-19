// COMPORTAMENTO — botão Projetos: a câmera passa pelo Aluísio e revela a grade de projetos (conteúdo em js/conteudo/projetos.js).
// Grade de 2 linhas que desliza na horizontal quando enche; cada cartão abre a página do projeto em tela inteira,
// com 4 botões (ANTES · AÇÃO · DEPOIS · IMPACTO): o escolhido fica afundado e a palavra entra com o letreiro.
const Projetos = (() => {
  const ETAPAS = [['antes', 'ANTES', 'clipboard'], ['acao', 'AÇÃO', 'tools'], ['depois', 'DEPOIS', 'chart_line'], ['impacto', 'IMPACTO', 'users']];

  function cartao(p, i) {
    return '<button type="button" class="proj-card foco" data-proj="' + i + '" style="--i:' + (i % 6) + '">' +
      (p.mock ? carimboMock('canto') : '') +
      '<span class="proj-fig" aria-hidden="true">' + svg(FIG[p.fig] || FIG.target) + '</span>' +
      '<span class="proj-frente">' + escHTML(p.frente) + '</span>' +
      '<span class="proj-tit">' + escHTML(p.titulo) + '</span>' +
      '<span class="proj-periodo">' + escHTML(p.periodo) + '</span></button>';
  }

  function montar() {
    const camada = document.createElement('div');
    camada.className = 'cam-camada proj-camada';
    camada.innerHTML = '<div class="cam-area">' + roloHTML('proj-grade', PROJETOS.map(cartao).join(''), 'projetos') + '</div>';
    Camera.iniciar({ camada, aoParar: () => Janela.fechar(true) });
    ligarRolo(camada.querySelector('[data-rolo]'));
    camada.querySelectorAll('[data-proj]').forEach((b) => b.addEventListener('click', () => abrir(+b.dataset.proj, b)));
    ajustarCarimbos(camada);
  }

  function abrir(i, botao) {
    const p = PROJETOS[i];
    const d = Janela.abrir(
      '<div class="proj-topo"><span class="proj-meta">' + escHTML(p.frente) + ' · ' + escHTML(p.periodo) + '</span>' + (p.mock ? carimboMock() : '') + '</div>' +
      '<h2 id="janela-titulo">' + escHTML(p.titulo) + '</h2>' +
      '<p class="proj-resumo">' + escHTML(p.resumo) + '</p>' +
      '<div class="proj-etapas" role="tablist" aria-label="Etapas do projeto">' +
      ETAPAS.map((e, k) => '<button type="button" role="tab" class="proj-etapa foco" data-etapa="' + k + '" aria-selected="false">' +
        '<span aria-hidden="true">' + svg(FIG[e[2]]) + '</span>' + e[1] + '</button>').join('') + '</div>' +
      '<div class="proj-painel" role="tabpanel"><div class="proj-painel-fig" aria-hidden="true"></div>' +
      '<div class="proj-painel-txt"><div class="proj-pal" data-atraso="0"><div class="letreiro" data-palavra=""><span class="sr"></span><span class="giro" aria-hidden="true"></span></div></div>' +
      '<p></p></div></div>' +
      '<div class="proj-nav"><button type="button" class="link-btn foco" data-ir="-1"></button><button type="button" class="link-btn foco" data-ir="1"></button></div>',
      { classe: 'proj-janela', retorno: botao });
    let atual = 0;
    const mostrar = (k) => {
      atual = Math.max(0, Math.min(ETAPAS.length - 1, k));
      const e = ETAPAS[atual];
      d.querySelectorAll('.proj-etapa').forEach((b, n) => { b.setAttribute('aria-selected', String(n === atual)); b.classList.toggle('on', n === atual); });
      d.querySelector('.proj-painel-fig').innerHTML = svg(FIG[e[2]]);
      const pal = d.querySelector('.proj-pal'), let_ = pal.querySelector('.letreiro');
      pal.classList.remove('pronto'); let_.dataset.palavra = e[1]; let_.querySelector('.sr').textContent = e[1];
      pararLetreiros(); letreiro(pal);
      d.querySelector('.proj-painel-txt p').textContent = p[e[0]] || '';
      const [ant, prox] = d.querySelectorAll('.proj-nav button');
      ant.hidden = atual === 0; prox.hidden = atual === ETAPAS.length - 1;
      if (atual > 0) ant.innerHTML = ICONES.voltar + ETAPAS[atual - 1][1].charAt(0) + ETAPAS[atual - 1][1].slice(1).toLowerCase();
      if (atual < ETAPAS.length - 1) prox.innerHTML = ETAPAS[atual + 1][1].charAt(0) + ETAPAS[atual + 1][1].slice(1).toLowerCase() + ICONES.seta;
    };
    d.querySelectorAll('.proj-etapa').forEach((b) => b.addEventListener('click', () => mostrar(+b.dataset.etapa)));
    d.querySelectorAll('[data-ir]').forEach((b) => b.addEventListener('click', () => mostrar(atual + +b.dataset.ir)));
    d.querySelector('.proj-etapas').addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      mostrar(atual + (ev.key === 'ArrowRight' ? 1 : -1));
      d.querySelectorAll('.proj-etapa')[atual].focus();
    });
    mostrar(0);
  }
  return { montar };
})();
