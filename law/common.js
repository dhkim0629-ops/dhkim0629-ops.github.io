/* 노무그룹지노 · 회원사 전용 노동관계법령 개정 안내 — 공통 */
var SB_URL='https://vsbddasoslqmcvoppvuj.supabase.co', SB_KEY='sb_publishable__6dfg59E_kmUEO9nkLNA_Q_gxt1jidT';
var $=function(s,el){return (el||document).querySelector(s)}, $$=function(s,el){return Array.from((el||document).querySelectorAll(s))};
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function okUrl(u){return /^https:\/\//i.test(String(u||''))}
var mem={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}},del:function(k){try{localStorage.removeItem(k)}catch(e){}},
  sget:function(k){try{return sessionStorage.getItem(k)}catch(e){return null}},sset:function(k,v){try{sessionStorage.setItem(k,v)}catch(e){}},sdel:function(k){try{sessionStorage.removeItem(k)}catch(e){}}};
async function rpcCall(fn,args){
  var r=await fetch(SB_URL+'/rest/v1/rpc/'+fn,{method:'POST',headers:{'apikey':SB_KEY,'Content-Type':'application/json'},body:JSON.stringify(args||{})});
  var t=await r.text(),j=null;try{j=t?JSON.parse(t):null}catch(e){}
  if(!r.ok){var e=new Error((j&&j.message)||('서버 오류 (HTTP '+r.status+')'));e.code=j&&j.message;throw e}
  return j;
}
function toast(t){var el=$('#toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';document.body.appendChild(el)}el.textContent=t;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove('show')},2200)}

