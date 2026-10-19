// DESENHOS — ícones e ilustrações em SVG, usados pelo site.
// Ilustrações de fundo dos capítulos (MOCK)

// Ilustrações de fundo (MOCK): traço cinza-claro com detalhes em azul claro, desenhadas numa área de 680 x 440
const CA = '#9FD8EE', CL = '#DCD8D0', CB = '#00A3E0';
const brilho = (x, y) => '<path d="M' + x + ' ' + (y - 7) + 'v14M' + (x - 7) + ' ' + y + 'h14" stroke="' + CB + '" stroke-width="1.5" opacity=".55"/>';
const bandeira = (x, y) => '<path d="M' + x + ' ' + y + 'v-30" stroke="' + CL + '" stroke-width="2"/><path d="M' + x + ' ' + (y - 30) + 'l18 6-18 6z" fill="' + CA + '"/>';
const envelope = (x, y, r) => '<g transform="rotate(' + r + ' ' + (x + 30) + ' ' + (y + 20) + ')"><rect x="' + x + '" y="' + y + '" width="60" height="40" rx="4" fill="none" stroke="' + CL + '" stroke-width="1.6"/><path d="M' + x + ' ' + y + 'l30 22 30-22" fill="none" stroke="' + CA + '" stroke-width="1.6"/></g>';
const cartao = (x, y, r) => '<g transform="rotate(' + r + ' ' + (x + 45) + ' ' + (y + 32) + ')"><rect x="' + x + '" y="' + y + '" width="90" height="64" rx="6" fill="none" stroke="' + CL + '" stroke-width="1.6"/><rect x="' + (x + 8) + '" y="' + (y + 8) + '" width="30" height="22" rx="3" fill="' + CA + '" opacity=".5"/><path d="M' + (x + 46) + ' ' + (y + 12) + 'h34M' + (x + 46) + ' ' + (y + 22) + 'h26M' + (x + 8) + ' ' + (y + 42) + 'h72M' + (x + 8) + ' ' + (y + 52) + 'h52" stroke="' + CL + '" stroke-width="1.6"/></g>';
const quadro = (x, y, w, h, r) => '<g transform="rotate(' + r + ' ' + (x + w / 2) + ' ' + (y + h / 2) + ')"><path d="M' + (x + w / 2) + ' ' + (y - 14) + 'l-' + (w / 4) + ' 14M' + (x + w / 2) + ' ' + (y - 14) + 'l' + (w / 4) + ' 14" stroke="' + CL + '" stroke-width="1.2"/><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3" fill="none" stroke="' + CL + '" stroke-width="2"/><path d="M' + (x + 8) + ' ' + (y + h - 8) + 'l' + (w * .3) + ' -' + (h * .4) + ' ' + (w * .2) + ' ' + (h * .2) + ' ' + (w * .15) + ' -' + (h * .15) + ' ' + (w * .27) + ' ' + (h * .35) + '" fill="none" stroke="' + CA + '" stroke-width="1.6"/><circle cx="' + (x + w * .75) + '" cy="' + (y + h * .3) + '" r="5" fill="' + CA + '"/></g>';
const pessoa = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="9" fill="none" stroke="' + CL + '" stroke-width="1.8"/><path d="M' + (x - 16) + ' ' + (y + 28) + 'a16 14 0 0 1 32 0" fill="none" stroke="' + CA + '" stroke-width="1.8"/>';
const CENAS = {
  nov: () => cartao(110, 60, -12) + cartao(470, 50, 10) + cartao(500, 250, -6) + cartao(90, 250, 8) + brilho(260, 60) + brilho(430, 300) + brilho(80, 190) + brilho(610, 190),
  traj: () => '<path d="M40 420 C150 360,110 270,220 250 S380 240,420 170 S560 90,650 60" fill="none" stroke="' + CA + '" stroke-width="2.4" stroke-dasharray="7 9"/>' + bandeira(220, 250) + bandeira(420, 170) + bandeira(600, 78) + '<circle cx="40" cy="420" r="6" fill="' + CA + '"/>',
  proj: () => {
    let t = '';
    for (let x = 0; x <= 680; x += 34) t += '<path d="M' + x + ' 0v440" stroke="#EEF2F5"/>';
    for (let y = 0; y <= 440; y += 34) t += '<path d="M0 ' + y + 'h680" stroke="#EEF2F5"/>';
    for (let i = 0; i < 5; i++) { const h = 30 + i * 28; t += '<rect x="' + (470 + i * 30) + '" y="' + (330 - h) + '" width="20" height="' + h + '" rx="2" fill="none" stroke="' + CL + '" stroke-width="1.6"/>'; }
    return t + '<path d="M70 340 L200 300 L300 310 L430 220 L620 110" fill="none" stroke="' + CA + '" stroke-width="2"/><path d="M604 104l16 6-8 14" fill="none" stroke="' + CA + '" stroke-width="2"/>';
  },
  acv: () => {
    let t = '';
    [130, 230, 330].forEach((y, k) => {
      t += '<path d="M60 ' + y + 'h560" stroke="' + CL + '" stroke-width="3"/>';
      let x = 70;
      while (x < 600) { const w = 10 + ((x * 7 + k * 13) % 14), h = 40 + ((x * 11 + k * 5) % 40); t += '<rect x="' + x + '" y="' + (y - h) + '" width="' + w + '" height="' + h + '" rx="2" fill="none" stroke="' + ((x + k) % 5 === 0 ? CA : CL) + '" stroke-width="1.5"/>'; x += w + 3 + ((x * 3) % 9); }
    });
    return t;
  },
  cont: () => envelope(80, 70, -10) + envelope(540, 60, 12) + envelope(520, 260, -8) + envelope(110, 270, 6) + '<path d="M150 110 C250 40,420 40,540 80" fill="none" stroke="' + CA + '" stroke-width="1.6" stroke-dasharray="2 7"/><path d="M170 300 C260 380,430 380,520 290" fill="none" stroke="' + CA + '" stroke-width="1.6" stroke-dasharray="2 7"/>',
  teo: () => {
    let t = '';
    for (let i = -6; i <= 6; i++) { const a = i * 0.2; t += '<path d="M' + (340 + Math.sin(a) * 60) + ' ' + (150 - Math.cos(a) * 60) + 'L' + (340 + Math.sin(a) * 300) + ' ' + (150 - Math.cos(a) * 300) + '" stroke="' + CA + '" stroke-width="1.4" opacity=".6"/>'; }
    return t + '<path d="M340 250 C280 220,180 220,110 240 L110 400 C180 380,280 380,340 410 Z" fill="#FFFFFF" stroke="' + CL + '" stroke-width="2"/><path d="M340 250 C400 220,500 220,570 240 L570 400 C500 380,400 380,340 410 Z" fill="#FFFFFF" stroke="' + CL + '" stroke-width="2"/><path d="M140 270c50-14 120-14 170 4M140 300c50-14 120-14 170 4M370 274c50-18 120-18 170-4M370 304c50-18 120-18 170-4" fill="none" stroke="' + CL + '" stroke-width="1.4"/>';
  },
  past: () => { let t = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; t += pessoa(340 + Math.cos(a) * 270, 215 + Math.sin(a) * 150); } return t; },
  gal: () => quadro(70, 60, 110, 80, -6) + quadro(500, 50, 120, 90, 5) + quadro(90, 250, 100, 120, 4) + quadro(520, 240, 100, 80, -5) + quadro(250, 330, 70, 50, -3) + quadro(380, 20, 70, 50, 4),
  // 19/10: Calendário (MOCK) — folhas de calendário soltas
  cal: () => {
    const folha = (x, y, r) => '<g transform="rotate(' + r + ' ' + (x + 40) + ' ' + (y + 40) + ')"><rect x="' + x + '" y="' + y + '" width="80" height="80" rx="6" fill="none" stroke="' + CL + '" stroke-width="1.8"/><rect x="' + x + '" y="' + y + '" width="80" height="18" rx="6" fill="' + CA + '" opacity=".55"/>' +
      [0, 1, 2, 3].map((l) => [0, 1, 2, 3].map((c) => '<circle cx="' + (x + 14 + c * 17) + '" cy="' + (y + 32 + l * 13) + '" r="2.2" fill="' + ((l * 4 + c) % 5 === 2 ? CB : CL) + '"/>').join('')).join('') + '</g>';
    return folha(80, 60, -8) + folha(520, 50, 9) + folha(530, 270, -5) + folha(90, 280, 6) + brilho(300, 50) + brilho(420, 380);
  }
};
