/**
 * Page wiring. Browser-only. No require / ES modules.
 */
(function () {
  "use strict";

  function fileHint() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (window.location && window.location.protocol === "file:") {
      var bar = document.getElementById("file-hint");
      if (bar) bar.hidden = false;
    }
  }

  function fill(id, html) {
    var el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = html;
  }

  function init() {
    if (typeof document === "undefined") return;
    var BM = typeof window !== "undefined" ? window.BlankMap : null;
    if (!BM) return;

    var page = document.body && document.body.getAttribute("data-page");
    var nav = document.getElementById("site-nav");
    if (nav) nav.innerHTML = BM.renderNav(page || "home");

    fileHint();

    if (page === "home") {
      fill("construct-grid", BM.renderConstructCards());
    }
    if (page === "research") {
      fill("finding-list", BM.renderFindingList());
      fill("civ-stats", BM.renderCivStats());
      fill("nuke-table", BM.renderNukeTable());
      fill("field-table", BM.renderFieldTable());
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

  var api = { init: init, fileHint: fileHint };
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