/* 날짜 */
var TODAY=(function(){var d=new Date();d.setHours(0,0,0,0);return d})();
function pd(s){if(!s||!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;var d=new Date(s+'T00:00:00');return isNaN(d)?null:d}
function dot(s){var d=pd(s);return d?d.getFullYear()+'.'+(d.getMonth()+1)+'.'+d.getDate()+'.':(s||'')}
function fmt(d){return d.getFullYear()+'.'+String(d.getMonth()+1).padStart(2,'0')+'.'+String(d.getDate()).padStart(2,'0')}
function ym(d){return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')}
function prep(o){
  o.dt=pd(o.date);
  if(!o.dt){o.s='tbd';o.sl='미확정';o.dd='국회 계류';o.diff=99999}
  else{var diff=Math.round((o.dt-TODAY)/864e5);o.diff=diff;
    if(diff<=0){o.s='done';o.sl='시행완료';o.dd='시행 중'}
    else if(diff<=60){o.s='soon';o.sl='곧 시행';o.dd='D-'+diff}
    else{o.s='plan';o.sl='시행예정';o.dd='D-'+diff}}
  return o;
}

/* 회사 정보(프로필)와 해당 여부 */
var SIZES=[['u5','5인 미만'],['5-49','5~49인'],['50-299','50~299인'],['300-499','300~499인'],['500+','500인 이상']];
var SIZE_MIN={'u5':1,'5-49':5,'50-299':50,'300-499':300,'500+':500};
var FLAGS=[['construction','건설업','건설업'],['foreign','외국인 근로자 고용','외국인 고용'],['subcontract','도급·하청을 주는 사업','도급 사업']];
var CONDS=['건설업','외국인 고용','도급 사업','500인 이상'];
var CATS=['근로시간·휴가','모성·육아','임금·퇴직','산업안전','4대보험·연금','외국인 고용','건설업','개인정보','제도·기타'];
var KINDS=['공포','시행','입법예고','행정예고','고시·지침','판례·해석','정책·발표'];
var KC={'공포':'#1F3864','시행':'#2f9e44','입법예고':'#e8590c','행정예고':'#f08c00','고시·지침':'#0b7285','판례·해석':'#7048e8','정책·발표':'#495057'};
function applies(o,P){
  P=P||{};
  if(o.cond==='건설업'&&!P.construction)return false;
  if(o.cond==='외국인 고용'&&!P.foreign)return false;
  if(o.cond==='도급 사업'&&!P.subcontract)return false;
  if(o.cond==='500인 이상'&&P.size!=='500+')return false;
  if(o.min_size&&P.size&&(SIZE_MIN[P.size]||0)<Number(o.min_size))return false;
  return true;
}
function profileText(P){
  P=P||{};var s=(SIZES.find(function(x){return x[0]===P.size})||[,'규모 미입력'])[1];
  var f=FLAGS.filter(function(x){return P[x[0]]}).map(function(x){return x[2]});
  return [s].concat(f.length?f:['건설·외국인·도급 해당 없음']);
}

/* 개정사항 상세 */
function detailHtml(o){
  return '<div class="art">'+esc(o.article)+'</div>'+
    '<div class="ba"><div class="bx bef"><h4>개정 전</h4>'+esc(o.before)+'</div><div class="arr">→</div><div class="bx aft"><h4>개정 후</h4>'+esc(o.after)+'</div></div>'+
    '<div class="tips"><div class="tip"><h4>실무상 유의사항</h4>'+esc(o.tips)+'</div><div class="frm"><h4>관련 서식·자료</h4>'+esc(o.forms)+'</div></div>';
}
function tagsHtml(o){
  return (o.cond?'<span class="tag c">'+esc(o.cond)+' 해당</span>':'')+(o.rules?'<span class="tag r">취업규칙 개정</span>':'')+(o.ref?'<span class="tag">참고</span>':'');
}
function bulletList(t){var ls=String(t||'').split('\n').map(function(x){return x.replace(/^\s*[•·\-]\s*/,'').trim()}).filter(Boolean);return ls.length?'<ul class="bl">'+ls.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':''}

/* ===== 인쇄·PDF (요약표 / 자세히) ===== */
function printDialog(opt){
  // opt: {who, mineItems, allItems, checks, mineLabel}
  var old=document.getElementById('prDlg');if(old)old.remove();
  var d=document.createElement('div');d.id='prDlg';d.className='prov';
  var hasMine=opt.mineItems&&opt.mineItems.length!==opt.allItems.length;
  d.innerHTML='<div class="prmd"><h3>🖨 인쇄 · PDF로 저장</h3>'+
    '<div class="prq"><b>범위</b><div class="seg" data-k="scope">'+(hasMine?'<button class="on" data-v="mine">'+esc(opt.mineLabel||'우리 회사 해당')+' '+opt.mineItems.length+'건</button>':'')+'<button class="'+(hasMine?'':'on')+'" data-v="all">전체 '+opt.allItems.length+'건</button></div></div>'+
    '<div class="prq"><b>형식</b><div class="seg" data-k="mode"><button class="on" data-v="sum">📋 요약표 <small>시행일·주요 내용·할 일, 1~3쪽</small></button><button data-v="det">📄 자세히 <small>개정 전·후, 유의사항까지</small></button></div></div>'+
    '<p class="prnote">「인쇄」를 누른 뒤 인쇄 창에서 대상(프린터)을 <b>「PDF로 저장」</b>으로 고르면 PDF 파일이 됩니다.</p>'+
    '<div class="pract"><button class="btn" data-x>취소</button><button class="btn pri" data-go>인쇄</button></div></div>';
  document.body.appendChild(d);
  var S={scope:hasMine?'mine':'all',mode:'sum'};
  d.querySelectorAll('.seg').forEach(function(sg){sg.onclick=function(e){var b=e.target.closest('button');if(!b)return;S[sg.dataset.k]=b.dataset.v;sg.querySelectorAll('button').forEach(function(x){x.classList.toggle('on',x===b)})}});
  d.addEventListener('mousedown',function(e){if(e.target===d)d.remove()});
  d.querySelector('[data-x]').onclick=function(){d.remove()};
  d.querySelector('[data-go]').onclick=function(){d.remove();printDoc(S.scope==='mine'?opt.mineItems:opt.allItems,S.mode,opt.who,opt.checks||{},S.scope==='mine'?(opt.mineLabel||'우리 회사 해당'):'전체')};
}
function printDoc(items,mode,who,checks,scopeLabel){
  var root=document.getElementById('printroot');if(!root){root=document.createElement('div');root.id='printroot';document.body.appendChild(root)}
  var stc={done:'#868e96',soon:'#d9480f',plan:'#1971c2',tbd:'#7048e8'};
  var mark=function(o){var c=checks['item:'+o.no];return c==='done'?'✓ 완료':c==='na'?'해당없음':c==='ask'?'상담요청':'☐'};
  var h='<div class="pcov"><img src="logo.png" alt=""><div><div class="pbr">NOMU GROUP JINO · 회원사 전용</div><h1>2026~2027 노동관계법령 개정 안내 '+(mode==='sum'?'(요약)':'(상세)')+'</h1>'+
    '<div class="pmt">'+(who?esc(who)+' · ':'')+esc(scopeLabel)+' '+items.length+'건 · 출력일 '+fmt(TODAY)+' · 법령 조사 기준일 2026.10.27. (이후 변경은 월별 업데이트 참고)</div></div></div>';
  if(mode==='sum'){
    h+='<table class="ptb"><colgroup><col style="width:13%"><col style="width:17%"><col style="width:36%"><col style="width:26%"><col style="width:8%"></colgroup><thead><tr><th>시행일</th><th>법령</th><th>주요 내용</th><th>회사가 할 일</th><th>확인</th></tr></thead><tbody>'+
      items.map(function(o){return '<tr><td class="c"><b>'+(o.dt?fmt(o.dt):'미정')+'</b><br><span class="pst" style="background:'+(stc[o.s]||'#1971c2')+'">'+esc(o.sl)+'</span></td><td>'+esc(o.law)+(o.cond?'<br><span class="pcd">'+esc(o.cond)+' 해당</span>':'')+(o.rules?'<br><span class="prl">취업규칙 개정</span>':'')+'</td><td>'+esc(o.summary)+'</td><td>'+esc(o.action)+'</td><td class="c">'+mark(o)+'</td></tr>'}).join('')+'</tbody></table>';
  }else{
    h+=items.map(function(o){return '<div class="pdc" style="border-left-color:'+(stc[o.s]||'#1971c2')+'"><div class="plw">'+(o.dt?fmt(o.dt):'미정')+' · '+esc(o.sl)+' · '+esc(o.law)+(o.cond?' · '+esc(o.cond)+' 해당':'')+(o.rules?' · 취업규칙 개정':'')+'<span class="pmk">'+mark(o)+'</span></div>'+
      '<div class="psm">'+esc(o.summary)+'</div><div class="pac"><b>회사가 할 일</b> · '+esc(o.action)+'</div><div class="par">'+esc(o.article)+'</div>'+
      '<div class="pg2"><div class="pbx pbef"><h5>개정 전</h5>'+esc(o.before)+'</div><div class="pbx paft"><h5>개정 후</h5>'+esc(o.after)+'</div></div>'+
      '<div class="pg2"><div class="pbx ptip"><h5>실무상 유의사항</h5>'+esc(o.tips)+'</div><div class="pbx pfrm"><h5>관련 서식·자료</h5>'+esc(o.forms)+'</div></div></div>'}).join('');
  }
  h+='<div class="pft">노무그룹지노 · 용산센트럴파크타워 업무동 1003호 · jinolabor@kakao.com · www.jinolabor.com — 본 자료는 회원사 전용으로 제공되며 외부 배포를 삼가 주시기 바랍니다.</div>';
  root.innerHTML=h;
  document.body.classList.add('printing');
  var done=function(){document.body.classList.remove('printing');window.removeEventListener('afterprint',done)};
  window.addEventListener('afterprint',done);
  var im=root.querySelector('img');var go=function(){setTimeout(function(){window.print()},60)};
  if(im&&!im.complete){im.onload=go;im.onerror=go}else go();
}
