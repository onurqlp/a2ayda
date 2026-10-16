/* AYDA A2 | B1-inspired learner preview.
   Non-destructive enhancement: all original sources, access control,
   grading, saved answers and video URLs remain in production scripts. */
(function () {
  "use strict";
  const app = document.getElementById("app");
  if (!app) return;

  const STORAGE_KEY = "ayda_a2_progress_v2";
  const STAGES = [
    { id: "learn", label: "Öğren", selector: ".summary-details" },
    { id: "video", label: "Video", selector: "#unitVideoHub" },
    { id: "practice", label: "Alıştırma", selector: ".practice-heading-v2" }
  ];
  const GROUPS = [
    { title: "Temel kavrama", short: "Kavra", description: "Kelime, temel dilbilgisi ve cümle kurma" },
    { title: "Uygulama", short: "Uygula", description: "Kısa cevap, görsel, metin ve örnekler" },
    { title: "Diyalog ve dilbilgisi", short: "Diyalog", description: "Düzeltme, diyalog, çeviri ve gramer" },
    { title: "Üretim ve pekiştirme", short: "Pekiştir", description: "Kelime, fiil, paragraf ve konuşma" }
  ];
  const selection = {stage:"learn", unitId:null};
  const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = () => reducedMotion() ? "auto" : "smooth";
  const activePage = () => app.querySelector(".unit-page");
  const unitIdOf = page => Number(page?.dataset.unitId);
  const lessonRecord = unitId => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")[unitId] || {}; }
    catch { return {}; }
  };
  const answersFor = unitId => lessonRecord(unitId).responses || {};
  const isAnswered = (responses, q) => Object.prototype.hasOwnProperty.call(responses, "q" + String(q).padStart(2, "0"));
  const groupFor = q => Math.max(0, Math.min(3, Math.floor((q - 1)/6)));
  const groupCount = (responses, group) => {
    let count = 0;
    for (let q=group*6+1;q<=group*6+6;q++) if (isAnswered(responses,q)) count++;
    return count;
  };
  const updateText = (node, value) => {
    if (node && node.textContent !== value) node.textContent = value;
  };
  const setAttr = (node, name, value) => {
    if (node && node.getAttribute(name) !== value) node.setAttribute(name,value);
  };
  const scrollTo = el => el?.scrollIntoView({behavior:scrollBehavior(),block:"start"});
  const node = (tag,className,html) => {
    const e=document.createElement(tag);
    if(className)e.className=className;
    if(typeof html==="string")e.innerHTML=html;
    return e;
  };

  function stageElement(page,stage) {
    return page?.querySelector(STAGES.find(x=>x.id===stage)?.selector || ".__never");
  }
  function currentStage(page) {
    const threshold = 170;
    let result="learn";
    for (const step of STAGES) {
      const item=stageElement(page,step.id);
      if(item && item.getBoundingClientRect().top < threshold) result=step.id;
    }
    return result;
  }
  function syncStageUI(page,stage) {
    const target = stage || currentStage(page);
    selection.stage=target;
    document.querySelectorAll("[data-ayda-stage]").forEach(btn => {
      const active=btn.dataset.aydaStage===target;
      setAttr(btn,"aria-current",active ? "step" : "false");
    });
    document.querySelectorAll("[data-ayda-forward]").forEach(btn => {
      updateText(btn,target==="learn" ? "Videoya geç →" : target==="video" ? "Alıştırmaya geç →" : "İlerle →");
    });
  }
  function go(page,stage) {
    if(!page)return;
    if(stage==="learn") {
      const summary=page.querySelector(".summary-details");
      if(summary && !summary.open)summary.open=true;
    }
    const item=stageElement(page,stage);
    if (!item)return;
    selection.stage=stage;
    syncStageUI(page,stage);
    scrollTo(item);
  }

  function questionIndex(page) {
    const dot=page.querySelector(".question-dot.active");
    return dot?Number(dot.dataset.questionNav)+1:1;
  }
  function goQuestion(page,question) {
    if(!page)return;
    const index=Math.min(24,Math.max(1,question));
    const btn=page.querySelector('[data-question-nav="'+(index-1)+'"]');
    if(btn)btn.click();
    selection.stage="practice";
    window.requestAnimationFrame(()=> {
      refreshPractice(activePage());
      scrollTo(activePage()?.querySelector(".ayda-group-progress") || activePage()?.querySelector("#practiceArea"));
    });
  }
  function advance(page) {
    const stage=currentStage(page);
    if(stage==="learn")return go(page,"video");
    if(stage==="video")return go(page,"practice");
    const area=page?.querySelector("#practiceArea");
    if(!area)return;
    const check=area.querySelector("[data-check-question]");
    if(check) { check.click(); return; }
    const question=questionIndex(page);
    if(question<24)return goQuestion(page,question+1);
    const record=lessonRecord(unitIdOf(page));
    const responses=record.responses || {};
    if(Object.keys(responses).length<24){
      const firstMissing=Array.from({length:24},(_,i)=>i+1).find(q=>!isAnswered(responses,q));
      if(firstMissing)return goQuestion(page,firstMissing);
    }
    const complete=area.querySelector("[data-complete-unit]:not([disabled])");
    if(complete && !record.completed) { complete.click(); return; }
    if(record.completed && unitIdOf(page)<24)location.hash="unit-"+(unitIdOf(page)+1);
    else if(record.completed)location.hash="units";
  }

  function decorateDashboard() {
    const hero=app.querySelector(".dashboard-hero");
    if(hero && !hero.dataset.aydaPrepared) {
      hero.dataset.aydaPrepared="true";
      const main=hero.querySelector(".intro-copy");
      updateText(main,"Dersten sonra ya da kendi başına çalış: önce öğren, ardından videonu izle ve kısa aşamalarla alıştırmaları tamamla.");
      const btn=hero.querySelector(".dashboard-cta");
      if(btn)btn.firstChild.textContent=(btn.firstChild.textContent || "").replace("Videolu ","");
    }
    const plan=app.querySelector(".study-plan");
    if(plan&&!plan.dataset.aydaPrepared) {
      plan.dataset.aydaPrepared="true";
      const headings=plan.querySelectorAll("li strong");
      const notes=plan.querySelectorAll("li small");
      ["Öğren","Video izle","Alıştırma yap"].forEach((name,i)=>updateText(headings[i],name));
      ["Kısa açıklama ve Almanca örnekleri oku.","Ders ve gramer videolarını sayfa içinde izle.","Her defasında yalnızca 6 soruya odaklan."].forEach((v,i)=>updateText(notes[i],v));
    }
  }
  function decorateCards() {
    for(const card of app.querySelectorAll(".unit-card:not([data-ayda-prepared])")){
      card.dataset.aydaPrepared="true";
      const action=card.querySelector(".card-action");
      if(!action)continue;
      const flow=node("div","ayda-unit-card-flow","<span>Öğren</span><span>Video</span><span>4 × 6 soru</span>");
      action.before(flow);
      updateText(action.querySelector("span"),"Üniteyi aç");
    }
  }
  function decorateUnit(page) {
    if(!page || page.dataset.aydaPrepared)return;
    const hero=page.querySelector(".unit-hero");
    const summary=page.querySelector(".unit-main .summary-details");
    const video=page.querySelector("#unitVideoHub");
    const layout=page.querySelector(".unit-layout");
    const heading=page.querySelector(".practice-heading-v2");
    if(!hero || !summary || !video || !layout || !heading)return;
    page.dataset.aydaPrepared="true";
    page.classList.add("ayda-learning-page");
    const flow=node("nav","ayda-flowbar",
      '<div class="ayda-flow-steps">'+STAGES.map((s,i)=>'<button type="button" data-ayda-stage="'+s.id+'"><span>'+(i+1)+'</span>'+s.label+'</button>').join("")+
      '</div><button type="button" class="ayda-flow-next" data-ayda-forward>Videoya geç →</button>');
    flow.setAttribute("aria-label","Ünite öğrenme yolu");
    hero.after(flow);
    const summaryTitle=summary.querySelector("summary");
    updateText(summaryTitle,"01 · ÖĞREN — Konu anlatımı");
    summary.open=true;
    flow.after(summary);
    const intro=node("p","ayda-step-intro");
    intro.textContent="Bu ünitenin konusunu oku, örnek cümleleri incele. Ardından videoya geç.";
    summary.querySelector(".summary-content")?.prepend(intro);
    const toVideo=node("div","ayda-step-footer",
      '<span>Konu hazırsa şimdi videoyu izleyebilirsin.</span><button type="button" class="ayda-flow-cta" data-ayda-stage="video">Videoyu izle →</button>');
    summary.after(toVideo);
    const toPractice=node("div","ayda-step-footer",
      '<span>İhtiyacın olan ders, gramer veya konuşma videosunu seç.</span><button type="button" class="ayda-flow-cta" data-ayda-stage="practice">Alıştırmalara geç →</button>');
    video.after(toPractice);
    const label=heading.querySelector("h2");
    updateText(label,"Dört kısa çalışmayla pekiştir");
    const description=heading.querySelector("p:last-child");
    if(description)updateText(description,"Bir aşamada 6 soru var. Her cevabı kontrol et; istediğinde kaldığın yerden devam et.");
    const dock=document.getElementById("aydaStudyDock") || node("nav","ayda-study-dock",
      STAGES.map((s,i)=>'<button type="button" data-ayda-stage="'+s.id+'"><span>'+(i+1)+'</span>'+s.label+'</button>').join("")+
      '<button type="button" class="ayda-study-next" data-ayda-forward>İlerle →</button>');
    dock.id="aydaStudyDock";
    dock.setAttribute("aria-label","Ünite alt gezinme");
    if(!dock.isConnected)document.getElementById("aydaProtectedContent")?.append(dock);
    syncStageUI(page,"learn");
  }
  function makePracticeControls(area) {
    const tabs=node("section","ayda-group-progress",
      '<div class="ayda-gp-heading"><div><span class="ayda-gp-eyebrow">A2 ALIŞTIRMA</span><h3 data-ayda-group-title>1. Aşama · Temel kavrama</h3></div><strong data-ayda-group-status>0 / 6</strong></div>'+
      '<p data-ayda-group-desc></p><div class="ayda-gp-track"><span data-ayda-group-fill></span></div>'+
      '<div class="ayda-group-tabs" role="group" aria-label="Çalışma aşaması">'+GROUPS.map((g,i)=>
        '<button type="button" data-ayda-group="'+i+'"><span>'+(i+1)+'. '+g.short+'</span><small data-ayda-group-count="'+i+'">0/6</small></button>').join("")+'</div>'+
      '<p class="ayda-group-remaining" data-ayda-group-remaining></p>');
    const map=area.querySelector(".question-map");
    if(!map)return;
    map.before(tabs);
    const footer=node("div","ayda-group-footer",
      '<span data-ayda-group-hint></span><button type="button" class="ayda-flow-cta" data-ayda-group-forward>Sonraki aşama →</button>');
    const originalFooter=area.querySelector(".practice-footer-nav");
    if(originalFooter)originalFooter.after(footer);
  }
  function refreshPractice(page) {
    if(!page)return;
    const area=page.querySelector("#practiceArea");
    if(!area)return;
    if(!area.querySelector(".ayda-group-progress"))makePracticeControls(area);
    const dots=Array.from(area.querySelectorAll(".question-dot"));
    if(dots.length!==24)return;
    const currentQ=questionIndex(page), activeGroup=groupFor(currentQ);
    const answers=answersFor(unitIdOf(page));
    const complete=groupCount(answers,activeGroup);
    const info=GROUPS[activeGroup];
    updateText(area.querySelector("[data-ayda-group-title]"),(activeGroup+1)+". Aşama · "+info.title);
    updateText(area.querySelector("[data-ayda-group-desc]"),info.description);
    updateText(area.querySelector("[data-ayda-group-status]"),complete+" / 6");
    const bar=area.querySelector("[data-ayda-group-fill]");
    if(bar&&bar.style.width!==(complete/6*100)+"%")bar.style.width=(complete/6*100)+"%";
    for(let i=0;i<4;i++){
      const b=area.querySelector('[data-ayda-group="'+i+'"]');
      setAttr(b,"aria-current",i===activeGroup?"step":"false");
      const count=groupCount(answers,i);
      updateText(area.querySelector('[data-ayda-group-count="'+i+'"]'),count===6?"✓ 6/6":count+"/6");
    }
    const left=6-complete;
    updateText(area.querySelector("[data-ayda-group-remaining]"),
      left ? "Bu aşamada "+left+" soru kaldı · Genel ilerleme: "+Object.keys(answers).length+"/24" :
      "Bu aşama tamamlandı ✓ · Genel ilerleme: "+Object.keys(answers).length+"/24");
    dots.forEach((dot,i)=> {
      const shouldHide=groupFor(i+1)!==activeGroup;
      if(dot.hidden!==shouldHide)dot.hidden=shouldHide;
    });
    const hint=area.querySelector("[data-ayda-group-hint]");
    const forward=area.querySelector("[data-ayda-group-forward]");
    const last=activeGroup===3;
    updateText(hint,left?left+" soru daha kontrol edebilirsin.":"Aşamanı tamamladın.");
    updateText(forward,last?"Üniteyi bitir →":"Sonraki aşama →");
    // Keep every original question, completion button, score and explanation intact.
  }
  function nextGroup(page) {
    const q=questionIndex(page),group=groupFor(q);
    if(group<3) {
      const answers=answersFor(unitIdOf(page));
      const start=(group+1)*6+1;
      const next=Array.from({length:6},(_,i)=>start+i).find(x=>!isAnswered(answers,x)) || start;
      return goQuestion(page,next);
    }
    const answers=answersFor(unitIdOf(page));
    const missing=Array.from({length:24},(_,i)=>i+1).find(x=>!isAnswered(answers,x));
    if(missing)return goQuestion(page,missing);
    const complete=page.querySelector("#practiceArea [data-complete-unit]:not([disabled])");
    if(complete && !lessonRecord(unitIdOf(page)).completed) complete.click();
    else if(lessonRecord(unitIdOf(page)).completed)location.hash=unitIdOf(page)<24?"unit-"+(unitIdOf(page)+1):"units";
  }
  function decorateFinalAction(page) {
    const area=page.querySelector("#practiceArea");
    const action=area?.querySelector(".unit-complete-actions");
    if(!action || action.querySelector("[data-ayda-next-unit]"))return;
    const rec=lessonRecord(unitIdOf(page));
    if(!rec.completed)return;
    const next=node("button","ayda-flow-cta");
    next.type="button";
    next.dataset.aydaNextUnit=unitIdOf(page)<24?String(unitIdOf(page)+1):"units";
    next.textContent=unitIdOf(page)<24?"Ünite "+(unitIdOf(page)+1)+"'e geç →":"Tüm üniteleri gör →";
    action.append(next);
  }

  let queued=false;
  function enhance() {
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      const page=activePage();
      document.documentElement.classList.toggle("ayda-is-unit",!!page);
      if(page) {
        decorateUnit(page);
        refreshPractice(page);
        decorateFinalAction(page);
        syncStageUI(page);
      } else {
        decorateDashboard();
        decorateCards();
      }
    });
  }
  const observer=new MutationObserver(enhance);
  observer.observe(app,{childList:true,subtree:true});
  document.addEventListener("click",e=>{
    const target=e.target.closest("[data-ayda-stage], [data-ayda-forward], [data-ayda-group], [data-ayda-group-forward], [data-ayda-next-unit]");
    if(!target)return;
    const page=activePage();
    if(!page)return;
    e.preventDefault();
    if(target.hasAttribute("data-ayda-stage"))go(page,target.dataset.aydaStage);
    else if(target.hasAttribute("data-ayda-forward"))advance(page);
    else if(target.hasAttribute("data-ayda-group")){
      const i=Number(target.dataset.aydaGroup);
      if(!Number.isInteger(i)||i<0||i>3)return;
      const answers=answersFor(unitIdOf(page));
      const first=Array.from({length:6},(_,j)=>i*6+j+1).find(q=>!isAnswered(answers,q)) || i*6+1;
      goQuestion(page,first);
    }
    else if(target.hasAttribute("data-ayda-group-forward"))nextGroup(page);
    else if(target.hasAttribute("data-ayda-next-unit")) {
      const id=target.dataset.aydaNextUnit;
      location.hash=id==="units"?"units":"unit-"+id;
    }
  });
  let scrollQueued=false;
  document.addEventListener("scroll",()=>{
    if(scrollQueued)return;
    scrollQueued=true;
    requestAnimationFrame(()=>{scrollQueued=false;const page=activePage();if(page)syncStageUI(page);});
  },{passive:true});
  window.addEventListener("hashchange",enhance);
  window.addEventListener("resize",enhance,{passive:true});
  enhance();
})();