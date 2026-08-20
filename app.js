(function () {
  "use strict";

  const units = Array.isArray(window.AYDA_UNITS) ? window.AYDA_UNITS : [];
  const app = document.getElementById("app");
  const STORAGE_KEY = "ayda_a2_progress_v2";
  const moduleColors = ["#cdeb61", "#78d8b0", "#75c9f1", "#ff8580", "#f4d35e", "#9edc79", "#ae9bf4", "#ff9f68"];
  const state = {
    filter: "all",
    search: "",
    orderSelections: {},
    practiceDrafts: {},
    selectedVideos: {},
    progress: loadProgress()
  };
  let toastTimer = null;

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value ?? "")
      .trim()
      .toLocaleLowerCase("de-DE")
      .replaceAll("ä", "ae")
      .replaceAll("ö", "oe")
      .replaceAll("ü", "ue")
      .replaceAll("ß", "ss")
      .replace(/[.,!?;:]+$/g, "")
      .replace(/\s+/g, " ");
  }

  function toEmbedUrl(url) {
    const value = String(url || "");
    const driveMatch = value.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;

    const shortYouTubeMatch = value.match(/youtu\.be\/([^?&#/]+)/);
    const watchYouTubeMatch = value.match(/[?&]v=([^?&#/]+)/);
    const videoId = shortYouTubeMatch?.[1] || watchYouTubeMatch?.[1];
    if (videoId) return `https://www.youtube-nocookie.com/embed/${videoId}`;

    const playlistMatch = value.match(/[?&]list=([^?&#/]+)/);
    if (playlistMatch) return `https://www.youtube-nocookie.com/embed/videoseries?list=${playlistMatch[1]}`;
    return value;
  }

  function selectedVideoIndex(unit) {
    const saved = Number(state.selectedVideos[unit.id]);
    return Number.isInteger(saved) && saved >= 0 && saved < unit.videos.length ? saved : 0;
  }

  function renderUnitVideoHub(unit) {
    const activeIndex = selectedVideoIndex(unit);
    const activeVideo = unit.videos[activeIndex];
    const embedUrl = toEmbedUrl(activeVideo.url);
    return `
      <div class="unit-video-hub-inner">
        <div class="video-hub-heading">
          <div>
            <p class="eyebrow">ÜNİTE ${unit.id} · VİDEO TEKRAR</p>
            <h2>İzle, tekrar et, sonra çöz.</h2>
          </div>
          <span class="video-count-pill">${unit.videos.length} video</span>
        </div>

        <div class="video-player-shell">
          <iframe
            src="${escapeHtml(embedUrl)}"
            title="Ünite ${unit.id}: ${escapeHtml(activeVideo.label)}"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <div class="video-now-playing">
          <span><small>${escapeHtml(activeVideo.kind)}</small><strong>${escapeHtml(activeVideo.label)}</strong></span>
          <a href="${escapeHtml(activeVideo.url)}" target="_blank" rel="noopener noreferrer">Ayrı aç <span aria-hidden="true">↗</span></a>
        </div>

        <div class="unit-video-tabs" role="group" aria-label="Ünite ${unit.id} video seçimi">
          ${unit.videos.map((item, index) => `
            <button class="unit-video-tab${index === activeIndex ? " active" : ""}" type="button" data-select-video="${index}" aria-pressed="${index === activeIndex}">
              <span class="video-tab-play" aria-hidden="true">▶</span>
              <span><small>${escapeHtml(item.kind)}</small><strong>${escapeHtml(item.label)}</strong></span>
            </button>
          `).join("")}
        </div>
        <p class="video-privacy-note">Video, bu sayfada Google Drive veya YouTube oynatıcısıyla açılır. Açılmazsa “Ayrı aç” bağlantısını kullan.</p>
      </div>
    `;
  }

  function selectUnitVideo(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    const videoIndex = Number(button.dataset.selectVideo);
    if (!unit || !Number.isInteger(videoIndex) || !unit.videos[videoIndex]) return;
    state.selectedVideos[unitId] = videoIndex;
    const hub = page.querySelector("#unitVideoHub");
    if (hub) hub.innerHTML = renderUnitVideoHub(unit);
  }

  function loadProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (error) {
      console.warn("İlerleme kaydı okunamadı.", error);
      return {};
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
    } catch (error) {
      console.warn("İlerleme kaydedilemedi.", error);
    }
    updateHeaderProgress();
  }

  function completedCount() {
    return units.filter((unit) => state.progress[unit.id]?.completed).length;
  }

  function updateHeaderProgress() {
    const count = completedCount();
    const text = document.getElementById("headerProgressText");
    const bar = document.getElementById("headerProgressBar");
    if (text) text.textContent = `${count} / ${units.length || 24}`;
    if (bar) bar.style.width = `${units.length ? (count / units.length) * 100 : 0}%`;
  }

  function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function currentUnitId() {
    const match = window.location.hash.match(/^#unit-(\d+)$/);
    return match ? Number(match[1]) : null;
  }

  function currentView() {
    const view = window.location.hash.replace(/^#/, "");
    return ["home", "units", "resources", "help"].includes(view) ? view : "home";
  }

  function navigateView(view) {
    const nextHash = view === "home" ? "#home" : `#${view}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      renderRoute();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function navigateHome() {
    navigateView("home");
  }

  function navigateUnits() {
    navigateView("units");
  }

  function navigateUnit(id) {
    window.location.hash = `unit-${id}`;
  }

  function renderRoute() {
    if (!app) return;
    if (!units.length) {
      app.innerHTML = '<div class="empty-state"><strong>İçerik yüklenemedi.</strong><br>Sayfayı yenileyin.</div>';
      return;
    }

    const id = currentUnitId();
    const unit = units.find((item) => item.id === id);
    if (id && unit) {
      renderUnitPractice(unit);
    } else {
      if (id) window.history.replaceState(null, "", window.location.pathname + window.location.search + "#home");
      const view = currentView();
      if (view === "units") renderUnits();
      if (view === "resources") renderResources();
      if (view === "help") renderHelp();
      if (view === "home") renderDashboard();
    }
    updateHeaderProgress();
    updateBottomNav(unit ? "units" : currentView());
    document.title = unit ? `Ünite ${unit.id} · AYDA A2` : `${viewTitle(currentView())} · AYDA A2`;
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function viewTitle(view) {
    return { home: "Ana Sayfa", units: "Üniteler", resources: "Kaynaklar", help: "Yardım" }[view] || "AYDA A2";
  }

  function updateBottomNav(view) {
    document.querySelectorAll("[data-nav]").forEach((button) => {
      const active = button.dataset.nav === view;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
  }

  function renderDashboard() {
    const done = completedCount();
    const percent = Math.round((done / units.length) * 100);
    const resume = units.find((unit) => !state.progress[unit.id]?.completed) || units[units.length - 1];
    const attemptedTotal = units.reduce((sum, unit) => sum + Object.keys(state.progress[unit.id]?.responses || {}).length, 0);
    const gradedTotal = units.reduce((sum, unit) => sum + Object.values(state.progress[unit.id]?.responses || {}).filter((item) => typeof item?.correct === "boolean").length, 0);
    const correctTotal = units.reduce((sum, unit) => sum + Object.values(state.progress[unit.id]?.responses || {}).filter((item) => item?.correct === true).length, 0);
    const accuracy = gradedTotal ? Math.round((correctTotal / gradedTotal) * 100) : 0;
    app.innerHTML = `
      <section class="home-intro dashboard-hero" aria-labelledby="dashboardTitle">
        <div>
          <p class="eyebrow">AYDA A2 · 24 ÜNİTE</p>
          <h1 id="dashboardTitle">Almancayı<br>mantığıyla çalış.</h1>
          <p class="intro-copy">Her ünitenin ders, gramer ve konuşma videosunu sayfadan çıkmadan izle; ardından 24 özgün soruyla hemen pratik yap.</p>
          <button class="secondary-button dashboard-cta" type="button" data-open-unit="${resume.id}">Videolu Ünite ${resume.id}'e ${state.progress[resume.id]?.best ? "devam et" : "başla"} <span aria-hidden="true">→</span></button>
        </div>
        <div class="stat-card">
          <div class="stat-card-top">
            <div><strong>${done}</strong><br><small>tamamlanan ünite</small></div>
            <span class="level-pill">%${percent}</span>
          </div>
          <div class="progress-track" aria-label="Yüzde ${percent} tamamlandı"><span style="width:${percent}%"></span></div>
          <p class="stat-footnote"><strong>${attemptedTotal}</strong> / 576 soru çözüldü · <strong>%${accuracy}</strong> doğruluk</p>
        </div>
      </section>

      <section class="home-resource-strip" aria-labelledby="homeResourcesTitle">
        <div class="home-resource-heading">
          <div><p class="eyebrow">AYDA HIZLI BAĞLANTILAR</p><h2 id="homeResourcesTitle">Ders ve sınav kaynakların</h2></div>
          <button type="button" data-nav="resources">Tüm kaynaklar <span aria-hidden="true">→</span></button>
        </div>
        <div class="home-resource-grid">
          ${homeResourceCard("Canlı ders kayıtları", "Kaçırdığın dersleri yeniden izle.", "https://kurs.aydadil.com/", "▶", "coral")}
          ${homeResourceCard("Online kütüphane", "Ders materyallerine hızlı ulaş.", "https://www.aydadil.com/bibliothek/", "▤", "sky")}
          ${homeResourceCard("Sınav hazırlık", "A2 sınav çalışmalarını aç.", "https://www.aydadil.com/sinavhazirlik/", "◎", "lime")}
        </div>
      </section>

      <section class="dashboard-section" aria-labelledby="quickTitle">
        <div class="section-heading compact-heading">
          <div><p class="eyebrow">HIZLI ERİŞİM</p><h2 id="quickTitle">Bugün ne çalışacaksın?</h2></div>
        </div>
        <div class="dashboard-grid">
          <button class="dashboard-card dashboard-card-wide" type="button" data-nav="units">
            <span class="dashboard-card-index">01</span>
            <span><strong>Üniteler ve Alıştırmalar</strong><small>8 modül · 24 ünite · 576 özgün soru</small></span>
            <span class="dashboard-card-arrow" aria-hidden="true">→</span>
          </button>
          <button class="dashboard-card" type="button" data-nav="resources">
            <span class="dashboard-card-index">02</span>
            <span><strong>Kaynaklar</strong><small>Ders, video, kelime ve sınav bağlantıları</small></span>
            <span class="dashboard-card-arrow" aria-hidden="true">→</span>
          </button>
          <button class="dashboard-card" type="button" data-nav="help">
            <span class="dashboard-card-index">03</span>
            <span><strong>Yardım</strong><small>Site kullanımı ve destek</small></span>
            <span class="dashboard-card-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section class="study-plan" aria-labelledby="planTitle">
        <div><p class="eyebrow">AYDA ÇALIŞMA PLANI</p><h2 id="planTitle">Kısa çalış, sık tekrar et.</h2></div>
        <ol>
          <li><span>1</span><strong>Videoyu izle</strong><small>Ünite dersini sayfada aç.</small></li>
          <li><span>2</span><strong>Mantığı kavra</strong><small>Kısa konu özetini oku.</small></li>
          <li><span>3</span><strong>24 soruyu çöz</strong><small>Cevabını anında kontrol et.</small></li>
        </ol>
      </section>
    `;
  }

  function homeResourceCard(title, description, url, icon, tone) {
    return `
      <a class="home-resource-card ${tone}" href="${url}" target="_blank" rel="noopener noreferrer">
        <span class="home-resource-icon" aria-hidden="true">${icon}</span>
        <span><strong>${title}</strong><small>${description}</small></span>
        <span class="home-resource-arrow" aria-hidden="true">↗</span>
      </a>
    `;
  }

  function renderResources() {
    app.innerHTML = `
      <section class="view-hero" aria-labelledby="resourcesTitle">
        <p class="eyebrow">AYDA A2 KAYNAK MERKEZİ</p>
        <h1 id="resourcesTitle">Ders, video ve sınav kaynakları</h1>
        <p>Canlı ders kayıtları, A2 video klasörleri, kütüphane ve sınav platformu tek yerde.</p>
        <div class="resource-actions">
          ${resourceAction("Canlı Ders Kayıtları", "https://kurs.aydadil.com/")}
          ${resourceAction("Online Kütüphane", "https://www.aydadil.com/bibliothek/")}
          ${resourceAction("Sınav Hazırlık", "https://www.aydadil.com/sinavhazirlik/")}
        </div>
      </section>

      <div class="resource-note"><strong>Online kütüphane notu:</strong> A2 öğrenci panelinde belirtilen kütüphane şifresi <strong>A1</strong>.</div>

      <section class="resource-groups" aria-label="A2 kaynak grupları">
        ${resourceGroup("Ders Materyalleri", "A2 ders dosyaları ve konuşma kalıpları.", "▤", [
          ["A2 Ders Materyalleri", "https://drive.google.com/drive/folders/1eRkHhSQ0cVnbMVOtvR-nDcOZRUFJOEKH"],
          ["A2 Konuşma Kalıpları", "https://drive.google.com/drive/folders/1v1KnsUELnxaqwKEhN_8ruqGDOkHbrYFG?usp=sharing"]
        ], true)}
        ${resourceGroup("Ders Videoları ve Konu Anlatımları", "Ders tekrarları, Menschen A2 videoları ve kısa gramer anlatımları.", "▶", [
          ["Canlı Ders Kayıtları", "https://kurs.aydadil.com/"],
          ["A2 Menschen Ders Videoları", "https://drive.google.com/drive/folders/10KGAPnOKlfd3trMtY4paFsJDCbGNok9k?usp=drive_link"],
          ["A2 Konu Anlatım Videoları", "https://drive.google.com/drive/folders/1dkvJRQmwMAy4-xima2GhujCnFhRwq63B?usp=drive_link"],
          ["Arbeitsbuch Dinlemeleri Nasıl İndirilir?", "https://youtu.be/GHf6eOr6MU0"]
        ], true)}
        ${resourceGroup("A2 TELC Sınav Hazırlığı", "A2 sınav materyalleri ve AYDA hazırlık platformu.", "◎", [
          ["A2 TELC Sınav Materyalleri", "https://drive.google.com/drive/folders/1GRjqxt_FvMmiRtguHsDjNlxPZQL1X82P?usp=drive_link"],
          ["Sınav Hazırlık Platformu", "https://www.aydadil.com/sinavhazirlik/"]
        ])}
        ${resourceGroup("Ek Çalışma ve Kelime", "Kelime tekrarı, müzik ve ek pratik.", "◇", [
          ["Quizlet A2 Menschen Kelime", "https://quizlet.com/Saalihyilmazz/folders/menschen-a2?i=195vch&x=1xqY"],
          ["YouTube Almanca Müzikler", "https://youtube.com/playlist?list=PLlPnminIi7ZGaC8tkVghThkGQ_L-QkYY0"]
        ])}
      </section>
    `;
  }

  function resourceAction(label, url) {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}<span aria-hidden="true">↗</span></a>`;
  }

  function resourceGroup(title, description, icon, links, open = false) {
    return `
      <details class="resource-group"${open ? " open" : ""}>
        <summary><span><b class="resource-icon" aria-hidden="true">${icon}</b>${title}</span></summary>
        <div class="resource-content">
          <p>${description}</p>
          <div class="resource-link-grid">
            ${links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer"><span>${label}</span><b aria-hidden="true">↗</b></a>`).join("")}
          </div>
        </div>
      </details>
    `;
  }

  function renderHelp() {
    app.innerHTML = `
      <section class="view-hero help-hero" aria-labelledby="helpTitle">
        <p class="eyebrow">YARDIM VE KULLANIM</p>
        <h1 id="helpTitle">Takıldığın yerde buraya bak.</h1>
        <p>Siteyi kullanmak, dinleme kaynaklarına ulaşmak ve destek almak için kısa cevaplar.</p>
      </section>

      <section class="help-grid" aria-label="Yardım konuları">
        <article class="help-card">
          <span class="help-number">01</span>
          <h2>Nasıl çalışmalıyım?</h2>
          <p>Üniteyi aç, kısa konu mantığını oku. 24 soruyu sırayla ya da soru numaralarından seçerek çöz; her cevabı anında kontrol et.</p>
        </article>
        <article class="help-card">
          <span class="help-number">02</span>
          <h2>İlerlemem nerede?</h2>
          <p>Puan ve tamamlanan üniteler bu cihazın tarayıcısında saklanır. Başka telefon veya tarayıcıda otomatik taşınmaz.</p>
        </article>
        <article class="help-card">
          <span class="help-number">03</span>
          <h2>Hören nasıl çalışılır?</h2>
          <p>Her ünitedeki kısa Hören notunu takip et ve Menschen A2 Arbeitsbuch ses kayıtlarını kullan.</p>
          <a class="inline-link" href="https://youtu.be/GHf6eOr6MU0" target="_blank" rel="noopener noreferrer">Dinlemeleri indirme videosu ↗</a>
        </article>
        <article class="help-card">
          <span class="help-number">04</span>
          <h2>Giriş sorunu mu var?</h2>
          <p>İnternet bağlantını kontrol et, sınıf kodunu boşluksuz yaz ve sayfayı yenile. Sorun sürerse AYDA ile iletişime geç.</p>
        </article>
      </section>

      <section class="support-panel">
        <div><p class="eyebrow">AYDA DİL AKADEMİSİ</p><h2>Bir sorunuz mu var?</h2><p>WhatsApp üzerinden destek isteyebilir veya AYDA web sitesini ziyaret edebilirsiniz.</p></div>
        <div class="support-actions">
          <a class="secondary-button" href="https://wa.me/905409122503" target="_blank" rel="noopener noreferrer">WhatsApp ile sor</a>
          <a class="ghost-button" href="https://www.aydadil.com" target="_blank" rel="noopener noreferrer">aydadil.com ↗</a>
        </div>
      </section>
    `;
  }

  function renderUnits() {
    const done = completedCount();
    const percent = Math.round((done / units.length) * 100);
    app.innerHTML = `
      <section class="home-intro" aria-labelledby="homeTitle">
        <div>
          <p class="eyebrow">ALMANCA A2 · BOL PRATİK</p>
          <h1 id="homeTitle">Üniteler ve Alıştırmalar</h1>
          <p class="intro-copy">24 üniteyi sırayla ya da ihtiyacına göre çalış. Kısa mantık notunu oku, soruları çöz ve videoyla pekiştir.</p>
        </div>
        <div class="stat-card">
          <div class="stat-card-top">
            <div><strong>${done}</strong><br><small>tamamlanan ünite</small></div>
            <span class="level-pill">%${percent}</span>
          </div>
          <div class="progress-track" aria-label="Yüzde ${percent} tamamlandı"><span style="width:${percent}%"></span></div>
        </div>
      </section>

      <div class="section-heading">
        <div>
          <h2>Çalışmak istediğin üniteyi seç</h2>
          <p>A2.1 ve A2.2 kitap sırasına göre toplam 8 modül.</p>
        </div>
      </div>

      <div class="filters" aria-label="Ünite filtreleri">
        <div class="search-wrap">
          <label class="sr-only" for="unitSearch">Ünite ara</label>
          <input class="search-input" id="unitSearch" type="search" placeholder="Konu, başlık veya gramer ara…" value="${escapeHtml(state.search)}" />
        </div>
        <div class="filter-row" role="group" aria-label="Kitap filtresi">
          ${filterButton("all", "Tümü")}
          ${filterButton("A2.1", "A2.1")}
          ${filterButton("A2.2", "A2.2")}
        </div>
      </div>

      <div id="unitResults">${renderUnitResults()}</div>
    `;
  }

  function filterButton(value, label) {
    const active = state.filter === value;
    return `<button type="button" class="filter-chip${active ? " active" : ""}" data-filter="${value}" aria-pressed="${active}">${label}</button>`;
  }

  function renderUnitResults() {
    const query = normalize(state.search);
    const filtered = units.filter((unit) => {
      const inBook = state.filter === "all" || unit.book === state.filter;
      const haystack = normalize(`${unit.title} ${unit.topic} ${unit.grammar} ${unit.id}`);
      return inBook && (!query || haystack.includes(query));
    });

    if (!filtered.length) {
      return '<div class="empty-state"><strong>Bu aramaya uygun ünite yok.</strong><br>Başka bir kelime deneyin.</div>';
    }

    const groups = new Map();
    filtered.forEach((unit) => {
      if (!groups.has(unit.module)) groups.set(unit.module, []);
      groups.get(unit.module).push(unit);
    });

    return [...groups.entries()].map(([module, moduleUnits]) => {
      const color = moduleColors[module - 1];
      return `
        <section aria-labelledby="module-${module}" style="--module-color:${color}">
          <div class="module-heading">
            <span>${module}</span>
            <h3 id="module-${module}">Modül ${module} · ${moduleUnits[0].book}</h3>
          </div>
          <div class="unit-grid">
            ${moduleUnits.map(renderUnitCard).join("")}
          </div>
        </section>
      `;
    }).join("");
  }

  function renderUnitCard(unit) {
    const record = state.progress[unit.id] || {};
    const attempted = Object.keys(record.responses || {}).length;
    const status = record.completed ? "✓ Tamamlandı" : attempted ? `${attempted}/24 çözüldü` : "Başla";
    const color = moduleColors[unit.module - 1];
    return `
      <article class="unit-card" style="--module-color:${color}">
        <div class="card-top">
          <span class="unit-number">${unit.id}</span>
          <span class="card-status">${status}</span>
        </div>
        <p class="topic">${escapeHtml(unit.topic)}</p>
        <h4>${escapeHtml(unit.title)}</h4>
        <p class="grammar-preview">${escapeHtml(unit.grammar)}</p>
        <div class="card-action"><span>Alıştırmaya başla</span><span aria-hidden="true">→</span></div>
        <button class="unit-card-button" type="button" data-open-unit="${unit.id}" aria-label="Ünite ${unit.id}: ${escapeHtml(unit.title)}"></button>
      </article>
    `;
  }

  function practiceRecord(unitId) {
    const current = state.progress[unitId] || {};
    if (!current.responses || typeof current.responses !== "object") current.responses = {};
    if (!Number.isInteger(current.currentQuestion)) current.currentQuestion = 0;
    if (!Number.isFinite(current.best)) current.best = 0;
    if (typeof current.completed !== "boolean") current.completed = false;
    state.progress[unitId] = current;
    return current;
  }

  function practiceStats(unit) {
    const record = state.progress[unit.id] || {};
    const responses = record.responses || {};
    const attempted = Object.keys(responses).length;
    const graded = Object.values(responses).filter((item) => typeof item?.correct === "boolean");
    const correct = graded.filter((item) => item.correct).length;
    return { attempted, graded: graded.length, correct, percent: Math.round((attempted / 24) * 100) };
  }

  function draftKey(unitId, questionId) {
    return `${unitId}:${questionId}`;
  }

  function currentExercise(unit) {
    const record = practiceRecord(unit.id);
    record.currentQuestion = Math.max(0, Math.min(23, Number(record.currentQuestion) || 0));
    return unit.exercises[record.currentQuestion];
  }

  function exerciseAnswer(exercise) {
    if (exercise.type === "choice") return exercise.options[exercise.answer];
    if (exercise.type === "text") return exercise.answers[0];
    if (exercise.type === "order") return exercise.answerText;
    return exercise.model;
  }

  function renderUnitPractice(unit) {
    const record = practiceRecord(unit.id);
    const stats = practiceStats(unit);
    const color = moduleColors[unit.module - 1];
    if (!Array.isArray(unit.exercises) || unit.exercises.length !== 24) {
      app.innerHTML = '<div class="empty-state"><strong>Bu ünitenin alıştırmaları yüklenemedi.</strong><br>Sayfayı yenileyin.</div>';
      return;
    }

    app.innerHTML = `
      <article class="unit-page" style="--module-color:${color}" data-unit-id="${unit.id}">
        <button type="button" class="back-button" data-go-home><span aria-hidden="true">←</span> Tüm üniteler</button>

        <section class="unit-hero">
          <div class="unit-title">
            <p class="eyebrow">ÜNİTE ${unit.id} · ${unit.book} · MODÜL ${unit.module}</p>
            <h1>${escapeHtml(unit.title)}</h1>
            <p class="unit-subtitle">${escapeHtml(unit.topic)} · 24 özgün, Türkçe destekli A2 alıştırması.</p>
          </div>
          <div class="score-panel">
            <small>Çalışma ilerlemen</small>
            <strong id="unitBestScore">${stats.attempted} / 24</strong>
            <div class="progress-track"><span id="unitScoreBar" style="width:${stats.percent}%"></span></div>
            <small>${stats.graded ? `${stats.correct}/${stats.graded} doğru` : "İlk soruyla başla"}</small>
          </div>
        </section>

        <section id="unitVideoHub" class="unit-video-hub" aria-label="Ünite ${unit.id} video tekrarları">
          ${renderUnitVideoHub(unit)}
        </section>

        <div class="unit-layout">
          <div class="unit-main">
            <details class="panel summary-details">
              <summary>Konu açıklaması için tıkla</summary>
              <div class="summary-content">
                <p><strong>Ne zaman kullanılır?</strong> ${escapeHtml(unit.summary)}</p>
                <div class="logic-note"><strong>AYDA mantık notu:</strong> ${escapeHtml(unit.logic)}</div>
                <p class="grammar-line"><strong>Cümle yapısı:</strong> ${escapeHtml(unit.grammar)}</p>
                <ul class="example-list">
                  ${unit.examples.map((example) => `<li lang="de">${escapeHtml(example)}</li>`).join("")}
                </ul>
                <p class="mistake-note"><strong>Püf noktası:</strong> Önce çekimli fiilin yerini, sonra artikel ve hâl bilgisini kontrol et.</p>
              </div>
            </details>

            <div class="practice-heading practice-heading-v2">
              <div><p class="eyebrow">24 SORULUK ÜNİTE ÇALIŞMASI</p><h2>Şimdi sıra sende</h2></div>
              <p>Bir soru seç, cevabını kontrol et ve kaldığın yerden devam et.</p>
            </div>

            <section id="practiceArea" class="practice-area" aria-label="Ünite ${unit.id} alıştırmaları">
              ${renderPracticeArea(unit)}
            </section>
          </div>

          <aside class="unit-side" aria-label="Ünite destek içerikleri">
            <section class="side-card">
              <span class="grammar-label">Bu ünitenin mantığı</span>
              <p>${escapeHtml(unit.grammar)}</p>
            </section>

            <section class="unit-resource-panel">
              <h3>AYDA bağlantıları</h3>
              <p>Ders kaydı, kütüphane ve sınav çalışmasına buradan geç.</p>
              <div class="unit-resource-links">
                <a href="https://kurs.aydadil.com/" target="_blank" rel="noopener noreferrer"><span>Canlı ders kayıtları</span><b aria-hidden="true">↗</b></a>
                <a href="https://www.aydadil.com/bibliothek/" target="_blank" rel="noopener noreferrer"><span>Online kütüphane</span><b aria-hidden="true">↗</b></a>
                <a href="https://www.aydadil.com/sinavhazirlik/" target="_blank" rel="noopener noreferrer"><span>Sınav hazırlık</span><b aria-hidden="true">↗</b></a>
              </div>
            </section>

            <section class="hearing-note">
              <h3>Hören</h3>
              <p>Hören çalışmaları için Menschen A2 Arbeitsbuch'taki ilgili ünite alıştırmalarını yapınız.</p>
            </section>
          </aside>
        </div>
      </article>
    `;

    record.currentQuestion = Math.max(0, Math.min(23, record.currentQuestion));
  }

  function renderPracticeArea(unit) {
    const record = practiceRecord(unit.id);
    const stats = practiceStats(unit);
    const index = record.currentQuestion;
    const exercise = unit.exercises[index];
    const response = record.responses[exercise.id];
    const draft = state.practiceDrafts[draftKey(unit.id, exercise.id)];
    const selectedValue = response ? response.value : draft;
    const remaining = 24 - stats.attempted;

    return `
      <div class="question-map" aria-label="Soru seçici">
        ${unit.exercises.map((item, itemIndex) => {
          const result = record.responses[item.id];
          const statusClass = result ? (result.correct === true ? " is-correct" : result.correct === false ? " is-wrong" : " is-reviewed") : "";
          return `<button type="button" class="question-dot${itemIndex === index ? " active" : ""}${statusClass}" data-question-nav="${itemIndex}" aria-label="Soru ${itemIndex + 1}${result ? ", kontrol edildi" : ""}" aria-current="${itemIndex === index ? "step" : "false"}">${itemIndex + 1}</button>`;
        }).join("")}
      </div>

      <article class="practice-question-card${response ? " is-checked" : ""}" data-question-id="${exercise.id}">
        <header class="practice-question-head">
          <div><span class="practice-counter">${String(index + 1).padStart(2, "0")} / 24</span><h3>${escapeHtml(exercise.kind)}</h3></div>
          <span class="practice-state">${response ? (response.correct === true ? "✓ Doğru" : response.correct === false ? "↻ Tekrar et" : "✓ İncelendi") : "A2 Pratik"}</span>
        </header>

        <div class="practice-question-body">
          ${exercise.context ? `<div class="reading-context" lang="de">${escapeHtml(exercise.context)}</div>` : ""}
          ${exercise.visual ? `<div class="visual-prompt" aria-label="Görsel ipucu">${escapeHtml(exercise.visual)}</div>` : ""}
          ${exercise.table ? `<div class="mini-practice-table" role="table">${exercise.table.map((row) => `<div role="row"><strong role="cell">${escapeHtml(row[0])}</strong><span role="cell">${escapeHtml(row[1])}</span></div>`).join("")}</div>` : ""}
          <p class="practice-prompt" lang="${exercise.type === "choice" || exercise.type === "order" ? "de" : "tr"}">${escapeHtml(exercise.prompt)}</p>
          ${renderPracticeControl(exercise, selectedValue, response)}
          ${renderPracticeFeedback(exercise, response)}
        </div>

        <div class="practice-question-actions">
          ${response
            ? `<button type="button" class="ghost-button" data-retry-question>Tekrar dene</button>${index < 23 ? '<button type="button" class="primary-button" data-question-next>Sonraki soru →</button>' : ""}`
            : '<button type="button" class="primary-button" data-check-question>Kontrol et</button>'}
        </div>
      </article>

      <div class="practice-footer-nav">
        <button type="button" class="ghost-button" data-question-prev ${index === 0 ? "disabled" : ""}>← Önceki</button>
        <span>${stats.attempted}/24 kontrol edildi</span>
        <button type="button" class="ghost-button" data-question-next ${index === 23 ? "disabled" : ""}>Sonraki →</button>
      </div>

      <div class="unit-complete-actions practice-complete">
        <p>${remaining ? `Üniteyi tamamlamak için ${remaining} soruyu daha kontrol et.` : "24 sorunun tamamı kontrol edildi. Üniteni kaydedebilirsin."}</p>
        <button class="secondary-button" type="button" data-complete-unit="${unit.id}" ${remaining ? "disabled" : ""}>${record.completed ? "Ünite tamamlandı ✓" : "Üniteyi tamamla ✓"}</button>
      </div>
    `;
  }

  function renderPracticeControl(exercise, value, response) {
    if (exercise.type === "choice") {
      const selected = Number.isInteger(value) ? value : Number(value);
      return `<div class="practice-options" role="group" aria-label="Cevap seçenekleri">
        ${exercise.options.map((option, optionIndex) => {
          const chosen = selected === optionIndex;
          const resultClass = response ? (optionIndex === exercise.answer ? " correct" : chosen ? " wrong" : "") : chosen ? " selected" : "";
          return `<button type="button" class="practice-option${resultClass}" data-practice-choice="${optionIndex}" aria-pressed="${chosen}" ${response ? "disabled" : ""}>${escapeHtml(option)}</button>`;
        }).join("")}
      </div>`;
    }

    if (exercise.type === "text") {
      return `<label class="practice-input-label"><span>Cevabın</span><input class="practice-text-input${response ? (response.correct ? " correct" : " wrong") : ""}" type="text" data-practice-text value="${escapeHtml(value || "")}" placeholder="${escapeHtml(exercise.placeholder || "Almanca cevabını yaz")}" autocomplete="off" spellcheck="false" ${response ? "disabled" : ""}></label>`;
    }

    if (exercise.type === "order") {
      if (response) return `<div class="order-result${response.correct ? " correct" : " wrong"}" lang="de">${escapeHtml(response.value)}</div>`;
      const selected = Array.isArray(value) ? value : [];
      return `
        <div class="practice-order-zone" aria-label="Oluşturduğun cümle">
          ${selected.length ? selected.map((tokenIndex, position) => `<button type="button" data-practice-order-remove="${position}">${escapeHtml(exercise.tokens[tokenIndex])}</button>`).join("") : '<span>Kelimelere aşağıdan sırayla dokun.</span>'}
        </div>
        <div class="practice-token-bank" aria-label="Kullanılabilir kelimeler">
          ${exercise.tokens.map((token, tokenIndex) => `<button type="button" data-practice-order-token="${tokenIndex}" ${selected.includes(tokenIndex) ? "disabled" : ""}>${escapeHtml(token)}</button>`).join("")}
        </div>`;
    }

    return `<label class="practice-input-label"><span>Kendi cümlen</span><textarea class="practice-textarea" data-practice-text rows="5" placeholder="Almanca cevabını yaz" ${response ? "disabled" : ""}>${escapeHtml(value || "")}</textarea></label>`;
  }

  function renderPracticeFeedback(exercise, response) {
    if (!response) return '<p class="practice-micro-hint">Cevabını yaz veya seç; ardından “Kontrol et”e dokun.</p>';
    const tone = response.correct === true ? "good" : response.correct === false ? "bad" : "neutral";
    const lead = response.correct === true ? "Doğru!" : response.correct === false ? "Henüz değil." : "Üretim görevi incelendi.";
    return `<div class="practice-feedback ${tone}" role="status">
      <strong>${lead}</strong>
      <p><b>Doğru/örnek cevap:</b> <span lang="de">${escapeHtml(exerciseAnswer(exercise))}</span></p>
      <p>${escapeHtml(exercise.explanation)}</p>
      <a href="#lesson-${exercise.id}" data-open-lesson>Kuralı yeniden gör ↑</a>
    </div>`;
  }

  function rerenderPracticeArea(unitId) {
    const unit = units.find((item) => item.id === unitId);
    const area = document.getElementById("practiceArea");
    if (!unit || !area) return;
    area.innerHTML = renderPracticeArea(unit);
    const stats = practiceStats(unit);
    const scoreText = document.getElementById("unitBestScore");
    const scoreBar = document.getElementById("unitScoreBar");
    if (scoreText) scoreText.textContent = `${stats.attempted} / 24`;
    if (scoreBar) scoreBar.style.width = `${stats.percent}%`;
  }

  function selectPracticeChoice(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return;
    const exercise = currentExercise(unit);
    state.practiceDrafts[draftKey(unitId, exercise.id)] = Number(button.dataset.practiceChoice);
    rerenderPracticeArea(unitId);
  }

  function selectPracticeOrderToken(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return;
    const exercise = currentExercise(unit);
    const key = draftKey(unitId, exercise.id);
    const selected = Array.isArray(state.practiceDrafts[key]) ? [...state.practiceDrafts[key]] : [];
    const tokenIndex = Number(button.dataset.practiceOrderToken);
    if (!selected.includes(tokenIndex)) selected.push(tokenIndex);
    state.practiceDrafts[key] = selected;
    rerenderPracticeArea(unitId);
  }

  function removePracticeOrderToken(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return;
    const exercise = currentExercise(unit);
    const key = draftKey(unitId, exercise.id);
    const selected = Array.isArray(state.practiceDrafts[key]) ? [...state.practiceDrafts[key]] : [];
    selected.splice(Number(button.dataset.practiceOrderRemove), 1);
    state.practiceDrafts[key] = selected;
    rerenderPracticeArea(unitId);
  }

  function navigatePracticeQuestion(unitId, nextIndex) {
    const record = practiceRecord(unitId);
    record.currentQuestion = Math.max(0, Math.min(23, nextIndex));
    saveProgress();
    rerenderPracticeArea(unitId);
    document.querySelector(".practice-area")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function checkPracticeQuestion(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return;
    const record = practiceRecord(unitId);
    const exercise = currentExercise(unit);
    const key = draftKey(unitId, exercise.id);
    let value = state.practiceDrafts[key];
    if (exercise.type === "text" || exercise.type === "self") {
      value = page.querySelector("[data-practice-text]")?.value?.trim() || "";
      state.practiceDrafts[key] = value;
    }

    if (exercise.type === "choice" && !Number.isInteger(value)) {
      showToast("Önce bir seçenek işaretle.");
      return;
    }
    if ((exercise.type === "text" || exercise.type === "self") && !value) {
      showToast("Önce cevabını yaz.");
      return;
    }
    if (exercise.type === "order" && (!Array.isArray(value) || value.length !== exercise.tokens.length)) {
      showToast("Cümledeki bütün kelimeleri kullan.");
      return;
    }

    let correct = null;
    let storedValue = value;
    if (exercise.type === "choice") correct = Number(value) === exercise.answer;
    if (exercise.type === "text") correct = exercise.answers.some((answer) => normalize(answer) === normalize(value));
    if (exercise.type === "order") {
      storedValue = value.map((tokenIndex) => exercise.tokens[tokenIndex]).join(" ");
      correct = normalize(storedValue) === normalize(exercise.answerText);
    }

    record.responses[exercise.id] = { value: storedValue, correct, reviewed: true };
    const stats = practiceStats(unit);
    record.best = Math.max(record.best || 0, stats.correct);
    record.completed = record.completed && stats.attempted === 24;
    delete state.practiceDrafts[key];
    saveProgress();
    rerenderPracticeArea(unitId);
    showToast(correct === true ? "Harika, doğru cevap!" : correct === false ? "Açıklamaya bakıp tekrar deneyebilirsin." : "Cevabın için örnek yanıt gösterildi.");
  }

  function retryPracticeQuestion(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    if (!unit) return;
    const record = practiceRecord(unitId);
    const exercise = currentExercise(unit);
    delete record.responses[exercise.id];
    delete state.practiceDrafts[draftKey(unitId, exercise.id)];
    record.completed = false;
    saveProgress();
    rerenderPracticeArea(unitId);
  }

  function completePracticeUnit(id) {
    const unit = units.find((item) => item.id === id);
    if (!unit) return;
    const record = practiceRecord(id);
    const stats = practiceStats(unit);
    if (stats.attempted !== 24) {
      showToast(`Önce kalan ${24 - stats.attempted} soruyu kontrol et.`);
      return;
    }
    record.completed = true;
    record.best = Math.max(record.best || 0, stats.correct);
    saveProgress();
    rerenderPracticeArea(id);
    showToast(`Ünite ${id} tamamlandı: ${stats.correct}/${stats.graded} doğru.`);
  }

  function renderUnit(unit) {
    const record = state.progress[unit.id] || {};
    const best = record.best ?? 0;
    const color = moduleColors[unit.module - 1];
    state.orderSelections[unit.id] = [];

    app.innerHTML = `
      <article class="unit-page" style="--module-color:${color}" data-unit-id="${unit.id}">
        <button type="button" class="back-button" data-go-home><span aria-hidden="true">←</span> Tüm üniteler</button>

        <section class="unit-hero">
          <div class="unit-title">
            <p class="eyebrow">ÜNİTE ${unit.id} · ${unit.book} · MODÜL ${unit.module}</p>
            <h1>${escapeHtml(unit.title)}</h1>
            <p class="unit-subtitle">${escapeHtml(unit.topic)} · Bu sayfada 6 puanlık etkileşimli pratik ve konuşma görevi var.</p>
          </div>
          <div class="score-panel">
            <small>En iyi puanın</small>
            <strong id="unitBestScore">${best} / 6</strong>
            <div class="progress-track"><span id="unitScoreBar" style="width:${(best / 6) * 100}%"></span></div>
          </div>
        </section>

        <div class="unit-layout">
          <div class="unit-main">
            <details class="panel summary-details">
              <summary>Konu açıklaması için tıkla</summary>
              <div class="summary-content">
                <p>${escapeHtml(unit.summary)}</p>
                <div class="logic-note"><strong>AYDA mantık notu:</strong> ${escapeHtml(unit.logic)}</div>
                <ul class="example-list">
                  ${unit.examples.map((example) => `<li lang="de">${escapeHtml(example)}</li>`).join("")}
                </ul>
              </div>
            </details>

            <div class="practice-heading">
              <h2>Şimdi sıra sende</h2>
              <p>Her bölümü kontrol et; sonra üniteyi tamamla.</p>
            </div>

            ${renderChoiceExercise(unit)}
            ${renderFillExercise(unit)}
            ${renderOrderExercise(unit)}
            ${renderSpeakingExercise(unit)}

            <div class="unit-complete-actions">
              <p>Üç alıştırmayı kontrol ettikten sonra ilerlemeni kaydet.</p>
              <button class="secondary-button" type="button" data-complete-unit="${unit.id}">Üniteyi tamamla ✓</button>
            </div>
          </div>

          <aside class="unit-side" aria-label="Ünite destek içerikleri">
            <section class="side-card">
              <span class="grammar-label">Bu ünitenin mantığı</span>
              <p>${escapeHtml(unit.grammar)}</p>
            </section>

            <section class="video-panel">
              <h3>Video desteği</h3>
              <div class="video-list">
                ${unit.videos.map((item) => `
                  <a class="video-button" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
                    <span><small class="video-kind">${escapeHtml(item.kind)}</small><span>${escapeHtml(item.label)}</span></span>
                    <span class="video-arrow" aria-hidden="true">↗</span>
                  </a>
                `).join("")}
              </div>
            </section>

            <section class="hearing-note">
              <h3>Hören</h3>
              <p>Bu bölüm için Menschen A2 Arbeitsbuch'taki ilgili üniteye ve ses kayıtlarına bak.</p>
            </section>
          </aside>
        </div>
      </article>
    `;
  }

  function renderChoiceExercise(unit) {
    return `
      <section class="exercise-card" data-exercise="choice" data-checked="false" data-score="0">
        ${exerciseHeader(1, "Doğru seçeneği bul", "3 soru")}
        <ol class="question-list">
          ${unit.choices.map((item, index) => `
            <li class="question-item" data-question-index="${index}">
              <p class="question-text"><span class="question-label">${index + 1}</span><span lang="de">${escapeHtml(item.q)}</span></p>
              <div class="choice-grid">
                ${item.options.map((option, optionIndex) => `<button type="button" class="choice-button" data-choice="${optionIndex}">${escapeHtml(option)}</button>`).join("")}
              </div>
              <p class="feedback-line" aria-live="polite"></p>
            </li>
          `).join("")}
        </ol>
        ${exerciseActions()}
      </section>
    `;
  }

  function renderFillExercise(unit) {
    return `
      <section class="exercise-card" data-exercise="fill" data-checked="false" data-score="0">
        ${exerciseHeader(2, "Boşluğu doldur", "2 soru")}
        <ol class="question-list">
          ${unit.fills.map((item, index) => `
            <li class="question-item" data-question-index="${index}">
              <p class="question-text"><span class="question-label">${index + 1}</span>Doğru kelimeyi yaz.</p>
              <div class="fill-row" lang="de">
                <span>${escapeHtml(item.before)}</span>
                <label class="sr-only" for="fill-${unit.id}-${index}">Soru ${index + 1} cevabı</label>
                <input class="fill-input" id="fill-${unit.id}-${index}" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" />
                <span>${escapeHtml(item.after)}</span>
              </div>
              <p class="hint">İpucu: ${escapeHtml(item.hint)}</p>
              <p class="feedback-line" aria-live="polite"></p>
            </li>
          `).join("")}
        </ol>
        ${exerciseActions()}
      </section>
    `;
  }

  function renderOrderExercise(unit) {
    return `
      <section class="exercise-card" data-exercise="order" data-checked="false" data-score="0">
        ${exerciseHeader(3, "Cümleyi kur", "1 soru")}
        <div class="question-item" data-question-index="0">
          <p class="question-text">Kelimelere doğru sırayla dokun.</p>
          <div class="order-zone" data-order-zone>
            <span class="order-placeholder">Cümlen burada oluşacak…</span>
          </div>
          <div class="token-bank" aria-label="Kullanılabilir kelimeler">
            ${unit.order.tokens.map((token, index) => `<button type="button" class="token-button" data-token-index="${index}">${escapeHtml(token)}</button>`).join("")}
          </div>
          <p class="hint">İpucu: ${escapeHtml(unit.order.hint)}</p>
          <p class="feedback-line" aria-live="polite"></p>
        </div>
        ${exerciseActions()}
      </section>
    `;
  }

  function renderSpeakingExercise(unit) {
    return `
      <section class="exercise-card speaking-card">
        ${exerciseHeader(4, "Konuşma pratiği", "Serbest")}
        <div class="speaking-prompts">
          ${unit.speaking.map((prompt, index) => `<div class="speaking-prompt"><strong>${index + 1}.</strong> <span lang="de">${escapeHtml(prompt)}</span></div>`).join("")}
        </div>
      </section>
    `;
  }

  function exerciseHeader(index, title, type) {
    return `
      <div class="exercise-head">
        <div class="exercise-head-left"><span class="exercise-index">${index}</span><h3>${title}</h3></div>
        <span class="type-pill">${type}</span>
      </div>
    `;
  }

  function exerciseActions() {
    return `
      <div class="exercise-actions">
        <button type="button" class="ghost-button" data-reset-exercise>Temizle</button>
        <button type="button" class="primary-button" data-check-exercise>Kontrol et</button>
      </div>
    `;
  }

  function invalidateCard(card) {
    if (!card) return;
    card.dataset.checked = "false";
    card.dataset.score = "0";
    card.querySelectorAll(".correct, .wrong").forEach((item) => item.classList.remove("correct", "wrong"));
    card.querySelectorAll(".feedback-line").forEach((item) => {
      item.textContent = "";
      item.classList.remove("good", "bad");
    });
  }

  function selectChoice(button) {
    const item = button.closest(".question-item");
    const card = button.closest(".exercise-card");
    invalidateCard(card);
    item.querySelectorAll(".choice-button").forEach((choiceButton) => choiceButton.classList.remove("selected"));
    button.classList.add("selected");
  }

  function selectOrderToken(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const card = button.closest(".exercise-card");
    const index = Number(button.dataset.tokenIndex);
    if (!Number.isInteger(index)) return;
    invalidateCard(card);
    const selected = state.orderSelections[unitId] || [];
    if (!selected.includes(index)) selected.push(index);
    state.orderSelections[unitId] = selected;
    renderOrderState(card, unitId);
  }

  function removeOrderToken(button) {
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const card = button.closest(".exercise-card");
    const index = Number(button.dataset.selectedTokenIndex);
    invalidateCard(card);
    const selected = state.orderSelections[unitId] || [];
    state.orderSelections[unitId] = selected.filter((item) => item !== index);
    renderOrderState(card, unitId);
  }

  function renderOrderState(card, unitId) {
    const unit = units.find((item) => item.id === unitId);
    const zone = card?.querySelector("[data-order-zone]");
    if (!unit || !zone) return;
    const selected = state.orderSelections[unitId] || [];
    zone.innerHTML = selected.length
      ? `<div class="selected-tokens">${selected.map((index) => `<button type="button" class="token-button" data-selected-token-index="${index}" title="Geri al">${escapeHtml(unit.order.tokens[index])}</button>`).join("")}</div>`
      : '<span class="order-placeholder">Cümlen burada oluşacak…</span>';
    card.querySelectorAll("[data-token-index]").forEach((button) => {
      button.disabled = selected.includes(Number(button.dataset.tokenIndex));
    });
  }

  function checkExercise(button) {
    const card = button.closest(".exercise-card");
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    const unit = units.find((item) => item.id === unitId);
    if (!card || !unit) return;

    const kind = card.dataset.exercise;
    let score = 0;
    let total = 0;
    if (kind === "choice") ({ score, total } = checkChoices(card, unit));
    if (kind === "fill") ({ score, total } = checkFills(card, unit));
    if (kind === "order") ({ score, total } = checkOrder(card, unit));

    card.dataset.checked = "true";
    card.dataset.score = String(score);
    updateUnitBestFromPage(unitId);
    showToast(score === total ? `Harika! ${score}/${total} doğru.` : `${score}/${total} doğru. İpuçlarına bakıp tekrar dene.`);
  }

  function checkChoices(card, unit) {
    let score = 0;
    unit.choices.forEach((question, index) => {
      const item = card.querySelector(`[data-question-index="${index}"]`);
      const buttons = [...item.querySelectorAll(".choice-button")];
      const selected = buttons.findIndex((button) => button.classList.contains("selected"));
      buttons.forEach((button, buttonIndex) => {
        button.classList.remove("correct", "wrong");
        if (buttonIndex === question.answer) button.classList.add("correct");
        if (buttonIndex === selected && selected !== question.answer) button.classList.add("wrong");
      });
      const feedback = item.querySelector(".feedback-line");
      const correct = selected === question.answer;
      if (correct) score += 1;
      feedback.textContent = correct ? `Doğru. ${question.explain}` : selected < 0 ? `Bir seçenek işaretle. ${question.explain}` : `Tekrar bak. ${question.explain}`;
      feedback.classList.toggle("good", correct);
      feedback.classList.toggle("bad", !correct);
    });
    return { score, total: unit.choices.length };
  }

  function checkFills(card, unit) {
    let score = 0;
    unit.fills.forEach((question, index) => {
      const item = card.querySelector(`[data-question-index="${index}"]`);
      const input = item.querySelector(".fill-input");
      const value = normalize(input.value);
      const correct = question.answers.some((answer) => normalize(answer) === value);
      input.classList.toggle("correct", correct);
      input.classList.toggle("wrong", !correct);
      if (correct) score += 1;
      const feedback = item.querySelector(".feedback-line");
      feedback.textContent = correct ? "Doğru!" : `Doğru cevap: ${question.answers[0]}`;
      feedback.classList.toggle("good", correct);
      feedback.classList.toggle("bad", !correct);
    });
    return { score, total: unit.fills.length };
  }

  function checkOrder(card, unit) {
    const selected = state.orderSelections[unit.id] || [];
    const sentence = selected.map((index) => unit.order.tokens[index]).join(" ");
    const correct = normalize(sentence) === normalize(unit.order.answer);
    const zone = card.querySelector("[data-order-zone]");
    const feedback = card.querySelector(".feedback-line");
    zone.classList.toggle("correct", correct);
    zone.classList.toggle("wrong", !correct);
    feedback.textContent = correct ? "Doğru cümle!" : `Doğru sıra: ${unit.order.answer}`;
    feedback.classList.toggle("good", correct);
    feedback.classList.toggle("bad", !correct);
    return { score: correct ? 1 : 0, total: 1 };
  }

  function updateUnitBestFromPage(unitId) {
    const page = app.querySelector(`.unit-page[data-unit-id="${unitId}"]`);
    if (!page) return;
    const currentScore = [...page.querySelectorAll(".exercise-card[data-exercise]")]
      .reduce((sum, card) => sum + Number(card.dataset.score || 0), 0);
    const record = state.progress[unitId] || { best: 0, completed: false };
    record.best = Math.max(Number(record.best || 0), currentScore);
    state.progress[unitId] = record;
    saveProgress();
    const scoreText = document.getElementById("unitBestScore");
    const scoreBar = document.getElementById("unitScoreBar");
    if (scoreText) scoreText.textContent = `${record.best} / 6`;
    if (scoreBar) scoreBar.style.width = `${(record.best / 6) * 100}%`;
  }

  function resetExercise(button) {
    const card = button.closest(".exercise-card");
    const page = button.closest(".unit-page");
    const unitId = Number(page?.dataset.unitId);
    if (!card) return;
    card.querySelectorAll(".choice-button").forEach((item) => item.classList.remove("selected", "correct", "wrong"));
    card.querySelectorAll(".fill-input").forEach((input) => {
      input.value = "";
      input.classList.remove("correct", "wrong");
    });
    if (card.dataset.exercise === "order") {
      state.orderSelections[unitId] = [];
      renderOrderState(card, unitId);
      card.querySelector("[data-order-zone]")?.classList.remove("correct", "wrong");
    }
    invalidateCard(card);
    showToast("Bu alıştırma temizlendi.");
  }

  function completeUnit(id) {
    const page = app.querySelector(`.unit-page[data-unit-id="${id}"]`);
    const cards = page ? [...page.querySelectorAll(".exercise-card[data-exercise]")] : [];
    if (!cards.length || cards.some((card) => card.dataset.checked !== "true")) {
      showToast("Önce üç alıştırmada da “Kontrol et” düğmesine bas.");
      return;
    }
    const score = cards.reduce((sum, card) => sum + Number(card.dataset.score || 0), 0);
    const record = state.progress[id] || {};
    record.best = Math.max(Number(record.best || 0), score);
    record.completed = true;
    state.progress[id] = record;
    saveProgress();
    showToast(`Ünite ${id} tamamlandı. En iyi puan: ${record.best}/6`);
    const next = units.find((unit) => unit.id === id + 1);
    const action = page.querySelector("[data-complete-unit]");
    if (action) {
      action.textContent = next ? `Ünite ${next.id}'e geç →` : "Tüm üniteler ✓";
      action.dataset.nextUnit = next ? String(next.id) : "home";
      action.removeAttribute("data-complete-unit");
    }
  }

  function resetAllProgress() {
    if (!window.confirm("Tüm A2 ilerlemen ve puanların silinsin mi?")) return;
    state.progress = {};
    localStorage.removeItem(STORAGE_KEY);
    showToast("İlerleme sıfırlandı.");
    renderRoute();
  }

  function logout() {
    if (typeof window.aydaClearAccess === "function") {
      window.aydaClearAccess();
    } else {
      localStorage.removeItem("ayda_access");
      localStorage.removeItem("ayda_code");
    }
    const protectedContent = document.getElementById("aydaProtectedContent");
    const loginBox = document.getElementById("aydaLoginBox");
    if (protectedContent) protectedContent.style.display = "none";
    if (loginBox) loginBox.style.display = "grid";
    const input = document.getElementById("aydaPasswordInput");
    if (input) {
      input.value = "";
      window.setTimeout(() => input.focus(), 50);
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.matches("[data-select-video]")) {
      selectUnitVideo(target);
      return;
    }
    if (target.matches("[data-nav]")) {
      navigateView(target.dataset.nav);
      return;
    }
    if (target.matches("[data-open-unit]")) {
      navigateUnit(Number(target.dataset.openUnit));
      return;
    }
    if (target.matches("[data-go-home]")) {
      navigateUnits();
      return;
    }
    if (target.matches("[data-filter]")) {
      state.filter = target.dataset.filter;
      renderUnits();
      return;
    }
    if (target.matches("[data-question-nav]")) {
      const page = target.closest(".unit-page");
      navigatePracticeQuestion(Number(page?.dataset.unitId), Number(target.dataset.questionNav));
      return;
    }
    if (target.matches("[data-question-prev]")) {
      const page = target.closest(".unit-page");
      const unitId = Number(page?.dataset.unitId);
      navigatePracticeQuestion(unitId, practiceRecord(unitId).currentQuestion - 1);
      return;
    }
    if (target.matches("[data-question-next]")) {
      const page = target.closest(".unit-page");
      const unitId = Number(page?.dataset.unitId);
      navigatePracticeQuestion(unitId, practiceRecord(unitId).currentQuestion + 1);
      return;
    }
    if (target.matches("[data-practice-choice]")) {
      selectPracticeChoice(target);
      return;
    }
    if (target.matches("[data-practice-order-token]")) {
      selectPracticeOrderToken(target);
      return;
    }
    if (target.matches("[data-practice-order-remove]")) {
      removePracticeOrderToken(target);
      return;
    }
    if (target.matches("[data-check-question]")) {
      checkPracticeQuestion(target);
      return;
    }
    if (target.matches("[data-retry-question]")) {
      retryPracticeQuestion(target);
      return;
    }
    if (target.matches("[data-open-lesson]")) {
      event.preventDefault();
      const lesson = target.closest(".unit-page")?.querySelector(".summary-details");
      if (lesson) {
        lesson.open = true;
        lesson.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    if (target.matches(".choice-button")) {
      selectChoice(target);
      return;
    }
    if (target.matches("[data-token-index]")) {
      selectOrderToken(target);
      return;
    }
    if (target.matches("[data-selected-token-index]")) {
      removeOrderToken(target);
      return;
    }
    if (target.matches("[data-check-exercise]")) {
      checkExercise(target);
      return;
    }
    if (target.matches("[data-reset-exercise]")) {
      resetExercise(target);
      return;
    }
    if (target.matches("[data-complete-unit]")) {
      completePracticeUnit(Number(target.dataset.completeUnit));
      return;
    }
    if (target.matches("[data-next-unit]")) {
      target.dataset.nextUnit === "home" ? navigateHome() : navigateUnit(Number(target.dataset.nextUnit));
      return;
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("#unitSearch")) {
      state.search = event.target.value;
      const results = document.getElementById("unitResults");
      if (results) results.innerHTML = renderUnitResults();
    }
    if (event.target.matches(".fill-input")) invalidateCard(event.target.closest(".exercise-card"));
    if (event.target.matches("[data-practice-text]")) {
      const page = event.target.closest(".unit-page");
      const unitId = Number(page?.dataset.unitId);
      const unit = units.find((item) => item.id === unitId);
      if (unit) {
        const exercise = currentExercise(unit);
        state.practiceDrafts[draftKey(unitId, exercise.id)] = event.target.value;
      }
    }
  });

  document.getElementById("homeButton")?.addEventListener("click", navigateHome);
  document.getElementById("logoutButton")?.addEventListener("click", logout);
  document.getElementById("footerResetButton")?.addEventListener("click", resetAllProgress);
  window.addEventListener("hashchange", renderRoute);

  renderRoute();
})();
