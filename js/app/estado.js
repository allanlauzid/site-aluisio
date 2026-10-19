// COMPORTAMENTO — como o site reage (não contém textos do site).
// Atalho $, estado do site e temporizadores

const $ = (id) => document.getElementById(id);

// ---------- Estado ----------
const S = {
  perfil: 'profissional', ativo: null, rolou: false, baloes: false, baloesHover: false,
  aberto: false, hover: false, frente: 0, ponto: false, pulso: false,
  filtro: 'Todas', destaque: null, tela: 'palco', girando: false,
  barraOculta: false, animandoBarra: false, mouseBarra: false, lequePendente: false
};
const toque = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
let timers = [], tFechar = null, tBaloes = null, reaparicoes = 0, usouBaloes = false, feedScroll = 0;
const depois = (fn, ms) => timers.push(setTimeout(fn, ms));
const limpar = () => { timers.forEach(clearTimeout); timers = []; clearTimeout(tFechar); };
