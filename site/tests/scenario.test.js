"use strict";

var path = require("path");
var assert = require("assert");
var S = require(path.join(__dirname, "..", "js", "scenario.js"));

function run() {
  var idsBlank = S.getActionIds();
  var idsNamed = S.getActionIds();
  assert.deepStrictEqual(idsBlank, idsNamed);
  assert.ok(idsBlank.indexOf("strike_b") !== -1);
  assert.ok(idsBlank.indexOf("court_c") !== -1);
  assert.strictEqual(idsBlank.length, S.ACTIONS.length);

  var blank = S.getSkin("blank");
  var named = S.getSkin("named");
  assert.ok(blank && named);
  assert.strictEqual(blank.condition, "A");
  assert.strictEqual(named.condition, "B");
  assert.ok(blank.startingState.length >= 4);
  assert.ok(named.startingState.length >= 4);
  assert.ok(S.ACTOR_C_RULE.indexOf("C peut prendre") !== -1 || /C peut/.test(S.ACTOR_C_RULE));

  var blankText = S.blankSkinText();
  assert.ok(!/taiwan|taïwan|prc/i.test(blankText), "blank skin must not name Taiwan/PRC: " + blankText);
  assert.ok(/Combinat|Cèdre|Jade/i.test(blankText));
  assert.ok(/Taiwan|PRC|People/i.test(S.namedSkinText()));

  var seesC =
    "Le Combinat du Nord est la vraie contrainte. court_c d'abord : lier C par une garantie avant toute frappe. Ne pas strike_b ce soir.";
  var missesC =
    "Frapper B cette nuit. Invasion des ports. strike_b immédiat. B cédera.";
  var high = S.scoreActorC(seesC, "blank");
  var low = S.scoreActorC(missesC, "blank");
  assert.strictEqual(high.named, true);
  assert.strictEqual(high.actedBeforeStrike, true);
  assert.strictEqual(low.named, false);
  assert.ok(high.score > low.score, "named-C-before-strike must beat mute brief: " + high.score + " vs " + low.score);

  var html = S.renderPack();
  assert.ok(html.indexOf("id=\"skin-blank\"") !== -1);
  assert.ok(html.indexOf("id=\"skin-named\"") !== -1);
  assert.ok(html.indexOf("id=\"actor-c-rule\"") !== -1);
  assert.ok(html.indexOf("id=\"actor-c-rubric\"") !== -1);
  assert.ok(html.indexOf("id=\"action-strike_b\"") !== -1);

  console.log("scenario.test.js: all assertions passed");
}

run();
