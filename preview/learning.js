/* AYDA A2 preview: Existing data, player, questions, checking and storage are reused unchanged. */
(function () {
  "use strict";
  const app = document.getElementById("app");
  if (!app) return;
  const stages = ["learn", "video", "practice"];
  const labels = ["Öğren", "Video", "Alıştırma"];
  const selector = {
    learn: ".unit-page > .summary-details",
    video: ".unit-page > #unitVideoHub",
    practice: ".unit-page .practice-heading-v2"
  };
  const escapeText = (value) => String(value || "").replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  function activePage() { return app.querySelector(".unit-page"); }
  function currentStage(page) {
    const threshold = Math.min(190, window.innerHeight * 0.33);
    let active = "learn";
    for (const stage of stages) {
      const target = page.querySelector(selector[stage].replace(".unit-page ", "").replace(".unit-page > ", ""));
      if (target && target.getBoundingClientRect().top <= threshold) active = stage;
    }
    return active;
  }
  function setActive(page, stage) {
    page.querySelectorAll(".ayda-flow-step").forEach((button) => {
      if (button.dataset.aydaGo === stage) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
    });
    const next = page.querySelector(".ayda-flow-next");
    if (next) {
      const text = stage === "learn" ? "Videoya geç →" : stage === "video" ? "Alıştırmaya geç →" : "İlerle →";
      if (next.textContent !== text) next.textContent = text;
    }
  }
  function syncStage() {
    const page = activePage();
    if (page && page.dataset.aydaEnhanced === "1") setActive(page, currentStage(page));
  }
  function go(page, stage) {
    if (stage === "learn") {
      const summary = page.querySelector(".summary-details");
      if (summary) summary.open = true;
    }
    const target = page.querySelector(selector[stage].replace(".unit-page ", "").replace(".unit-page > ", ""));
    if (target) {
      setActive(page, stage);
      target.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",block:"start"});
    }
  }
  function next(page) {
    const stage = currentStage(page);
    if (stage === "learn") return go(page, "video");
    if (stage === "video") return go(page, "practice");
    const area = page.querySelector("#practiceArea");
    const check = area?.querySelector(".practice-question-actions [data-check-question]");
    if (check) { check.click(); area.scrollIntoView({behavior:"smooth",block:"start"}); return; }
    const forward = area?.querySelector(".practice-question-actions [data-question-next]");
    if (forward) { forward.click(); return; }
    const complete = area?.querySelector("[data-complete-unit]:not([disabled])");
    if (complete) { complete.click(); return; }
    area?.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function decorateUnit(page) {
    if (page.dataset.aydaEnhanced === "1") return;
    const hero = page.querySelector(".unit-hero");
    const summary = page.querySelector(".unit-main .summary-details");
    const video = page.querySelector("#unitVideoHub");
    const layout = page.querySelector(".unit-layout");
    const practiceHeading = page.querySelector(".practice-heading-v2");
    if (!hero || !summary || !video || !layout || !practiceHeading) return;
    page.dataset.aydaEnhanced = "1";
    page.classList.add("ayda-learning-page");
    const label = document.createElement("div");
    label.className = "ayda-preview-label";
    label.textContent = "ÖĞRENCİ ÖNİZLEMESİ · A2";
    hero.before(label);
    const nav = document.createElement("nav");
    nav.className = "ayda-flowbar";
    nav.setAttribute("aria-label", "Ünite öğrenme adımları");
    nav.innerHTML = '<div class="ayda-flow-steps">' +
      stages.map((stage,i) => '<button type="button" class="ayda-flow-step" data-ayda-go="'+stage+'"><span>'+(i+1)+'</span>'+labels[i]+'</button>').join("") +
      '</div><button class="ayda-flow-next" type="button" data-ayda-next>Videoya geç →</button>';
    hero.after(nav);
    summary.querySelector("summary").textContent = "01 · ÖĞREN — Konu anlatımı";
    summary.open = true;
    nav.after(summary);
    const intro = document.createElement("p");
    intro.className = "ayda-step-intro";
    intro.textContent = "Önce konuyu ve Almanca örnekleri oku. Bilmediğin cümleleri bir kez sesli tekrar et; ardından videoya geç.";
    summary.querySelector(".summary-content")?.prepend(intro);
    const learnFooter = document.createElement("div");
    learnFooter.className = "ayda-step-footer";
    learnFooter.innerHTML = '<span class="ayda-step-caption">Konu hazırsa sıradaki adım video.</span><button type="button" class="ayda-flow-cta" data-ayda-go="video">Videoyu izle →</button>';
    summary.after(learnFooter);
    const videoFooter = document.createElement("div");
    videoFooter.className = "ayda-step-footer";
    videoFooter.innerHTML = '<span class="ayda-step-caption">İhtiyacın olan diğer videoları da buradan seçebilirsin.</span><button type="button" class="ayda-flow-cta" data-ayda-go="practice">Alıştırmalara geç →</button>';
    video.after(videoFooter);
    const guide = document.createElement("div");
    guide.className = "ayda-practice-guide";
    guide.innerHTML = '<strong>03</strong><span>Alıştırma · Cevabı seç veya yaz, <b>Kontrol et</b> düğmesine bas, sonra ilerle. Kaldığın soru otomatik kaydedilir.</span>';
    practiceHeading.before(guide);
    const originalHeading = page.querySelector(".practice-heading-v2 h2");
    if (originalHeading) originalHeading.textContent = "Alıştırma zamanı";
    setActive(page, "learn");
  }
  function decorateCards() {
    app.querySelectorAll(".unit-card:not([data-ayda-card-ready])").forEach((card) => {
      card.setAttribute("data-ayda-card-ready", "1");
      const action = card.querySelector(".card-action");
      if (action) {
        const flow = document.createElement("div");
        flow.className = "ayda-unit-card-flow";
        flow.innerHTML = "<span>1 Öğren</span><span>2 Video</span><span>3 Alıştırma</span>";
        action.before(flow);
        const prompt = action.querySelector("span");
        if (prompt) prompt.textContent = "Üniteye başla";
      }
    });
  }
  let pending = false;
  function scheduleEnhance() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      const page = activePage();
      if (page) decorateUnit(page);
      decorateCards();
      syncStage();
    });
  }
  const observer = new MutationObserver(scheduleEnhance);
  observer.observe(app, {childList:true,subtree:true});
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ayda-go], [data-ayda-next]");
    if (!button) return;
    const page = button.closest(".unit-page") || activePage();
    if (!page) return;
    if (button.hasAttribute("data-ayda-next")) next(page);
    else go(page, button.dataset.aydaGo);
  });
  window.addEventListener("scroll", syncStage, {passive:true});
  window.addEventListener("resize", syncStage, {passive:true});
  scheduleEnhance();
})();
