// DESENHOS — ícones e ilustrações em SVG, usados pelo site.
// Ícones da barra, do contato e das setas

// ---------- Ícones ----------
const svg = (inner, extra = '') => '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + extra + '>' + inner + '</svg>';
const ICONES = {
  trajetoria: svg('<circle cx="5.5" cy="18.5" r="2"/><circle cx="18.5" cy="5.5" r="2"/><path d="M7.5 18.5h6a3 3 0 0 0 0-6h-3a3 3 0 0 1 0-6h6"/>'),
  novidades: svg('<rect x="3" y="4.5" width="13.5" height="15" rx="2"/><path d="M16.5 9H20v8.5a2 2 0 0 1-2 2"/><path d="M6.5 9h6.5M6.5 12.5h6.5M6.5 16h4"/>'),
  projetos: svg('<path d="M3 20h18"/><rect x="5" y="12" width="3.2" height="6" rx="0.6"/><rect x="10.4" y="8" width="3.2" height="10" rx="0.6"/><rect x="15.8" y="4" width="3.2" height="14" rx="0.6"/>'),
  acervo: svg('<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9"/><path d="M10 13h4"/>'),
  contato: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/>'),
  galeria: svg('<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>'),
  calendario: svg('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/><path d="M8.5 14h2M13.5 14h2M8.5 17h2"/>'),
  videos: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4.5-2.5z"/>'),
  mensagens: svg('<path d="M12 6.5c-2-1.6-5-2-8-1.5v13c3-.5 6-.1 8 1.5 2-1.6 5-2 8-1.5V5c-3-.5-6-.1-8 1.5z"/><path d="M12 6.5V20"/><path d="M15 9.5h2.5M6.5 9.5H9"/>'),
  vazio: svg('<circle cx="12" cy="12" r="8"/>', ' stroke-dasharray="2.5 3"'),
  insta: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5F80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.8"/></svg>',
  linkedin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5F80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5v6"/><path d="M8 7.6v.1"/><path d="M12 16.5v-6"/><path d="M12 13a2.5 2.5 0 0 1 5 0v3.5"/></svg>',
  facebook: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5F80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v4h3v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3V3h-3a5 5 0 0 0-5 5v2H7"/></svg>',
  email: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0B5F80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>',
  imagem: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#A9A397" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>',
  mouse: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#062B3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="3" width="10" height="16" rx="5"/><path class="roda" d="M12 7v2.5"/></svg>',
  dedo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#062B3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g class="dedo"><circle cx="12" cy="14" r="3.2"/><path d="M12 9.5V4.5M9.5 7l2.5-2.5L14.5 7"/></g></svg>',
  seta: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  voltar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>'
};
