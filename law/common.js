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
