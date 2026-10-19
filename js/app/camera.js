// COMPORTAMENTO — "a câmera anda para frente" (Projetos e Acervo).
// Ao rolar a página para baixo, o palco fica parado e a rolagem controla a cena:
//   1) os itens em volta do Aluísio se apagam e o desenho atrás dele começa a crescer;
//   2) a câmera passa pelo Aluísio: ele cresce, desce e some; o desenho de trás continua crescendo e se dissolve;
//   3) sobra só a camada do capítulo (grade de projetos ou estante), que chega de longe e fica parada.
// Rolar para cima desfaz tudo. Com "reduzir movimento", a camada só aparece/desaparece.
// Modo "deslizar" (Acervo, 19/10): o Aluísio e os itens ficam; a camada entra da direita para a esquerda,
// passando na frente dele, e só encosta no canto direito da tela no fim da rolagem. Já é clicável enquanto entra.
const Camera = (() => {
  const C = {
    altura: 230,         // vh de rolagem da cena (computador)
    alturaCel: 190,      // vh no celular
    chegada: 0.85,       // fração da rolagem em que a cena termina (o resto é folga)
    suavizar: 70         // ms: a cena segue a rolagem com um pequeno atraso (sem trancos)
  };
  let ativo = false, raf = 0, ultimo = 0, atual = 0, camada = null, espaco = null, aoParar = null, chegou = false, modo = 'zoom';
  const lim = (v, a, b) => Math.max(a, Math.min(b, v));
  const faixa = (p, a, b) => lim((p - a) / (b - a), 0, 1);
  const suave = (t) => t * t * (3 - 2 * t);
  const alvo = () => lim(window.scrollY / Math.max(1, espaco.offsetHeight * C.chegada), 0, 1);

  function iniciar(opc) {
    parar();
    ativo = true; camada = opc.camada; aoParar = opc.aoParar || null; chegou = false; modo = opc.modo || 'zoom';
    camada.classList.add('modo-' + modo);
    espaco = document.createElement('section');
    espaco.className = 'cam-espaco';
    espaco.setAttribute('aria-hidden', 'true');
    espaco.style.height = (innerWidth <= 760 ? C.alturaCel : C.altura) + 'vh';
    $('conteudo').replaceChildren(espaco);
    document.querySelector('.palco').append(camada);
    document.body.classList.add('cam-ativa');
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    atual = alvo();
    aplicar(atual);
  }
  function pedir() { if (ativo && !raf) raf = requestAnimationFrame(quadro); }
  function quadro(t) {
    raf = 0;
    if (!ativo) return;
    const a = alvo(), dt = Math.min(40, t - ultimo || 16);
    ultimo = t;
    atual += (a - atual) * (1 - Math.exp(-dt / C.suavizar));
    if (Math.abs(a - atual) < 0.0005) atual = a;
    aplicar(atual);
    if (atual !== a) pedir();
  }
  function aplicar(pBruto) {
    const p = SEM_MOVIMENTO ? (pBruto > 0.12 ? 1 : 0) : pBruto;
    if (modo === 'deslizar') {
      const e = 1 - Math.pow(1 - p, 1.6);   // chega devagar no fim
      camada.style.transform = 'translateX(' + ((1 - e) * 100) + '%)';
      camada.style.opacity = p > 0.001 ? 1 : 0;
      camada.style.visibility = p > 0.001 ? 'visible' : 'hidden';
      camada.style.pointerEvents = p > 0.01 ? 'auto' : 'none';
      if ((p > 0.001) !== chegou) { chegou = p > 0.001; camada.classList.toggle('chegou', chegou); }
      // o Aluísio fica; os 6 itens em volta dele e o desenho de fundo se apagam enquanto a estante entra (para não embolar)
      const some = 1 - faixa(p, 0.05, 0.5);
      ['info-esq', 'info-dir'].forEach((id) => { const el = $(id); el.style.opacity = p > 0.001 ? some : ''; el.style.pointerEvents = some < 0.05 ? 'none' : ''; });
      const f = $('fundo-cap');
      f.style.opacity = p > 0.001 && f.classList.contains('on') ? some : '';
      return;
    }
    const a = suave(faixa(p, 0, 0.3)), b = suave(faixa(p, 0.22, 0.72));
    const info = 1 - a;
    ['info-esq', 'info-dir'].forEach((id) => { const el = $(id); el.style.opacity = info; el.style.pointerEvents = info < 0.05 ? 'none' : ''; });
    const f = $('fundo-cap');
    if (p > 0.001) {
      f.style.transform = 'translate(-50%,-56%) scale(' + (1 + a * 0.8 + b * 2.6) + ')';
      if (f.classList.contains('on')) f.style.opacity = 1 - faixa(p, 0.42, 0.78);
    } else { f.style.transform = ''; f.style.opacity = ''; }
    const av = document.querySelector('.avatar-box'), sb = document.querySelector('.sombra');
    const some = 1 - faixa(p, 0.34, 0.66);
    av.style.transform = p > 0.001 ? 'translateX(-50%) translateY(' + (b * 38) + '%) scale(' + (1 + b * 1.1) + ')' : '';
    av.style.opacity = p > 0.001 ? some : '';
    sb.style.opacity = p > 0.001 ? some : '';
    const c = suave(faixa(p, 0.5, 0.88));
    camada.style.opacity = c;
    camada.style.transform = 'scale(' + (0.72 + 0.28 * c) + ')';
    camada.style.pointerEvents = c > 0.6 ? 'auto' : 'none';
    camada.style.visibility = c > 0.001 ? 'visible' : 'hidden';
    const agora = p > 0.8;
    if (agora !== chegou) { chegou = agora; camada.classList.toggle('chegou', agora); }
  }
  function parar() {
    if (!ativo) return;
    ativo = false;
    cancelAnimationFrame(raf); raf = 0;
    window.removeEventListener('scroll', pedir);
    window.removeEventListener('resize', pedir);
    if (aoParar) aoParar();
    if (camada) camada.remove();
    camada = null; aoParar = null;
    ['info-esq', 'info-dir'].forEach((id) => { const el = $(id); el.style.opacity = ''; el.style.pointerEvents = ''; });
    const f = $('fundo-cap'); f.style.transform = ''; f.style.opacity = '';
    const av = document.querySelector('.avatar-box'), sb = document.querySelector('.sombra');
    av.style.transform = ''; av.style.opacity = ''; sb.style.opacity = '';
    document.body.classList.remove('cam-ativa');
  }
  return { iniciar, parar };
})();

