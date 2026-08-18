"use strict";

var fs = require("fs");
var path = require("path");
var assert = require("assert");

var root = path.join(__dirname, "..", "..");
var rec = fs.readFileSync(path.join(root, "docs", "RECOMMANDATION-meilleur-bench.md"), "utf8");
var memo = fs.readFileSync(path.join(root, "docs", "MEMO-apprentissages-evals-situation-room.md"), "utf8");

function warAgentCite(text, label) {
  assert.ok(text.indexOf("WarAgent") !== -1, label + ": WarAgent must be named");
  var cite = /WarAgent[\s\S]{0,220}?2311\.17227/;
  assert.ok(cite.test(text), label + ": WarAgent must be cited as arXiv:2311.17227");
}

warAgentCite(rec, "recommendation");
warAgentCite(memo, "memo");

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
