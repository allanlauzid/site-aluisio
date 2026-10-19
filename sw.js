// Service worker do app (PWA). Estratégia "rede primeiro": sempre busca a versão nova do site;
// sem internet, usa a última cópia guardada. Assim uma atualização do site nunca fica presa no cache.
const CACHE = 'site-aluisio-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html', './manifest.webmanifest'])).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;  // banco de dados e outros sites: direto na rede
  e.respondWith(
    fetch(r).then((resp) => {
      if (resp.ok) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(r, copia)); }
      return resp;
    }).catch(() => caches.match(r, { ignoreSearch: true }).then((c) => c || caches.match('./index.html')))
  );
});
