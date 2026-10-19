// COMPORTAMENTO — como o site reage (não contém textos do site).
// Contato: botões-ícone girando devagar em volta do peito de Aluísio (passam na frente e por trás dele).
// (19/10: antes giravam em volta da cabeça; agora descem para o peito, num círculo um pouco maior.)
// Rolar a página acelera o giro: começa suave e cresce cada vez mais com a força da rolagem (curva que sobe);
// quando a rolagem para, a velocidade volta aos poucos ao giro lento (curva que desce).

const ORBITA = {
  volta: 18,            // segundos por volta, sem rolagem
  maxVezes: 10,         // velocidade máxima = 10x o giro lento
  forca: 300,           // quanto de rolagem (px/s) dobra a velocidade
  curva: 1.7,           // > 1: no começo acelera pouco; quanto mais rápido rola, mais acelera (curva que sobe)
  apagar: 0.55,         // s: em quanto tempo o "embalo" da rolagem cai para ~1/3 (curva que desce)
  suavizar: 0.18        // s: suaviza a mudança de velocidade (sem trancos)
};
// Ícones em img/icones/ (WebP). O e-mail foi desenhado para o site no mesmo estilo dos outros três.
const ICONE_REDE = { insta: 'instagram', linkedin: 'linkedin', facebook: 'facebook', email: 'email' };
// Cabeça em frações da caixa do avatar (proporção 700 x 1758): cx/largura = da largura, cy = da altura
// Profissional: medido no vídeo cortado. Religioso/Pessoal: silhueta SVG (200 x 580) centralizada pela altura.
const CABECA_PERFIL = {
  profissional: { cx: 0.531, cy: 0.085, largura: 0.286 },
  silhueta: { cx: 0.5, cy: 50 / 580, largura: (52 / 200) * (200 / 580) / (700 / 1758) }
};
const cabecaAtual = () => CABECA_PERFIL[S.perfil] || CABECA_PERFIL.silhueta;
// 19/10: centro do giro no peito (fração da altura da caixa do avatar) e tamanho do círculo, em "larguras de cabeça"
const GIRO = {
  peito: { profissional: 0.27, silhueta: 0.26 },
  raioX: 2.9,   // antes 2,4 (em volta da cabeça)
  raioY: 0.6    // antes 0,42: o círculo fica um pouco mais "aberto", sem deixar de passar por trás
};

const O = { ativa: false, raf: 0, ang: 0, vezes: 1, embalo: 0, ultimo: 0, pausa: false, botoes: [], ultimoY: 0 };

function montarOrbita(itens) {
  pararOrbita();
  const el = $('orbita');
  el.innerHTML = itens.map((it, i) => {
    const img = '<img src="img/icones/' + ICONE_REDE[it.contato] + '.webp" alt="" draggable="false">';
    const rot = it.big + (it.link ? ' (abre em nova aba)' : '');
    return it.link
      ? '<a class="orbita-btn foco" href="' + it.link + '" target="_blank" rel="noopener noreferrer" aria-label="' + rot + '" title="' + it.big + '">' + img + '</a>'
      : '<button type="button" class="orbita-btn foco" aria-label="' + rot + '" title="' + it.big + '">' + img + '</button>';
  }).join('');
  O.botoes = Array.from(el.querySelectorAll('.orbita-btn'));
  O.botoes.forEach((b) => {
    b.addEventListener('pointerenter', () => { O.pausa = true; });
    b.addEventListener('pointerleave', () => { O.pausa = false; });
    b.addEventListener('focus', () => { O.pausa = true; });
    b.addEventListener('blur', () => { O.pausa = false; });
  });
  O.ativa = true; O.vezes = 1; O.embalo = 0; O.pausa = false; O.ultimo = 0; O.ultimoY = window.scrollY;
  posicionarOrbita();
  requestAnimationFrame(() => el.classList.add('on'));
  if (!SEM_MOVIMENTO) O.raf = requestAnimationFrame(quadroOrbita);
}

function pararOrbita() {
  O.ativa = false;
  cancelAnimationFrame(O.raf);
  const el = $('orbita');
  if (el) { el.classList.remove('on'); el.innerHTML = ''; }
  O.botoes = [];
}

// Coloca cada botão na elipse em volta do peito; o que está atrás fica menor, mais apagado e por trás do avatar
function posicionarOrbita() {
  const box = document.querySelector('.avatar-box');
  if (!box || !O.botoes.length) return;
  const bw = box.offsetWidth, bh = box.offsetHeight;
  const C = cabecaAtual();
  const peito = GIRO.peito[S.perfil] || GIRO.peito.silhueta;
  const cx = box.offsetLeft + bw * (C.cx - 0.5), cy = box.offsetTop + bh * peito;
  const cab = bw * C.largura;
  const tam = Math.max(40, Math.min(58, cab * 0.78));
  const caixa = document.querySelector('.palco').clientWidth;
  const rx = Math.min(cab * GIRO.raioX, caixa / 2 - Math.abs(cx - caixa / 2) - tam / 2 - 10), ry = cab * GIRO.raioY;  // não sai da tela
  const n = O.botoes.length;
  O.botoes.forEach((b, i) => {
    const a = O.ang + (i / n) * Math.PI * 2;
    const frente = Math.cos(a);                 // 1 = bem na frente, -1 = bem atrás
    const x = cx + rx * Math.sin(a), y = cy + ry * frente;
    const k = 0.84 + 0.2 * (frente + 1) / 2;    // 0,84 atrás → 1,04 na frente
    b.style.width = b.style.height = tam + 'px';
    b.style.transform = 'translate3d(' + (x - tam / 2).toFixed(1) + 'px,' + (y - tam / 2).toFixed(1) + 'px,0) scale(' + k.toFixed(3) + ')';
    b.style.zIndex = frente >= 0 ? 3 : 1;
    b.style.opacity = (0.72 + 0.28 * (frente + 1) / 2).toFixed(3);
  });
}

function quadroOrbita(t) {
  if (!O.ativa) return;
  const dt = O.ultimo ? Math.min(0.05, (t - O.ultimo) / 1000) : 0;
  O.ultimo = t;
  // curva que desce: o embalo da rolagem vai sumindo aos poucos
  O.embalo *= Math.exp(-dt / ORBITA.apagar);
  // curva que sobe: pouca rolagem acelera pouco; rolagem forte acelera cada vez mais
  const alvo = Math.min(ORBITA.maxVezes, 1 + Math.pow(O.embalo / ORBITA.forca, ORBITA.curva));
  O.vezes += (alvo - O.vezes) * (1 - Math.exp(-dt / ORBITA.suavizar));
  if (!O.pausa) O.ang += dt * (Math.PI * 2 / ORBITA.volta) * O.vezes;
  posicionarOrbita();
  O.raf = requestAnimationFrame(quadroOrbita);
}

// Força da rolagem (px por segundo, aproximado): rolagem da página e, quando a página já está no fim/início, a roda do mouse
function somarEmbalo(px) {
  if (!O.ativa || SEM_MOVIMENTO) return;
  O.embalo = Math.min(O.embalo + Math.abs(px), ORBITA.forca * 6);
}
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  somarEmbalo(y - O.ultimoY);
  O.ultimoY = y;
}, { passive: true });
window.addEventListener('wheel', (e) => {
  const fim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
  const inicio = window.scrollY <= 0;
  if ((e.deltaY > 0 && fim) || (e.deltaY < 0 && inicio)) somarEmbalo(e.deltaY);
}, { passive: true });
window.addEventListener('resize', () => { if (O.ativa) posicionarOrbita(); });