// Janela de tela inteira (página do projeto e livro aberto). Fecha com o botão, com Esc ou com o "voltar" do teclado.
const Janela = (() => {
  let d = null, retorno = null, overflow = '', aoFechar = null;
  function abrir(html, opc) {
    fechar(true);
    opc = opc || {};
    retorno = opc.retorno || document.activeElement; aoFechar = opc.aoFechar || null;
    d = document.createElement('dialog');
    d.className = 'janela' + (opc.classe ? ' ' + opc.classe : '');
    d.setAttribute('aria-labelledby', 'janela-titulo');
    d.innerHTML = '<button type="button" class="janela-fechar foco">Fechar ×</button><div class="janela-interior">' + html + '</div>';
    document.body.append(d);
    d.querySelector('.janela-fechar').addEventListener('click', () => fechar());
    d.addEventListener('cancel', (e) => { e.preventDefault(); fechar(); });
    overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    d.showModal();
    d.scrollTop = 0;
    ajustarCarimbos(d);
    return d;
  }
  function fechar(semAviso) {
    if (!d) return;
    const el = d, fn = aoFechar, volta = retorno;
    d = null; aoFechar = null;
    if (el.open) el.close();
    el.remove();
    document.body.style.overflow = overflow;
    if (!semAviso && fn) fn(); else if (volta && volta.isConnected) volta.focus({ preventScroll: true });
  }
  return { abrir, fechar, aberta: () => !!d };
})();
