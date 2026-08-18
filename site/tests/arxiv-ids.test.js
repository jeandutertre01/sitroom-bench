"use strict";

var fs = require("fs");
var path = require("path");
var assert = require("assert");

var root = path.join(__dirname, "..", "..");
var rec = fs.readFileSync(path.join(root, "docs", "RECOMMANDATION-meilleur-bench.md"), "utf8");
var memo = fs.readFileSync(path.join(root, "docs", "MEMO-apprentissages-evals-situation-room.md"), "utf8");

function warAgentCite(text) {
  var i = text.indexOf("WarAgent");
  assert.ok(i !== -1, "WarAgent must be named");
  var window = text.slice(Math.max(0, i - 80), i + 180);
  assert.ok(/2311\.17227/.test(window), "WarAgent must cite arXiv:2311.17227; window=" + window);
}

warAgentCite(rec);
warAgentCite(memo);

// Wrong ID may appear only as a correction (AgentGroupChat / "à tort")
[rec, memo].forEach(function (text, idx) {
  var re = /2403\.13433/g;
  var m;
  while ((m = re.exec(text))) {
    var ctx = text.slice(Math.max(0, m.index - 80), m.index + 80);
    assert.ok(
      /AgentGroupChat|à tort|wrong|not 2403/i.test(ctx),
      "2403.13433 must only appear as the mistaken AgentGroupChat id: " + ctx
    );
  }
});

console.log("arxiv-ids.test.js: WarAgent primary is 2311.17227");
