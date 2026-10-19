// COMPORTAMENTO — como o site reage (não contém textos do site).
// Página própria de cada publicação

// ---------- Imagem e avisos das publicações ----------
// img: arquivo em img/posts/ (sem img, mostra o desenho de "imagem") · fotoX: X vermelho por cima da foto
const XFOTO = '<svg class="x-foto" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M6 6L94 94M94 6L6 94"/></svg>';
function imagemPost(p) {
  if (!p.img) return ICONES.imagem;
  return '<img src="img/posts/' + p.img + '" alt="" loading="lazy" decoding="async">' + (p.fotoX ? XFOTO : '');
}
// avisos: observações em tags vermelhas (o site ainda está em análise)
function avisosPost(p) {
  return p.avisos && p.avisos.length ? '<div class="avisos">' + p.avisos.map((a) => '<span class="aviso">' + a + '</span>').join('') + '</div>' : '';
}

// ---------- Página do post ----------
function abrirPost(id) {
  const p = POSTS.find((x) => x.id === id);
  feedScroll = window.scrollY;
  S.tela = 'post';
  $('post').innerHTML =
    '<div><button type="button" class="link-btn foco" id="voltar" style="font-weight:400">' + ICONES.voltar + 'Voltar às novidades</button></div>' +
    '<div class="card-meta">' + p.tags.map((t) => '<span class="tag">' + t + '</span>').join('') + '<span class="data">' + p.data + '</span></div>' +
    '<h1>' + p.titulo + '</h1>' + avisosPost(p) + '<div class="card-img" aria-hidden="true">' + imagemPost(p) + '</div>' +
    (p.paragrafos || [p.resumo]).map((t) => '<p>' + t + '</p>').join('');
  $('voltar').addEventListener('click', voltarPalco);
  atualizar();
  window.scrollTo(0, 0);
}
function voltarPalco() {
  S.tela = 'palco';
  atualizar();
  window.scrollTo(0, feedScroll);
}
