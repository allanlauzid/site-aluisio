// Comportamento isolado do mock de Trajetória. Sem módulos nem rede.
const Trajetoria = (() => {
  let camada,espaco,modal,raf=0,ativo=false,ultimo=0,fase=0,indice=-1,pontos=[],total=0,inicio=0,extensao=1,w=0,h=0,anterior=0,alturaTexto=0,retorno=null,overflow='',media=matchMedia('not all');
  const esc = s => String(s || '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const caminho='M 120 310 C 1000 310 1200 310 1900 310 S 2900 180 3600 210 S 4700 360 5600 310 S 6700 210 7600 250 S 9000 380 10300 310 S 11600 200 12600 250 S 14000 310 15100 310';
  const temas=['indústria','finanças','ensino','gestão','estratégia','educação digital','formação contínua'];
  function desenho(x,i){return '<g transform="translate('+x+' 40)" stroke="#DCD8D0" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-130 170H130M-100 170V65L0 15L100 65V170M-120 65H120M-60 170V110H-20V170M20 170V110H60V170"/><path stroke="#9FD8EE" d="M-75 80H-40M-15 80H20M45 80H75M-15 35V55M-25 45H-5"/><text x="0" y="205" text-anchor="middle" stroke="none" fill="#5E6672" font-size="13" font-family="IBM Plex Sans">'+temas[i]+'</text></g>';}
  function pessoa(){return '<svg viewBox="0 0 140 330" aria-hidden="true"><ellipse cx="70" cy="324" rx="38" ry="4" fill="#1C2430" opacity=".09"/><g id="traj-corpo"><g class="traj-perna" data-membro="perna-b"><path d="M64 186L78 187L71 308L54 308Z" fill="#8B929A"/><path d="M54 304H72L85 315Q67 320 51 315Z" fill="#525D6A"/></g><g class="traj-braco" data-membro="braco-b"><path d="M58 86L70 88L78 184L66 187Z" fill="#9DA6B0"/><ellipse cx="72" cy="189" rx="6" ry="9" fill="#D9D6CF"/></g><path d="M56 82Q72 76 85 87L88 190H52Z" fill="#7F8B99"/><path d="M68 80L82 85L75 120Z" fill="#fff"/><path d="M75 87L80 91L76 128L71 122Z" fill="#00A3E0"/><g class="traj-perna" data-membro="perna-a"><path d="M53 185H72L73 307H55Z" fill="#697787"/><path d="M55 304H73L91 314Q75 320 53 316Z" fill="#3F4C5B"/></g><g class="traj-braco" data-membro="braco-a"><path d="M54 89Q62 84 67 93L65 181L52 181Z" fill="#8B97A5"/><ellipse cx="58" cy="187" rx="6" ry="9" fill="#D9D6CF"/></g><path d="M65 62H79V84H65Z" fill="#D9D6CF"/><path d="M55 35Q55 12 74 14Q91 15 89 38L94 47L87 51Q85 70 72 69Q55 66 55 35Z" fill="#D9D6CF"/><path d="M55 37Q49 12 69 9Q91 7 91 30L72 25L60 41Z" fill="#A9A397"/></g></svg>';}
  function montar(){
    parar();ativo=true;indice=-1;fase=0;anterior=0;
    espaco=document.createElement('section');espaco.className='traj-espaco';espaco.setAttribute('aria-label','Percurso da trajetória');$('conteudo').replaceChildren(espaco);
    modal=document.createElement('dialog');modal.className='traj-modal';document.body.append(modal);modal.addEventListener('close',restaurar);modal.addEventListener('cancel',()=>{});
    if(media.matches){espaco.className='traj-estatica';espaco.innerHTML=TRAJETORIA_MARCOS.map((m,i)=>'<article><div>'+esc(m.ano)+'</div><h2>'+esc(m.instituicao)+'</h2><p>'+esc(m.resumo)+'</p><button data-marco="'+i+'">Explorar experiência</button></article>').join('');espaco.querySelectorAll('button').forEach(b=>b.onclick=()=>abrir(+b.dataset.marco,b));return;}
    camada=document.createElement('div');camada.className='traj-camada';camada.innerHTML='<div class="traj-mundo" aria-hidden="true"><svg viewBox="0 0 16000 600"><path id="traj-curva" d="'+caminho+'" fill="none" stroke="#DCD8D0" stroke-width="2"/>'+temas.map((_,i)=>desenho(500+i*2200,i)).join('')+TRAJETORIA_MARCOS.map((m,i)=>'<g transform="translate('+(120+i*14980/(TRAJETORIA_MARCOS.length-1))+',310)"><circle r="5" fill="#3FB8E6"/><text y="28" text-anchor="middle" fill="#5E6672" font-size="13">'+esc(m.ano.split('–')[0])+'</text></g>').join('')+'</svg></div><div class="traj-pessoa">'+pessoa()+'</div><div class="traj-texto"><div class="traj-ano"></div><div class="traj-palavra"></div><h2></h2><p class="traj-cargo"></p><p class="traj-resumo"></p><span class="traj-aviso"></span><button class="traj-explorar" type="button">Explorar experiência</button></div><div class="traj-status"><button class="traj-anterior" aria-label="Marco anterior">←</button><span class="traj-contagem"></span><div class="traj-trilho"><div class="traj-progresso"></div></div><button class="traj-proximo" aria-label="Próximo marco">→</button><button class="traj-lista">Ver períodos</button></div>';
    document.querySelector('.palco').append(camada);
    const path=camada.querySelector('#traj-curva');total=path.getTotalLength();pontos=Array.from({length:1601},(_,i)=>{const p=path.getPointAtLength(total*i/1600);return {x:p.x,y:p.y};});
    camada.querySelectorAll('.traj-mundo svg > g').forEach((el,i)=>{if(i>=temas.length){const p=path.getPointAtLength(total*(i-temas.length)/(TRAJETORIA_MARCOS.length-1));el.setAttribute('transform','translate('+p.x+','+p.y+')');}});
    camada.querySelector('.traj-explorar').onclick=e=>{if(indice===TRAJETORIA_MARCOS.length){selecionar('contato');return;}abrir(indice,e.currentTarget);};
    camada.querySelector('.traj-anterior').onclick=()=>saltar(indice-1);camada.querySelector('.traj-proximo').onclick=()=>saltar(indice+1);camada.querySelector('.traj-lista').onclick=lista;
    window.addEventListener('scroll',solicitar,{passive:true});window.addEventListener('resize',medir);medir();
  }
  function medir(){w=innerWidth;h=document.querySelector('.palco').clientHeight;inicio=innerHeight*.18;extensao=Math.max(1,document.documentElement.scrollHeight-innerHeight-inicio);solicitar();}
  function solicitar(){if(ativo&&!raf)raf=requestAnimationFrame(quadro);}
  function quadro(t){
    raf=0;if(!ativo||!camada||modal.open)return;
    const bruto=Math.max(0,Math.min(1,(scrollY-inicio)/extensao));document.body.classList.toggle('traj-andando',scrollY>innerHeight*.10);
    const dt=Math.min(40,t-ultimo||16);ultimo=t;fase+=(bruto-fase)*(1-Math.exp(-dt/65));if(Math.abs(bruto-fase)<.00002)fase=bruto;
    const k=fase*1600,j=Math.min(1599,Math.floor(k)),f=k-j,a=pontos[j],b=pontos[j+1],x=a.x+(b.x-a.x)*f,y=a.y+(b.y-a.y)*f;
    const mobile=w<=760,px=w*(mobile?.51:.68)+Math.sin(fase*Math.PI*6)*(mobile?12:42),feet=h*(mobile?.705:.70)+Math.sin(fase*Math.PI*4)*(mobile?9:18),scale=mobile?Math.max(.20,Math.min(.60,h/1300,(feet-alturaTexto-26)/320)):Math.min(1,h/1000);
    camada.querySelector('.traj-mundo').style.transform='translate3d('+(px-x)+'px,'+(feet-y)+'px,0)';
    const delta=fase-anterior,passo=fase*total*.045,amplitude=Math.min(1,Math.abs(delta)*1800),direcao=delta<-.000001?-1:delta>.000001?1:0;
    if(direcao)camada.dataset.direcao=direcao;
    camada.querySelector('.traj-pessoa').style.transform='translate3d('+(px-70)+'px,'+(feet-330)+'px,0) scale('+scale+') scaleX('+(camada.dataset.direcao||1)+')';
    camada.querySelectorAll('[data-membro]').forEach(el=>{const n=el.dataset.membro,opp=n.endsWith('a')?1:-1,ang=Math.sin(passo)*opp*amplitude*(n.startsWith('perna')?23:16);el.style.transform='rotate('+ang+'deg)';});
    anterior=fase;
    const i=bruto>.987?TRAJETORIA_MARCOS.length:Math.min(TRAJETORIA_MARCOS.length-1,Math.floor(bruto/.987*TRAJETORIA_MARCOS.length));
    if(i!==indice)mostrar(i);
    camada.querySelector('.traj-progresso').style.transform='scaleX('+bruto+')';
    if(fase!==bruto)solicitar();
  }
  function mostrar(i){indice=i;const fim=i===TRAJETORIA_MARCOS.length,m=fim?{ano:'2026 →',palavra:'CONTINUIDADE',instituicao:'Uma trajetória em constante construção',cargo:'',resumo:'Experiência acadêmica, visão econômica e compromisso com o desenvolvimento de pessoas e instituições.'}:TRAJETORIA_MARCOS[i];
    for(const [sel,valor] of [['.traj-ano',m.ano],['.traj-palavra',m.palavra],['h2',m.instituicao],['.traj-cargo',m.cargo],['.traj-resumo',m.resumo]])camada.querySelector(sel).textContent=valor;
    const aviso=camada.querySelector('.traj-aviso');aviso.textContent=m.pendente?'Informações a confirmar':'';aviso.hidden=!m.pendente;
    camada.querySelector('.traj-explorar').textContent=fim?'Conversar com Aluísio':'Explorar experiência';camada.querySelector('.traj-contagem').textContent=fim?'Continua…':String(i+1).padStart(2,'0')+' / '+TRAJETORIA_MARCOS.length;
    camada.querySelector('.traj-anterior').disabled=i===0;camada.querySelector('.traj-proximo').disabled=fim;
    alturaTexto=camada.querySelector('.traj-texto').getBoundingClientRect().bottom;solicitar();
  }
  function saltar(i){i=Math.max(0,Math.min(TRAJETORIA_MARCOS.length,i));window.scrollTo({top:inicio+extensao*(i===TRAJETORIA_MARCOS.length?1:(i+.2)/TRAJETORIA_MARCOS.length*.987),behavior:media.matches?'instant':'smooth'});}
  function abrir(i,botao){const m=TRAJETORIA_MARCOS[i];if(!m)return;retorno=botao;modal.innerHTML='<button class="traj-fechar">Fechar ×</button><div class="traj-modal-interior"><div class="traj-modal-meta">'+esc(m.ano)+' · '+esc(m.palavra)+'</div><h2 id="traj-modal-titulo">'+esc(m.instituicao)+'</h2><p>'+esc(m.cargo)+'</p><p>'+esc(m.resumo)+'</p><p>'+esc(m.detalhes.replace(/\*\*/g,''))+'</p>'+(m.pendente?'<p class="traj-modal-nota">Mock em análise: informações fornecidas no prompt, com dados pendentes de confirmação.</p>':'')+'</div>';modal.setAttribute('aria-labelledby','traj-modal-titulo');modal.querySelector('button').onclick=()=>modal.close();overflow=document.body.style.overflow;document.body.style.overflow='hidden';modal.showModal();modal.scrollTop=0;}
  function restaurar(){document.body.style.overflow=overflow;if(retorno&&retorno.isConnected)retorno.focus({preventScroll:true});solicitar();}
  function lista(){retorno=camada.querySelector('.traj-lista');modal.innerHTML='<button class="traj-fechar">Fechar ×</button><div class="traj-modal-interior"><h2 id="traj-modal-titulo">Períodos da trajetória</h2>'+TRAJETORIA_MARCOS.map((m,i)=>'<p><button class="traj-explorar" data-ir="'+i+'">'+esc(m.ano)+' · '+esc(m.instituicao)+'</button></p>').join('')+'</div>';modal.setAttribute('aria-labelledby','traj-modal-titulo');modal.querySelector('.traj-fechar').onclick=()=>modal.close();modal.querySelectorAll('[data-ir]').forEach(b=>b.onclick=()=>{const i=+b.dataset.ir;modal.close();saltar(i);});overflow=document.body.style.overflow;document.body.style.overflow='hidden';modal.showModal();modal.scrollTop=0;}
  function parar(){ativo=false;cancelAnimationFrame(raf);raf=0;window.removeEventListener('scroll',solicitar);window.removeEventListener('resize',medir);if(modal){if(modal.open)modal.close();modal.remove();modal=null;}if(camada){camada.remove();camada=null;}document.body.classList.remove('traj-andando');}
  media.addEventListener('change',()=>{if(S.ativo==='trajetoria')montar();});
  return {montar,parar};
})();
