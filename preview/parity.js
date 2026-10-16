/* AYDA A2 · Shared A1/B1 interface shell
 * Adds the same three-button top navigation, main-course catalog, course
 * progress and unit header. Original A2 engine, 576 questions, 72 video
 * records, passwords and saved progress are not changed.
 */
(()=>{
"use strict";
const $=(s,base=document)=>base.querySelector(s);
const $$=(s,base=document)=>Array.from(base.querySelectorAll(s));
const app=$("#app"),gate=$("#aydaProtectedContent");
if(!app||!gate)return;
const SOURCE=()=>Array.isArray(window.AYDA_UNITS)?window.AYDA_UNITS:[];
const getProgress=()=>{try{return JSON.parse(localStorage.getItem("ayda_a2_progress_v2")||"{}")}catch{return{}}};
const make=(tag,cls,txt)=>{
 const n=document.createElement(tag);
 if(cls)n.className=cls;
 if(txt!==undefined)n.textContent=txt;
 return n;
};
const state={filter:"all",queued:false,pendingSection:null};
function current(){
 if(!gate||getComputedStyle(gate).display==="none")return"locked";
 if($(".unit-page",app))return"unit";
 if($(".dashboard-hero",app))return"home";
 if($("#unitResults",app))return"units";
 if($("#resourcesTitle",app))return"resources";
 if($("#helpTitle",app))return"help";
 return"other";
}
function progressOf(id){
 const x=getProgress()[id]||{},responses=x.responses||{};
 const count=Math.min(24,Object.keys(responses).length);
 return{count,percent:Math.round(count/24*100),done:Boolean(x.completed)};
}
function menuButton(text,action){
 const b=make("button","",text);
 b.type="button";
 b.addEventListener("click",action);
 return b;
}
function navigate(section){
 if(!["uniteler","kaynaklar","ilerleme"].includes(section))return;
 const cur=current();
 if(cur==="home"){
  $(section==="uniteler"?"#uniteler":section==="kaynaklar"?"#kaynaklar":"#ilerleme",app)
   ?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
  return;
 }
 state.pendingSection=section;
 if(location.hash!=="#home")location.hash="#home";
 else schedule();
}
function oldView(which){location.hash="#"+which;}
function ensureHeader(){
 const head=$(".header-inner");
 if(!head)return;
 const img=window.AYDA_LOGO_DATA;
 if(img&&!$("#a2AYDABrand",head)){
  const brand=$(".brand-button",head);
  if(brand){
   const logo=make("img","","");
   logo.id="a2AYDABrand";
   logo.src=img;logo.alt="AYDA Dil Akademisi";logo.width=135;logo.height=46;
   brand.prepend(logo);
  }
 }
 const login=$(".login-brand-row .brand-mark");
 if(img&&login&&!login.querySelector("img")){
  const logo=make("img","");
  logo.src=img;logo.alt="AYDA Dil Akademisi";logo.width=137;logo.height=48;
  login.replaceChildren(logo);
 }
 if($("#a2SharedNav",head)){syncHeader();return}
 const nav=make("nav","a2-shared-nav");
 nav.id="a2SharedNav";
 nav.setAttribute("aria-label","AYDA ana menü");
 [
  ["Video + Alıştırma",()=>navigate("uniteler"),"uniteler"],
  ["AYDA Kaynakları",()=>navigate("kaynaklar"),"kaynaklar"],
  ["İlerleme",()=>navigate("ilerleme"),"ilerleme"]
 ].forEach(([label,callback,key])=>{
  const button=menuButton(label,callback);
  button.dataset.sharedLink=key;
  nav.append(button);
 });
 const menu=make("details","a2-more");
 const summary=make("summary","","Diğer ▾");
 const items=make("div","a2-more-items");
 [
  ["A2 kaynaklarım",()=>oldView("resources")],
  ["Yardım ve iletişim",()=>oldView("help")],
  ["8 modül görünümü",()=>oldView("units")],
  ["Ders kayıtları",()=>open("https://kurs.aydadil.com/","_blank","noopener,noreferrer")]
 ].forEach(([label,callback])=>{
  const b=menuButton(label,()=>{menu.open=false;callback()});
  items.append(b);
 });
 menu.append(summary,items);nav.append(menu);
 head.querySelector(".brand-button")?.insertAdjacentElement("afterend",nav);
 if(!$("#a2SharedPill",head)){
  const pill=make("span","a2-shared-pill","24 Ünite");
  pill.id="a2SharedPill";head.append(pill);
 }
 syncHeader();
}
function syncHeader(){
 const route=current();
 $$("[data-shared-link]",$("#a2SharedNav")).forEach(b=>{
  const active=(b.dataset.sharedLink==="uniteler"&&(route==="unit"||route==="units"))||
               (b.dataset.sharedLink==="kaynaklar"&&route==="resources")||
               (b.dataset.sharedLink==="ilerleme"&&route==="home");
  b.classList.toggle("active",active);
  if(active)b.setAttribute("aria-current","page");
  else b.removeAttribute("aria-current");
 });
}
function makeCard(unit){
 const progress=progressOf(unit.id),card=make("article","a2-b1-unit-card");
 card.dataset.unit=String(unit.id);
 const top=make("div","a2-b1-card-top");
 top.append(make("span","a2-b1-number",String(unit.id).padStart(2,"0")),
            make("span","a2-b1-status",progress.done?"✓ Tamamlandı":progress.count?"%"+progress.percent:"Yeni"));
 card.append(top,make("p","a2-b1-topic",unit.topic),make("h3","a2-b1-title",unit.title));
 const tags=make("div","a2-b1-tags");
 (unit.grammar||"").split(/[,;/·]/).map(x=>x.trim()).filter(Boolean).slice(0,2)
  .forEach(tag=>tags.append(make("span","",tag)));
 card.append(tags);
 const flow=make("div","a2-b1-card-flow");
 flow.append(make("span","","▶ "+unit.videos.length+" video"),
             make("span","","✦ "+unit.exercises.length+" alıştırma"));
 card.append(flow);
 const track=make("div","a2-b1-track");
 const bar=make("span","");
 bar.style.width=progress.percent+"%";track.append(bar);card.append(track);
 const go=menuButton(progress.count?"Videoya ve alıştırmaya dön →":"Videoyu izle ve başla →",
                     ()=>{location.hash="unit-"+unit.id});
 go.setAttribute("aria-label","Ünite "+unit.id+" · "+unit.title);
 go.className="a2-b1-card-button";card.append(go);
 return card;
}
function drawCards(){
 const grid=$("#a2B1Grid");
 if(!grid)return;
 const filtered=SOURCE().filter(u=>state.filter==="all"||u.book===state.filter);
 const ids=filtered.map(u=>u.id).join(",");
 if(grid.dataset.ids===ids)return;
 grid.replaceChildren(...filtered.map(makeCard));
 grid.dataset.ids=ids;
}
function ensureCatalog(){
 const hero=$(".dashboard-hero",app);
 if(!hero)return;
 hero.id="ilerleme";
 const homeResource=$(".home-resource-strip",app);
 if(homeResource)homeResource.id="kaynaklar";
 if(!$("#a2B1Catalog",app)){
  const panel=make("section","a2-b1-catalog");
  panel.id="a2B1Catalog";
  const intro=make("div","a2-b1-section-heading");
  intro.id="uniteler";
  const lead=make("div","");
  lead.append(make("p","a2-b1-eyebrow","VİDEO TEKRAR + A2 ALIŞTIRMALARI"),
              make("h2","","Önce konuyu öğren, sonra 24 alıştırmayı çöz"));
  intro.append(lead,make("p","","Her ünitede kısa açıklama, üç video ve 24 soru. Canlı ders sonrası veya kendi hızında çalış."));
  const filter=make("div","a2-b1-filter");
  filter.setAttribute("role","group");filter.setAttribute("aria-label","A2 ders filtreleri");
  [["all","Tümü"],["A2.1","A2.1 · 1–12"],["A2.2","A2.2 · 13–24"]]
   .forEach(([id,label])=>{
    const button=menuButton(label,()=>{
     state.filter=id;syncFilters();drawCards();
    });
    button.dataset.a2Filter=id;
    filter.append(button);
   });
  const grid=make("section","a2-b1-grid");
  grid.id="a2B1Grid";grid.setAttribute("aria-label","24 A2 ünitesi");
  panel.append(intro,filter,grid);
  homeResource?.insertAdjacentElement("afterend",panel);
 }
 syncFilters();drawCards();
 if(!$("#a2B1Method",app)){
  const method=make("section","a2-b1-method");
  method.id="a2B1Method";
  method.append(make("p","a2-b1-eyebrow","NASIL ÇALIŞIR?"),
                make("h2","","Konuyu anlayarak öğren, sonra pratikle pekiştir."));
  const steps=make("div","a2-b1-method-grid");
  [
   ["01","Mantığı hatırla","A2 kuralını Türkçe açıklama ve örneklerle tekrar et."],
   ["02","Video ile pekiştir","Ders, gramer ve konuşma videolarını burada izle."],
   ["03","6 soruluk setler","24 soruyu dört kısa sette çöz, kaldığın yerden devam et."]
  ].forEach(([n,t,d])=>{
   const box=make("article","");
   box.append(make("b","",n),make("h3","",t),make("p","",d));steps.append(box);
  });
  method.append(steps);
  $("#a2B1Catalog",app)?.insertAdjacentElement("afterend",method);
 }
}
function syncFilters(){
 $$("[data-a2-filter]",$("#a2B1Catalog")).forEach(b=>{
  const active=b.dataset.a2Filter===state.filter;
  b.classList.toggle("active",active);
  b.setAttribute("aria-pressed",String(active));
 });
}
function ensureDetail(){
 const page=$(".unit-page",app);
 if(!page)return;
 let toolbar=$("#a2B1DetailTop",page);
 const original=$(":scope > .back-button",page);
 if(!toolbar&&original){
  toolbar=make("div","a2-b1-detail-top");toolbar.id="a2B1DetailTop";
  const back=menuButton("← Tüm üniteler",()=>original.click());
  back.className="a2-b1-back";
  const progress=make("div","a2-b1-detail-track");
  progress.append(make("span",""));
  toolbar.append(back,progress,make("b","","%0"));
  original.insertAdjacentElement("beforebegin",toolbar);
 }
 const id=Number(page.dataset.unitId);
 const pct=progressOf(id).percent;
 const bar=$("#a2B1DetailTop .a2-b1-detail-track span",page);
 const text=$("#a2B1DetailTop b",page);
 if(bar&&bar.style.width!==pct+"%")bar.style.width=pct+"%";
 if(text&&text.textContent!=="%"+pct)text.textContent="%"+pct;
}
function refresh(){
 const route=current();
 document.body.dataset.a2SharedView=route;
 if(route==="locked")return;
 ensureHeader();
 if(route==="home"){
  ensureCatalog();
  if(state.pendingSection){
   const id=state.pendingSection;
   state.pendingSection=null;
   requestAnimationFrame(()=>$("#"+id,app)?.scrollIntoView({block:"start",behavior:"smooth"}));
  }
 }
 if(route==="unit")ensureDetail();
}
function schedule(){
 if(state.queued)return;
 state.queued=true;
 requestAnimationFrame(()=>{state.queued=false;refresh()});
}
function start(){
 ensureHeader();
 new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
 new MutationObserver(schedule).observe(gate,{attributes:true,attributeFilter:["style","class"]});
 window.addEventListener("hashchange",schedule);
 schedule();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,{once:true});
else start();
})();