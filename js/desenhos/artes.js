// DESENHOS — "fotos" de exemplo (MOCK) para os perfis Pessoal e Religioso.
// Cenas simples em SVG, desenhadas em código; não são fotos reais. arte('praia') devolve o SVG da cena.
// Paleta suave, perto da do site (azuis, areia, verde-sálvia, pôr do sol).

const ARTES = {
  praia: (u) => fundoArte(u, '#BFE6F5', '#FDF3E1') + '<circle cx="300" cy="78" r="26" fill="#FFE2A8"/>' +
    '<rect y="150" width="400" height="40" fill="#5FB7D9"/><path d="M0 150 Q100 140 200 150 T400 150 V160 H0Z" fill="#8FD0EA"/>' +
    '<path d="M0 182 Q120 170 400 186 V260 H0Z" fill="#F1DDB8"/><path d="M60 182 l8-40 M68 142 q-22-6-34 6 M68 142 q20-12 34 0 M68 142 q-6-18 6-26" stroke="#7A9A6B" stroke-width="4" fill="none" stroke-linecap="round"/>',
  montanha: (u) => fundoArte(u, '#DCEFF8', '#F7FBFD') + '<path d="M0 200 L90 90 L150 160 L230 60 L330 170 L400 120 V260 H0Z" fill="#9FB7C9"/>' +
    '<path d="M230 60 L254 88 L240 84 L226 96 L214 80Z" fill="#FFFFFF"/><path d="M0 220 Q140 170 260 210 T400 200 V260 H0Z" fill="#8FB59A"/>' +
    '<path d="M0 240 Q160 214 400 236 V260 H0Z" fill="#6E9A7C"/>',
  'por-do-sol': (u) => fundoArte(u, '#FFC9A3', '#FFF1DC') + '<circle cx="200" cy="168" r="46" fill="#FF9F6E" opacity=".9"/>' +
    '<rect y="168" width="400" height="92" fill="#3F7EA6"/><path d="M120 182h160M150 196h100M175 210h50" stroke="#FFC9A3" stroke-width="4" stroke-linecap="round" opacity=".7"/>',
  cidade: (u) => fundoArte(u, '#E3F5FC', '#FFFFFF') + [[20, 120, 50], [80, 90, 40], [130, 140, 60], [200, 70, 45], [255, 110, 55], [320, 95, 60]]
    .map(([x, y, w]) => '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + (260 - y) + '" rx="3" fill="#B8CBD8"/>' +
      Array.from({ length: 6 }, (_, i) => '<rect x="' + (x + 8) + '" y="' + (y + 12 + i * 22) + '" width="' + (w - 16) + '" height="8" rx="2" fill="#FFFFFF" opacity=".7"/>').join('')).join(''),
  cafe: (u) => fundoArte(u, '#F6EBDD', '#FFF9F2') + '<rect x="0" y="190" width="400" height="70" fill="#D9BFA0"/>' +
    '<path d="M150 120h90v40a45 45 0 0 1-90 0Z" fill="#FFFFFF"/><path d="M240 132q26 0 26 18t-26 18" stroke="#FFFFFF" stroke-width="8" fill="none"/>' +
    '<ellipse cx="195" cy="122" rx="45" ry="7" fill="#8B5E3C"/><path d="M178 100q-8-14 4-26M200 98q-8-14 4-26M222 100q-8-14 4-26" stroke="#C9B7A3" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<ellipse cx="195" cy="200" rx="80" ry="10" fill="#C9A884"/>',
  livro: (u) => fundoArte(u, '#EEF3F6', '#FFFFFF') + '<path d="M80 80 Q140 60 200 82 V210 Q140 190 80 208Z" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="2"/>' +
    '<path d="M320 80 Q260 60 200 82 V210 Q260 190 320 208Z" fill="#FFFFFF" stroke="#C9D3DA" stroke-width="2"/>' +
    [100, 116, 132, 148, 164].map((y) => '<path d="M100 ' + y + 'h82M218 ' + y + 'h82" stroke="#D5DEE4" stroke-width="3" stroke-linecap="round"/>').join(''),
  mesa: (u) => fundoArte(u, '#FDF1E4', '#FFFFFF') + '<ellipse cx="200" cy="190" rx="170" ry="40" fill="#E2C9A6"/>' +
    [[110, 180], [170, 196], [240, 194], [300, 178]].map(([x, y]) => '<ellipse cx="' + x + '" cy="' + y + '" rx="26" ry="9" fill="#FFFFFF"/>').join('') +
    [[90, 120], [150, 105], [250, 105], [310, 120]].map(([x, y]) => '<circle cx="' + x + '" cy="' + y + '" r="16" fill="#C9B7A3"/><path d="M' + (x - 24) + ' ' + (y + 52) + 'a24 26 0 0 1 48 0" fill="#9FC3D6"/>').join(''),
  corrida: (u) => fundoArte(u, '#D9F0F7', '#FFFFFF') + '<path d="M170 260 L190 120 H210 L230 260Z" fill="#B9C3CA"/><path d="M200 140v20M200 180v24M200 224v26" stroke="#FFFFFF" stroke-width="4"/>' +
    '<path d="M0 260 L170 120 L0 160Z" fill="#9CC5A1"/><path d="M400 260 L230 120 L400 150Z" fill="#9CC5A1"/><circle cx="320" cy="60" r="18" fill="#FFE2A8"/>',
  jardim: (u) => fundoArte(u, '#E7F4EC', '#FFFFFF') + '<rect y="200" width="400" height="60" fill="#9CC5A1"/>' +
    [[60, '#F6A6A6'], [120, '#FFD27A'], [180, '#B9A6F6'], [240, '#F6A6A6'], [300, '#9FD8EE'], [350, '#FFD27A']]
      .map(([x, c], i) => '<path d="M' + x + ' 200 v-' + (50 + (i % 3) * 18) + '" stroke="#6E9A7C" stroke-width="3"/><circle cx="' + x + '" cy="' + (150 - (i % 3) * 18) + '" r="11" fill="' + c + '"/>').join(''),
  ceu: (u) => fundoArte(u, '#1E3A5F', '#3C5E86') + Array.from({ length: 40 }, (_, i) => '<circle cx="' + ((i * 97) % 400) + '" cy="' + ((i * 53) % 180) + '" r="' + (1 + (i % 3) * .6) + '" fill="#FFFFFF" opacity="' + (.5 + (i % 4) * .12) + '"/>').join('') +
    '<circle cx="320" cy="60" r="20" fill="#F7F1D9"/><path d="M0 230 Q120 200 240 226 T400 214 V260 H0Z" fill="#14283F"/>',
  chuva: (u) => fundoArte(u, '#C9D6E0', '#E7EDF2') + Array.from({ length: 30 }, (_, i) => '<path d="M' + ((i * 41) % 400) + ' ' + ((i * 37) % 200) + ' l-6 18" stroke="#FFFFFF" stroke-width="2" opacity=".7" stroke-linecap="round"/>').join('') +
    '<rect x="20" y="20" width="360" height="220" fill="none" stroke="#FFFFFF" stroke-width="10"/><path d="M200 20v220M20 130h360" stroke="#FFFFFF" stroke-width="6"/>',
  igreja: (u) => fundoArte(u, '#E3F5FC', '#FFFFFF') + '<rect x="140" y="110" width="120" height="120" fill="#FFFFFF" stroke="#B8CBD8" stroke-width="3"/>' +
    '<path d="M130 112 L200 60 L270 112Z" fill="#B8CBD8"/><path d="M200 30v24M190 40h20" stroke="#7FA6BE" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M186 230v-40a14 14 0 0 1 28 0v40" fill="#9FD8EE"/><rect y="228" width="400" height="32" fill="#9CC5A1"/>',
  biblia: (u) => fundoArte(u, '#FFF6E5', '#FFFFFF') + '<path d="M200 40 L170 120 M200 40 L230 120 M200 40 L130 110 M200 40 L270 110" stroke="#FFE2A8" stroke-width="6" stroke-linecap="round" opacity=".8"/>' +
    '<path d="M90 130 Q145 112 200 132 V220 Q145 202 90 218Z" fill="#FFFFFF" stroke="#D9C9A6" stroke-width="2"/><path d="M310 130 Q255 112 200 132 V220 Q255 202 310 218Z" fill="#FFFFFF" stroke="#D9C9A6" stroke-width="2"/>' +
    '<path d="M196 132v92" stroke="#B85C5C" stroke-width="3"/>',
  comunidade: (u) => fundoArte(u, '#EAF6FB', '#FFFFFF') + Array.from({ length: 9 }, (_, i) => {
    const a = (i / 9) * Math.PI * 2, x = 200 + 110 * Math.cos(a), y = 140 + 50 * Math.sin(a);
    return '<circle cx="' + x.toFixed(0) + '" cy="' + (y - 18).toFixed(0) + '" r="12" fill="#C9B7A3"/><path d="M' + (x - 18).toFixed(0) + ' ' + (y + 18).toFixed(0) + 'a18 20 0 0 1 36 0" fill="' + ['#9FD8EE', '#F6C59A', '#B9D8B4'][i % 3] + '"/>';
  }).join('') + '<circle cx="200" cy="140" r="16" fill="#FFE2A8" opacity=".9"/>',
  vela: (u) => fundoArte(u, '#2B2A3A', '#43405A') + '<ellipse cx="200" cy="120" rx="70" ry="70" fill="#FFE2A8" opacity=".12"/>' +
    '<rect x="182" y="130" width="36" height="100" rx="4" fill="#F5EEDC"/><path d="M200 128 q-14-22 0-46 q14 24 0 46Z" fill="#FFC76E"/>',
  caminho: (u) => fundoArte(u, '#FFE8CC', '#FFFFFF') + '<path d="M150 260 Q190 180 200 110 Q210 180 250 260Z" fill="#E8D3B4"/>' +
    '<path d="M0 260 V170 Q100 140 190 112 L150 260Z" fill="#B9D8B4"/><path d="M400 260 V170 Q300 140 210 112 L250 260Z" fill="#B9D8B4"/><circle cx="200" cy="90" r="28" fill="#FFD9A0"/>'
};
// fundo em degradê (um id único por desenho, para várias cenas na mesma página)
let _arteN = 0;
function fundoArte(u, c1, c2) {
  return '<defs><linearGradient id="' + u + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
    '<rect width="400" height="260" fill="url(#' + u + ')"/>';
}
function arte(nome) {
  const f = ARTES[nome] || ARTES.praia;
  return '<svg class="arte" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + f('ag' + (++_arteN)) + '</svg>';
}
