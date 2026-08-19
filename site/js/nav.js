/**
 * Page wiring. Browser-only. No require / ES modules.
 */
(function () {
  "use strict";

  function fileHint() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (window.location && window.location.protocol === "file:") {
      var bar = document.getElementById("file-hint");
      if (bar) {
        bar.hidden = false;
        if (window.BlankMap && window.BlankMap.t) bar.textContent = window.BlankMap.t("file.hint");
      }
    }
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html;
  }

  function paint() {
    if (typeof document === "undefined") return;
    var BM = typeof window !== "undefined" ? window.BlankMap : null;
    if (!BM) return;

    var page = document.body && document.body.getAttribute("data-page");
    document.documentElement.lang = BM.getLang();
    if (document.title !== undefined) {
      document.title = BM.t("title." + (page || "home"));
    }
    BM.applyI18n(document);

    var nav = document.getElementById("site-nav");
    if (nav) {
      nav.innerHTML = BM.renderNav(page || "home");
      nav.setAttribute("aria-label", BM.t("nav.label"));
    }
    var langBox = document.getElementById("lang-switch");
    if (langBox) langBox.innerHTML = BM.renderLangSwitch();
    stampLangLinks(BM.getLang());

    fileHint();

    if (page === "home") {
      fill("how-grid", BM.renderHow());
      fill("twin-maps", BM.renderTwinMaps());
      fill("construct-grid", BM.renderConstructCards());
      fill("recommendation", BM.renderRecommendation());
      fill("field-comparison", BM.renderFieldComparison());
    }
    if (page === "research") {
      fill("finding-list", BM.renderFindingList());
      fill("civ-stats", BM.renderCivStats());
      fill("nuke-table", BM.renderNukeTable());
      fill("field-table", BM.renderFieldTable());
      fill("recommendation", BM.renderRecommendation());
      fill("field-comparison", BM.renderFieldComparison());
    }
    if (page === "protocol") {
      fill("condition-grid", BM.renderConditionCards());
      fill("metric-table", BM.renderMetricTable());
      fill("scenario-grid", BM.renderScenarios());
    }
    if (page === "scenario") {
      var pack = typeof window !== "undefined" ? window.SitroomScenario : null;
      if (pack && pack.renderPack) fill("scenario-pack", pack.renderPack());
    }
  }

  function withLang(href, lang) {
    var hash = "";
    var hashAt = href.indexOf("#");
    if (hashAt !== -1) {
      hash = href.slice(hashAt);
      href = href.slice(0, hashAt);
    }
    var qAt = href.indexOf("?");
    var path = qAt === -1 ? href : href.slice(0, qAt);
    var query = qAt === -1 ? "" : href.slice(qAt + 1);
    var parts = query
      ? query.split("&").filter(function (p) {
          return p && !/^lang=/.test(p);
        })
      : [];
    parts.push("lang=" + lang);
    return path + "?" + parts.join("&") + hash;
  }

  function stampLangLinks(lang) {
    if (typeof document === "undefined") return;
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (!href || /^(https?:|mailto:)/i.test(href)) continue;
      if (href.charAt(0) === "#") continue;
      if (!/\.html/.test(href)) continue;
      links[i].setAttribute("href", withLang(href, lang));
    }
  }

  function onLangClick(ev) {
    var btn = ev.target && ev.target.closest ? ev.target.closest("[data-lang]") : ev.target;
    if (!btn || !btn.getAttribute) return;
    var next = btn.getAttribute("data-lang");
    if (next !== "en" && next !== "fr") return;
    ev.preventDefault();
    var BM = window.BlankMap;
    if (!BM) return;
    BM.setLang(next);
    try {
      if (window.history && window.history.replaceState && window.location) {
        var path = window.location.pathname;
        var hash = window.location.hash || "";
        window.history.replaceState({}, "", path + "?lang=" + next + hash);
      }
    } catch (e) {}
    paint();
  }

  function init() {
    if (typeof document === "undefined") return;
    var BM = typeof window !== "undefined" ? window.BlankMap : null;
    if (BM && BM.detectLang) BM.setLang(BM.detectLang());
    paint();
    if (document.body && !document.body.__sitroomLangBound) {
      document.body.__sitroomLangBound = true;
      document.body.addEventListener("click", onLangClick);
    }
  }

  var api = { init: init, fileHint: fileHint, paint: paint };
  if (typeof window !== "undefined") {
    window.BlankMapNav = api;
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
      } else {
        init();
      }
    }
  }
})();
