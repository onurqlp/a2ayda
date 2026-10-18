/* AYDA A2 Komple Alıştırmalar: mevcut AYDA_UNITS ve 576 alıştırmayı değiştirmeden kullanan bağımsız çalışma yüzeyi. */
(()=>{"use strict";
const units=Array.isArray(window.AYDA_UNITS)?window.AYDA_UNITS:[];
const $=(s,base=document)=>base.querySelector(s);
const escape=s=>String(s??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
const app=$("#app"),dialog=$("#videoDialog"),KEY="ayda_a2_express_progress_v1";
const TOTAL=576;
let records={};try{const saved=JSON.parse(localStorage.getItem(KEY)||"{}");if(saved&&typeof saved==="object"&&!Array.isArray(saved))records=saved}catch{}
let state={mode:"units",unit:0,question:0,selectedChoice:null,tokenIndices:[],answer:"",feedback:null,search:"",showHint:false};
const getKey=(u,q)=>"u"+u+"-"+q;
const get=(u,q)=>records[getKey(u,q)]||null;
const allCount=()=>Object.keys(records).filter(k=>records[k]&&["correct","wrong","self"].includes(records[k].status)).length;
const percent=()=>Math.round(allCount()/TOTAL*100);
const unitCount=u=>Array.from({length:24},(_,i)=>get(u,"q"+String(i+1).padStart(2,"0"))).filter(x=>x&&["correct","wrong","self"].includes(x.status)).length;
const wrongEntries=()=>Object.entries(records).filter(([,v])=>v&&v.status==="wrong").map(([key,v])=>{const m=key.match(/^u(\d+)-(q\d+)$/);return m?{unit:+m[1],question:m[2],value:v}:null}).filter(Boolean);
function save(u,q,status,value){records[getKey(u,q)]={status,value,at:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(records))}catch{notify("İlerleme bu cihazda kaydedilemedi.")}updateCounters()}
function normalize(v){return String(v??"").toLocaleLowerCase("de-DE").trim().replaceAll("ä","ae").replaceAll("ö","oe").replaceAll("ü","ue").replaceAll("ß","ss").replace(/[.,!?;:()„“"']/g,"").replace(/\s+/g," ")}
function notify(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(notify.timeout);notify.timeout=setTimeout(()=>el.classList.remove("show"),3200)}
function updateCounters(){const n=allCount();$("#globalCounter").textContent=n+" / "+TOTAL;$("#heroPercent").textContent=percent()+"%";$("#heroBar").style.width=percent()+"%";$("#reviewCount").textContent=wrongEntries().length}
function route(){const hash=decodeURIComponent(location.hash.slice(1));let m=hash.match(/^unit\/(\d+)(?:\/(\d+))?$/);if(m&&+m[1]>=1&&+m[1]<=24){state.mode="unit";state.unit=+m[1];state.question=Math.min(23,Math.max(0,(+m[2]||1)-1));}else if(hash==="review"){state.mode="review"}else if(hash==="help"){state.mode="help"}else state.mode="units";restore();render();window.scrollTo({top:0,behavior:"instant"})}
function navigate(mode,u,q){let target=mode==="unit"?"unit/"+u+"/"+q:mode==="review"?"review":mode==="help"?"help":"";if(location.hash==="#"+target){route()}else location.hash=target}
function restore(){state.selectedChoice=null;state.tokenIndices=[];state.answer="";state.feedback=null;state.showHint=false;if(state.mode!=="unit")return;let u=units[state.unit-1],q=u?.exercises?.[state.question];if(!q)return;let rec=get(u.id,q.id);if(!rec)return;if(q.type==="choice")state.selectedChoice=Number.isInteger(rec.value)?rec.value:null;if(q.type==="order")state.tokenIndices=Array.isArray(rec.value)?rec.value:[];if(q.type==="text"||q.type==="self")state.answer=String(rec.value??"")}
function render(){updateCounters();for(const btn of document.querySelectorAll(".mode-btn")){const active=btn.dataset.mode===(state.mode==="unit"?"units":state.mode);btn.classList.toggle("active",active);active?btn.setAttribute("aria-current","page"):btn.removeAttribute("aria-current")}
 if(units.length!==24||units.some(u=>u.exercises?.length!==24)){app.innerHTML='<div class="empty"><h3>İçerik yüklenemedi</h3><p>Lütfen sayfayı yenileyin. A2 ders dosyaları eksik olabilir.</p></div>';return}
 if(state.mode==="unit")return renderUnit();
 if(state.mode==="review")return renderReview();
 if(state.mode==="help")return renderHelp();
 renderUnits()
}
function renderUnits(){
 const cards=units.filter(u=>(u.title+" "+u.topic+" "+u.grammar+" "+u.id).toLocaleLowerCase("tr-TR").includes(state.search.toLocaleLowerCase("tr-TR"))).map(u=>{const count=unitCount(u.id);return '<button type="button" class="unit-card '+(count===24?'complete':'')+'" data-unit="'+u.id+'"><span class="unit-meta"><span>'+(u.id<=12?"A2.1":"A2.2")+' · ÜNİTE '+String(u.id).padStart(2,"0")+'</span><span>'+count+'/24</span></span><strong>'+escape(u.title)+'</strong><span class="topic">'+escape(u.topic)+' · '+escape(u.grammar)+'</span><span class="mini-track"><span style="width:'+(count/24*100)+'%"></span></span></button>'}).join("");
 app.innerHTML='<div class="toolbar"><div><h2>Üniteler</h2><p>24 ünite · her ünitede 24 farklı çalışma · konuyu hatırla ve uygula.</p></div><input id="unitSearchExpress" class="search" type="search" value="'+escape(state.search)+'" placeholder="Ünite veya konu ara…" aria-label="Ünite ara"></div><div class="unit-grid">'+(cards||'<p>Aramanızla eşleşen ünite bulunamadı.</p>')+'</div>';
 const input=$("#unitSearchExpress");const end=input.value.length;if(state.search&&document.activeElement?.id==="unitSearchExpress"){input.focus();input.setSelectionRange(end,end)}
}
function renderUnit(){
 const u=units[state.unit-1],q=u.exercises[state.question];const count=unitCount(u.id);
 const picks=u.exercises.map((item,i)=>{const status=get(u.id,item.id)?.status||"";return '<button type="button" data-q="'+(i+1)+'" title="Soru '+(i+1)+'" class="'+(i===state.question?'current ':status)+'">'+(i+1)+'</button>'}).join("");
 const examples=(u.examples||[]).map(ex=>'<li><span lang="de">'+escape(ex)+'</span><button type="button" class="speak" data-speak="'+escape(ex)+'" aria-label="Almanca örneği dinle">▶ Dinle</button></li>').join("");
 const videos=(u.videos||[]).map((v,i)=>'<button type="button" data-video="'+i+'">▷ '+escape(v.label||"Ders videosu")+'</button>').join("");
 app.innerHTML='<article class="sheet"><header class="sheet-header"><div class="sheet-headtop"><span class="crumb">'+(u.id<=12?'A2.1':'A2.2')+' / Ünite '+String(u.id).padStart(2,'0')+' · '+count+'/24 tamamlandı</span><button type="button" class="quiet-btn" data-back>← Üniteler</button></div><h2>'+escape(u.title)+'</h2><p class="unit-sub">'+escape(u.topic)+' · '+escape(u.grammar)+'</p></header>'+
 '<section class="lesson"><div class="lesson-kicker">KONU HATIRLATMA · TÜRKÇE</div><h3>'+escape(u.grammar)+'</h3><p>'+escape(u.summary)+'</p><div class="logic"><b>Mantığı</b><p>'+escape(u.logic)+'</p></div><ul class="example-list">'+examples+'</ul><div class="lesson-extra">'+videos+'</div></section>'+
 '<section class="question-section"><div class="q-toolbar"><h3>Alıştırmalar</h3><span class="q-counter">Soru '+(state.question+1)+' / 24</span></div><div class="q-picker" aria-label="Sorular">'+picks+'</div>'+renderQuestion(q)+'</section><footer class="sheet-bottom"><button class="secondary" type="button" data-prev '+(state.question===0?'disabled':'')+'>← Önceki</button><button class="primary" type="button" data-next>'+ (state.question===23?(u.id===24?'Ünitelere dön':'Sonraki ünite →'):'Sonraki soru →')+'</button></footer></article>';
}
function renderQuestion(q){
 let content='';
 if(q.context)content+='<div class="context" lang="de">'+escape(q.context)+'</div>';
 if(q.visual)content+='<div class="visual" aria-label="Görsel ipucu">'+escape(q.visual)+'</div>';
 if(q.table)content+='<div class="context">'+q.table.map(line=>line.map(escape).join(' : ')).join('<br>')+'</div>';
 if(q.type==="choice")content+='<div class="choices">'+q.options.map((v,i)=>'<button type="button" class="choice '+(state.selectedChoice===i?'selected':'')+'" data-choice="'+i+'" aria-pressed="'+(state.selectedChoice===i)+'"><span class="key">'+String.fromCharCode(65+i)+'</span><span>'+escape(v)+'</span></button>').join('')+'</div>';
 else if(q.type==="order"){const answer=state.tokenIndices.map(i=>'<button type="button" class="token" data-undo="'+i+'">'+escape(q.tokens[i])+' ×</button>').join("");const pool=q.tokens.map((token,i)=>'<button type="button" class="token" data-token="'+i+'" '+(state.tokenIndices.includes(i)?'disabled':'')+'>'+escape(token)+'</button>').join("");content+='<div class="kicker">Seçilen kelimeler</div><div class="token-answer">'+(answer||'<span style="color:#7a8b9c">Kelimeleri aşağıdan sırayla seç.</span>')+'</div><div class="kicker">Kelime havuzu</div><div class="token-pool">'+pool+'</div><button type="button" data-clear class="quiet-btn">↺ Sıfırla</button>'}
 else if(q.type==="self")content+='<textarea class="answer-area" id="studentAnswer" placeholder="Kendi cümleni yaz…" aria-label="Almanca yazılı cevabın">'+escape(state.answer)+'</textarea>';
 else content+='<input class="answer-input" id="studentAnswer" autocomplete="off" spellcheck="false" placeholder="'+escape(q.placeholder||"Almanca cevabını yaz")+'" value="'+escape(state.answer)+'" aria-label="Almanca cevabın">';
 let foot=state.feedback?renderFeedback(q,state.feedback):'';
 return '<div class="question"><div class="question-head"><span class="kind">'+escape(q.kind||"Alıştırma")+'</span><span class="crumb">'+String(state.question+1).padStart(2,"0")+' / 24</span></div><h4>'+escape(q.prompt)+'</h4>'+content+'<div class="q-actions"><button type="button" class="primary" data-check>'+(q.type==="self"?'Örnek cevabı gör':'Cevabı kontrol et')+'</button><button type="button" class="secondary" data-hint>İpucu</button>'+(q.type==="self"?'':'<button type="button" class="secondary" data-reveal>Doğru cevap</button>')+'</div>'+(state.showHint?'<div class="feedback"><strong>İpucu</strong>'+escape(state.mode==="unit"?units[state.unit-1].logic:"Önce özne ve yüklemi belirle.")+'</div>':'')+foot+'</div>';
}
function correctAnswer(q){if(q.type==="choice")return String(q.options?.[q.answer]??"");if(q.type==="order")return String(q.answerText??"");if(q.type==="self")return String(q.model??"");return (q.answers||[]).join(" / ")}
function renderFeedback(q,f){
 const title=f.status==="correct"?"Doğru cevap!":f.status==="wrong"?"Tekrar dene":f.status==="self"?"Örnek cevap":"Cevap ve açıklama";
 const detail=f.status==="self"?'<p>Kendi cümleni örnekle karşılaştır. Aynı kelimeleri kullanmak zorunda değilsin.</p><div class="q-actions"><button class="primary" type="button" data-self="self">Çalıştım, tamam</button><button class="secondary" type="button" data-self="wrong">Tekrar listeme ekle</button></div>':"";
 return '<div class="feedback '+(f.status==="correct"?"good":f.status==="wrong"?"bad":"")+'" role="status"><strong>'+title+'</strong><div><b>Doğru cevap:</b> '+escape(correctAnswer(q))+'</div><div><b>Açıklama:</b> '+escape(q.explanation||"Konu hatırlatmasındaki mantıkla karşılaştır.")+'</div>'+detail+'</div>';
}
function selectedQuestion(){return units[state.unit-1]?.exercises?.[state.question]}
function showQuestion(){const q=selectedQuestion();const host=$(".question");if(host&&q)host.outerHTML=renderQuestion(q);for(const b of document.querySelectorAll(".q-picker button")){const index=+b.dataset.q-1;b.classList.toggle("current",index===state.question)}}
function grade(reveal=false){
 const q=selectedQuestion();if(!q)return;
 if(q.type==="self"){state.feedback={status:"self"};showQuestion();return}
 let answer,ok=false;
 if(q.type==="choice"){answer=state.selectedChoice;if(answer===null&&!reveal){notify("Önce bir seçenek seç.");return}ok=answer===q.answer}
 else if(q.type==="order"){answer=state.tokenIndices.slice();if(!answer.length&&!reveal){notify("Önce kelimeleri sırala.");return}ok=normalize(answer.map(i=>q.tokens[i]).join(" "))===normalize(q.answerText)}
 else {answer=state.answer.trim();if(!answer&&!reveal){notify("Önce cevabını yaz.");return}ok=(q.answers||[]).some(x=>normalize(x)===normalize(answer))}
 if(!reveal)save(state.unit,q.id,ok?"correct":"wrong",answer);
 state.feedback={status:reveal?"reveal":ok?"correct":"wrong"};showQuestion();
 if(!reveal){document.querySelector('.q-picker [data-q="'+(state.question+1)+'"]')?.classList.add(ok?"correct":"wrong");if(ok)notify("Cevap doğru, devam edebilirsin.")}
}
function renderReview(){const entries=wrongEntries().sort((a,b)=>a.unit-b.unit||a.question.localeCompare(b.question));app.innerHTML='<div class="toolbar"><div><h2>Tekrar listem</h2><p>Yanlış cevaplanan sorular burada tutulur. Doğru çözdüğünde listeden çıkar.</p></div></div>'+(entries.length?'<div class="review-list">'+entries.map(e=>{const u=units[e.unit-1],i=u?.exercises.findIndex(x=>x.id===e.question)??-1;return '<div class="review-row"><span><b>Ünite '+e.unit+' · Soru '+(i+1)+'</b><small>'+escape(u?.title||"")+'</small></span><button type="button" class="primary" data-review-unit="'+e.unit+'" data-review-q="'+(i+1)+'">Tekrar çöz →</button></div>'}).join('')+'</div>':'<div class="empty"><h3>Tekrar listen boş.</h3><p>Yanlış yaptığın sorular otomatik burada görünecek.</p></div>')}
function renderHelp(){app.innerHTML='<section class="info-card"><h2>Nasıl kullanılır?</h2><p>Bu çalışma kitabı AYDA A2 derslerinin 24 ünitesini kapsar. Her üniteyi açtığında önce kısa Türkçe konu anlatımını, sonra 24 farklı alıştırmayı göreceksin.</p><p><b>1.</b> Almanca örneği dinle veya konuyu oku. <b>2.</b> Soruyu çöz. <b>3.</b> Cevabı kontrol et ve açıklamayı oku. <b>4.</b> Yanlışlarını Tekrar listem bölümünden yeniden çöz.</p><p>Yanıtların yalnızca bu cihazın tarayıcısında tutulur. Bu çalışma kitabındaki ilerleme ana A2 ders sitesindeki ilerlemeden ayrıdır. Açık uçlu yazma sorularında otomatik değerlendirme yerine örnek cevap sunulur.</p><p><button class="primary" type="button" data-mode="units">Üniteleri aç →</button></p></section>'}
function speak(value){if(!("speechSynthesis" in window)){notify("Bu cihazda Almanca seslendirme desteklenmiyor.");return}try{speechSynthesis.cancel();const msg=new SpeechSynthesisUtterance(value);msg.lang="de-DE";msg.rate=.86;speechSynthesis.speak(msg)}catch{notify("Seslendirme başlatılamadı.")}}
function videoUrl(raw){const s=String(raw||"");const m=s.match(/drive\.google\.com\/file\/d\/([^/]+)/);if(m)return "https://drive.google.com/file/d/"+encodeURIComponent(m[1])+"/preview";const y=s.match(/youtu\.be\/([^?&#/]+)/)||s.match(/[?&]v=([^?&#/]+)/);if(y)return "https://www.youtube-nocookie.com/embed/"+encodeURIComponent(y[1]);return s.startsWith("https://")?s:""}
function playVideo(i){const u=units[state.unit-1],v=u?.videos?.[i];if(!v)return;const url=videoUrl(v.url);if(!url){notify("Video bağlantısı geçersiz.");return}$("#videoLabel").textContent=v.label||"Ders videosu";const iframe=document.createElement("iframe");iframe.src=url;iframe.title=v.label||"Ders videosu";iframe.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";iframe.referrerPolicy="strict-origin-when-cross-origin";iframe.loading="lazy";$("#videoBody").replaceChildren(iframe);if(dialog.showModal)dialog.showModal();else dialog.setAttribute("open","")}
function closeVideo(){dialog.close?.();dialog.removeAttribute("open");$("#videoBody").replaceChildren()}
document.addEventListener("click",e=>{
 const b=e.target.closest("button");if(!b)return;
 if(b.dataset.mode){navigate(b.dataset.mode);return}
 if(b.dataset.unit){navigate("unit",+b.dataset.unit,1);return}
 if(b.hasAttribute("data-back")){navigate("units");return}
 if(b.dataset.q){navigate("unit",state.unit,+b.dataset.q);return}
 if(b.hasAttribute("data-prev")){if(state.question>0)navigate("unit",state.unit,state.question);return}
 if(b.hasAttribute("data-next")){if(state.question<23)navigate("unit",state.unit,state.question+2);else if(state.unit<24)navigate("unit",state.unit+1,1);else navigate("units");return}
 if(b.dataset.choice!==undefined){state.selectedChoice=+b.dataset.choice;state.feedback=null;showQuestion();return}
 if(b.dataset.token!==undefined){const index=+b.dataset.token;if(!state.tokenIndices.includes(index))state.tokenIndices.push(index);state.feedback=null;showQuestion();return}
 if(b.dataset.undo!==undefined){const i=state.tokenIndices.indexOf(+b.dataset.undo);if(i>=0)state.tokenIndices.splice(i,1);state.feedback=null;showQuestion();return}
 if(b.hasAttribute("data-clear")){state.tokenIndices=[];state.feedback=null;showQuestion();return}
 if(b.hasAttribute("data-check")){grade(false);return}
 if(b.hasAttribute("data-reveal")){grade(true);return}
 if(b.hasAttribute("data-hint")){state.showHint=!state.showHint;showQuestion();return}
 if(b.dataset.self){const q=selectedQuestion();save(state.unit,q.id,b.dataset.self,state.answer);state.feedback={status:b.dataset.self==="self"?"self":"wrong"};showQuestion();notify(b.dataset.self==="self"?"Çalışma kaydedildi.":"Tekrar listene eklendi.");return}
 if(b.dataset.speak){speak(b.dataset.speak);return}
 if(b.dataset.video!==undefined){playVideo(+b.dataset.video);return}
 if(b.dataset.reviewUnit){navigate("unit",+b.dataset.reviewUnit,+b.dataset.reviewQ);return}
});
document.addEventListener("input",e=>{if(e.target.id==="unitSearchExpress"){state.search=e.target.value;const pos=e.target.selectionStart;renderUnits();const box=$("#unitSearchExpress");box.focus();box.setSelectionRange(pos,pos);return}if(e.target.id==="studentAnswer"){state.answer=e.target.value;state.feedback=null}});
$("#closeVideo").addEventListener("click",closeVideo);dialog.addEventListener("click",e=>{if(e.target===dialog)closeVideo()});dialog.addEventListener("close",()=>$("#videoBody").replaceChildren());
window.addEventListener("hashchange",route);
updateCounters();route();
})();