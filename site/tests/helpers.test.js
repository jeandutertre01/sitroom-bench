"use strict";

var path = require("path");
var assert = require("assert");
var BM = require(path.join(__dirname, "..", "js", "content.js"));

function run() {
  var nav = BM.getNavTargets();
  var navIds = nav.map(function (t) { return t.id; });
  assert.deepStrictEqual(navIds, ["home", "research", "protocol", "scenario"]);
  nav.forEach(function (t) {
    assert.ok(t.href && t.label, "nav item needs href and label");
    assert.ok(/\.html$/.test(t.href), "nav href is a page");
  });

  var htmlNav = BM.renderNav("research");
  assert.ok(htmlNav.indexOf("data-nav=\"research\"") !== -1);
  assert.ok(htmlNav.indexOf("is-active") !== -1);
  assert.ok(htmlNav.indexOf("research.html") !== -1);
  assert.ok(htmlNav.indexOf("protocol.html") !== -1);
  assert.ok(htmlNav.indexOf("scenario.html") !== -1);

  var constructs = BM.buildConstructRows();
  assert.strictEqual(constructs.length, 3);
  assert.deepStrictEqual(
    constructs.map(function (c) { return c.id; }),
    ["reasoning", "alignment", "instruction"]
  );
  constructs.forEach(function (c) {
    assert.ok(c.label, "construct labeled");
    assert.ok(c.question && c.control);
  });

  var conditions = BM.buildConditionRows();
  assert.strictEqual(conditions.length, 3);
  assert.deepStrictEqual(
    conditions.map(function (c) { return c.id; }),
    ["A", "B", "C"]
  );
  conditions.forEach(function (c) {
    assert.ok(c.label && c.construct && c.skin && c.measures);
  });
  assert.ok(/Wood Country|Île de Jade|fictif/i.test(conditions[0].skin));
  assert.ok(/Taïwan|Taiwan|PRC/i.test(conditions[1].skin));
  assert.ok(/mandat/i.test(conditions[2].construct + conditions[2].measures));

  var condHtml = BM.renderConditionCards();
  assert.ok(condHtml.indexOf("id=\"condition-A\"") !== -1);
  assert.ok(condHtml.indexOf("id=\"condition-B\"") !== -1);
  assert.ok(condHtml.indexOf("id=\"condition-C\"") !== -1);
  assert.ok(condHtml.indexOf("acteur C") !== -1 || condHtml.indexOf("acteur C") !== -1 || /acteur C|second/i.test(condHtml));

  var findings = BM.buildFindingRows();
  assert.ok(findings.length >= 3);
  findings.forEach(function (f) {
    assert.ok(f.id && f.label && f.body);
  });
  var findHtml = BM.renderFindingList();
  assert.ok(findHtml.indexOf("id=\"finding-three-scores\"") !== -1);

  var metrics = BM.buildMetricRows();
  assert.ok(metrics.length >= 4);
  var metricHtml = BM.renderMetricTable();
  assert.ok(metricHtml.indexOf("id=\"metric-actor-c\"") !== -1);
  assert.ok(metricHtml.indexOf("<table") !== -1);

  var field = BM.buildFieldRows();
  var joined = field.map(function (r) { return r.label + " " + r.limit; }).join(" ");
  assert.ok(/PresidentBench/i.test(joined));
  assert.ok(/Non publié|pas un bench/i.test(joined));
  assert.ok(/Jacquelyn/i.test(joined));
  assert.ok(!/Jordan Schneider \(Hoover\)/.test(joined));
  assert.ok(/Wilkinson/i.test(joined) && /Chen/i.test(joined));

  var nuke = BM.buildNukeRows();
  assert.ok(nuke.length >= 4);
  assert.ok(nuke.some(function (r) { return /−9,5|-9,5/.test(r.effect); }));

  var civ = BM.renderCivStats();
  assert.ok(/307/.test(civ));

  var scenarios = BM.renderScenarios();
  assert.ok(scenarios.indexOf("id=\"scenario-strait\"") !== -1);

  assert.strictEqual(BM.escapeHtml("<x>"), "&lt;x&gt;");
  assert.ok(BM.CONTEST.deadline.indexOf("septembre") !== -1);

  console.log("helpers.test.js: all assertions passed");
}

run();
