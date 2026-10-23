// COMPORTAMENTO — como o site reage (não contém textos do site).
// Início do site: monta tudo e faz a entrada das barras (depois da intro)

// ---------- Coreografia de chegada ----------
montarBarra();
montarLeque();
atualizar();

// Entrada no site: as duas barras começam fechadas (sem animação).
// 1 s depois o notch de perfis abre (movimento de 0,52 s); fica totalmente aberto por 1,5 s e então fecha
// enquanto, ao mesmo tempo, a barra de baixo abre.
// Se o visitante abrir/fechar o notch ou a barra antes disso, a parte correspondente não é feita.
(function entrada() {
  const w = $('wrap'), aba = $('aba-topo'), nw = $('notch-wrap'), an = $('aba-notch');
  w.style.transition = 'none'; nw.style.transition = 'none';
  S.barraOculta = true;
  aba.setAttribute('aria-expanded', 'false');
  aba.setAttribute('aria-label', 'Mostrar a barra');
  $('barra').querySelectorAll('button').forEach((b) => { b.tabIndex = -1; });
  $('inicio').tabIndex = -1;
  aba.classList.add('cima');
  posicaoBarra();
  notchAberto = false;
  an.setAttribute('aria-expanded', 'false');
  an.setAttribute('aria-label', 'Mostrar os perfis');
  an.classList.remove('cheio');
  document.querySelectorAll('.perfil-btn').forEach((b) => { b.tabIndex = -1; });
  posicaoNotch();
  void w.offsetHeight; void nw.offsetHeight;
  w.style.transition = ''; nw.style.transition = '';
  // A sequência das barras começa quando a intro termina (a bola sai da tela); sem intro, começa na hora
  // 19/10: o notch fica aberto 1 s; a barra de baixo abre no mesmo instante em que o notch fecha.
  // Qualquer tecla, clique ou toque (fora das barras) leva as duas direto à posição final: notch fechado e barra aberta.
  const ABERTO = 1000;
  const barras = () => {
    let terminou = false;
    const t1 = setTimeout(() => { if (!S.mexeuNotch && !notchAberto) alternarNotch(); }, 1000);
    const final = () => {
      if (terminou) return;
      // se uma das barras ainda está no meio de um movimento, espera ele acabar e conclui
      if (animandoNotch || S.animandoBarra) { setTimeout(final, 80); return; }
      terminou = true;
      clearTimeout(t1); clearTimeout(t2); soltar();
      if (!S.mexeuNotch && notchAberto) alternarNotch();
      if (!S.mexeuBarra && S.barraOculta) alternarBarra();
      // 21/10: quando a barra termina de subir (560 ms), a seta que aponta para ela é desenhada
      setTimeout(() => SETA_BARRA.mostrar(), 620);
    };
    const t2 = setTimeout(final, 1000 + 520 + ABERTO);
    const pular = (e) => { if (e.target && e.target.closest && e.target.closest('#notch-wrap, #wrap')) return; final(); };
    const soltar = () => ['keydown', 'pointerdown'].forEach((ev) => window.removeEventListener(ev, pular, true));
    ['keydown', 'pointerdown'].forEach((ev) => window.addEventListener(ev, pular, true));
  };
  if (window.INTRO) window.INTRO.aoTerminar(barras); else barras();
})();

agendarLeque(30000, 45000);
depois(() => document.body.classList.add('discreto'), 10000);
