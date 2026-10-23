// COMPORTAMENTO — carrega, só quando precisam, os pedaços do site que a maioria dos visitantes nem abre.
// Assim a primeira visita baixa menos código. Cada grupo é baixado uma única vez (em paralelo) e roda na ordem certa.
//   carregar('projetos')            → devolve uma Promise que termina quando o grupo está pronto
//   carregar(['acervo','mocks'])    → vários grupos de uma vez
//   carregarTudo()                  → todos (o painel #admin lê os textos de todos eles)
// Para incluir um arquivo novo num grupo, acrescente o caminho na lista dele aqui embaixo ("@nome" = depende de outro grupo).

const SOB_DEMANDA = (() => {
  const GRUPOS = {
    camera: ['js/app/rolo.js', 'js/app/camera.js'],
    projetos: ['@camera', 'js/conteudo/projetos.js', 'js/app/projetos.js'],
    acervo: ['@camera', 'js/conteudo/cursos.js', 'js/conteudo/acervo.js', 'js/app/acervo.js'],
    trajetoria: ['js/conteudo/trajetoria.js', 'js/app/trajetoria.js'],
    mocks: ['@camera', 'js/desenhos/artes.js', 'js/conteudo/mocks-perfis.js', 'js/app/mocks-perfis.js']
  };
  const arquivos = {};   // caminho → Promise (um arquivo nunca é pedido duas vezes)

  function expandir(nome, vistos) {
    const saida = [];
    (GRUPOS[nome] || []).forEach((x) => {
      if (x.charAt(0) === '@') { if (vistos.indexOf(x) < 0) { vistos.push(x); expandir(x.slice(1), vistos).forEach((a) => saida.push(a)); } }
      else saida.push(x);
    });
    return saida;
  }
  function pedir(src) {
    if (arquivos[src]) return arquivos[src];
    arquivos[src] = new Promise((ok, erro) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;   // baixa em paralelo, mas executa na ordem em que foram pedidos
      s.onload = () => ok();
      s.onerror = () => { delete arquivos[src]; s.remove(); erro(new Error('Não foi possível carregar ' + src)); };
      document.head.appendChild(s);
    });
    return arquivos[src];
  }
  function carregar(grupos) {
    const lista = [];
    (Array.isArray(grupos) ? grupos : [grupos]).forEach((g) => expandir(g, []).forEach((a) => { if (lista.indexOf(a) < 0) lista.push(a); }));
    return Promise.all(lista.map(pedir));
  }
  return { carregar, carregarTudo: () => carregar(Object.keys(GRUPOS)) };
})();
