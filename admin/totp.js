// PAINEL — TOTP (códigos de 6 dígitos que mudam a cada 30 s, padrão RFC 6238, o mesmo do Google Authenticator).
// Também: impressão digital SHA-256 da senha provisória. Usa o Web Crypto do navegador (sem bibliotecas).

const TOTP = (() => {
  const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  function base32(bytes) {
    let bits = 0, valor = 0, s = '';
    bytes.forEach((b) => { valor = (valor << 8) | b; bits += 8; while (bits >= 5) { s += B32[(valor >>> (bits - 5)) & 31]; bits -= 5; } });
    if (bits > 0) s += B32[(valor << (5 - bits)) & 31];
    return s;
  }
  function deBase32(s) {
    s = s.replace(/[\s=-]/g, '').toUpperCase();
    let bits = 0, valor = 0; const out = [];
    for (const c of s) { const i = B32.indexOf(c); if (i < 0) continue; valor = (valor << 5) | i; bits += 5; if (bits >= 8) { out.push((valor >>> (bits - 8)) & 255); bits -= 8; } }
    return new Uint8Array(out);
  }
  // Novo segredo: 20 bytes aleatórios (160 bits), em base32
  const novoSegredo = () => base32(Array.from(crypto.getRandomValues(new Uint8Array(20))));

  async function codigo(segredo, passo) {
    const chave = await crypto.subtle.importKey('raw', deBase32(segredo), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
    const msg = new ArrayBuffer(8), v = new DataView(msg);
    v.setUint32(0, Math.floor(passo / 4294967296)); v.setUint32(4, passo >>> 0);
    const h = new Uint8Array(await crypto.subtle.sign('HMAC', chave, msg));
    const o = h[19] & 15;
    const n = ((h[o] & 127) << 24) | (h[o + 1] << 16) | (h[o + 2] << 8) | h[o + 3];
    return String(n % 1000000).padStart(6, '0');
  }
  const passoAgora = () => Math.floor(Date.now() / 1000 / 30);

  // Confere o código aceitando 30 s antes/depois (relógio do celular um pouco adiantado/atrasado).
  // Devolve o passo usado (para não aceitar o mesmo código duas vezes) ou -1.
  async function conferir(segredo, digitado, ultimoPasso) {
    if (!/^\d{6}$/.test(digitado)) return -1;
    const agora = passoAgora();
    for (const d of [0, -1, 1]) {
      const p = agora + d;
      if (ultimoPasso && p <= ultimoPasso) continue;
      if (await codigo(segredo, p) === digitado) return p;
    }
    return -1;
  }
  // Endereço que o app autenticador entende (vira o QR code)
  const endereco = (segredo, apelido, emissor) =>
    'otpauth://totp/' + encodeURIComponent(emissor + ':' + apelido) + '?secret=' + segredo + '&issuer=' + encodeURIComponent(emissor) + '&algorithm=SHA1&digits=6&period=30';

  async function sha256(texto) {
    const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
    return Array.from(new Uint8Array(h)).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  const disponivel = () => !!(window.crypto && crypto.subtle);

  return { novoSegredo, codigo, conferir, endereco, sha256, passoAgora, disponivel };
})();
