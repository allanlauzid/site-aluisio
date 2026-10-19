// PAINEL — onde os dados do painel ficam guardados.
// HOJE: só neste navegador (localStorage). Cada computador/celular tem os seus próprios cadastros e rascunhos.
// DEPOIS: trocar as funções abaixo por chamadas ao Supabase (mesmos nomes), sem mexer no resto do painel.
//   dispositivos → tabela admin_dispositivos (apelido, segredo cifrado, criado, ultimo_acesso) — segredo só no servidor
//   acessos      → tabela admin_acessos (quando, apelido, metodo)
//   rascunhos    → tabelas de conteúdo (posts, trajetoria, projetos, ...) com status rascunho/publicado

const BANCO = (() => {
  const P = 'admin-';
  const ler = (k, padrao) => { try { const v = localStorage.getItem(P + k); return v == null ? padrao : JSON.parse(v); } catch (e) { return padrao; } };
  const gravar = (k, v) => { try { localStorage.setItem(P + k, JSON.stringify(v)); return true; } catch (e) { return false; } };
  const conectado = () => !!(ADMIN_CONFIG.banco.supabaseUrl && ADMIN_CONFIG.banco.supabaseChavePublica);

  return {
    conectado,
    // ---- acesso ----
    dispositivos: () => ler('dispositivos', []),
    salvarDispositivos: (l) => gravar('dispositivos', l),
    senhaHash: () => ler('senha-hash', ADMIN_CONFIG.senhaProvisoriaSHA256),
    salvarSenhaHash: (h) => gravar('senha-hash', h),
    senhaLigada: () => ler('senha-ligada', true),
    ligarSenha: (v) => gravar('senha-ligada', !!v),
    tentativas: () => ler('tentativas', { erros: 0, ate: 0 }),
    salvarTentativas: (t) => gravar('tentativas', t),
    acessos: () => ler('acessos', []),
    registrarAcesso: (apelido, metodo) => { const l = ler('acessos', []); l.unshift({ quando: Date.now(), apelido, metodo }); gravar('acessos', l.slice(0, 30)); },
    // ---- conteúdo (rascunhos por seção) ----
    rascunho: (secao) => ler('rascunho-' + secao, null),
    salvarRascunho: (secao, itens) => gravar('rascunho-' + secao, { itens, quando: Date.now() }),
    descartarRascunho: (secao) => { try { localStorage.removeItem(P + 'rascunho-' + secao); } catch (e) { /* nada */ } },
    secoesComRascunho: () => { const l = []; try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.indexOf(P + 'rascunho-') === 0) l.push(k.slice((P + 'rascunho-').length)); } } catch (e) { /* nada */ } return l; }
  };
})();
