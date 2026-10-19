// PWA (app instalável) — só é ligado a partir do painel (#admin), e só no site publicado (https ou localhost).
// O app instalado abre direto no painel (start_url = ./#admin, em manifest.webmanifest); o botão "Site" leva ao site.
// Visitantes comuns não recebem o manifesto, então o site não oferece "instalar" para eles.
// Aberto com dois cliques (file://) o navegador não aceita app instalável: nada é feito, sem erros.

const PWA = (() => {
  const web = /^https?:$/.test(location.protocol);
  let ligado = false, convite = null;
  const instalado = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

  function cabeca(tag, attrs) { const e = document.createElement(tag); Object.keys(attrs).forEach((k) => e.setAttribute(k, attrs[k])); document.head.append(e); }
  function ligar() {
    if (ligado || !web) return;
    ligado = true;
    cabeca('link', { rel: 'manifest', href: 'manifest.webmanifest' });
    cabeca('meta', { name: 'theme-color', content: '#3FB8E6' });
    cabeca('link', { rel: 'apple-touch-icon', href: 'img/app/icone-180.png' });
    cabeca('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' });
    cabeca('meta', { name: 'mobile-web-app-capable', content: 'yes' });
    cabeca('meta', { name: 'apple-mobile-web-app-title', content: 'Aluísio' });
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => { /* sem app offline */ });
  }
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); convite = e; if (typeof PAINEL !== 'undefined') PAINEL.atualizar(); });
  window.addEventListener('appinstalled', () => { convite = null; if (typeof PAINEL !== 'undefined') PAINEL.atualizar(); });

  return {
    ligar,
    estado: () => (instalado() ? 'instalado' : convite ? 'pode' : 'navegador'),
    instalar: () => (convite ? convite.prompt().then(() => convite.userChoice).finally(() => { convite = null; }) : Promise.resolve())
  };
})();
