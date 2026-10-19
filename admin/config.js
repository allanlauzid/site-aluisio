// PAINEL ADMINISTRATIVO — ajustes (19/10/2026)
// Endereço secreto: index.html#admin  (no site publicado: https://.../#admin)
//
// ATENÇÃO — ESTRUTURA PROVISÓRIA, NÃO É SEGURA PARA PUBLICAR:
// - Sem banco de dados, a senha e os códigos TOTP são conferidos no próprio navegador e guardados nele.
//   Quem abrir os arquivos do site consegue contornar. Antes de publicar, a conferência tem de ir para o
//   servidor (Supabase: função que confere o código e devolve uma sessão curta). Ver ADMIN.banco abaixo.

const ADMIN_CONFIG = {
  // Senha provisória (hoje: "aluisio"). Guardada só como "impressão digital" (SHA-256 de 'site-aluisio:' + senha).
  // Dentro do painel (Acesso) dá para trocar a senha ou desligá-la depois de cadastrar um celular com TOTP.
  senhaProvisoriaSHA256: '7a7684b4f1ca4c8e57a934ffdcbdfbcc1c519ad2cc6c6cf850614f8b16ead07b',
  sessaoMinutos: 30,          // sem mexer no painel por esse tempo, pede o código de novo
  maxTentativas: 5,           // erros seguidos antes de bloquear
  bloqueioMinutos: 15,
  emissorTOTP: 'Site Aluísio', // nome que aparece no app autenticador

  // Banco de dados (preencher quando existir). Enquanto vazio, tudo fica salvo só neste navegador.
  banco: {
    supabaseUrl: '',          // [URL do projeto Supabase]
    supabaseChavePublica: '', // [chave publishable/anon]
    funcaoLogin: ''           // [nome da Edge Function que confere senha/TOTP]
  }
};
