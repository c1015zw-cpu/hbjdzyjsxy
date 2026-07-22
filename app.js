(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) {
    document.body.innerHTML = "<p style='padding:2rem'>页面暂时无法加载，请稍后重试。</p>";
    return;
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
  const safeUrl = (value = "") => {
    try {
      const url = new URL(value, window.location.href);
      return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? url.href : "#";
    } catch {
      return "#";
    }
  };
  const setText = (selector, value) => $$(selector).forEach((node) => { node.textContent = value ?? ""; });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function replayAnimation(node, className, duration = 900) {
    if (!node || reduceMotion.matches) return;
    node._animationTimers ||= {};
    window.clearTimeout(node._animationTimers[className]);
    node.classList.remove(className);
    void node.offsetWidth;
    node.classList.add(className);
    node._animationTimers[className] = window.setTimeout(() => node.classList.remove(className), duration);
  }

  function showToast(message) {
    const toast = $("[data-toast]");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function showCustomizationPrompt() {
    const prompt = $("[data-custom-prompt]");
    if (!prompt) return;
    showCustomizationPrompt.previousFocus = document.activeElement;
    prompt.hidden = false;
    window.requestAnimationFrame(() => {
      prompt.classList.add("is-open");
      $("[data-custom-prompt-action]", prompt)?.focus({ preventScroll: true });
    });
  }

  function closeCustomizationPrompt({ restoreFocus = true } = {}) {
    const prompt = $("[data-custom-prompt]");
    if (!prompt || prompt.hidden) return;
    prompt.classList.remove("is-open");
    window.setTimeout(() => { prompt.hidden = true; }, 220);
    if (restoreFocus && showCustomizationPrompt.previousFocus instanceof HTMLElement) {
      showCustomizationPrompt.previousFocus.focus({ preventScroll: true });
    }
  }

  function bindCustomizationPrompt() {
    const prompt = $("[data-custom-prompt]");
    if (!prompt) return;
    prompt.addEventListener("click", (event) => {
      if (event.target === prompt || event.target.closest("[data-custom-prompt-close]")) {
        closeCustomizationPrompt();
      }
      if (event.target.closest("[data-custom-prompt-action]")) {
        closeCustomizationPrompt({ restoreFocus: false });
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !prompt.hidden) closeCustomizationPrompt();
    });
  }

  function applySiteSettings() {
    document.documentElement.lang = data.site.language || "zh-CN";
    document.title = data.site.title;
    $("meta[name='description']").setAttribute("content", data.site.description);
    $("meta[name='theme-color']").setAttribute("content", data.site.themeColor);
    const colors = data.site.colors || {};
    Object.entries(colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });

    const brandLogo = String(data.brand.logo || 'assets/avatar-240.jpg').replace(/["'()\\\r\n]/g, '');
    $$('[data-brand-logo]').forEach((node) => {
      node.style.setProperty('--brand-logo-image', `url("${brandLogo}")`);
      node.addEventListener('contextmenu', (event) => event.preventDefault());
    });
    setText("[data-brand-name]", data.brand.name);
    setText("[data-brand-subtitle]", data.brand.subtitle);
    setText("[data-footer-line]", data.brand.footerLine);
    setText("[data-edition]", data.hero.edition);
    setText("[data-hero-prefix]", data.hero.prefix);
    setText("[data-hero-title]", data.hero.title);
    setText("[data-hero-intro]", data.hero.intro);
    setText("[data-primary-action]", data.hero.primaryAction);
    setText("[data-arrival-date]", data.hero.arrivalDate);
    setText("[data-campus-address]", data.hero.campusAddress);
    setText("[data-status-label]", data.hero.statusLabel);
    setText("[data-updated-at]", data.hero.updatedAt);
    setText("[data-card-message]", data.hero.cardMessage);
    setText("[data-roadmap-intro]", data.roadmapIntro);
    setText("[data-disclaimer]", data.legal.disclaimer);
    setText("[data-footer-note]", data.legal.footerNote);

    const notice = $("[data-notice-wrap]");
    notice.hidden = !data.notice.enabled;
    setText("[data-notice-title]", data.notice.title);
    setText("[data-notice-text]", data.notice.text);
  }

  function assignRandomWatermarks() {
    const watermarkLogos = [
      "assets/pendant-gear.webp",
      "assets/pendant-backpack.webp",
      "assets/pendant-letter.webp",
      "assets/decor-open-book.webp"
    ];
    $$(".hero, .week-card, .content-chapter, .contact-strip").forEach((node) => {
      const logo = watermarkLogos[Math.floor(Math.random() * watermarkLogos.length)];
      node.style.setProperty("--watermark-logo", `url("${logo}")`);
    });
  }

  const themeStorageKey = `campus-theme:${data.site.id}`;
  function applyTheme(themeId, announce = false) {
    const theme = (data.themes || []).find((item) => item.id === themeId) || data.themes?.[0];
    if (!theme) return;
    Object.entries(theme.colors).forEach(([name, value]) => {
      document.documentElement.style.setProperty(`--${name}`, value);
    });
    document.documentElement.dataset.theme = theme.id;
    $("meta[name='theme-color']").setAttribute("content", theme.colors.brand);
    $$('[data-theme-id]').forEach((button) => {
      const active = button.dataset.themeId === theme.id;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    try { localStorage.setItem(themeStorageKey, theme.id); } catch { /* 隐私模式下忽略 */ }
    if (announce) showToast(`已切换为${theme.label}主题`);
  }

  function renderThemePicker() {
    const picker = $("[data-theme-picker]");
    if (!picker || !data.themes?.length) return;
    picker.innerHTML = data.themes.map((theme) => `
      <button
        class="theme-dot"
        type="button"
        data-theme-id="${escapeHtml(theme.id)}"
        aria-label="切换为${escapeHtml(theme.label)}主题"
        aria-pressed="false"
        title="${escapeHtml(theme.label)}"
        style="--dot-brand:${escapeHtml(theme.colors.brand)};--dot-accent:${escapeHtml(theme.colors.accent)}"
      ></button>
    `).join("");
    picker.addEventListener("click", (event) => {
      const button = event.target.closest("[data-theme-id]");
      if (button) applyTheme(button.dataset.themeId, true);
    });
    let savedTheme = data.site.defaultTheme;
    try { savedTheme = localStorage.getItem(themeStorageKey) || savedTheme; } catch { /* 隐私模式下忽略 */ }
    applyTheme(savedTheme);
  }

  function renderQuickLinks() {
    $("[data-quick-links]").innerHTML = data.quickLinks.map((item) => {
      const internal = String(item.url).startsWith("#");
      const attributes = internal ? "" : ' target="_blank" rel="noopener noreferrer"';
      return `
        <a class="quick-card reveal" href="${internal ? escapeHtml(item.url) : safeUrl(item.url)}"${attributes}>
          <span class="quick-icon">${escapeHtml(item.icon)}</span>
          <div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small></div>
          <i aria-hidden="true">↗</i>
        </a>
      `;
    }).join("");
  }

  function renderRoadmap() {
    $("[data-roadmap]").innerHTML = data.roadmap.map((item, index) => `
      <li class="reveal">
        <div class="roadmap-index"><span>${String(index + 1).padStart(2, "0")}</span><i></i></div>
        <div class="roadmap-copy">
          <small>${escapeHtml(item.time)}</small>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.detail)}</p>
        </div>
      </li>
    `).join("");
  }

  function renderHighlights() {
    const container = $("[data-highlights]");
    if (!container) return;
    container.innerHTML = data.highlights.map((item) => `
      <div><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.label)}</span></div>
    `).join("");
  }

  function renderTaskGroup(groupId) {
    const group = data.taskGroups.find((item) => item.id === groupId) || data.taskGroups[0];
    const panel = $("[data-task-panel]");
    panel.innerHTML = `
      <div class="task-heading">
        <p>${escapeHtml(group.eyebrow)}</p>
        <h3>${escapeHtml(group.title)}</h3>
        <span>${escapeHtml(group.intro)}</span>
      </div>
      <div class="task-list">
        ${group.items.map((item, index) => `
          <div class="task-item">
            <b>${String(index + 1).padStart(2, "0")}</b>
            <div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.detail)}</p></div>
          </div>
        `).join("")}
      </div>
      <div class="task-tip"><span>提示</span><p>${escapeHtml(group.tip)}</p></div>
    `;

    $$("[role='tab']").forEach((tab) => {
      const active = tab.dataset.group === group.id;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
  }

  function renderTasks() {
    const tabs = $("[data-task-tabs]");
    tabs.innerHTML = data.taskGroups.map((group, index) => `
      <button type="button" role="tab" data-group="${escapeHtml(group.id)}" aria-selected="${index === 0}" tabindex="${index === 0 ? 0 : -1}">
        ${escapeHtml(group.label)}
      </button>
    `).join("");
    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-group]");
      if (button) renderTaskGroup(button.dataset.group);
    });
    tabs.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const buttons = $$('[role="tab"]', tabs);
      const current = buttons.indexOf(document.activeElement);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = buttons[(current + direction + buttons.length) % buttons.length];
      next.focus();
      renderTaskGroup(next.dataset.group);
    });
    renderTaskGroup(data.taskGroups[0].id);
  }

  function renderWeekPlan() {
    const container = $("[data-week-plan]");
    if (!container) return;
    container.innerHTML = data.weekPlan.map((item, index) => `
      <article class="week-card reveal">
        <div class="week-card-top"><span>${escapeHtml(item.day)}</span><b>${String(index + 1).padStart(2, "0")}</b></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
        <small>${escapeHtml(item.tag)}</small>
      </article>
    `).join("");
  }

  function renderServiceDirectory() {
    const toolbar = $("[data-service-filters]");
    const grid = $("[data-service-grid]");
    if (!toolbar || !grid) return;

    toolbar.innerHTML = data.serviceFilters.map((filter, index) => `
      <button type="button" data-service-filter="${escapeHtml(filter.id)}" aria-pressed="${index === 0}">
        ${escapeHtml(filter.label)}
      </button>
    `).join("");

    const renderGrid = (filterId) => {
      const items = filterId === "all"
        ? data.serviceDirectory
        : data.serviceDirectory.filter((item) => item.category === filterId);
      grid.innerHTML = items.map((item) => {
        const href = String(item.url || "#");
        const external = /^https?:/i.test(href);
        const attributes = external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `
          <article class="service-card reveal">
            <div class="service-card-top">
              <span>${escapeHtml(item.icon)}</span>
              <small>${escapeHtml(item.meta)}</small>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.detail)}</p>
            <a class="service-action" href="${href.startsWith("#") ? escapeHtml(href) : safeUrl(href)}"${attributes}>
              ${escapeHtml(item.action || "打开入口")} <i aria-hidden="true">↗</i>
            </a>
          </article>
        `;
      }).join("");
      $$('[data-service-filter]', toolbar).forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.serviceFilter === filterId));
      });
      observeReveals();
    };

    toolbar.addEventListener("click", (event) => {
      const button = event.target.closest("[data-service-filter]");
      if (button) renderGrid(button.dataset.serviceFilter);
    });
    renderGrid(data.serviceFilters[0].id);
  }

  const storageKey = `campus-guide:${data.site.id}:${data.site.contentVersion}:checklist`;
  function loadChecks() {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
  }

  function updateProgress({ animate = false } = {}) {
    const inputs = $$("[data-checklist] input");
    const checked = inputs.filter((input) => input.checked).length;
    const total = inputs.length;
    const percent = total ? Math.round((checked / total) * 100) : 0;
    setText("[data-progress-percent]", `${percent}%`);
    setText("[data-checklist-count]", `${checked} / ${total} 已完成`);
    $("[data-progress-orbit]").style.setProperty("--progress", `${percent * 3.6}deg`);
    $("[data-mini-progress]").style.width = `${percent}%`;
    if (animate) {
      replayAnimation($(".mini-progress"), "is-advancing", 850);
      replayAnimation($("[data-checklist-count]"), "is-bumping", 550);
      replayAnimation($("[data-progress-percent]"), "is-bumping", 550);
      replayAnimation($("[data-progress-orbit]"), "is-pulsing", 650);
    }
    return percent;
  }

  function renderChecklist() {
    const completed = new Set(loadChecks());
    const groups = [...new Set(data.checklist.map((item) => item.group))];
    $("[data-checklist]").innerHTML = groups.map((group) => `
      <fieldset>
        <legend>${escapeHtml(group)}</legend>
        ${data.checklist.filter((item) => item.group === group).map((item) => `
          <label>
            <input type="checkbox" value="${escapeHtml(item.id)}" ${completed.has(item.id) ? "checked" : ""} />
            <span class="check-box" aria-hidden="true"></span>
            <span>${escapeHtml(item.text)}</span>
          </label>
        `).join("")}
      </fieldset>
    `).join("");

    $("[data-checklist]").addEventListener("change", (event) => {
      const changedInput = event.target.closest('input[type="checkbox"]');
      if (changedInput?.checked) {
        replayAnimation(changedInput.nextElementSibling, "is-checking", 620);
        replayAnimation(changedInput.closest("label"), "is-confirmed", 620);
      }
      const values = $$("[data-checklist] input:checked").map((input) => input.value);
      try { localStorage.setItem(storageKey, JSON.stringify(values)); } catch { /* 隐私模式下忽略 */ }
      const percent = updateProgress({ animate: true });
      if (percent === 100) showToast("准备清单完成，安心出发吧");
    });
    $("[data-reset-checklist]").addEventListener("click", () => {
      $$("[data-checklist] input").forEach((input) => { input.checked = false; });
      try { localStorage.removeItem(storageKey); } catch { /* 隐私模式下忽略 */ }
      updateProgress({ animate: true });
      showToast("清单已重新整理");
    });
    updateProgress();
  }

  function renderSafetyCards() {
    const container = $("[data-safety-cards]");
    if (!container) return;
    container.innerHTML = data.safetyCards.map((item) => `
      <article class="safety-card reveal">
        <span>${escapeHtml(item.icon)}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
      </article>
    `).join("");
  }

  function renderFaqs() {
    $("[data-faq-list]").innerHTML = data.faqs.map((item, index) => `
      <details ${index === 0 ? "open" : ""}>
        <summary><span>${escapeHtml(item.question)}</span><i aria-hidden="true"></i></summary>
        <p>${escapeHtml(item.answer)}</p>
      </details>
    `).join("");
  }

  function renderCustomizationModules() {
    const container = $("[data-customization-modules]");
    if (!container) return;
    container.innerHTML = data.customizationModules.map((item) => `
      <article class="customization-card reveal">
        <div class="customization-card-top"><b>${escapeHtml(item.index)}</b><span>${escapeHtml(item.tag)}</span></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.detail)}</p>
        <ul>${item.examples.map((example) => `<li>${escapeHtml(example)}</li>`).join("")}</ul>
      </article>
    `).join("");
  }

  function renderProjectCases() {
    const container = $("[data-project-cases]");
    if (!container) return;
    container.innerHTML = data.projectCases.map((item, index) => `
      <a class="case-card case-${escapeHtml(item.tone)} reveal" href="${safeUrl(item.href)}">
        <div class="case-preview" aria-hidden="true">
          <span class="case-browser-bar"><i></i><i></i><i></i></span>
          <div class="case-screen">
            <b>${String(index + 1).padStart(2, "0")}</b>
            <span></span><span></span><span></span>
            <div><i></i><i></i><i></i></div>
          </div>
        </div>
        <div class="case-meta"><span>${escapeHtml(item.level)}</span><small>${escapeHtml(item.type)}</small></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
        <strong>${escapeHtml(item.suitable)}</strong>
        <ul>${item.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
        <span class="case-link">查看完整页面 <i aria-hidden="true">↗</i></span>
      </a>
    `).join("");
  }

  function renderContact() {
    const contact = data.contact;
    const wrap = $("[data-contact-wrap]");
    if (!wrap) return;
    wrap.hidden = !contact.enabled;
    setText("[data-contact-kicker]", contact.kicker);
    setText("[data-contact-title]", contact.title);
    const link = $("[data-contact-link]");
    if (!link) return;
    link.textContent = contact.label;
    const internal = String(contact.url || "").startsWith("#");
    link.href = internal ? contact.url : safeUrl(contact.url);
    if (!internal) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }

  function bindUtilities() {
    $("[data-share]").addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: data.site.title, text: data.site.description, url: location.href });
          return;
        } catch (error) {
          if (error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(location.href);
        showToast("页面链接已复制");
      } catch {
        showToast("请复制浏览器地址分享");
      }
    });
  }

  function bindPlayfulEffects() {
    $$("[data-elastic-pendant]").forEach((pendant) => {
      const body = $("[data-pendant-body]", pendant);
      if (!body) return;

      let x = 0;
      let y = 0;
      let velocityX = 0;
      let velocityY = 0;
      let pointerId = null;
      let homeLeft = 0;
      let homeTop = 0;
      let bodyWidth = 0;
      let bodyHeight = 0;
      let grabOffsetX = 0;
      let grabOffsetY = 0;
      let lastX = 0;
      let lastY = 0;
      let lastTime = 0;
      let dragStartX = 0;
      let dragStartY = 0;
      let moved = false;
      let dragging = false;
      let springFrame = 0;

      const stringBase = () => parseFloat(getComputedStyle(pendant).getPropertyValue("--string-base")) || 20;
      const stringOverlap = () => parseFloat(getComputedStyle(pendant).getPropertyValue("--string-overlap")) || 8;
      const renderPendant = () => {
        const lineY = Math.max(5, stringBase() + y + stringOverlap());
        const lineLength = Math.hypot(x, lineY);
        const lineAngle = Math.atan2(lineY, x) * 180 / Math.PI - 90;
        const rotation = Math.max(-24, Math.min(24, x * .025 + velocityX * 1.15));
        pendant.style.setProperty("--drag-x", `${x.toFixed(2)}px`);
        pendant.style.setProperty("--drag-y", `${y.toFixed(2)}px`);
        pendant.style.setProperty("--drag-rotate", `${rotation.toFixed(2)}deg`);
        pendant.style.setProperty("--line-length", `${lineLength.toFixed(2)}px`);
        pendant.style.setProperty("--line-angle", `${lineAngle.toFixed(2)}deg`);
      };

      const stopSpring = () => {
        if (!springFrame) return;
        cancelAnimationFrame(springFrame);
        springFrame = 0;
      };

      const springHome = () => {
        stopSpring();
        if (reduceMotion.matches) {
          x = 0;
          y = 0;
          velocityX = 0;
          velocityY = 0;
          renderPendant();
          return;
        }

        if (Math.abs(velocityX) < 2 && Math.hypot(x, y) > 12) {
          velocityX += (Math.random() > .5 ? 1 : -1) * 2.8;
        }

        const tick = () => {
          const distance = Math.hypot(x, y);
          const stiffness = .028 + Math.min(distance / 1000, .035);
          const damping = distance > 34 ? .92 : .84;
          velocityX = Math.max(-58, Math.min(58, (velocityX - x * stiffness) * damping));
          velocityY = Math.max(-58, Math.min(58, (velocityY - y * stiffness) * damping));
          x += velocityX;
          y += velocityY;
          renderPendant();

          if (Math.abs(x) < .12 && Math.abs(y) < .12 && Math.abs(velocityX) < .12 && Math.abs(velocityY) < .12) {
            x = 0;
            y = 0;
            velocityX = 0;
            velocityY = 0;
            springFrame = 0;
            renderPendant();
            return;
          }
          springFrame = requestAnimationFrame(tick);
        };
        springFrame = requestAnimationFrame(tick);
      };

      const pluckPendant = () => {
        if (reduceMotion.matches) return;
        stopSpring();
        y = 22;
        velocityX = (Math.random() > .5 ? 1 : -1) * 3.2;
        velocityY = 2;
        renderPendant();
        springHome();
      };

      body.addEventListener("pointerdown", (event) => {
        if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
        event.preventDefault();
        stopSpring();
        pointerId = event.pointerId;
        const rect = body.getBoundingClientRect();
        homeLeft = rect.left - x;
        homeTop = rect.top - y;
        bodyWidth = rect.width;
        bodyHeight = rect.height;
        grabOffsetX = event.clientX - rect.left;
        grabOffsetY = event.clientY - rect.top;
        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = performance.now();
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        moved = false;
        dragging = true;
        pendant.classList.add("is-dragging");
        body.setPointerCapture(pointerId);
      });

      body.addEventListener("pointermove", (event) => {
        if (event.pointerId !== pointerId) return;
        event.preventDefault();
        const now = performance.now();
        const elapsed = Math.max(8, now - lastTime);
        const margin = 6;
        const nextX = event.clientX - grabOffsetX - homeLeft;
        const nextY = event.clientY - grabOffsetY - homeTop;
        const minX = margin - homeLeft;
        const maxX = window.innerWidth - margin - bodyWidth - homeLeft;
        const minY = margin - homeTop;
        const maxY = window.innerHeight - margin - bodyHeight - homeTop;
        x = Math.max(minX, Math.min(maxX, nextX));
        y = Math.max(minY, Math.min(maxY, nextY));
        velocityX = Math.max(-34, Math.min(34, (event.clientX - lastX) / elapsed * 16));
        velocityY = Math.max(-34, Math.min(34, (event.clientY - lastY) / elapsed * 16));
        moved ||= Math.hypot(event.clientX - dragStartX, event.clientY - dragStartY) > 4;
        lastX = event.clientX;
        lastY = event.clientY;
        lastTime = now;
        renderPendant();
      });

      const releasePendant = (event = null) => {
        if (!dragging || (event && event.pointerId !== pointerId)) return;
        const releasedPointerId = pointerId;
        dragging = false;
        pointerId = null;
        pendant.classList.remove("is-dragging");
        if (releasedPointerId !== null && body.hasPointerCapture(releasedPointerId)) {
          body.releasePointerCapture(releasedPointerId);
        }
        if (!moved) {
          pluckPendant();
          return;
        }
        springHome();
      };
      body.addEventListener("pointerup", releasePendant);
      body.addEventListener("pointercancel", releasePendant);
      body.addEventListener("lostpointercapture", () => releasePendant());
      window.addEventListener("blur", () => releasePendant());
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) releasePendant();
      });

      pendant.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        pluckPendant();
      });
      renderPendant();
    });

    if (reduceMotion.matches) return;
    document.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return;
      const rootStyle = getComputedStyle(document.documentElement);
      const colors = [
        rootStyle.getPropertyValue("--accent").trim(),
        rootStyle.getPropertyValue("--brand").trim(),
        rootStyle.getPropertyValue("--soft").trim(),
        rootStyle.getPropertyValue("--white").trim()
      ].filter(Boolean);
      const particleCount = event.pointerType === "touch" ? 6 : 9;

      for (let index = 0; index < particleCount; index += 1) {
        const angle = (Math.PI * 2 * index) / particleCount + (Math.random() - .5) * .45;
        const distance = 24 + Math.random() * 34;
        const particle = document.createElement("i");
        particle.className = "pointer-particle";
        particle.style.setProperty("--particle-x", `${event.clientX}px`);
        particle.style.setProperty("--particle-y", `${event.clientY}px`);
        particle.style.setProperty("--particle-tx", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--particle-ty", `${Math.sin(angle) * distance}px`);
        particle.style.setProperty("--particle-spin", `${Math.round((Math.random() - .5) * 240)}deg`);
        particle.style.setProperty("--particle-size", `${4 + Math.random() * 5}px`);
        particle.style.setProperty("--particle-radius", index % 3 === 0 ? "2px" : "50%");
        particle.style.setProperty("--particle-color", colors[index % colors.length]);
        document.body.appendChild(particle);
        particle.addEventListener("animationend", () => particle.remove(), { once: true });
        window.setTimeout(() => particle.remove(), 900);
      }
    }, { passive: true });
  }

  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach((node) => node.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    $$(".reveal").forEach((node) => observer.observe(node));
  }

  function restoreHashPosition() {
    if (!window.location.hash) return;
    let targetId = window.location.hash.slice(1);
    try { targetId = decodeURIComponent(targetId); } catch { /* 保留原始锚点 */ }
    const target = document.getElementById(targetId);
    if (!target) return;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        document.documentElement.style.scrollBehavior = previousBehavior;
      });
    });
  }

  applySiteSettings();
  renderThemePicker();
  renderQuickLinks();
  renderHighlights();
  renderRoadmap();
  renderTasks();
  renderWeekPlan();
  renderServiceDirectory();
  renderChecklist();
  renderSafetyCards();
  renderFaqs();
  renderCustomizationModules();
  renderProjectCases();
  renderContact();
  assignRandomWatermarks();
  bindUtilities();
  bindCustomizationPrompt();
  bindPlayfulEffects();
  observeReveals();
  restoreHashPosition();
})();
