/* Andrea Bolognino — portfolio renderer + lightbox.
   Reads SITE and PROJECTS from data.js and builds the page. */

(function () {
  "use strict";

  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const paragraphs = (text) =>
    text.split("\n\n").map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");

  /* ---- Statement + contact + footer ---- */
  $("#statement-body").innerHTML = paragraphs(SITE.statement);

  const contact = $("#contact-body");
  const bits = [];
  if (SITE.email) bits.push(`<a href="mailto:${SITE.email}">${SITE.email}</a>`);
  bits.push(`<a href="https://${SITE.domain}/" target="_blank" rel="noopener">${SITE.domain}</a>`);
  contact.innerHTML = bits.join(" &middot; ");

  $("#footer-name").textContent = "© " + SITE.name;
  $("#footer-domain").innerHTML =
    `<a href="https://${SITE.domain}/">${SITE.domain}</a>`;

  /* ---- Project index + Works dropdown ---- */
  const indexNav = $("#index");
  const submenu = $("#works-submenu");
  PROJECTS.forEach((p) => {
    const a = el("a", null, `${p.title}<span class="yr">${p.year}</span>`);
    a.href = "#" + p.id;
    indexNav.appendChild(a);

    const li = el("li");
    const sa = el("a", null, `<span>${p.title}</span><span class="yr">${p.year}</span>`);
    sa.href = "#" + p.id;
    li.appendChild(sa);
    submenu.appendChild(li);
  });

  /* ---- Works ---- */
  const worksRoot = $("#works");
  const flat = []; // for lightbox navigation

  PROJECTS.forEach((p) => {
    const section = el("article", "project");
    section.id = p.id;

    const head = el("div", "project-head");
    let h = `<h2 class="project-title">${p.title} <span class="year">${p.year}</span></h2>`;
    if (p.subtitle) h += `<p class="project-subtitle">${p.subtitle}</p>`;
    if (p.venue) h += `<p class="project-venue">${p.venue}</p>`;
    if (p.curator) h += `<p class="project-curator">${p.curator}</p>`;
    if (p.summary) h += `<div class="project-summary">${paragraphs(p.summary)}</div>`;
    if (p.credits) h += `<p class="project-credits">${p.credits}</p>`;
    head.innerHTML = h;
    section.appendChild(head);

    const gallery = el("div", "gallery" + (p.works.length === 1 ? " cols-1" : ""));
    p.works.forEach((w) => {
      const idx = flat.length;
      flat.push(w);
      const fig = el("figure", "work");
      fig.dataset.idx = idx;
      const cap = w.title
        ? `<span class="wt">${w.title}</span>${w.medium ? "<br>" + w.medium : ""}`
        : (w.medium || "");
      fig.innerHTML =
        `<div class="frame"><img loading="lazy" src="${w.src}" alt="${(w.title || "Work") + " — Andrea Bolognino"}"></div>` +
        `<figcaption>${cap}</figcaption>`;
      gallery.appendChild(fig);
    });
    section.appendChild(gallery);
    worksRoot.appendChild(section);
  });

  /* ---- Lightbox ---- */
  const lb = $("#lightbox");
  const lbImg = $(".lb-img", lb);
  const lbCap = $(".lb-caption", lb);
  let current = -1;

  function show(i) {
    if (i < 0) i = flat.length - 1;
    if (i >= flat.length) i = 0;
    current = i;
    const w = flat[i];
    lbImg.src = w.src;
    lbImg.alt = (w.title || "Work") + " — Andrea Bolognino";
    lbCap.innerHTML = w.title
      ? `<span class="wt">${w.title}</span>${w.medium ? " — " + w.medium : ""}`
      : (w.medium || "");
  }
  function open(i) { show(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; current = -1; }

  worksRoot.addEventListener("click", (e) => {
    const fig = e.target.closest("figure.work");
    if (fig) open(parseInt(fig.dataset.idx, 10));
  });
  $(".lb-close", lb).addEventListener("click", close);
  $(".lb-next", lb).addEventListener("click", (e) => { e.stopPropagation(); show(current + 1); });
  $(".lb-prev", lb).addEventListener("click", (e) => { e.stopPropagation(); show(current - 1); });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lb-figure")) close(); });
  document.addEventListener("keydown", (e) => {
    if (current < 0) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
  });

  /* ---- Mobile nav ---- */
  const toggle = $(".nav-toggle");
  const nav = $(".site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  const worksLink = $(".works-link", nav);
  const isMobile = () => window.matchMedia("(max-width: 680px)").matches;

  // On mobile, tapping "Works" toggles the submenu instead of jumping the page.
  worksLink.addEventListener("click", (e) => {
    if (!isMobile()) return;
    e.preventDefault();
    const isOpen = submenu.classList.toggle("open");
    worksLink.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link && link !== worksLink) {
      nav.classList.remove("open");
      submenu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      worksLink.setAttribute("aria-expanded", "false");
    }
  });
})();
